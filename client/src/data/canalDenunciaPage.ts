/**
 * Configuração da página Canal de Denúncia
 */

export interface CanalDenunciaPageConfig {
  hero: {
    tituloContexto: string;
    titulo: string;
    tituloDestaque: string; // palavra a destacar
    texto: string[]; // array de parágrafos
  };
  orientacoes: {
    titulo: string;
    cards: Array<{
      numero: number;
      icone: string; // nome do ícone lucide
      titulo: string;
      descricao: string;
    }>;
    textos: string[]; // parágrafos complementares
    email: string;
  };
  cta: {
    titulo: string;
    textos: string[];
    botaoTexto: string;
    botaoLink: string;
  };
}

export const canalDenunciaPageConfig: CanalDenunciaPageConfig = {
  hero: {
    tituloContexto: "Canal de Denúncias",
    titulo: "Ética e",
    tituloDestaque: "confidencialidade",
    texto: [
      "O Canal de Denúncias da TITANIUN é uma ferramenta do Sistema de Gestão de Compliance da empresa que objetiva receber relatos de violações ou de possíveis violações ao Código de Ética e de Conduta e às regras de Compliance da empresa, bem como à legislação em geral, especialmente anticorrupção.",
      "O Canal de Denúncias é gerido diretamente pelo Comitê de Ética da TITANIUN, que é responsável por apurar os relatos recebidos, de acordo com o Regimento Interno, conduzido de forma imparcial e sigilosa.",
      "Você não é obrigado a se identificar, podendo realizar seu relato de forma totalmente anônima. No entanto, caso opte por se identificar, informamos que seus dados pessoais serão tratados apenas para tratamento da denúncia registrada, e serão descartados após finalização dos trâmites relacionados, caso não haja outra base legal para tratamento.",
    ],
  },
  orientacoes: {
    titulo: "Ao realizar seu relato, forneça o maior número de informações possível:",
    cards: [
      {
        numero: 1,
        icone: "FileText",
        titulo: "O quê",
        descricao: "Descreva a situação",
      },
      {
        numero: 2,
        icone: "Clock",
        titulo: "Quando",
        descricao: "Caso esta informação seja possível mensurar",
      },
      {
        numero: 3,
        icone: "Search",
        titulo: "Por quê",
        descricao: "Se possível informe a causa ou motivo da ocorrência",
      },
      {
        numero: 4,
        icone: "FileCheck",
        titulo: "Documentos / Provas",
        descricao: "Quais e onde poderiam ser encontradas",
      },
    ],
    textos: [
      "Todas as comunicações de possíveis violações serão tratadas com o sigilo, privacidade e a discrição necessária para a apuração efetiva de cada caso.",
      "Ainda, garantimos que não será admitida qualquer medida de discriminação ou de retaliação contra o denunciante que comunique, de boa-fé, uma suspeita de violação.",
      "Caso o seu objetivo não seja realizar uma denúncia, mas sim fazer uma sugestão, elogio ou enviar alguma ideia de melhoria, você também pode colaborar enviando uma mensagem para o e-mail:",
    ],
    email: "compliance@titaniunimplantes.com.br",
  },
  cta: {
    titulo: "Não hesite em entrar em contato!",
    textos: [
      "Solicite um atendimento agora mesmo!",
      "Nos envie uma mensagem clicando no botão ao lado.",
    ],
    botaoTexto: "CONTATO",
    botaoLink: "/contato",
  },
};

