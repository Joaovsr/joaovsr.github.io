import type { IProject } from '@/interfaces/project'

export const projects: IProject[] = [
  {
    id: 1,
    title: 'Super-App Fictor Alimentos',
    description: {
      'pt-BR':
        'Plataforma interna desenvolvida do zero para digitalizar operações da Fictor Alimentos. Centraliza reserva de veículos com fluxo de aprovação e validação por IA, hospedagem em hotéis, comunicados internos com notificações em tempo real e dashboards de BI — tudo com autenticação corporativa via Azure AD e RBAC por módulo.',
      'en-US':
        'Internal platform built from scratch to digitize Fictor Alimentos operations. Centralizes vehicle reservations with approval workflows and AI validation, hotel bookings, internal announcements with real-time push notifications, and BI dashboards — all with Azure AD corporate auth and per-module RBAC.',
    },
    technologies: ['Flutter', 'NestJS', 'React', 'TypeScript', 'Kubernetes', 'RabbitMQ'],
    status: 'private',
  },
  {
    id: 2,
    title: 'Fictor360 — Power BI Embedded',
    description: {
      'pt-BR':
        'Módulo que leva dashboards Power BI diretamente ao Super-App, garantindo que cada usuário veja apenas os dados do seu perfil via RLS configurado por papel e grupo Azure. Geração de embed tokens dinâmicos e gerenciamento de workspaces via API.',
      'en-US':
        'Module that brings Power BI dashboards directly into the Super-App, ensuring each user sees only their own data through role and Azure group-based RLS. Dynamic embed token generation and workspace management via API.',
    },
    technologies: ['Power BI', 'NestJS', 'TypeScript', 'Azure AD', 'GraphQL'],
    status: 'private',
  },
  {
    id: 3,
    title: 'Plataforma de RH com IA',
    description: {
      'pt-BR':
        'Sistema corporativo de recrutamento com pipeline Kanban, SLA automático e scoring semântico de currículos usando Azure OpenAI + pgvector. Autenticação via Azure AD (SSO + RBAC), jobs assíncronos com Bull e integração bidirecional com portal externo via webhooks.',
      'en-US':
        'Corporate recruitment system with Kanban pipeline, automatic SLA tracking, and semantic CV scoring using Azure OpenAI + pgvector. Azure AD authentication (SSO + RBAC), async jobs with Bull, and bidirectional integration with an external portal via webhooks.',
    },
    technologies: ['NestJS', 'React', 'PostgreSQL', 'pgvector', 'Azure OpenAI', 'Azure AD', 'Bull'],
    status: 'private',
  },
  {
    id: 4,
    title: 'Fictor360 AI — Insights com IA',
    description: {
      'pt-BR':
        'Agente conversacional que transforma perguntas em linguagem natural em queries DAX e consulta modelos semânticos do Power BI em tempo real. Orquestrado com LangGraph, gera e valida DAX via MCP, transmite respostas por streaming WebSocket e produz um perfil completo do modelo semântico para orientar o raciocínio do LLM.',
      'en-US':
        'Conversational agent that turns natural language questions into DAX queries and queries Power BI semantic models in real time. Orchestrated with LangGraph, generates and validates DAX via MCP, streams responses over WebSocket, and produces a full semantic model profile to guide LLM reasoning.',
    },
    technologies: ['LangGraph', 'Azure OpenAI', 'NestJS', 'TypeScript', 'Power BI MCP', 'DAX'],
    status: 'private',
  },
  {
    id: 5,
    title: 'Portal do Candidato — Fictor Alimentos',
    description: {
      'pt-BR':
        'Portal público de recrutamento desacoplado do sistema interno de RH, com autenticação multicanal (OAuth2 Google/LinkedIn + e-mail), scoring automático de currículos por IA e sincronização bidirecional via webhooks. Desenvolvido com conformidade à LGPD e rate limiting por IP.',
      'en-US':
        'Public recruitment portal decoupled from the internal HR system, with multi-channel authentication (OAuth2 Google/LinkedIn + email), automatic AI-powered CV scoring, and bidirectional sync via webhooks. Built with LGPD compliance and IP-based rate limiting.',
    },
    technologies: ['NestJS', 'React', 'Vite', 'PostgreSQL', 'OAuth2', 'Azure OpenAI', 'SendGrid'],
    status: 'private',
  },
  {
    id: 6,
    title: 'Pipeline de Dados BI',
    description: {
      'pt-BR':
        'Pipelines em Python para extração, tratamento e carga de dados de múltiplas fontes internas. Implantação e configuração do Metabase como BI self-service para gestores, com dashboards conectados ao Power BI para consolidação de indicadores.',
      'en-US':
        'Python pipelines for extracting, transforming, and loading data from multiple internal sources. Metabase deployment as a self-service BI tool for managers, with dashboards connected to Power BI for KPI consolidation.',
    },
    technologies: ['Python', 'Pandas', 'Metabase', 'Power BI', 'SQL'],
    status: 'private',
  },
]
