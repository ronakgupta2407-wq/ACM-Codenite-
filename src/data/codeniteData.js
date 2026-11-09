/**
 * ACM MITS Student Chapter - CodeNite 2027
 * Centralized Event Configuration & Content Store
 * Edit all event content, dates, tracks, rules, FAQs, and links here.
 */

export const EVENT_DATA = {
  name: "CodeNite",
  edition: "2027",
  tagline: "Unleash Innovation Under the Midnight Sky",
  subTagline:
    "The flagship 12-hour overnight technical hackathon organized by ACM MITS Student Chapter. Build, break, and deploy breakthrough solutions.",
  organizer: {
    name: "ACM MITS Student Chapter",
    institute: "Madhav Institute of Technology & Science (MITS)",
    location: "Gwalior, Madhya Pradesh, India",
    est: "2014",
    acmLogo: "/acm-mits-logo.png",
  },
  dates: {
    eventDate: "17 January 2027",
    startTime: "08:00 PM IST",
    endTime: "08:00 AM IST (18 January)",
    isoTargetDate: "2027-01-17T20:00:00+05:30",
    registrationDeadline: "10 January 2027 | 11:59 PM IST",
    shortDate: "Jan 17, 2027",
  },
  venue: {
    name: "MITS Gwalior Computing & Seminar Complex",
    mode: "In-Person (On-Campus Overnight) with Hybrid Checkpoints",
    address: "Racecourse Road, Gola ka Mandir, Gwalior, MP - 474005",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.966601815332!2d78.20456177595568!3d26.230232477060163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6b38c0352ef%3A0xea8f7c9e0a0d9c4c!2sMadhav%20Institute%20of%20Technology%20%26%20Science%20(MITS)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  stats: [
    { label: "Registrations Expected", value: 1500, suffix: "+", icon: "Users" },
    { label: "Teams Competing", value: 300, suffix: "+", icon: "Flame" },
    { label: "Prize Pool", value: 150000, prefix: "₹", suffix: "+", icon: "Trophy" },
    { label: "Hours of Hacking", value: 12, suffix: " hrs", icon: "Clock" },
  ],
  chips: [
    { label: "Date", value: "17 Jan 2027", icon: "Calendar" },
    { label: "Duration", value: "12 Hours Overnight", icon: "Moon" },
    { label: "Team Size", value: "4 to 6 Members", icon: "UsersRound" },
    { label: "Registration", value: "100% Free", icon: "Sparkles" },
    { label: "Venue", value: "MITS Gwalior Campus", icon: "MapPin" },
  ],
  tracks: [
    {
      id: "ai-ml",
      title: "AI & Intelligent Systems",
      icon: "Cpu",
      badge: "Trending",
      color: "from-sky-500 to-blue-600",
      description:
        "Harness cutting-edge generative AI, computer vision, autonomous agents, and localized LLMs to solve real-world problems.",
      details:
        "Build predictive systems, agentic autonomous workflows, edge AI devices, or accessible multi-modal intelligence that empowers communities or enhances industrial efficiency.",
      sampleProblems: [
        "Autonomous multi-agent system for disaster management & route optimization.",
        "Edge-compatible Computer Vision system for real-time industrial safety alerts.",
        "Privacy-preserving localized LLM assistant for low-resource Indian languages.",
      ],
    },
    {
      id: "web3",
      title: "Web3 & Decentralized Futures",
      icon: "Boxes",
      badge: "High Prize",
      color: "from-indigo-500 to-cyan-500",
      description:
        "Architect transparent, trustless, and resilient decentralized applications, DeFi protocols, smart contracts, and identity networks.",
      details:
        "Leverage zero-knowledge proofs, layer-2 protocols, cross-chain messaging, and decentralized physical infrastructure (DePIN) to create censorship-resistant tools.",
      sampleProblems: [
        "Decentralized student credential verification using zero-knowledge rollups.",
        "Micro-insurance protocol for agricultural workers with automated weather triggers.",
        "Peer-to-peer decentralized storage and asset exchange without centralized relays.",
      ],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Zero Trust",
      icon: "ShieldAlert",
      badge: "Critical",
      color: "from-blue-600 to-indigo-700",
      description:
        "Defend cyberspace by engineering offensive-defensive security tooling, cryptographic systems, and threat mitigation platforms.",
      details:
        "Develop solutions tackling automated vulnerability scanning, ransomware resilience, phishing detection, quantum-safe cryptography, or secure container pipelines.",
      sampleProblems: [
        "Real-time eBPF-based container threat detector and dynamic intrusion prevention.",
        "Decentralized phishing and impersonation mitigation engine for messaging apps.",
        "Post-quantum cryptographic key distribution framework for distributed nodes.",
      ],
    },
    {
      id: "fintech",
      title: "FinTech & Smart Commerce",
      icon: "Coins",
      badge: "Practical",
      color: "from-teal-400 to-blue-600",
      description:
        "Transform economic accessibility through frictionless micro-payments, credit scoring, algorithmic fraud detection, and open banking.",
      details:
        "Create tools enabling financial inclusion for unbanked populations, automated auditing, merchant escrow systems, and seamless UPI-integrated workflows.",
      sampleProblems: [
        "Offline-compatible peer-to-peer verified micro-payment mesh for rural zones.",
        "AI-driven fraud detection in high-velocity banking transactions.",
        "Smart invoice discounting and escrow platform for small student enterprises.",
      ],
    },
    {
      id: "healthcare",
      title: "HealthTech & Assistive Tech",
      icon: "Activity",
      badge: "Social Impact",
      color: "from-cyan-400 to-sky-600",
      description:
        "Bridge the healthcare divide with diagnostic models, accessible hardware interfaces, emergency triage, and mental well-being tools.",
      details:
        "Develop innovative telemedicine workflows, medical imaging assistants, wearable vitals monitoring, or accessibility devices for differently-abled individuals.",
      sampleProblems: [
        "Voice & gaze-controlled browser interface for motor-impaired individuals.",
        "Lightweight retinal scan diagnostic analyzer working on basic smartphones.",
        "Automated ambulance clearance & smart hospital triage dispatch network.",
      ],
    },
    {
      id: "open-innovation",
      title: "Open Innovation & Green Tech",
      icon: "Sparkles",
      badge: "Creative",
      color: "from-blue-500 to-teal-400",
      description:
        "Have a disruptive idea outside standard tracks? Tackle sustainability, clean energy, education tech, smart cities, or civic empowerment.",
      details:
        "The open track gives you complete creative liberty to build multidisciplinary solutions that solve impactful challenges with clean software and hardware.",
      sampleProblems: [
        "Hyperlocal carbon emission tracker using open IoT sensor datasets.",
        "Gamified peer-to-peer skill-swapping platform for campus engineering students.",
        "Interactive citizen grievance tracking and smart civic resource allocator.",
      ],
    },
  ],
  timeline: [
    {
      time: "06:00 PM",
      date: "17 Jan 2027",
      title: "Check-in & Networking",
      description: "Arrival at MITS campus, kit distribution, high-speed WiFi setup, and team seating allocation.",
      icon: "DoorOpen",
    },
    {
      time: "07:00 PM",
      date: "17 Jan 2027",
      title: "Opening Ceremony & Keynote",
      description: "Welcome address by ACM MITS Chapter leaders, faculty sponsors, and unveiling of special problem challenges.",
      icon: "Flame",
    },
    {
      time: "08:00 PM",
      date: "17 Jan 2027",
      title: "Hacking Begins (T=0)",
      description: "The countdown clock starts! 12 hours of uninterrupted coding, building, and innovation.",
      icon: "Terminal",
    },
    {
      time: "11:30 PM",
      date: "17 Jan 2027",
      title: "Midnight Refreshment & Snacks",
      description: "Energy booster coffee, midnight pizza, fun mini-games, and informal mentor drop-ins.",
      icon: "Coffee",
    },
    {
      time: "02:00 AM",
      date: "18 Jan 2027",
      title: "Mentorship & Progress Evaluation",
      description: "Industry mentors and senior alumni review architecture, tech stack viability, and project trajectory.",
      icon: "Code2",
    },
    {
      time: "05:00 AM",
      date: "18 Jan 2027",
      title: "Sunrise Energy Push & Code Freeze Warning",
      description: "Final commits, polishing UI/UX, preparing slides, and preparing test demo environments.",
      icon: "Sunrise",
    },
    {
      time: "08:00 AM",
      date: "18 Jan 2027",
      title: "Code Freeze & Devpost/Repo Submission",
      description: "Strict commit deadline! GitHub repositories locked, demo videos uploaded.",
      icon: "CheckCheck",
    },
    {
      time: "09:30 AM",
      date: "18 Jan 2027",
      title: "Expo & Grand Jury Presentations",
      description: "Top selected squads present live functional demos before an esteemed panel of judges.",
      icon: "Presentation",
    },
    {
      time: "12:00 PM",
      date: "18 Jan 2027",
      title: "Valedictory & Prize Distribution",
      description: "Announcement of winners, felicitation ceremony, trophies, cash prizes, and closing photo sessions.",
      icon: "Trophy",
    },
  ],
  prizes: [
    {
      rank: "1st Runner Up",
      place: "2nd",
      title: "Second Place Champion",
      cash: "₹30,000",
      badge: "Silver Trophy",
      cardColor: "border-slate-400/40 bg-gradient-to-b from-slate-800/30 to-navy-900/60",
      accent: "text-slate-300",
      order: "order-2 md:order-1",
      height: "h-[420px]",
      perks: [
        "₹30,000 Cash Prize",
        "Official ACM Winner Trophies & Medals",
        "Direct Interview Fast-track with Sponsor Partners",
        "Exclusive Swag Packs & Premium Cloud Credits",
        "ACM Certificate of Excellence",
      ],
    },
    {
      rank: "Grand Champion",
      place: "1st",
      title: "Overall Winner",
      cash: "₹50,000",
      badge: "Gold Trophy",
      cardColor: "border-acm-cyan/60 bg-gradient-to-b from-acm-blue/30 via-navy-900/80 to-navy-950/90 shadow-glow-lg",
      accent: "text-amber-400",
      order: "order-1 md:order-2",
      height: "h-[470px]",
      isPopular: true,
      perks: [
        "₹50,000 Pure Cash Award",
        "CodeNite 2027 Grand Championship Trophy",
        "Exclusive Paid Internship / Mentorship Opportunities",
        "Featured Spotlight on ACM Global & Chapter Media",
        "Premium Mechanical Keyboards & Gadget Goodies",
        "ACM Certificate of Grand Distinction",
      ],
    },
    {
      rank: "2nd Runner Up",
      place: "3rd",
      title: "Third Place Winner",
      cash: "₹20,000",
      badge: "Bronze Trophy",
      cardColor: "border-amber-700/40 bg-gradient-to-b from-amber-950/20 to-navy-900/60",
      accent: "text-amber-500",
      order: "order-3 md:order-3",
      height: "h-[390px]",
      perks: [
        "₹20,000 Cash Prize",
        "Bronze Winner Trophies & Badges",
        "Sponsor Cloud Credits & Development Licenses",
        "ACM Swag Kits & Stickers",
        "ACM Certificate of Excellence",
      ],
    },
  ],
  specialPrizes: [
    {
      category: "Best AI/ML Innovation",
      cash: "₹15,000",
      desc: "For the most technically profound and impactful implementation of Machine Learning or Agentic AI.",
      icon: "Cpu",
    },
    {
      category: "Best Web3 & Decentralized Build",
      cash: "₹15,000",
      desc: "Awarded to the squad exhibiting superior smart contract architecture and user-friendly Web3 integration.",
      icon: "Boxes",
    },
    {
      category: "Best CyberSec & Resilience",
      cash: "₹10,000",
      desc: "Recognizing outstanding engineering in zero-trust defense, privacy preservation, or threat defense.",
      icon: "ShieldCheck",
    },
    {
      category: "Best All-Freshers Squad",
      cash: "₹10,000",
      desc: "Encouraging outstanding 1st-year engineering students building their first competitive hackathon product.",
      icon: "GraduationCap",
    },
  ],
  rules: [
    {
      id: "team-size",
      question: "What is the Team Size requirement?",
      answer:
        "Every participating team MUST consist of 4 to 6 members (4, 5, or 6 members). Individual registrations (solo), 2-person, or 3-person squads are not permitted. This ensures balanced competitive dynamics and rigorous division of engineering roles.",
      highlight: true,
    },
    {
      id: "gender-rule",
      question: "Is there any mandatory female participant requirement?",
      answer:
        "NO. A female participant is NOT compulsory. There is absolutely NO mandatory female participant quota or restriction. Teams can be formed freely with any mix of individuals (all-male, all-female, or mixed) based purely on talent, choice, and collaboration. All genders are wholeheartedly welcome to participate.",
      highlight: true,
    },
    {
      id: "eligibility",
      question: "Who is eligible to participate?",
      answer:
        "The hackathon is open to all bona fide undergraduate and postgraduate students pursuing engineering, technology, computer science, or related degrees from any recognized university across India. Cross-college and cross-branch teams are allowed.",
      highlight: false,
    },
    {
      id: "team-membership",
      question: "Can an individual be a member of multiple teams?",
      answer:
        "No. An individual can only be registered as part of ONE team. Any participant found registered under more than one squad will lead to disqualification of both involved teams.",
      highlight: false,
    },
    {
      id: "originality",
      question: "Originality and pre-built code policy",
      answer:
        "All code, design, and architecture must be built during the 12 hours of the hackathon. You may use open-source libraries, public APIs, third-party frameworks, and public AI models, but pre-coded solutions created before the start time are strictly prohibited.",
      highlight: false,
    },
    {
      id: "submission-reqs",
      question: "What are the required deliverables for final evaluation?",
      answer:
        "Teams must push their complete source code to a public GitHub repository with an informative README, commit history logged during the event, and deliver an interactive 3-minute functional demo with 2 minutes of Q&A with the jury.",
      highlight: false,
    },
    {
      id: "code-of-conduct",
      question: "ACM Code of Conduct & Fair Play",
      answer:
        "ACM MITS Student Chapter strictly upholds values of integrity, mutual respect, and academic honesty. Harassment, plagiarism, malicious attacks against hackathon infrastructure, or unsportsmanlike conduct will result in immediate expulsion.",
      highlight: false,
    },
  ],
  teamGuide: {
    title: "Choose Your Squad Blueprint",
    subtitle: "CodeNite permits squads of 4 to 6 members. Select your team formation strategy.",
    models: [
      {
        size: 4,
        badge: "Agile 4-Member Strike Team",
        tagline: "Rapid execution, lean decision making, tight-knit execution.",
        roles: [
          { role: "1x Team Leader / Fullstack Architect", desc: "Oversees system integration, core API pipelines, and deployment." },
          { role: "1x Frontend & UI/UX Specialist", desc: "Crafts polished user interfaces, animations, and user experience." },
          { role: "1x Backend & Database Engineer", desc: "Builds business logic, authentication, schemas, and endpoints." },
          { role: "1x AI/Domain Specialist or Pitch Lead", desc: "Focuses on ML models, smart contracts, pitch presentation, and demo." },
        ],
        idealFor: "Squads looking for minimal coordination overhead and high-velocity shipping.",
      },
      {
        size: 5,
        badge: "Balanced 5-Member Core Squad",
        tagline: "Optimal role balance, dedicated domain specialist, robust execution.",
        roles: [
          { role: "1x Team Leader & Fullstack Lead", desc: "Architecture roadmap, repository workflow, and integration." },
          { role: "1x Frontend & Visual Designer", desc: "Responsive UI, real-time interactivity, and component polish." },
          { role: "1x Backend & API Specialist", desc: "Database models, serverless functions, and security." },
          { role: "1x Track / AI / Web3 Domain Specialist", desc: "Model fine-tuning, smart contract engineering, or hardware logic." },
          { role: "1x QA, Pitch & Documentation Lead", desc: "Jury presentation, edge-case testing, and live demo rehearsal." },
        ],
        idealFor: "Squads wanting dedicated domain focus and polished presentation without excess overhead.",
      },
      {
        size: 6,
        badge: "Powerhouse 6-Member Enterprise Team",
        tagline: "Deep research, specialized tracks, full-coverage execution.",
        roles: [
          { role: "1x Team Leader & Product Strategist", desc: "Manages milestone tracking, GitHub repo, product roadmap, and jury pitch." },
          { role: "2x Frontend & Creative Technologists", desc: "One on core UI logic, one on animations, responsive design, and data visualizers." },
          { role: "2x Backend & Infrastructure Engineers", desc: "Handles microservices, cloud deployments, DB caching, and API security." },
          { role: "1x Core AI / Web3 / QA Testing Specialist", desc: "Trains models, smart contracts, writes test suites, and runs live staging." },
        ],
        idealFor: "Squads planning comprehensive platforms with mobile, web, and deep AI/Web3 integration.",
      },
    ],
  },
  sponsors: [
    { name: "Association for Computing Machinery", tier: "Global Partner", logoText: "ACM International" },
    { name: "GitHub", tier: "Developer Platform Partner", logoText: "GitHub Education" },
    { name: "Google Cloud", tier: "Cloud Credits Partner", logoText: "Google Cloud" },
    { name: "Polygon", tier: "Web3 Innovation Sponsor", logoText: "Polygon Labs" },
    { name: "Postman", tier: "API Tooling Partner", logoText: "Postman" },
    { name: "Devfolio", tier: "Platform Partner", logoText: "Devfolio" },
    { name: "JetBrains", tier: "Tooling Partner", logoText: "JetBrains" },
    { name: "Vercel", tier: "Deployment Partner", logoText: "Vercel" },
  ],
  team: [
    {
      name: "Dr. Manish Dixit",
      role: "Faculty Sponsor & HOD CSE",
      dept: "Dept. of Computer Science & Engineering, MITS",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      socials: { linkedin: "https://linkedin.com", email: "mailto:hodcse@mitsgwalior.in" },
    },
    {
      name: "Aryan Sharma",
      role: "Chapter Chair & Lead Organizer",
      dept: "ACM MITS Chapter",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      socials: { github: "https://github.com", linkedin: "https://linkedin.com" },
    },
    {
      name: "Sneha Patel",
      role: "Vice Chair & Event Operations",
      dept: "ACM MITS Chapter",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      socials: { github: "https://github.com", linkedin: "https://linkedin.com" },
    },
    {
      name: "Rohan Verma",
      role: "Technical Head & Platform Lead",
      dept: "ACM MITS Chapter",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      socials: { github: "https://github.com", linkedin: "https://linkedin.com" },
    },
    {
      name: "Ananya Gupta",
      role: "Design & Creative Director",
      dept: "ACM MITS Chapter",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      socials: { github: "https://github.com", linkedin: "https://linkedin.com" },
    },
    {
      name: "Vikramaditya Rao",
      role: "Public Relations & Sponsorship Lead",
      dept: "ACM MITS Chapter",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      socials: { github: "https://github.com", linkedin: "https://linkedin.com" },
    },
  ],
  faqs: [
    {
      question: "Is there any registration fee to participate in CodeNite?",
      answer:
        "No! Registration for CodeNite 2027 is 100% free of cost for all approved participants. Food, snacks, midnight refreshments, high-speed campus internet, power outlets, and swag kits are fully provided on-campus by ACM MITS.",
    },
    {
      question: "Can I register as a solo participant or what team sizes are allowed?",
      answer:
        "CodeNite allows team sizes of 4 to 6 members (4, 5, or 6 members). Solo participants, pairs, or teams of 3 are not permitted. If you need teammates, join our official WhatsApp community or reach out via Instagram / LinkedIn where we help connect squads.",
    },
    {
      question: "Is there a mandatory female member requirement in teams?",
      answer:
        "No! A female participant is NOT compulsory. There is NO mandatory gender composition requirement. Teams may consist of any combination of male, female, or non-binary participants. Diversity is encouraged, but not enforced by rule.",
    },
    {
      question: "Can students from different colleges or years form a team?",
      answer:
        "Yes, absolutely! Inter-college and inter-branch teams are completely permitted and welcomed. You can team up with fellow students across 1st to 4th year across different universities.",
    },
    {
      question: "What should participants bring to the venue?",
      answer:
        "Every participant should bring their College Student ID card, personal laptop, chargers, extension cords, any specialized hardware (if building IoT/hardware prototypes), and personal necessities for an overnight stay.",
    },
    {
      question: "Will travel allowances or accommodation be provided?",
      answer:
        "We provide comfortable resting spaces, bean bags, high-speed WiFi, hot beverages, and meals inside the MITS campus throughout the 12-hour overnight period. Outstation participants are advised to arrange their own travel.",
    },
    {
      question: "How will the projects be evaluated?",
      answer:
        "Evaluation is based on: Innovation & Originality (25%), Technical Complexity & Architecture (25%), Practical Impact & Viability (20%), Completion & Demo Polish (20%), and Presentation & Q&A (10%).",
    },
  ],
  contacts: {
    email: "acmmits@mitsgwalior.in",
    secondaryEmail: "codenite@acm-mits.org",
    phones: ["+91 98765 43210", "+91 91234 56789"],
    socials: {
      instagram: "https://www.instagram.com/acm.mits/?hl=en#",
      linkedin: "https://www.linkedin.com/company/mits-acm-student-chapter-2026-27/posts/?feedView=all",
      whatsapp: "https://chat.whatsapp.com/acm-mits-codenite",
      twitter: "https://twitter.com/acm_mits",
    },
  },
};
