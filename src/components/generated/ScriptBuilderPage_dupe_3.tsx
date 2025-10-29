"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, Play, Menu, X, BookOpen, Target, TrendingUp, FileText, CheckCircle2, Mic, Home, Users, BarChart3, Settings, MessageSquare, Library, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
type TabId = "opening" | "decision" | "pitch" | "proposal" | "final";
type Tab = {
  id: TabId;
  label: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};
type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active?: boolean;
};
type ScriptContent = {
  opening: string;
  decision: string;
  pitch: string;
  proposal: string;
};
const navigationItems: NavItem[] = [{
  id: "home",
  label: "Home",
  icon: Home
}, {
  id: "script-builder",
  label: "Script Builder",
  icon: Library,
  active: true
}, {
  id: "analytics",
  label: "Analytics",
  icon: BarChart3
}, {
  id: "team",
  label: "Team",
  icon: Users
}, {
  id: "conversations",
  label: "Conversations",
  icon: MessageSquare
}, {
  id: "settings",
  label: "Settings",
  icon: Settings
}];
const tabs: Tab[] = [{
  id: "opening",
  label: "Opening Introduction",
  description: "Create a warm, professional opening that gets attention without being pushy",
  icon: BookOpen
}, {
  id: "decision",
  label: "Decision Maker",
  description: "Identify and qualify the decision maker",
  icon: Target
}, {
  id: "pitch",
  label: "Pitch",
  description: "Present your value proposition clearly and concisely",
  icon: TrendingUp
}, {
  id: "proposal",
  label: "Proposal",
  description: "Outline next steps and close the conversation",
  icon: FileText
}, {
  id: "final",
  label: "Final Script",
  description: "Complete compiled script from all sections",
  icon: CheckCircle2
}];
const exampleContent = {
  opening: `"Quick question for you—are you the person who handles the commercial insurance, or is that someone else?"`,
  decision: {
    ifNo: "Follow the Gatekeeper Script",
    ifYes: "Continue to Decision Maker Script"
  }
};
const tipsContent = ["Direct and to-the-point question", "Saves time by qualifying early", "Shows you understand business hierarchy", "Prepares different paths based on response"];
export const ScriptBuilderPage = () => {
  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const [tipsDrawerOpen, setTipsDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabId>("opening");
  const [scriptContent, setScriptContent] = React.useState<ScriptContent>({
    opening: "",
    decision: "",
    pitch: "",
    proposal: ""
  });
  const [accordionOpen, setAccordionOpen] = React.useState(false);
  const currentTab = tabs.find(tab => tab.id === activeTab);
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
  const handleScriptChange = (value: string) => {
    if (activeTab !== "final") {
      setScriptContent(prev => ({
        ...prev,
        [activeTab]: value
      }));
    }
  };
  const getFinalScript = () => {
    return `Opening Introduction:\n${scriptContent.opening}\n\nDecision Maker:\n${scriptContent.decision}\n\nPitch:\n${scriptContent.pitch}\n\nProposal:\n${scriptContent.proposal}`;
  };
  return <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-900/5 flex-shrink-0 z-20">
        <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
          <button onClick={() => setNavDrawerOpen(true)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md group flex-shrink-0" aria-label="Open navigation menu">
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
          </button>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <div className="w-6 h-6 bg-white/90 dark:bg-slate-900/90 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-600">
                <span>L</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span>Script Builder</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                <span>Platform</span>
              </p>
            </div>
          </div>

          <button onClick={() => setTipsDrawerOpen(true)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md group flex-shrink-0" aria-label="Open examples and tips">
            <Lightbulb className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-amber-500" />
          </button>
        </div>

        <nav className="border-t border-slate-200/60 dark:border-slate-800/60 px-4 lg:px-6 py-2 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = item.active;
            return <motion.button key={item.id} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className={`group flex items-center justify-center p-3 rounded-xl transition-all duration-300 relative ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"}`} title={item.label}>
                  <Icon className="w-5 h-5" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </motion.button>;
          })}
          </div>
        </nav>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-8 lg:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
              <span>Build Your Perfect Script</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              <span>Step-by-step script creation with AI-powered feedback</span>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/5 overflow-hidden">
            <div className="flex">
              <div className="w-16 lg:w-20 flex-shrink-0 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-800 py-8 px-2">
                {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const hasContent = tab.id !== "final" && scriptContent[tab.id as keyof ScriptContent]?.trim().length > 0;
                const isCompleted = index < currentIndex;
                return <div key={tab.id} className="flex flex-col items-center mb-6 last:mb-0">
                      <motion.button onClick={() => setActiveTab(tab.id)} whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.95
                  }} className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30" : isCompleted ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-2 border-slate-200 dark:border-slate-700"}`} title={tab.label}>
                        <Icon className="w-5 h-5" />
                        {hasContent && !isActive && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />}
                      </motion.button>
                      {index < tabs.length - 1 && <div className={`w-0.5 h-8 my-2 transition-all duration-300 ${isCompleted ? "bg-emerald-400 dark:bg-emerald-600" : "bg-slate-200 dark:bg-slate-700"}`} />}
                    </div>;
              })}
              </div>

              <div className="flex-1 p-6 lg:p-8">
                <motion.div key={activeTab} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.4
              }}>
                  <div className="flex items-start gap-4 mb-6">
                    {currentTab && <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 flex-shrink-0">
                        {React.createElement(currentTab.icon, {
                      className: "w-7 h-7"
                    })}
                      </div>}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2">
                        <span>{currentTab?.label}</span>
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        <span>{currentTab?.description}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        <span>Your Script</span>
                      </h3>
                      <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>

                    {activeTab === "final" ? <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 min-h-[400px] font-mono text-sm whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
                        <p>{getFinalScript() || "Complete the other sections to see your final script here..."}</p>
                      </div> : <textarea value={scriptContent[activeTab as keyof ScriptContent]} onChange={e => handleScriptChange(e.target.value)} placeholder="Begin writing your script here..." className="w-full min-h-[400px] bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl p-6 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none transition-all" />}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                    <div className="flex flex-wrap gap-3">
                      <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2 font-medium text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Get AI Feedback</span>
                      </button>
                      <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium text-sm">
                        <span>Compare</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {currentIndex > 0 && <button onClick={() => setActiveTab(tabs[currentIndex - 1].id)} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 font-medium text-sm">
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>}
                      {currentIndex < tabs.length - 1 && <button onClick={() => setActiveTab(tabs[currentIndex + 1].id)} className="px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 font-medium text-sm">
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex-shrink-0">
                  <Mic className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  <span>Practice Recording</span>
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group flex-shrink-0">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span>Click play to start practicing this stage.</span>
                  </p>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  <span>0:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 p-6 lg:p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  <span>Examples & Tips</span>
                </h3>
              </div>
              {accordionOpen ? <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
            </button>

            <AnimatePresence mode="wait">
              {accordionOpen && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: "auto",
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden">
                  <div className="mt-4 space-y-4">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-3xl p-6 lg:p-8 border border-amber-200/50 dark:border-amber-900/30">
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          <span>Example</span>
                        </h4>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-amber-100 dark:border-amber-900/30">
                          <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                            <span>{exampleContent.opening}</span>
                          </p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <div className="px-2.5 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-semibold flex-shrink-0">
                              <span>NO</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 flex-1">
                              <span>{exampleContent.decision.ifNo}</span>
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold flex-shrink-0">
                              <span>YES</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 flex-1">
                              <span>{exampleContent.decision.ifYes}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          <span>Tips</span>
                        </h4>
                      </div>
                      <ul className="space-y-4">
                        {tipsContent.map((tip, index) => <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                            </div>
                            <span className="leading-relaxed">{tip}</span>
                          </li>)}
                      </ul>
                    </div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {navDrawerOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" onClick={() => setNavDrawerOpen(false)}>
            <motion.aside initial={{
          x: -320
        }} animate={{
          x: 0
        }} exit={{
          x: -320
        }} transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1]
        }} onClick={e => e.stopPropagation()} className="absolute top-0 left-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/20 flex flex-col">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <div className="w-6 h-6 bg-white/90 dark:bg-slate-900/90 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-600">
                      <span>L</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      <span>Logo Here</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      <span>Platform</span>
                    </p>
                  </div>
                </div>
                <button onClick={() => setNavDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close navigation">
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = item.active;
                return <motion.button key={item.id} whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className={`w-full flex items-center justify-start px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`}>
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </motion.button>;
              })}
                </div>
              </nav>
            </motion.aside>
          </motion.div>}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {tipsDrawerOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" onClick={() => setTipsDrawerOpen(false)}>
            <motion.aside initial={{
          x: 360
        }} animate={{
          x: 0
        }} exit={{
          x: 360
        }} transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1]
        }} onClick={e => e.stopPropagation()} className="absolute top-0 right-0 bottom-0 w-[360px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/20 flex flex-col overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    <span>Examples & Tips</span>
                  </h2>
                </div>
                <button onClick={() => setTipsDrawerOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close tips">
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-6">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-3xl p-6 border border-amber-200/50 dark:border-amber-900/30">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      <span>Example</span>
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-amber-100 dark:border-amber-900/30">
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        <span>{exampleContent.opening}</span>
                      </p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="px-2.5 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-semibold flex-shrink-0">
                          <span>NO</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 flex-1">
                          <span>{exampleContent.decision.ifNo}</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold flex-shrink-0">
                          <span>YES</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 flex-1">
                          <span>{exampleContent.decision.ifYes}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      <span>Tips</span>
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {tipsContent.map((tip, index) => <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        </div>
                        <span className="leading-relaxed">{tip}</span>
                      </li>)}
                  </ul>
                </motion.div>
              </div>
            </motion.aside>
          </motion.div>}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>;
};