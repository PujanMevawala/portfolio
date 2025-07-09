// import project1 from '../assets/images/project1.jpg';
// import project2 from '../assets/images/project2.jpg';
// import project3 from '../assets/images/project3.jpg';

export const projects = [
  {
    title: 'PaperPulse: AI-Powered Research Transformation',
    description: 'Developed an AI-powered platform leveraging LLMs and RAG to convert research papers into multi-format output, including podcasts, animated reels, videos, and PowerPoint presentations. Enhances accessibility and engagement with academic content.',
    techStack: ['Gemini Flash', 'Gemini Pro', 'PDFPlumber/Fitz', 'Manim', 'MoviePy', 'gTTS', 'python-pptx', 'Langchain'],
    image: 'https://placehold.co/400x200?text=PaperPulse',
    github: 'https://github.com/pujanmevawala/paperpulse',
    demo: 'https://paperpulse.demo',
  },
  {
    title: 'SmartFitAI: Intelligent Job Match & Prep Companion',
    description: "Built an AI-driven resume analysis tool to optimize job seekers' resumes for ATS compatibility and provide interview preparation. Features include resume assessment, tailored interview questions, improvement suggestions, and job fit scoring using multiple LLMs.",
    techStack: ['Python', 'Streamlit', 'Groq API', 'Google Generative AI API', 'PDF2Image', 'Poppler', 'Langchain', 'Plotly'],
    image: 'https://placehold.co/400x200?text=SmartFitAI',
    github: 'https://github.com/pujanmevawala/smartfitai',
    demo: 'https://smartfitai.demo',
  },
  {
    title: 'CancerScan: Diagno Cancer',
    description: 'Built a deep learning model for early detection of leukemia, lung, and colon cancer using medical imaging, dataset augmentation, and ResNet-34, achieving 97% accuracy. Assists healthcare professionals by providing automated preliminary diagnoses.',
    techStack: ['Python', 'Keras', 'ResNet-34', 'Medical Image Datasets', 'Pandas', 'Matplotlib'],
    image: 'https://placehold.co/400x200?text=CancerScan',
    github: 'https://github.com/pujanmevawala/cancerscan',
    demo: 'https://cancerscan.demo',
  },
  {
    title: 'DocUChat Pro: CrewAI, QLoRA with LLaMA 3.2',
    description: 'An AI-driven system for document-based conversations and summarization using RAG, embeddings, and FAISS, enhancing PDF text extraction by 35%. Integrated CrewAI for real-time news retrieval and applied PEFT on the LLaMA 3.2 1B model for efficient fine-tuning, reducing model size by 65%.',
    techStack: ['Python', 'Streamlit', 'LLaMA 3.2', 'PEFT', 'RAG', 'LangChain', 'FAISS', 'CrewAI'],
    image: 'https://placehold.co/400x200?text=DocUChat+Pro',
    github: 'https://github.com/pujanmevawala/docuchatpro',
    demo: 'https://docuchatpro.demo',
  },
];