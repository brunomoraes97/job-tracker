import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { KeyValueList } from '@/components/molecules/KeyValueList';
import { Panel } from '@/components/molecules/Panel';
import { ToggleList } from '@/components/molecules/ToggleList';
import { ExperienceCard } from '@/components/organisms/ExperienceCard';
import { PageHeader } from '@/components/organisms/PageHeader';
import { PersonalInfoForm } from '@/components/organisms/PersonalInfoForm';
import { Sidebar, type SidebarProps } from '@/components/organisms/Sidebar';
import { SkillsPanel } from '@/components/organisms/SkillsPanel';
import { AppShell } from '@/components/templates/AppShell';
import { PageLayout } from '@/components/templates/PageLayout';
import type { Experience, KeyValue, PersonalInfo, SkillGroup, ToggleOption } from '@/types';
import styles from './ProfilePage.module.css';

export interface ProfilePageProps {
  sidebar: SidebarProps;
  subtitle: string;
  nextVersionLabel: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: { degree: string; institution: string; year?: string };
  languages: string[];
  skills: SkillGroup[];
  preferences: KeyValue[];
  rules: ToggleOption[];
  saving?: boolean;
  onPersonalInfoChange?: (field: keyof PersonalInfo, value: string) => void;
  onAddExperience?: () => void;
  onEditExperience?: (id: string) => void;
  onToggleRule?: (id: string, checked: boolean) => void;
  onEditPreferences?: () => void;
  onImport?: () => void;
  onOpenHistory?: () => void;
  onSave?: () => void;
}

export function ProfilePage(p: ProfilePageProps) {
  return (
    <AppShell sidebar={<Sidebar {...p.sidebar} />}>
      <PageLayout
        header={
          <PageHeader
            title="Currículo base"
            subtitle={p.subtitle}
            actions={
              <>
                <Button onClick={p.onImport}>Importar de PDF ou LinkedIn</Button>
                <Button onClick={p.onOpenHistory}>Histórico de versões</Button>
                <Button variant="primary" loading={p.saving} onClick={p.onSave}>Salvar como {p.nextVersionLabel}</Button>
              </>
            }
          />
        }
      >
        <div className={styles.columns}>
          <div className={styles.main}>
            <PersonalInfoForm value={p.personalInfo} onFieldChange={p.onPersonalInfoChange} />
            <Panel title="Experiências" aside={<Button size="sm" iconLeft="plus" onClick={p.onAddExperience}>Adicionar experiência</Button>}>
              {p.experiences.map((x) => <ExperienceCard key={x.id} experience={x} onEdit={p.onEditExperience} />)}
            </Panel>
            <div className={styles.pair}>
              <Panel title="Formação" padding="sm">
                <span className={styles.strong}>{p.education.degree} — {p.education.institution}</span>
                {p.education.year && <span className={styles.muted}>{p.education.year}</span>}
              </Panel>
              <Panel title="Idiomas" padding="sm">
                <div className={styles.tags}>{p.languages.map((l) => <Tag key={l} size="md">{l}</Tag>)}</div>
              </Panel>
            </div>
          </div>
          <div className={styles.side}>
            <SkillsPanel groups={p.skills} />
            <Panel title="Preferências de busca" aside={<Button size="sm" variant="ghost" onClick={p.onEditPreferences}>Editar</Button>}>
              <KeyValueList items={p.preferences} />
            </Panel>
            <Panel title="Regras de geração">
              <ToggleList label="Regras de geração" hideLabel items={p.rules} onToggle={p.onToggleRule} />
            </Panel>
          </div>
        </div>
      </PageLayout>
    </AppShell>
  );
}
