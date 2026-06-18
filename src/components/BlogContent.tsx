import React from 'react';

export const BlogContent: React.FC = () => {
  return (
    <div className="container">
      <h1>Mini Apps 2.0: Full-Screen Mode, Home Screen Icons, Geolocation and 10 more features</h1>
      <div className="blog-meta">November 17, 2024 · The Telegram Team</div>

      <p>
        Today we launch the largest update in the history of mini apps. They get a full-screen mode,
        subscription plans, home screen shortcuts, sending gifts, sharing media, creating documents,
        access to geolocation, motion tracker, setting emoji statuses — and more.
      </p>

      <h2>📱 Full-Screen Mode</h2>
      <p>
        Mini apps are now able to use the entire screen in portrait or landscape orientation — allowing
        apps to host more game genres with expanded gestures and interfaces.
      </p>

      <h2>🔄 Device Motion Tracking</h2>
      <p>
        Mini apps are able to receive information about the motion of your device to add unique controls
        to games or build immersive VR experiences. Developers can lock the screen orientation to ensure
        there is no unnecessary rotation if their app uses device motion for controls.
      </p>

      <h2 id="home-screen-shortcuts">🏠 Home Screen Shortcuts</h2>
      <div className="feature-highlight">
        <p>
          <strong>
            You can now place direct shortcuts to specific mini apps on the home screen of your device
          </strong>{' '}
          — accessing your favorite games and services in one tap.
        </p>
      </div>

      <h2>📍 Geolocation Access</h2>
      <p>
        You can now share your location with mini apps — which gives developers the ability to make
        location-based games with points of interest or interactive maps for events. Access to location
        data is disabled by default — you must specifically give location permissions to each individual
        mini app with which you'd like to share this data.
      </p>

      <h2>🎁 Gifts from Apps</h2>
      <p>
        Apps can now use their stars to send you gifts as rewards to celebrate achievements. We've also
        added a new privacy setting that lets you control who can send you gifts that will appear on your
        profile.
      </p>

      <h2>😊 Emoji Statuses from Apps</h2>
      <p>
        With this update, Telegram Premium users can set emoji statuses from inside mini apps, showing
        others that they're in a game or a taxi 🚕. Mini apps can integrate APIs from other services —
        instantly updating a user's emoji status when they start playing music 🎧, open a book 📖 or turn
        on a movie 🎬. Apps with location permissions could also be used to update your status when
        you're at work or out of the office 🏢. Developers can also create their own custom emoji packs
        to offer as status options, adding to the viral potential of mini apps.
      </p>

      <h2>🖼️ Media Sharing</h2>
      <p>
        You can now share media directly from mini apps — sending referral codes, custom memes and more
        to any chat. Mini apps can also create media for you to post to your stories.
      </p>

      <h2>📄 Creating Documents</h2>
      <p>
        Mini apps can also generate documents and files which you can download — such as AI-generated
        profile pictures or audio files.
      </p>

      <h2>💎 Subscription Plans</h2>
      <p>
        Developers are able to offer subscriptions to their mini app using Telegram Stars — monetizing
        their efforts with multiple tiers of content and features. Telegram Stars earned from digital
        products and subscriptions can be used to increase message limits for the app or claim rewards.
        Developers are also eligible to earn rewards from Telegram Ads in bots and mini apps.
      </p>

      <h2>🎨 Loading Screen Customization</h2>
      <p>
        Developers can further customize the loading screen of their mini app in @BotFather — adding
        their own icon and specific colors that will be displayed before the app starts loading.
      </p>

      <h2>📊 Device Hardware Info</h2>
      <p>
        To better optimize graphics and increase performance, mini apps can access basic hardware info
        about your device, such as its processing power and memory capacity — then automatically adjust
        settings to provide the smoothest experience.
      </p>

      <h2>➕ And More</h2>
      <p>
        Developers can now know when their mini app is minimized and restored from the app bar and make
        sure they handle transitions correctly.
      </p>

      <div className="dev-note">
        <p>
          <strong>If you are a developer,</strong> see <a href="#">this page</a> for detailed
          documentation and the full list of changes, including an easier way for mini apps to access
          profile pictures and support for third-party validation of mini app data.
        </p>
      </div>

      <div className="app-links">
        <p>
          Everyone can already try out early implementations of some of the new features in apps like{' '}
          <code>@playdeckbot</code>, <code>@tverse</code> and <code>@major</code> (the Major Maze game on
          the Games tab).
        </p>
      </div>

      <p>That's all for today's update. We're already working on the next big thing for mini apps and beyond.</p>
    </div>
  );
};