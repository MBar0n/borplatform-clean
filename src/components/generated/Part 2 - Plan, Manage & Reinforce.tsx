"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MessageSquare, FileText, BookOpen, Download, Award, Search, Target, TrendingUp, Check, Clock, Hammer, Phone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import buildBlockThumbnail from "@/assets/images/build_block.png";
import buildBlockVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Build Your Prospecting Block.mp4";
import manageCallsVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Manage Calls + Opportunities.mp4";
import prospectingConfidenceVideo from "@/assets/videos/revenue_stacker/Revenue Stacker -Prospecting Confidence.mp4";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { Footer } from "@/components/shared/Footer";

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

// Shared icon for Revenue Stacker - used in sidebar and back button
const RevenueStackerIcon = MessageSquare;

const navigatorSections: NavigatorSection[] = [{
  id: "build-block",
  title: "Step 4 · Build Your Prospecting Block",
  summary: "Generate appointments fast!",
  icon: Hammer,
  accent: "from-purple-500 via-pink-500 to-purple-600"
}, {
  id: "manage-calls",
  title: "Step 5 · Manage Calls + Opportunities",
  summary: "Cold or follow-up?",
  icon: Phone,
  accent: "from-indigo-500 via-blue-500 to-indigo-600"
}, {
  id: "prospecting-confidence",
  title: "Step 6 · Prospecting Confidence",
  summary: "Show up and run it!",
  icon: Sparkles,
  accent: "from-rose-500 via-pink-500 to-rose-600"
}];

const navigatorPageContent: Record<NavigatorSection["id"], NavigatorPageConfig> = {
  "build-block": {
    title: "Build Your Prospecting Block",
    stageLabel: "Revenue Stacker - Step 4",
    stageIcon: Hammer,
    stageClassName: "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
    nextStepTag: "Step 5"
  },
  "manage-calls": {
    title: "Manage Calls + Opportunities",
    stageLabel: "Revenue Stacker - Step 5",
    stageIcon: Phone,
    stageClassName: "bg-indigo-100 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400",
    nextStepTag: "Step 6"
  },
  "prospecting-confidence": {
    title: "Prospecting Confidence",
    stageLabel: "Revenue Stacker - Step 6",
    stageIcon: Sparkles,
    stageClassName: "bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400",
    nextStepTag: "Complete"
  }
};

export const ExecuteBuildPlanPage = () => {
  const [activeTab, setActiveTab] = React.useState<"lesson" | "resources">("lesson");
  const [workspaceSidebarOpen, setWorkspaceSidebarOpen] = React.useState(true);
  const [isNavigatorMobile, setIsNavigatorMobile] = React.useState(false);
  const [activeNavigatorSection, setActiveNavigatorSection] = React.useState(navigatorSections[0].id);

  React.useEffect(() => {
    setActiveTab("lesson");
  }, [activeNavigatorSection]);

  React.useEffect(() => {
    const checkViewport = () => {
      const navigatorIsMobile = window.innerWidth < 1280;
      setIsNavigatorMobile(navigatorIsMobile);
      if (navigatorIsMobile) {
        setWorkspaceSidebarOpen(false);
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const tabs = React.useMemo(
    () => [
      { id: "lesson" as const, label: "Lesson", icon: BookOpen },
      { id: "resources" as const, label: "Resources", icon: Download },
    ],
    [],
  );

  const currentPageConfig = navigatorPageContent[activeNavigatorSection as keyof typeof navigatorPageContent];

  const handleNextPhase = React.useCallback(() => {
    const currentIndex = navigatorSections.findIndex((section) => section.id === activeNavigatorSection);

    // If we're on the last step (Step 6 - prospecting-confidence), navigate to Network Engager
    if (activeNavigatorSection === "prospecting-confidence") {
      window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "network-engager" } }));
      return;
    }

    const nextIndex = (currentIndex + 1) % navigatorSections.length;
    setActiveNavigatorSection(navigatorSections[nextIndex].id);
  }, [activeNavigatorSection]);

  const getNextPhaseLabel = React.useCallback(() => {
    // If we're on Step 6, next stage is Network Engager
    if (activeNavigatorSection === "prospecting-confidence") {
      return "Network Engager";
    }

    const currentIndex = navigatorSections.findIndex((section) => section.id === activeNavigatorSection);
    const nextIndex = (currentIndex + 1) % navigatorSections.length;
    const nextSection = navigatorSections[nextIndex];

    if (nextSection.id === "build-block") return "Step 4";
    if (nextSection.id === "manage-calls") return "Step 5";
    if (nextSection.id === "prospecting-confidence") return "Step 6";
    return "Next";
  }, [activeNavigatorSection]);

  return <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950">
      <LeftSidebar activePage="revenue-stacker" />

      {/* Main Content Area */}
      <motion.div className="flex-1 flex overflow-hidden min-w-0 ml-[72px]">
        {/* Workspace Navigator Sidebar */}
        <motion.div animate={{
          width: workspaceSidebarOpen ? 320 : 0
        }} transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1]
        }} className="border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5 flex-shrink-0 flex flex-col overflow-hidden">
          {workspaceSidebarOpen && <>
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Part 2
              </p>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Plan, Manage & Reinforce
              </h2>
            </div>

            <div className="px-6 py-5 space-y-5 overflow-y-auto">
              <div className="space-y-3">
                {navigatorSections.map(section => {
                const Icon = section.icon;
                const isActive = activeNavigatorSection === section.id;
                return <button key={section.id} type="button" onClick={() => setActiveNavigatorSection(section.id)} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition w-full ${isActive ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200/80"}`}>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${section.accent} text-white flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className={`text-sm font-semibold ${isActive ? "text-emerald-700 dark:text-emerald-300" : "text-slate-900 dark:text-slate-100"}`}>
                        {section.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {section.summary}
                      </p>
                    </div>
                  </button>;
              })}
              </div>
            </div>
          </>}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="relative flex items-center mb-4">
              <div className="absolute left-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 flex gap-2 z-10">
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'revenue-stacker' } }))} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Back to Revenue Stacker">
                  <RevenueStackerIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                </button>
                <div className="h-full w-px bg-slate-200 dark:bg-slate-800" />
                <button onClick={() => setWorkspaceSidebarOpen(!workspaceSidebarOpen)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Toggle workspace sidebar">
                  {workspaceSidebarOpen ? <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" /> : <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />}
                </button>
                <div className="h-full w-px bg-slate-200 dark:bg-slate-800" />
                <button
                  type="button"
                  onClick={handleNextPhase}
                  className="px-4 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0"
                  aria-label="Go to next stage"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    Next Stage
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                      {getNextPhaseLabel()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div initial={{
                scale: 0.8,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-3 ${currentPageConfig.stageClassName}`}>
                  <currentPageConfig.stageIcon className="w-4 h-4" />
                  <span>{currentPageConfig.stageLabel}</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>{currentPageConfig.title}</span>
                </h1>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
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
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {activeNavigatorSection === "build-block" && <motion.div key={`build-block-${activeTab}`} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.3
            }} className={`${activeTab === "lesson" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}>
                  {activeTab === "lesson" && <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls poster={buildBlockThumbnail} className="w-full h-full object-cover">
                            <source src={buildBlockVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Video - Build Your Prospecting Block</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Learn how to structure your prospecting time for maximum efficiency</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Build Your Prospecting Block</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                            <span>The Revenue Stacker Prospecting Block is designed to help you generate appointments fast — by creating a structured window where you can focus entirely on cold calls and stacking new opportunities. This is the engine that feeds your 90-day revenue push.</span>
                          </p>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                            <span>When to Run It</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            <span>Do it first thing in the morning — before the day hijacks you. Start at 7:30 a.m. or 8:00 a.m. and commit to a 90-minute block.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span>Break it down into:</span>
                          </p>

                          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4 ml-4">
                            <li>Two 40-minute sprint sessions</li>
                            <li>One 10-minute break in between</li>
                          </ul>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Target 4X per week</span>
                          </p>

                          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4 ml-4">
                            <li>Monday - Thursday</li>
                            <li>Friday Flex Block</li>
                          </ul>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">200 Calls</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">6-10 Prospect Interview Calls</span>
                          </p>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                            <span>How to Run It</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Set a timer for 40 minutes.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 ml-4">
                            <span>The clock creates urgency and keeps you from overthinking.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Shut off distractions.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 ml-4">
                            <span>No phone. No email. No scrolling.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Work from your list.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 ml-4">
                            <span>Hit 25 calls per sprint (≈ 50 calls total).</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Mark your calendar as busy — this is a non-negotiable meeting with your future revenue.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 ml-4">
                            <span>Communicate to whoever needs to know: account managers, team, spouse, kids, or anyone else.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Immediately after, run a 30-minute "Reactive Block."</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 ml-4">
                            <span>This is when you check emails, return calls, and handle anything that came in while you were focused.</span>
                          </p>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                            <span>Afternoon Flex Block</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span className="font-semibold">Add a second short block — 15 to 30 minutes — later in the day.</span>
                          </p>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 ml-4">
                            <span>Use it as a release valve for missed calls, follow-ups, or quick re-engagements that popped up after your morning session.</span>
                          </p>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                            <span>Calendar Setup</span>
                          </h3>

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            <span>Create three recurring events in your calendar:</span>
                          </p>

                          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4 ml-4">
                            <li>Revenue Stacker Prospecting Block (AM) — 90 min</li>
                            <li>Reactive Block — 30 min</li>
                            <li>Revenue Stacker 2 (PM) — 15–30 min</li>
                          </ul>
                        </div>
                      </div>
                    </div>}

                  {activeTab === "resources" && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                        title: "Prospecting Block Template",
                        size: "PDF 0.5 MB",
                        icon: FileText
                      }].map((resource, index) => {
                        const Icon = resource.icon;
                        return <motion.div key={index} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} transition={{
                          delay: index * 0.1
                        }} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group">
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
                          </motion.div>;
                      })}
                      </div>
                    </div>}
                </motion.div>}

              {activeNavigatorSection === "manage-calls" && <motion.div key={`manage-calls-${activeTab}`} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.3
            }} className={`${activeTab === "lesson" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}>
                  {activeTab === "lesson" && <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls className="w-full h-full object-cover">
                            <source src={manageCallsVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Video - Manage Calls + Opportunities</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Learn how to track and optimize your prospecting pipeline</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                          <span>Manage Calls + Opportunities</span>
                        </h2>

                        {/* Cold Calls Section */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                          <span>Cold Calls</span>
                        </h3>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>A cold call means you've never connected with this contact before.</span>
                        </p>

                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-6 ml-4">
                          <li>When you call, leave a voicemail and immediately log the attempt.</li>
                          <li>Use whatever tool fits your workflow — Excel, CRM, or your X-date software — to track call attempts (Call 1, Call 2, etc.).</li>
                          <li>Space calls every 3–5 days, leading up to roughly 10–15 days before the renewal.</li>
                          <li>The goal each day is 50 total dials or touches, not 50 new prospects.</li>
                        </ul>

                        {/* Follow-Up Calls Section */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                          <span>Follow-Up Calls</span>
                        </h3>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>The moment you've made contact (decision maker or gatekeeper), mark that lead as a follow-up.</span>
                        </p>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>When you start your daily block, always call your follow-ups first.</span>
                        </p>

                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4 ml-4">
                          <li>If you have 5 follow-ups → make those 5 first.</li>
                          <li>If you have 10 → make those 10.</li>
                        </ul>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                          <span>Once follow-ups are complete, fill the rest of your block with cold calls or voicemail re-touches.</span>
                        </p>

                        {/* 15 Minute Call Decision Section */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                          <span>15 Minute Call Decision</span>
                        </h3>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>Determine ahead of time if you are going to take the 15 minute calls during your call block or if you are going to schedule them out.</span>
                        </p>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                          <span className="font-semibold">Two options:</span>
                        </p>

                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-6 ml-4">
                          <li>Take it live on the call - simply adjust your call block ahead of time</li>
                          <li>Schedule the 15 minute call for later that day or later in the week</li>
                        </ul>

                        {/* Manage Your Opportunities Section */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                          <span>Manage Your Opportunities</span>
                        </h3>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>You're always working across a rolling four-month window — the current month plus the next three. Each month represents a mini-pipeline that needs its own balance.</span>
                        </p>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>Review your X-date pipeline weekly.</span>
                        </p>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          <span>Look at each active month and count how many open opportunities (prospect interview calls or live deals) you have.</span>
                        </p>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                          <span>If one month is light — for example</span>
                        </p>

                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4 ml-4">
                          <li>December → 10 opportunities</li>
                          <li>November → only 2 — then shift your next couple of days' calls toward the lighter month.</li>
                        </ul>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="font-semibold">The objective: keep every month in play. Balanced months = consistent cash flow = steady momentum.</span>
                        </p>
                      </div>
                    </div>}

                  {activeTab === "resources" && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                        title: "Call Tracking Template",
                        size: "PDF 0.6 MB",
                        icon: FileText
                      }].map((resource, index) => {
                        const Icon = resource.icon;
                        return <motion.div key={index} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} transition={{
                          delay: index * 0.1
                        }} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group">
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
                          </motion.div>;
                      })}
                      </div>
                    </div>}
                </motion.div>}

              {activeNavigatorSection === "prospecting-confidence" && <motion.div key={`prospecting-confidence-${activeTab}`} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.3
            }} className={`${activeTab === "lesson" ? "max-w-5xl" : "max-w-4xl"} mx-auto space-y-6`}>
                  {activeTab === "lesson" && <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                        <div className="relative aspect-video bg-slate-900">
                          <video controls className="w-full h-full object-cover">
                            <source src={prospectingConfidenceVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            <span>Video - Prospecting Confidence</span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span>Build confidence through consistent practice and improvement</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>Prospecting Confidence</span>
                          </h2>

                          <div className="space-y-6 text-slate-700 dark:text-slate-300">
                            <p>
                              Confidence comes from keeping commitments. The fastest way to build belief in yourself — and in your system — is to do exactly what you said you would do. If you put a prospecting block on your calendar, protect it, show up, and run it.
                            </p>

                            <p>
                              Each time you keep that promise, your confidence compounds. Each time you skip it, it chips away.
                            </p>

                            <p>
                              But sometimes, something blocks you. That resistance — whether technical or mental — is what we call a revenue leak. Your job is to find it and plug the leak.
                            </p>

                            <div className="mt-8">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                Identify the Revenue Leak
                              </h3>
                              <p className="mb-4">
                                If you're sitting down to prospect and it's not happening, pause and ask:
                              </p>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Is it a system leak? (weak list, missing numbers, poor prep?)</li>
                                <li>Is it a structure leak? (you didn't shut off email, too many distractions?)</li>
                                <li>Or is it a mindset leak? (call reluctance, fear of rejection, stories about losing clients?)</li>
                              </ul>
                              <p className="mt-4">
                                Whatever shows up, you don't cancel the block — you use it to solve the problem.
                              </p>
                            </div>

                            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                Mindset Leak
                              </h3>
                              <p className="mb-4 font-semibold">
                                Run the Battle Beliefs Framework
                              </p>
                              <div className="space-y-4">
                                <div>
                                  <p className="font-semibold text-slate-900 dark:text-slate-100">Identify the belief | What's the problem with that? What's stopping me?</p>
                                  <p className="text-sm mt-1 italic">ex. If I shut off my phone and email my clients will leave me</p>
                                </div>
                                <ul className="list-disc pl-6 space-y-2">
                                  <li>What makes me believe this?</li>
                                  <li>What story am I telling myself about it?</li>
                                  <li>What advice would I give to someone else in this same spot?</li>
                                  <li>What's a better story I can tell?</li>
                                  <li>What do I want to believe moving forward?</li>
                                </ul>
                                <p className="mt-4">
                                  Write your answers out. Uncover the revenue leak and what's holding you back. Reframe the story and belief daily and move forward with the prospecting block.
                                </p>
                              </div>
                            </div>

                            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                System + Structure Leak
                              </h3>
                              <p>
                                Identify the system or structure leak and make an adjustment to the game plan. Address the challenge, make adjustments, and adapt to move forward with the prospecting.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}

                  {activeTab === "resources" && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        <span>Downloadable Resources</span>
                      </h2>
                      <div className="space-y-4">
                        {[{
                        title: "Confidence Building Guide",
                        size: "PDF 0.7 MB",
                        icon: FileText
                      }].map((resource, index) => {
                        const Icon = resource.icon;
                        return <motion.div key={index} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} transition={{
                          delay: index * 0.1
                        }} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group">
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
                          </motion.div>;
                      })}
                      </div>
                    </div>}
                </motion.div>}
            </AnimatePresence>
            <Footer />
          </div>
        </div>
      </motion.div>
    </div>;
};
