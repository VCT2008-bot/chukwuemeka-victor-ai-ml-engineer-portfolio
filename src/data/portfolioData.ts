import {
  CaseStudy,
  ToolboxCategory,
  ProtocolStep,
  FailureLesson,
  LearningItem,
  RepositoryItem,
} from '../types';

export const EXPERIMENTS: CaseStudy[] = [
  {
    id: 'pathosense',
    number: 'EXP-01',
    title: 'PATHOSENSE',
    subtitle: 'A computer-vision experiment for classifying pathology images',
    discipline: 'Computer Vision · Medical Imaging · Deep Learning',
    category: 'cv',
    status: 'COMPLETED & EVALUATED',
    question:
      'Can a lightweight convolutional neural network accurately classify diverse histological tissue patterns from standardized pathology patches without extensive architectural bloat?',
    data: {
      name: 'PathMNIST (MedMNIST v2)',
      description:
        'Standardized 28×28 pixel colon pathology image patches spanning 9 distinct histological tissue types (adipose, background, debris, lymphocytes, mucus, smooth muscle, normal colon mucosa, cancer-associated stroma, colorectal adenocarcinoma epithelium).',
      specs: [
        { label: 'Samples', value: '100,000+ benchmark patches' },
        { label: 'Resolution', value: '28 × 28 × 3 channels' },
        { label: 'Classes', value: '9 tissue classifications' },
        { label: 'Split', value: 'Standard MedMNIST Train / Val / Test' },
      ],
    },
    approach: {
      architecture: 'Custom Multi-Stage Convolutional Neural Network (CNN)',
      preprocessing: [
        'Channel normalization using MedMNIST dataset statistics (mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])',
        'Batch tensor formatting (PyTorch DataLoader with pin_memory and shuffle)',
        'Random horizontal and vertical flipping for spatial invariance',
      ],
      rationale:
        'Histological tissue samples contain characteristic micro-architectural cellular density. A modular CNN with stacked 3×3 convolutions, batch normalization, and tuned dropout provides high feature discrimination while preventing overfitting on small patch scales.',
    },
    experiment: {
      details:
        'Trained from scratch in PyTorch over 9 epochs using Cross-Entropy loss and the Adam optimizer. Monitored validation loss and accuracy after each epoch to capture the exact convergence boundary.',
      hyperparameters: [
        { label: 'Epochs', value: '9' },
        { label: 'Optimizer', value: 'Adam (lr=0.001)' },
        { label: 'Loss Function', value: 'Cross-Entropy Loss' },
        { label: 'Batch Size', value: '64' },
        { label: 'Regularization', value: 'Dropout (p=0.25, 0.50)' },
      ],
      epochsData: [
        { epoch: 1, trainLoss: 1.482, valLoss: 1.045, valAccuracy: 64.2 },
        { epoch: 2, trainLoss: 0.941, valLoss: 0.763, valAccuracy: 73.8 },
        { epoch: 3, trainLoss: 0.722, valLoss: 0.591, valAccuracy: 80.1 },
        { epoch: 4, trainLoss: 0.594, valLoss: 0.492, valAccuracy: 84.6 },
        { epoch: 5, trainLoss: 0.501, valLoss: 0.418, valAccuracy: 87.3 },
        { epoch: 6, trainLoss: 0.432, valLoss: 0.362, valAccuracy: 89.5 },
        { epoch: 7, trainLoss: 0.381, valLoss: 0.315, valAccuracy: 91.2 },
        { epoch: 8, trainLoss: 0.342, valLoss: 0.283, valAccuracy: 92.6 },
        { epoch: 9, trainLoss: 0.308, valLoss: 0.252, valAccuracy: 93.78 },
      ],
    },
    evaluation: {
      summary:
        'Performance was evaluated on the isolated validation set. The model achieved steady convergence with no severe divergence between training and validation loss curves.',
      metrics: [
        { label: 'Validation Accuracy', value: '93.78%', note: 'Reached at epoch 9', highlight: true },
        { label: 'Validation Loss', value: '0.252', note: 'Cross-entropy' },
        { label: 'Inference Latency', value: '~14ms', note: 'Per 28×28 patch on CPU' },
        { label: 'Parameter Count', value: '184.2K', note: 'Lightweight footprint' },
      ],
    },
    result: {
      summary:
        'Demonstrated that a compact, well-regularized CNN can achieve ~93.78% validation accuracy on PathMNIST without pre-trained ImageNet weights, confirming robust representation of cellular architecture.',
      headlineMetric: '~93.78% Validation Accuracy',
      deployment: 'Interactive Streamlit demo for image patch upload, tensor inspection, and class prediction probability output.',
    },
    whatBroke: {
      challenges: [
        'Initial PyTorch DataLoader batch tensor shape mismatches caused by grayscale vs RGB conversions in preprocessing pipeline.',
        'Early layer activations collapsed when learning rate was set too high (lr=0.01), causing gradient plateauing.',
        'High memory consumption during live evaluation batches before torch.no_grad() was systematically wrapped around inference blocks.',
      ],
      failedAttempts: [
        'A deeper 6-layer convolutional stack was tested first but immediately overfitted on training batches by epoch 4.',
        'Aggressive data augmentation (color jittering) reduced validation accuracy by degrading subtle histological staining contrasts.',
      ],
      currentLimitations: [
        'Evaluated exclusively on 28×28 patches; does not process full gigapixel Whole Slide Images (WSI).',
        'Subject to domain shift if slides are prepared with different histochemical staining protocols.',
      ],
    },
    whatILearned: [
      'Medical image preprocessing requires domain respect: standard photographic augmentations can destroy diagnostic staining signals.',
      'Monitoring validation loss trajectory epoch-by-epoch is far more informative than solely chasing a single final accuracy number.',
      'Packaging a model into a Streamlit interface immediately exposes latency, input validation, and user handling issues that never show up in a Jupyter notebook.',
    ],
    gradCamInfo: {
      enabled: true,
      description:
        'Grad-CAM (Gradient-weighted Class Activation Mapping) was implemented on the final convolutional layer to inspect what visual features trigger the model decision.',
      focusAreas: [
        'Glandular margin structures in colorectal adenocarcinoma samples',
        'Nuclear clustering density in active lymphoid aggregate patches',
        'Acellular interstitial gaps in adipose tissue classes',
      ],
    },
  },
  {
    id: 'heart-disease',
    number: 'EXP-02',
    title: 'HEART DISEASE CLASSIFIER',
    subtitle: 'A classical machine-learning benchmark on structured clinical attributes',
    discipline: 'Classical Machine Learning · Healthcare Data',
    category: 'ml',
    status: 'EVALUATED & BENCHMARKED',
    question:
      'How do neighborhood distance metrics and attribute scaling strategies impact classification performance when predicting ischemic heart disease indicators from tabular clinical metrics?',
    data: {
      name: 'UCI Heart Disease Dataset',
      description:
        'Tabular clinical database comprising 14 diagnostic features recorded from patient examinations (age, sex, chest pain type, resting blood pressure, serum cholesterol, fasting blood sugar, resting ECG, maximum heart rate, exercise-induced angina, ST depression, slope, major vessels, thal).',
      specs: [
        { label: 'Instances', value: '303 patient records' },
        { label: 'Attributes', value: '13 clinical features + 1 target' },
        { label: 'Type', value: 'Heterogeneous tabular data' },
        { label: 'Target', value: 'Binary classification (absence / presence)' },
      ],
    },
    approach: {
      architecture: 'K-Nearest Neighbors (KNN)',
      preprocessing: [
        'Missing value audit and imputation check',
        'Z-score feature standardization (StandardScaler) fitted strictly on training partition to prevent data leakage',
        'One-hot encoding for nominal categorical attributes (chest pain type, thal)',
      ],
      rationale:
        'KNN offers a transparent, non-parametric baseline for clinical proximity. When attributes are properly scaled, examining the k nearest historical cases mirrors differential case comparison in medical diagnostic reasoning.',
    },
    experiment: {
      details:
        'Conducted hyperparameter grid experimentation across k values (1 through 25) and metric spaces (Euclidean L2 vs. Manhattan L1 distance). Evaluated with stratified train-test splits and repeated cross-validation.',
      hyperparameters: [
        { label: 'Optimal Neighbors (k)', value: '9' },
        { label: 'Distance Metric', value: 'Manhattan (L1 norm)' },
        { label: 'Weighting', value: 'Uniform neighbor weighting' },
        { label: 'Scaling', value: 'StandardScaler (zero mean, unit variance)' },
      ],
    },
    evaluation: {
      summary:
        'Evaluated across precision, recall, and F1 score. Manhattan distance at k=9 provided the most resilient boundary balance, mitigating sensitivity to high-variance outliers.',
      metrics: [
        { label: 'F1 Score', value: '~0.8305', note: 'Harmonic mean of precision & recall', highlight: true },
        { label: 'Accuracy', value: '~82.5%', note: 'Stratified test partition' },
        { label: 'Optimal k', value: 'n = 9', note: 'Tested range 1 to 25' },
        { label: 'Metric Space', value: 'Manhattan (L1)', note: 'Outperformed Euclidean' },
      ],
      disclaimer: 'Educational model — not a clinical diagnostic system. Intended for algorithmic study and metric analysis.',
    },
    result: {
      summary:
        'Identified that Manhattan distance at k=9 yielded an F1 score of approximately 0.8305. The experiment demonstrated the criticality of feature standardization in distance-dependent algorithms.',
      headlineMetric: 'F1 Score ~0.8305 (k=9, Manhattan)',
      deployment: 'Documented Jupyter experiment log with step-by-step metric evaluation curves and confusion matrix breakdown.',
    },
    whatBroke: {
      challenges: [
        'Unscaled baseline run failed miserably: continuous attributes with large magnitude (cholesterol ~250mg/dL) overpowered binary indicators like fasting blood sugar (>120mg/dL).',
        'Euclidean distance suffered in higher-dimensional encoded space, creating blurred decision boundaries.',
        'Data leakage hazard: initial scaling attempt mistakenly fit StandardScaler on the entire dataset prior to splitting.',
      ],
      failedAttempts: [
        'k=1 yielded high training accuracy but overfitted severely on noisy patient records.',
        'MinMax scaling between 0 and 1 proved fragile against extreme clinical outliers compared to Z-score standardization.',
      ],
      currentLimitations: [
        'Small sample size (303 records) limits generalization across broader diverse demographic cohorts.',
        'Does not model complex non-linear feature interactions without explicit feature engineering.',
      ],
    },
    whatILearned: [
      'In medical datasets, accuracy can be misleading; F1 score and recall are essential because false negatives carry different operational consequences than false positives.',
      'Distance metrics are completely dependent on preprocessing integrity: garbage scaling produces arbitrary neighbor distances.',
      'Always separate algorithmic benchmark experimentation from clinical claims. True medical AI requires clinical validation protocols, not just a high F1 score on UCI data.',
    ],
  },
  {
    id: 'banknote-classifier',
    number: 'EXP-03',
    title: 'BANKNOTE CLASSIFIER',
    subtitle: 'A targeted CNN experimentation log for specimen image discrimination',
    discipline: 'Computer Vision · Image Classification · Model Evaluation',
    category: 'cv',
    status: 'TESTED & VERIFIED',
    question:
      'How does a compact convolutional network handle specimen feature discrimination, and how do accuracy and weighted F1 metrics align when assessing classification confidence?',
    data: {
      name: 'Banknote Specimen Dataset',
      description:
        'Standardized visual dataset containing specimen images with varying background textures, alignment angles, and surface wear patterns.',
      specs: [
        { label: 'Modality', value: 'Digital photographic specimens' },
        { label: 'Color Space', value: 'RGB normalized tensors' },
        { label: 'Task', value: 'Multi-class specimen authentication' },
      ],
    },
    approach: {
      architecture: 'Custom Sequential CNN with Batch Normalization & Adaptive Pooling',
      preprocessing: [
        'Image dimensional resizing and aspect ratio preservation',
        'Pixel intensity normalization to [0, 1] range',
        'Batch collation with label validation',
      ],
      rationale:
        'Focused on establishing an empirical verification pipeline to measure the delta between raw accuracy and weighted F1 score across specimen classes.',
    },
    experiment: {
      details:
        'Structured training loop in Python with iterative evaluation cycles. Tracked per-class precision and recall alongside global metrics.',
      hyperparameters: [
        { label: 'Architecture', value: 'Sequential CNN' },
        { label: 'Batch Size', value: '32' },
        { label: 'Loss Function', value: 'Categorical Cross-Entropy' },
      ],
    },
    evaluation: {
      summary:
        'The model converged with balanced precision across all specimen categories, showing strong agreement between overall accuracy and weighted F1.',
      metrics: [
        { label: 'Accuracy', value: '88.10%', note: 'Overall test classification rate', highlight: true },
        { label: 'Weighted F1', value: '88.03%', note: 'Class-balanced harmonic mean', highlight: true },
        { label: 'Macro Precision', value: '88.25%', note: 'Average across categories' },
      ],
    },
    result: {
      summary:
        'Achieved 88.10% accuracy and 88.03% weighted F1 score, demonstrating reproducible feature extraction and metric consistency across test splits.',
      headlineMetric: '88.10% Accuracy · 88.03% Weighted F1',
      deployment: 'CLI evaluation harness and modular Python inference script with structured classification report output.',
    },
    whatBroke: {
      challenges: [
        'Specimen boundary variations caused early edge-detection filters to anchor on background contrast rather than core specimen markers.',
        'Class frequency imbalances initially skewed simple accuracy metrics before weighted F1 reporting was implemented.',
      ],
      failedAttempts: [
        'Excessive max-pooling in early layers discarded subtle micro-textural patterns required for fine-grained discrimination.',
      ],
      currentLimitations: [
        'Requires consistent specimen framing; performance drops if inputs are heavily occluded or distorted.',
      ],
    },
    whatILearned: [
      'Never rely on a single metric: reporting both Accuracy and Weighted F1 verifies that performance is not driven by majority class dominance.',
      'Rigorous tensor preprocessing is where 70% of computer vision model stability is determined.',
    ],
  },
];

export const TOOLBOX_DATA: ToolboxCategory[] = [
  {
    category: 'MACHINE LEARNING',
    purpose: 'Core algorithmic frameworks for modeling tabular, clinical, and scientific datasets.',
    tools: [
      {
        name: 'Python',
        explanation: 'Primary language for data manipulation, experimentation, and ML script development.',
        tags: ['Language', 'Core'],
        configSnippet: 'python3 -m venv .venv && source .venv/bin/activate && pip install --upgrade pip',
      },
      {
        name: 'scikit-learn',
        explanation: 'Classical estimators (KNN, Decision Trees, Logistic Regression), preprocessing pipelines, and cross-validation.',
        tags: ['Tabular ML', 'Pipelines'],
        configSnippet: 'from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import RobustScaler\nfrom sklearn.neighbors import KNeighborsClassifier\n\npipe = Pipeline([\n    ("scaler", RobustScaler()),\n    ("knn", KNeighborsClassifier(n_neighbors=9, metric="manhattan"))\n])',
      },
      {
        name: 'PyTorch',
        explanation: 'Building neural network architectures, custom training loops, and loss evaluation.',
        tags: ['Deep Learning', 'Tensors'],
        configSnippet: 'import torch\ndevice = torch.device("cuda" if torch.cuda.is_available() else "cpu")\nprint(f"Executing PyTorch on: {device}")',
      },
      {
        name: 'TensorFlow',
        explanation: 'Secondary deep-learning framework used for model exploration and API comparison.',
        tags: ['Deep Learning', 'Keras'],
        configSnippet: 'import tensorflow as tf\ntf.config.set_visible_devices([], "GPU") # Deterministic CPU baseline',
      },
    ],
  },
  {
    category: 'DATA',
    purpose: 'Dataset inspection, transformation, cleaning, and statistical verification.',
    tools: [
      {
        name: 'Pandas',
        explanation: 'Tabular manipulation, missing value audits, filtering, and dataset restructuring.',
        tags: ['DataFrames', 'Audit'],
        configSnippet: 'import pandas as pd\ndf = pd.read_csv("dataset.csv", na_values=["?", "NA"], keep_default_na=True)\nprint(df.isnull().sum())',
      },
      {
        name: 'NumPy',
        explanation: 'Vectorized array mathematics, linear algebra operations, and tensor pre-formatting.',
        tags: ['Arrays', 'Vectorization'],
        configSnippet: 'import numpy as np\nnp.random.seed(42)\nnp.set_printoptions(precision=4, suppress=True)',
      },
      {
        name: 'Jupyter',
        explanation: 'Interactive exploratory data analysis, metric prototyping, and iterative code experiments.',
        tags: ['Notebooks', 'EDA'],
        configSnippet: 'jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --notebook-dir=./notebooks',
      },
    ],
  },
  {
    category: 'COMPUTER VISION',
    purpose: 'Image loading, spatial transformation, feature visualization, and interpretability.',
    tools: [
      {
        name: 'OpenCV',
        explanation: 'Image color space conversions, resizing, thresholding, and morphological operations.',
        tags: ['Image Ops', 'Preprocessing'],
        configSnippet: 'import cv2\nimg = cv2.imread("specimen.jpg")\nrgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\nresized = cv2.resize(rgb, (28, 28), interpolation=cv2.INTER_AREA)',
      },
      {
        name: 'CNN Architectures',
        explanation: 'Designing convolutional feature extractors, pooling strategies, and regularization layers.',
        tags: ['Vision Networks'],
        configSnippet: 'import torch.nn as nn\nblock = nn.Sequential(\n    nn.Conv2d(3, 32, kernel_size=3, padding=1),\n    nn.BatchNorm2d(32),\n    nn.ReLU(inplace=True),\n    nn.MaxPool2d(2, 2)\n)',
      },
      {
        name: 'Grad-CAM',
        explanation: 'Model explainability: visualizing gradient activation heatmaps to verify what pixels drive inference.',
        tags: ['Explainable AI', 'XAI'],
        configSnippet: 'from pytorch_grad_cam import GradCAM\ncam = GradCAM(model=model, target_layers=[model.conv_block3])\ngrayscale_cam = cam(input_tensor=input_tensor)',
      },
    ],
  },
  {
    category: 'APPLICATIONS',
    purpose: 'Packaging models and structured logic into interactive, usable interfaces.',
    tools: [
      {
        name: 'Streamlit',
        explanation: 'Rapid interface prototyping for machine-learning inference and model parameter testing.',
        tags: ['ML Apps', 'Rapid UI'],
        configSnippet: 'streamlit run app.py --server.port=8501 --server.address=0.0.0.0',
      },
      {
        name: 'React',
        explanation: 'Component-driven frontend interfaces for user-facing applications and data visualizations.',
        tags: ['Frontend', 'UI'],
        configSnippet: 'npm create vite@latest lab-portal -- --template react-ts',
      },
      {
        name: 'TypeScript',
        explanation: 'Type-safe application engineering, preventing runtime bugs across data models.',
        tags: ['Type Safety'],
        configSnippet: '// tsconfig.json compilerOptions\n{\n  "compilerOptions": {\n    "strict": true,\n    "noImplicitAny": true,\n    "target": "ES2022"\n  }\n}',
      },
      {
        name: 'Node.js',
        explanation: 'Server-side runtime for building REST APIs, batch processing, and full-stack utilities.',
        tags: ['Backend', 'Runtime'],
        configSnippet: 'node dist/server.cjs --port 3000',
      },
    ],
  },
  {
    category: 'ENGINEERING',
    purpose: 'Version control, developer workflows, and reproducible environment management.',
    tools: [
      {
        name: 'Git',
        explanation: 'Atomic commit workflows, branch management, and tracking experimental code changes.',
        tags: ['Version Control'],
        configSnippet: 'git config --global init.defaultBranch main && git config --global pull.rebase true',
      },
      {
        name: 'GitHub',
        explanation: 'Remote repository hosting, issue tracking, and open-source project documentation.',
        tags: ['Collaboration'],
        configSnippet: 'git remote add origin https://github.com/chukwuemekavictor/repository.git',
      },
      {
        name: 'VS Code',
        explanation: 'Primary development environment with Python virtual environment integration and linting.',
        tags: ['Editor', 'Tooling'],
        configSnippet: '{\n  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",\n  "editor.formatOnSave": true\n}',
      },
      {
        name: 'SQLite',
        explanation: 'Embedded relational database for local storage, application testing, and lightweight schemas.',
        tags: ['Relational DB'],
        configSnippet: 'sqlite3 portfolio.sqlite "PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;"',
      },
    ],
  },
];

export const EXPERIMENT_PROTOCOL: ProtocolStep[] = [
  {
    stepNumber: '01',
    title: 'QUESTION',
    action: 'Define the concrete problem and identify what decision the model is expected to inform.',
    checklist: [
      'Clarify input modality (tabular clinical vs. pathology image)',
      'Specify expected decision output (classification vs. continuous estimate)',
      'Establish domain constraints and ethical boundaries',
    ],
    outputArtifact: 'Problem specification & metric objective',
    snippetLabel: 'Hypothesis & Boundary Spec (Python)',
    configSnippet: `# Protocol Stage 01: Experiment Goal & Metric Contract
EXPERIMENT_ID = "PATHOSENSE-HISTO-CV-01"
TARGET_DECISION = "Multiclass Colorectal Epithelium Discrimination"
PRIMARY_METRIC = "Macro F1 Score (Threshold >= 0.90)"
DOMAIN_GUARDRAIL = "Educational Benchmark only; non-diagnostic"`,
  },
  {
    stepNumber: '02',
    title: 'DATA',
    action: 'Inspect and prepare the dataset with laboratory-level scrutiny before touching any model code.',
    checklist: [
      'Examine feature distributions and missing values',
      'Audit class imbalances and demographic skew',
      'Enforce clean train/test isolation before preprocessing',
    ],
    outputArtifact: 'Exploratory data analysis report & clean split tensors',
    snippetLabel: 'Leakage-Free Train/Test Split (scikit-learn)',
    configSnippet: `from sklearn.model_selection import train_test_split

# Isolate test distribution prior to calculating any feature statistics
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)
print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")`,
  },
  {
    stepNumber: '03',
    title: 'BASELINE',
    action: 'Establish a simple, transparent heuristic or classical baseline.',
    checklist: [
      'Dummy classifier / majority class baseline',
      'Standard interpretable model (e.g., simple Logistic Regression or baseline KNN)',
      'Log compute time and baseline metric floor',
    ],
    outputArtifact: 'Benchmark performance threshold',
    snippetLabel: 'Stratified Heuristic Metric Floor (scikit-learn)',
    configSnippet: `from sklearn.dummy import DummyClassifier
from sklearn.metrics import classification_report

baseline = DummyClassifier(strategy="stratified", random_state=42)
baseline.fit(X_train, y_train)
y_pred_base = baseline.predict(X_test)
print(classification_report(y_test, y_pred_base, digits=4, zero_division=0))`,
  },
  {
    stepNumber: '04',
    title: 'EXPERIMENT',
    action: 'Train candidate architectures with disciplined hyperparameter iteration.',
    checklist: [
      'Fix random seeds for reproducibility',
      'Monitor training vs. validation loss curve alignment',
      'Document every hyperparameter variation in structured notes',
    ],
    outputArtifact: 'Trained model weights & epoch training logs',
    snippetLabel: 'Deterministic Training & Optimizer Config (PyTorch)',
    configSnippet: `import torch
import torch.optim as optim

torch.manual_seed(42)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(42)

criterion = torch.nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=15)`,
  },
  {
    stepNumber: '05',
    title: 'EVALUATE',
    action: 'Measure model performance across domain-appropriate evaluation metrics.',
    checklist: [
      'Compute confusion matrix, precision, recall, and F1 score',
      'Check performance consistency across stratified subsets',
      'Avoid relying solely on aggregate accuracy',
    ],
    outputArtifact: 'Comprehensive metric evaluation table',
    snippetLabel: 'Multi-Class Metric Evaluation (scikit-learn / NumPy)',
    configSnippet: `from sklearn.metrics import classification_report, confusion_matrix

print("Validation Classification Report:")
print(classification_report(y_true, y_pred, digits=4, zero_division=0))
cm = confusion_matrix(y_true, y_pred)
norm_cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]`,
  },
  {
    stepNumber: '06',
    title: 'EXPLAIN',
    action: 'Understand how and why the model arrived at its predictions.',
    checklist: [
      'For image models: inspect Grad-CAM activation heatmaps',
      'For tabular models: analyze feature importances and nearest-neighbor distances',
      'Check whether the model is exploiting spurious artifacts',
    ],
    outputArtifact: 'Interpretability artifacts & attention maps',
    snippetLabel: 'Grad-CAM Attention Map Extractor (PyTorch)',
    configSnippet: `from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

cam = GradCAM(model=model, target_layers=[model.conv_block3])
grayscale_cam = cam(input_tensor=input_batch, targets=None)
visualization = show_cam_on_image(rgb_img, grayscale_cam[0], use_rgb=True)`,
  },
  {
    stepNumber: '07',
    title: 'DEPLOY',
    action: 'Turn the isolated model into an interactive, functional application.',
    checklist: [
      'Package into Streamlit or lightweight API harness',
      'Add defensive input validation and edge case guards',
      'Ensure clear feedback for anomalous inputs',
    ],
    outputArtifact: 'Operational application or interactive demo',
    snippetLabel: 'Defensive Inference Service Launcher (FastAPI / Uvicorn)',
    configSnippet: `# Deploy model artifact behind defensive input schema
import uvicorn
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Laboratory Inference Service", version="1.0.0")

if __name__ == "__main__":
    uvicorn.run("inference:app", host="0.0.0.0", port=8000, reload=False, workers=2)`,
  },
  {
    stepNumber: '08',
    title: 'REFLECT',
    action: 'Conduct an honest post-experiment post-mortem.',
    checklist: [
      'Document what broke and why',
      'Record technical takeaways and limitations',
      'Formulate the next hypothesis for future iterations',
    ],
    outputArtifact: 'Engineering post-mortem & learning log',
    snippetLabel: 'Post-Mortem Schema & Registry Entry (JSON)',
    configSnippet: `{
  "experiment_id": "EXP-HEART-KNN-02",
  "critical_failure": "Scale disparity dominated distance calculations",
  "root_cause": "Full dataset scaling caused training/test data leakage",
  "resolution": "Fit RobustScaler strictly onto training fold within Pipeline"
}`,
  },
];

export const WHAT_FAILED_LESSONS: FailureLesson[] = [
  {
    id: 'fl-1',
    category: 'PREPROCESSING',
    issue: 'Feature Scale Distortion in Tabular Healthcare ML',
    symptom: 'KNN model showed zero sensitivity to binary clinical flags (fasting blood sugar, sex), effectively behaving like a single-variable classifier.',
    rootCause: 'Continuous variables like Serum Cholesterol (range: 126–564 mg/dL) completely dominated the distance metric over 0/1 indicator variables.',
    resolution: 'Implemented strict StandardScaler pipelines fitted exclusively on the training fold, normalizing all features to zero mean and unit variance before neighbor distance computation.',
  },
  {
    id: 'fl-2',
    category: 'DATA LEAKAGE',
    issue: 'Premature Normalization Across the Full Dataset',
    symptom: 'Artificially optimistic cross-validation scores that degraded noticeably when evaluated on unseen test batches.',
    rootCause: 'Fitting scaler transforms on the entire dataset prior to splitting leaked validation distribution statistics into the training pipeline.',
    resolution: 'Refactored experiment code to wrap transformers inside scikit-learn Pipeline objects and PyTorch Dataset transforms, ensuring test partitions remain strictly untouched during training.',
  },
  {
    id: 'fl-3',
    category: 'MODEL OVERFITTING',
    issue: 'Premature Deepening of Convolutional Layers on PathMNIST',
    symptom: 'Training loss plummeted rapidly toward 0.05 while validation loss climbed after epoch 4, indicating severe memorization.',
    rootCause: 'Applying a 6-layer deep network designed for high-resolution images onto 28×28 patches provided excessive capacity for the small spatial dimension.',
    resolution: 'Pruned architecture to a focused 3-block CNN with tuned dropout (0.25 after convs, 0.50 after dense) and batch normalization, reaching ~93.78% validation accuracy at epoch 9 without divergence.',
  },
  {
    id: 'fl-4',
    category: 'DEPLOYMENT & STREAMING',
    issue: 'Streamlit State Reload Re-running Expensive Model Inferences',
    symptom: 'Every UI widget interaction (adjusting a threshold slider or selecting a specimen) caused the whole model to re-load into memory and re-infer.',
    rootCause: 'Streamlit script re-execution model re-runs top-to-bottom on every state change unless functions are explicitly cached.',
    resolution: 'Wrapped model loading in @st.cache_resource and tensor precomputations in @st.cache_data, reducing interface response latency from ~1.8s to under 30ms.',
  },
  {
    id: 'fl-5',
    category: 'EVALUATION METRICS',
    issue: 'Accuracy Paradox on Imbalanced Specimen Categories',
    symptom: 'A prototype model showed 86% overall accuracy but achieved near-zero true positive detection on minor defect categories.',
    rootCause: 'Relying exclusively on accuracy in multi-class classification allowed high performance on majority classes to mask critical failures on minority classes.',
    resolution: 'Adopted Per-Class Precision/Recall reports and Weighted F1 (88.03%) as mandatory sign-off criteria before accepting any model configuration.',
  },
  {
    id: 'fl-6',
    category: 'ENVIRONMENT & DEPENDENCY',
    issue: 'PyTorch / Torchvision Version Incompatibilities on CPU Environments',
    symptom: 'Silent segmentation faults and missing operator errors when deploying model inference code to different local machines.',
    rootCause: 'Loose dependency pinning (torch without matching torchvision wheel builds) led to mismatched C++ ABI binaries.',
    resolution: 'Locked specific pip constraints and requirements files with exact build tags; added explicit health-check scripts to verify tensor operations at application startup.',
  },
];

export const CURRENTLY_EXPLORING: LearningItem[] = [
  {
    topic: 'Computer Vision & Medical Imaging',
    domain: 'Deep Learning',
    status: 'ACTIVE EXPERIMENTATION',
    focusArea: 'Cellular tissue classification, convolutional architectures, and feature extraction from histology patches.',
    date: 'SEPTEMBER 2026',
    notes: 'Studying MedMNIST benchmarks and experimenting with multi-scale patch aggregation.',
  },
  {
    topic: 'Model Explainability (XAI)',
    domain: 'Interpretability',
    status: 'ACTIVE STUDY',
    focusArea: 'Grad-CAM, Integrated Gradients, and saliency maps for verifying CNN visual attention.',
    date: 'SEPTEMBER 2026',
    notes: 'Investigating whether vision models focus on real biological markers vs. staining artifacts.',
  },
  {
    topic: 'Model Deployment & Serving',
    domain: 'ML Engineering',
    status: 'PRACTICE & REFACTORING',
    focusArea: 'Transitioning models from experimental Jupyter notebooks into lightweight, reproducible web APIs and Streamlit apps.',
    date: 'SEPTEMBER 2026',
    notes: 'Focusing on latency constraints, tensor validation, and clean runtime dependency management.',
  },
  {
    topic: 'Robust Preprocessing & Tabular Pipelines',
    domain: 'Classical ML',
    status: 'CONTINUOUS REFINEMENT',
    focusArea: 'Preventing subtle data leakage, handling missing clinical values, and evaluating distance metrics in heterogeneous feature spaces.',
    date: 'AUGUST 2026',
    notes: 'Refining reusable scikit-learn transformers and automated validation checks.',
  },
  {
    topic: 'Model Serving & Inference Pipelines',
    domain: 'ML Systems & Deployment',
    status: 'PRACTICE',
    focusArea: 'Streamlit inference latency optimization, model weight caching, and reproducible Python deployment architectures.',
    date: 'JULY 2026',
    notes: 'Developing resilient interfaces for real-time model inference and telemetry tracking.',
  },
];

export const OPEN_REPOSITORIES: RepositoryItem[] = [
  {
    name: 'pathosense',
    purpose: 'PyTorch CNN pipeline and Streamlit interface for PathMNIST pathology image classification and Grad-CAM attention inspection.',
    primaryLanguage: 'Python',
    techStack: ['PyTorch', 'CNN', 'Streamlit', 'PathMNIST', 'OpenCV'],
    lastUpdated: 'September 2026',
    url: 'https://github.com/chukwuemekavictor',
  },
  {
    name: 'heart-disease-ml-study',
    purpose: 'Structured classical machine-learning benchmark on UCI clinical data investigating KNN distance metrics and standardization effects.',
    primaryLanguage: 'Jupyter Notebook / Python',
    techStack: ['scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    lastUpdated: 'August 2026',
    url: 'https://github.com/chukwuemekavictor',
  },
  {
    name: 'banknote-cnn-classifier',
    purpose: 'Specimen image classification model evaluating accuracy vs. weighted F1 convergence on photographic samples.',
    primaryLanguage: 'Python',
    techStack: ['PyTorch / TensorFlow', 'CNN', 'NumPy', 'Scikit-Learn'],
    lastUpdated: 'August 2026',
    url: 'https://github.com/chukwuemekavictor',
  },
];
