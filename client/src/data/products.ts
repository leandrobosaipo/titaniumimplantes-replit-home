import type { ProductsPageConfig } from "@/types/products";
import colunaImg from "@assets/coluna-bg-solucoes.jpg";
import neuroImg from "@assets/neurologia-bg-solucoes.jpg";
import bucoImg from "@assets/bucomaxilfacial-bg-solucoes.jpg";
import otorrinoImg from "@assets/otorrinolaringologia-bg-solucoes.jpg";
import heroImg from "@assets/home-topo_1762428378908.jpeg";
import estruturaImg from "@assets/home-slide_1762428378908.jpeg";

export const productsConfig: ProductsPageConfig = {
  categories: [
    { id: "all", slug: "todos", label: "Todos os Produtos" },
    { id: "premium", slug: "linha-premium", label: "Linha Premium" },
    { id: "coluna", slug: "coluna", label: "Coluna" },
    { id: "neuro", slug: "neurocirurgia", label: "Neurocirurgia" },
    { id: "buco", slug: "bucomaxilofacial", label: "Bucomaxilofacial" },
    { id: "otorrino", slug: "otorrinolaringologia", label: "Otorrinolaringologia" },
  ],
  products: [
    {
      id: "1",
      slug: "sistema-fixacao-coluna",
      categoryId: "coluna",
      title: "Sistema de Fixação de Coluna",
      description: "Sistema de fixação e espaçadores cervicais de alta precisão.",
      fullDescription:
        "Desenvolvido para garantir estabilidade máxima em cirurgias complexas de coluna. Fabricado em titânio grau médico para biocompatibilidade, com travas que asseguram segurança e facilidade de montagem em campo cirúrgico.",
      mainImage: colunaImg,
      images: [colunaImg, heroImg, estruturaImg],
    },
    {
      id: "2",
      slug: "neuroestimulador-intellis",
      categoryId: "neuro",
      title: "Neuroestimulador Intellis",
      description: "Neuroestimulador recarregável com programação avançada.",
      fullDescription:
        "Oferece recursos de detecção e reprogramação contínua, permitindo terapias personalizadas para dor crônica e distúrbios neurológicos. Possui interface intuitiva e acompanhamento digital para médicos e pacientes.",
      mainImage: neuroImg,
      images: [neuroImg, estruturaImg, heroImg],
    },
    {
      id: "3",
      slug: "kit-bucomaxilofacial",
      categoryId: "buco",
      title: "Kit Bucomaxilofacial",
      description: "Conjunto para fixação crânio-maxilo-facial com placas e parafusos.",
      fullDescription:
        "Conjunto modular para reconstruções faciais, com variedade de tamanhos e perfis de placas. Revestimento pensado para reduzir atrito e otimizar a adaptação anatômica.",
      mainImage: bucoImg,
      images: [bucoImg, heroImg, estruturaImg],
    },
    {
      id: "4",
      slug: "kit-otorrino-endoscopico",
      categoryId: "otorrino",
      title: "Kit Otorrino Endoscópico",
      description: "Instrumental para procedimentos funcionais e reconstrutivos.",
      fullDescription:
        "Instrumental endoscópico leve e ergonômico, com diferentes diâmetros e angulações para cirurgias nasais e otológicas. Superfícies tratadas para maior durabilidade e fácil esterilização.",
      mainImage: otorrinoImg,
      images: [otorrinoImg, estruturaImg, heroImg],
    },
    {
      id: "5",
      slug: "espacador-cervical-premium",
      categoryId: "premium",
      title: "Espaçador Cervical Premium",
      description: "Implante intersomático cervical com perfil anatômico.",
      fullDescription:
        "Desenvolvido para preservar a lordose cervical e facilitar a inserção minimamente invasiva. Revestimento poroso para favorecer a osteointegração e estabilidade inicial elevada.",
      mainImage: heroImg,
      images: [heroImg, colunaImg, neuroImg],
    },
    {
      id: "6",
      slug: "aspirador-ultrassonico",
      categoryId: "neuro",
      title: "Aspirador Ultrassônico",
      description: "Precisão em remoção tecidual com preservação de estruturas nobres.",
      fullDescription:
        "Equipamento indicado para neurocirurgia e procedimentos delicados. Ajuste de potência fino, ponteiras diversas e fluxo contínuo para maior controle intraoperatório.",
      mainImage: estruturaImg,
      images: [estruturaImg, neuroImg, heroImg],
    },
    {
      id: "7",
      slug: "sistema-lombar-hibrido",
      categoryId: "coluna",
      title: "Sistema Lombar Híbrido",
      description: "Conjunto de parafusos pediculares e hastes de alta resistência.",
      fullDescription:
        "Permite correção de deformidades lombares com montagem versátil. Componentes com perfil baixo, compatíveis com técnicas minimamente invasivas e instrumentação robusta.",
      mainImage: colunaImg,
      images: [colunaImg, estruturaImg, heroImg],
    },
    {
      id: "8",
      slug: "sistema-sinusite-fess",
      categoryId: "otorrino",
      title: "Sistema para Cirurgia FESS",
      description: "Kit dedicado para cirurgias endoscópicas funcionais dos seios paranasais.",
      fullDescription:
        "Inclui lâminas, brocas e instrumentais delicados para ampla visualização e acesso preciso. Compatível com guias de navegação e técnicas de mínima invasão.",
      mainImage: otorrinoImg,
      images: [otorrinoImg, heroImg, estruturaImg],
    },
    {
      id: "9",
      slug: "fixador-maxilo-compact",
      categoryId: "buco",
      title: "Fixador Maxilo Compact",
      description: "Sistema leve para estabilização maxilar e mandibular.",
      fullDescription:
        "Placas e parafusos de perfil reduzido para menor palpabilidade. Facilita reconstruções em traumas faciais e cirurgias ortognáticas com estabilidade pós-operatória confiável.",
      mainImage: bucoImg,
      images: [bucoImg, estruturaImg, heroImg],
    },
  ],
  itemsPerPage: 6,
};
