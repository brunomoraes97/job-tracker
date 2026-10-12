/**
 * Catálogo das histórias de usuário (espelho de docs/user-stories.md).
 * Usado pelo cartão de contexto das visões interativas. O teste `catalog.test.ts`
 * garante que os IDs daqui e do documento continuam iguais.
 */

export type Priority = 'M' | 'S' | 'C';

export interface UserStory {
  id: string;
  epic: number;
  title: string;
  priority: Priority;
  asA: string;
  iWant: string;
  soThat: string;
  criteria: string[];
}

export const epics: Record<number, string> = {
  1: 'Novas vagas',
  2: 'Gerar CV e cover letter',
  3: 'Estúdio de currículo',
  4: 'Currículo base',
  5: 'Buscas automatizadas',
  6: 'Google Dorking',
  7: 'Candidaturas',
  8: 'Tabela e métricas',
  9: 'Transversais',
};

const c = 'candidato';

const list: UserStory[] = [
  // ——— Épico 1 ———
  { id: 'US-1.1', epic: 1, title: 'Ver as vagas novas ordenadas por match', priority: 'M', asA: c, iWant: 'ver as vagas novas ordenadas pelo match com meu currículo base', soThat: 'começar pelas que mais combinam',
    criteria: ['A lista vem ordenada por match (maior primeiro), com total de resultados e fontes.', 'Cada vaga mostra empresa, cargo, local, tags, salário, fonte, publicação e % de match.', 'Vagas novas exibem o selo NOVA.', 'Sem vagas, aparece um estado vazio explicativo.'] },
  { id: 'US-1.2', epic: 1, title: 'Filtrar e buscar vagas', priority: 'M', asA: c, iWant: 'filtrar por remoto, stack, senioridade, fuso e contratação e buscar por texto', soThat: 'reduzir a lista ao que me interessa',
    criteria: ['Ligar/desligar um chip muda seu estado (pressionado) e recalcula a lista.', 'Digitar na busca filtra por cargo, empresa ou stack a cada alteração.', 'O total de resultados acompanha o filtro.'] },
  { id: 'US-1.3', epic: 1, title: 'Entender por que uma vaga combina', priority: 'M', asA: c, iWant: 'ver por que a vaga combina comigo', soThat: 'decidir rápido se vale aplicar',
    criteria: ['Selecionar uma vaga (clique ou teclado) abre o painel com os componentes do match.', 'O painel lista palavras-chave presentes e ausentes ("não está no seu CV").', 'O card selecionado fica destacado.', 'Sem seleção, o painel mostra uma instrução.'] },
  { id: 'US-1.4', epic: 1, title: 'Agir sobre uma vaga', priority: 'M', asA: c, iWant: 'gerar documentos, salvar no tracker ou descartar a vaga', soThat: 'seguir o fluxo sem trocar de ferramenta',
    criteria: ['“Salvar no tracker” cria a candidatura em Salvas e oferece atalho para Candidaturas.', '“Descartar” remove a vaga do feed e permite desfazer.', '“Gerar CV + cover letter” abre a tela de documentos da vaga.'] },
  { id: 'US-1.5', epic: 1, title: 'Alternar visualizações', priority: 'S', asA: c, iWant: 'alternar entre Lista e Cards', soThat: 'ver as vagas do jeito mais útil no momento',
    criteria: ['O seletor indica a visualização ativa.', '“Cards” mostra as vagas em grade de duas colunas; “Lista”, em uma coluna.'] },
  { id: 'US-1.6', epic: 1, title: 'Configurar alertas', priority: 'C', asA: c, iWant: 'configurar alertas de vagas novas', soThat: 'saber de vagas com match alto sem abrir o app',
    criteria: ['“Alertas diários” abre um painel com ativar/desativar, frequência, match mínimo e canais.', 'Desativar os alertas bloqueia os demais campos.', 'Salvar fecha o painel e confirma a configuração.'] },

  // ——— Épico 2 ———
  { id: 'US-2.1', epic: 2, title: 'Gerar documentos sob medida a partir do currículo base', priority: 'M', asA: c, iWant: 'gerar CV e cover letter ajustados à vaga a partir do meu currículo base', soThat: 'me candidatar em minutos sem reescrever tudo',
    criteria: ['CV e cover letter aparecem lado a lado, com versão e cobertura de palavras-chave.', 'Trechos reescritos aparecem destacados.', 'Posso ver só o CV ou só a carta.', 'Nada fora do currículo base aparece; dados faltantes viram marcadores.'] },
  { id: 'US-2.2', epic: 2, title: 'Ajustar a geração', priority: 'M', asA: c, iWant: 'escolher idioma, tom da carta, experiências em destaque e template', soThat: 'adequar os documentos à vaga',
    criteria: ['Idioma, tom e template são escolhas únicas com estado visível.', 'Experiências em destaque são checkboxes.', '“Regenerar” mostra carregamento e cria uma nova versão.', 'Palavras-chave ausentes têm atalho “Revisar skills”.'] },
  { id: 'US-2.3', epic: 2, title: 'Baixar e anexar', priority: 'M', asA: c, iWant: 'baixar os PDFs e anexá-los à candidatura', soThat: 'saber exatamente o que enviei',
    criteria: ['“Anexar ao tracker” registra a versão nos documentos da candidatura.', '“Baixar PDFs” confirma o download.', '“Abrir no Estúdio” leva ao editor completo.'] },

  // ——— Épico 3 ———
  { id: 'US-3.1', epic: 3, title: 'Editar o documento gerado em um estúdio', priority: 'M', asA: c, iWant: 'um estúdio para refinar o CV e a carta gerados', soThat: 'ter controle total do que vou enviar',
    criteria: ['Mostra a trilha até a vaga, as versões (ativa destacada) e a alternância CV / Cover letter.', 'Trocar de versão atualiza o subtítulo.'] },
  { id: 'US-3.2', epic: 3, title: 'Escolher os blocos incluídos', priority: 'M', asA: c, iWant: 'ligar e desligar blocos do currículo base', soThat: 'montar a versão mais relevante',
    criteria: ['Cada bloco tem nome e nota e pode ser ligado/desligado.', 'A cobertura de palavras-chave aparece como barra e fração.'] },
  { id: 'US-3.3', epic: 3, title: 'Ver e desfazer mudanças vs. a base', priority: 'M', asA: c, iWant: 'ver cada mudança em relação ao currículo base e poder desfazê-la', soThat: 'confiar no documento final',
    criteria: ['Cada mudança tem tipo (+, ↑, −), título e descrição.', '“Desfazer” remove a mudança e atualiza o contador.', 'Sem mudanças, aparece um estado vazio.'] },
  { id: 'US-3.4', epic: 3, title: 'Pedir ajustes em linguagem natural', priority: 'S', asA: c, iWant: 'pedir ajustes como “mais curto” ou “destaque CDK no resumo”', soThat: 'refinar sem editar à mão',
    criteria: ['Atalhos aplicam ajustes prontos.', 'O campo livre só envia com texto; o envio mostra carregamento.', 'O ajuste aplicado aparece na lista de mudanças.'] },

  // ——— Épico 4 ———
  { id: 'US-4.1', epic: 4, title: 'Manter um currículo base único', priority: 'M', asA: c, iWant: 'cadastrar dados, resumo, experiências, formação, idiomas e skills em um só lugar', soThat: 'todos os documentos partirem da mesma fonte',
    criteria: ['Dados pessoais e resumo são campos editáveis.', '“Adicionar experiência” e “Editar” abrem um formulário; cargo e empresa são obrigatórios.', 'Skills aparecem agrupadas.'] },
  { id: 'US-4.2', epic: 4, title: 'Versionar o currículo base', priority: 'S', asA: c, iWant: 'salvar novas versões e ver o histórico', soThat: 'saber de qual versão cada documento foi gerado',
    criteria: ['“Salvar como vN” cria a versão e atualiza a navegação.', '“Histórico de versões” lista versões com data, nota e documentos gerados.', 'Versões antigas podem ser restauradas.'] },
  { id: 'US-4.3', epic: 4, title: 'Importar de PDF ou LinkedIn', priority: 'C', asA: c, iWant: 'importar meu CV atual', soThat: 'não digitar tudo do zero',
    criteria: ['Escolho entre arquivo PDF e perfil do LinkedIn.', '“Importar” só habilita com arquivo ou URL.', 'Ao terminar, vejo um resumo do que foi encontrado e revisão antes de salvar.'] },
  { id: 'US-4.4', epic: 4, title: 'Definir regras de geração', priority: 'M', asA: c, iWant: 'ligar regras como “nunca incluir skill ausente”', soThat: 'garantir documentos honestos',
    criteria: ['Cada regra é um checkbox que liga/desliga.'] },
  { id: 'US-4.5', epic: 4, title: 'Definir preferências de busca', priority: 'S', asA: c, iWant: 'registrar cargos-alvo, regiões, modalidade, contratação e remuneração mínima', soThat: 'o match e as buscas refletirem o que procuro',
    criteria: ['As preferências aparecem como lista rótulo → valor.', '“Editar” abre um formulário; salvar atualiza a lista.'] },

  // ——— Épico 5 ———
  { id: 'US-5.1', epic: 5, title: 'Ver minhas buscas automatizadas', priority: 'M', asA: c, iWant: 'ver todas as buscas salvas com status, frequência e vagas novas', soThat: 'saber o que está rodando',
    criteria: ['Cada busca mostra nome, descrição, dork, frequência, fontes, última execução e “+N novas”.', 'Buscas pausadas aparecem diferenciadas.'] },
  { id: 'US-5.2', epic: 5, title: 'Pausar, executar e editar uma busca', priority: 'M', asA: c, iWant: 'pausar/retomar, executar agora e editar o dork de uma busca', soThat: 'controlar a coleta',
    criteria: ['O interruptor alterna Ativa/Pausada.', '“Executar agora” mostra carregamento e atualiza o contador.', '“Editar dork” abre o gerador; “Ver resultados” abre Novas vagas.'] },
  { id: 'US-5.3', epic: 5, title: 'Criar uma busca descrevendo em texto livre', priority: 'M', asA: c, iWant: 'descrever em texto livre o que procuro', soThat: 'criar uma busca sem conhecer operadores',
    criteria: ['O campo de descrição é editável.', '“Salvar e ativar” fica desabilitado sem descrição e, ao salvar, a busca entra no topo da lista.'] },
  { id: 'US-5.4', epic: 5, title: 'Converter a descrição em Google Dork (recomendado)', priority: 'M', asA: c, iWant: 'que o app recomende e converta minha descrição em um Google Dork', soThat: 'encontrar vagas direto nos ATS',
    criteria: ['Um destaque recomenda dorking, com “Converter descrição em dork” e “O que é isso?”.', 'Após converter, vejo como foi entendido (cargos, stack, local, exclusões, sites) e o dork.', '“Ajustar campo a campo no gerador” abre o gerador preenchido.'] },
  { id: 'US-5.5', epic: 5, title: 'Escolher fontes, frequência e limite de aviso', priority: 'M', asA: c, iWant: 'escolher onde, com que frequência e a partir de qual match ser avisado', soThat: 'equilibrar volume e relevância',
    criteria: ['Fontes são chips com checkbox.', 'Frequência e limite são seleções.', '“Testar agora” mostra uma prévia do volume.'] },

  // ——— Épico 6 ———
  { id: 'US-6.1', epic: 6, title: 'Entender o que é Google Dorking', priority: 'M', asA: c, iWant: 'uma explicação curta do conceito e dos operadores', soThat: 'usar a técnica com confiança',
    criteria: ['A seção explica o conceito, o uso para vagas e o uso responsável.', 'Uma tabela lista site:, "frase", OR, -termo, intitle:, inurl: e after:.'] },
  { id: 'US-6.2', epic: 6, title: 'Montar um dork preenchendo campos', priority: 'M', asA: c, iWant: 'preencher campos simples e obter o dork completo', soThat: 'não errar a sintaxe',
    criteria: ['Cada alteração recompila o dork na hora.', 'Cargos viram frases entre aspas com OR; “exigir no título” usa intitle:.', 'Sites viram (site:a OR site:b); exclusões viram -termo; partes vazias somem.'] },
  { id: 'US-6.3', epic: 6, title: 'Partir de um modelo', priority: 'S', asA: c, iWant: 'aplicar modelos prontos', soThat: 'começar mais rápido',
    criteria: ['Clicar num modelo preenche os campos e atualiza o dork.'] },
  { id: 'US-6.4', epic: 6, title: 'Ver, entender e usar o dork gerado', priority: 'M', asA: c, iWant: 'ver o dork colorido por parte, entender cada parte e copiá-lo, testá-lo ou salvá-lo', soThat: 'usar onde quiser',
    criteria: ['O contador mostra “N de 32 palavras” e alerta acima do limite.', '“Anatomia da busca” explica cada parte.', '“Copiar” confirma; “Salvar como busca automatizada” cria a busca.'] },

  // ——— Épico 7 ———
  { id: 'US-7.1', epic: 7, title: 'Acompanhar candidaturas em kanban', priority: 'M', asA: c, iWant: 'ver minhas candidaturas por etapa', soThat: 'saber onde cada processo está',
    criteria: ['Colunas Salvas → Oferta com total por etapa.', 'Cards mostram empresa, match, cargo, contexto, documentos e próximo passo.', 'Clicar no cargo abre a candidatura para edição.'] },
  { id: 'US-7.2', epic: 7, title: 'Registrar uma candidatura manual', priority: 'M', asA: c, iWant: 'registrar candidaturas feitas fora do Radar', soThat: 'ter tudo num só lugar',
    criteria: ['“Candidatura manual” abre o drawer; fecha no ×, em Cancelar, fora ou com Esc.', '“Importar” preenche dados a partir do link.', 'Empresa e cargo são obrigatórios; erros aparecem no campo.', 'Salvar adiciona o card na etapa escolhida.'] },
  { id: 'US-7.3', epic: 7, title: 'Mover candidaturas entre etapas', priority: 'S', asA: c, iWant: 'mudar a etapa de uma candidatura', soThat: 'manter o tracker atualizado',
    criteria: ['Cada card tem um seletor “Mover para”.', 'Mover leva o card para a coluna escolhida e atualiza os totais.'] },
  { id: 'US-7.4', epic: 7, title: 'Ser lembrado de follow-ups', priority: 'S', asA: c, iWant: 'lembretes de próximos passos', soThat: 'não perder o timing',
    criteria: ['Follow-ups atrasados aparecem em âmbar nos cards.', 'Ao abrir Candidaturas, um aviso mostra o follow-up atrasado.', '“Marcar como feito” limpa o atraso do card.'] },

  // ——— Épico 8 ———
  { id: 'US-8.1', epic: 8, title: 'Ver indicadores do meu funil', priority: 'M', asA: c, iWant: 'ver candidaturas, taxa de resposta, entrevistas e tempo até a primeira resposta', soThat: 'avaliar minha estratégia',
    criteria: ['Quatro indicadores com valor e contexto.'] },
  { id: 'US-8.2', epic: 8, title: 'Ver o funil e os próximos compromissos', priority: 'M', asA: c, iWant: 'ver o funil e os compromissos dos próximos 7 dias', soThat: 'saber onde travo e o que vem pela frente',
    criteria: ['O funil usa a primeira etapa como 100%.', 'Compromissos mostram dia, título e detalhe.'] },
  { id: 'US-8.3', epic: 8, title: 'Ordenar e exportar a tabela de candidaturas', priority: 'S', asA: c, iWant: 'uma tabela ordenável e exportável', soThat: 'analisar e compartilhar',
    criteria: ['Empresa, data e match são ordenáveis e o cabeçalho indica a direção.', 'Status aparece como pill da etapa.', '“Exportar CSV” confirma a exportação.'] },

  // ——— Épico 9 ———
  { id: 'US-9.1', epic: 9, title: 'Navegar entre as seções', priority: 'M', asA: c, iWant: 'uma navegação lateral fixa com contadores e buscas salvas', soThat: 'me mover rápido entre as áreas',
    criteria: ['O item ativo é marcado (aria-current).', 'Contadores refletem o estado (ex.: candidaturas ativas).', 'Clicar troca de seção sem recarregar.'] },
  { id: 'US-9.2', epic: 9, title: 'Usar o app só com teclado e leitor de tela', priority: 'M', asA: 'candidato com necessidades de acessibilidade', iWant: 'usar tudo pelo teclado e com leitor de tela', soThat: 'não depender do mouse',
    criteria: ['Tab percorre os controles em ordem lógica, com foco visível.', 'Enter/Espaço acionam botões e chips; Esc fecha o drawer.', 'Controles têm nomes acessíveis (verificado pelo addon a11y).'] },
  { id: 'US-9.3', epic: 9, title: 'Consultar o design system', priority: 'M', asA: 'desenvolvedor do produto', iWant: 'uma página com tokens, tipografia, cores, ícones e o contrato de props', soThat: 'construir telas consistentes',
    criteria: ['Cores, tipografia, espaçamento e ícones vêm direto dos tokens.', 'Há links para a referência completa e para a documentação.'] },
];

export const userStories: Record<string, UserStory> = Object.fromEntries(list.map((s) => [s.id, s]));
export const userStoryList = list;
