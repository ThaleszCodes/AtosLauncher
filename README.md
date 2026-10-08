# Atos Launcher

Aplicação web minimalista para abrir vários sites de trabalho com um clique.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar na Vercel

Importe o repositório, selecione Vite (detectado automaticamente), use `npm run build` e diretório de saída `dist`.

## Como funciona

- Cadastre nome e URL (URLs sem protocolo recebem https://).
- Ative ou desative sites no interruptor.
- Clique em **Iniciar trabalho** para solicitar a abertura dos sites ativos em abas separadas.
- Os dados são guardados em `localStorage` no navegador atual.

**Observação:** navegadores podem bloquear parte das abas abertas simultaneamente. Autorize pop-ups para o domínio do Launcher quando necessário. Os links não são sincronizados entre dispositivos e podem ser perdidos se os dados do site forem apagados.