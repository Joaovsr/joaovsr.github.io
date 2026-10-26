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
- Fazer nome, descrição e ações aparecerem com uma entrada breve, uma única vez.
- Limitar o cursor piscando para evitar um segundo foco de movimento contínuo junto da esfera.
- No celular, priorizar nome, descrição e ações, com a esfera compacta e menos partículas.
- Com preferência por movimento reduzido, apresentar uma composição estática e completa.
- Pausar os efeitos contínuos fora da área visível ou com a aba em segundo plano.
- Fazer cada seção entrar uma vez ao aparecer durante a rolagem, com opacidade e deslocamento vertical de 20 px em 650 ms. O efeito respeita movimento reduzido e não oculta o conteúdo antes da entrada.

**Validação:** testes de limites do mouse, rotação por scroll, retorno ao centro, toque, movimento reduzido, visibilidade, geometria, liberação dos recursos e entrada única por seção. Verificação pelo Playwright do Browser da renderização WebGL e da apresentação em desktop e viewport de celular. O cabeçalho fixo é descontado da área visível para pausar corretamente os efeitos.

A apresentação da `main` foi recuperada na branch de trabalho, mantendo os textos revisados e as imagens WebP. A demonstração de RAG permanece para a decisão da etapa 5; a ação do topo leva aos projetos.

A validação mobile e as correções de navegação, áreas de toque e contato estão registradas em [mobile-validation.md](mobile-validation.md).

## 2. Abertura mais pessoal

**Status:** pendente; texto principal aprovado.

- Manter o nome em destaque.
- Avaliar se o bloco de números de embeddings deve continuar ou dar lugar a conteúdo mais pessoal ou a um projeto real.
- Definir a hierarquia das ações para conhecer os projetos, baixar o currículo e entrar em contato.

Texto aprovado em português:

> Crio aplicações web, apps mobile e agentes de IA. Trabalho em todo o produto: interface, backend, integrações e deploy.

Versão em inglês já aplicada na branch `dev`:

> I build web applications, mobile apps and AI agents. I work across the entire product: interface, backend, integrations and deployment.

## 3. Projetos com mais presença

**Status:** pendente.

- Escolher os projetos em destaque e a organização do catálogo; a divisão entre profissionais e pessoais ainda não foi definida.
- Usar imagens reais quando disponíveis e uma frase clara sobre o que cada projeto faz.
- Deixar detalhes técnicos para a apresentação completa de cada projeto.
- Incluir os projetos encontrados nas pastas vizinhas:
  - `insights-yt`: análise de comentários do YouTube, com API Go e interface React.
  - `deimproviso`: aplicação web para praticar fala e improvisação.
  - `tmdb-movies-agent-kit`: aplicativo Android de filmes em Kotlin; não descrevê-lo como agente de IA com base no nome da pasta.
  - `agente-financeiro`: agente financeiro pessoal para Telegram.
  - `agentes/agent-aws`: prova de conceito de agente com RAG e infraestrutura AWS.
  - `agentes/agents-callcenter`: projeto de agentes para atendimento e campanhas.
- Descrever somente funcionalidades implementadas; distinguir demonstrações, protótipos e uso em produção.
- Confirmar links e disponibilidade pública antes de exibir acesso ao código ou ao site.

## 4. Escrita mais concreta

**Status:** Sobre atualizado a pedido do usuário; revisão das demais seções pendente.

- O Sobre apresenta um retrato maior, uma abertura pessoal, a evolução do suporte de TI para o desenvolvimento full stack e contato e idiomas na mesma composição. A organização foi conferida em tela estreita, nos dois idiomas, antes da última revisão de texto.

- Revisar o Sobre, as experiências e os projetos com foco no que foi construído, nas decisões e nos resultados.
- Reduzir expressões genéricas, jargões desnecessários e afirmações absolutas sobre IA.
- Conferir percentuais e outras métricas antes de mantê-los como resultados comprovados.
- Manter português e inglês equivalentes.
- Atualizações de conteúdo fornecidas pelo usuário: MBA Lato Sensu da USP em Data Science, Inteligência Artificial e Analytics, iniciado em junho de 2026 e em andamento; experiência na Atalaia dividida entre Técnico de TI (setembro de 2022 a dezembro de 2023) e Desenvolvedor Full Stack Pleno (janeiro de 2024 a março de 2025), com descrições e tecnologias por cargo. Dados e textos atualizados no site e no gerador de currículo, com testes de conteúdo e build aprovados.

## Avatar animado

**Status:** proposta em discussão; estilo ainda não definido.

- Usar a foto existente como referência para a aparência do usuário.
- Opções apresentadas: 3D estilizado, ilustração 2D com animações leves ou retrato realista animado.
- Explorar movimentos discretos, como piscar, respiração e acompanhamento do mouse, com versão estática para movimento reduzido e atenção ao custo no celular.
- Para um avatar 3D com expressões, criar ou obter um modelo próprio com controles faciais e animações, antes da integração com Three.js.
- Local no site e substituição da esfera ou do retrato ainda serão definidos.

## 5. Interatividade ligada ao trabalho

**Status:** pendente.

- Avaliar conectar tecnologias do grafo aos projetos em que foram usadas.
- Decidir o papel de Pergunte ao meu portfólio. A implementação da `main` usa respostas prontas e uma simulação de RAG.
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
