# Validação mobile

## Revisão com Bombadil — 16 de novembro de 2026

Melhorias: contraste dos textos de apoio, ações antes da decoração no topo, botões com largura total no celular e cards com descrições maiores e selos separados dos títulos. O vetor decorativo fica oculto no mobile.

Na composição mobile final, a foto tem entre 80 e 140 px, cantos arredondados e aparece ao lado do nome. Localização e idiomas ficam abaixo da descrição, antes das ações. A composição foi inspecionada em 320 e 390 px e o desktop em 1440 px; o build passou.

Validação inicial das melhorias no build de produção com Bombadil 0.7.10:

| Viewport | Execução | Estados | Violações |
| --- | --- | --- | --- |
| 320 × 740 | 30 segundos | 179 | 0 |
| 1440 × 1000 | 30 segundos | 74 | 0 |
| 390 × 844 | 45 segundos, incluindo cliques em `summary` | 633 | 0 |

A especificação em `tests/ui.bombadil.ts` mantém as propriedades padrão e verifica estouro horizontal da página e dos modais. A última execução incluiu 252 cliques em controles expansíveis, além de navegação, idiomas, perguntas e projetos. São explorações aleatórias, sem garantia de cobrir todos os caminhos.

Após a composição final com a foto ao lado do nome, uma nova execução de 15 segundos em 320 × 740 percorreu 181 estados sem violações. Trace: `/private/tmp/portfolio-bombadil-name-portrait`.

O topo foi inspecionado visualmente em 320, 390 e 844 px, incluindo movimento reduzido; capturas do Bombadil também foram revisadas para cards, menu e modais. Testes existentes, build e `git diff --check` passaram. O lint não executou: o ESLint 9 instalado não encontrou `eslint.config.*`.

Resultados locais: `/private/tmp/portfolio-bombadil-320-after`, `/private/tmp/portfolio-bombadil-desktop-after` e `/private/tmp/portfolio-bombadil-disclosures-after`. Os comandos para repetir estão no README. Sem validação em aparelho físico ou Safari e sem publicação.

## Revisão anterior

Data: 26 de outubro de 2026.

Validação responsiva feita com o Playwright do Browser, em Chrome, na prévia local. Os tamanhos abaixo são os viewports configurados no navegador.

| Viewport | Conferência |
| --- | --- |
| 320 × 740 | Navegação e contato em português e inglês, seis modais de projeto, imagens, rolagem interna, fechamento e ausência de rolagem horizontal. |
| 360 × 800 | Largura da página, menu mobile, imagens e cena WebGL. |
| 390 × 844 | Largura da página, menu mobile, imagens e cena WebGL. |
| 430 × 932 | Composição do topo, cena 3D, tecnologias e navegação para experiência. |
| 844 × 390 | Orientação horizontal, cabeçalho sem sobreposição, conteúdo sem rolagem horizontal. |

## Correções feitas

- O menu de links em uma única linha cortava o último item em 320 px. Foi substituído, no mobile, por um menu nativo com `details`, mantendo a navegação desktop.
- Os links do menu agora têm pelo menos 44 px de altura. O menu fecha ao escolher uma seção; Escape fecha e devolve o foco ao acionador.
- A altura reservada ao cabeçalho e a posição de chegada das âncoras foram ajustadas para manter os títulos visíveis.
- O e-mail do contato ultrapassava a largura da tela. A fonte agora se adapta ao viewport, com quebra de segurança para telas ainda menores.
- Os botões principais, os de contato, o retorno ao topo pelo nome e o fechamento dos projetos têm altura mínima de 44 px.

## Fluxos conferidos

- Abertura e fechamento do menu e navegação pelas cinco seções.
- Português e inglês no menu e nas áreas revisadas.
- Leitura do Sobre, retrato e informações pessoais em tela estreita.
- Renderização da esfera 3D e pausa dos efeitos quando o topo sai da área visível.
- Abertura e fechamento dos seis projetos sem estouro horizontal.
- Rolagem interna de um projeto, carregamento da imagem e acesso contínuo ao botão de fechar.
- Fechamento por Escape e liberação da rolagem da página após fechar o modal.
- Lista de tecnologias disponível no mobile, onde o grafo é ocultado.
- Links de contato e endereço `mailto:` preservados; nenhuma mensagem foi enviada.

## Limites

- A validação foi feita em viewports de celular no Chrome de desktop. Aparelho físico, Safari/iOS, gestos reais de toque e consumo de GPU/bateria não foram medidos.
- As preferências de movimento reduzido e a rejeição de eventos de toque no controle da esfera são cobertas pelos testes de lógica existentes.
- Não houve publicação do site.
