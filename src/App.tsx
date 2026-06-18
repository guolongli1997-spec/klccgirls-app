import React from 'react';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { PhotoCards } from '@/components/PhotoCards';
import { BotSection } from '@/components/BotSection';
import { BlogContent } from '@/components/BlogContent';
import { Footer } from '@/components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <HeroSlider />
      <PhotoCards />
      <BotSection />
      <BlogContent />
      <Footer />
    </div>
  );
};

export default App;
```

---

src/App.css

```css
/* ----- RESET & BASE (dynamic black) ----- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #0b0b0b;
  color: #e8e8e8;
  line-height: 1.6;
  min-height: 100vh;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, #1a1a1a, #0b0b0b 80%);
  z-index: -2;
}

/* ----- SLIM HEADER ----- */
.site-header {
  background: rgba(11, 11, 11, 0.85);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #2a2a2a;
  padding: 6px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 44px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #0088cc;
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
}

.logo-text span {
  color: #0088cc;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  font-size: 0.9rem;
}

.nav-menu li a {
  text-decoration: none;
  color: #ccc;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
}

.nav-menu li a:hover {
  color: #0088cc;
}

.nav-menu li a i {
  font-size: 0.8rem;
  color: #888;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #ccc;
  padding: 2px 6px;
}

/* ----- HERO SLIDESHOW ----- */
.hero-section {
  max-width: 1300px;
  margin: 20px auto 10px;
  padding: 0 20px;
}

.hero-slider {
  position: relative;
  width: 100%;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  background: #111;
}

.slide-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide {
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slide::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  max-width: 700px;
}

.slide-content h2 {
  font-size: 2.4rem;
  font-weight: 700;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
}

.slide-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.slide-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 5;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dot.active {
  background: #0088cc;
  transform: scale(1.2);
  border-color: #0088cc;
}

/* ----- PHOTO CARDS (20) - BIGGER ----- */
.card-section {
  max-width: 1300px;
  margin: 30px auto 20px;
  padding: 0 20px;
}

.card-section h2 {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 25px;
  border-left: 4px solid #0088cc;
  padding-left: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
}

.photo-card {
  background: #151515;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}

.photo-card:hover {
  transform: translateY(-6px);
  border-color: #0088cc;
  box-shadow: 0 12px 30px rgba(0, 136, 204, 0.15);
}

.card-image {
  width: 100%;
  height: 220px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: #555;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
}

.photo-card:hover .card-image {
  transform: scale(1.02);
}

/* gradient placeholders */
.card-image.img-1 {
  background: linear-gradient(135deg, #1a2a3a, #2a3a4a);