import type { CarouselConfig } from "@/types/carousel";
import slide1 from "@assets/Titniun_Mobile_Banner_1920x350-primeiro-min.jpg";
import slide2 from "@assets/Titniun_Mobile_Banner_1920x350-segundo-min.jpg";
import slide3 from "@assets/Titniun_Mobile_Banner_1920x350-terceiro-min.jpg";
import slide1Mobile from "@assets/slide-globus-min-mobile.jpg";
import slide2Mobile from "@assets/slide-certificada-mobile.jpg";
import slide3Mobile from "@assets/slide-medtronic-mobile.jpg"; 

/**
 * Configuração dinâmica do carrossel
 * 
 * Para adicionar ou remover slides, edite o array abaixo.
 * Para alterar banners, títulos ou botões, modifique os objetos dentro do array.
 */
export const carouselConfig: CarouselConfig = {
  slides: [
    {
      id: "2",
      image: slide1,
      imageMobile: slide2Mobile,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },
    
    {
      id: "3",
      image: slide2,
      imageMobile: slide3Mobile,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },{
      id: "1",
      image: slide3,
      imageMobile: slide1Mobile,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "/produtos",
    },
  ],
  autoplayInterval: 5000,
};

