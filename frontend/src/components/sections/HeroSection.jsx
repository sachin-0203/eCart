import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/heroImg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const highlights = [
    { icon: Truck, title: "Fast delivery", text: "Across India in 24-48 hrs" },
    { icon: ShieldCheck, title: "Verified quality", text: "Trusted brands and products" },
    { icon: Star, title: "Top rated", text: "Loved by 10k+ shoppers" },
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef5ff_100%)] px-6 py-16 lg:px-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(105,145,199,0.22),_transparent_45%)]" />
      <div className="absolute right-[-3rem] top-[-2rem] h-72 w-72 rounded-full bg-primary-light/40 blur-3xl" />
      <div className="absolute bottom-0 left-[-2rem] h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-secondary" />
            New season arrivals • Fashion • Electronics • Lifestyle
          </div>

          <h1 className="text-4xl font-black leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Discover the
            <span className="block text-primary">perfect pick</span>
            for every day.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-secondary lg:mx-0">
            Shop trendy fashion, home essentials, beauty, accessories, and the latest electronics at unbeatable prices from Rashmi Enterprises.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button 
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
              onClick={() => navigate("/shop/products")}
            >
              Shop now
              <ArrowRight size={18} />
            </button>
            <button
              className="rounded-2xl border border-border-color bg-white px-7 py-3.5 font-semibold text-text-primary transition-all duration-300 hover:border-primary hover:text-primary"
              onClick={() => navigate("/shop/products")}
            >
              Explore categories
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border-color bg-white/80 p-4 text-left shadow-sm backdrop-blur">
              <p className="text-2xl font-bold text-secondary">10k+</p>
              <p className="text-sm text-text-secondary">Happy customers</p>
            </div>
            <div className="rounded-2xl border border-border-color bg-white/80 p-4 text-left shadow-sm backdrop-blur">
              <p className="text-2xl font-bold text-secondary">500+</p>
              <p className="text-sm text-text-secondary">Products ready</p>
            </div>
            <div className="rounded-2xl border border-border-color bg-white/80 p-4 text-left shadow-sm backdrop-blur">
              <p className="text-2xl font-bold text-secondary">4.9★</p>
              <p className="text-sm text-text-secondary">Average rating</p>
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-1 justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-72 w-72 rounded-full bg-primary-light/40 blur-3xl sm:h-80 sm:w-80" />
          </div>

          <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_25px_80px_rgba(11,46,89,0.15)] backdrop-blur">
            <img
              src={heroImage}
              alt="Ecommerce hero showcase"
              className="h-[420px] w-full rounded-[1.5rem] object-cover object-center"
            />

            <div className="absolute left-6 top-6 rounded-2xl bg-white/90 px-4 py-3 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Special offer</p>
              <p className="text-xl font-bold text-primary">Up to 50% off</p>
            </div>

            <div className="absolute bottom-6 right-6 rounded-2xl bg-primary px-4 py-3 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-light">Starting at</p>
              <p className="text-2xl font-bold">₹299</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl border border-border-color bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{title}</p>
              <p className="text-sm text-text-secondary">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
