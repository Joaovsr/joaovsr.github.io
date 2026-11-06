# Plano de evolução do portfólio

## Direção aprovada

- Usar o layout da branch `main` como base visual: fundo escuro, roxo e ciano, tipografia e elementos animados.
- Deixar de lado a direção visual clara da branch `dev`.
- Discutir e desenvolver uma etapa por vez, preservando a identidade do site antigo.
- As propostas abaixo foram aprovadas como pauta. As escolhas específicas de cada etapa ainda serão discutidas.

## 1. Topo e animações

**Status:** segunda versão com Three.js implementada; em revisão visual com o usuário.

- Avaliar o papel da esfera, das partículas, do brilho e do cursor piscando.
- Definir a intensidade dos efeitos e uma entrada suave no início.
- Melhorar as transições dos projetos quando chegarmos ao catálogo.
- Reduzir efeitos no celular e respeitar a preferência por menos movimento.
- Pausar animações contínuas quando não forem visíveis.

**Decisões confirmadas:** manter a esfera com reação sutil ao mouse, adicionar efeitos ao rolar a página e explorar Three.js para dar profundidade à cena.

### Comportamento implementado

Após conferir o topo do site publicado em desktop:

- Manter a esfera na coluna direita como assinatura visual, com movimento lento e brilho suave. A reação ao mouse se limita a 8 px na horizontal e 6 px na vertical, com retorno suave ao centro ao sair do topo; toque não aciona a reação.
- Usar uma cena Three.js com conexões, pontos luminosos, órbitas em planos diferentes e shaders. O mouse e a profundidade do scroll alteram a orientação da esfera. A cena é carregada separadamente, limita a densidade de pixels a 1,5 e oferece uma alternativa estática quando WebGL não está disponível.
- Tornar as partículas de fundo mais discretas, preservando a leitura do nome e do texto.
- Remover o bloco de contadores abaixo da esfera (anos de experiência, projetos e certificações), conforme a escolha final do usuário; manter o espaço livre.
- Fazer nome, descrição e ações aparecerem com uma entrada breve, uma única vez.
- Limitar o cursor piscando para evitar um segundo foco de movimento contínuo junto da esfera.
- No celular, priorizar nome, descrição e ações, com a esfera compacta e menos partículas.
- Com preferência por movimento reduzido, apresentar uma composição estática e completa.
- Pausar os efeitos contínuos fora da área visível ou com a aba em segundo plano.
- Fazer cada seção entrar uma vez ao aparecer durante a rolagem, com opacidade e deslocamento vertical de 20 px em 650 ms. O efeito respeita movimento reduzido e não oculta o conteúdo antes da entrada.

**Validação:** testes de limites do mouse, rotação por scroll, retorno ao centro, toque, movimento reduzido, visibilidade, geometria, liberação dos recursos e entrada única por seção. Verificação pelo Playwright do Browser da renderização WebGL e da apresentação em desktop e viewport de celular. O cabeçalho fixo é descontado da área visível para pausar corretamente os efeitos.

A apresentação da `main` foi recuperada na branch de trabalho, mantendo os textos revisados e as imagens WebP. A seção Pergunte sobre mim e o atalho no topo foram restaurados, com respostas preparadas e valores ilustrativos de similaridade. As perguntas incluem a atuação autônoma, Fictor, progressão na Atalaia, USP, backend e mobile.

A validação mobile e as correções de navegação, áreas de toque e contato estão registradas em [mobile-validation.md](mobile-validation.md).

## 2. Abertura mais pessoal

**Status:** apresentação concentrada no hero, com descrição ampliada e foto estática acompanhada de localização e idiomas; bloco de embeddings ainda sujeito a revisão.

- Manter o nome em destaque.
- Remover a seção Sobre separada, conforme a escolha do usuário, e direcionar o item Sobre do menu ao hero. Manter a seção interativa Pergunte sobre mim. O resumo detalhado continua disponível no currículo; localização e idiomas também aparecem sob a foto no hero.
- Ampliar a descrição destacando ferramentas e competências: Python, TypeScript, React, Flutter, FastAPI, NestJS, LLMs, RAG, integrações, Docker e AWS, com fonte entre 16 e 18 px conforme a largura da tela. Manter o texto geral sobre a atuação, sem exemplos de soluções desenvolvidas. Abaixo da foto, mostrar Minas Gerais, Brasil e os níveis de português e inglês, reutilizando as traduções existentes e uma linha divisória discreta.
- Avaliar se o bloco de números de embeddings deve continuar ou dar lugar a conteúdo mais pessoal ou a um projeto real.
- Definir a hierarquia das ações para conhecer os projetos, baixar o currículo e entrar em contato.

Texto atual em português:

> Crio aplicações web, apps mobile e agentes de IA. Trabalho com Python, TypeScript, React, Flutter, FastAPI e NestJS, além de LLMs, RAG e integrações entre sistemas. Atuo da arquitetura ao deploy, com Docker e AWS.

Versão em inglês:

> I build web applications, mobile apps and AI agents. I work with Python, TypeScript, React, Flutter, FastAPI and NestJS, as well as LLMs, RAG and system integrations. I cover architecture through deployment, using Docker and AWS.

## 3. Projetos com mais presença

**Status:** cinco projetos públicos incluídos e catálogo ordenado por relevância para desenvolvimento full stack e IA aplicada.

- Priorizar IA aplicada, agentes e RAG, arquitetura, entregas empresariais e código disponível para avaliação. A abertura combina Fictor360 AI, Gestão de Pessoas com IA e Agente Financeiro; os demais seguem por escopo técnico e proximidade com a atuação atual, sem separar públicos e privados em grupos.
- Usar imagens reais quando disponíveis e uma frase clara sobre o que cada projeto faz.
- Deixar detalhes técnicos para a apresentação completa de cada projeto.
- Incluir os projetos encontrados nas pastas vizinhas:
  - `insights-yt`: incluído como [YT Signals](https://github.com/Joaovsr/yt-signals), com React, backend Node.js e extensão Chrome local. A API Go antiga não faz parte da aplicação ativa.
  - `deimproviso`: aplicação web para praticar fala e improvisação; inclusão pendente porque o repositório De Improviso está privado.
  - `tmdb-movies-agent-kit`: incluído como [Filmoteca TMDB](https://github.com/Joaovsr/fimoteca-tmbd), aplicativo Android de filmes em Kotlin.
  - `agente-financeiro`: incluído como [Agente Financeiro](https://github.com/Joaovsr/agente-financeiro), para Telegram, com validação de regras no servidor.
  - `agentes/agent-aws`: prova de conceito de agente com RAG e infraestrutura AWS; inclusão pendente porque o repositório está privado.
  - `agentes/agents-callcenter`: agentes para atendimento e campanhas; inclusão pendente porque o repositório está privado.
- Incluídos também [Theo GLPI](https://github.com/Joaovsr/theo-glpi), agente de suporte em desenvolvimento, e [Ask About Me](https://github.com/Joaovsr/ask-about-me), backend de conteúdo e RAG com integração pública em desenvolvimento.
- Visibilidade dos cinco repositórios confirmada no GitHub em 06/11/2026. Os novos cards e os detalhes exibem Projeto público e links para o código. Os seis projetos privados existentes foram preservados. As galerias são condicionais; YT Signals e Filmoteca TMDB têm capturas reais otimizadas para WebP.
- Descrever somente funcionalidades implementadas; distinguir demonstrações, protótipos e uso em produção.
- Confirmar links e disponibilidade pública antes de exibir acesso ao código ou ao site.

## 4. Escrita mais concreta

**Status:** apresentação atualizada e concentrada no hero a pedido do usuário; revisão das demais seções pendente.

- A seção Sobre separada foi removida. O hero mantém a apresentação aprovada; o texto detalhado sobre a evolução do suporte de TI ao desenvolvimento full stack e os idiomas são usados no currículo.

- Revisar o Sobre, as experiências e os projetos com foco no que foi construído, nas decisões e nos resultados.
- Reduzir expressões genéricas, jargões desnecessários e afirmações absolutas sobre IA.
- Conferir percentuais e outras métricas antes de mantê-los como resultados comprovados.
- Manter português e inglês equivalentes.
- Atualizações de conteúdo fornecidas pelo usuário: MBA Lato Sensu da USP em Data Science, Inteligência Artificial e Analytics, iniciado em junho de 2026 e em andamento; experiência na Atalaia dividida entre Técnico de TI (setembro de 2022 a dezembro de 2023) e Desenvolvedor Full Stack Pleno (janeiro de 2024 a março de 2025), com descrições e tecnologias por cargo. Dados e textos atualizados no site e no gerador de currículo, com testes de conteúdo e build aprovados.
- Atuação autônoma adicionada a partir de junho de 2026 até o presente, em trabalho remoto. Cargo na Fictor atualizado para Full Stack Sênior com IA Generativa e agentes, em Belo Horizonte, de março de 2025 a maio de 2026, com as entregas fornecidas pelo usuário. Português, inglês e gerador de currículo usam os mesmos dados atualizados.
- Descrição da atuação autônoma complementada com arquitetura, desenvolvimento e manutenção de um agente de qualificação e conversão de leads e de uma plataforma de análise e processamento de grandes volumes de documentos jurídicos; benchmarking de LLMs; e arquiteturas AWS com AWS Lambda e Amazon ECS. As respostas relacionadas de Pergunte sobre mim acompanham a atualização.

## Avatar animado

**Status:** proposta em discussão; estilo ainda não definido.

- Usar a foto existente como referência para a aparência do usuário.
- Opções apresentadas: 3D estilizado, ilustração 2D com animações leves ou retrato realista animado.
- Explorar movimentos discretos, como piscar, respiração e acompanhamento do mouse, com versão estática para movimento reduzido e atenção ao custo no celular.
- Para um avatar 3D com expressões, criar ou obter um modelo próprio com controles faciais e animações, antes da integração com Three.js.
- O local do avatar ainda será definido; a apresentação pessoal agora fica concentrada no hero.

## 5. Interatividade ligada ao trabalho

**Status:** pendente.

- Avaliar conectar tecnologias do grafo aos projetos em que foram usadas.
- Pergunte sobre mim restaurado e ampliado conforme [ask-about-me-questions.md](ask-about-me-questions.md): 26 perguntas nos dois idiomas, com apresentação pessoal, localização, idiomas, jeito de trabalhar, contato e trajetória no INSS, na Atalaia, na Fictor e como autônomo. Seis perguntas pessoais ficam em destaque; as demais estão em Mais perguntas. Cada resposta oferece sugestões relacionadas ao assunto e mantém o contexto técnico recolhido abaixo. Os testes cobrem traduções, sintaxe das mensagens, respostas, contexto, relações válidas, movimento reduzido, seleção inválida e cancelamento. A conferência no navegador validou desktop, celular de 390 px e 320 px, troca de idioma, resposta animada, sugestões e foco por teclado.
- Se a demonstração continuar, deixar sua natureza clara para o visitante.
- Considerar uma integração real apenas como uma decisão própria, sem assumir que ela é necessária.
- Garantir que os conteúdos também sejam acessíveis por teclado e no celular.

## 6. Manutenção simples

**Status:** pendente.

- Reunir os dados de cada projeto, incluindo textos nos dois idiomas, tecnologias, links e imagens, em um único cadastro.
- Permitir projetos sem imagens ou links públicos.
- Documentar como adicionar um projeto e manter uma verificação pequena para campos, traduções e arquivos de imagem.
- Escolher a estrutura mínima necessária quando chegarmos a esta etapa.

## Validação durante a implementação

- Conferir o resultado no desktop e no celular.
- Exercitar navegação, foco, movimento reduzido e os estados dos componentes alterados.
- Rodar as verificações adequadas a cada mudança.
- Não publicar o site como parte das discussões ou das prévias locais.

## Referência visual: Glaucia Lemos

**Análise em 30/10/2026. Status:** proposta de direção em discussão; nenhuma mudança visual aplicada nesta etapa.

Referências: [Início](https://glaucialemos.dev/), [Projetos](https://glaucialemos.dev/en/projetos) e [README do projeto atual](https://github.com/glaucia86/glaucialemos.dev/blob/main/README.pt-BR.md). O repositório antigo `glaucialemos` aparece nas fontes da carreira, mas a implementação atual está em `glaucialemos.dev`.

### O que aproveitar

- Uma cena com identidade própria: paisagem, personagens, objetos e atmosfera em camadas independentes. O personagem participa das interações; na home, clicar na Glaucia abre um telescópio com marcos da carreira.
- Movimento ligado ao conteúdo e à rolagem, com possibilidade de reduzir animações. No celular de 390 × 844, texto e ações vêm antes da cena, e as duas páginas observadas não apresentaram overflow horizontal.
- Catálogo com projeto em destaque, filtros e detalhes técnicos expansíveis. Para este portfólio, priorizar imagens reais e descrições do produto, aproveitando os projetos pessoais já mapeados.
- A página Projetos mostra o processo de arte: pose produzida no Grok, recorte, preparação e composição do sprite. O README documenta processamento Node/Sharp, WebP transparente e metadata de posição. Essa abordagem permite um avatar animado em uma cena ilustrada sem exigir um personagem 3D completo.

### Tecnologias verificadas

O [package.json](https://github.com/glaucia86/glaucialemos.dev/blob/main/package.json), o README e os arquivos carregados no navegador confirmam Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP 3 e Lenis. A [configuração de GSAP](https://github.com/glaucia86/glaucialemos.dev/blob/main/src/lib/gsap.ts) registra ScrollTrigger e plugins para texto, SVG e arraste. Canvas 2D, SVG e CSS compõem as cenas; o README identifica cobe no globo WebGL e Web Audio para o som. Three.js não é necessário para reproduzir o princípio de composição observado.

Para o nosso site, manter Vue, TypeScript, SCSS e Three.js existentes. GSAP/ScrollTrigger é uma opção para coreografias de scroll mais extensas quando a etapa exigir; Lenis fica fora da primeira proposta. Nenhuma dependência foi adicionada.

### Direção recomendada: laboratório digital

- **Propósito:** apresentar João e permitir entender rapidamente os produtos, apps e agentes que constrói.
- **Primeira tela:** apresentação na esquerda e uma bancada ilustrada na direita, com avatar próprio e telas inspiradas nos projetos reais. Manter a apresentação pessoal concentrada no hero e preservar Pergunte sobre mim.
- **Identidade:** conservar fundo `#06070d`, superfície `#0d0f1a`, roxo `#7c5cff`, ciano `#22d3ee` e texto `#e2e8f0`. Inter para leitura e JetBrains Mono para pequenos elementos técnicos; o tratamento em pixel art depende da escolha visual do usuário.
- **Interação:** profundidade discreta ao mouse, luz e câmera acompanhando a rolagem. O avatar pode oferecer um atalho para Pergunte sobre mim, que também permanece acessível por texto e teclado.
- **Mobile:** texto e ações primeiro, cena compacta em seguida, rolagem nativa e composição estática completa com movimento reduzido.
- **Arte:** criar cenário e personagem originais; usar imagens reais dos projetos nas telas. Gerar uma imagem de conceito antes de produzir poses e animações. Uma ilustração animada em camadas é diferente de um modelo 3D com controles faciais.
- **Primeira entrega proposta:** conceito estático do hero para revisar enquadramento, avatar, leitura e composição em desktop/mobile; depois implementar o movimento escolhido.

Alternativas apresentadas ao usuário: exploração espacial em pixel art, mais próxima da referência, ou estúdio totalmente 3D. A escolha segue pendente; estas propostas não substituem as decisões já aprovadas.
