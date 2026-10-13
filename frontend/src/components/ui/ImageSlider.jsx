import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ImageSlider({ slides, label }) {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const touchDistance = touchStart - event.changedTouches[0].clientX;

    if (Math.abs(touchDistance) > 50) {
      if (touchDistance > 0) showNextSlide();
      else showPreviousSlide();
    }

    setTouchStart(null);
  };

  return (
    <section className="bg-white">
      <div
        className="relative h-[400px] overflow-hidden bg-[#252525] sm:h-[500px] lg:h-[540px]"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.eyebrow}
              className="relative min-w-full flex-1"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={activeSlide !== index}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/5" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-16">
                <div className="max-w-xl text-white">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-white/80 sm:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
                    {slide.title}
                    <span className="block text-[#ffcedd]">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p className="mt-5 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
                    {slide.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(slide.to)}
                    tabIndex={activeSlide === index ? 0 : -1}
                    className="mt-7 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3.5 text-sm font-bold text-primary transition hover:bg-[#fff0f4]"
                  >
                    {slide.action}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={showPreviousSlide}
          className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow transition hover:bg-white sm:left-7 sm:flex sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={showNextSlide}
          className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow transition hover:bg-white sm:right-7 sm:flex sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div
        className="flex justify-center gap-2.5 py-5"
        role="group"
        aria-label="Choose featured slide"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.eyebrow}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "w-8 bg-secondary"
                : "w-2.5 bg-[#d4d4d8] hover:bg-[#999]"
            }`}
            aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
            aria-current={activeSlide === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
