# Documentação do Projeto Titanium Implantes

Esta pasta contém a documentação técnica e de manutenção do projeto.

## Documentos Disponíveis

- **[Blueprint](./blueprint.md)**: Guia completo de comandos e operações - como iniciar, reiniciar, abrir o projeto, comandos úteis e solução de problemas.
- **[PRD Técnico](./prd-tecnico.md)**: Documento de requisitos técnicos detalhado, incluindo arquitetura atual, objetivos de evolução, requisitos funcionais e não funcionais, modelo de dados proposto e plano de implementação.

## Estrutura do Projeto

```
titaniumimplantes-replit-home/
├── client/          # Frontend React + Vite
├── server/          # Backend Express
├── shared/          # Schemas e tipos compartilhados
├── docs/            # Documentação (esta pasta)
└── attached_assets/ # Imagens e assets estáticos
```

## Guias Rápidos

### Executar Localmente

1. Instalar dependências: `npm install`
2. Configurar variáveis de ambiente (ver `.env.example` se existir)
3. Executar servidor de desenvolvimento: `npm run dev`
4. Acessar: `http://localhost:5000`

### Build para Produção

1. Executar: `npm run build`
2. Iniciar servidor: `npm start`

### Verificar Tipos TypeScript

```bash
npm run check
```

## Próximos Passos

Consulte o [PRD Técnico](./prd-tecnico.md) para entender o plano de evolução do projeto e as próximas implementações planejadas.

