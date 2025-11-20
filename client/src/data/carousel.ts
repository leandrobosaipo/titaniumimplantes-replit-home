import type { CarouselConfig } from "@/types/carousel";
import slide1 from "@assets/slide-globus-without-title.jpg";
import slide2 from "@assets/slide-certificada.jpg";
import slide3 from "@assets/slide-medtronic.jpg";

/**
 * Configuração dinâmica do carrossel
 * 
 * Para adicionar ou remover slides, edite o array abaixo.
 * Para alterar banners, títulos ou botões, modifique os objetos dentro do array.
 */
export const carouselConfig: CarouselConfig = {
  slides: [
    {
      id: "1",
      image: slide1,
      title: "Parceria com a Globus",
      subtitle: "referência mundial em soluções para cirurgias de coluna.",
      buttonText: "Conheça nosso portfólio",
      buttonLink: "/produtos",
    },
    {
      id: "2",
      image: slide2,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },
    {
      id: "3",
      image: slide3,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },
  ],
  autoplayInterval: 5000,
};

