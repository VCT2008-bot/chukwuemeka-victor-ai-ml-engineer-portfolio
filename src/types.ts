export interface MetricRecord {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

export interface EpochProgress {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  valAccuracy: number;
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  discipline: string;
  category: 'ml' | 'cv' | 'software';
  status: string;
  question: string;
  data: {
    name: string;
    description: string;
    specs: { label: string; value: string }[];
  };
  approach: {
    architecture: string;
    preprocessing: string[];
    rationale: string;
  };
  experiment: {
    details: string;
    hyperparameters: { label: string; value: string }[];
    epochsData?: EpochProgress[];
  };
  evaluation: {
    summary: string;
    metrics: MetricRecord[];
    disclaimer?: string;
  };
  result: {
    summary: string;
    headlineMetric: string;
    deployment: string;
  };
  whatBroke: {
    challenges: string[];
    failedAttempts: string[];
    currentLimitations: string[];
  };
  whatILearned: string[];
  codeSnippets?: {
    title: string;
    code: string;
    language: string;
  }[];
  gradCamInfo?: {
    enabled: boolean;
    description: string;
    focusAreas: string[];
  };
}

export interface ToolboxCategory {
  category: string;
  purpose: string;
  tools: {
    name: string;
    explanation: string;
    tags?: string[];
    configSnippet?: string;
  }[];
}

export interface ProtocolStep {
  stepNumber: string;
  title: string;
  action: string;
  checklist: string[];
  outputArtifact: string;
  configSnippet?: string;
  snippetLabel?: string;
}

export interface FailureLesson {
  id: string;
  category: string;
  issue: string;
  symptom: string;
  rootCause: string;
  resolution: string;
}

export interface LearningItem {
  topic: string;
  domain: string;
  status: string;
  focusArea: string;
  date: string;
  notes: string;
}

export interface RepositoryItem {
  name: string;
  purpose: string;
  primaryLanguage: string;
  techStack: string[];
  lastUpdated: string;
  url: string;
  isPrototype?: boolean;
}
