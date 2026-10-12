import type { StageId } from '@/types';

/** Rótulo singular de cada etapa (tabelas, pills). */
export const stageLabels: Record<StageId, string> = {
  saved: 'Salva',
  applied: 'Aplicada',
  talking: 'Em conversa',
  interview: 'Entrevista',
  offer: 'Oferta',
  closed: 'Encerrada',
};
