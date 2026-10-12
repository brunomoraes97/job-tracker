import type { Meta, StoryObj } from '@storybook/react-vite';
import { events } from '@/mocks/fixtures';
import { UpcomingEvents } from './UpcomingEvents';

const meta = { title: 'Organisms/UpcomingEvents', component: UpcomingEvents, args: { events }, decorators: [(S) => <div style={{ width: 380 }}><S /></div>] } satisfies Meta<typeof UpcomingEvents>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { events: [] } };
