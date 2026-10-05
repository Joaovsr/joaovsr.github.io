# joaovsr.is-a.dev

Portfólio de João Vinicius Rodrigues. Desenvolvimento web, mobile e aplicações com IA.

## Setup

```bash
npm install
npm run dev
```

## Verificação

```bash
npm test
npm run build
```

O teste confere a correspondência entre os idiomas, o conteúdo dos projetos, os caminhos das imagens e a tradução completa dos cargos. O build verifica TypeScript e gera o site em `dist/`.

## Conteúdo e apresentação

Os textos ficam em `src/locales/`, e os dados dos projetos, experiências e formação em `src/data/`. As imagens originais ficam em `public/projects/`. O site usa cópias WebP com as mesmas dimensões; o avatar e as oito imagens somam 1,2 MB, contra 11,2 MB dos originais. Para substituir uma imagem, atualize também sua versão WebP.

O visual usa Metropolis, fundo claro e azul, com tipografia maior na abertura, seções numeradas e o InCubo em destaque. A grade vira uma coluna nas telas menores, e o retrato ganha um formato compacto. Projetos aparecem antes da apresentação pessoal. Os detalhes usam `dialog`, e as tecnologias usam `details`, ambos nativos do navegador. Foco visível, link para pular a navegação e respeito a movimento reduzido fazem parte dos estilos compartilhados. O currículo continua sendo gerado apenas quando solicitado.

Na revisão de escrita, foram encurtadas as descrições e retiradas promessas genéricas e afirmações absolutas sobre IA. Os números preservados já constavam do conteúdo anterior; não houve verificação externa desses resultados.

## Stack

Vue 3 · TypeScript · Vite · SCSS · vue-router · vue-i18n (pt-BR / en-US)
