import GuideLayout from "@/components/GuideLayout";
import AdSlot from "@/components/AdSlot";

export default function DigitalMinimalismGuide() {
  return (
    <GuideLayout
      title="Digital Minimalism & Defeating Distractions"
      subtitle="Reclaim your attention from social media, notifications, and the attention economy."
      readTime="11 min read"
    >
      <h2 className="text-xl font-semibold text-white mt-8 mb-3">The Attention Crisis</h2>
      <p>The average person checks their phone 96 times per day — once every 10 minutes of waking life. The average screen time across all devices is 7 hours and 4 minutes daily. That's 49 hours per week, over 2,500 hours per year. If you spent even half of that time on deliberate skill-building, you could become world-class at almost anything.</p>
      <p>But it's not your fault. You're fighting against the most sophisticated persuasion technology ever created. Every major tech platform employs teams of behavioral psychologists, neuroscientists, and AI engineers whose sole job is to maximize the time you spend on their platform. They exploit the same dopamine pathways that drive gambling addiction — variable rewards, social validation, and infinite scroll.</p>
      <p>Cal Newport's concept of Digital Minimalism offers an alternative: a philosophy of technology use where you focus your online time on activities that strongly support your values, and happily miss out on everything else.</p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">The True Cost of Distraction</h2>
      <p>Distraction isn't just about wasted time. The real damage is cognitive:</p>
      <ul className="list-disc pl-6 space-y-2 text-[#a1a1aa]">
        <li><strong className="text-white">Attention Residue</strong> — Research by Sophie Leroy at the University of Minnesota found that when you switch from Task A to Task B, a significant residue of your attention remains stuck on Task A. This means you're performing Task B with a fragmented brain. The more you switch, the worse your performance becomes on every task.</li>
        <li><strong className="text-white">Reduced IQ</strong> — A study at the University of London found that multitasking with digital devices reduced participants' IQ by an average of 10 points — equivalent to missing a night of sleep or being under the influence of marijuana.</li>
        <li><strong className="text-white">Anxiety and Depression</strong> — Social media use is strongly correlated with increased rates of anxiety, depression, and loneliness, particularly among young adults. The comparison trap, FOMO, and constant stimulation dysregulate your nervous system.</li>
        <li><strong className="text-white">Destroyed Attention Span</strong> — Microsoft's widely cited study found that the average human attention span has dropped from 12 seconds in 2000 to 8 seconds in 2015. While the methodology is debated, the trend is undeniable: our ability to sustain attention is deteriorating.</li>
      </ul>

      <AdSlot format="horizontal" className="my-8" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">The Digital Declutter Process</h2>
      <p>Cal Newport recommends a 30-day digital declutter as the starting point for digital minimalism. Here's how to do it:</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 1: Define Your Technology Rules (Day 0)</h3>
      <p>List every optional technology in your life — social media, streaming services, news sites, games, messaging apps. For each one, decide: is this essential for my work or does it directly support something I deeply value? If no, it gets removed for 30 days. If it's essential for work (like Slack), create strict rules: "I will check Slack at 9 AM, 12 PM, and 4 PM only."</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 2: The 30-Day Reset</h3>
      <p>Delete all non-essential apps from your phone. Log out of social media on your computer. Use website blockers like Freedom or Cold Turkey to enforce your rules. The first 3-5 days will feel uncomfortable — this is withdrawal, and it's normal. Your brain has been conditioned to expect constant stimulation.</p>
      <p>During these 30 days, rediscover offline activities: reading, exercising, having face-to-face conversations, working on hobbies, going for walks, cooking, building things with your hands. You'll be shocked at how much time you suddenly have and how much calmer you feel.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Step 3: Reintroduce with Intention (Day 31+)</h3>
      <p>After 30 days, slowly reintroduce technologies — but only if they pass a strict test: Does this technology directly support something I deeply value? Is it the best way to support this value? Can I constrain my use with specific rules?</p>
      <p>For example, you might decide: "I value staying connected with close friends. Instagram supports this but only if I use the DM feature. I will check Instagram DMs on Sunday evenings for 15 minutes. I will not browse the feed or stories." This is intentional use — radically different from mindless scrolling.</p>

      <AdSlot format="horizontal" className="my-8" />

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Practical Anti-Distraction Systems</h2>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">The Phone Stack</h3>
      <p>Configure your phone for focus, not entertainment. Remove all social media apps. Turn off all notifications except calls and messages from specific contacts. Use grayscale mode (Settings → Accessibility → Color Filters) to make your phone less visually appealing. Move all remaining apps off your home screen into folders.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">The Workspace Fortress</h3>
      <p>Your workspace should be optimized for one thing: deep work. No TV in the room. Phone in another room or in a timed lockbox. Browser with only work-related tabs. A physical notepad next to your keyboard for capturing stray thoughts without switching contexts. Noise-canceling headphones or ambient sound (use Ascend's Focus Sounds).</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">Batched Communication</h3>
      <p>Email and messaging are not emergencies. Check them 2-3 times per day at predetermined times. Use autoresponders if needed: "I check email at 10 AM and 3 PM. If urgent, call me." Most people adapt to your schedule quickly, and you'll find that very few things are actually urgent.</p>

      <h3 className="text-base font-semibold text-white mt-6 mb-2">The Boredom Practice</h3>
      <p>This might be the most important technique: deliberately practice being bored. Wait in line without your phone. Sit in a waiting room with nothing to do. Walk without earbuds. Your brain interprets boredom as a signal to go deeper — it starts generating ideas, solving problems, and making creative connections. Every time you reach for your phone to escape boredom, you're robbing yourself of this process.</p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">The Attention Diet</h2>
      <p>Just as you're careful about what food you put in your body, you should be careful about what information you put in your mind. Here's a framework:</p>
      <ul className="list-disc pl-6 space-y-2 text-[#a1a1aa]">
        <li><strong className="text-white">Eliminate news consumption</strong> — 99% of news is irrelevant to your life and designed to trigger fear and outrage. If something is truly important, you'll hear about it through conversations.</li>
        <li><strong className="text-white">Curate ruthlessly</strong> — Unfollow everyone who doesn't educate, inspire, or genuinely make you happy. Your feed should be a garden, not a landfill.</li>
        <li><strong className="text-white">Choose depth over breadth</strong> — Read one excellent book instead of skimming 50 articles. Listen to one in-depth podcast instead of endless short clips. Deep understanding compounds; surface-level consumption evaporates.</li>
        <li><strong className="text-white">Create more than you consume</strong> — The ultimate antidote to mindless consumption is creation. Write, build, draw, code, compose. Producers live fundamentally different lives than consumers.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Your Digital Minimalism Action Plan</h2>
      <p>You don't need to go full monk overnight. Start with these three actions today:</p>
      <ol className="list-decimal pl-6 space-y-2 text-[#a1a1aa]">
        <li><strong className="text-white">Turn off all non-essential notifications right now.</strong> Go to your phone settings and disable notifications for everything except calls and direct messages from real humans.</li>
        <li><strong className="text-white">Delete one social media app.</strong> Choose the one you waste the most time on. Delete it for one week. You can always reinstall it — but you probably won't want to.</li>
        <li><strong className="text-white">Create a phone-free zone.</strong> Pick one space (your bedroom, your desk, the dinner table) where phones are never allowed. Experience what it feels like to exist without a screen within arm's reach.</li>
      </ol>
      <p>The goal isn't to hate technology — it's to use it intentionally. Technology is a powerful tool when you control it. It becomes a prison when it controls you. Ascend is designed with this philosophy: it gives you the tools you need without the dopamine traps that steal your focus.</p>
    </GuideLayout>
  );
}
