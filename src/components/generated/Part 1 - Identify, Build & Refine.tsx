"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MessageSquare, FileText, BookOpen, Download, Award, Search, Target, TrendingUp, Check, Clock, Lightbulb, ScrollText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import revenueTrackerThumbnail from "@/assets/images/revenue_tracker.png";
import revenueStackerThumbnail from "@/assets/images/Revenue_Stacker.png";
import buildYourScriptThumbnail from "@/assets/images/bys.png";
import borProspectingMindsetThumbnail from "@/assets/images/BOR Prospecting Mindset.png";
import borProspectingScriptThumbnail from "@/assets/images/BOR Prospecting Script.png";
import objectionsFeedbackThumbnail from "@/assets/images/objections_feedback.png";
import revenueStackerIdentifyVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Identify Target Prospects.mp4";
import revenueStackerOverviewVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Overview.mp4";
import revenueStackerScriptVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Build Your Script.mp4";
import borProspectingMindsetVideo from "@/assets/videos/build_your_script/BOR Prospecting Mindset.mp4";
import borProspectingScriptVideo from "@/assets/videos/build_your_script/BOR Prospecting Script.mp4";
import objectionsFeedbackVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Objection + Feedback.mp4";
import revenueStackerDocx from "@/assets/files/Revenue Stacker _ New Business Growth Engine.docx";
import revenueStackerXlsx from "@/assets/files/Revenue Stacker.xlsx";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { EmbeddedScriptBuilder } from "@/components/script-builder/EmbeddedScriptBuilder";
import { Footer } from "@/components/shared/Footer";

type VideoData = {
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  progress: number;
};

type NavigatorSection = {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  accent: string;
};

type NavigatorPageConfig = {
  title: string;
  stageLabel: string;
  stageIcon: React.ComponentType<{
    className?: string;
  }>;
  stageClassName: string;
  nextStepTag: string;
  placeholderTitle?: string;
  placeholderDescription?: string;
};

const navigatorSections: NavigatorSection[] = [{
  id: "define-target",
  title: "Revenue Stacker Framework",
  summary: "Fill your pipeline with new opportunities for the next 90 days",
  icon: Target,
  accent: "from-emerald-500 via-teal-500 to-emerald-600"
}, {
  id: "build-list",
  title: "Step 1 · Identify Target Prospects",
  summary: "Find businesses that are ready to move",
  icon: Search,
  accent: "from-cyan-500 via-sky-500 to-blue-500"
}, {
  id: "organize-outreach",
  title: "Step 2 · Build Your Script",
  summary: "Build, test, and refine your cold call scripts",
  icon: TrendingUp,
  accent: "from-teal-500 via-emerald-500 to-teal-600"
}, {
  id: "prep-conversations",
  title: "Tool · Script Builder",
  summary: "Align scripts and call plans so every touch advances the BOR.",
  icon: Check,
  accent: "from-amber-400 via-orange-500 to-amber-600"
}, {
  id: "objections-feedback",
  title: "Step 3 · Objections + Feedback",
  summary: "Handle objections and refine your approach",
  icon: AlertCircle,
  accent: "from-purple-500 via-violet-500 to-purple-600"
}, {
  id: "resources",
  title: "Resources",
  summary: "Download templates and worksheets",
  icon: Download,
  accent: "from-purple-400 via-violet-500 to-purple-600"
}];

const navigatorPageContent: Record<NavigatorSection["id"], NavigatorPageConfig> = {
  "define-target": {
    title: "Revenue Stacker Framework",
    stageLabel: "Revenue Stacker Overview",
    stageIcon: TrendingUp,
    stageClassName: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
    nextStepTag: "Step 1"
  },
  "build-list": {
    title: "Identify Target Prospects",
    stageLabel: "Revenue Stacker - Step 1",
    stageIcon: Search,
    stageClassName: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
    nextStepTag: "Step 2"
  },
  "organize-outreach": {
    title: "Build Your Script",
    stageLabel: "Revenue Stacker - Step 2",
    stageIcon: Clock,
    stageClassName: "bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400",
    nextStepTag: "Tool",
    placeholderTitle: "Organize Your Outreach Rhythm",
    placeholderDescription: "Structure your weekly call blocks, follow-up cadences, and CRM checkpoints so every prospect moves forward without falling through the cracks."
  },
  "prep-conversations": {
    title: "Tool - Script Builder",
    stageLabel: "Revenue Stacker - Tool",
    stageIcon: Check,
    stageClassName: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    nextStepTag: "Step 3",
    placeholderTitle: "Prep Every Conversation",
    placeholderDescription: "Lock in call objectives, objection responses, and BOR conversion language so you close confidently when prospects are ready to move."
  },
  "objections-feedback": {
    title: "Objections + Feedback",
    stageLabel: "Script Refinement",
    stageIcon: AlertCircle,
    stageClassName: "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
    nextStepTag: "Next Phase",
    placeholderTitle: "Handle Objections & Refine Your Approach",
    placeholderDescription: "Master common objections and continuously improve your script based on real-world feedback and results."
  },
  "resources": {
    title: "Resources",
    stageLabel: "Revenue Stacker - Resources",
    stageIcon: Download,
    stageClassName: "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
    nextStepTag: "Next Phase"
  }
};

// Shared icon for Revenue Stacker - used in sidebar and back button
const RevenueStackerIcon = MessageSquare;

const videoData: VideoData = {
  title: "Video - Identifying Your Target Prospects",
  duration: "8:27",
  description: "Find businesses that are ready to move & fill your pipeline fast!",
  thumbnail: revenueTrackerThumbnail,
  progress: 0
};

const introText = `The Revenue Stacker is built to help you stack revenue fast — by filling your pipeline with new opportunities over the next 90 days.

There are plenty of ways to grow your book — content, networking, referrals — but if you want immediate movement, this is the most direct path.

The Revenue Stacker focuses on cold outreach, specifically cold calling, because it's the fastest and most efficient way to generate new business.

Commercial insurance buyers are used to getting calls every week, which gives you a huge advantage. When you use this strategy, you immediately stand out, differentiate yourself, and open real conversations.`;

const keyPoints = [
  "Build and maintain a 90-day pipeline of fresh opportunities",
  "Expand your prospect list weekly so there's always new activity",
  "Use simple, proven call scripts that position you as a trusted advisor",
  "Stack consistent revenue, month after month"
];

export const TargetProspectsPage = () => {
  const [activeTab, setActiveTab] = React.useState<"lesson" | "resources" | "overview" | "mindset" | "script">("lesson");
  const [lessonCompleted, setLessonCompleted] = React.useState(false);
  const [workspaceSidebarOpen, setWorkspaceSidebarOpen] = React.useState(true);
  const [isNavigatorMobile, setIsNavigatorMobile] = React.useState(false);
  const [activeNavigatorSection, setActiveNavigatorSection] = React.useState(navigatorSections[0].id);
  const activePageConfig = navigatorPageContent[activeNavigatorSection];
  const StageIcon = activePageConfig.stageIcon;

  React.useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      const navigatorIsMobile = width < 1280;
      setIsNavigatorMobile(navigatorIsMobile);
      if (navigatorIsMobile) {
        setWorkspaceSidebarOpen(false);
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  React.useEffect(() => {
    if (activeNavigatorSection === "organize-outreach") {
      setActiveTab("overview");
    } else {
      setActiveTab("lesson");
    }
  }, [activeNavigatorSection]);

  const handleNextNavigatorSection = React.useCallback(() => {
    // If we're on Resources, navigate to Part 2
    if (activeNavigatorSection === "resources") {
      window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "execute-build-plan" } }));
      return;
    }

    const currentIndex = navigatorSections.findIndex(section => section.id === activeNavigatorSection);
    const nextIndex = (currentIndex + 1) % navigatorSections.length;
    setActiveNavigatorSection(navigatorSections[nextIndex].id);
  }, [activeNavigatorSection]);

  const tabs = React.useMemo(() => {
    if (activeNavigatorSection === "organize-outreach") {
      return [
        { id: "overview" as const, label: "Overview", icon: FileText },
        { id: "mindset" as const, label: "Mindset", icon: Lightbulb },
        { id: "script" as const, label: "Script", icon: ScrollText },
        { id: "resources" as const, label: "Resources", icon: Download },
      ];
    } else {
      return [
        { id: "lesson" as const, label: "Lesson", icon: BookOpen },
        { id: "resources" as const, label: "Resources", icon: Download },
      ];
    }
  }, [activeNavigatorSection]);

  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <LeftSidebar activePage="revenue-stacker" />

      {/* Main Content Area */}
      <motion.div className="flex-1 flex overflow-hidden min-w-0 ml-[72px]">
        {!isNavigatorMobile && <motion.aside initial={false} animate={{
        width: workspaceSidebarOpen ? 360 : 0
      }} transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }} className={`hidden xl:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5 ${workspaceSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <span>Revenue Stacker</span>
              </p>
            </div>
            <div className="px-6 py-5 space-y-5 overflow-y-auto">
              <div className="space-y-3">
                {navigatorSections.map(section => {
                const Icon = section.icon;
                const isActive = activeNavigatorSection === section.id;
                return <button key={section.id} type="button" onClick={() => setActiveNavigatorSection(section.id)} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition w-full ${isActive ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200/80"}`}>
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${section.accent} text-white flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{section.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{section.summary}</p>
                      </div>
                    </button>;
              })}
              </div>
            </div>
          </motion.aside>}
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="relative flex items-center mb-4">
              <div className="absolute left-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 flex gap-2 z-10">
                {!isNavigatorMobile && <button onClick={() => setWorkspaceSidebarOpen(prev => !prev)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0 hidden xl:block" aria-label="Toggle navigator">
                    {workspaceSidebarOpen ? <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" /> : <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />}
                  </button>}
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'revenue-stacker' } }))} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Back to Revenue Stacker">
                  <RevenueStackerIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                </button>
                <div className="h-full w-px bg-slate-200 dark:bg-slate-800" />
                <button onClick={handleNextNavigatorSection} className="px-4 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0" aria-label="Go to next stage">
                  {(activeNavigatorSection === "objections-feedback" || activeNavigatorSection === "resources") ? (
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                      Part 2
                    </span>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        {activeNavigatorSection === "organize-outreach" ? "Next stage" : "Next step"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                          {activePageConfig.nextStepTag}
                        </span>
                        <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </>
                  )}
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-3 ${activePageConfig.stageClassName}`}
                >
                  <StageIcon className="w-4 h-4" />
                  <span>{activePageConfig.stageLabel}</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>{activePageConfig.title}</span>
                </h1>
              </div>
            </div>

            {/* Tabs */}
            {(activeNavigatorSection === "build-list" || activeNavigatorSection === "organize-outreach" || activeNavigatorSection === "objections-feedback") && <div className="flex justify-center">
              <div className="inline-flex items-center gap-0.5 rounded-xl p-1 shadow-md border border-slate-200 dark:border-slate-700" style={{ backgroundColor: '#0c7e67' }}>
                {tabs.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap`} style={isActive ? { backgroundColor: '#134d3e', color: 'white', paddingLeft: '0.6rem', paddingRight: '0.6rem', width: '160px' } : { color: '#ced57f', backgroundColor: 'transparent', paddingLeft: '0.6rem', paddingRight: '0.6rem', width: '160px' }}>
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>;
              })}
              </div>
            </div>}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {activeNavigatorSection === "define-target" && (
                <motion.div
                  key="define-target"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                  {/* Video Player */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        controls
                        poster={revenueStackerThumbnail}
                        className="w-full h-full object-cover"
                      >
                        <source src={revenueStackerOverviewVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        <span>Revenue Stacker Framework Overview</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        <span>Learn how to stack revenue fast by filling your pipeline with new opportunities</span>
                      </p>
                    </div>
                  </div>

                  {/* Text Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      <span>Revenue Stacker Framework</span>
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                      <span>{introText}</span>
                    </p>

                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                      <span>This system will help you:</span>
                    </h3>
                    <ul className="space-y-3">
                      {keyPoints.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeNavigatorSection === "build-list" && (
                <motion.div
                  key={`build-list-${activeTab}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === "lesson" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}
                >
                  {activeTab === "lesson" && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={videoData.thumbnail} className="w-full h-full object-cover">
                            <source src={revenueStackerIdentifyVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>{videoData.title}</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>{videoData.description}</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Finding Businesses Ready to Move</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>The goal of the Revenue Stacker is to fill your pipeline fast--so this list will be broader and more active than your long-term niche list.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>You're not trying to build a perfect niche book right now. You're trying to find businesses that are ready to move--people in pain, people with renewals coming due, people already shopping on price.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>Who You're Looking For</span>
                          </h3>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li>Accounts that renew within the next 90 days</li>
                            <li>Accounts that meet your minimum revenue threshold</li>
                            <li>Industries that are easy to reach and responsive (trucking, contracting, construction, small manufacturing, etc.)</li>
                            <li>Buyers who are price-sensitive and open to hearing a new strategy</li>
                          </ul>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                            <h4 className="text-slate-900 dark:text-slate-100 mb-3">
                              <span>The mindset:</span>
                            </h4>
                            <ul className="text-slate-700 dark:text-slate-300 space-y-2 m-0">
                              <li>If they're willing to run the BOR strategy, they're your people--regardless of industry.</li>
                              <li>Your real niche right now is the BOR.</li>
                            </ul>
                          </div>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>Building the List</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <span>Use any X-date or prospecting source you have access to:</span>
                          </p>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li>InsuranceXDates.com</li>
                            <li>MiEdge by Zywave</li>
                            <li>MeetLeo</li>
                            <li>LexisNexis</li>
                          </ul>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>How to Organize It</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <span>Sort all prospects by X-date and premium size</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <span>Save by month--either in the software or a simple Excel tracker</span>
                          </p>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li>Tab 1 = October</li>
                            <li>Tab 2 = November</li>
                            <li>Tab 3 = December</li>
                            <li>Tab 4 = January</li>
                          </ul>

                          <p className="text-slate-700 dark:text-slate-300">
                            <span>Keep it simple. Add new prospects every single week so you're always stacking revenue.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                          title: "Revenue Stacker",
                          size: "XLSX 0.3 MB",
                          icon: FileText
                        }, {
                          title: "Industry Research Template",
                          size: "PDF 1.5 MB",
                          icon: FileText
                        }].map((resource, index) => {
                          const Icon = resource.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                    <span>{resource.title}</span>
                                  </h3>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <span>{resource.size}</span>
                                  </p>
                                </div>
                              </div>
                              <button className="p-3 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group-hover:scale-110">
                                <Download className="w-5 h-5" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeNavigatorSection === "organize-outreach" && (
                <motion.div
                  key={`organize-outreach-${activeTab}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === "overview" || activeTab === "mindset" || activeTab === "script" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}
                >
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={buildYourScriptThumbnail} className="w-full h-full object-cover">
                            <source src={revenueStackerScriptVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Video - Build Your Script</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Learn how to create effective scripts for your outreach</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                          <span>Build Your Script - Overview</span>
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                          <span>Learn how to create effective scripts that convert prospects into clients.</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "mindset" && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={borProspectingMindsetThumbnail} className="w-full h-full object-cover">
                            <source src={borProspectingMindsetVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>The BOR Mindset</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Understand that Premium is the problem, Prospects premium language & Make It Easy to Say Yes</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Premium is the Problem</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Premium is the problem every prospect is trying to solve. Instead of avoiding that conversation, use it to create more opportunities. Prospects aren't thinking about coverage gaps or service timelines — it always comes back to price. Most brokers miss this and waste time trying to <em>"find pain"</em> with service issues or coverage reviews. You don't need to do that. You already know the pain.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Your job is to show the prospect you understand their problem better than they do and that there's a better way to solve it. The key belief is simple: <em>"I know your problem, I know why you have it, and I know a better solution."</em></span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>That solution is the Premium Negotiation Strategy, not a quote or a coverage review. It's a strategy they can run with any broker to gain control, create leverage, and get the best deal in the market. Your entire focus is to solve their premium problem without quoting. The strategy is the solution, not you or your agency.</span>
                          </p>

                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Prospect's Premium Language</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Every prospect talks about their premium problem differently.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>It might sound like price, competitiveness, or uncertainty — but at the end of the day, what they're really looking for is control over the process, an understanding of how their premium is calculated, and the ability to impact it.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Your job is to listen to how they're expressing it. It won't always sound like frustration — sometimes it'll come across as casual or even satisfied. That's why you need to recognize the underlying premium concern no matter how it's framed.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Here are some common examples:</span>
                          </p>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li><em>"We love our broker — just want to make sure we're getting the best deal."</em></li>
                            <li><em>"If you can beat the price, I'll move."</em></li>
                            <li><em>"We go to market every few years to stay competitive."</em></li>
                            <li><em>"We haven't had any issues — just want to make sure we're still getting the best price."</em></li>
                            <li><em>"We shop every year to get the best deal."</em></li>
                          </ul>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>In the scripting section and the rest of the BOR Selling System, we'll show you exactly how to pull this out, take it a level deeper, and create pain around what sounds like a simple statement.</span>
                          </p>

                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Make It Easy to Say Yes</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Every producer says they're different. To differentiate, you must act differently. That starts by offering a completely different experience: starting with a simple 15-minute phone call.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Make it a phone call. Make it easy for the prospect to say yes.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>And most importantly, give them a different outcome. That outcome is a new strategy, one they can use to negotiate the best deal in the market every year, with or without you.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>The 15-minute call is easier for the prospect and better for you.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>You protect your time, avoid no-shows and overcommitting, and take full ownership of your calendar. You increase volume, qualify more prospects in less time, and move more opportunities into the sales process. Ultimately, getting to a yes or no faster, with more confidence and control.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100 mt-8">
                            <span>The CPA Cold Call</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Let's say a CPA is cold-calling you for your business. What option would you be more likely to say yes to?</span>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3">
                              <span><strong>Option 1:</strong></span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0">
                              <span><em>"Hey, I'm a CPA. I work with insurance producers and have some great strategies to help you save on taxes. I'd love to come out, show you what we do, and see how we can help. Just bring your last 3-5 years of tax returns."</em></span>
                            </p>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3">
                              <span><strong>Option 2:</strong></span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0">
                              <span><em>"Hey, I'm a CPA working with insurance producers. There's a new tax strategy and loophole producers are using to save on taxes. You've got 15 minutes to see if or how it applies to you?"</em></span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "script" && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={borProspectingScriptThumbnail} className="w-full h-full object-cover">
                            <source src={borProspectingScriptVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Build Your BOR Prospecting Script</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Your script is designed to help you differentiate yourself and show immediate value.</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>The BOR Prospecting Machine</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300">
                            <span>The fastest way to help you differentiate yourself and show immediate value is by offering a different outcome and a different experience.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Instead of providing a quote or a coverage analysis, you'll give them a strategy they can use to negotiate premiums and get the best deal in the market, with or without you.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>All they have to do is jump on a quick 15-minute call to see if the strategy applies.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>The purpose of your script is to clearly communicate that value and sell them on taking the 15-minute call.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>BOR Cold Call Script Frameworks</span>
                          </h3>

                          <h4 className="text-slate-900 dark:text-slate-100 mt-6">
                            <span>Intro Script</span>
                          </h4>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"Hi [Name], this is [Your Name] with [Your Company]. How are you? I know you're busy, so I'll be quick. Do you have a minute?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If YES:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"Are you the person who handles the insurance for the company?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If NO:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"No worries. I'll give you a call back. What's a better time to reach you?"</span>
                            </p>
                          </div>

                          <h4 className="text-slate-900 dark:text-slate-100 mt-8">
                            <span>Determine Decision Maker Script</span>
                          </h4>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"Are you the person who handles the insurance for the company?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If YES - Go to Decision Maker Script below:</strong>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If NO:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"Who would be the best person to talk to about that?"</span>
                            </p>
                          </div>

                          <h4 className="text-slate-900 dark:text-slate-100 mt-8">
                            <span>Decision Maker Script</span>
                          </h4>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>Playful Pitch:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"I work with [industry type] in [location] who are tired of their premiums going up every year."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"How are your premiums treating you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If Over [Amount]:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"Yeah, that's what I'm hearing from most people I talk to."</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>Quoting Is Dead Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is I don't quote. Quoting is dead. Instead, I help businesses implement a strategy to control and negotiate their premiums every year."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>New Strategy Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is there's a new strategy businesses are using to control and negotiate their premiums every year, and I want to show it to you."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>If Under [Amount]:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"That's great! Are you happy with your broker?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>Quoting Is Dead Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is I don't quote. Quoting is dead. Instead, I help businesses implement a strategy to control and negotiate their premiums every year."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>New Strategy Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is there's a new strategy businesses are using to control and negotiate their premiums every year, and I want to show it to you."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>Direct Pitch:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4">
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"I work with [industry type] in [location] who are tired of their premiums going up every year."</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>Quoting Is Dead Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-4 ml-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is I don't quote. Quoting is dead. Instead, I help businesses implement a strategy to control and negotiate their premiums every year."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <strong>New Strategy Path:</strong>
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                            <p className="text-slate-700 dark:text-slate-300 mb-3 font-mono text-sm">
                              <span>"The reason I'm calling is there's a new strategy businesses are using to control and negotiate their premiums every year, and I want to show it to you."</span>
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 m-0 font-mono text-sm">
                              <span>"You've got 15 minutes to see if or how it applies to you?"</span>
                            </p>
                          </div>

                          <p className="text-slate-600 dark:text-slate-400 text-sm italic mb-6">
                            <span>© Copyright 2025 Producer Systems</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                          title: "Script Template",
                          size: "PDF 0.5 MB",
                          icon: FileText
                        }].map((resource, index) => {
                          const Icon = resource.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                    <span>{resource.title}</span>
                                  </h3>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <span>{resource.size}</span>
                                  </p>
                                </div>
                              </div>
                              <button className="p-3 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group-hover:scale-110">
                                <Download className="w-5 h-5" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeNavigatorSection === "prep-conversations" && (
                <motion.div
                  key={activeNavigatorSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto w-full max-w-6xl space-y-6"
                >
                  <EmbeddedScriptBuilder />
                </motion.div>
              )}

              {activeNavigatorSection === "objections-feedback" && (
                <motion.div
                  key={`objections-feedback-${activeTab}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === "lesson" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}
                >
                  {activeTab === "lesson" && (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={objectionsFeedbackThumbnail} className="w-full h-full object-cover">
                            <source src={objectionsFeedbackVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Video - Handling Objections & Feedback</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Collect and refine objections to improve your approach</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Handling Objections & Feedback</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <span>Naturally, you're going to get objections — both from prospects and from yourself. That's part of the process.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>The goal here isn't to avoid objections; it's to collect them, refine them, and use them to sharpen your script. The AI script builder has the objection handling framework and you will use that to continually improve your objection handling.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>Write Down Objections</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Every time you get a new objection or a tough response, write it down. Drop it into the AI Script Builder and ask for feedback or variations on how to handle it. You can also reach out for direct support — we'll walk through it together and tweak your messaging to fit your tone and style.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>Diffuse The Objection</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-3">
                            <span>Every objection gets one simple response:</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-3">
                            <span className="font-semibold">"Not a problem."</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>This diffuses the objection, allows you a minute to think of a rebuttal, and then go back in for the ask.</span>
                          </p>

                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Understanding Objections as Feedback</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>When a prospect pushes back, they're not shutting you down—they're telling you what matters to them. Your job is to listen, document, and refine your approach. Every objection you hear is an opportunity to improve your messaging, build trust, and position yourself as someone who understands their concerns.</span>
                          </p>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>Common Objections You'll Hear</span>
                          </h3>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li>"I'm happy with my current broker"</li>
                            <li>"I don't have time to look at this right now"</li>
                            <li>"Your pricing is too high"</li>
                            <li>"We just renewed our policy"</li>
                            <li>"Send me some information and I'll review it"</li>
                          </ul>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 mb-6">
                            <h4 className="text-slate-900 dark:text-slate-100 mb-3">
                              <span>The key principle:</span>
                            </h4>
                            <ul className="text-slate-700 dark:text-slate-300 space-y-2 m-0">
                              <li>Don't argue with objections—acknowledge them and provide value.</li>
                              <li>Focus on understanding their concern, not just overcoming it.</li>
                            </ul>
                          </div>

                          <h3 className="text-slate-900 dark:text-slate-100">
                            <span>How to Handle Objections</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 mb-4">
                            <span>Use this simple framework:</span>
                          </p>

                          <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                            <li><strong>Acknowledge:</strong> "I understand that..."</li>
                            <li><strong>Clarify:</strong> "Can you tell me more about..."</li>
                            <li><strong>Reframe:</strong> "What if I could show you..."</li>
                            <li><strong>Advance:</strong> "Would it make sense to..."</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                          title: "Objection Handling Guide",
                          size: "PDF 0.8 MB",
                          icon: FileText
                        }].map((resource, index) => {
                          const Icon = resource.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                    <span>{resource.title}</span>
                                  </h3>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    <span>{resource.size}</span>
                                  </p>
                                </div>
                              </div>
                              <button className="p-3 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group-hover:scale-110">
                                <Download className="w-5 h-5" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeNavigatorSection === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      <span>Downloadable Resources</span>
                    </h2>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Download these resources to help you implement the Revenue Stacker framework.
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
                              Revenue Stacker - New Business Growth Engine
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              DOCX • Template
                            </p>
                          </div>
                        </div>
                        <a
                          href={revenueStackerDocx}
                          download="Revenue Stacker _ New Business Growth Engine.docx"
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
                              Revenue Stacker
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              XLSX • Worksheet
                            </p>
                          </div>
                        </div>
                        <a
                          href={revenueStackerXlsx}
                          download="Revenue Stacker.xlsx"
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-300 group-hover:scale-110"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Footer />
          </div>
        </div>
      </motion.div>
    </div>;
};
