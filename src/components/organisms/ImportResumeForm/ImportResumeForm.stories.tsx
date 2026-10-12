import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ImportResumeForm } from './ImportResumeForm';

const meta = { title: 'Organisms/ImportResumeForm', component: ImportResumeForm, args: { source: 'pdf', linkedinUrl: '', status: 'idle', onSourceChange: fn(), onFileChange: fn(), onUrlChange: fn(), onImport: fn(), onReview: fn(), onCancel: fn() }, decorators: [(S) => <div style={{ width: 384 }}><S /></div>] } satisfies Meta<typeof ImportResumeForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const PdfEmpty: Story = {};
export const PdfSelected: Story = { args: { fileName: 'matheus-cv-2026.pdf' } };
export const LinkedIn: Story = { args: { source: 'linkedin', linkedinUrl: 'linkedin.com/in/[perfil]' } };
export const Importing: Story = { args: { fileName: 'matheus-cv-2026.pdf', status: 'importing' } };
export const Done: Story = { args: { fileName: 'matheus-cv-2026.pdf', status: 'done', message: '4 experiências, 1 formação e 14 skills encontradas.' } };
export const Error: Story = { args: { fileName: 'scan.pdf', status: 'error', message: 'Não foi possível ler o PDF (parece ser uma imagem escaneada).' } };
