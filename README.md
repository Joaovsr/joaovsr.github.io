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

Os testes conferem a correspondência entre os idiomas, o conteúdo dos projetos, os caminhos das imagens e a tradução completa dos cargos. Também verificam os limites da reação da esfera, a rotação por scroll, o retorno ao centro, as preferências de movimento, a pausa das partículas e a entrada das seções durante a rolagem. A cena Three.js tem verificações de geometria e liberação dos recursos gráficos. O build verifica TypeScript e gera o site em `dist/`.

## Conteúdo e apresentação

Os textos ficam em `src/locales/`, e os dados dos projetos, experiências e formação em `src/data/`. As imagens originais ficam em `public/projects/`. O site usa cópias WebP com as mesmas dimensões; o avatar e as oito imagens somam 1,2 MB, contra 11,2 MB dos originais. Para substituir uma imagem, atualize também sua versão WebP.

O visual retoma a base da branch `main`: fundo escuro, roxo e ciano, Inter e JetBrains Mono, esfera animada e grafo de tecnologias. A esfera usa Three.js, com malha de conexões, pontos luminosos, órbitas em planos diferentes e materiais com shaders. O mouse altera a orientação e acrescenta um deslocamento máximo de 8 px na horizontal e 6 px na vertical; o scroll também altera a rotação. A cena é carregada em um módulo separado, limita a densidade de pixels a 1,5 e mantém uma alternativa estática quando WebGL não está disponível.

A reação ao mouse fica desativada para toque e movimento reduzido. As partículas e o loop 3D pausam quando o topo sai da área visível abaixo do cabeçalho ou a aba fica em segundo plano. As seções entram uma vez ao aparecerem durante a rolagem, usando a Web Animations API, sem ocultar o conteúdo previamente. A versão mobile mantém a navegação e usa uma esfera compacta. O Sobre reúne retrato, apresentação, disponibilidade, idiomas e contato, com textos equivalentes em português e inglês. Os detalhes dos projetos usam `dialog`, e o currículo continua sendo gerado apenas quando solicitado.

As etapas aprovadas, as decisões e o que ainda será discutido ficam em [docs/portfolio-evolution.md](docs/portfolio-evolution.md).

Os tamanhos, fluxos conferidos e correções da revisão mobile ficam em [docs/mobile-validation.md](docs/mobile-validation.md).

Na revisão de escrita, foram encurtadas as descrições e retiradas promessas genéricas e afirmações absolutas sobre IA. Os números preservados já constavam do conteúdo anterior; não houve verificação externa desses resultados.

## Stack

Vue 3 · Three.js · TypeScript · Vite · SCSS · vue-router · vue-i18n (pt-BR / en-US)
