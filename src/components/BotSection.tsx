import React, { useState } from 'react';
import { FaTelegramPlane, FaCheckCircle, FaShieldAlt, FaPlug, FaCopy, FaPaperPlane } from 'react-icons/fa';

export const BotSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    alert('🔗 Connecting to @bdescortservices_bot ... (simulated)');
  };

  const handleCopyToken = () => {
    alert('📋 Bot token copied to clipboard (simulated)');
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('📝 Please type a message first.');
      return;
    }
    alert(
      `📨 Message sent to @bdescortservices_bot:\n\n"${message}"\n\n✅ Simulated reply: "Thank you! We'll get back to you."`
    );
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section className="bot-section">
      <div className="bot-card">
        <div className="bot-info">
          <div className="bot-icon">
            <FaTelegramPlane />
          </div>
          <div className="bot-text">
            <h3>BD ESCORT SERVICES BOT</h3>
            <p>
              <span className="bot-username">@bdescortservices_bot</span> • Online &amp; Ready
            </p>
            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>
              <FaCheckCircle style={{ color: '#4caf50', display: 'inline' }} /> Token configured •{' '}
              <FaShieldAlt style={{ color: '#0088cc', display: 'inline' }} /> Secure connection
            </p>
          </div>
        </div>

        <div className="bot-status">
          <span className="status-dot"></span>
          <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Live</span>
        </div>

        <div className="bot-actions">
          <button className="btn-bot btn-bot-primary" onClick={handleConnect}>
            <FaPlug /> Connect
          </button>
          <button className="btn-bot btn-bot-secondary" onClick={handleCopyToken}>
            <FaCopy /> Copy Token
          </button>
        </div>

        <div className="bot-message-input">
          <input
            type="text"
            placeholder="Type a message to the bot ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn-send" onClick={handleSendMessage}>
            <FaPaperPlane /> Send
          </button>
        </div>
      </div>
    </section>
  );
};