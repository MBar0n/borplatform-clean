"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  MessageSquare,
  Sparkles,
  Search,
  RefreshCcw,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import prospectReactivatorImg from "@/assets/images/prospect_reactivator.png";
import ippPrImg from "@/assets/images/ipp_pr.png";
import rePrImg from "@/assets/images/re_pr.png";
import picPrImg from "@/assets/images/pic_pr.png";
import prospectReactivatorOverviewVideo from "@/assets/videos/propsect_reactivator/Prospect Reactivator - Overview.mp4";
import prospectReactivatorPhase1Video from "@/assets/videos/propsect_reactivator/Prospect Reactivator - Identify Past Prospects.mp4";
import prospectReactivatorPhase2Video from "@/assets/videos/propsect_reactivator/Prospect Reactivator - Re-Engage.mp4";
import prospectReactivatorPhase3Video from "@/assets/videos/propsect_reactivator/Prospect Reactivator - 15 Minute Prospect Interview Call.mp4";
import prospectReactivatorDocx from "@/assets/files/Prospect Reactivator _ New Business Growth Engine.docx";
import prospectReactivatorXlsx from "@/assets/files/Prospect Reactivator.xlsx";
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
    title: "Prospect Reactivator Framework",
    duration: "2:35",
    description: "Turn past prospects into new wins",
    image: prospectReactivatorImg,
  },
  research: {
    title: "Identify Past Prospects",
    duration: "2:26",
    description: "Focus on those who renew in the next 90 days, giving you a better opportunity to win now",
    image: ippPrImg,
  },
  reconnect: {
    title: "Re-Engage",
    duration: "5:18",
    description: "Confirm their premium problem and book a 15-minute interview call",
    image: rePrImg,
  },
  reinforce: {
    title: "Prospect Interview Call",
    duration: "5:04",
    description: "Stay in command, acknowledge the change, and move forward confidently",
    image: picPrImg,
  },
};

const playbookSections: PlaybookSection[] = [
  {
    id: "overview",
    title: "Prospect Reactivator Overview",
    summary: "Quick wins, new wins & reactivate past prospects",
    icon: Sparkles,
    accent: "from-rose-500 via-pink-500 to-fuchsia-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          The Prospect Reactivator helps you turn past prospects into new wins. It is designed to get you quick wins and then run every 90 days to reactivate past prospects.
        </p>
        <p>
          You'll re-engage people you've already met with or quoted and use your new strategy to restart the conversation. The goal is to get them into the 15-minute Prospect Interview Call to show them a better way to secure the best deal on the market.
        </p>
        <p>
          These prospects already know you, making them a warm opportunity. Be transparent: let them know you've invested in a new strategy built to help clients beat the market, and you wanted them to see it.
        </p>
        <p>
          You're not following up on old quotes. You're restarting the conversation with a better process and a clear reason to meet.
        </p>
      </div>
    ),
  },
  {
    id: "research",
    title: "Step 1 · Identify Past Prospects",
    summary: "Identify past prospects & focus on who renew in the next 90 days",
    icon: Search,
    accent: "from-blue-500 via-sky-500 to-cyan-500",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Start by identifying past prospects you've already worked with, quoted, or met for a coverage analysis.
        </p>
        <p>
          Focus on those who renew in the next 90 days, giving you a better opportunity to win now. You'll run this Prospect Reactivator every 90 days (four times a year).
        </p>
        <p>
          Pull past prospects into a single list, and get ready to re-engage.
        </p>
        <p>
          These are warm opportunities — people who've already taken your call once and are most likely to give you another shot.
        </p>
        <p>
          Use the attached spreadsheet to create your list.
        </p>
        <p>
          Once you have identified the prospect, you are going to identify their premium problem. You are looking to find how they talked about premium and what they are looking to accomplish.
        </p>
        <p className="font-semibold">
          Ask yourself:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>What did they say about insurance or premiums?</li>
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
    id: "reconnect",
    title: "Step 2 · Re-Engage",
    summary: "Text, call, or email, book a 15-minute interview call",
    icon: MessageSquare,
    accent: "from-emerald-500 via-teal-500 to-emerald-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Now that you've identified your past prospects, it's time to re-engage them. Reach out the same way you've communicated with them before — text, call, or email. The objective here is simple: confirm their premium problem and book a 15-minute interview call.
        </p>
        <p className="font-semibold">
          Confirm the Premium Problem
        </p>
        <p>
          We want to confirm what they originally said was important — usually something around premium. If they already told you what it was, repeat it back and confirm. If they didn't, help them name it.
        </p>
        <p className="font-semibold">
          Sample Script — You already know their problem:
        </p>
        <p className="italic">
          "Hey John, I know we worked on your renewal last year, and getting the best deal on your premium was important to you. Just want to confirm — that's still accurate?"
        </p>
        <p className="italic">
          (John: "Yep, absolutely.")
        </p>
        <p className="font-semibold">
          Sample Script — You don't know their problem yet:
        </p>
        <p className="italic">
          "Hey John, I know we worked on your renewal last year. I'm assuming you were reviewing options because you wanted to make sure you're getting the best deal out there — is that right?"
        </p>
        <p className="italic">
          (John: "Yeah, exactly.")
        </p>
        <p className="font-semibold">
          Be Transparent & Take Ownership
        </p>
        <p>
          Take ownership and be transparent about what's changed. You've evolved, you've invested, and you've found a better way. That honesty re-engages them.
        </p>
        <p className="font-semibold">
          Sample Script:
        </p>
        <p className="italic">
          "I know we put a lot of time into your renewal last year and what I've realized is the path we went down wasn't getting the results people wanted. So I invested in learning a new strategy to help people get the best deal in the market. It's completely game-changing, and you can use it with or without me."
        </p>
        <p className="font-semibold">
          Ask for the Meeting
        </p>
        <p>
          Once you've confirmed their problem and shared your shift, it's time to ask for the meeting.
        </p>
        <p className="font-semibold">
          Sample Script:
        </p>
        <p className="italic">
          "What works best for a quick 15-minute call? I'll ask a few questions and see if or how this strategy could help you get the best deal on your renewal. Would tomorrow at 11 or Thursday at 10 work better for you?"
        </p>
      </div>
    ),
  },
  {
    id: "reinforce",
    title: "Step 3 · Prospect Interview Call",
    summary: "Prepare & execute!",
    icon: RefreshCcw,
    accent: "from-amber-400 via-orange-500 to-amber-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Now that you've got the 15-minute Prospect Interview Call booked, it's time to prep for it and execute. You'll handle this call just like any other 15-minute prospect interview — but with one key difference: you've already worked with this person before.
        </p>
        <p>
          So your job here is to stay in command, acknowledge the change, and move forward confidently. You don't need to over-explain — you've already done that in the re-engagement message.
        </p>
        <p>
          Review the 15-Minute Prospect Interview Call Framework to prepare, but use this adjusted introduction for reactivated prospects.
        </p>
        <p className="font-semibold text-base">
          15 Minute Prospect Interview Call | Reactivator Intro
        </p>
        <p className="font-semibold">
          Intro
        </p>
        <p className="italic">
          "Hey John, I had us down for a quick 15-minute call — does that still work?"
        </p>
        <p className="italic">
          (John: "Yep, that works.")
        </p>
        <p className="font-semibold">
          Rapport
        </p>
        <p className="italic">
          "Perfect. Appreciate you jumping on, man. How have you been?"
        </p>
        <p>
          Spend 30–120 seconds asking what's changed since you last talked — personally or professionally.
        </p>
        <p>
          Then move right into command.
        </p>
        <p className="font-semibold">
          Command
        </p>
        <p className="italic">
          "Alright, I've got us down for 15 minutes, cool if we dive in.
        </p>
        <p className="italic">
          So I invested in learning this new strategy to help people get the best deal in the market. It's completely game-changing, helping people negotiate the best deal on their premium.
        </p>
        <p className="italic">
          I have a framework I'll run through on this call. I know we met in the past, but I'll still have some questions to ask to confirm where you are at or if anything has changed. I'll ask the questions and work out if or how the strategy will apply to you.
        </p>
        <p className="italic">
          If I don't think it's a fit, I'll let you know and try to point you in the right direction.
        </p>
        <p className="italic">
          If I think it can help, we can book another call to walk through what that would look like.
        </p>
        <p className="italic">
          Sound good?"
        </p>
        <p className="italic">
          (John: "Yeah, that sounds great.")
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
          Download these resources to help you implement the Prospect Reactivator framework.
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
                  Prospect Reactivator - New Business Growth Engine
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  DOCX • Template
                </p>
              </div>
            </div>
            <a
              href={prospectReactivatorDocx}
              download="Prospect Reactivator _ New Business Growth Engine.docx"
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
                  Prospect Reactivator
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  XLSX • Worksheet
                </p>
              </div>
            </div>
            <a
              href={prospectReactivatorXlsx}
              download="Prospect Reactivator.xlsx"
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

export const ProspectReactivatorPage = () => {
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

    // If we're on the last step (Step 3 - reinforce), navigate to Revenue Stacker
    if (activeSection === "reinforce") {
      window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "revenue-stacker" } }));
      return;
    }

    const nextIndex = (currentIndex + 1) % playbookSections.length;
    setActiveSection(playbookSections[nextIndex].id);
  }, [activeSection]);

  const getNextPhaseLabel = React.useCallback(() => {
    // If we're on Step 3, next stage is Revenue Stacker
    if (activeSection === "reinforce") {
      return "Revenue Stacker";
    }

    const currentIndex = playbookSections.findIndex((section) => section.id === activeSection);
    const nextIndex = (currentIndex + 1) % playbookSections.length;
    const nextSection = playbookSections[nextIndex];

    if (nextSection.id === "overview") return "Overview";
    if (nextSection.id === "research") return "Step 1";
    if (nextSection.id === "reconnect") return "Step 2";
    if (nextSection.id === "reinforce") return "Step 3";
    return "Next";
  }, [activeSection]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <LeftSidebar activePage="network" />

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
                Prospect Reactivator
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
                          ? "border-rose-400/60 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                          : "border-slate-200 dark:border-slate-800 hover:border-rose-200/80"
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
                  className="px-4 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0"
                  aria-label="Go to next phase"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    Next Phase
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                      {getNextPhaseLabel()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                    PROSPECT
                  </span>{' '}
                  <span>REACTIVATOR</span>
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
                          <source src={prospectReactivatorOverviewVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : activeSection === "research" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={prospectReactivatorPhase1Video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : activeSection === "reconnect" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={prospectReactivatorPhase2Video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          controls
                          poster={currentVideoData.image}
                          className="w-full h-full object-cover"
                        >
                          <source src={prospectReactivatorPhase3Video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    <div className="p-6 space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
                        Reactivator Spotlight
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
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                              Reactivator Phase
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

export default ProspectReactivatorPage;
