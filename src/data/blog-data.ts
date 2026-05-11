export interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
  faq: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "How to Build Discipline When Motivation Fails",
    excerpt: "Motivation is a feeling, discipline is a system. Learn how to build a lifestyle that doesn't depend on how you feel.",
    category: "Self Improvement",
    author: "Dr. Elena Vance",
    authorRole: "Behavioral Psychologist",
    date: "May 10, 2026",
    readTime: "8 min read",
    slug: "build-discipline-when-motivation-fails",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Motivation is one of the most misunderstood concepts in modern productivity. We often treat it as a prerequisite for action, waiting for the "spark" before we start our work or head to the gym. But as many successful people have noted, motivation is a fickle friend.</p>
      
      <h2>The Motivation Trap</h2>
      <p>The core problem with motivation is its emotional nature. It is heavily influenced by factors outside our control: how much sleep we got, what we ate, the weather, or a random comment from a colleague. Relying on motivation means your output is as volatile as your mood.</p>
      
      <h2>Building Systems Over Feelings</h2>
      <p>Discipline, unlike motivation, is a system. It's the ability to execute on a pre-determined plan regardless of your emotional state. Here are three key strategies to build radical discipline:</p>
      
      <h3>1. Environmental Design</h3>
      <p>Don't rely on willpower. If you want to stop scrolling on your phone, put it in another room. If you want to work deeply, clear your desk of everything except the task at hand. Your environment should make the "right" choice the easiest choice.</p>
      
      <h3>2. The Two-Minute Rule</h3>
      <p>When you're starting a new habit, it should take less than two minutes to do. The goal is to master the art of showing up. Once the habit of showing up is established, you can scale it up.</p>
      
      <h3>3. Identity-Based Habits</h3>
      <p>Instead of saying "I want to write a book," say "I am a writer." When you view your actions as a reflection of your identity, discipline becomes a form of self-expression rather than a chore.</p>
    `,
    faq: [
      { question: "How long does it take to build discipline?", answer: "It varies, but research suggests it takes anywhere from 21 to 66 days for a new behavior to become automatic. The key is consistency, not intensity." },
      { question: "Is discipline the same as being hard on yourself?", answer: "No. True discipline is a form of self-love. It's choosing what you want most over what you want now." }
    ]
  },
  {
    title: "The Science of Deep Work: Mastering Concentration",
    excerpt: "Deep work is the ability to focus without distraction on a cognitively demanding task. Here's how to master it.",
    category: "Deep Work",
    author: "Marcus Thorne",
    authorRole: "Productivity Consultant",
    date: "May 08, 2026",
    readTime: "12 min read",
    slug: "science-of-deep-work",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>In our modern economy, the ability to perform deep work is becoming increasingly rare and, at the same time, increasingly valuable. Deep work allows you to master complicated information and produce better results in less time.</p>
      
      <h2>What is Deep Work?</h2>
      <p>Coined by Cal Newport, Deep Work refers to professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.</p>
      
      <h2>The Rules of Deep Work</h2>
      <p>To integrate deep work into your life, you must follow specific protocols:</p>
      
      <h3>Work Deeply</h3>
      <p>Choose a depth philosophy that fits your life. Whether it's the "monastic" approach of cutting off all distractions or the "bimodal" approach of scheduling deep work blocks, consistency is key.</p>
      
      <h3>Embrace Boredom</h3>
      <p>If every moment of potential boredom in your life is filled with a quick glance at your smartphone, your brain will likely have been rewired to a point where it is not ready for deep work, even if you set aside time for it.</p>
      
      <h3>Quit Social Media</h3>
      <p>Social media is designed to fracture your attention. To master deep work, you must be willing to walk away from tools that provide minor benefits but major distractions.</p>
    `,
    faq: [
      { question: "Can I do deep work all day?", answer: "Unlikely. Most people have a limit of about 4 hours of truly deep work per day. After that, cognitive fatigue sets in." },
      { question: "Is deep work different from 'flow'?", answer: "Deep work is a professional state that often leads to flow, but deep work requires a more structured environment and specific goals." }
    ]
  },
  {
    title: "Dopamine Detox for Students: Reclaiming Your Brain",
    excerpt: "Are you addicted to instant gratification? This step-by-step guide will help you reset your dopamine levels for better focus.",
    category: "Dopamine Detox",
    author: "Sarah Jenkins",
    authorRole: "Neuroscience Researcher",
    date: "May 05, 2026",
    readTime: "10 min read",
    slug: "dopamine-detox-for-students",
    image: "https://images.unsplash.com/photo-1516339901600-2e3a82df9fd6?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Students today are facing an unprecedented challenge: an environment engineered to hijack their attention. From infinite scroll to notification pings, the digital world is a dopamine minefield.</p>
      
      <h2>The Dopamine Feedback Loop</h2>
      <p>Dopamine is the neurotransmitter of "more." It's not just about pleasure; it's about the anticipation of reward. When we constantly seek quick hits of dopamine through social media, we desensitize our brain's receptors, making long-term goals (like studying) feel boring and impossible.</p>
      
      <h2>The 24-Hour Reset</h2>
      <p>A dopamine detox involves a period of time where you avoid all high-dopamine activities. For students, this means:</p>
      <ul>
        <li>No smartphone or social media</li>
        <li>No video games</li>
        <li>No junk food or caffeine</li>
        <li>No music or podcasts</li>
      </ul>
      <p>The goal is to allow your receptors to reset, so that simple, productive activities become rewarding again.</p>
    `,
    faq: [
      { question: "Is a dopamine detox scientifically proven?", answer: "While 'detox' is a bit of a misnomer, the concept of stimulus control and dopamine receptor down-regulation is well-supported by neuroscience." },
      { question: "Should I do it every week?", answer: "A monthly reset is usually sufficient for most people. The goal is to build long-term sustainable habits, not just temporary fixes." }
    ]
  },
  {
    title: "Why Most Productivity Systems Fail",
    excerpt: "Complexity is the enemy of execution. Learn why simple systems always win in the long run.",
    category: "Productivity",
    author: "Alex Rivers",
    authorRole: "System Architect",
    date: "May 03, 2026",
    readTime: "7 min read",
    slug: "why-most-productivity-systems-fail",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200",
    content: "<p>The productivity industry is worth billions, yet we're more overwhelmed than ever. The problem isn't a lack of tools; it's an excess of complexity.</p><h2>The Procrastivity Trap</h2><p>Spending hours setting up a complicated Notion template or a color-coded calendar is often a form of 'procrastivity'—productive-looking procrastination. If your system takes more than 10 minutes a day to maintain, it's too complex.</p>",
    faq: []
  },
  {
    title: "How to Stop Doomscrolling",
    excerpt: "Break the cycle of negative consumption and reclaim your mental space.",
    category: "Mental Clarity",
    author: "Emma White",
    authorRole: "Mindfulness Coach",
    date: "May 01, 2026",
    readTime: "6 min read",
    slug: "how-to-stop-doomscrolling",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Doomscrolling is the act of continuously scrolling through bad news, even though it's disheartening. It's a survival instinct gone wrong in the digital age.</p>",
    faq: []
  },
  {
    title: "Best Study Methods for JEE/NEET Students",
    excerpt: "Techniques used by top rankers to master vast syllabi and excel under pressure.",
    category: "Study Techniques",
    author: "Rahul Sharma",
    authorRole: "Education Strategist",
    date: "April 28, 2026",
    readTime: "15 min read",
    slug: "study-methods-jee-neet",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Competitive exams like JEE and NEET require more than just hard work; they require strategic study methods like Active Recall and Spaced Repetition.</p>",
    faq: []
  },
  {
    title: "Morning Habits That Actually Improve Focus",
    excerpt: "Forget the 4 AM cold showers. These science-backed habits are all you really need.",
    category: "Habits",
    author: "Chris Miller",
    authorRole: "Biohacker",
    date: "April 25, 2026",
    readTime: "9 min read",
    slug: "morning-habits-for-focus",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Your morning sets the tone for the day. But you don't need a 3-hour routine. Focus on light exposure, hydration, and one 'frog' to eat.</p>",
    faq: []
  },
  {
    title: "How to Beat Phone Addiction",
    excerpt: "A practical guide to breaking your phone's grip and living more in the real world.",
    category: "Habits",
    author: "Jordan Lee",
    authorRole: "Digital Wellness Advocate",
    date: "April 22, 2026",
    readTime: "11 min read",
    slug: "beat-phone-addiction",
    image: "https://images.unsplash.com/photo-1556656793-062ff98782ee?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Our phones are the most powerful tools ever created, and also the most addictive. Beating addiction starts with awareness and boundaries.</p>",
    faq: []
  },
  {
    title: "The Psychology of Delayed Gratification",
    excerpt: "Why the ability to wait is the single best predictor of long-term success.",
    category: "Self Improvement",
    author: "Dr. Elena Vance",
    authorRole: "Behavioral Psychologist",
    date: "April 19, 2026",
    readTime: "13 min read",
    slug: "psychology-of-delayed-gratification",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200",
    content: "<p>The famous marshmallow test showed that children who could wait for a second marshmallow had better life outcomes. That skill can be learned at any age.</p>",
    faq: []
  },
  {
    title: "How to Set Goals You'll Actually Achieve",
    excerpt: "Ditch the New Year's resolutions and learn the power of OKRs and anti-goals.",
    category: "Goal Setting",
    author: "Marcus Thorne",
    authorRole: "Productivity Consultant",
    date: "April 15, 2026",
    readTime: "10 min read",
    slug: "how-to-set-goals",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Most goals fail because they are too vague or too ambitious without a system. Learn how to set goals that pull you forward.</p>",
    faq: []
  },
  {
    title: "Time Management for Busy Professionals",
    excerpt: "Master the art of the 'No' and the power of delegation.",
    category: "Time Management",
    author: "Alex Rivers",
    authorRole: "System Architect",
    date: "April 12, 2026",
    readTime: "8 min read",
    slug: "time-management-professionals",
    image: "https://images.unsplash.com/photo-1454165833767-124b893049b1?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Time management isn't about doing more; it's about doing what matters. Learn to prioritize using the Eisenhower Matrix.</p>",
    faq: []
  },
  {
    title: "The Power of Periodic Reflection",
    excerpt: "Why a weekly review is the most important 30 minutes of your week.",
    category: "Self Improvement",
    author: "Emma White",
    authorRole: "Mindfulness Coach",
    date: "April 08, 2026",
    readTime: "7 min read",
    slug: "periodic-reflection",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Without reflection, we are just reacting. A weekly review allows you to step back and ensure you're still heading in the right direction.</p>",
    faq: []
  },
  {
    title: "Dopamine-Friendly Productivity for ADHD",
    excerpt: "How to work with an interest-based nervous system instead of fighting it.",
    category: "Focus",
    author: "Sarah Jenkins",
    authorRole: "Neuroscience Researcher",
    date: "April 05, 2026",
    readTime: "14 min read",
    slug: "adhd-productivity",
    image: "https://images.unsplash.com/photo-1454165833767-124b893049b1?auto=format&fit=crop&q=80&w=1200",
    content: "<p>ADHD isn't a lack of focus; it's an abundance of focus on the wrong things. Learn how to 'gamify' your work.</p>",
    faq: []
  },
  {
    title: "The Art of Saying No",
    excerpt: "How to protect your time without burning bridges.",
    category: "Time Management",
    author: "Jordan Lee",
    authorRole: "Digital Wellness Advocate",
    date: "April 01, 2026",
    readTime: "6 min read",
    slug: "art-of-saying-no",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Every time you say yes to something, you are saying no to something else. Learn the polite way to decline.</p>",
    faq: []
  },
  {
    title: "Digital Minimalism: A Starter Guide",
    excerpt: "Clear the clutter from your digital life and find peace in simplicity.",
    category: "Mental Clarity",
    author: "Chris Miller",
    authorRole: "Biohacker",
    date: "March 28, 2026",
    readTime: "11 min read",
    slug: "digital-minimalism-guide",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Your digital environment is just as important as your physical one. Learn how to declutter your apps, files, and feeds.</p>",
    faq: []
  },
  {
    title: "How to Build a Second Brain",
    excerpt: "Stop trying to remember everything and start building a system that works for you.",
    category: "Productivity",
    author: "Alex Rivers",
    authorRole: "System Architect",
    date: "March 25, 2026",
    readTime: "16 min read",
    slug: "build-second-brain",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200",
    content: "<p>A Second Brain is a personal system for knowledge management. Learn the CODE method: Capture, Organize, Distill, Express.</p>",
    faq: []
  },
  {
    title: "The Impact of Sleep on Cognitive Performance",
    excerpt: "Why pulling an all-nighter is the worst thing you can do for your goals.",
    category: "Focus",
    author: "Dr. Elena Vance",
    authorRole: "Behavioral Psychologist",
    date: "March 22, 2026",
    readTime: "9 min read",
    slug: "sleep-cognitive-performance",
    image: "https://images.unsplash.com/photo-1511295742364-917e703b5ca2?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Sleep is not a luxury; it's a cognitive necessity. Learn how sleep deprivation impacts your decision-making and memory.</p>",
    faq: []
  },
  {
    title: "Mastering Active Recall",
    excerpt: "The most effective study technique you're probably not using.",
    category: "Study Techniques",
    author: "Rahul Sharma",
    authorRole: "Education Strategist",
    date: "March 18, 2026",
    readTime: "8 min read",
    slug: "active-recall-mastery",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Reading is not studying. Testing yourself is. Learn how to use Active Recall to embed information in your long-term memory.</p>",
    faq: []
  },
  {
    title: "Creating a Distraction-Free Workspace",
    excerpt: "How to optimize your physical environment for flow state.",
    category: "Deep Work",
    author: "Marcus Thorne",
    authorRole: "Productivity Consultant",
    date: "March 15, 2026",
    readTime: "7 min read",
    slug: "distraction-free-workspace",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Your environment signals to your brain what it should be doing. Learn how to design a space that triggers deep work.</p>",
    faq: []
  },
  {
    title: "The 80/20 Rule in Personal Growth",
    excerpt: "Find the 20% of activities that bring 80% of your results.",
    category: "Self Improvement",
    author: "Emma White",
    authorRole: "Mindfulness Coach",
    date: "March 12, 2026",
    readTime: "10 min read",
    slug: "80-20-rule-growth",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1200",
    content: "<p>Pareto's Principle applies to everything. Identify the core habits that move the needle in your life.</p>",
    faq: []
  }
];
