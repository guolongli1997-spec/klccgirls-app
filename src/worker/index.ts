import { Hono } from 'hono';
import { Context } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { basicAuth } from 'hono/basic-auth';
import { jwt } from 'hono/jwt';
import { compress } from 'hono/compress';
import { stream, streamSSE } from 'hono/streaming';
import { env } from 'hono/adapter';
import { getRuntimeKey } from 'hono/helper/adapter';

// ===== TYPES =====
type Bindings = {
  AI: any;
  DB: D1Database;
  BOT_TOKEN: string;
  CHANNEL_URL: string;
  AI_MODEL: string;
  SITE_URL: string;
};

type Variables = {
  user: {
    id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
  };
};

// ===== CREATE HONO APP =====
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// ===== MIDDLEWARE =====
app.use('*', logger());
app.use('*', cors());

// ===== ROUTES =====

// Health check
app.get('/health', (c) => {
  return c.json({
    status: 'online',
    runtime: getRuntimeKey(),
    timestamp: new Date().toISOString(),
    ai_enabled: !!c.env.AI,
    db_enabled: !!c.env.DB,
  });
});

// Bot info
app.get('/api/bot-info', (c) => {
  return c.json({
    username: '@bdescortservices_bot',
    status: c.env.BOT_TOKEN ? 'online' : 'offline',
    channel: c.env.CHANNEL_URL,
    site: c.env.SITE_URL,
    ai_enabled: true,
    ai_model: c.env.AI_MODEL,
    commands: ['/start', '/help', '/channel', '/about', '/status', '/ai', '/website'],
  });
});

// AI Chat endpoint
app.post('/api/ai', async (c) => {
  try {
    const { prompt, telegramId } = await c.req.json();
    
    if (!prompt) {
      return c.json({ error: 'Prompt is required' }, 400);
    }

    const aiResponse = await handleAIRequest(c, prompt);
    
    // Log to D1 if available and telegramId provided
    if (telegramId && c.env.DB) {
      await logAIInteraction(c.env.DB, telegramId, prompt, aiResponse);
    }

    return c.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error('AI Error:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Webhook endpoint for Telegram
app.post('/webhook', async (c) => {
  try {
    const body = await c.req.json();
    await handleTelegramUpdate(c, body);
    return c.text('OK', 200);
  } catch (error) {
    console.error('Webhook error:', error);
    return c.text('Error processing webhook', 500);
  }
});

// Serve HTML page
app.get('/', async (c) => {
  const html = getHTML(c.env.CHANNEL_URL, c.env.SITE_URL);
  return c.html(html);
});

// Protected route with Basic Auth (example)
app.use('/admin/*', basicAuth({
  username: 'admin',
  password: 'secure-password-123',
}));

app.get('/admin', (c) => {
  return c.json({ message: 'Welcome to admin area!' });
});

// Protected route with JWT (example)
app.use('/jwt/*', jwt({
  secret: 'your-secret-key',
  alg: 'HS256',
}));

app.get('/jwt/protected', (c) => {
  return c.json({ message: 'You have access!' });
});

// SSE streaming example
app.get('/stream', (c) => {
  return streamSSE(c, async (stream) => {
    let count = 0;
    while (count < 10) {
      await stream.writeSSE({
        data: JSON.stringify({ count, time: new Date().toISOString() }),
        event: 'update',
      });
      count++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });
});

// ===== HANDLER FUNCTIONS =====

async function handleAIRequest(c: Context<{ Bindings: Bindings }>, prompt: string): Promise<string> {
  try {
    const AI_MODEL = c.env.AI_MODEL || '@cf/meta/llama-3-8b-instruct';
    
    const response = await c.env.AI.run(AI_MODEL, {
      prompt: `You are a helpful assistant for BD ESCORT SERVICES (website: klccgirls.site). 
              Provide professional, polite, and helpful responses.
              Keep responses concise and friendly (max 200 words).
              
              User question: ${prompt}
              
              Response:`,
      max_tokens: 500,
      temperature: 0.7,
    });

    let aiResponse = response.response || response.result || 'I apologize, but I could not generate a response.';
    aiResponse = aiResponse.trim();

    if (aiResponse.length > 1000) {
      aiResponse = aiResponse.substring(0, 997) + '...';
    }

    return aiResponse;
  } catch (error) {
    console.error('AI Error:', error);
    throw new Error('AI service temporarily unavailable. Please try again later.');
  }
}

async function handleTelegramUpdate(c: Context<{ Bindings: Bindings }>, update: any) {
  if (!update.message) return;

  const msg = update.message;
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const firstName = msg.from.first_name || 'User';
  const { BOT_TOKEN, CHANNEL_URL, SITE_URL } = c.env;

  if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN is not set');
    return;
  }

  // Save user and message to D1
  if (c.env.DB) {
    await saveUser(c.env.DB, {
      telegramId: String(msg.from.id),
      username: msg.from.username || '',
      firstName: msg.from.first_name || '',
      lastName: msg.from.last_name || '',
    });
  }

  // Command handlers
  const commands: Record<string, () => string> = {
    '/start': () => `
👋 Hello ${firstName}!

Welcome to BD ESCORT SERVICES Bot.

🔹 Use /help to see available commands
🔹 Use /channel to get our channel link
🔹 Use /about to learn more
🔹 Use /ai [question] to chat with our AI assistant

🌐 Visit our website: ${SITE_URL || 'klccgirls.site'}

We're here to assist you!`,

    '/help': () => `
📋 *Available Commands:*

/start - Welcome message
/help - Show this help
/channel - Get channel invite
/about - About this service
/status - Check bot status
/ai [question] - Ask AI assistant
/website - Visit our website

Need assistance? Just type your message!`,

    '/website': () => `
🌐 *Visit Our Website*

${SITE_URL || 'https://klccgirls.site'}

Check out our services and offerings!`,

    '/channel': () => `
📢 *Join Our Official Channel*

Click the link below to join:
${CHANNEL_URL}

Stay updated with our latest services!`,

    '/about': () => `
ℹ️ *About BD ESCORT SERVICES*

We provide premium escort services in Bangladesh.
Professional, discreet, and reliable.

🔹 24/7 customer support
🔹 Verified profiles
🔹 Safe and secure

🌐 ${SITE_URL || 'klccgirls.site'}

Contact us anytime!`,

    '/status': () => {
      const now = new Date().toISOString();
      return `
✅ *Bot Status: Online*

🕐 Server time: ${now}
👤 Your ID: ${msg.from.id}
🤖 AI: Enabled
📊 Active: Yes
🌐 Site: ${SITE_URL || 'klccgirls.site'}

All systems operational.`;
    },
  };

  // Check for commands
  if (commands[text]) {
    await sendMessage(BOT_TOKEN, chatId, commands[text]());
    return;
  }

  // AI command
  if (text.startsWith('/ai ')) {
    const question = text.substring(4).trim();
    if (question) {
      await sendMessage(BOT_TOKEN, chatId, `🤔 Thinking about: "${question}"...`);
      try {
        const aiResponse = await handleAIRequest(c, question);
        await sendMessage(BOT_TOKEN, chatId, `
🤖 *AI Response:*

${aiResponse}

💡 Ask me anything else using /ai [your question]`);
      } catch (error) {
        await sendMessage(BOT_TOKEN, chatId, `
❌ *AI Error:*

${error instanceof Error ? error.message : 'Unknown error'}

Please try again later.`);
      }
    } else {
      await sendMessage(BOT_TOKEN, chatId, `
❓ Please provide a question after /ai

Example: \`/ai What services do you offer?\``);
    }
    return;
  }

  // Auto-reply with AI
  if (!text.startsWith('/')) {
    try {
      const aiResponse = await handleAIRequest(c, text);
      await sendMessage(BOT_TOKEN, chatId, `
🤖 *AI Assistant:*

${aiResponse}

💬 Type /help for commands or /ai for more questions.`);
    } catch (error) {
      await sendMessage(BOT_TOKEN, chatId, `
📨 *Message received*, ${firstName}!

Your message: "${text}"

We'll get back to you shortly.
For assistance, type /help for commands.

🌐 ${SITE_URL || 'klccgirls.site'}`);
    }
  }
}

// ===== DATABASE FUNCTIONS =====

async function saveUser(db: D1Database, userData: {
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const { telegramId, username, firstName, lastName } = userData;
    
    const existing = await db.prepare(
      'SELECT id FROM users WHERE telegram_id = ?'
    ).bind(telegramId).first();
    
    if (existing) {
      await db.prepare(`
        UPDATE users 
        SET username = ?, first_name = ?, last_name = ?, 
            updated_at = CURRENT_TIMESTAMP, last_interaction = CURRENT_TIMESTAMP
        WHERE telegram_id = ?
      `).bind(username, firstName, lastName, telegramId).run();
    } else {
      await db.prepare(`
        INSERT INTO users (telegram_id, username, first_name, last_name, created_at, last_interaction)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).bind(telegramId, username, firstName, lastName).run();
    }
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

async function logAIInteraction(db: D1Database, telegramId: string, prompt: string, response: string) {
  try {
    const user = await db.prepare(
      'SELECT id FROM users WHERE telegram_id = ?'
    ).bind(telegramId).first();
    
    if (user) {
      await db.prepare(`
        INSERT INTO ai_interactions (user_id, prompt, response, model_used, created_at)
        VALUES (?, ?, ?, 'llama-3-8b', CURRENT_TIMESTAMP)
      `).bind(user.id, prompt, response).run();
    }
  } catch (error) {
    console.error('Error logging AI interaction:', error);
  }
}

// ===== SEND TELEGRAM MESSAGE =====

async function sendMessage(botToken: string, chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to send message:', error);
    throw new Error(`Telegram API error: ${error}`);
  }
  return response;
}

// ===== HTML GENERATION =====

function getHTML(channelUrl: string, siteUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BD ESCORT SERVICES | ${siteUrl}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; background: #0b0b0b; color: #e8e8e8; line-height: 1.6; }
    .container { max-width: 780px; margin: 0 auto; padding: 30px 20px; }
    .header { background: rgba(11,11,11,0.85); backdrop-filter: blur(6px); border-bottom: 1px solid #2a2a2a; padding: 12px 20px; position: sticky; top: 0; z-index: 100; }
    .header-container { max-width: 1300px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .logo { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 700; font-size: 1.2rem; text-decoration: none; }
    .logo-icon { width: 34px; height: 34px; background: #0088cc; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
    .logo span { color: #0088cc; }
    .nav { display: flex; gap: 28px; list-style: none; }
    .nav a { color: #ccc; text-decoration: none; transition: color 0.2s; }
    .nav a:hover { color: #0088cc; }
    h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 20px; color: #fff; }
    .channel-card { background: linear-gradient(145deg, #121212, #1a1a1a); border: 1px solid #2a2a2a; border-radius: 20px; padding: 30px 35px; margin: 30px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
    .btn-channel { background: #0088cc; color: white; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 10px; transition: all 0.2s; }
    .btn-channel:hover { background: #0077b3; transform: translateY(-2px); }
    .ai-section { background: #121212; border: 1px solid #2a2a2a; border-radius: 20px; padding: 30px; margin: 30px 0; }
    .ai-input { display: flex; gap: 10px; margin-top: 15px; }
    .ai-input input { flex: 1; padding: 12px 18px; border-radius: 30px; border: 1px solid #2a2a2a; background: #1a1a1a; color: #e8e8e8; outline: none; font-size: 1rem; }
    .ai-input input:focus { border-color: #0088cc; }
    .ai-input button { padding: 12px 28px; border-radius: 30px; border: none; background: #0088cc; color: white; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .ai-input button:hover { background: #0077b3; }
    .ai-response { margin-top: 20px; padding: 20px; background: #1a1a1a; border-radius: 12px; border-left: 4px solid #0088cc; display: none; }
    .ai-response.show { display: block; }
    .commands-box { background: #121212; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin: 15px 0; }
    .commands-box code { color: #0088cc; }
    .footer { border-top: 1px solid #2a2a2a; margin-top: 50px; padding: 40px 20px; background: #0d0d0d; }
    .footer-grid { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
    .footer-col h4 { color: #fff; margin-bottom: 16px; }
    .footer-col p, .footer-col a { color: #aaa; line-height: 1.8; text-decoration: none; display: block; }
    .footer-col a:hover { color: #0088cc; }
    .social-links { display: flex; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
    .social-links a { width: 38px; height: 38px; border-radius: 50%; background: #1a1a1a; color: #ccc; display: flex; align-items: center; justify-content: center; transition: all 0.2s; border: 1px solid #2a2a2a; }
    .social-links a:hover { background: #0088cc; color: #fff; transform: translateY(-3px); }
    .footer-bottom { max-width: 1300px; margin: 30px auto 0; padding-top: 20px; border-top: 1px solid #2a2a2a; text-align: center; color: #666; font-size: 0.85rem; }
    .menu-toggle { display: none; background: none; border: none; color: #ccc; font-size: 1.5rem; cursor: pointer; }
    @media (max-width: 700px) {
      .nav { display: none; }
      .menu-toggle { display: block; }
      .nav.open { display: flex; flex-direction: column; width: 100%; padding-top: 15px; border-top: 1px solid #2a2a2a; }
      .ai-input { flex-direction: column; }
      .channel-card { flex-direction: column; text-align: center; }
      h1 { font-size: 1.6rem; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-container">
      <a href="/" class="logo">
        <div class="logo-icon"><i class="fab fa-telegram-plane"></i></div>
        <span style="color:#fff;">Klcc<span style="color:#0088cc;">Girls</span></span>
      </a>
      <button class="menu-toggle" onclick="document.getElementById('navMenu').classList.toggle('open')">
        <i class="fas fa-bars"></i>
      </button>
      <ul class="nav" id="navMenu">
        <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
        <li><a href="#"><i class="fas fa-newspaper"></i> Blog</a></li>
        <li><a href="#"><i class="fas fa-mobile-alt"></i> Apps</a></li>
        <li><a href="#"><i class="fas fa-code"></i> API</a></li>
        <li><a href="${channelUrl}" target="_blank"><i class="fas fa-paper-plane"></i> Channel</a></li>
      </ul>
    </div>
  </header>

  <div class="container">
    <h1>BD ESCORT SERVICES</h1>
    <p>Welcome to the official BD ESCORT SERVICES Telegram Bot. We provide premium escort services in Bangladesh.</p>

    <div class="channel-card">
      <div>
        <h3 style="color:#fff;">📢 Join Our Channel</h3>
        <p style="color:#aaa;">@bdescortservices_bot • Official Channel</p>
      </div>
      <a href="${channelUrl}" target="_blank" class="btn-channel">
        <i class="fab fa-telegram-plane"></i> Join Channel
      </a>
    </div>

    <div class="ai-section">
      <h3 style="color:#fff;"><i class="fas fa-robot" style="color:#0088cc;"></i> AI Assistant</h3>
      <p style="color:#aaa;">Ask anything about our services or just chat with our AI.</p>
      <div class="ai-input">
        <input type="text" id="aiPrompt" placeholder="Ask me anything..." />
        <button onclick="askAI()"><i class="fas fa-paper-plane"></i> Ask AI</button>
      </div>
      <div class="ai-response" id="aiResponse">
        <div id="aiResult"></div>
      </div>
    </div>

    <h2 style="color:#fff; margin-top:40px;">🤖 Bot Commands</h2>
    <div class="commands-box">
      <code>/start</code> - Welcome message<br>
      <code>/help</code> - Show available commands<br>
      <code>/channel</code> - Get channel invite<br>
      <code>/about</code> - About this service<br>
      <code>/status</code> - Check bot status<br>
      <code>/ai [question]</code> - Ask AI assistant<br>
      <code>/website</code> - Visit our website
    </div>
  </div>

  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4><i class="fas fa-building" style="color:#0088cc;"></i> Company</h4>
        <p>BD ESCORT SERVICES</p>
        <p>Dhaka, Bangladesh</p>
        <p>&copy; 2026</p>
        <p><a href="${siteUrl}" style="color:#0088cc;">${siteUrl}</a></p>
      </div>
      <div class="footer-col">
        <h4><i class="fas fa-link" style="color:#0088cc;"></i> Quick Links</h4>
        <a href="#"><i class="fas fa-chevron-right" style="font-size:0.6rem;"></i> About Us</a>
        <a href="#"><i class="fas fa-chevron-right" style="font-size:0.6rem;"></i> Services</a>
        <a href="#"><i class="fas fa-chevron-right" style="font-size:0.6rem;"></i> Contact</a>
        <a href="${siteUrl}"><i class="fas fa-chevron-right" style="font-size:0.6rem;"></i> Website</a>
      </div>
      <div class="footer-col">
        <h4><i class="fas fa-phone" style="color:#0088cc;"></i> Contact</h4>
        <p><i class="fas fa-envelope" style="width:20px;"></i> info@bdescort.com</p>
        <p><i class="fas fa-phone-alt" style="width:20px;"></i> +880 1711-123456</p>
        <p><i class="fas fa-map-marker-alt" style="width:20px;"></i> Dhaka, Bangladesh</p>
      </div>
      <div class="footer-col">
        <h4><i class="fas fa-share-alt" style="color:#0088cc;"></i> Social</h4>
        <div class="social-links">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="${channelUrl}" target="_blank"><i class="fab fa-telegram-plane"></i></a>
          <a href="#"><i class="fab fa-whatsapp"></i></a>
        </div>
        <p style="margin-top:14px;"><i class="fas fa-hashtag" style="color:#0088cc;"></i> #BDESCORT</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Built with <i class="fas fa-heart" style="color:#d32f2f;"></i> for the Telegram community. All rights reserved.</p>
      <p style="margin-top:8px; font-size:0.75rem; color:#555;">${siteUrl}</p>
    </div>
  </footer>

  <script>
    let telegramId = localStorage.getItem('telegram_id') || '';
    
    async function askAI() {
      const input = document.getElementById('aiPrompt');
      const responseDiv = document.getElementById('aiResponse');
      const resultDiv = document.getElementById('aiResult');
      const prompt = input.value.trim();
      
      if (!prompt) {
        alert('Please ask a question.');
        return;
      }
      
      responseDiv.classList.add('show');
      resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
      
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, telegramId })
        });
        
        const data = await response.json();
        resultDiv.innerHTML = data.success ? data.response : '❌ Error: ' + data.error;
      } catch (error) {
        resultDiv.innerHTML = '❌ Error: ' + error.message;
      }
    }
    
    document.getElementById('aiPrompt').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        askAI();
      }
    });
  </script>
</body>
</html>`;
}

export default app;