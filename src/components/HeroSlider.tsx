import React from 'react';
import { slideImages } from '@/data/cardsData';
import { useSlider } from '@/hooks/useSlider';

export const HeroSlider: React.FC = () => {
  const { currentIndex, goToSlide, pauseSlider, resumeSlider } = useSlider(slideImages, 4000);

  return (
    <section className="hero-section">
      <div
        className="hero-slider"
        onMouseEnter={pauseSlider}
        onMouseLeave={resumeSlider}
      >
        <div
          className="slide-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideImages.map((slide) => (
            <div
              key={slide.id}
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="slide-dots">
          {slideImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};