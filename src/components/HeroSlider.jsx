import { useEffect, useState } from "react";
import bannerSale from "../../Image/banner-1.jpg";
import bannerShopping from "../../Image/banner-2.jpg";
import Icon from "./Icon.jsx";

const slides = [
  {
    image: bannerSale,
    eyebrow: "A little something for you",
    title: "Good finds. Great feelings.",
    description: "Find the pieces that make everyday life feel special.",
  },
  {
    image: bannerShopping,
    eyebrow: "Your next favorite is waiting",
    title: "Make room for a little joy.",
    description: "Thoughtful picks for wherever life takes you.",
  },
];

function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  function changeSlide(amount) {
    setActiveSlide((currentSlide) => (currentSlide + amount + slides.length) % slides.length);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="hero-slider" aria-label="Featured promotions">
      {slides.map((slide, index) => (
        <article
          className={`hero-slide${activeSlide === index ? " is-active" : ""}`}
          key={slide.image}
          aria-hidden={activeSlide !== index}
        >
          <img src={slide.image} alt="" />
          <div className="hero-copy">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a href="#products" className="hero-cta">
              Explore the collection <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}

      <button
        className="slider-control slider-previous"
        onClick={() => changeSlide(-1)}
        aria-label="Previous slide"
      >
        <Icon name="arrow-left" />
      </button>

      <button
        className="slider-control slider-next"
        onClick={() => changeSlide(1)}
        aria-label="Next slide"
      >
        <Icon name="arrow-right" />
      </button>

      <div className="slider-dots" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            className={`slider-dot${activeSlide === index ? " is-active" : ""}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
