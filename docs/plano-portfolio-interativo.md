# Plano para o portfólio interativo

## Direção

O objetivo é transformar o portfólio em uma visita guiada pelos produtos que João desenvolveu. A referência é a sensação de exploração e resposta ao movimento da [Igloo](https://www.igloo.inc/), mas o conteúdo visual será próprio: interfaces reais, caminhos entre aplicativo, dados e IA, e a identidade azul clara que o site já usa. A navegação deve continuar rápida para quem só quer encontrar projetos, experiência ou contato.

O site já usa Vue 3, TypeScript e Vite. Não há motivo para trocar de framework: a migração é da apresentação e da arquitetura de movimento. Texto, links e estudos de caso permanecem em HTML acessível; o 3D é uma camada visual. A cena não pode ser um requisito para ler o portfólio.

**Contrato visual:** tipografia Metropolis e azul `#244bd7` continuam como base. As telas dos projetos fornecem as cores secundárias. Fundo claro e espaço generoso mantêm a leitura. Cada animação deve explicar uma mudança de contexto, a relação entre produtos ou uma resposta a uma ação; não haverá uma entrada animada idêntica em toda seção.

## Experiência decidida

| Trecho | O que aparece | Movimento e interação | Versão móvel / movimento reduzido |
| --- | --- | --- | --- |
| Abertura | Nome, frase de atuação, foto pequena, chamada para projetos e um modelo 3D com telefone InCubo diante do painel Fictor360 | Os aparelhos flutuam discretamente e acompanham o ponteiro; as telas são capturas reais | Composição estática dos dois produtos, sem WebGL |
| Projetos em destaque | InCubo, Fictor360 e plataforma de Gestão de Pessoas como três capítulos mais detalhados | Uma única área de destaque acompanha a rolagem: a imagem e o texto mudam juntos, com indicação clara do capítulo ativo | Capítulos em fluxo vertical comum, sem travar a rolagem |
| Demais projetos | Fictor360 AI, Portal do Candidato e Pipeline de Dados em lista editorial | Prévia responde a foco/hover com um recorte da tela e informação de papel, tecnologia e problema resolvido | Lista tocável com todas as informações visíveis |
| Sobre e experiência | Texto pessoal e linha cronológica de trabalho | A linha progride com a leitura; marcos recebem ênfase quando entram na área visível | Linha estática e ordem natural do documento |
| Competências e formação | Agrupamentos já existentes | Expansão curta, com indicador de estado claro; sem nuvem de logos girando | Mesma interação por teclado e toque |
| Contato | Convite direto e links úteis | Um traço azul, vindo do percurso visual dos projetos, converge para a ação principal | Traço estático; contato sempre clicável |

Os três projetos em destaque precisam de microcasos mais completos: contexto, responsabilidade pessoal, decisão técnica, resultado comprovável e capturas selecionadas. Não serão inventadas métricas ou telas. Projetos privados continuam identificados como privados e mostram apenas material já autorizado para o portfólio.

## Etapas de implementação

### 0. Primeiro modelo 3D — iniciado

O componente `HeroScene.vue` constrói geometria 3D leve em tempo de execução: dois aparelhos com espessura, bordas arredondadas, luz e texturas das capturas de InCubo e Fictor360. A cena entra por importação dinâmica; o fallback HTML aparece de imediato e continua disponível em telas pequenas, quando o usuário pede menos movimento ou se WebGL falha. O retrato foi preservado como avatar ao lado do nome.

**Critério de conclusão:** aparelhos inteiros em 1440, 820 e 390 px; texto e ações legíveis antes de a cena carregar; nenhuma rolagem horizontal; resposta perceptível e discreta ao ponteiro; nenhuma mensagem de erro no console; build e testes existentes passando.

### 1. Roteiro visual e dados de conteúdo

Desenhar um storyboard de cinco quadros: abertura, transição para projetos, projeto em destaque, experiência e contato. Definir a trajetória do elemento azul que liga as seções e a posição das capturas em cada quadro. Levantar, para cada projeto, o que pode ser publicado: papel, desafio, solução, capturas e resultado. O texto português será fechado antes de adaptar o inglês para evitar frases genéricas nas duas línguas.

**Entrega:** storyboard aprovado no próprio repositório, inventário das imagens existentes e conteúdo estruturado dos três microcasos. **Portão:** sem dados suficientes para um resultado, o caso descreve o efeito qualitativo e não mostra números fictícios.

### 2. Galeria narrativa dos projetos

Substituir a apresentação uniforme dos três primeiros projetos por um destaque editorial único. No desktop, a captura permanece visível durante a leitura de cada capítulo; a troca usa deslocamento e máscara curtos, sincronizados com a rolagem. O usuário pode navegar pelos capítulos com links explícitos, inclusive pelo teclado. As páginas ou modais de detalhe continuam acessíveis por clique. Os demais projetos aparecem logo depois em uma lista compacta, sem ficarem escondidos em um carrossel.

**Ferramenta:** usar [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) apenas no trecho que precisa de pinning e progresso contínuo; animações de hover e estado permanecem em CSS. A biblioteca oferece `pin` e `scrub` para esse tipo de sequência. Evitar substituir a rolagem nativa do navegador.

**Critério de conclusão:** cada projeto é alcançável sem animação, pelo teclado e por link direto; a sequência não bloqueia voltar ou avançar rapidamente; a tela pequena usa fluxo vertical; não há mudança inesperada de layout ao carregar imagens.

### 3. Movimento de interface

Criar um pequeno vocabulário: transições de 180–280 ms para controles, 400–650 ms para troca de mídia, deslocamentos curtos e uma única curva de aceleração principal. Usar o movimento para mostrar relações entre uma ação e seu resultado: seleção de projeto, abertura de detalhe, expansão de competência e progresso na experiência. O cabeçalho deve indicar a seção ativa sem saltos. O contato recebe uma conclusão visual curta do traço azul, sem botão que foge do cursor ou som automático.

**Critério de conclusão:** foco visível, toque confortável, diálogo operável por teclado e nenhuma informação que dependa de hover. A mídia `prefers-reduced-motion` desliga deslocamentos e preserva as mudanças de estado necessárias ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)).

### 4. Qualidade visual, desempenho e publicação

Revisar cada etapa no Chrome DevTools em desktop largo, 820 px e telefone de 390 px, incluindo português/inglês, teclado, toque e movimento reduzido. Medir antes/depois em build de produção com rede e CPU limitadas. O 3D deve suspender o loop de renderização fora da área visível e liberar geometria, material e textura ao desmontar, conforme a [orientação de limpeza do Three.js](https://threejs.org/manual/pages/cleanup.html).

Metas de aceite: LCP até 2,5 s, INP até 200 ms e CLS até 0,1 no percentil 75 quando houver dados de campo; em laboratório, usar as mesmas métricas como guia, sem apresentar uma medição local como resultado real de usuários ([web.dev](https://web.dev/articles/vitals)). Se o 3D prejudicar aparelhos modestos, reduzir resolução, limitar quadros ou manter a composição estática; não sacrificar o texto nem a navegação.

**Entrega:** revisão visual final, build/testes passando e comparação de desempenho com o estado anterior. Publicar só depois dessa revisão.

## Ferramentas e IA

- **Codex + skill `ui-taste`:** direção visual, implementação e revisão de hierarquia, tipografia e acabamento. Já disponíveis neste trabalho.
- **Chrome DevTools MCP:** capturas em tamanhos reais, console, rede, teste de interação e perfil de desempenho. Já conectado e usado no primeiro modelo.
- **Three.js:** geometria e renderização do modelo 3D. A importação fica isolada da rota principal e só ocorre onde a cena faz sentido.
- **GSAP ScrollTrigger:** entra apenas na etapa da galeria narrativa. Ainda não é dependência do projeto.
- **ImageGen:** opcional para um fundo/arte de apoio original se as capturas reais não bastarem; nunca substitui capturas de produtos por interfaces inventadas.
- **Figma:** opção para montar um storyboard editável e revisar a direção com outras pessoas. O conector foi sugerido, mas depende de conexão do usuário; não é pré-requisito para implementar o site.

## Ordem e estimativa

Depois do primeiro modelo, executar as etapas 1 a 4 nessa ordem. Estimativa inicial para uma pessoa: 1–2 dias de roteiro e conteúdo, 3–5 dias da galeria, 2–3 dias de movimento de interface, 2–3 dias de QA e otimização. Ajustar depois do inventário de conteúdo e das primeiras medições; o maior risco de prazo é preparar casos de projeto publicáveis, não escrever animações.
