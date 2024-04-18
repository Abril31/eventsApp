import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AdvancedImage } from "@cloudinary/react";
import {
  tech1Img,
  oliviaImg,
  foodLogoImg,
  madisonImg,
  globalImg,
} from "../../configs/cloudinary";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SliderSponsors = () => {
  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      <div
        className="swiper-container custom-swiper-container"
        style={{
          width: "25%",
          justifyItems: "center",
          alignItems: "center",
          placeContent: "center",
          position: "relative",
        }}
      >
        <Swiper
          modules={[Navigation]}
          style={{
            overflow: "hidden",
          }}
          slidesPerView={1}
          centeredSlides={false}
          navigation={{
            // Configuración de las flechas de navegación
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <AdvancedImage cldImg={tech1Img} />
          </SwiperSlide>
          <SwiperSlide>
            <AdvancedImage cldImg={oliviaImg} />
          </SwiperSlide>
          <SwiperSlide>
            <AdvancedImage cldImg={foodLogoImg} />
          </SwiperSlide>
          <SwiperSlide>
            <AdvancedImage cldImg={madisonImg} />
          </SwiperSlide>
          <SwiperSlide>
            <AdvancedImage cldImg={globalImg} />
          </SwiperSlide>
        </Swiper>

        {/* Flecha izquierda y derecha */}
        <div className="swiper-button-prev swiper-button-prev-custom text-otro font-extrabold  px-6 rounded-full"></div>
        <div className="swiper-button-next swiper-button-next-custom text-otro font-extrabold  px-6 rounded-full"></div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default SliderSponsors;
