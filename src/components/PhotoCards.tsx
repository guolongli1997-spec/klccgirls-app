import React from 'react';
import { FaCamera, FaHeart, FaShareAlt, FaImages } from 'react-icons/fa';
import { photoCards } from '@/data/cardsData';

export const PhotoCards: React.FC = () => {
  const handleRedClick = (title: string) => {
    alert(`❤️ Red action triggered for: ${title}`);
  };

  const handleShareClick = (title: string) => {
    alert(`🔗 Share this card: ${title}`);
  };

  return (
    <section className="card-section">
      <h2>
        <FaImages style={{ color: '#0088cc', marginRight: '12px' }} />
        Explore Mini Apps Gallery
      </h2>
      <div className="card-grid">
        {photoCards.map((card) => (
          <div key={card.id} className="photo-card">
            <div className={`card-image ${card.imageClass}`}>
              <FaCamera style={{ opacity: 0.25, fontSize: '3rem' }} />
            </div>
            <div className="card-content">
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.description}</div>
              <div className="card-actions">
                <button
                  className="btn-red"
                  onClick={() => handleRedClick(card.title)}
                >
                  <FaHeart /> Red
                </button>
                <button
                  className="btn-share"
                  onClick={() => handleShareClick(card.title)}
                >
                  <FaShareAlt /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};