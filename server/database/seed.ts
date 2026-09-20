import bcrypt from 'bcryptjs';
import { getDb, runQuery, queryOne } from './db.js';

export async function seedDatabase(force = false): Promise<void> {
  await getDb();

  // Check if already seeded
  const existingUser = await queryOne('SELECT id FROM users LIMIT 1');
  if (existingUser && !force) {
    console.log('[DB] Database already seeded. Skipping.');
    return;
  }

  console.log('[DB] Seeding database with verified laboratory records...');

  const now = new Date().toISOString();

  // 1. Admin User
  // Default login: admin / laboratory2026!
  const passwordHash = await bcrypt.hash('laboratory2026!', 10);
  await runQuery(`DELETE FROM users`);
  await runQuery(
    `INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ['usr_admin_01', 'admin', 'chukwuemekavictor726@gmail.com', passwordHash, 'admin', now, now]
  );

  // 2. Projects
  await runQuery(`DELETE FROM projects`);

  // PathoSense
  await runQuery(
    `INSERT INTO projects (
      id, slug, title, subtitle, category, description, full_description,
      problem, dataset, approach, implementation, results, limitations, lessons_learned,
      github_url, live_url, cover_image, featured, published, display_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'prj_pathosense',
      'pathosense',
      'PathoSense — Histopathology Image Classification',
      'Multi-stage Convolutional Neural Network for Colorectal Cancer Tissue Patches',
      'Computer Vision · Deep Learning · Healthcare',
      'End-to-end PyTorch CNN classifying 9 distinct colorectal histological tissue types from 100,000+ PathMNIST image patches with Grad-CAM explainability verification.',
      'PathoSense is an applied deep learning experiment designed to evaluate how standard convolutional architectures perform on clinical histopathological image patches without transfer-learning crutches.',
      'Manual microscopic inspection of colorectal tissue sections is labor-intensive and susceptible to intra-observer variability. The experiment asked: Can a compact convolutional neural network learn discriminatory cellular patterns across 9 tissue classes from 28x28 histological patches?',
      'PathMNIST (MedMNIST v2) containing 107,180 total validated 28x28 microscopy patches across 9 histological tissue types (Adipose, Background, Debris, Lymphocytes, Mucus, Smooth Muscle, Normal Colon Mucosa, Cancer-Associated Stroma, Colorectal Adenocarcinoma Epithelium). Split into 89,996 train, 10,004 val, and 7,180 test images.',
      'Designed a custom PyTorch Convolutional Neural Network with 3 convolutional blocks, batch normalization, ReLU activations, dropout regularization, and adaptive max pooling, followed by fully connected classification heads.',
      'Trained in PyTorch using CrossEntropyLoss and Adam optimizer with an initial learning rate of 1e-3 and cosine annealing schedule over 15 epochs. Built an interactive Streamlit inference workbench with uploaded image processing and Grad-CAM visualization.',
      'Achieved ~93.78% validation accuracy by epoch 9. Evaluated multi-class confusion matrices showing strongest discrimination on Adipose and Background (>98%), with minor confusion between Normal Mucosa and Stroma due to texture similarities.',
      'Trained exclusively on 28x28 image patches from MedMNIST. Not a clinical diagnostic system; cannot be used for independent patient diagnosis without clinical validation and whole-slide context.',
      'Identified the importance of gradient-weighted class activation mapping (Grad-CAM) to verify that the network focused on nuclear density rather than staining border artifacts.',
      'https://github.com/chukwuemekavictor/pathosense',
      'https://pathosense.streamlit.app',
      '/uploads/pathosense-cover.webp',
      1,
      1,
      1,
      now,
      now
    ]
  );

  // Heart Disease
  await runQuery(
    `INSERT INTO projects (
      id, slug, title, subtitle, category, description, full_description,
      problem, dataset, approach, implementation, results, limitations, lessons_learned,
      github_url, live_url, cover_image, featured, published, display_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'prj_heart_disease',
      'heart-disease',
      'Heart Disease Clinical Benchmark (KNN)',
      'Evaluating Distance-Based Estimators and Scale Sensitivity Across Tabular Clinical Features',
      'Machine Learning · Healthcare Data · Classification',
      'Controlled study of K-Nearest Neighbors across 14 tabular physiological indicators, establishing rigorous preprocessing pipelines to prevent data leakage.',
      'This study investigated how distance-based non-parametric algorithms respond to clinical laboratory features with heterogeneous units, establishing baseline performance bounds.',
      'In medical data, features span dramatically different units (e.g. serum cholesterol in mg/dL vs. ST-segment depression in mm). Without proper calibration and metric selection, distance calculations are dominated by large-scale features.',
      'UCI Heart Disease dataset containing 303 patient records across 14 clinical attributes including age, resting blood pressure, serum cholesterol, fasting blood sugar, resting ECG, and thallium stress test results.',
      'Systematic grid search evaluating k values from 1 to 25 and comparative analysis between Euclidean and Manhattan (L1) distance metrics under 5-fold stratified cross-validation.',
      'Implemented in Python with scikit-learn. Scaled numerical features using RobustScaler and StandardScaler strictly fit onto training folds to avoid test-set distribution leakage.',
      'Achieved peak validation F1 score of ~0.8305 with k=9 utilizing Manhattan distance. Manhattan distance demonstrated 4.2% higher stability against outlier variance than Euclidean distance.',
      'Educational machine-learning experiment. Not a clinical diagnostic system. Trained on a small historical dataset (n=303) and must not be used for diagnostic decision-making.',
      'Directly revealed how subtle data leakage—such as scaling the full dataset prior to train/test splitting—falsely inflates validation scores by over 6%. Strict pipeline encapsulation was mandatory.',
      'https://github.com/chukwuemekavictor/heart-disease-ml',
      '',
      '/uploads/heart-disease-cover.webp',
      1,
      1,
      2,
      now,
      now
    ]
  );

  // Banknote Classifier
  await runQuery(
    `INSERT INTO projects (
      id, slug, title, subtitle, category, description, full_description,
      problem, dataset, approach, implementation, results, limitations, lessons_learned,
      github_url, live_url, cover_image, featured, published, display_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'prj_banknote',
      'banknote-classifier',
      'Banknote Image Specimen Classifier',
      'Computer Vision Pipeline Testing Classification Alignment Under Lighting and Wear Variance',
      'Computer Vision · Deep Learning · Classification',
      'Convolutional classifier evaluating the alignment of raw classification accuracy versus weighted F1 score across real-world banknote specimens.',
      'A practical vision experiment examining how convolutional feature representations handle surface wear, micro-creases, and uneven illumination on paper currency specimens.',
      'Specimen degradation and non-uniform lighting frequently degrade classical edge detection algorithms. The goal was to build a robust vision classifier and evaluate whether accuracy reflects true class balance.',
      'Curated dataset of banknote specimens categorized by denomination and orientation under varying lighting angles and surface conditions.',
      'Built a compact Convolutional Neural Network with data augmentation (random rotations, affine shear, subtle contrast jitter) to enforce lighting and angle invariance.',
      'Constructed in Python utilizing PyTorch and OpenCV for specimen edge cropping and grayscale normalizations.',
      'Evaluated at 88.10% overall accuracy and 88.03% weighted F1 score. The close alignment between accuracy and weighted F1 proved uniform class performance without minority denomination collapse.',
      'Dataset limited to available regional specimen denominations in controlled lab lighting environments.',
      'Revealed that subtle background shadow artifacts can be learned as false class indicators if specimen cropping boundaries are not standardized during preprocessing.',
      'https://github.com/chukwuemekavictor/banknote-classifier',
      '',
      '/uploads/banknote-cover.webp',
      0,
      1,
      3,
      now,
      now
    ]
  );

  // 3. Experiments
  await runQuery(`DELETE FROM experiments`);
  const experiments = [
    {
      id: 'exp_001',
      project_id: 'prj_pathosense',
      experiment_number: 'EXP. 001',
      title: 'Convolutional Feature Representation for Colorectal Tissue (PathMNIST)',
      question: 'Can a multi-stage CNN achieve over 90% validation accuracy on 28x28 histopathological patches without pretrained weights?',
      hypothesis: 'Three convolutional blocks with batch normalization and dropout (0.25) will capture structural nuclear patterns effectively.',
      method: 'PyTorch custom CNN, Adam optimizer (lr=0.001), CosineAnnealingLR, CrossEntropyLoss.',
      model: 'Custom 3-Stage CNN',
      dataset: 'PathMNIST (107,180 patches)',
      metric: 'Validation Accuracy, Cross-Entropy Loss',
      result: '~93.78% Validation Accuracy at Epoch 9',
      status: 'Completed',
      notes: 'Peak validation accuracy reached at epoch 9 (93.78%). Subsequent epochs showed minor loss oscillation indicating slight regularization saturation.'
    },
    {
      id: 'exp_002',
      project_id: 'prj_heart_disease',
      experiment_number: 'EXP. 002',
      title: 'Distance Metric & Scale Sensitivity in Tabular Clinical ML',
      question: 'Does Manhattan distance outperform Euclidean distance when clinical laboratory features possess high variance and differing units?',
      hypothesis: 'L1 norm will be less sensitive to extreme cholesterol and blood pressure outliers.',
      method: 'Stratified 5-Fold Cross Validation comparing k=1..25 with StandardScaler and RobustScaler.',
      model: 'K-Nearest Neighbors (KNN, k=9)',
      dataset: 'UCI Heart Disease (14 features, n=303)',
      metric: 'F1 Score, Precision, Recall',
      result: 'F1 Score ≈ 0.8305 with k=9 Manhattan distance',
      status: 'Completed',
      notes: 'Manhattan distance exhibited higher F1 stability across folds (+0.042) compared to Euclidean distance.'
    },
    {
      id: 'exp_003',
      project_id: 'prj_banknote',
      experiment_number: 'EXP. 003',
      title: 'Specimen Wear & Illumination Invariance in Banknote Classification',
      question: 'How do random affine distortions and illumination transforms impact classification accuracy on degraded paper currency?',
      hypothesis: 'Contrast jitter and random cropping will prevent the CNN from memorizing crease patterns as unique features.',
      method: 'Data augmentation pipeline with OpenCV preprocessing and PyTorch image dataloaders.',
      model: 'CNN Specimen Classifier',
      dataset: 'Multi-condition Banknote Image Corpus',
      metric: 'Accuracy (88.10%), Weighted F1 (88.03%)',
      result: '88.10% Accuracy, 88.03% Weighted F1',
      status: 'Completed',
      notes: 'Confirmed strong balance across denominations without majority-class bias.'
    },
    {
      id: 'exp_004',
      project_id: 'prj_pathosense',
      experiment_number: 'EXP. 004',
      title: 'Grad-CAM Activation Map Alignment on Epithelial Structures',
      question: 'Are model predictions grounded in legitimate histological features or staining artifacts?',
      hypothesis: 'Gradients from the final conv layer will localize heavily on dense cell clusters and glandular lumen boundaries.',
      method: 'Target layer gradient extraction hooked into backward pass of PyTorch CNN.',
      model: 'PathoSense CNN + Grad-CAM',
      dataset: 'PathMNIST Test Partition',
      metric: 'Visual attention overlap with diagnostic nuclei',
      result: 'Verified ~89% overlap on diagnostic nuclear clusters',
      status: 'Completed',
      notes: 'Heatmaps confirmed high activation on hyperchromatic nuclei rather than microscope slide background borders.'
    },
    {
      id: 'exp_006',
      project_id: 'prj_pathosense',
      experiment_number: 'EXP. 006',
      title: 'Data Leakage Isolation Across Histological Slides',
      question: 'Does patch-level random splitting introduce optimistic validation bias across histological sections?',
      hypothesis: 'Splitting by whole slide origin prevents duplicate tissue context across training and validation sets.',
      method: 'Comparative evaluation between random patch splitting vs. patient/slide-level stratified partitioning.',
      model: 'Baseline CNN',
      dataset: 'Colorectal Histology Corpus',
      metric: 'Generalization Gap (Train vs. Val)',
      result: 'Identified and eliminated ~5.4% artificial validation score inflation',
      status: 'Completed',
      notes: 'Crucial lesson in laboratory protocol: always isolate biological specimens at patient level.'
    }
  ];

  for (const exp of experiments) {
    await runQuery(
      `INSERT INTO experiments (
        id, project_id, experiment_number, title, question, hypothesis, method,
        model, dataset, metric, result, status, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        exp.id, exp.project_id, exp.experiment_number, exp.title, exp.question,
        exp.hypothesis, exp.method, exp.model, exp.dataset, exp.metric,
        exp.result, exp.status, exp.notes, now, now
      ]
    );
  }

  // 4. Skills / Toolbox
  await runQuery(`DELETE FROM skills`);
  const skillsData = [
    // Machine Learning
    { name: 'Python', category: 'Machine Learning', explanation: 'Core scientific computing, dataset wrangling, and pipeline construction.', tags: ['Core', 'NumPy'], order: 1 },
    { name: 'PyTorch', category: 'Machine Learning', explanation: 'Building convolutional neural networks, custom training loops, and loss evaluation.', tags: ['Deep Learning', 'Tensors'], order: 2 },
    { name: 'scikit-learn', category: 'Machine Learning', explanation: 'Classical estimators, cross-validation, feature transformation, and evaluation metrics.', tags: ['Classifiers', 'Pipelines'], order: 3 },
    { name: 'TensorFlow', category: 'Machine Learning', explanation: 'Keras model prototyping, tensor operations, and model artifact exporting.', tags: ['Keras', 'Tensors'], order: 4 },

    // Data
    { name: 'Pandas', category: 'Data', explanation: 'Tabular data transformation, cleaning, missing-value imputation, and grouping.', tags: ['DataFrames', 'Audit'], order: 1 },
    { name: 'NumPy', category: 'Data', explanation: 'Vectorized array computations, numerical linear algebra, and tensor operations.', tags: ['Arrays', 'Math'], order: 2 },
    { name: 'Jupyter', category: 'Data', explanation: 'Iterative hypothesis testing, exploratory data analysis, and visual experiment logging.', tags: ['Notebooks', 'EDA'], order: 3 },

    // Computer Vision
    { name: 'OpenCV', category: 'Computer Vision', explanation: 'Image preprocessing, color space transformations, thresholding, and morphological operations.', tags: ['Vision', 'Filtering'], order: 1 },
    { name: 'CNNs', category: 'Computer Vision', explanation: 'Designing 2D convolutional architectures, pooling hierarchies, and spatial feature maps.', tags: ['Deep Learning', 'Vision'], order: 2 },
    { name: 'Grad-CAM', category: 'Computer Vision', explanation: 'Gradient-weighted class activation mapping to visually inspect network focus.', tags: ['Explainability', 'XAI'], order: 3 },

    // Applications
    { name: 'Streamlit', category: 'Applications', explanation: 'Deploying model inference workbenches with live input controls and visual outputs.', tags: ['Deploy', 'Prototypes'], order: 1 },
    { name: 'React', category: 'Applications', explanation: 'Constructing performant, component-driven client user interfaces with state control.', tags: ['Frontend', 'UI'], order: 2 },
    { name: 'TypeScript', category: 'Applications', explanation: 'Enforcing type safety across data contracts, application state, and API integrations.', tags: ['Types', 'Safety'], order: 3 },
    { name: 'Node.js & Express', category: 'Applications', explanation: 'Building clean REST APIs, handling authentication, file streams, and service routing.', tags: ['Backend', 'APIs'], order: 4 },

    // Engineering
    { name: 'Git & GitHub', category: 'Engineering', explanation: 'Version control, branch isolation, and transparent public commit histories.', tags: ['VCS', 'Collab'], order: 1 },
    { name: 'SQLite', category: 'Engineering', explanation: 'Lightweight relational database storage for structured metadata and offline applications.', tags: ['SQL', 'Embedded'], order: 2 },
    { name: 'VS Code', category: 'Engineering', explanation: 'Primary development workspace configured for Python, TypeScript, and terminal debugging.', tags: ['IDE', 'Tooling'], order: 3 }
  ];

  for (let i = 0; i < skillsData.length; i++) {
    const s = skillsData[i];
    await runQuery(
      `INSERT INTO skills (id, name, category, explanation, tags, display_order, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [`skl_${i + 1}`, s.name, s.category, s.explanation, JSON.stringify(s.tags), s.order, now, now]
    );
  }

  // 5. Learning Log
  await runQuery(`DELETE FROM learning_log`);
  const learningTopics = [
    {
      topic: 'Deep Learning Architectures',
      domain: 'DEEP LEARNING',
      status: 'Building',
      focusArea: 'Residual connections, attention mechanisms, and custom loss functions in PyTorch.',
      notes: 'Investigating how skip connections prevent gradient vanishing in deeper convolutional backbones applied to medical imaging.',
      date: 'SEPTEMBER 2026'
    },
    {
      topic: 'Model Explainability (XAI)',
      domain: 'EXPLAINABLE AI',
      status: 'Exploring',
      focusArea: 'Grad-CAM, Integrated Gradients, and feature attribution methods for vision models.',
      notes: 'Analyzing failure modes where vision models attend to microscopic slide staining artifacts instead of cellular nuclei.',
      date: 'SEPTEMBER 2026'
    },
    {
      topic: 'Computer Vision for Histopathology',
      domain: 'COMPUTER VISION',
      status: 'Building',
      focusArea: 'Patch extraction, stain normalization (Macenko/Vahadane), and multi-scale feature fusion.',
      notes: 'Testing color deconvolution techniques to separate hematoxylin and eosin channels before feature extraction.',
      date: 'AUGUST 2026'
    },
    {
      topic: 'Model Deployment & Serving',
      domain: 'MLOPS & DEPLOYMENT',
      status: 'Practicing',
      focusArea: 'ONNX runtime optimization, quantized weights, and low-latency API wrappers.',
      notes: 'Benchmarking latency tradeoffs between float32 PyTorch models and quantized int8 ONNX execution on resource-constrained hardware.',
      date: 'AUGUST 2026'
    },
    {
      topic: 'Rigorous Preprocessing Pipelines',
      domain: 'DATA ENGINEERING',
      status: 'Practicing',
      focusArea: 'Data leakage prevention, stratified grouped splits, and robust scaling transformations.',
      notes: 'Documenting standard operating protocols for isolating transformations strictly inside cross-validation folds.',
      date: 'JULY 2026'
    },
    {
      topic: 'Software Engineering for ML Systems',
      domain: 'SOFTWARE ENGINEERING',
      status: 'Building',
      focusArea: 'Full-stack application architecture, typed schemas, and reproducible data workflows.',
      notes: 'Structuring reproducible pipelines that connect raw databases, model endpoints, and responsive user interfaces.',
      date: 'JULY 2026'
    }
  ];

  for (let i = 0; i < learningTopics.length; i++) {
    const l = learningTopics[i];
    await runQuery(
      `INSERT INTO learning_log (id, topic, domain, status, focus_area, notes, date, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [`lrn_${i + 1}`, l.topic, l.domain, l.status, l.focusArea, l.notes, l.date, 1, now, now]
    );
  }

  // 6. Education
  await runQuery(`DELETE FROM education`);
  await runQuery(
    `INSERT INTO education (id, institution, degree, period, location, details, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'edu_01',
      'Abia State University',
      'Bachelor of Medical Laboratory Science (B.MLS) — In Progress',
      '2024 — 2029',
      'Nigeria',
      'Comprehensive clinical laboratory training covering Clinical Chemistry, Hematology, Medical Microbiology, Histopathology, Diagnostic Quality Control, and Analytical Instrumentation.',
      now,
      now
    ]
  );

  // 7. Site Settings
  await runQuery(`DELETE FROM site_settings`);
  const defaultSettings = [
    { key: 'site_title', value: 'Chukwuemeka Victor — AI/ML Engineer & Medical Laboratory Science' },
    { key: 'site_headline', value: 'I build machine-learning systems from data to decision.' },
    { key: 'contact_email', value: 'chukwuemekavictor726@gmail.com' },
    { key: 'github_url', value: 'https://github.com/chukwuemekavictor' },
    { key: 'linkedin_url', value: 'https://linkedin.com/in/chukwuemekavictor' },
    { key: 'status_label', value: 'Open to Technical Internships & Collaborations' }
  ];

  for (const s of defaultSettings) {
    await runQuery(
      `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)`,
      [s.key, s.value, now]
    );
  }

  // 8. Default Resume record
  await runQuery(`DELETE FROM resume`);
  await runQuery(
    `INSERT INTO resume (id, title, file_url, is_active, uploaded_at)
     VALUES (?, ?, ?, ?, ?)`,
    ['res_default', 'Chukwuemeka_Victor_Engineering_Profile.pdf', '/api/resume/download', 1, now]
  );

  console.log('[DB] Seeding complete! Database initialized.');
}
