import GuideLayout from "@/components/GuideLayout";
import AdSlot from "@/components/AdSlot";

export default function PomodoroGuide() {
  return (
    <GuideLayout
      title="The Pomodoro Technique: Complete Guide"
      subtitle="Master time-boxing to eliminate procrastination and dramatically increase your daily output."
      readTime="10 min read"
    >
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">What Is the Pomodoro Technique?</h2>
      <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. Named after the tomato-shaped kitchen timer he used as a university student, it has since become one of the most widely adopted productivity frameworks in the world — used by software engineers, writers, students, and executives alike.</p>
      <p>The core principle is beautifully simple: work in focused 25-minute intervals (called "Pomodoros"), separated by 5-minute breaks. After four Pomodoros, take a longer break of 15-30 minutes. That's it. No complex systems, no expensive tools, no guru-level discipline required.</p>
      <p>But beneath this simplicity lies deep psychological wisdom about how the human brain processes work, manages energy, and overcomes the inertia of procrastination.</p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Why It Works: The Psychology</h2>
      <p>The Pomodoro Technique works because it aligns with several fundamental principles of cognitive psychology:</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Parkinson's Law</h3>
      <p>"Work expands to fill the time available for its completion." Without a deadline, a task that should take 30 minutes can easily stretch to fill an entire afternoon. The 25-minute Pomodoro creates an artificial deadline that compresses work into focused bursts, preventing the time-wasting expansion that happens with open-ended schedules.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">The Zeigarnik Effect</h3>
      <p>Your brain has a built-in mechanism that keeps unfinished tasks in active memory, creating a nagging sense of incompleteness. This is why you can't stop thinking about that email you haven't sent or that project you haven't started. The Pomodoro leverages this: by starting a 25-minute timer, you create an "open loop" that your brain desperately wants to close, generating momentum that carries you through resistance.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Decision Fatigue Elimination</h3>
      <p>One of the biggest productivity killers is constantly asking yourself "what should I work on?" or "should I take a break?" The Pomodoro eliminates these decisions entirely. When the timer is running, you work. When it rings, you break. When the break ends, you work again. Zero decisions, zero willpower required.</p>

      <AdSlot format="horizontal" className="my-8" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">The Complete Pomodoro Protocol</h2>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 1: Choose Your Task</h3>
      <p>Before starting a Pomodoro, decide exactly what you'll work on. Write it down. This is critical — vague intentions like "work on the project" lead to distraction and task-switching. Be specific: "Write the introduction section of the report" or "Fix the authentication bug in the login flow."</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 2: Set the Timer for 25 Minutes</h3>
      <p>Use Ascend's Focus Timer, a physical timer, or any timer that creates a sense of urgency. The key rule: once the timer starts, you cannot stop. No checking your phone, no responding to messages, no switching tasks. If a distracting thought pops up, write it on a piece of paper and immediately return to work. This "capture and continue" technique prevents interruptions while ensuring nothing important is forgotten.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 3: Work Until the Timer Rings</h3>
      <p>Full focus. Single-task. If you finish the task before the timer ends, use the remaining time for review, improvement, or starting the next related task. Never end a Pomodoro early — you're training your brain to sustain attention for the full duration.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 4: Take a 5-Minute Break</h3>
      <p>When the timer rings, stop immediately — even if you're mid-sentence. Stand up. Walk around. Get water. Look out the window. Do NOT check social media during breaks — that triggers dopamine cascades that make it harder to re-engage with work. The break should be genuinely restful, not stimulating.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 5: Every 4 Pomodoros, Take a Long Break</h3>
      <p>After completing four 25-minute Pomodoros, take a 15-30 minute break. This is when your brain consolidates what it's learned, replenishes neurotransmitters, and prepares for the next cycle. Use this time for a meal, exercise, or genuine rest.</p>

      <AdSlot format="horizontal" className="my-8" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Advanced Pomodoro Strategies</h2>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Estimate Before You Start</h3>
      <p>Before beginning a task, estimate how many Pomodoros it will take. This builds your estimation skills over time and gives you a realistic picture of your daily capacity. Most knowledge workers can sustainably complete 8-12 Pomodoros per day — that's 3-5 hours of genuine deep work, which is far more than most people achieve.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Adjust the Duration</h3>
      <p>25 minutes is the default, but it's not sacred. If you're doing creative work that requires longer immersion, try 50-minute Pomodoros with 10-minute breaks. If you're struggling with procrastination, start with 15-minute Pomodoros to lower the barrier. The principle matters more than the specific number.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Track and Review</h3>
      <p>At the end of each day, review your Pomodoro count. How many did you complete? Which tasks took more Pomodoros than expected? Where did interruptions occur? This data reveals patterns that help you optimize your schedule, improve your estimates, and identify recurring distractions.</p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Common Mistakes to Avoid</h2>
      <ul className="list-disc pl-6 space-y-2 text-[#a1a1aa]">
        <li><strong className="text-white">Skipping breaks</strong> — The breaks aren't optional. They're when your brain processes and consolidates. Skipping them leads to diminishing returns and burnout.</li>
        <li><strong className="text-white">Using breaks for social media</strong> — Scrolling Instagram during your break overstimulates your dopamine system, making the next Pomodoro feel agonizingly boring by comparison.</li>
        <li><strong className="text-white">Multi-tasking during Pomodoros</strong> — The entire point is single-task focus. If you catch yourself switching tasks, stop, refocus, and continue.</li>
        <li><strong className="text-white">Not planning ahead</strong> — Starting a Pomodoro without knowing what you'll work on wastes the first 5 minutes figuring it out. Always decide before you start the timer.</li>
        <li><strong className="text-white">Being too rigid</strong> — If you're in a genuine flow state and the timer rings, it's okay to extend. The technique serves you — not the other way around.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Start Your First Pomodoro Now</h2>
      <p>The beauty of the Pomodoro Technique is that you can start right now, with zero preparation. Open Ascend's Focus Timer. Set it for 25 minutes. Pick one task. Press start. That's it — you're already more productive than 90% of people who read about productivity but never act on it.</p>
    </GuideLayout>
  );
}
