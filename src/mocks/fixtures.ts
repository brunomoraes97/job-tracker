/**
 * Dados de exemplo usados apenas pelas stories.
 * Vagas, empresas e números são fictícios; os dados do candidato vêm do Currículo base.
 */
import type {
  Application,
  ApplicationDraft,
  CalendarEvent,
  CoverLetterData,
  DorkFields,
  DorkOperator,
  DorkSite,
  DorkTemplate,
  Experience,
  FunnelStep,
  Job,
  KeyValue,
  Kpi,
  NavItem,
  ParsedCriterion,
  PersonalInfo,
  ResumeChange,
  ResumeDocumentData,
  SavedSearch,
  SavedSearchSummary,
  SelectOption,
  SkillGroup,
  Stage,
  ToggleOption,
} from '@/types';

export const user = { name: 'Matheus Bruno de Moraes', shortName: 'Matheus Moraes', resumeVersion: 'Currículo base v4' };

export const navItems: NavItem[] = [
  { id: 'jobs', label: 'Novas vagas', href: '#jobs', badge: '23' },
  { id: 'searches', label: 'Buscas automatizadas', href: '#searches', badge: '5' },
  { id: 'dorking', label: 'Google Dorking', href: '#dorking' },
  { id: 'applications', label: 'Candidaturas', href: '#applications', badge: '18' },
  { id: 'metrics', label: 'Tabela & métricas', href: '#metrics' },
  { id: 'studio', label: 'Estúdio de currículo', href: '#studio' },
  { id: 'profile', label: 'Currículo base', href: '#profile', badge: 'v4' },
];

export const savedSearchSummaries: SavedSearchSummary[] = [
  { id: 's1', label: 'Senior Backend · Go · Remote', newCount: 14 },
  { id: 's2', label: 'Platform · AWS · Europa', newCount: 6 },
  { id: 's3', label: 'AI Agents · Python', newCount: 3 },
];

export const jobFilters = [
  { id: 'remote', label: 'Remoto', selected: true },
  { id: 'go', label: 'Go', selected: true },
  { id: 'aws', label: 'AWS', selected: true },
  { id: 'senior', label: 'Sênior+', selected: true },
  { id: 'tz', label: 'Fuso EUA/Europa', selected: false },
  { id: 'pj', label: 'Aceita PJ/contractor', selected: false },
];

export const viewOptions = [
  { value: 'list', label: 'Lista' },
  { value: 'cards', label: 'Cards' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'table', label: 'Tabela' },
];

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Backend Engineer (Go)',
    company: { name: 'Lumen Freight', monogram: 'LF', tint: 'teal' },
    location: 'Remoto · Américas',
    tags: ['Go', 'AWS', 'PostgreSQL', 'APIs'],
    salary: 'US$ 110–140k',
    source: 'Greenhouse',
    postedLabel: 'há 2 h',
    match: 94,
    isNew: true,
    summary:
      'Time de plataforma de fretes busca engenheiro(a) sênior para desenhar e operar serviços em Go na AWS, com PostgreSQL, filas e APIs públicas para parceiros. Sobreposição de 4 h com US Central.',
    highlights: ['Remoto · Américas', 'Contractor aceito', 'US$ 110–140k'],
    keywordsHit: ['Go', 'AWS Lambda', 'ECS', 'API Gateway', 'PostgreSQL', 'CDK', 'REST APIs', 'MongoDB'],
    keywordsMissing: ['Kafka', 'Datadog'],
    fit: [
      { label: 'Stack técnica', value: 92 },
      { label: 'Senioridade', value: 100 },
      { label: 'Fuso / localização', value: 90 },
      { label: 'Idioma', value: 100 },
    ],
  },
  { id: 'j2', title: 'Staff Software Engineer, Platform', company: { name: 'Tessera Health', monogram: 'TH', tint: 'violet' }, location: 'Remoto · fusos dos EUA', tags: ['Go', 'Kubernetes', 'Terraform', 'AWS'], salary: 'US$ 150–185k', source: 'Lever', postedLabel: 'há 5 h', match: 88, isNew: true,
    summary: 'Time de plataforma de saúde digital busca Staff Engineer para evoluir a plataforma interna (Kubernetes, Terraform) e serviços em Go na AWS. Remoto em fusos dos EUA.',
    highlights: ['Remoto · fusos dos EUA', 'Contractor aceito', 'US$ 150–185k'],
    keywordsHit: ['Go', 'AWS', 'APIs', 'PostgreSQL'], keywordsMissing: ['Kubernetes', 'Terraform'],
    fit: [{ label: 'Stack técnica', value: 78 }, { label: 'Senioridade', value: 90 }, { label: 'Fuso / localização', value: 95 }, { label: 'Idioma', value: 100 }] },
  { id: 'j3', title: 'Backend Engineer, Payments', company: { name: 'Kiln Pay', monogram: 'KP', tint: 'amber' }, location: 'Remoto · Europa', tags: ['Go', 'gRPC', 'PostgreSQL'], salary: '€ 75–95k', source: 'LinkedIn', postedLabel: 'há 9 h', match: 83, isNew: true,
    summary: 'Fintech europeia procura backend para o time de pagamentos: serviços em Go com gRPC e PostgreSQL, foco em confiabilidade e conciliação.',
    highlights: ['Remoto · Europa', '€ 75–95k'],
    keywordsHit: ['Go', 'PostgreSQL', 'APIs'], keywordsMissing: ['gRPC'],
    fit: [{ label: 'Stack técnica', value: 85 }, { label: 'Senioridade', value: 85 }, { label: 'Fuso / localização', value: 70 }, { label: 'Idioma', value: 100 }] },
  { id: 'j4', title: 'Senior Software Engineer, AI Agents', company: { name: 'Northbeam Labs', monogram: 'NL', tint: 'stone' }, location: 'Remoto · global', tags: ['Python', 'AWS Bedrock', 'LangGraph'], salary: 'US$ 120–160k', source: 'Wellfound', postedLabel: 'ontem', match: 81,
    summary: 'Startup de IA aplicada contrata engenheiro(a) sênior para construir agentes com LangGraph e AWS Bedrock em Python, integrados a sistemas de clientes.',
    highlights: ['Remoto · global', 'Contractor aceito', 'US$ 120–160k'],
    keywordsHit: ['Python', 'AWS Bedrock', 'LangGraph', 'Agentes de IA'], keywordsMissing: ['RAG em produção'],
    fit: [{ label: 'Stack técnica', value: 80 }, { label: 'Senioridade', value: 85 }, { label: 'Fuso / localização', value: 75 }, { label: 'Idioma', value: 100 }] },
  { id: 'j5', title: 'Backend Engineer (Java)', company: { name: 'Vireo Commerce', monogram: 'VC', tint: 'amber' }, location: 'Híbrido · Lisboa — fora das suas preferências', tags: ['Java', 'Spring', 'Kafka'], salary: '€ 60–70k', source: 'LinkedIn', postedLabel: 'há 2 dias', match: 58,
    summary: 'E-commerce em Lisboa busca backend Java/Spring com Kafka, em regime híbrido (3 dias no escritório).',
    highlights: ['Híbrido · Lisboa', '€ 60–70k'],
    keywordsHit: ['Java', 'APIs'], keywordsMissing: ['Spring', 'Kafka'],
    fit: [{ label: 'Stack técnica', value: 55 }, { label: 'Senioridade', value: 80 }, { label: 'Fuso / localização', value: 20 }, { label: 'Idioma', value: 90 }] },
];

export const stages: Stage[] = [
  { id: 'saved', label: 'Salvas' },
  { id: 'applied', label: 'Aplicadas' },
  { id: 'talking', label: 'Em conversa' },
  { id: 'interview', label: 'Entrevistas' },
  { id: 'offer', label: 'Oferta' },
];

export const stageOptions: SelectOption[] = [
  { value: 'applied', label: 'Aplicada' },
  { value: 'saved', label: 'Salva' },
  { value: 'talking', label: 'Em conversa' },
  { value: 'interview', label: 'Entrevistas' },
  { value: 'offer', label: 'Oferta' },
  { value: 'closed', label: 'Encerrada' },
];

export const sourceOptions: SelectOption[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Indicação' },
  { value: 'company', label: 'Site da empresa' },
  { value: 'recruiter', label: 'Recrutador' },
];

export const applications: Application[] = [
  { id: 'a1', company: 'Lumen Freight', role: 'Senior Backend Engineer (Go)', stage: 'saved', meta: 'Salva hoje · Greenhouse', source: 'Greenhouse', match: 94, documents: ['CV v2', 'Cover letter'], nextStep: 'Aplicar até 30 set' },
  { id: 'a2', company: 'Northbeam Labs', role: 'Senior SWE, AI Agents', stage: 'saved', meta: 'Salva ontem · Wellfound', source: 'Wellfound', match: 81, documents: ['Sem documentos'], nextStep: 'Gerar documentos' },
  { id: 'a3', company: 'Kiln Pay', role: 'Backend Engineer, Payments', stage: 'applied', meta: 'Aplicada 22 set · LinkedIn', appliedOn: '22/09', source: 'LinkedIn', match: 83, documents: ['CV v1', 'Cover letter'], nextStep: 'Follow-up atrasado 1 dia', nextStepOverdue: true },
  { id: 'a4', company: 'Harbor Cloud', role: 'Senior Go Engineer', stage: 'applied', meta: 'Aplicada 19 set · manual', appliedOn: '19/09', source: 'Manual', match: 79, documents: ['CV base'], nextStep: 'Follow-up em 3 dias' },
  { id: 'a5', company: 'Quill Data', role: 'Backend Engineer', stage: 'applied', meta: 'Aplicada 15 set · indicação', appliedOn: '15/09', source: 'Indicação', match: 76, documents: ['CV v1'], nextStep: 'Follow-up atrasado 4 dias', nextStepOverdue: true },
  { id: 'a6', company: 'Tessera Health', role: 'Staff SWE, Platform', stage: 'talking', meta: 'Recrutadora: [nome]', appliedOn: '17/09', source: 'Lever', match: 88, documents: ['CV v3', 'Cover letter'], nextStep: 'Enviar disponibilidade' },
  { id: 'a7', company: 'Arcadia Logistics', role: 'Senior Backend (Go/AWS)', stage: 'talking', meta: 'Screening feito 20 set', appliedOn: '14/09', source: 'Manual', match: 90, documents: ['CV v2'], nextStep: 'Aguardando retorno' },
  { id: 'a8', company: 'Fernway', role: 'Senior Platform Engineer', stage: 'interview', meta: 'Tech screen · seg 28 set 14h', appliedOn: '12/09', source: 'Greenhouse', match: 86, documents: ['CV v2', 'Cover letter'], nextStep: 'Preparar system design' },
  { id: 'a9', company: 'Orbit Metrics', role: 'Backend Engineer (Go)', stage: 'interview', meta: 'Painel final · qui 1 out', appliedOn: '08/09', source: 'LinkedIn', match: 84, documents: ['CV v1'], nextStep: 'Revisar notas da etapa 2' },
  { id: 'a10', company: 'Brightline Labs', role: 'Senior Software Engineer', stage: 'offer', meta: 'Recebida 24 set', appliedOn: '10/09', source: 'Indicação', match: 80, documents: ['CV v1'], nextStep: 'Responder até 2 out' },
  { id: 'a11', company: 'Pinecrest', role: 'Backend Engineer', stage: 'closed', meta: 'Encerrada 1 set', appliedOn: '01/09', source: 'Remote OK', match: 76, documents: ['CV v1'], nextStep: '—' },
];

export const emptyDraft: ApplicationDraft = {
  url: '',
  company: '',
  role: '',
  stage: 'applied',
  appliedOn: '2026-09-26',
  source: 'linkedin',
  salary: '',
  contact: '',
  nextStep: 'Follow-up por e-mail',
  remindOn: '2026-10-03',
  documents: 'generate',
  notes: '',
};

export const kpis: Kpi[] = [
  { id: 'k1', label: 'Candidaturas', value: '24', hint: '+6 vs. 30 dias anteriores' },
  { id: 'k2', label: 'Taxa de resposta', value: '29%', hint: '7 de 24 responderam' },
  { id: 'k3', label: 'Entrevistas', value: '5', hint: '3 marcadas esta semana' },
  { id: 'k4', label: 'Tempo até 1ª resposta', value: '6 d', hint: 'mediana' },
];

export const funnel: FunnelStep[] = [
  { id: 'f1', label: 'Aplicadas', count: 24 },
  { id: 'f2', label: 'Com resposta', count: 7 },
  { id: 'f3', label: 'Entrevistas', count: 5 },
  { id: 'f4', label: 'Etapa final', count: 2 },
  { id: 'f5', label: 'Ofertas', count: 1 },
];

export const events: CalendarEvent[] = [
  { id: 'e1', weekday: 'SEG', day: '28', title: 'Fernway · tech screen', subtitle: '14:00 BRT · Google Meet' },
  { id: 'e2', weekday: 'TER', day: '29', title: 'Kiln Pay · follow-up', subtitle: 'Lembrete criado automaticamente' },
  { id: 'e3', weekday: 'QUI', day: '1', title: 'Orbit Metrics · painel final', subtitle: '11:00 BRT · 3 entrevistadores' },
  { id: 'e4', weekday: 'SEX', day: '2', title: 'Brightline Labs · prazo da oferta', subtitle: 'Responder até 18:00' },
];

export const personalInfo: PersonalInfo = {
  name: 'Matheus Bruno de Moraes',
  title: 'Senior Backend Software Engineer',
  location: 'Curitiba, Brazil (UTC−3)',
  email: '1997mbrunomoraes@gmail.com',
  linkedin: '',
  github: '',
  summary:
    'Senior backend engineer building Go services on AWS (ECS, Lambda, API Gateway, CDK) with PostgreSQL and MongoDB, working remotely for a US company. Previously Python/Java at Multilogin and Python/FastAPI at Saaspro, after ~5 years in technical support and onboarding.',
};

export const experiences: Experience[] = [
  { id: 'x1', role: 'Senior Backend Software Engineer', company: 'BamBams', location: 'EUA · remoto', period: '[início] – atual', bullets: ['Serviços em Go na AWS (ECS, Lambda, API Gateway), infraestrutura como código com CDK.', 'Dados em PostgreSQL e MongoDB; workflow n8n de notificações de produção no Slack.'], tags: ['Go', 'AWS', 'CDK', 'PostgreSQL', 'MongoDB'] },
  { id: 'x2', role: 'Software Engineer', company: 'Multilogin', location: 'Estônia · remoto', period: '[início] – [fim]', bullets: ['Python e Java em automação de navegadores.'], tags: ['Python', 'Java', 'Browser automation'] },
  { id: 'x3', role: 'Software Engineer', company: 'Saaspro', location: '[local]', period: '[início] – [fim]', bullets: ['APIs em Python/FastAPI.'], tags: ['Python', 'FastAPI'] },
  { id: 'x4', role: 'Suporte técnico e onboarding', company: 'SharpSpring Brasil, Multilogin, IREV', location: 'agrupado no CV como experiência anterior', period: '~5 anos', bullets: ['Suporte técnico e onboarding de clientes antes da transição para engenharia.'], tags: ['Customer-facing', 'Onboarding'] },
];

export const skillGroups: SkillGroup[] = [
  { id: 'g1', label: 'Linguagens', items: ['Go', 'Python', 'Java'] },
  { id: 'g2', label: 'Cloud', items: ['AWS ECS', 'Lambda', 'API Gateway', 'CDK'] },
  { id: 'g3', label: 'Dados', items: ['PostgreSQL', 'MongoDB'] },
  { id: 'g4', label: 'IA / agentes', items: ['Strands', 'Bedrock AgentCore', 'LangGraph', 'CrewAI'] },
];

export const searchPreferences: KeyValue[] = [
  { id: 'p1', label: 'Cargos-alvo', value: 'Senior / Staff Backend, Platform' },
  { id: 'p2', label: 'Regiões', value: 'América do Norte, Europa' },
  { id: 'p3', label: 'Modalidade', value: '100% remoto' },
  { id: 'p4', label: 'Contratação', value: 'Contractor via PJ próprio' },
  { id: 'p5', label: 'Remuneração mínima', value: 'US$ [valor]/ano' },
  { id: 'p6', label: 'Alerta diário', value: '08:00 · match ≥ 75%' },
];

export const generationRules: ToggleOption[] = [
  { id: 'r1', label: 'Nunca incluir skill, cargo ou empresa que não esteja neste currículo base', checked: true },
  { id: 'r2', label: 'Usar métricas só quando estiverem preenchidas aqui', checked: true },
  { id: 'r3', label: 'Manter datas e títulos exatamente como cadastrados', checked: true },
  { id: 'r4', label: 'Destacar em verde os trechos reescritos para cada vaga', checked: true },
  { id: 'r5', label: 'Limitar o CV a 1 página quando possível', checked: false },
];

export const languages = ['Português · nativo', 'Inglês · bilíngue', 'Espanhol · profissional'];
export const education = { degree: 'Psicologia', institution: 'Universidade Federal do Paraná', year: '[ano de conclusão]' };

export const documentBlocks: ToggleOption[] = [
  { id: 'b1', label: 'Resumo', description: 'reescrito para a vaga', checked: true },
  { id: 'b2', label: 'BamBams', description: 'Go · AWS · CDK', checked: true },
  { id: 'b3', label: 'Multilogin', description: 'Python · Java', checked: true },
  { id: 'b4', label: 'Saaspro', description: 'FastAPI', checked: true },
  { id: 'b5', label: 'Suporte & onboarding', description: 'condensado em 1 linha', checked: true },
  { id: 'b6', label: 'Projetos de agentes de IA', description: 'fora desta versão', checked: false },
];

export const resumeChanges: ResumeChange[] = [
  { id: 'c1', kind: 'add', title: 'Resumo reescrito', description: 'Foco em Go na AWS e trabalho remoto com time dos EUA.' },
  { id: 'c2', kind: 'move', title: 'BamBams no topo', description: 'Bullets de ECS/Lambda/API Gateway primeiro.' },
  { id: 'c3', kind: 'add', title: '“REST APIs” explícito', description: 'Termo da vaga aplicado ao bullet da Saaspro.' },
  { id: 'c4', kind: 'cut', title: 'Suporte condensado', description: '3 empresas agrupadas em uma linha.' },
  { id: 'c5', kind: 'cut', title: 'Agentes de IA removidos', description: 'Pouco relevantes aqui — reative à esquerda.' },
];

const h = (text: string) => ({ text, highlight: true as const });

export const resumeDocument: ResumeDocumentData = {
  name: 'MATHEUS BRUNO DE MORAES',
  title: 'Senior Backend Software Engineer',
  contact: 'Curitiba, Brazil (UTC−3) · 1997mbrunomoraes@gmail.com · linkedin.com/in/[perfil] · github.com/[usuário]',
  summary: [
    'Senior backend engineer building ',
    h('Go services on AWS — ECS, Lambda, API Gateway and CDK — backed by PostgreSQL'),
    ' and MongoDB. ',
    h('Works fully remote with a US-based team across time zones.'),
    ' Five years in technical support and onboarding before engineering bring a customer-facing view of reliability.',
  ],
  entries: [
    {
      id: 'e1',
      heading: 'Senior Backend Software Engineer — BamBams (US · remote)',
      period: '[início] – Present',
      bullets: [
        [h('Design and operate Go services on AWS ECS and Lambda behind API Gateway'), ', provisioned as code with CDK.'],
        ['Model and query data across ', h('PostgreSQL'), ' and MongoDB; [resultado mensurável].'],
        ['Built an n8n workflow that posts production-image notifications to Slack.'],
      ],
    },
    { id: 'e2', heading: 'Software Engineer — Multilogin (Estonia · remote)', period: '[início] – [fim]', bullets: [['Python and Java services for browser automation; [resultado mensurável].']] },
    { id: 'e3', heading: 'Software Engineer — Saaspro', period: '[início] – [fim]', bullets: [['Python/FastAPI ', h('REST APIs'), '; [resultado mensurável].']] },
    { id: 'e4', heading: 'Technical Support & Onboarding — SharpSpring Brazil, Multilogin, IREV', period: '~5 years', bullets: [] },
  ],
  skills: ['Languages: Go, Python, Java · Cloud: AWS (ECS, Lambda, API Gateway, CDK) · Data: PostgreSQL, MongoDB · APIs: REST, FastAPI'],
  education: 'Degree in Psychology — Universidade Federal do Paraná (UFPR)',
  languages: 'Portuguese (native) · English (bilingual) · Spanish (professional)',
};

export const coverLetter: CoverLetterData = {
  sender: 'Matheus Bruno de Moraes',
  senderContact: 'Curitiba, Brazil · 1997mbrunomoraes@gmail.com',
  date: '26 September 2026',
  recipient: 'Hiring Team — Lumen Freight',
  subject: 'Senior Backend Engineer (Go)',
  greeting: 'Dear Lumen Freight team,',
  paragraphs: [
    ['I’m a senior backend engineer working remotely for BamBams, a US-based company, from Curitiba. ', h('Your focus on Go services running on AWS with PostgreSQL is the work I do every day'), ', and I’d like to bring it to your platform team.'],
    ['At BamBams I design and operate services on ECS and Lambda behind API Gateway, with infrastructure defined in CDK. ', h('I’m comfortable owning a service end to end — from API design to deployment'), '.'],
    ['Before engineering I spent about five years in technical support and onboarding at SharpSpring Brazil, Multilogin and IREV. It taught me to read an outage from the customer’s side, which shapes how I build ', h('public APIs for partners'), '.'],
    ['I’d welcome a conversation about the role. I’m available as a contractor through my own company.'],
  ],
  closing: 'Sincerely,\nMatheus Bruno de Moraes',
};

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'es', label: 'Español' },
];
export const toneOptions = [
  { value: 'direct', label: 'Direto' },
  { value: 'formal', label: 'Formal' },
  { value: 'warm', label: 'Caloroso' },
];
export const templateOptions = [
  { value: 'classic', label: 'Clássico' },
  { value: 'modern', label: 'Moderno' },
  { value: 'compact', label: 'Compacto' },
];
export const quickAdjustments = ['Mais curto', 'Enfatizar APIs públicas', 'Tom mais formal'];

export const savedSearches: SavedSearch[] = [
  { id: 'ss1', name: 'Senior Backend · Go · Remote', newCount: 14, active: true, description: 'Backend sênior com Go e AWS, remoto para as Américas, direto nos ATS.', dork: '(site:boards.greenhouse.io OR site:jobs.lever.co OR site:jobs.ashbyhq.com) ("Senior Backend Engineer" OR "Backend Engineer") golang AWS (remote OR Americas) -hybrid', meta: 'A cada 6 h · Google + LinkedIn · rodou há 12 min' },
  { id: 'ss2', name: 'Platform · AWS · Europa', newCount: 6, active: true, description: 'Platform/Infra com AWS e Kubernetes, remoto a partir da Europa ou com overlap europeu.', dork: '(site:jobs.lever.co OR site:jobs.ashbyhq.com) intitle:"Platform Engineer" AWS Kubernetes (remote OR EMEA OR Europe) -onsite', meta: 'Diária 08:00 · Google · rodou hoje 08:00' },
  { id: 'ss3', name: 'AI Agents · Python', newCount: 3, active: true, description: 'Vagas de engenharia com agentes de IA (LangGraph, Bedrock) em Python.', dork: '(site:boards.greenhouse.io OR site:jobs.ashbyhq.com) ("AI Engineer" OR "Software Engineer") agents (LangGraph OR Bedrock) Python remote', meta: 'Diária 08:00 · Google + Wellfound · rodou hoje 08:00' },
  { id: 'ss4', name: 'Contractor LATAM — backend', newCount: 2, active: true, description: 'Qualquer stack backend, desde que aceite contractor na América Latina.', dork: '("backend engineer" OR "software engineer") (contractor OR "independent contractor") (LATAM OR "Latin America") remote -onsite', meta: 'A cada 12 h · Google + Remote OK · rodou há 3 h' },
  { id: 'ss5', name: 'Staff Engineer · fusos dos EUA', newCount: 0, active: false, description: 'Staff/Principal com Go, 100% remoto em fusos dos EUA.', dork: 'site:jobs.lever.co intitle:"Staff" golang remote ("US timezones" OR "EST" OR "CST") -clearance', meta: 'Semanal · pausada desde 20 set' },
];

export const searchDescription =
  'Vagas remotas de Senior Backend ou Platform Engineer com Go e AWS, que aceitem contractor da América Latina, publicadas em Greenhouse, Lever ou Ashby. Nada híbrido ou que exija security clearance.';

export const parsedCriteria: ParsedCriterion[] = [
  { id: 'pc1', label: 'Cargos', values: ['Senior Backend Engineer', 'Platform Engineer'], tone: 'warning' },
  { id: 'pc2', label: 'Stack', values: ['golang', 'AWS'], tone: 'info' },
  { id: 'pc3', label: 'Local', values: ['remote', 'LATAM', 'contractor'], tone: 'violet' },
  { id: 'pc4', label: 'Excluir', values: ['hybrid', 'security clearance'], tone: 'danger' },
  { id: 'pc5', label: 'Sites', values: ['Greenhouse', 'Lever', 'Ashby'], tone: 'primary' },
];

export const searchSources: ToggleOption[] = [
  { id: 'google', label: 'Google (dork)', checked: true },
  { id: 'linkedin', label: 'LinkedIn Jobs', checked: true },
  { id: 'wellfound', label: 'Wellfound', checked: false },
  { id: 'remoteok', label: 'Remote OK', checked: false },
];
export const frequencyOptions: SelectOption[] = [
  { value: '6h', label: 'A cada 6 horas' },
  { value: 'daily', label: 'Diária · 08:00' },
  { value: '12h', label: 'A cada 12 horas' },
  { value: 'weekly', label: 'Semanal' },
];
export const thresholdOptions: SelectOption[] = [
  { value: '80', label: '80%' },
  { value: '70', label: '70%' },
  { value: '90', label: '90%' },
  { value: 'always', label: 'Sempre' },
];

export const dorkSites: DorkSite[] = [
  { id: 'gh', label: 'Greenhouse', domain: 'boards.greenhouse.io' },
  { id: 'lever', label: 'Lever', domain: 'jobs.lever.co' },
  { id: 'ashby', label: 'Ashby', domain: 'jobs.ashbyhq.com' },
  { id: 'workable', label: 'Workable', domain: 'apply.workable.com' },
  { id: 'sr', label: 'SmartRecruiters', domain: 'jobs.smartrecruiters.com' },
  { id: 'workday', label: 'Workday', domain: 'myworkdayjobs.com' },
  { id: 'wellfound', label: 'Wellfound', domain: 'wellfound.com' },
];

export const defaultDorkFields: DorkFields = {
  roles: 'Senior Backend Engineer, Backend Engineer, Platform Engineer',
  requireInTitle: false,
  keywords: 'golang, AWS',
  location: 'remote, LATAM, Americas',
  exclude: 'hybrid, onsite, security clearance',
  siteIds: ['gh', 'lever', 'ashby'],
  recency: '7',
};

export const dorkOperators: DorkOperator[] = [
  { operator: 'site:', description: 'Só resultados daquele domínio', example: 'site:jobs.lever.co' },
  { operator: '"frase"', description: 'Frase exata, nessa ordem', example: '"backend engineer"' },
  { operator: 'OR', description: 'Um termo ou outro (em maiúsculas)', example: '(golang OR go)' },
  { operator: '-termo', description: 'Exclui páginas com o termo', example: '-hybrid' },
  { operator: 'intitle:', description: 'Termo no título da página', example: 'intitle:"senior"' },
  { operator: 'inurl:', description: 'Termo no endereço (URL)', example: 'inurl:remote' },
  { operator: 'after:', description: 'Indexadas depois da data', example: 'after:2026-09-21' },
];

export const dorkTemplates: DorkTemplate[] = [
  { id: 't1', label: 'Go remoto em ATS', fields: { roles: 'Senior Backend Engineer, Backend Engineer', keywords: 'golang, AWS', location: 'remote, LATAM, Americas', exclude: 'hybrid, onsite', requireInTitle: false, recency: '7' } },
  { id: 't2', label: 'Staff / Platform', fields: { roles: 'Staff Engineer, Staff Platform Engineer, Principal Engineer', keywords: 'AWS, Kubernetes', location: 'remote', exclude: 'hybrid, clearance', requireInTitle: true, recency: '30' } },
  { id: 't3', label: 'AI Agents · Python', fields: { roles: 'AI Engineer, Senior Software Engineer', keywords: 'agents, LangGraph, Python', location: 'remote, worldwide', exclude: 'onsite', requireInTitle: false, recency: '7' } },
];

export const recencyOptions: SelectOption[] = [
  { value: 'any', label: 'Qualquer data' },
  { value: '1', label: 'Últimas 24 horas' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
];

/** Props padrão da navegação lateral para as stories de páginas. */
export const sidebarProps = {
  items: navItems,
  activeId: 'jobs',
  savedSearches: savedSearchSummaries,
  user: { name: user.name, displayName: user.shortName, subtitle: user.resumeVersion, href: '#profile' },
};

export const alertChannels: ToggleOption[] = [
  { id: 'email', label: 'E-mail', description: '1997mbrunomoraes@gmail.com', checked: true },
  { id: 'push', label: 'Notificação no navegador', checked: false },
  { id: 'slack', label: 'Slack', description: 'mensagem direta', checked: false },
];

export const resumeVersions = [
  { id: 'v4', label: 'v4', date: '12 set 2026', note: 'Adicionadas skills de agentes de IA e reescrito o resumo.', documents: 11, current: true },
  { id: 'v3', label: 'v3', date: '28 ago 2026', note: 'Experiência na BamBams detalhada (ECS, Lambda, CDK).', documents: 7 },
  { id: 'v2', label: 'v2', date: '02 ago 2026', note: 'Suporte & onboarding agrupados em um bloco.', documents: 3 },
  { id: 'v1', label: 'v1', date: '15 jul 2026', note: 'Importado do PDF original.', documents: 0 },
];
