import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  CalendarCheck,
  PhoneCall,
  Play,
  BookOpen,
  Zap,
  Download,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import networkEngagerImg from "@/assets/images/Network Engager.png";
import networkEngagerVideo from "@/assets/videos/network_engager/Network Engager - Overview.mp4";
import iwrNeImg from "@/assets/images/iwr_ne.png";
import iwrNeVideo from "@/assets/videos/network_engager/Network Engager - Identify Warm Relationships.mp4";
import eNeImg from "@/assets/images/e_ne.png";
import eNeVideo from "@/assets/videos/network_engager/Network Engager - Engage.mp4";
import mfNeImg from "@/assets/images/mf_ne.png";
import mfNeVideo from "@/assets/videos/network_engager/Network Engager - Meeting Framework.mp4";
import networkEngagerDocx from "@/assets/files/Network Engager_One Pager Template.docx";
import networkEngagerXlsx from "@/assets/files/Network Engager.xlsx";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { Footer } from "@/components/shared/Footer";

type FrameworkSection = {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  content: React.ReactNode;
};

type RelationshipType = {
  title: string;
  description: string;
  details: string[];
};

type VideoData = {
  title: string;
  duration: string;
  description: string;
  image: string;
  videoSrc?: string;
};

const relationshipTypes: RelationshipType[] = [
  {
    title: "Referral Partners & COIs (Centers of Influence)",
    description: "These are past or potential referral sources—people who can introduce you to ideal clients.",
    details: [
      "Examples: other brokers, consultants, accountants, real estate agents, or business owners with complementary networks.",
    ],
  },
  {
    title: "Potential Direct Clients",
    description:
      "These are people already in your network who could become clients themselves, but maybe you haven't reached out yet because you didn't have a clear strategy or offer.",
    details: ["Now that you've got the new BOR strategy and framework in place, it's time to re-engage with confidence and purpose."],
  },
];

const primaryOutcomes = [
  "A warm referral or introduction",
  "A qualified meeting with someone who could directly benefit from your new strategy",
];

const outreachReminders = [
  "Reach out using whatever communication channel feels most natural for your relationship: text, call, email, or DM.",
  "The objective is simple: book a meeting.",
  "You're not pitching insurance here; you're opening the door for a conversation built on trust and curiosity.",
];

const meetingOutcomes = [
  "Referral Partner / COI: Strengthen the relationship and position yourself to get introductions to their clients.",
  "Potential Direct Client: Move the relationship into the formal sales process.",
];

const videoDataByStage: Record<string, VideoData> = {
  "framework": {
    title: "Network Engager Framework",
    duration: "2:30",
    description: "Connect with your warm network, reignite existing relationships, and generate some quick wins",
    image: networkEngagerImg,
    videoSrc: networkEngagerVideo,
  },
  "identify": {
    title: "Step 1 · Identify Warm Relationships",
    duration: "1:49",
    description: "Identifying people in your warm network and any relationships you've had in the past",
    image: iwrNeImg,
    videoSrc: iwrNeVideo,
  },
  "position": {
    title: "Step 2 · Engage Your Network",
    duration: "5:23",
    description: "Time to engage, open the door for conversation",
    image: eNeImg,
    videoSrc: eNeVideo,
  },
  "activate": {
    title: "Step 3 · Meeting Framework",
    duration: "7:32",
    description: "Perform with confidence and purpose!",
    image: mfNeImg,
    videoSrc: mfNeVideo,
  },
  "resources": {
    title: "Resources",
    duration: "",
    description: "Download Network Engager resources and templates",
    image: networkEngagerImg,
  },
};

const frameworkSections: FrameworkSection[] = [
  {
    id: "framework",
    title: "Network Engager Framework",
    summary: "Understand the complete framework for leveraging your warm network.",
    icon: BookOpen,
    accent: "from-violet-400 via-purple-500 to-fuchsia-500",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          The purpose of the Network Engager is simple — to connect with your warm network, reignite existing relationships, and generate some quick wins.
        </p>
        <p>
          Your network already knows you, trusts you, and has context on who you are. The key here is to re-engage them intentionally — not just to "check in," but to add value and open new opportunities.
        </p>
        <p>
          We're going to focus on two types of relationships:
        </p>
        <div className="space-y-3 pl-4">
          <div>
            <p className="font-semibold">Referral Partners & COIs (Centers of Influence):</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>These are past or potential referral sources — people who can introduce you to ideal clients.</li>
              <li>Examples: other brokers, consultants, accountants, real estate agents, or business owners with complementary networks.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Potential Direct Clients:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>These are people already in your network who could become clients themselves — but maybe you haven't reached out yet because you didn't have a clear strategy or offer.</li>
              <li>Now that you've got the new BOR strategy and framework in place, it's time to re-engage with confidence and purpose.</li>
            </ul>
          </div>
        </div>
        <p>
          The goal of the Network Engager is to take your existing relationships and convert them into one of two outcomes:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>A warm referral or introduction</li>
          <li>A qualified meeting with someone who could directly benefit from your new strategy</li>
        </ul>
        <p>
          You're not cold-calling here — you're activating relationships that already exist.
        </p>
      </div>
    ),
  },
  {
    id: "identify",
    title: "Step 1 · Identify Warm Relationships",
    summary: "Map your warm network and capture referral and client opportunities.",
    icon: Target,
    accent: "from-emerald-400 via-teal-500 to-emerald-600",
    content: (
      <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Start by identifying people in your warm network and any relationships you've had in the past, current relationships, or people you've wanted
          to approach but haven't because you didn't have the confidence or strategy to go after them.
        </p>
        <p>
          Use the attached spreadsheet to create your list. Include their name and the opportunity (referral partner or potential client). Your goal is
          to get clarity on who's already in your circle and where the opportunities lie.
        </p>
        <p>Once you've built this list, we'll create your outreach game plan to engage and activate those relationships.</p>
      </div>
    ),
  },
  {
    id: "position",
    title: "Step 2 · Engage",
    summary: "Reconnect with purpose and invite trusted conversations.",
    icon: PhoneCall,
    accent: "from-sky-400 via-blue-500 to-indigo-500",
    content: (
      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="space-y-4">
          <p>Now that you've identified your warm network, it's time to engage.</p>
          <p>
            Reach out using whatever communication channel feels most natural for your relationship: text, call, email, or DM. The objective is simple:
            book a meeting.
          </p>
          <p>You're not pitching insurance here; you're opening the door for a conversation built on trust and curiosity.</p>
        </div>
        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Two Types of Re-Engagements</p>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Referral Partners / Centers of Influence (COIs)
              </p>
              <p>These are people who work with business owners and can connect you with prospects.</p>
              <p>You've got two options here:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Casual Setting: Set up a casual networking-style meeting (coffee, lunch, or drinks) just like you would in the past but be clear on your intention and the purpose of the conversation.</li>
                <li>
                  30 Minute Meeting: If it feels more natural or professional, invite them to a short, focused conversation.
                </li>
              </ul>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Sample Script</p>
                <div className="space-y-2">
                  <p>Hey John, I know it's been a minute, but I've been digging deep into how the insurance game really works.</p>
                  <p>
                    I recently invested in a new strategy that's helping business owners get the best deal in the market, and it's something they can use
                    with or without me.
                  </p>
                  <p>Thought it might be useful for your clients.</p>
                  <p>
                    You open to grabbing lunch or coffee this week? I'll walk you through how it works so you can share it with them. What works best,
                    Wednesday at 12:00 or Thursday at 1:00?
                  </p>
                </div>
              </div>
            </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Direct Relationships / Potential Clients</p>
              <p>These are people already in your circle who could directly benefit from your BOR strategy.</p>
              <p>You've got two options here:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Casual Setting: Meet them the same way you'd normally hang out (coffee, drinks, dinner) but be clear on your intention and the purpose of the conversation.</li>
                <li>15-Minute Call: If it feels more natural or professional, invite them to a short, focused conversation.</li>
              </ul>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Sample Script</p>
                <div className="space-y-2">
                  <p>Hey John, I don't know if you knew this or not, but I've been deep in the insurance world for a while, and I just found a new strategy that's helping people get the best deal on the market. It will completely change how you buy insurance forever, and it's something you can use with or without me.</p>
                  <p>You open to a quick 15-minute call (lunch, coffee, etc.) this week so I can walk you through it? What works best, Wednesday at 12:00 or Thursday at 1:00?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "activate",
    title: "Step 3 | Meeting Framework",
    summary: "Run the meeting with confidence and convert relationships into action.",
    icon: CalendarCheck,
    accent: "from-amber-400 via-orange-500 to-rose-500",
    content: (
      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="space-y-4">
          <p>You've booked the meeting; now it's time to run it with confidence and purpose. There are two possible outcomes depending on the type of relationship:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Referral Partner / COI: Strengthen the relationship and position yourself to get introductions to their clients.</li>
            <li>Potential Direct Client: Move the relationship into the formal sales process.</li>
          </ul>
          <p>Below is how to prepare and run both versions of the meeting.</p>
        </div>

        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Referral Partner / COI Meeting</p>
          <p>This meeting is meant to re-establish connection and introduce your new strategy in a professional, valuable way. Below is the framework and strategy you can use for the meeting.</p>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Command</p>
            <p>You want to make it clear there's a purpose to the meeting.</p>
            <p className="font-semibold">Example Command Options:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>"Hey, before we dive into catching up, I've got something I'd love to share with you — it'll take about 10 minutes. Then we can hang and catch up after."</li>
              <li>"Hey, I know we're grabbing lunch, but I definitely have something I want to show you that I think could be a big win for your clients. You good if I dive into that first?"</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Meeting Flow</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-semibold">Open with Command & Context:</span> Set the tone, take control, and share the purpose.</li>
              <li>
                <span className="font-semibold">Share the Strategy:</span>
                <p className="mt-1">"I've been studying how the insurance game really works and realized most clients are stuck in a broken process. I've invested in a new strategy that helps people get the best deal on the market — and it's something your clients can use with or without me."</p>
                <p className="mt-1">Give them a 5–10 minute overview of the strategy (high level).</p>
                <p className="mt-1">Position it as a value-add they can bring to their clients.</p>
              </li>
              <li>
                <span className="font-semibold">Provide a One-Pager:</span>
                <p className="mt-1">Leave behind a quick summary of the strategy (you can even offer to co-brand it).</p>
                <p className="mt-1">"Feel free to put your branding on it — I want this to make you look good with your clients."</p>
              </li>
              <li>
                <span className="font-semibold">Make the Ask:</span>
                <p className="mt-1">"If you've got any clients who'd want this customized for their business, I'm happy to jump on a quick 15-minute call with them and work out if or how the strategy applies."</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Direct Client Meeting or Call</p>
          <p>If this is someone who could become a direct client, you have two ways to run it, depending on how you set it up:</p>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">15-Minute Prospect Interview Call:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Treat it like a standard 15-minute interview call.</li>
              <li>Use the 15-Minute Call Framework from the program.</li>
              <li>Build rapport naturally (you already have trust), then take command and move into questions.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/70 dark:bg-slate-900/60 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">In-Person Meeting (Coffee, Lunch, Drinks):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acknowledge the purpose early.</li>
              <li>"Hey, I appreciate you meeting up — I'm excited to share this with you. I've been testing a new strategy that's completely changing how clients approach the market."</li>
              <li>
                Then, run either:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>The 15-Minute Call Framework extended over conversation</li>
                  <li>The One-Call BOR Framework if you feel they're ready for the full strategy.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "resources",
    title: "Resources",
    summary: "Download Network Engager resources and templates.",
    icon: Download,
    accent: "from-purple-400 via-pink-500 to-rose-500",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Download these resources to help you implement the Network Engager framework.
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
                  Network Engager - One Pager Template
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  DOCX • Template
                </p>
              </div>
            </div>
            <a
              href={networkEngagerDocx}
              download="Network Engager_One Pager Template.docx"
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
                  Network Engager
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  XLSX • Worksheet
                </p>
              </div>
            </div>
            <a
              href={networkEngagerXlsx}
              download="Network Engager.xlsx"
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

export const NetworkEngagerPage = () => {
  const [workspaceSidebarOpen, setWorkspaceSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activePlay, setActivePlay] = React.useState(frameworkSections[0].id);

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

  const currentVideoData = videoDataByStage[activePlay] || videoDataByStage["identify"];

  const handleNextStep = React.useCallback(() => {
    const currentIndex = frameworkSections.findIndex((section) => section.id === activePlay);
    const nextIndex = (currentIndex + 1) % frameworkSections.length;
    setActivePlay(frameworkSections[nextIndex].id);
  }, [activePlay]);

  const getNextStepLabel = React.useCallback(() => {
    const currentIndex = frameworkSections.findIndex((section) => section.id === activePlay);
    const nextIndex = (currentIndex + 1) % frameworkSections.length;
    const nextSection = frameworkSections[nextIndex];

    if (nextSection.id === "framework") return "Framework";
    if (nextSection.id === "identify") return "Step 1";
    if (nextSection.id === "position") return "Step 2";
    if (nextSection.id === "activate") return "Step 3";
    if (nextSection.id === "resources") return "Resources";
    return "Next";
  }, [activePlay]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <LeftSidebar activePage="network-engager" />

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
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Network Engager
                </p>
              </div>
            </div>
            <div className="px-6 py-5 space-y-5 overflow-y-auto">
              {/* Network Engager Framework Section */}
              <div className="space-y-3">
                {frameworkSections
                  .filter((section) => section.id === "framework")
                  .map((section) => {
                    const Icon = section.icon;
                    const isActive = activePlay === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActivePlay(section.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition ${
                          isActive
                            ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "border-slate-200 dark:border-slate-800 hover:border-emerald-200/80"
                        }`}
                      >
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${section.accent} text-white`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">{section.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{section.summary}</p>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* Playbook Stages Section */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Playbook Stages
                </p>
                <div className="flex flex-col gap-3">
                  {frameworkSections
                    .filter((section) => section.id !== "framework")
                    .map((section) => {
                      const Icon = section.icon;
                      const isActive = activePlay === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setActivePlay(section.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition ${
                            isActive
                              ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                              : "border-slate-200 dark:border-slate-800 hover:border-emerald-200/80"
                          }`}
                        >
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${section.accent} text-white`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold">{section.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{section.summary}</p>
                          </div>
                        </button>
                      );
                    })}
                </div>
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
                  aria-label="Toggle modules sidebar"
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
                  onClick={handleNextStep}
                  className="px-4 py-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0"
                  aria-label="Go to next step"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-purple-400">
                    Next Step
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/50 px-2 py-0.5 rounded-md">
                      {getNextStepLabel()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-3"
                >
                  <Zap className="w-4 h-4" />
                  <span>New Business Growth Engine</span>
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    NETWORK
                  </span>{' '}
                  <span className="text-slate-900 dark:text-slate-100">ENGAGER</span>
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1600px] mx-auto py-8 px-6 lg:py-10 lg:px-12 2xl:px-16">
              <div className="space-y-8">
                {activePlay !== "resources" && (
                  <motion.div
                    key={activePlay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5 overflow-hidden"
                  >
                    <div className="relative aspect-video bg-slate-900">
                    {currentVideoData.videoSrc ? (
                      <video
                        controls
                        poster={currentVideoData.image}
                        className="w-full h-full object-cover"
                      >
                        <source src={currentVideoData.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {currentVideoData.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentVideoData.description}
                    </p>
                  </div>
                  </motion.div>
                )}
                <div className="grid gap-6">
              <section className="space-y-6">
                {frameworkSections
                  .filter((section) => section.id === activePlay)
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
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Framework Step</p>
                          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {section.title}
                          </h2>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{section.summary}</p>
                        </div>
                      </div>
                      <div className="space-y-6">{section.content}</div>
                    </motion.div>
                  ))}
              </section>
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

export default NetworkEngagerPage;
