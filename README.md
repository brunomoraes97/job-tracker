# Radar — job-tracker

Acompanhamento de vagas remotas, geração de CV e cover letter a partir de um **currículo base**, buscas automatizadas com **Google Dorking** e tracker de candidaturas.

> Fase atual: **fundação de UI**. Toda a camada de apresentação vive no Storybook, em React + TypeScript, organizada em Atomic Design. Roteamento, estado de aplicação e backend vêm nas próximas fases (veja o [PRD](docs/PRD.md)).

## Documentação

- [PRD](docs/PRD.md): problema, objetivos, escopo, arquitetura e fases.
- [Histórias de usuário](docs/user-stories.md): épicos, critérios de aceite e os componentes que atendem cada história.
- **Design system**: no Storybook, em *Design System › Visão geral* e *Tokens (referência)*.

## Rodando

Requer Node 20.19+ (testado com Node 22).

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # gera storybook-static/
npm run typecheck        # tsc --noEmit
npm test                 # vitest (lógica pura + integridade dos tokens)
```

## Estrutura

```
src/
  design-system/
    tokens.ts            # fonte única de verdade dos tokens
    GlobalStyles.tsx     # tokens → CSS custom properties (--jt-*)
    fonts.ts             # Fraunces + IBM Plex (self-hosted via @fontsource)
    docs/                # páginas MDX e blocos do design system
  components/
    atoms/               # Button, Input, Chip, Tag, Monogram, Icon…
    molecules/           # FormField, SegmentedControl, FitBar, DorkQuery…
    organisms/           # JobCard, KanbanBoard, ApplicationForm, DorkBuilderForm…
    templates/           # AppShell, PageLayout, SplitLayout, ThreePaneLayout
    pages/               # uma página por tela, compostas só por props
  lib/                   # lógica pura (buildDork, stages, cx, richText)
  types/                 # tipos de domínio
  mocks/fixtures.ts      # dados de exemplo usados apenas nas stories
```

Cada componente fica numa pasta própria com `Componente.tsx`, `Componente.module.css`, `Componente.stories.tsx` e `index.ts`.

## Contrato dos componentes

- **Governados por props.** Nenhum componente busca dados nem guarda estado de negócio. O que aparece na tela é função das props.
- **Event-driven.** Valores entram por props (`value`, `checked`, `selected`) e as intenções saem por eventos (`onChange(valor)`, `onGenerate(jobId)`, `onSaveAsSearch(query)`). Quem decide o novo estado é sempre o pai.
- **Lógica fora da UI.** Regras como compilar um dork ficam em `src/lib` (ex.: `buildDork`, com testes). As páginas recebem o resultado pronto.
- **Só tokens.** Os estilos usam apenas `var(--jt-*)`. Um teste falha se algum componente referenciar uma variável inexistente.
- **Stories como containers.** As stories interativas usam `useArgs` para simular o estado da aplicação, e todos os eventos aparecem no painel *Actions*.

## Stack

React 19, TypeScript 7, Vite 8, Storybook 10 (`@storybook/react-vite`, addon-docs, addon-a11y), Vitest 5 e CSS Modules.
