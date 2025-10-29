"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  ClipboardList,
  TrendingUp,
  Play,
  Sparkles,
  Zap,
  Download,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import opportunityConverterImg from "@/assets/images/opportunity_converter.png";
import ioOcImg from "@/assets/images/io_oc.png";
import reOcImg from "@/assets/images/re_oc.png";
import pitchOcImg from "@/assets/images/pitch_oc.png";
import opportunityConverterOverviewVideo from "@/assets/videos/opportunity_converter/Opportunity Converter - Overview.mp4";
import opportunityConverterIdentifyVideo from "@/assets/videos/opportunity_converter/opportunity-converter _identify-opportunities.mp4";
import opportunityConverterReEngageVideo from "@/assets/videos/opportunity_converter/Opportunity Converter - Re-Engage.mp4";
import opportunityConverterPitchVideo from "@/assets/videos/opportunity_converter/opportunity-converter_pitch.mp4";
import opportunityConverterDocx from "@/assets/files/Opportunity Converter _ New Business Growth Engine.docx";
import opportunityConverterXlsx from "@/assets/files/Opportunity Converter.xlsx";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { Footer } from "@/components/shared/Footer";

type PlaybookSection = {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  content: React.ReactNode;
};

type VideoData = {
  title: string;
  duration: string;
  description: string;
  image: string;
};

const videoDataByStage: Record<string, VideoData> = {
  overview: {
    title: "Opportunity Converter Framework ",
    duration: "1:58",
    description: "It's simple... get quick wins!",
    image: opportunityConverterImg,
  },
  diagnose: {
    title: "Identify  Opportunities + Premium Problem ",
    duration: "3:41",
    description: "Find low-hanging wins & re-engage these opportunities",
    image: ioOcImg,
  },
  design: {
    title: "Re-Engage",
    duration: "6:06",
    description: "Text, call, or email & book a 30-45 minute pitch meeting",
    image: reOcImg,
  },
  activate: {
    title: "Pitch",
    duration: "10:30",
    description: "Pitch the new strategy & secure the best deal on the market",
    image: pitchOcImg,
  },
};

const playbookSections: PlaybookSection[] = [
  {
    id: "overview",
    title: "Opportunity Converter Framework",
    summary: "Three steps to get quick wins!",
    icon: Sparkles,
    accent: "from-cyan-500 via-blue-500 to-sky-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          The idea behind the Opportunity Converter is simple — get quick wins.
          Take the current deals sitting in your pipeline, convert them into a Pitch Meeting, and ask for the BOR. The entire goal is to get your existing opportunities to buy into the new strategy you've invested in which will ultimately help them get the best deal in the market.
        </p>
        <p>
          You're going to be completely open and transparent with the prospect about the shift you've made:
          how you now see the industry, the insurance buying process, and the opportunity they have to get the best deal on the market by following this system — whether they do it with you or without you.
        </p>
      </div>
    ),
  },
  {
    id: "diagnose",
    title: "Step 1 · Identify  Opportunities + Premium Problem",
    summary: "Identify any current opportunities you’re actively working on",
    icon: ClipboardList,
    accent: "from-emerald-400 via-teal-500 to-emerald-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Start by identifying any current opportunities you're actively working on.
        </p>
        <p className="font-semibold">
          These are deals where:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>You've met with the prospect within the last 30 days.</li>
          <li>The opportunity is expected to close in the next 30–90 days.</li>
          <li>The deal is still open — not won, not lost.</li>
          <li>The prospect may have stalled, delayed, or gone quiet.</li>
        </ul>
        <p>
          These are your low-hanging wins. We're going to re-engage these opportunities first.
        </p>
        <p>
          Use the attached spreadsheet to create your list.
        </p>
        <p>
          Once you have identified the opportunities you are going to identify their premium problem. You are looking to find how they talked about premium and what they are looking to accomplish.
        </p>
        <p className="font-semibold">
          Ask yourself:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>What did they say about insurance or premium?</li>
          <li>What's their biggest challenge?</li>
          <li>What are they trying to accomplish?</li>
          <li>Why did they reach out in the first place?</li>
        </ul>
        <p>
          In almost every case, it ties back to premium.
        </p>
        <p>
          If they didn't say something specific — like "I want to save money" or "I want the best deal" — write down what they did say. We'll dig deeper and clarify it later when you reconnect.
        </p>
      </div>
    ),
  },
  {
    id: "design",
    title: "Step 2 · Re-Engage",
    summary: "Identify, re-engage & book",
    icon: Target,
    accent: "from-purple-500 via-indigo-500 to-purple-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Now that you've identified your open opportunities, it's time to re-engage them. Reach out the same way you've been communicating with them — text, call, or email. The objective here is simple: confirm their premium problem and book a 30-45 minute pitch meeting.
        </p>
        <p className="font-semibold">
          Confirm the Premium Problem
        </p>
        <p>
          We want to confirm what they originally said was important to them — usually something around premium. If they already told you what that was, repeat it back and confirm it. If they didn't, help them name it.
        </p>
        <p className="font-semibold">
          Sample Script — You already know their problem:
        </p>
        <p className="italic">
          "Hey John, I know your top priority was getting the best deal on your premium — I just want to confirm that's still accurate?"
        </p>
        <p className="italic">
          (John: "Yep, absolutely.")
        </p>
        <p className="font-semibold">
          Sample Script — You don't know their problem yet:
        </p>
        <p className="italic">
          "Hey John, I know you mentioned shopping the market. I'm assuming that's because you want to make sure you're getting the best deal out there, right?"
        </p>
        <p className="italic">
          (John: "Yeah, exactly.")
        </p>
        <p className="font-semibold">
          Be Transparent & Take Ownership
        </p>
        <p>
          Take ownership and be transparent around what has changed. You've evolved. You've invested. You've found a better way. That transparency is what re-engages them.
        </p>
        <p className="font-semibold">
          Sample Script:
        </p>
        <p className="italic">
          "I got tired of clients not getting the results they wanted so I invested in learning a new strategy helping people get the best deal in the market. It's completely game changing and you can use it with or without me."
        </p>
        <p className="font-semibold">
          Ask for the Meeting
        </p>
        <p>
          Once you've confirmed their problem and shared your shift, it's time to book the meeting.
        </p>
        <p className="italic">
          "What works best for a quick 30-minute call? I'll walk you through exactly how this strategy works so you can get the best deal on your renewal. Tomorrow at 10 or Thursday at 10 work better for you?"
        </p>
      </div>
    ),
  },
  {
    id: "activate",
    title: "Step 3 · Pitch ",
    summary: "Pitch the new strategy, it's simple",
    icon: TrendingUp,
    accent: "from-amber-400 via-orange-500 to-amber-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Now that you're in the pitch meeting, the goal is simple: pitch the new strategy. You'll follow the full Pitch Meeting Framework or The One Call BOR Framework, but remember what this meeting is really about:
        </p>
        <p>
          You're getting the prospect to buy into a new strategy — a smarter, faster way to secure the best deal on the market.
        </p>
        <p>
          You're helping them see why they should:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Work with one broker instead of multiple</li>
          <li>Use the BOR as a tool to negotiate the best outcome.</li>
        </ul>
        <p>
          Once they buy into that mindset, asking for the BOR becomes the natural next step.
        </p>
        <p className="font-semibold">
          The Command Framework
        </p>
        <p>
          Because you've already been working on this deal, you'll need to open the meeting differently — with ownership and transparency. You're replacing the standard Command section in the pitch framework with this version:
        </p>
        <p className="italic">
          "John, I really appreciate you taking the meeting. I've got a framework built out for this so we can walk through it together and make sure you get the exact strategy to secure the best deal on the market.
        </p>
        <p className="italic">
          I've invested in learning a new strategy to negotiate the best deal in the market and I'll walk you through how you can go out and execute it, and at the end, if it makes sense for me to help you implement it, we'll talk through what that looks like. Sound good?"
        </p>
        <p>
          That's your new Command Framework for re-engaged opportunities. It sets the tone: confident, honest, and professional.
        </p>
        <p className="font-semibold">
          Prepare for Their Response
        </p>
        <p>
          At the end of the pitch, you're going to ask for the BOR. When you do, one of three things will happen. Have these decisions made before the meeting so you're not making emotional calls on the fly.
        </p>
        <p className="font-semibold">
          1 - Yes
        </p>
        <p>
          Great — move forward immediately. Have the BOR ready to sign in the meeting or send it through DocuSign right after.
        </p>
        <p className="font-semibold">
          2 - No
        </p>
        <p>
          Be ready ahead of time. Decide now: Are you willing to quote, or are you walking away?
        </p>
        <p>
          If you're walking away, do it cleanly:
        </p>
        <p className="italic">
          "Totally understand. I don't believe quoting is in your best interest, so I'll bow out here. If you ever decide you want to run this strategy, I'll be here to help."
        </p>
        <p>
          If you're still willing to quote, frame it clearly as the exception — not the rule.
        </p>
        <p className="font-semibold">
          3 - Maybe
        </p>
        <p>
          They need more time or want to "think about it." You respond calmly:
        </p>
        <p className="italic">
          "I get it — I'm dropping a lot on you. Here's another way we could run it this year. We can sign a BOR for the rest of the marketplace so I can take over those carriers. You'll lose a little leverage short-term, but it's still better than the quote-and-hope game."
        </p>
        <p className="font-semibold">
          Signed BOR Client Prep
        </p>
        <p>
          Once they sign the BOR, you need to prep them for what happens next.
        </p>
        <p className="italic">
          "Great — once we sign this, the carriers are required to notify your current broker. There are three ways you can handle that."
        </p>
        <p className="font-semibold">
          1 - Let the carrier notify them automatically.
        </p>
        <p>
          That's fine — just expect a call from your broker.
        </p>
        <p className="font-semibold">
          2 - Reach out directly (email or call).
        </p>
        <p>
          This is the recommended option. It keeps you in control.
        </p>
        <p className="font-semibold">
          3 - Have me reach out for you.
        </p>
        <p>
          Totally fine if you prefer — I can handle that conversation.
        </p>
        <p>
          We want them to pick Option 2 — to take ownership and proactively reach out.
        </p>
        <p className="font-semibold">
          Prepare Them For The Broker Conversation
        </p>
        <p>
          Explain that the incumbent broker will respond in one of two ways:
        </p>
        <p className="font-semibold">
          Professional Broker Response:
        </p>
        <p className="italic">
          "I completely understand. I'm disappointed to lose your business, but I respect your decision. I'll make the transition smooth — I'll send over your policies, loss runs, and any applications within 24–48 hours."
        </p>
        <p className="font-semibold">
          Unprofessional Broker Response:
        </p>
        <p className="italic">
          "This is unethical. You're stealing my work. We've done so much for you. You can't move now."
        </p>
        <p>
          They'll guilt-trip, make excuses, and refuse to cooperate.
        </p>
        <p>
          Either way, you win. If the broker handles it well — great, easy transition. If not — it only reinforces that you made the right move.
        </p>
        <p className="font-semibold">
          The Pitch Meeting
        </p>
        <p>
          The goal here isn't to deliver a perfect presentation. It's to re-engage the prospect and walk them through the conversation as best you can — focused entirely on solving their problem.
        </p>
        <p>
          You don't need to memorize every line or follow the script word-for-word. You just need to communicate two things clearly:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>There's a better way to buy insurance.</li>
          <li>You understand their specific problem and can help them fix it.</li>
        </ul>
        <p>
          Before you run the meeting, watch the Pitch Meeting Framework and the Call the BOR Framework videos. Those will help you see how to structure the flow and language.
        </p>
        <p>
          When you're in the meeting, use what you've learned — but don't overthink it. Keep it conversational, use their words, and focus on showing them a better strategy to get what they actually want.
        </p>
      </div>
    ),
  },
  {
    id: "resources",
    title: "Resources",
    summary: "Download templates and worksheets",
    icon: Download,
    accent: "from-purple-400 via-violet-500 to-purple-600",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Download these resources to help you implement the Opportunity Converter framework.
        </p>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Opportunity Converter - New Business Growth Engine
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  DOCX • Template
                </p>
              </div>
            </div>
            <a
              href={opportunityConverterDocx}
              download="Opportunity Converter _ New Business Growth Engine.docx"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group-hover:scale-110"
            >
              <Download className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Opportunity Converter
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  XLSX • Worksheet
                </p>
              </div>
            </div>
            <a
              href={opportunityConverterXlsx}
              download="Opportunity Converter.xlsx"
              className="p-3 rounded-xl bg-white dark:bg-slate-900 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-300 group-hover:scale-110"
            >
              <Download className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    ),
  },
];

export const OpportunityConverterPage = () => {
  const [workspaceSidebarOpen, setWorkspaceSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(playbookSections[0].id);

  React.useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < 1280;
      setIsMobile(small);
      if (small) {
        setWorkspaceSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentVideoData =
    videoDataByStage[activeSection] ?? videoDataByStage[playbookSections[0].id];

  const handleNextPhase = React.useCallback(() => {
    const currentIndex = playbookSections.findIndex((section) => section.id === activeSection);

    // If we're on the last step (Step 3 - activate), navigate to Prospect Reactivator
    if (activeSection === "activate") {
      window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "network" } }));
      return;
    }

    const nextIndex = (currentIndex + 1) % playbookSections.length;
    setActiveSection(playbookSections[nextIndex].id);
  }, [activeSection]);

  const getNextPhaseLabel = React.useCallback(() => {
    // If we're on Step 3, next stage is Prospect Reactivator
    if (activeSection === "activate") {
      return "Prospect Reactivator";
    }

    const currentIndex = playbookSections.findIndex((section) => section.id === activeSection);
    const nextIndex = (currentIndex + 1) % playbookSections.length;
    const nextSection = playbookSections[nextIndex];

    if (nextSection.id === "overview") return "Overview";
    if (nextSection.id === "diagnose") return "Step 1";
    if (nextSection.id === "design") return "Step 2";
    if (nextSection.id === "activate") return "Step 3";
    return "Next";
  }, [activeSection]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <LeftSidebar activePage="opportunities" />

      <motion.div className="flex flex-1 overflow-hidden min-w-0 ml-0 lg:ml-[72px]">
        {!isMobile && (
          <motion.aside
            initial={false}
            animate={{ width: workspaceSidebarOpen ? 360 : 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`hidden xl:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5 ${
              workspaceSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Opportunity Converter
              </p>
            </div>
            <div className="px-6 py-5 space-y-5 overflow-y-auto">
              <div className="space-y-3">
                {playbookSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition w-full ${
                        isActive
                          ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                          : "border-slate-200 dark:border-slate-800 hover:border-cyan-200/80"
                      }`}
                    >
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${section.accent} text-white flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-sm font-semibold">{section.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{section.summary}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-slate-900 p-6">
            <div className="relative flex items-center mb-4">
              <div className="absolute left-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setWorkspaceSidebarOpen((prev) => !prev)}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0 hidden xl:block"
                  aria-label="Toggle navigator"
                >
                  {workspaceSidebarOpen ? (
                    <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                  )}
                </button>
                <div className="h-full w-px bg-slate-200 dark:bg-slate-800" />
                <button
                  type="button"
                  onClick={handleNextPhase}
                  className="px-4 py-2.5 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0"
                  aria-label="Go to next stage"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-700 dark:group-hover:text-cyan-400">
                    Next Stage
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md">
                      {getNextPhaseLabel()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </button>
              </div>
              <div className="w-full text-center">
                <motion.div initial={{
                  scale: 0.8,
                  opacity: 0
                }} animate={{
                  scale: 1,
                  opacity: 1
                }} transition={{
                  duration: 0.5,
                  delay: 0.2
                }} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
                  <Zap className="w-4 h-4" />
                  <span>New Business Growth Engine</span>
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    OPPORTUNITY
                  </span>{' '}
                  <span>CONVERTER</span>
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1600px] mx-auto py-8 px-6 lg:py-10 lg:px-12 2xl:px-16">
              <div className="space-y-8">
                {activeSection !== "resources" && (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5 overflow-hidden"
                  >
                    {activeSection === "overview" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={opportunityConverterOverviewVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : activeSection === "diagnose" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={opportunityConverterIdentifyVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : activeSection === "design" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={opportunityConverterReEngageVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : activeSection === "activate" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={opportunityConverterPitchVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-slate-900 group cursor-pointer">
                        <img
                          src={currentVideoData.image}
                          alt={currentVideoData.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                          <div className="text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                              <Play className="w-10 h-10 text-white ml-1" />
                            </div>
                            <div className="text-white">
                              <p className="text-lg font-semibold">{currentVideoData.title}</p>
                              <p className="text-sm text-white/70">{currentVideoData.duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6 space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-500">
                        Converter Spotlight
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {currentVideoData.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentVideoData.description}
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-6">
                  {playbookSections
                    .filter((section) => section.id === activeSection)
                    .map((section) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5 p-8 space-y-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${section.accent} text-white`}>
                            <section.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-500">
                              Converter Step
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {section.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {section.summary}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-6">{section.content}</div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default OpportunityConverterPage;
