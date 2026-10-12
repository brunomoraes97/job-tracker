# CLAUDE.md — job-tracker (Radar)

Guia para agentes trabalhando neste repositório.

## Contexto
- Produto: veja `docs/PRD.md`. Histórias: `docs/user-stories.md` (cite os IDs `US-x.y` em PRs).
- Fase atual: camada de apresentação no Storybook. Ainda não há app, roteador nem backend.
- `src/user-stories/`: visões interativas das histórias de usuário (Storybook › *Histórias de usuário*). `harness/PrototypeApp.tsx` é um container com estado e navegação que existe **só no Storybook**; `catalog.ts` espelha `docs/user-stories.md` (o teste `catalog.test.ts` garante IDs, títulos e prioridades iguais). Toda história nova ou alterada no documento precisa da visão correspondente, com `play` cobrindo os critérios de aceite.

## Regras de componentes
- Atomic Design: `src/components/{atoms,molecules,organisms,templates,pages}/<Nome>/` com `Nome.tsx`, `Nome.module.css`, `Nome.stories.tsx`, `index.ts`. Atualize o `index.ts` do nível ao criar um componente.
- Componentes são **controlados e orientados a eventos**: sem fetch, sem `localStorage`, sem estado de negócio. Valores entram por props e intenções saem por callbacks `onX(...)`. Estado de UI efêmero só quando inevitável (ex.: `Drawer` escuta Esc e emite `onClose`).
- Lógica pura vai em `src/lib` com teste em `*.test.ts`.
- Estilos: CSS Modules usando **apenas** `var(--jt-*)`. Novos valores visuais entram em `src/design-system/tokens.ts`. O teste `tokens.test.ts` falha para variáveis inexistentes.
- Stories: `title` no formato `Atoms/…`, `Molecules/…`, `Organisms/…`, `Templates/…`, `Pages/…` ou `Histórias de usuário/<n> · <épico>` (uma story por história, `name: 'US-x.y · Título'`, `parameters.userStory: 'US-x.y'`). Use `fn()` (de `storybook/test`) em todos os callbacks e `useArgs` (de `storybook/preview-api`) para stories interativas. Dados de exemplo ficam em `src/mocks/fixtures.ts`; arquivos `.stories.tsx` não devem ter exports nomeados que não sejam stories.
- Acessibilidade: elementos nativos, `label` em todo campo, `aria-label` em botões só com ícone, contraste ≥ 4.5:1.
- Copy da UI em pt-BR. Documentos gerados (CV/carta) em inglês por padrão.

## Verificação antes de commitar
```bash
npm run typecheck && npm test && npm run test-storybook && npm run build-storybook
```
`test-storybook` roda cada story como teste no Chromium (render + `play` + axe/a11y com `test: 'error'`). Em containers sem `playwright install`, defina `CHROMIUM_PATH` com o caminho do Chromium.
