import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventItem } from './EventItem';

const meta = { title: 'Molecules/EventItem', component: EventItem, args: { weekday: 'SEG', day: '28', title: 'Fernway · tech screen', subtitle: '14:00 BRT · Google Meet' } } satisfies Meta<typeof EventItem>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
