import type { Decorator } from '@storybook/react-vite';
import { epics, userStories, type Priority, type UserStory } from '../catalog';
import styles from './StoryBrief.module.css';

const priorityLabel: Record<Priority, string> = { M: 'Obrigatória', S: 'Desejável', C: 'Opcional' };

export interface StoryBriefProps {
  story: UserStory;
}

/** Cartão de contexto exibido acima de cada visão interativa de história de usuário. */
export function StoryBrief({ story }: StoryBriefProps) {
  return (
    <section aria-label={`História de usuário ${story.id}`} className={styles.brief}>
      <div className={styles.head}>
        <span className={styles.id}>{story.id}</span>
        <span className={styles.epic}>Épico {story.epic} · {epics[story.epic]}</span>
        <span className={styles.priority} data-priority={story.priority}>{priorityLabel[story.priority]}</span>
      </div>
      <p className={styles.statement}>
        <strong>Como</strong> {story.asA}, <strong>quero</strong> {story.iWant}, <strong>para</strong> {story.soThat}.
      </p>
      <details className={styles.details} open>
        <summary>Critérios de aceite ({story.criteria.length})</summary>
        <ol className={styles.criteria}>
          {story.criteria.map((c) => <li key={c}>{c}</li>)}
        </ol>
        <p className={styles.hint}>O roteiro automático roda ao abrir a história (painel <em>Interactions</em>). Depois, a tela continua livre para você interagir.</p>
      </details>
    </section>
  );
}

/** Decorator: lê `parameters.userStory` e mostra o cartão acima da visão. */
export const withStoryBrief: Decorator = (Story, ctx) => {
  const story = userStories[ctx.parameters.userStory as string];
  return (
    <>
      {story && <StoryBrief story={story} />}
      <Story />
    </>
  );
};
