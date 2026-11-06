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

Os textos ficam em `src/locales/`, e os dados dos projetos, experiências e formação em `src/data/`. As imagens dos projetos ficam em `public/projects/`; as versões exibidas pelo site usam WebP. Para substituir uma imagem, atualize também sua versão otimizada.

O catálogo reúne cinco projetos públicos com links para o GitHub e seis projetos privados. Cada projeto tem descrição, tecnologias e um detalhe com problema, solução e resultado nos dois idiomas. A galeria aparece quando há capturas reais disponíveis; YT Signals e Filmoteca TMDB usam imagens dos próprios projetos. Para incluir um projeto público, preencha `status: 'public'`, `repoUrl` e os textos nos dois idiomas. Os testes validam os links do GitHub, as traduções e os arquivos de imagem.

O visual retoma a base da branch `main`: fundo escuro, roxo e ciano, Inter e JetBrains Mono, partículas discretas e grafo de tecnologias. O hero usa uma foto estática circular, com localização e idiomas abaixo, e uma descrição ampliada com fonte de 16 a 18 px. Os textos e os dados pessoais são compartilhados entre as versões em português e inglês.

As partículas pausam quando o topo sai da área visível abaixo do cabeçalho ou a aba fica em segundo plano e respeitam movimento reduzido. As seções entram uma vez ao aparecerem durante a rolagem, usando a Web Animations API, sem ocultar o conteúdo previamente. A versão mobile mantém a navegação e apresenta a foto com suas informações abaixo do texto e das ações. A apresentação pessoal fica concentrada no hero, e o item Sobre do menu aponta para o topo. O resumo detalhado e os idiomas são usados no currículo. Os detalhes dos projetos usam `dialog`, e o currículo continua sendo gerado apenas quando solicitado.

O atalho Pergunte sobre mim leva à demonstração interativa de RAG, com 26 perguntas e respostas preparadas nos dois idiomas. Seis perguntas pessoais ficam em destaque e as demais estão em Mais perguntas, que recolhe após a seleção. Cada resposta sugere perguntas relacionadas, incluindo as experiências no INSS, na Atalaia, na Fictor e como autônomo. O contexto técnico fica recolhido abaixo da resposta. As etapas de busca, as similaridades e a digitação são ilustrativas. A demonstração respeita movimento reduzido e cancela a resposta ao trocar de idioma ou desmontar a seção; esses fluxos são cobertos pelos testes.

As etapas aprovadas, as decisões e o que ainda será discutido ficam em [docs/portfolio-evolution.md](docs/portfolio-evolution.md).

Os tamanhos, fluxos conferidos e correções da revisão mobile ficam em [docs/mobile-validation.md](docs/mobile-validation.md).

Na revisão de escrita, foram encurtadas as descrições e retiradas promessas genéricas e afirmações absolutas sobre IA. Os números preservados já constavam do conteúdo anterior; não houve verificação externa desses resultados.

## Stack

Vue 3 · Three.js · TypeScript · Vite · SCSS · vue-router · vue-i18n (pt-BR / en-US)
