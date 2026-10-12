import { Tag } from '@/components/atoms/Tag';
import { Panel } from '@/components/molecules/Panel';
import type { SkillGroup } from '@/types';
import styles from './SkillsPanel.module.css';

export interface SkillsPanelProps {
  groups: SkillGroup[];
  title?: string;
}

export function SkillsPanel({ groups, title = 'Skills' }: SkillsPanelProps) {
  return (
    <Panel title={title}>
      {groups.map((g) => (
        <div key={g.id} className={styles.group}>
          <h3 className={styles.label}>{g.label}</h3>
          <div className={styles.items}>{g.items.map((s) => <Tag key={s} variant="hit">{s}</Tag>)}</div>
        </div>
      ))}
    </Panel>
  );
}
