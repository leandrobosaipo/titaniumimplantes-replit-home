export interface LgpdPageConfig {
  breadcrumb: string;
  secaoCertificacoes: {
    titulo: string;
    itens: {
      id: string;
      img: string;
      label: string;
      sublabel: string;
    }[];
  };
  secaoDestaques: {
    titulo: string;
    imagem: string;
    pills: string[];
  };
  secaoKpis: {
    titulo: string;
    kpis: {
      id: string;
      valor: string;
      label: string;
      tipo: "circle" | "stars" | "bar";
    }[];
  };
  secaoCompliance: {
    titulo: string;
    descricao: string;
    imagem: string;
    lista: string[];
  };
  secaoLgpd: {
    titulo: string;
    cards: {
      id: string;
      icone: "search" | "edit" | "undo" | "share";
      texto: string;
    }[];
  };
  secaoDireitos: {
    titulo: string;
    contatos: {
      tipo: "email" | "tel" | "map";
      valor: string;
    }[];
    seguranca: string;
  };
}
