import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImageSlider({ slides = [], label }) {
  const navigate = useNavigate();

  if (!slides.length) return null;

  return (
    <section className="bg-white">
      <div
        className="relative bg-[#252525]"
        role="region"
        aria-label={label}
      >
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          loop={slides.length > 1}
          slidesPerView={1}
          speed={700}
          className="hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.eyebrow}>
              <article className="relative h-[400px] overflow-hidden sm:h-[500px] lg:h-[540px]">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
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
                      className="mt-7 inline-flex items-center gap-3 rounded-md bg-white px-6 py-3.5 text-sm font-bold text-primary transition hover:bg-[#fff0f4]"
                    >
                      {slide.action}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous slide */}
        <button
          type="button"
          className="hero-prev absolute left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow transition hover:bg-white sm:left-7 sm:flex sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Next slide */}
        <button
          type="button"
          className="hero-next absolute right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow transition hover:bg-white sm:right-7 sm:flex sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="hero-pagination flex justify-center gap-2.5 py-5" />
    </section>
  );
}