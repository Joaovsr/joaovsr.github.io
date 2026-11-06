# Mapeamento de perguntas para Pergunte sobre mim

**Status:** implementado. A seção tem 26 perguntas em português e inglês, com seis perguntas pessoais em destaque e vinte em Mais perguntas. Cada resposta oferece sugestões relacionadas ao assunto.

## Objetivo

Ampliar a demonstração com perguntas úteis para recrutadores e clientes, apoiadas na trajetória e nos projetos existentes. As respostas devem apresentar entregas e decisões concretas, manter português e inglês equivalentes e distinguir uso em produção de provas de conceito e testes locais.

## Cobertura atual

As vinte perguntas existentes foram mantidas. A apresentação pessoal agora inclui localização e trabalho remoto, jeito de trabalhar, contato e uma visão geral da trajetória, com perguntas próprias sobre INSS, Atalaia, Fictor e atuação autônoma.

## Perguntas em destaque

- Quem é você e com o que trabalha?
- Por quais empresas você já passou?
- Onde você mora e trabalha remotamente?
- Qual é sua formação?
- Qual é seu nível de inglês?
- O que você valoriza no seu jeito de trabalhar?

## Perguntas pessoais e trajetória

### q21: Quem é você e com o que trabalha?

Apresentar João Vinicius Rodrigues, sua atuação full stack e em engenharia de IA e a passagem pelo suporte e pela automação. Base: apresentação pessoal e experiências existentes.

### q22: Onde você mora e trabalha remotamente?

Informar Barbacena, Minas Gerais, Brasil, a atuação autônoma remota e a abertura a oportunidades internacionais. Base: localização, disponibilidade remota e experiência autônoma. Não prometer prazo para início ou carga horária.

### q23: Por quais empresas você já passou?

Resumir INSS, Atalaia Alimentos, Fictor Alimentos e a atuação autônoma atual, usando cargos e períodos de `src/data/experience.ts`. As sugestões levam diretamente às perguntas sobre cada uma dessas etapas.

### q24: Como foi sua experiência no INSS?

Descrever o estágio de agosto de 2019 a maio de 2020: suporte, manutenção, redes, recuperação e reinstalação de sistemas. Base: experiência do INSS no cadastro e nas traduções.

### q25: O que você valoriza no seu jeito de trabalhar?

Usar os valores da apresentação pessoal enviada pelo usuário: curiosidade e aprendizado contínuo, adaptabilidade e visão de ponta a ponta. Relacioná-los à trajetória registrada em suporte, automação e desenvolvimento, sem inventar resultados ou avaliações de desempenho.

### q26: Como posso entrar em contato com você?

Apresentar o e-mail e os perfis de LinkedIn e GitHub cadastrados em `src/data/profile.ts` e orientar para os links da seção de contato.

## Perguntas mapeadas

### q9: Que tipo de projeto posso desenvolver com você?

- **Prioridade:** Complementar.
- **Inglês:** What kind of project can we build together?
- **Direção da resposta:** Apresentar os tipos de entrega já realizados: aplicações web e mobile, sistemas internos, agentes de qualificação e conversão de leads, plataformas de análise de documentos jurídicos e integrações. Incluir avaliação de LLMs e arquiteturas AWS. Evitar prometer escopo, prazo ou disponibilidade ainda não definidos.
- **Base disponível:** Experiência autônoma, Fictor e Atalaia em src/locales/pt-BR.json; src/data/experience.ts.

### q10: Com o que você trabalha no frontend?

- **Prioridade:** Complementar.
- **Inglês:** Which frontend technologies do you work with?
- **Direção da resposta:** Explicar a atuação com React, Next.js e TypeScript nas aplicações e com Vue no próprio portfólio. Relacionar interface e integração com APIs.
- **Base disponível:** Descrição da Fictor em src/locales/pt-BR.json; package.json; src/data/skills.ts.

### q11: Você já criou agentes que atendem por voz?

- **Prioridade:** Primeira rodada.
- **Inglês:** Have you built voice-enabled agents?
- **Direção da resposta:** Usar o agente conversacional de qualificação e conversão de leads da atuação autônoma como exemplo, mantendo a experiência já informada com texto, voz, Python, FastAPI, Celery, Redis e Azure OpenAI. Não atribuir resultados comerciais ou volumes não fornecidos.
- **Base disponível:** experience.self_employed.description em src/locales/pt-BR.json.

### q12: Como você avalia e melhora um agente de IA?

- **Prioridade:** Primeira rodada.
- **Inglês:** How do you evaluate and improve an AI agent?
- **Direção da resposta:** Cobrir avaliação e benchmarking de LLMs considerando desempenho, qualidade das respostas, latência e custo-benefício, além de observabilidade e confiabilidade. Usar o experimento de retrieval do agente AWS como exemplo de comparação entre variantes e casos sem resposta.
- **Base disponível:** Experiência autônoma; ../agentes/agent-aws/agent/evals/results/rag-ab-2026-09-01.md.

### q13: Que decisão técnica você precisou rever?

- **Prioridade:** Primeira rodada.
- **Inglês:** What technical decision did you reconsider?
- **Direção da resposta:** Contar o caso da busca híbrida no agente AWS: a combinação com BM25/RRF ampliou a recuperação, mas também aceitou casos que deveriam ser rejeitados. A decisão registrada foi priorizar rewriting/expansão sem a busca híbrida como padrão. Contextualizar como resultado daquele experimento, sem generalizar para qualquer RAG.
- **Base disponível:** Seção Decisão de ../agentes/agent-aws/agent/evals/results/rag-ab-2026-09-01.md.

### q14: Como você integra agentes a ERPs e APIs?

- **Prioridade:** Primeira rodada.
- **Inglês:** How do you integrate agents with ERPs and APIs?
- **Direção da resposta:** Descrever a refatoração do agente de cobrança no WhatsApp com FastAPI e LangGraph e sua integração ao Agrosys via MCP Server, incluindo mensagens automáticas e encaminhamento humano.
- **Base disponível:** experience.fictor.description em src/locales/pt-BR.json.

### q15: Como você controla o acesso aos dados?

- **Prioridade:** Complementar.
- **Inglês:** How do you control access to data?
- **Direção da resposta:** Conectar permissões por perfil no RH multitenant, identidade com Microsoft Entra ID e RLS no Power BI. Explicar os limites de acesso em termos do que cada usuário pode consultar.
- **Base disponível:** Experiência na Fictor e casos hr_platform e fictor360_pbi em src/locales/pt-BR.json.

### q16: Como você coloca uma aplicação em produção?

- **Prioridade:** Primeira rodada.
- **Inglês:** How do you deploy an application to production?
- **Direção da resposta:** Falar das arquiteturas escaláveis na AWS com AWS Lambda e Amazon ECS na atuação autônoma e dos pipelines de CI/CD no Azure DevOps, Docker e Kubernetes na Fictor. Distinguir essas experiências das verificações locais de projetos pessoais.
- **Base disponível:** experience.fictor.description e experience.self_employed.description em src/locales/pt-BR.json.

### q17: Qual sua experiência com dados e BI?

- **Prioridade:** Complementar.
- **Inglês:** What is your experience with data and BI?
- **Direção da resposta:** Reunir automações e integrações em Python, modelagem e dashboards no Metabase e Power BI Embedded. Mostrar a evolução de disponibilizar dados para permitir consultas por linguagem natural.
- **Base disponível:** Experiência na Atalaia e Fictor; casos data_pipeline, fictor360_pbi e fictor360_ai.

### q18: Quais projetos pessoais você já criou?

- **Prioridade:** Primeira rodada.
- **Inglês:** What personal projects have you built?
- **Direção da resposta:** Apresentar os cinco projetos públicos do catálogo: YT Signals, Filmoteca TMDB, Agente Financeiro, Theo GLPI e Ask About Me. Explicar o propósito de cada um e distinguir implementação local, integração em desenvolvimento e uso contínuo em validação. Orientar para os links da seção de projetos.
- **Base disponível:** docs/portfolio-evolution.md; src/data/projects.ts; READMEs públicos dos cinco repositórios, conferidos no GitHub.

### q19: Qual é seu nível de inglês?

- **Prioridade:** Complementar.
- **Inglês:** What is your English proficiency?
- **Direção da resposta:** Informar inglês avançado e português nativo. Não inventar certificações, experiência com clientes internacionais ou preferência de fuso.
- **Base disponível:** about.languages em src/locales/pt-BR.json.

### q20: Como você limita as ações de um agente?

- **Prioridade:** Complementar.
- **Inglês:** How do you constrain an agent's actions?
- **Direção da resposta:** Usar o agente financeiro como exemplo: o modelo interpreta a mensagem e solicita ferramentas; autorização, regras, cálculos e gravações são validados pelo servidor. Documentos geram propostas revisáveis antes dos lançamentos. Explicitar o estado de validação do projeto.
- **Base disponível:** ../agente-financeiro/README.md; ../agente-financeiro/docs/implementation-status.md.

## Perguntas que exigem informações adicionais

Estas perguntas não foram cadastradas:

- **Como funciona uma contratação com você?** Definir etapas de contato, levantamento de escopo, proposta e acompanhamento antes de preparar a resposta.
- **Qual sua disponibilidade para começar um projeto?** Confirmar disponibilidade real antes de publicar prazos ou carga horária.

## Apresentação implementada

Seis perguntas pessoais ficam visíveis inicialmente. As demais estão em um controle nativo Mais perguntas, que recolhe ao selecionar uma pergunta e devolve o foco ao acionador. A pergunta selecionada aparece junto da resposta, seguida de sugestões explícitas de assuntos relacionados. Ao escolher uma sugestão, o foco vai para a nova resposta. O contexto técnico continua disponível em um detalhe recolhido, depois da resposta e das sugestões.

Os testes conferem perguntas, respostas, trechos de contexto, fontes existentes, identificadores únicos e sugestões válidas, além dos fluxos de animação, movimento reduzido e cancelamento.

A conferência no navegador validou desktop e celular de 390 px e 320 px, perguntas iniciais, sugestões sobre cada empresa, seleção de perguntas relacionadas com foco na nova resposta, recolhimento de Mais perguntas, contexto expansível, contato, troca de idioma e resposta animada.

## Critérios de escrita

- Cada pergunta deve responder a uma dúvida diferente sobre o profissional.
- Usar uma resposta curta, com um exemplo concreto quando houver evidência.
- Evitar explicações genéricas de conceitos que não ajudem a conhecer a atuação de João.
- Não acrescentar métricas, clientes, resultados comerciais ou garantias não documentados.
- A demonstração continua com respostas preparadas; as similaridades visuais não são medições reais de uma busca.
