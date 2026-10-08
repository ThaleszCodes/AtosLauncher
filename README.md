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

## ChatGPT Bridge 1.2
- **Copiar link do ambiente**: gera um URL com os links do ambiente atual codificados no fragmento `#import=`. O fragmento não é enviado ao servidor na requisição HTTP.
- **Exportar JSON**: baixa os links do ambiente atual em arquivo.
- **Importar JSON**: seleciona um arquivo exportado, valida os dados e mostra uma prévia.
- **Importar por link**: ao abrir um link de importação, o app mostra uma prévia e só grava após confirmação.
- Importações sempre criam um **novo ambiente**, sem substituir os atuais. Links de importação têm limite de tamanho; para ambientes maiores, use JSON.
- Não inclua URLs com tokens, senhas ou dados privados: quem tiver o link ou arquivo terá acesso aos endereços.
- O ChatGPT pode preparar JSON de importação. Esta ponte **não** concede ao ChatGPT acesso remoto ao navegador ou aos ambientes já salvos.
