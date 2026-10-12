import { Panel } from '@/components/molecules/Panel';
import { EventItem } from '@/components/molecules/EventItem';
import type { CalendarEvent } from '@/types';

export interface UpcomingEventsProps {
  events: CalendarEvent[];
  title?: string;
  emptyText?: string;
}

export function UpcomingEvents({ events, title = 'Próximos 7 dias', emptyText = 'Nenhum compromisso.' }: UpcomingEventsProps) {
  return (
    <Panel title={title} padding="sm">
      {events.length === 0 && <span>{emptyText}</span>}
      {events.map((e) => <EventItem key={e.id} {...e} />)}
    </Panel>
  );
}
