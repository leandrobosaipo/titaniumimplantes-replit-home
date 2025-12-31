export interface MVVItem {
  id: string;
  tipo: "missao" | "visao" | "valores";
  titulo: string;
  descricao: string;
}

export interface QuemSomosPageConfig {
  hero: {
    titulo: string;
    backgroundImage: string;
  };
  historia: {
    titulo: string;
    texto: string;
    imagem: string;
  };
  mvv: MVVItem[];
  estrutura: {
    titulo: string;
    subtitulo: string;
    imagem: string | string[];
    textoFinal: string;
    propositoBadge: string;
    propositoTexto: string;
  };
}
