/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LedgerItem {
  component: string;
  category: string;
  application: string;
}

export interface BlueprintNode {
  id: string;
  name: string;
  type: 'core' | 'node' | 'interface' | 'bus';
  x: number;
  y: number;
  latency?: string;
}

export interface BlueprintConnection {
  from: string;
  to: string;
  label: string;
  pulseSpeed?: number;
}

export interface BlueprintData {
  title: string;
  nodes: BlueprintNode[];
  connections: BlueprintConnection[];
  gridSize: number;
}

export interface ProjectDossier {
  id: string;
  dossierNo: string;
  title: string;
  subtitle: string;
  date: string;
  classification: 'CLASSIFIED' | 'RESTRICTED' | 'UNRESTRICTED' | 'SOVEREIGN REGISTER';
  abstract: string;
  ledger: LedgerItem[];
  narrative: {
    intent: string;
    designMotivation: string;
    significance: string;
  };
  capabilities: {
    title: string;
    observation: string;
    tag: string;
  }[];
  blueprint: BlueprintData;
  stamps: string[];
}

export const projectDossiers: ProjectDossier[] = [
  {
    id: "ARC_CLNSLT",
    dossierNo: "001",
    title: "CleanSlate",
    subtitle: "SECURE DATA ERASURE & SUSTAINABLE HARDWARE RECLAMATION PLATFORM",
    date: "Nov 2025 - Feb 2026",
    classification: "SOVEREIGN REGISTER",
    abstract: "Designed and developed a secure data erasure platform for permanent removal of sensitive information from electronic devices. The platform enables safe refurbishment, recycling, and reuse of electronic hardware while ensuring complete privacy protection through certified data destruction and blockchain-backed auditability.",
    ledger: [
      { component: "Secure Wipe Engine using Rust", category: "Eradication Core", application: "Block-level physical storage overwriting in C/Rust" },
      { component: "Slint UI", category: "Local Interface", application: "Microsecond desktop wipe interface" },
      { component: "Smart Contract", category: "Audit Ledger", application: "Solidity verified blockchain proof recording" },
      { component: "Django", category: "BACKEND API", application: "Automating tracking workflows, payment integration, and microservices" }
    ],
    narrative: {
      intent: "To design a secure, irreversible data-wiping solution that ensures complete data privacy while enabling the safe recycling, refurbishment, and reuse of electronic devices.",
      designMotivation: "Standard data destruction processes are difficult to audit. Recording cryptographic receipts of erasure directly on-chain makes hardware decommissioning fully transparent and unalterable.",
      significance: "Promotes certified hardware refurbishment under NIST SP 800-88 guidelines, preventing toxic electronic wastage while maintaining rigorous cyber defenses."
    },
    capabilities: [
      { title: "PERMANENT DATA ERASURE", observation: "Ensures complete privacy protection through certified low-level mechanical data destruction blocks.", tag: "CYBERSECURITY" },
      { title: "BLOCKCHAIN AUDITABILITY", observation: "Deploys Solidity smart contracts to compile immutable digital erasure receipts.", tag: "BLOCKCHAIN" },
      { title: "DEVICE LIFECYCLE RECLAMATION", observation: "Facilitates circular electronics recycling workflows by certifying components as fully sanitized.", tag: "SUSTAINABILITY" }
    ],
    blueprint: {
      title: "CleanSlate COLD WIPING & BLOCKCHAIN CERTIFICATION BLUEPRINT",
      gridSize: 40,
      nodes: [
        { id: "slint_ui", name: "RUST SLINT GUI", type: "interface", x: 70, y: 150 },
        { id: "rust_core", name: "C/RUST DESTRUCTION ENGINE", type: "core", x: 200, y: 150, latency: "0.1ms" },
        { id: "django_hub", name: "DJANGO COMPLIANCE REPO", type: "node", x: 200, y: 50 },
        { id: "evm_register", name: "SOLIDITY ETHEREUM RECORD", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "slint_ui", to: "rust_core", label: "Transmit Command", pulseSpeed: 10 },
        { from: "rust_core", to: "django_hub", label: "Wipe Progress logs", pulseSpeed: 8 },
        { from: "django_hub", to: "evm_register", label: "Registry Erasure Audit", pulseSpeed: 14 }
      ]
    },
    stamps: ["VERIFIED_ERASURE", "NIST_800_88", "SECURE_CIRCULAR"]
  },
  {
    id: "ARC_BLAP",
    dossierNo: "002",
    title: "BLAP",
    subtitle: "BUSINESS LIFESTYLE ADVANCEMENT & VOICE-ENABLED EMAIL GATEWAY",
    date: "Dec 2024 - Jan 2025",
    classification: "RESTRICTED",
    abstract: "Developed a voice-enabled email automation platform allowing users to send emails through voice commands and listen to incoming emails through speech output. The system integrates speech systems, localized LLM assistance, and secure email relay conduits to improve digital accessibility and mobile productivity.",
    ledger: [
      { component: "Gemma 2B ", category: "LLM", application: "Localized language model parsing target directives on device" },
      { component: "Google TTS", category: "Acoustic Layer", application: "Google Text-to-Speech and Speech-to-Text integration" },
      { component: "Kotlin Interface", category: "Vocal UI", application: "Jetpack Compose responsive dashboard with Material styles" },
      { component: "Flask ", category: "BACKEND API", application: "Flask backend relaying mails over Railway hosting service" }
    ],
    narrative: {
      intent: "To develop a completely hands-free email orchestrator enabling eyes-free client use and visually impaired accessibility.",
      designMotivation: "Standard email interfaces heavily rely on precise touch gestures. BLAP replaces gestural mechanics with intuitive vocal templates and AI summarizers.",
      significance: "Merges on-device models with voice translation runtimes to deliver fully autonomous, secure mobile operations."
    },
    capabilities: [
      { title: "SPEECH COHERENCE LOOP", observation: "Utilizes high-resolution acoustic speech recognition to draft complex text briefs dynamically.", tag: "ACCESSIBILITY" },
      { title: "LOCALIZED LLM REASONING", observation: "Processes text sequences using compact Gemma 2B boundaries, drawing structured email variables locally.", tag: "AI_ML" },
      { title: "RAILWAY HOSTED BACKEND", observation: "Relays mail payload variables using Flask SMTP engines connected safely to active cloud servers.", tag: "AUTOMATION" }
    ],
    blueprint: {
      title: "BLAP VOCAL DICTATION & RELAY PIPELINE",
      gridSize: 40,
      nodes: [
        { id: "compose_app", name: "JETPACK COMPOSE APP", type: "interface", x: 70, y: 150 },
        { id: "gemma_edge", name: "LOCAL GEMMA 2B RUNTIME", type: "core", x: 200, y: 150, latency: "115ms" },
        { id: "flask_relay", name: "FLASK RAILWAY ROUTER", type: "node", x: 200, y: 250 },
        { id: "mail_relays", name: "SMTP SERVICE CONNECT", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "compose_app", to: "gemma_edge", label: "Vocal Command Flow", pulseSpeed: 12 },
        { from: "gemma_edge", to: "flask_relay", label: "Draft Mail JSON", pulseSpeed: 9 },
        { from: "flask_relay", to: "mail_relays", label: "Transmit POP3/SMTP", pulseSpeed: 16 }
      ]
    },
    stamps: ["ACCESSIBLE_TECH", "LOCAL_INFERENCE", "DYNAMIC_SPEECH"]
  },
  {
    id: "ARC_SCSCRPE",
    dossierNo: "003",
    title: "SocioScrape",
    subtitle: "DATA INTELLIGENCE & SOCIAL PATTERN OBSERVATORY",
    date: "Aet. 2024",
    classification: "CLASSIFIED",
    abstract: "Designed and developed a social media monitoring and intelligence platform for the National Investigation Agency Smart India Hackathon problem statement. The platform collects publicly available information, performs automated monitoring, and transforms data into actionable intelligence.",
    ledger: [
      { component: "Selenium", category: "AUTOMATION", application: "Automated browser crawls tracking open public profiles" },
      { component: "FastAPI ", category: "BACKEND API", application: "Handling active stream collection limits and REST APIs" },
      { component: "TinyLlama Classifier", category: "Edge AI", application: "Automated classification of threat categories and communication intent" },
      { component: "Ionic JS", category: "UI", application: "Cross-platform interface showcasing alert coordinates" }
    ],
    narrative: {
      intent: "To automate threat detection, risk tracking, and open-source intelligence analysis for enforcement agencies.",
      designMotivation: "Manual checks of various media accounts takes valuable investigator time. SocioScrape automates the process and provides structured graphs.",
      significance: "Won column selection at the Smart India Hackathon 2024 college level, demonstrating high utility in processing unstructured open text streams."
    },
    capabilities: [
      { title: "ADB SCREEN INTEGRATORS", observation: "Drives remote Android sessions and browser automation using selenium-driven protocols.", tag: "AUTOMATION" },
      { title: "EDGE SECTOR INTERFACING", observation: "Extracts risk variables by piping public texts through lightweight TinyLlama instances.", tag: "AI_ML" },
      { title: "ALERT REPORT CREATORS", observation: "Compiles disparate social alerts into interactive network data lists for easy tracing.", tag: "OSINT" }
    ],
    blueprint: {
      title: "SocioScrape THREAT COMPILATION PIPELINE",
      gridSize: 40,
      nodes: [
        { id: "scrapers", name: "SELENIUM/ADB CRADLES", type: "interface", x: 70, y: 110 },
        { id: "fastapi_api", name: "FASTAPI INGEST HOST", type: "core", x: 200, y: 150, latency: "4.2ms" },
        { id: "tinyllama_ai", name: "TINYLLAMA EXCLUDE CORES", type: "node", x: 200, y: 260 },
        { id: "ionic_panel", name: "IONIC ANALYST MONITOR", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "scrapers", to: "fastapi_api", label: "Feed Live Text Streams", pulseSpeed: 15 },
        { from: "fastapi_api", to: "tinyllama_ai", label: "Analyze Categories", pulseSpeed: 11 },
        { from: "tinyllama_ai", to: "fastapi_api", label: "Return Risk Scores", pulseSpeed: 10 },
        { from: "fastapi_api", to: "ionic_panel", label: "Distribute Analytics", pulseSpeed: 18 }
      ]
    },
    stamps: ["SIH_NUCLEUS", "CLASSIFIED_INTEL", "OSINT_VERIFIED"]
  },
  {
    id: "ARC_AUTOCI",
    dossierNo: "004",
    title: "AutoCI",
    subtitle: "AUTONOMIC DEVOPS WORKFLOW PIPELINE & CONTAINER SCHEDULER",
    date: "Aet. 2026",
    classification: "UNRESTRICTED",
    abstract: "Developed a CI automation platform that streamlines software build and testing workflows through Jenkins integration and containerized execution. The platform provides both a command-line interface and web-based monitoring capabilities for pipeline execution and analytics.",
    ledger: [
      { component: "Jenkins", category: "Orchestrator", application: "Managing job triggers, compilation parameters, and rollback stages" },
      { component: "Docker Engine API", category: "Sandbox Layer", application: "Isolating workspace dependencies natively in isolated execution nodes" },
      { component: "CLI Python Client", category: "User Interface", application: "Rapid terminal execution control, pipeline query execution" },
      { component: "Web Dashboard", category: "Metric Console", application: "Rendering compilation status and container health charts" }
    ],
    narrative: {
      intent: "To streamline code compilations and eliminate configuration drift during high-performance pipeline evaluations.",
      designMotivation: "Legacy testing environments suffer from persistent dependency pollution. AutoCI forces total build predictability via isolated Docker filesystems, producing clean test outputs.",
      significance: "Provides immediate visual charts indicating server build speeds, error ratios, and pipeline memory utilization."
    },
    capabilities: [
      { title: "CONTAINERIZED EXECUTIONS", observation: "Binds Docker Swarms to isolate workspace dependencies natively in clean execution spaces.", tag: "DEVOPS" },
      { title: "CLI DEV INTERFACES", observation: "Speeds up diagnostic checks via lightweight Python console tools that query build runs.", tag: "DEVELOPER" },
      { title: "PIPELINE OBSERVERS", observation: "Produces detailed analytical graphs indicating test pass-rates, error frequencies, and build speeds.", tag: "SYSTEMS" }
    ],
    blueprint: {
      title: "AutoCI INTEGRITY CONNECTIONS SCHEMATIC",
      gridSize: 40,
      nodes: [
        { id: "python_cli", name: "PYTHON TERM CLIENT", type: "interface", x: 70, y: 150 },
        { id: "jenkins_eng", name: "JENKINS CENTRAL HUB", type: "core", x: 200, y: 150, latency: "25ms" },
        { id: "docker_cli", name: "DOCKER SANDBOX HOST", type: "node", x: 200, y: 50 },
        { id: "monitor_ui", name: "WEB METRIC DASHBOARD", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "python_cli", to: "jenkins_eng", label: "Trigger Safe Pipeline", pulseSpeed: 11 },
        { from: "jenkins_eng", to: "docker_cli", label: "Spawn Isolated Sandbox", pulseSpeed: 15 },
        { from: "docker_cli", to: "jenkins_eng", label: "Stream Execution Logs", pulseSpeed: 8 },
        { from: "jenkins_eng", to: "monitor_ui", label: "Update Alert Dashboards", pulseSpeed: 17 }
      ]
    },
    stamps: ["FAST_COMPILING", "CONTAINER_SAFETY", "AUTOMATED_CI"]
  },
  {
    id: "ARC_PVTVOT",
    dossierNo: "005",
    title: "Private Voting System",
    subtitle: "DECENTRALIZED COMMIT-REVEAL CONSENSUS & GOVERNANCE LEDGER",
    date: "Aet. 2024",
    classification: "SOVEREIGN REGISTER",
    abstract: "A privacy-preserving voting platform utilizing a commit-reveal mechanism to ensure vote secrecy, fairness, tamper resistance, and verifiable election results for private governance and decision-making processes.",
    ledger: [
      { component: "Solidity Contracts", category: "Audit Consensus", application: "EVM contract managing security steps, commit-reveal phases" },
      { component: "Flask Web3 Bridge", category: "Blockchain Proxy", application: "Connecting client requests with transaction blocks" },
      { component: "Hardhat Testbed", category: "Compiler", application: "Simulating voter flows, compiling contract rules" },
      { component: "Governance Portal", category: "Client Interface", application: "Enabling secret ballot preparation, cryptographic sealing, and receipt audits" }
    ],
    narrative: {
      intent: "To design a secure voting matrix completely protected from third-party tamper vectors for community governance.",
      designMotivation: "Standard electronic systems are easily modified by system hosts. Ethereum-backed commit-reveal mechanics keep active choices secure.",
      significance: "Provides reliable election outcomes. Once entries are written on the blockchain, no human, node, or administrator can alter the voting logs."
    },
    capabilities: [
      { title: "COMMIT-REVEAL SECURE", observation: "Ensures complete election fairness by masking live ballots under secure hashed keys until validation.", tag: "BLOCKCHAIN" },
      { title: "GAS EFFICIENCY CHECKS", observation: "Deploys verified, lightweight Solidity loops to strictly minimize Ethereum gas overhead.", tag: "CYBERSECURITY" },
      { title: "END-TO-END AUDITING", observation: "Generates tamper-proof cryptographic receipt tags so voters can verify their inputs mathematically.", tag: "INTEGRITY" }
    ],
    blueprint: {
      title: "Private Voting TRANSACTION CONNECTIONS",
      gridSize: 40,
      nodes: [
        { id: "client_portal", name: "GOVERNANCE WEB PORTAL", type: "interface", x: 70, y: 150 },
        { id: "flask_gateway", name: "FLASK WEB3 CONTROLLER", type: "core", x: 200, y: 150, latency: "14ms" },
        { id: "hardhat_env", name: "HARDHAT TESTING RIG", type: "node", x: 200, y: 250 },
        { id: "eth_blockchain", name: "SOLIDITY ETH REPOSITORY", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "client_portal", to: "flask_gateway", label: "Transmit Secure Commit", pulseSpeed: 13 },
        { from: "flask_gateway", to: "hardhat_env", label: "Perform Security Checks", pulseSpeed: 10 },
        { from: "flask_gateway", to: "eth_blockchain", label: "Commit Blockchain State", pulseSpeed: 18 }
      ]
    },
    stamps: ["EVM_VALIDATED", "ZERO_TRUST_VOTE", "COMMIT_REVEAL_SECURE"]
  },
  {
    id: "ARC_QNTMCHN",
    dossierNo: "006",
    title: "Quantum-Enhanced Secure Blockchain Demo",
    subtitle: "QUANTUM CRYPTOGRAPHY & ENHANCED BLOCKS CONSOLE",
    date: "Aet. 2025",
    classification: "CLASSIFIED",
    abstract: "A cryptographic demonstration platform showcasing quantum-generated randomness integrated with modern encryption techniques and blockchain-inspired secure data workflows. Uses true simulated physical thermodynamic quantum noise to strengthen AES key derivation loops.",
    ledger: [
      { component: "Qiskit Simulator", category: "Physical Sim Node", application: "Modelling quantum qubit superposition arrays with Qiskit Aer" },
      { component: "HKDF Deriver", category: "Entropy Expander", application: "Symmetric key stretching via SHA-256 HMAC derivation" },
      { component: "AES Payload Engine", category: "Symmetric Cipher", application: "Automatic 256-bit block sealing for target document files" },
      { component: "Flask Visualizer", category: "Display Host", application: "Generating live entropy dashboards and telemetry timelines" }
    ],
    narrative: {
      intent: "To showcase the integration of simulated quantum-generated randomness with traditional asymmetric or symmetric cryptography systems.",
      designMotivation: "Standard algorithmic random generators are fundamentally mathematical and pseudo-random. Quantum randomness provides authentic physical entropy.",
      significance: "Establishes a hybrid blueprint layout demonstrating Qiskit qubit alignment states mapped directly into safe AES-256 HKDF targets."
    },
    capabilities: [
      { title: "QUANTUM ENTROPY", observation: "Harnesses simulated physical QPU qubit structures to source authentic random seeds.", tag: "QUANTUM" },
      { title: "AES DATA PROTECTION", observation: "Ensures complete document protection using robust symmetric ciphers supported by HKDF metrics.", tag: "CYBERSECURITY" },
      { title: "ENTROPY DIAGRAMS", observation: "Plots real-time entropy frequencies to mathematically verify key uniqueness against physical parameters.", tag: "CRYPTOGRAPHY" }
    ],
    blueprint: {
      title: "Quantum Blockchain ENTROPY GENERATION SCHEME",
      gridSize: 40,
      nodes: [
        { id: "qiskit_qpu", name: "QISKIT SIMULATED QPU", type: "interface", x: 70, y: 110 },
        { id: "hkdf_rig", name: "HKDF PROCESSOR", type: "core", x: 200, y: 150, latency: "0.5ms" },
        { id: "aes_module", name: "AES-256 CIPHER CORES", type: "node", x: 200, y: 260 },
        { id: "flask_node", name: "FLASK GRAPH PLATFORM", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "qiskit_qpu", to: "hkdf_rig", label: "Seed Quantum Entropy", pulseSpeed: 15 },
        { from: "hkdf_rig", to: "aes_module", label: "Derive Target Key", pulseSpeed: 9 },
        { from: "aes_module", to: "flask_node", label: "Render Active Block Graph", pulseSpeed: 17 }
      ]
    },
    stamps: ["QUANTUM_SAFE", "ENTROPY_AUDITED", "AES_256_STAMP"]
  },
  {
    id: "ARC_LLMCLS",
    dossierNo: "007",
    title: "LLM-Based Smart News Classifier",
    subtitle: "NLP TAXONOMY ENGINE & FEEDBACK LOOP",
    date: "Aet. 2024",
    classification: "UNRESTRICTED",
    abstract: "Developed an intelligent news classification system that categorizes news articles using a lightweight language model and incorporates active learning workflows to continuously improve model performance through feedback-driven fine-tuning.",
    ledger: [
      { component: "Gemma 2B Module", category: "Edge Classifier", application: "Localized language model digesting raw article text categories" },
      { component: "Active Learning Loop", category: "Audit Engine", application: "Storing expert correction overrides to append pipeline datasets" },
      { component: "Streamlit Interface", category: "User Screen", application: "Enabling quick article review cycles, taxonomy evaluations, and overrides" },
      { component: "Gemini SDK Connect", category: "Cloud Validator", application: "Google GenAI platform resolving low-confidence classifications" }
    ],
    narrative: {
      intent: "To engineer a text classification engine that continuously learns from human feedback, reducing model decay in active streaming scenarios.",
      designMotivation: "Pre-trained models fall behind as current event cycles shift. Active-learning captures manual tagging corrections to refresh models at low compute costs.",
      significance: "Demonstrates practical integration of private edge models with rich cloud APIs (Gemini) to ensure affordable, highly accurate content taxonomy databases."
    },
    capabilities: [
      { title: "ACTIVE FEEDBACK CYCLES", observation: "Appends manual corrections straight into active training caches to facilitate dynamic model updating.", tag: "AI_ML" },
      { title: "AFFORDABLE LOCAL RUNS", observation: "Operates model boundary assessments locally, avoiding cloud compute costs.", tag: "OPTIMIZATION" },
      { title: "GEMINI API INTEGRATOR", observation: "Uses Google GenAI SDK parameters to evaluate semantic similarities and validate categories.", tag: "AI_ML" }
    ],
    blueprint: {
      title: "LLM News CATEGORIZER CLOUD ACTIVE BLUEPRINT",
      gridSize: 40,
      nodes: [
        { id: "streamlit_ui", name: "STREAMLIT AUDIT FRONT", type: "interface", x: 70, y: 150 },
        { id: "gemma_local", name: "LOCAL GEMMA 2B RUNTIME", type: "core", x: 200, y: 150, latency: "210ms" },
        { id: "gemini_apis", name: "GEMINI CLOUD AGENT (SDK)", type: "node", x: 200, y: 50 },
        { id: "ag_news_cache", name: "ACTIVE FEEDBACK REGISTER", type: "bus", x: 340, y: 150 }
      ],
      connections: [
        { from: "streamlit_ui", to: "gemma_local", label: "Stream RAW Documents", pulseSpeed: 10 },
        { from: "gemma_local", to: "gemini_apis", label: "Assess Low Confidence", pulseSpeed: 13 },
        { from: "streamlit_ui", to: "ag_news_cache", label: "Override Misclassified Labels", pulseSpeed: 8 },
        { from: "ag_news_cache", to: "gemma_local", label: "Perform Model Tuning", pulseSpeed: 16 }
      ]
    },
    stamps: ["ACTIVE_LEARNING", "AG_NEWS_CORPUS", "GEMINI_BRIDGED"]
  }
];
