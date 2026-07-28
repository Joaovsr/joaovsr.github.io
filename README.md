# joaovsr.is-a.dev

Portfolio pessoal de João Vinicius Rodrigues — Full Stack Developer | Full Stack.

## Setup

```bash
npm install
npm run dev
```

Para usar o chat localmente, execute o backend `ask-about-me` em
`http://127.0.0.1:8000`. O Vite encaminha `POST /ask` para essa origem durante o
desenvolvimento; em produção, frontend e API usam a mesma origem. O painel em
`/admin` também é encaminhado para o backend e exige as credenciais privadas
configuradas nele. As seções de perfil, experiências e projetos carregam o snapshot
publicado em `GET /portfolio`, também encaminhado pelo Vite em desenvolvimento.

## Stack

Vue 3 · TypeScript · Vite · SCSS · vue-router · vue-i18n (pt-BR / en-US)
