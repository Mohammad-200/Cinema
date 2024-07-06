import React from "react";
import "./movieSwiper.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

function MovieSwiper({ slides, updateInfo }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      autoplay={{
        delay: 4000, // Increase autoplay delay
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      loop={true}
      pagination={true}
      touchRatio={0.5}
      speed={800}
      lazy={{
        loadPrevNext: true,
        loadOnTransitionStart: true,
      }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="movieSwiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${slide.poster_path}`}
            alt="Movie Image"
            onClick={() => updateInfo(slide.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieSwiper;
