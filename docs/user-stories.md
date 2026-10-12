# Histórias de usuário — Radar

Formato: **Como** [persona], **quero** [ação], **para** [benefício]. Os critérios de aceite usam *Dado / Quando / Então*.
Prioridade (MoSCoW): **M** = Must · **S** = Should · **C** = Could. Cada história indica os componentes do Storybook que a atendem na camada de apresentação.

Persona padrão: **candidato(a)**, engenheiro(a) sênior buscando vagas remotas internacionais.

---

## Épico 1 — Novas vagas

### US-1.1 · Ver as vagas novas ordenadas por match — M
**Como** candidato, **quero** ver as vagas novas ordenadas pelo match com meu currículo base, **para** começar pelas que mais combinam.
- Dado que há vagas novas, quando abro *Novas vagas*, então vejo a lista ordenada por match (maior primeiro), com total de resultados e fontes.
- Cada vaga mostra monograma e nome da empresa, cargo, local/modalidade, tags de stack, faixa salarial (se houver), fonte, tempo desde a publicação e % de match.
- Vagas publicadas desde a última visita exibem o selo **NOVA**.
- O match usa cor por faixa: ≥ 85 verde, 70–84 neutro, < 70 âmbar.
- Sem vagas, vejo um estado vazio explicativo.

*Componentes:* `Pages/Novas vagas`, `JobList`, `JobCard`, `MatchScore`, `Badge`, `Monogram`, `Tag`.

### US-1.2 · Filtrar e buscar vagas — M
**Como** candidato, **quero** filtrar por remoto, stack, senioridade, fuso e tipo de contratação e buscar por texto, **para** reduzir a lista ao que me interessa.
- Quando ligo/desligo um chip de filtro, então ele muda de estado (pressionado) e a lista é recalculada pelo container.
- Quando digito no campo de busca, então o evento `onQueryChange` é emitido a cada alteração.
- *+ Filtro* abre a configuração de filtros adicionais.

*Componentes:* `ChipGroup`, `Chip`, `Input`.

### US-1.3 · Entender por que uma vaga combina — M
**Como** candidato, **quero** ver por que a vaga combina comigo, **para** decidir rápido se vale aplicar.
- Quando seleciono uma vaga (clique no card ou no título, ou teclado), então o painel lateral mostra: componentes do match (stack, senioridade, fuso, idioma), palavras-chave presentes (✓) e **ausentes** (tracejadas, "não está no seu CV"), resumo da vaga e link para a descrição completa.
- O card selecionado fica destacado.
- Sem seleção, o painel mostra uma instrução.

*Componentes:* `JobDetailPanel`, `FitBar`, `KeywordList`.

### US-1.4 · Agir sobre uma vaga — M
**Como** candidato, **quero** gerar documentos, salvar no tracker ou descartar a vaga, **para** seguir o fluxo sem trocar de ferramenta.
- *Gerar CV + cover letter* emite `onGenerate(jobId)` e leva à tela de documentos.
- *Salvar no tracker* emite `onSave(jobId)` e cria a candidatura na etapa **Salvas**.
- *Descartar* emite `onDiscard(jobId)` e remove a vaga do feed.

### US-1.5 · Alternar visualizações — S
**Como** candidato, **quero** alternar entre Lista e Cards, **para** ver as vagas do jeito mais útil no momento.
- O seletor indica a visualização ativa e emite `onViewChange(view)`.
- “Cards” mostra as vagas em grade de duas colunas; “Lista”, em uma coluna (`JobList layout`).
- Kanban e Tabela são visões de **candidaturas** (Épicos 7 e 8), não do feed de vagas.

*Componentes:* `SegmentedControl`.

### US-1.6 · Configurar alertas — C
**Como** candidato, **quero** configurar alertas de vagas novas, **para** saber de vagas com match alto sem abrir o app.
- *Alertas diários* abre um drawer com ativar/desativar, frequência, match mínimo e canais (e-mail, navegador, Slack).
- Desativar os alertas bloqueia os demais campos.
- *Salvar alertas* fecha o drawer e confirma a configuração.

*Componentes:* `AlertSettingsForm`, `Drawer`, `Switch`.

---

## Épico 2 — Gerar CV e cover letter

### US-2.1 · Gerar documentos sob medida a partir do currículo base — M
**Como** candidato, **quero** gerar CV e cover letter ajustados à vaga a partir do meu currículo base, **para** me candidatar em minutos sem reescrever tudo.
- Dado um currículo base salvo, quando gero documentos para uma vaga, então vejo CV e cover letter lado a lado, com a versão e a cobertura de palavras-chave ("11 de 13").
- Trechos reescritos para a vaga aparecem destacados; posso alternar para ver só o CV ou só a carta.
- **Nenhuma** skill, cargo, empresa, data ou métrica ausente do currículo base aparece nos documentos; dados faltantes viram marcadores (`[resultado mensurável]`).

*Componentes:* `Pages/Gerar documentos`, `DocumentPreview`, `ResumeDocument`, `CoverLetterDocument`.

### US-2.2 · Ajustar a geração — M
**Como** candidato, **quero** escolher idioma, tom da carta, experiências em destaque e template, **para** adequar os documentos à vaga.
- Cada controle emite seu evento (`onLanguageChange`, `onToneChange`, `onToggleExperience`, `onTemplateChange`).
- *Regenerar com estes ajustes* emite `onRegenerate` e mostra carregamento.
- Palavras-chave ausentes aparecem com o aviso de que só entram se adicionadas ao currículo base, com atalho *Revisar skills*.

*Componentes:* `GenerationSettings`, `SegmentedControl`, `ToggleList`, `KeywordList`.

### US-2.3 · Baixar e anexar — M
**Como** candidato, **quero** baixar os PDFs e anexá-los à candidatura, **para** saber exatamente o que enviei.
- *Baixar PDFs* emite `onDownload`; *Anexar ao tracker* emite `onAttach`; *Abrir no Estúdio* emite `onOpenStudio`.

---

## Épico 3 — Estúdio de currículo

### US-3.1 · Editar o documento gerado em um estúdio — M
**Como** candidato, **quero** um estúdio para refinar o CV/carta gerados, **para** ter controle total do que vou enviar.
- O estúdio mostra a trilha (vagas › vaga › Estúdio), versões (v1…vN) com a ativa destacada e alternância CV / Cover letter.
- Trocar de versão emite `onVersionChange(version)`.

*Componentes:* `Pages/Estúdio de currículo`, `ThreePaneLayout`, `SegmentedControl`, `Breadcrumbs`.

### US-3.2 · Escolher os blocos incluídos — M
**Como** candidato, **quero** ligar e desligar blocos do currículo base (resumo, cada experiência, projetos), **para** montar a versão mais relevante.
- Cada bloco mostra nome e uma nota (ex.: "condensado em 1 linha") e emite `onToggleBlock(id, incluído)`.
- Vejo a cobertura de palavras-chave como barra e fração.

*Componentes:* `StudioSourcePanel`, `ToggleList`, `ProgressBar`.

### US-3.3 · Ver e desfazer mudanças vs. a base — M
**Como** candidato, **quero** ver cada mudança feita em relação ao currículo base e poder desfazê-la, **para** confiar no documento final.
- Cada mudança tem tipo (adicionado `+`, movido `↑`, reduzido `−`), título e descrição.
- *Desfazer* emite `onUndo(changeId)`; sem mudanças, aparece um estado vazio.

*Componentes:* `ChangesPanel`, `ChangeItem`.

### US-3.4 · Pedir ajustes em linguagem natural — S
**Como** candidato, **quero** pedir ajustes ("mais curto", "destaque CDK no resumo"), **para** refinar sem editar à mão.
- Atalhos emitem `onQuickAdjust(label)`; o campo livre emite `onAdjustmentChange` e, ao enviar, `onSubmitAdjustment(texto)`.
- O botão de enviar fica desabilitado com o campo vazio.
- O painel lembra que ajustes só reescrevem/reordenam o currículo base.

---

## Épico 4 — Currículo base

### US-4.1 · Manter um currículo base único — M
**Como** candidato, **quero** cadastrar meus dados, resumo, experiências, formação, idiomas e skills em um só lugar, **para** que todos os documentos partam da mesma fonte.
- Dados pessoais e resumo são campos controlados (`onPersonalInfoChange(campo, valor)`).
- Experiências mostram cargo, empresa, local, período, bullets e tags, com *Editar* e *Adicionar experiência*.
- *Adicionar* / *Editar* abrem um formulário (bullets uma por linha, tags separadas por vírgula); cargo e empresa são obrigatórios; *Remover* aparece na edição.
- Skills aparecem agrupadas (linguagens, cloud, dados, IA).

*Componentes:* `Pages/Currículo base`, `PersonalInfoForm`, `ExperienceCard`, `ExperienceForm`, `SkillsPanel`.

### US-4.2 · Versionar o currículo base — S
**Como** candidato, **quero** salvar novas versões e ver o histórico, **para** saber de qual versão cada documento foi gerado.
- *Salvar como vN* emite `onSave`, cria a versão e atualiza o rótulo na navegação.
- *Histórico de versões* (`onOpenHistory`) lista versões com data, nota e quantidade de documentos gerados; versões antigas podem ser restauradas.

*Componentes:* `VersionHistory`, `Drawer`.

### US-4.3 · Importar de PDF ou LinkedIn — C
**Como** candidato, **quero** importar meu CV atual, **para** não digitar tudo do zero.
- Escolho entre arquivo PDF e perfil do LinkedIn.
- *Importar* só habilita com arquivo selecionado ou URL preenchida e mostra carregamento.
- Ao terminar, vejo um resumo do que foi encontrado e um atalho para revisar antes de salvar — nada é salvo sem revisão.

*Componentes:* `ImportResumeForm`, `OptionCard`.

### US-4.4 · Definir regras de geração — M
**Como** candidato, **quero** ligar regras como "nunca incluir skill ausente" e "usar métricas só se preenchidas", **para** garantir documentos honestos.
- Cada regra é um checkbox controlado que emite `onToggleRule(id, ligado)`.

*Componentes:* `ToggleList`.

### US-4.5 · Definir preferências de busca — S
**Como** candidato, **quero** registrar cargos-alvo, regiões, modalidade, contratação e remuneração mínima, **para** que o match e as buscas reflitam o que procuro.

- *Editar* abre um formulário com um campo por preferência; salvar atualiza a lista.

*Componentes:* `KeyValueList`, `KeyValueForm`.

---

## Épico 5 — Buscas automatizadas

### US-5.1 · Ver minhas buscas automatizadas — M
**Como** candidato, **quero** ver todas as buscas salvas com status, frequência e vagas novas, **para** saber o que está rodando.
- Cada busca mostra nome, descrição em texto livre, dork (uma linha, texto completo no hover), frequência, fontes, última execução e "+N novas".
- Buscas pausadas aparecem esmaecidas.

*Componentes:* `Pages/Buscas automatizadas`, `SavedSearchCard`.

### US-5.2 · Pausar, executar e editar uma busca — M
**Como** candidato, **quero** pausar/retomar, executar agora e editar o dork de uma busca, **para** controlar a coleta.
- O interruptor emite `onToggleActive(id, ativa)`; *Executar agora* mostra carregamento (`running`) e emite `onRunNow(id)`; *Editar dork* leva ao gerador; *Ver resultados* filtra *Novas vagas*.

*Componentes:* `Switch`, `Button`.

### US-5.3 · Criar uma busca descrevendo em texto livre — M
**Como** candidato, **quero** descrever em texto livre o que procuro, **para** criar uma busca sem conhecer operadores.
- O campo de descrição é controlado (`onDescriptionChange`).
- *Salvar e ativar* fica desabilitado sem descrição.

*Componentes:* `SearchComposer`, `Textarea`.

### US-5.4 · Converter a descrição em Google Dork (recomendado) — M
**Como** candidato, **quero** que o app recomende e converta minha descrição em um Google Dork, **para** encontrar vagas direto nos ATS.
- Um destaque explica por que dorking é recomendado, com *Converter descrição em dork* (`onConvertToDork(descrição)`, com carregamento) e *O que é isso?* (leva à seção Google Dorking).
- Após converter, vejo **como foi entendido** — cargos, stack, local, exclusões e sites, cada grupo com sua cor — e o dork resultante.
- *Ajustar campo a campo no gerador* abre o gerador com os campos preenchidos.

*Componentes:* `SearchComposer`.

### US-5.5 · Escolher fontes, frequência e limite de aviso — M
**Como** candidato, **quero** escolher onde (Google via dork, LinkedIn, Wellfound, Remote OK), com que frequência e a partir de qual match ser avisado, **para** equilibrar volume e relevância.
- Fontes são chips com checkbox (`onToggleSource`); frequência e limite são selects controlados.
- *Testar agora* emite `onTest`; *Salvar e ativar* emite `onSave`.

---

## Épico 6 — Google Dorking

### US-6.1 · Entender o que é Google Dorking — M
**Como** candidato, **quero** uma explicação curta do conceito e dos operadores, **para** usar a técnica com confiança.
- A seção explica o conceito, por que funciona para vagas (páginas dos ATS) e o uso responsável (páginas públicas, termos dos sites, limite de 32 palavras).
- Uma tabela lista operador, o que faz e exemplo: `site:`, `"frase"`, `OR`, `-termo`, `intitle:`, `inurl:`, `after:`.

*Componentes:* `DorkExplainer`.

### US-6.2 · Montar um dork preenchendo campos — M
**Como** candidato, **quero** preencher campos simples e obter o dork completo, **para** não errar a sintaxe.
- Campos: cargos (qualquer um), exigir cargo no título (`intitle:`), palavras-chave obrigatórias, localização/modalidade (qualquer uma), termos excluídos (itens separados por vírgula), sites e período de publicação.
- Cada alteração emite `onChange(patch)`; o container recompila com `buildDork` e a saída atualiza na hora.
- Regras de compilação (testadas em `src/lib/dork.test.ts`):
  - sites → `(site:a OR site:b)`; um só item dispensa parênteses;
  - cargos → frases entre aspas unidas por `OR`; com "exigir no título", `intitle:"…"`;
  - palavras-chave → separadas por espaço (todas obrigatórias), termos com espaço entre aspas;
  - localização → grupo `OR`;
  - exclusões → `-termo` / `-"termo composto"`;
  - período → `after:AAAA-MM-DD` relativo a hoje; "qualquer data" omite;
  - partes vazias são omitidas.

*Componentes:* `DorkBuilderForm`, `ChipGroup`, `FormField`; lógica em `lib/dork.ts`.

### US-6.3 · Partir de um modelo — S
**Como** candidato, **quero** aplicar modelos prontos ("Go remoto em ATS", "Staff / Platform", "AI Agents · Python"), **para** começar mais rápido.
- Clicar num modelo emite `onApplyTemplate(modelo)` e o pai mescla os campos.

### US-6.4 · Ver, entender e usar o dork gerado — M
**Como** candidato, **quero** ver o dork colorido por parte, entender cada parte e copiá-lo, testá-lo ou salvá-lo, **para** usar onde quiser.
- O dork aparece em fundo de código, com cada parte na cor do seu tipo, e um contador "N de 32 palavras" (`OR` e agrupadores não contam).
- Acima de 32 palavras, o contador fica em alerta e aparece uma orientação.
- **Anatomia da busca** lista cada parte com a mesma cor e uma explicação.
- *Copiar* emite `onCopy(query)` e mostra "Copiado"; *Testar no Google* emite `onOpenGoogle(url)`; *Salvar como busca automatizada* emite `onSaveAsSearch(query)`. Sem dork, as ações ficam desabilitadas.

*Componentes:* `DorkResultPanel`, `DorkQuery`, `DorkAnatomy`.

---

## Épico 7 — Candidaturas (tracker manual)

### US-7.1 · Acompanhar candidaturas em kanban — M
**Como** candidato, **quero** ver minhas candidaturas por etapa, **para** saber onde cada processo está.
- Colunas: Salvas, Aplicadas, Em conversa, Entrevistas, Oferta — cada uma com ponto de cor e total.
- Cards mostram empresa, match, cargo, contexto, documentos enviados e próximo passo; **follow-ups atrasados** aparecem em âmbar.
- Clicar no cargo emite `onOpenApplication(id)` e abre a candidatura para edição no mesmo drawer da candidatura manual; coluna vazia mostra "Nada aqui ainda".

*Componentes:* `Pages/Candidaturas (kanban)`, `KanbanBoard`, `KanbanColumn`, `ApplicationCard`, `StatusDot`.

### US-7.2 · Registrar uma candidatura manual — M
**Como** candidato, **quero** registrar candidaturas feitas fora do Radar, **para** ter tudo num só lugar.
- *Candidatura manual* abre um drawer com o formulário; fecha no ×, em *Cancelar*, ao clicar fora ou com **Esc**.
- Campos: link (com *Importar*, desabilitado sem link e com carregamento), empresa, cargo, status, data, fonte, faixa salarial, contato, próximo passo, data do lembrete, documentos enviados (gerar agora / currículo base / arquivo próprio) e notas.
- Cada campo emite `onFieldChange(campo, valor)`; *Salvar candidatura* emite `onSubmit(rascunho)`.
- Erros de validação aparecem abaixo do campo e marcam o campo como inválido.

*Componentes:* `Drawer`, `ApplicationForm`, `FormField`, `Radio`.

### US-7.3 · Mover candidaturas entre etapas — S
**Como** candidato, **quero** mudar a etapa de uma candidatura, **para** manter o tracker atualizado.
- Cada card tem um seletor “Mover para” (`KanbanBoard movable`, evento `onMoveApplication(id, etapa)`).
- Mover leva o card para a coluna escolhida e atualiza os totais. *(Arrastar e soltar fica para a fase 2.)*

### US-7.4 · Ser lembrado de follow-ups — S
**Como** candidato, **quero** lembretes de próximos passos, **para** não perder o timing.
- Follow-ups atrasados aparecem em âmbar nos cards e na tabela.
- Ao abrir *Candidaturas*, um aviso (`Toast`) mostra o follow-up atrasado mais antigo.
- *Marcar como feito* limpa o atraso daquele card.

---

## Épico 8 — Tabela e métricas

### US-8.1 · Ver indicadores do meu funil — M
**Como** candidato, **quero** ver candidaturas, taxa de resposta, entrevistas e tempo até a primeira resposta, **para** avaliar minha estratégia.

*Componentes:* `Pages/Tabela e métricas`, `KpiGrid`, `StatTile`.

### US-8.2 · Ver o funil e os próximos compromissos — M
**Como** candidato, **quero** ver o funil (aplicadas → oferta) e os compromissos dos próximos 7 dias, **para** saber onde travo e o que vem pela frente.
- O funil usa a primeira etapa como 100%; os compromissos mostram dia da semana, dia, título e detalhe.

*Componentes:* `FunnelChart`, `FunnelRow`, `UpcomingEvents`, `EventItem`.

### US-8.3 · Ordenar e exportar a tabela de candidaturas — S
**Como** candidato, **quero** uma tabela ordenável e exportável, **para** analisar e compartilhar.
- Empresa, data e match são ordenáveis; o cabeçalho indica direção (`aria-sort`) e emite `onSortChange({ key, direction })` — a ordenação dos dados é responsabilidade do pai.
- Status aparece como pill na cor da etapa; documentos são clicáveis (`onOpenDocuments(id)`).
- *Exportar CSV* emite `onExport`.

*Componentes:* `ApplicationsTable`.

---

## Épico 9 — Transversais

### US-9.1 · Navegar entre as seções — M
**Como** candidato, **quero** uma navegação lateral fixa com contadores e buscas salvas, **para** me mover rápido entre as áreas.
- A navegação marca o item ativo (`aria-current="page"`), mostra contadores e emite `onNavigate(href)`.

*Componentes:* `Sidebar`, `NavItem`, `AppShell`.

### US-9.2 · Usar o app só com teclado e leitor de tela — M
**Como** candidato com necessidades de acessibilidade, **quero** usar tudo pelo teclado e com leitor de tela, **para** não depender do mouse.
- Todos os controles são elementos nativos (`button`, `a`, `input`, `select`) e mostram anel de foco.
- Botões só com ícone têm rótulo acessível; campos têm `label`; grupos têm legenda.
- Texto respeita contraste ≥ 4.5:1 (verificado pelo addon a11y do Storybook).

### US-9.3 · Consultar o design system — M
**Como** desenvolvedor do produto, **quero** uma página com tokens, tipografia, cores, espaçamentos, ícones e o contrato de props, **para** construir telas consistentes.

*Componentes:* `Design System/Visão geral`, `Design System/Tokens (referência)`.

---

## Rastreabilidade (resumo)

| Épico | Histórias | Página no Storybook |
|---|---|---|
| 1 · Novas vagas | US-1.1 – 1.6 | Pages/Novas vagas |
| 2 · Gerar documentos | US-2.1 – 2.3 | Pages/Gerar documentos |
| 3 · Estúdio | US-3.1 – 3.4 | Pages/Estúdio de currículo |
| 4 · Currículo base | US-4.1 – 4.5 | Pages/Currículo base |
| 5 · Buscas automatizadas | US-5.1 – 5.5 | Pages/Buscas automatizadas |
| 6 · Google Dorking | US-6.1 – 6.4 | Pages/Google Dorking |
| 7 · Candidaturas | US-7.1 – 7.4 | Pages/Candidaturas (kanban) |
| 8 · Métricas | US-8.1 – 8.3 | Pages/Tabela e métricas |
| 9 · Transversais | US-9.1 – 9.3 | Design System, Organisms/Sidebar |
