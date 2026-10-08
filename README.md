# Atos Launcher

Aplicação web leve para abrir os sites de cada ambiente de trabalho em novas abas.

## Recursos
- Múltiplos ambientes independentes: criar, selecionar, renomear e excluir.
- Links por ambiente: adicionar, editar, excluir e ativar/desativar.
- Abrir todas as abas ativas do ambiente selecionado com um clique.
- Persistência local em `localStorage`, sem login ou servidor.
- Migração automática dos links salvos na versão 1.0 para o ambiente inicial.

## Rodar
```bash
npm install
npm run dev
```

## Publicar
Importe este repositório na Vercel. Framework: Vite; build: `npm run build`; output: `dist`.

## Observações
O navegador pode bloquear a abertura de múltiplas abas; autorize pop-ups para o domínio do Launcher se necessário. Os ambientes ficam armazenados somente no navegador/dispositivo atual. Limpar os dados do site apaga o armazenamento local.
