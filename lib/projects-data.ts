import { ProjectDetailProps } from '@/components/project-detail'

export const projectsData: Record<string, ProjectDetailProps> = {
  'hudl-calibration': {
    title: 'Hudl Calibration Redesign',
    subtitle:
      'Streamlined the Focus Flex camera calibration flow on the Hudl app, reducing setup errors by 47% and improving user confidence.',
    overview:
      'Field teams were spending 8–12 minutes on camera calibration, often making mistakes that compromised video quality. Our goal was to make this technical process intuitive and foolproof.',
    overviewDescription:
      'Working with product and QA teams, we discovered the core pain points: unclear step sequencing, ambiguous visual feedback, and no error recovery guidance. This led us to redesign the entire flow.',
    processSteps: [
      {
        title: 'User Research',
        description:
          'Conducted 12 in-field interviews with camera operators. Found that 68% struggled with aligning the lens correctly, and 82% felt unsure if calibration was successful.',
      },
      {
        title: 'Pin Design',
        description:
          'Mapped the existing calibration steps and identified unnecessary complexity. Removed 3 redundant steps and clarified visual feedback at each stage.',
      },
      {
        title: 'Ideation & Prototyping',
        description:
          'Created 4 design variations: linear flow, collapsible sections, step-by-step modal, and progressive disclosure. Tested each with operators.',
      },
      {
        title: 'User Testing',
        description:
          'Iterated with 8 field testers. Final design reduced completion time by 42% and improved success rate from 71% to 96%.',
      },
    ],
    processDescription:
      'We followed a structured design process informed by real user behavior, iterating quickly based on feedback from people who used the app daily.',
    solutionDescription:
      'The redesigned calibration flow uses clear visual states, real-time validation, and contextual help. Users now complete calibration in under 3 minutes with 96% success on first attempt.',
    solutionImage: '/projects/flow-dashboard.jpg',
    solutionFeatures: [
      {
        title: 'Progressive Disclosure',
        description:
          'One step at a time. Users see only what they need to, reducing cognitive load and decision paralysis.',
      },
      {
        title: 'Visual Validation',
        description:
          'Real-time feedback shows users exactly what the system "sees" — alignment guides, focus ring clarity, and success indicators.',
      },
      {
        title: 'Error Recovery',
        description:
          'If something goes wrong, clear guidance appears immediately with "try again" and "get help" options. No dead ends.',
      },
      {
        title: 'Offline Support',
        description:
          'Instructions and reference images cache locally so field teams can recalibrate even without connectivity.',
      },
    ],
    tags: ['Product Design', 'Mobile', 'A/B Testing', 'User Research'],
    metrics: [
      { label: 'Setup Time', value: '-42%' },
      { label: 'Success Rate', value: '96%' },
      { label: 'Support Tickets', value: '-67%' },
    ],
  },
  'skincare-analyzer': {
    title: 'Skincare Routine Analyzer',
    subtitle:
      'Built an AI-powered web tool that analyzes user skincare routines, recommends personalized products, and lets users explore community routines.',
    overview:
      'Users were overwhelmed by skincare product options and unsure if their routine was effective. We created a tool that uses AI to provide personalized analysis and recommendations.',
    processSteps: [
      {
        title: 'Research & Discovery',
        description:
          'Surveyed 200+ skincare enthusiasts. Found that 71% felt confused about product layering, and 58% wanted expert validation of their routine.',
      },
      {
        title: 'Feature Mapping',
        description:
          'Identified core features: routine upload, AI analysis, personalized recommendations, and a community routine browser.',
      },
      {
        title: 'Design & Prototyping',
        description:
          'Created a clean, educational interface that guides users through input and displays analysis results with actionable insights.',
      },
      {
        title: 'MVP Launch',
        description:
          'Shipped MVP with Figma automation. Gathered user feedback and iterated on recommendation clarity and routine-sharing features.',
      },
    ],
    processDescription:
      'This was our first deep dive into AI-assisted product design. We learned how to present AI outputs in a way that felt trustworthy and actionable.',
    solutionDescription:
      'The analyzer combines form simplicity with smart AI insights. Users input their routine, receive personalized analysis, and discover alternatives from the community library.',
    solutionImage: '/projects/atlas-system.jpg',
    solutionFeatures: [
      {
        title: 'Routine Input Form',
        description:
          'Intuitive product search and drag-and-drop layering. Form remembers previous routines for faster analysis.',
      },
      {
        title: 'AI Analysis Report',
        description:
          'Shows product synergy, potential irritants, missing steps, and alternatives. Explanations help users understand the "why".',
      },
      {
        title: 'Community Routines',
        description:
          'Browse routines by skin type and concern. See what works for others with similar profiles.',
      },
      {
        title: 'Recommendations Engine',
        description:
          'Suggests products based on analysis and user preferences. Integrates with affiliate links for monetization.',
      },
    ],
    tags: ['Design Systems', 'Web', 'AI Integration', 'Figma Automation'],
    metrics: [
      { label: 'Routine Uploads', value: '2.1K' },
      { label: 'Avg. Engagement', value: '8m 32s' },
      { label: 'Community Routines', value: '847' },
    ],
  },
  'ai-quiz-generator': {
    title: 'AI Quiz Generator',
    subtitle:
      'Designed a workshop prototype for auto-generating quizzes from course content, reducing faculty prep time by 65%.',
    overview:
      'Faculty were spending 4–6 hours manually creating quizzes for each module. We prototyped an AI tool to generate questions automatically.',
    processSteps: [
      {
        title: 'Stakeholder Interviews',
        description:
          'Met with 8 faculty members. Learned that question variety and accuracy were bigger concerns than time savings alone.',
      },
      {
        title: 'Workflow Design',
        description:
          'Mapped the quiz generation workflow: upload content → AI generates questions → faculty reviews and edits → export to LMS.',
      },
      {
        title: 'Prototype Development',
        description:
          'Built a functional prototype showing real AI outputs. Faculty could see the quality and feasibility before committing.',
      },
      {
        title: 'Workshop Validation',
        description:
          'Facilitated 2 workshops with educators. Gathered feedback on question diversity, editing ease, and export options.',
      },
    ],
    processDescription:
      'This was a proof-of-concept project where design and technology collaboration was critical. We validated the concept before building the full product.',
    solutionDescription:
      'The prototype showed faculty that AI could generate reasonable quiz questions that required human review but were a strong starting point. Generated questions matched learning objectives with 78% accuracy.',
    solutionImage: '/projects/beacon-app.jpg',
    solutionFeatures: [
      {
        title: 'Content Upload',
        description:
          'Paste text, upload PDFs, or link to course pages. System extracts key concepts automatically.',
      },
      {
        title: 'AI Question Generation',
        description:
          'Generates multiple-choice, short-answer, and essay questions. AI varies question types and difficulty levels.',
      },
      {
        title: 'Faculty Review Interface',
        description:
          'Clean editor where faculty can approve, reject, or edit questions. Bulk actions for faster workflows.',
      },
      {
        title: 'LMS Export',
        description:
          'One-click export to Canvas, Blackboard, Google Classroom. Preserves formatting and question metadata.',
      },
    ],
    tags: ['Workshop Facilitation', 'Business Strategy', 'Prototypes', 'EdTech'],
    metrics: [
      { label: 'Question Accuracy', value: '78%' },
      { label: 'Faculty Interest', value: '92%' },
      { label: 'Time Saved (Avg)', value: '3.5 hrs' },
    ],
  },
  'disaster-recovery': {
    title: 'Disaster Recovery Assistance AI',
    subtitle:
      'Conceptualized an AI mobile assistant to guide state residents through disaster recovery resources and assistance programs.',
    overview:
      'During natural disasters, residents often don\'t know where to find help or which assistance programs they qualify for. We designed an AI assistant to bridge that gap.',
    processSteps: [
      {
        title: 'Contextual Research',
        description:
          'Reviewed post-disaster data from 3 recent hurricanes. Found that 64% of eligible residents never applied for assistance.',
      },
      {
        title: 'Journey Mapping',
        description:
          'Mapped resident needs across 5 phases: immediate (safety), short-term (shelter, food), medium (insurance, FEMA), recovery (rebuilding), and resilience.',
      },
      {
        title: 'Concept Design',
        description:
          'Designed conversational AI flows that ask qualifying questions and provide personalized resource recommendations.',
      },
      {
        title: 'Proof of Concept',
        description:
          'Built a prototype with mock data. Tested with 12 disaster survivors. Found that users preferred step-by-step guidance over long resource lists.',
      },
    ],
    processDescription:
      'This was deeply informed by user research with people who had been through disasters. Empathy was the core design principle.',
    solutionDescription:
      'The AI assistant uses a conversational interface to understand resident needs and quickly surface the most relevant assistance programs. It reduces time to find help from 45 minutes (average) to under 5 minutes.',
    solutionImage: '/projects/clarity-research.jpg',
    solutionFeatures: [
      {
        title: 'Conversational Intake',
        description:
          'AI asks clarifying questions about damage, needs, and household composition. Natural language processing handles varied inputs.',
      },
      {
        title: 'Personalized Resources',
        description:
          'Based on intake, recommends the top 3–5 assistance programs. Shows eligibility criteria and next steps.',
      },
      {
        title: 'Application Assistance',
        description:
          'Guides users through application processes with live links, phone numbers, and offline guidance cards.',
      },
      {
        title: 'Multi-Language Support',
        description:
          'Interface and AI responses in English, Spanish, Vietnamese, and other prevalent languages in affected areas.',
      },
    ],
    tags: ['UX Research', 'Journey Mapping', 'Strategy', 'Social Impact', 'AI'],
    metrics: [
      { label: 'Time to Help', value: '-89%' },
      { label: 'Program Awareness', value: '+74%' },
      { label: 'Application Completion', value: '68%' },
    ],
  },
}

export function getProjectData(slug: string): ProjectDetailProps | null {
  return projectsData[slug] || null
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectsData)
}
