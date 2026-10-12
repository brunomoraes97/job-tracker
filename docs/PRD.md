# PRD — Radar (job-tracker)

| | |
|---|---|
| **Produto** | Radar — acompanhamento de vagas, estúdio de currículo e tracker de candidaturas |
| **Repositório** | `brunomoraes97/job-tracker` |
| **Autor / dono** | Matheus Bruno de Moraes |
| **Status** | Rascunho v0.1 — fase 1 (camada de apresentação) em andamento |
| **Última atualização** | 12/10/2026 |

---

## 1. Problema

Procurar emprego remoto internacional é um trabalho de tempo parcial com ferramentas ruins:

- **As vagas estão espalhadas.** LinkedIn, Wellfound, Remote OK e — principalmente — as páginas dos sistemas de recrutamento (Greenhouse, Lever, Ashby, Workable…). Muitas vagas aparecem primeiro, ou só, nesses sistemas, e alertas comuns não as encontram.
- **Cada candidatura pede um currículo ajustado.** Reescrever resumo, reordenar experiências e acertar palavras-chave para cada vaga leva de 30 a 60 minutos. A tentação de "enfeitar" o CV é real, e ferramentas de IA genéricas inventam skills e números.
- **O acompanhamento vira planilha.** Datas, contatos, versões de CV enviadas e follow-ups se perdem; não há visão do funil (quantas respostas, onde trava).

## 2. Visão

> Um lugar só para **encontrar** as vagas certas antes dos outros, **gerar** documentos sob medida sem mentir, e **acompanhar** cada candidatura até a resposta.

## 3. Público-alvo

**Persona principal — Engenheiro(a) sênior buscando remoto internacional.**
Ex.: backend sênior no Brasil, contrata como PJ/contractor, mira América do Norte e Europa, trilíngue. Usa filtros técnicos (stack, senioridade, fuso), se candidata a 5–15 vagas por semana e valoriza controle e transparência sobre "mágica".

**Persona secundária — Profissional em transição de carreira.**
Tem experiências anteriores relevantes (ex.: suporte técnico, onboarding) que precisam ser apresentadas de forma honesta e estratégica.

**Fora de escopo (por ora):** recrutadores, empresas, contas de equipe.

## 4. Objetivos e métricas de sucesso

| Objetivo | Métrica | Meta (90 dias após o lançamento) |
|---|---|---|
| Encontrar mais vagas relevantes | Vagas novas com match ≥ 80% por semana | ≥ 15 |
| Reduzir o tempo por candidatura | Tempo médio entre abrir a vaga e baixar CV + carta | ≤ 5 min |
| Aumentar a taxa de resposta | Candidaturas com resposta ÷ candidaturas enviadas | +30% vs. a linha de base do usuário |
| Manter o tracker vivo | % de candidaturas com próximo passo definido | ≥ 90% |
| Confiança nos documentos | Documentos gerados com afirmação fora do currículo base | 0 (garantido por regra) |

**Métricas de saúde:** buscas automatizadas executadas sem erro (≥ 99%), tempo de geração de documentos (p95 ≤ 20 s), follow-ups atrasados por usuário.

## 5. Escopo funcional

### 5.1 Novas vagas (feed)
- Lista de vagas novas vindas das buscas automatizadas, ordenada por **match com o currículo base**.
- Busca textual, chips de filtro (remoto, stack, senioridade, fuso, aceita PJ/contractor) e filtros extras.
- Cada vaga mostra: empresa, cargo, local/modalidade, tags de stack, faixa salarial, fonte, quando foi publicada, selo "NOVA" e % de match.
- Painel lateral da vaga selecionada: **por que combina** (stack, senioridade, fuso, idioma), palavras-chave presentes e **ausentes**, resumo da vaga, ações: *Gerar CV + cover letter*, *Salvar no tracker*, *Descartar*.
- Visualizações: Lista, Cards, Kanban e Tabela.

### 5.2 Gerar documentos (por vaga)
- Ajustes rápidos: idioma (EN/PT/ES), tom da carta (direto/formal/caloroso), experiências em destaque, template do PDF.
- Pré-visualização do **CV** e da **cover letter** lado a lado, com destaque nos trechos reescritos.
- Cobertura de palavras-chave (ex.: 11/13); as que faltam só entram se forem adicionadas ao currículo base.
- Ações: *Baixar PDFs*, *Anexar ao tracker*, *Abrir no Estúdio*.

### 5.3 Estúdio de currículo
- Editor completo do documento gerado para uma vaga, com versões (v1, v2, v3…).
- Coluna esquerda: fonte (currículo base), **blocos incluídos** (liga/desliga), cobertura de palavras-chave, template.
- Centro: página do PDF (CV ou cover letter).
- Coluna direita: **Mudanças vs. base** (adicionado / movido / reduzido), cada uma com *desfazer*; pedido de ajuste em texto livre e atalhos ("Mais curto", "Enfatizar APIs públicas", "Tom mais formal").

### 5.4 Currículo base
- Fonte única de verdade para todos os documentos: dados pessoais, resumo, experiências (cargo, empresa, local, período, bullets, tags), formação, idiomas, skills agrupadas.
- Preferências de busca: cargos-alvo, regiões, modalidade, tipo de contratação, remuneração mínima, alerta diário.
- **Regras de geração** (ligáveis): nunca incluir skill/cargo/empresa ausente; usar métricas só quando preenchidas; manter datas e títulos exatos; destacar trechos reescritos; limitar a 1 página.
- Versões do currículo base, importação de PDF/LinkedIn.

### 5.5 Buscas automatizadas
- Lista de buscas salvas: nome, descrição em texto livre, dork gerado, frequência, fontes, última execução, vagas novas, ativa/pausada; ações *Ver resultados*, *Editar dork*, *Executar agora*.
- Criação de busca em 3 passos:
  1. **Descrição em texto livre** do que se procura.
  2. **Conversão recomendada para Google Dork**, com a interpretação estruturada (cargos, stack, local, exclusões, sites) e o dork resultante; ajuste fino no gerador.
  3. **Onde e quando rodar**: fontes (Google via dork, LinkedIn Jobs, Wellfound, Remote OK), frequência e limite de match para avisar.

### 5.6 Google Dorking
- Explicação curta do conceito e tabela de operadores (`site:`, `"frase"`, `OR`, `-termo`, `intitle:`, `inurl:`, `after:`).
- Formulário: cargos, exigir no título, palavras-chave obrigatórias, localização/modalidade, termos excluídos, sites (Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Workday, Wellfound), período de publicação; modelos prontos.
- Saída: dork completo, colorido por parte, contador de palavras (limite de 32 do Google), **anatomia da busca**, *Copiar*, *Testar no Google*, *Salvar como busca automatizada*.

### 5.7 Candidaturas (tracker manual)
- Kanban por etapa: Salvas → Aplicadas → Em conversa → Entrevistas → Oferta (+ Encerradas).
- Card: empresa, cargo, match, contexto, documentos enviados, próximo passo (atrasado em destaque).
- **Candidatura manual** (para vagas de fora do Radar): link (com importação), empresa, cargo, status, data, fonte, faixa salarial, contato, próximo passo + lembrete, documentos enviados (gerar agora / currículo base / arquivo próprio), notas.

### 5.8 Tabela e métricas
- Indicadores: candidaturas, taxa de resposta, entrevistas, tempo até a 1ª resposta.
- Funil de candidaturas e compromissos dos próximos 7 dias.
- Tabela ordenável de todas as candidaturas; exportação CSV.

## 6. Requisitos não funcionais

- **Honestidade por construção:** a geração só reescreve, reordena e resume conteúdo do currículo base. Dados ausentes viram marcadores explícitos (`[resultado mensurável]`), nunca números inventados.
- **Acessibilidade:** WCAG 2.1 AA — contraste ≥ 4.5:1 em texto, foco visível, controles nativos, navegação por teclado, rótulos em ícones.
- **Privacidade:** currículo, contatos e notas são dados pessoais; criptografia em repouso e em trânsito; exclusão completa da conta sob demanda.
- **Conformidade com fontes:** sem scraping de páginas de resultado do Google nem do LinkedIn; uso de APIs de busca, APIs públicas dos ATS e e-mails de alerta do próprio usuário.
- **Desempenho:** feed carrega em ≤ 1,5 s (p75); geração de documentos ≤ 20 s (p95).
- **Internacionalização:** interface em pt-BR; documentos em EN/PT/ES.

## 7. Arquitetura (alto nível)

**Frontend (esta fase):** React + TypeScript + Vite; Storybook 10 como ambiente de desenvolvimento e documentação da camada de apresentação, organizada em Atomic Design. Componentes **governados por props e orientados a eventos**: não buscam dados nem guardam estado de negócio; recebem valores e emitem eventos com intenção (`onGenerate(jobId)`, `onSaveAsSearch(query)`). Lógica pura (ex.: `buildDork`) fica em `src/lib` com testes unitários. Tokens de design em `src/design-system/tokens.ts`, convertidos em CSS custom properties.

**Backend (fases seguintes, proposta):** serviços em Go na AWS.
1. **Descoberta:** dorks executados por um provedor de API de busca (a Custom Search JSON API do Google está fechada a novos clientes e será descontinuada em 1/1/2027); URLs dos ATS identificam as empresas.
2. **Monitoramento:** polling das APIs públicas de vagas dos ATS (Greenhouse, Lever, Ashby) por empresa descoberta; RSS/JSON de agregadores; e-mails de alerta do LinkedIn via Gmail API.
3. **Pipeline:** EventBridge Scheduler (uma regra por busca) → Lambda dispatcher → SQS → fetchers → normalização e deduplicação (ID da vaga + URL canônica) → filtros fixos → score com LLM contra o currículo base → Postgres + S3 → notificação (e-mail/Slack/push).
4. **Geração de documentos:** LLM com saída estruturada restrita ao currículo base + renderização de PDF por template.

## 8. Fases

| Fase | Entrega | Status |
|---|---|---|
| **0 — Descoberta** | Protótipos V1 (clássico) e V2 (moderno); escolha da V1 + Estúdio, Buscas automatizadas e Google Dorking | ✅ Concluída |
| **1 — Fundação de UI** | PRD, histórias de usuário, design system e todos os componentes no Storybook | 🚧 Em andamento |
| **2 — App navegável** | Roteamento, estado de aplicação e mocks de API (MSW) ligando as páginas | Planejada |
| **3 — Backend MVP** | Currículo base, tracker manual e gerador de dorks persistidos; autenticação | Planejada |
| **4 — Buscas automatizadas** | Descoberta + monitoramento de ATS + score de match + alertas | Planejada |
| **5 — Geração de documentos** | CV e cover letter por vaga, Estúdio com versões e PDF | Planejada |
| **6 — Métricas** | Funil, indicadores, calendário, exportação | Planejada |

## 9. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| APIs de busca mudam ou encarecem (ex.: fim da Custom Search API) | Descoberta para | Camada de provedor abstrata; descoberta é esporádica, monitoramento usa APIs dos ATS |
| LLM inventa conteúdo no CV | Perda de confiança, risco ao candidato | Saída estruturada referenciando IDs do currículo base; validação pós-geração; diff visível no Estúdio |
| Score de match pouco confiável | Feed ruidoso | Score explicável (componentes visíveis), feedback "não combina" do usuário |
| Termos de uso de fontes | Bloqueio / risco legal | Só APIs oficiais/públicas e e-mails do próprio usuário |
| Vagas duplicadas entre fontes | Feed poluído | Deduplicação por ID do ATS + URL canônica + hash título/empresa |

## 10. Perguntas em aberto

1. Qual provedor de API de busca usar para os dorks (custo × suporte a operadores)?
2. O score de match roda em toda vaga nova ou só nas que passam pelos filtros fixos?
3. Exportação de PDF: renderização no servidor (ex.: Chromium headless) ou no cliente?
4. Haverá app mobile / PWA para triagem rápida?
5. Modelo de negócio: uso pessoal, freemium ou assinatura?

## 11. Referências

- Protótipos de design: canvas "Job Tracker" (páginas V1 · Clássico e V2 · Moderno).
- Histórias de usuário: [`docs/user-stories.md`](./user-stories.md).
- Design system: Storybook › Design System › Visão geral.
