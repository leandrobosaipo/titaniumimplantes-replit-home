import type { ContatoConfig } from "@/types/contato";

/**
 * Configuração dinâmica da seção de Contato
 * 
 * Para editar o conteúdo da seção, modifique as propriedades abaixo.
 */
export const contatoConfig: ContatoConfig = {
  ativo: true,
  titulo: "Seu próximo passo para a excelência em saúde",
  descricao:
    "Seja você um médico, uma clínica, um hospital ou um distribuidor, estamos prontos para transformar seus procedimentos com soluções inovadoras e de alta performance.",
  webhookUrl:
    "https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes",
};

