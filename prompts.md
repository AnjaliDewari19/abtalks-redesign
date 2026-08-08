# AI Prompting Strategy & Workflow
## Project: ABTalks 60-Day Challenge Platform Redesign

---

## 🤖 AI Tools Used

| Tool | Role |
|---|---|
| **Antigravity (Google DeepMind)** | End-to-end development — UI design, component architecture, CSS system, state management, routing, debugging |
| **ChatGPT (OpenAI GPT-4o)** | Brainstorming feature ideas, writing student-facing copy, testimonials, and task descriptions |

---

## 💬 How We Prompted the AI

Rather than writing code manually, we used a prompt-first development workflow.
Every feature, layout decision, and edge case was communicated to the AI through
natural language instructions. Below is a realistic summary of the prompting approach we followed.

---

### Phase 1 — Understanding the Problem

We started by feeding the AI the full competition brief and asking it to plan before touching any code:

> *"Read this brief carefully. Before you write anything, tell me your full plan —
> the tech stack, the routes, how you'll handle edge cases like a broken streak or
> an empty new user profile, and what thoughtful features you'd add beyond the
> minimum. Only start building once I approve."*

The AI outlined a React + Vite stack, proposed three mock user personas for testing
edge cases, and suggested the LinkedIn Copilot and Streak Repair features before a
single line of code was written.

---

### Phase 2 — Design System First

We directed the AI to establish the visual language before building any pages:

> *"Build the CSS design system first. I want a premium dark mode — think deep space,
> neon purple accents, glassmorphic cards. Use Google Fonts, HSL-calibrated colors,
> and smooth micro-animations. Make it feel like a product a student would actually
> be proud to use at 1am."*

This produced a full token-based CSS system with custom properties, keyframe
animations, and mobile-first responsive breakpoints targeting 390px viewports.

---

### Phase 3 — Page-by-Page Building

We built one route at a time, describing intent rather than implementation:

> *"Now build the landing page. A student who has never heard of ABTalks should
> land here and immediately understand the challenge, trust it, and want to join.
> Show real stats, show how it works in simple steps, and add testimonials from
> Indian college students who got placed."*

> *"Now the dashboard. This is where a student lives for 60 days. Give them their
> streak front and center — make it feel like it's alive. Add a visual grid showing
> all 60 days, a leaderboard so they can see where they rank, and badges they can
> unlock. Handle the case where someone is brand new and has nothing yet."*

> *"Now the challenge day page. A student opens this late at night, reads the task,
> pastes their GitHub link and LinkedIn link, hits submit and feels good. Add a
> confetti effect when they submit. Also handle the case where they missed the
> previous day and their streak is broken — show them a way to fix it."*

---

### Phase 4 — Thoughtful Feature Requests

Once the core was done, we pushed for ideas that go beyond the brief:

> *"Add a LinkedIn Copilot. Students hate writing posts every single day. When they
> open the challenge page, auto-generate a professional LinkedIn post summarizing
> what they built today. Let them copy it with one click."*

> *"Add a day and night theme toggle. Students use this late at night. Give them a
> black and white contrast option so it's easier on their eyes."*

> *"Add an interactive panel at the bottom for judges. They should be able to switch
> between three student profiles instantly — a brand new user, a consistent coder on
> day 12, and someone who just missed a day — without logging in or touching code."*

---

### Phase 5 — Review & Polish

We did a final pass asking the AI to self-review against the brief:

> *"Check everything against the original problem statement. Is every required
> feature present? Are all three edge cases handled? Does the mobile view look
> good at 390px? Tell me what's missing and what you'd improve."*

The AI confirmed all deliverables, verified the build compiled cleanly, and
suggested the final UX improvements that were implemented.

---

## 🧠 Key Prompting Principles We Followed

- **Plan before build** — always asked for a full plan before any code was written
- **Describe intent, not implementation** — told the AI what the user should feel,
  not which components to create
- **Edge cases upfront** — named all three edge case scenarios early so the AI
  designed for them from the start
- **One route at a time** — avoided building everything at once to keep quality high
- **Self-review loop** — asked the AI to audit its own output against the brief
  before considering anything done