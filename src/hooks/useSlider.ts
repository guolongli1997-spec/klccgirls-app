import { useState, useEffect, useCallback, useRef } from 'react';
import { Slide } from '@/types';

export const useSlider = (slides: Slide[], interval: number = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    const totalSlides = slides.length;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    setCurrentIndex(index);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    intervalRef.current = setInterval(nextSlide, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, interval, isPaused, slides.length]);

  const pauseSlider = useCallback(() => setIsPaused(true), []);
  const resumeSlider = useCallback(() => setIsPaused(false), []);

  return {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseSlider,
    resumeSlider,
    isPaused,
  };
};