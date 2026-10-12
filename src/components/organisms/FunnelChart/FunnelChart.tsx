import { Panel } from '@/components/molecules/Panel';
import { FunnelRow } from '@/components/molecules/FunnelRow';
import type { FunnelStep } from '@/types';

export interface FunnelChartProps {
  steps: FunnelStep[];
  title?: string;
}

/** Funil horizontal; a primeira etapa é a referência (100%). */
export function FunnelChart({ steps, title = 'Funil de candidaturas' }: FunnelChartProps) {
  const total = steps[0]?.count ?? 0;
  return (
    <Panel title={title} padding="sm">
      {steps.map((s) => <FunnelRow key={s.id} label={s.label} count={s.count} total={total} />)}
    </Panel>
  );
}
