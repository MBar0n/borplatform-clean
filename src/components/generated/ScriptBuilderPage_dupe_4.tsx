"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, Play, Menu, X, BookOpen, Target, TrendingUp, FileText, CheckCircle2, Mic, Home, Users, BarChart3, Settings, MessageSquare, Library, Lightbulb, Clock, Eye, RotateCcw, ChevronDown, ArrowLeftRight, FileType, Save } from "lucide-react";
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
type ScriptVersion = {
  id: string;
  timestamp: Date;
  content: string;
  characterCount: number;
  autoSaved: boolean;
  modifiedSections: string[];
};
type VersionHistory = { [key in keyof ScriptContent]: ScriptVersion[] };
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

// Mock version history data
const generateMockVersions = (sectionId: keyof ScriptContent): ScriptVersion[] => {
  const baseTimestamp = new Date();
  const versions: ScriptVersion[] = [];
  for (let i = 0; i < 5; i++) {
    const timestamp = new Date(baseTimestamp.getTime() - i * 3600000); // 1 hour apart
    versions.push({
      id: `${sectionId}-v${i + 1}`,
      timestamp,
      content: `Sample content for ${sectionId} version ${i + 1}`,
      characterCount: 150 + i * 50,
      autoSaved: i % 2 === 0,
      modifiedSections: i === 0 ? ["Opening paragraph", "Conclusion"] : ["Opening paragraph"]
    });
  }
  return versions;
};
export const ScriptBuilderPage = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<TabId>("opening");
  const [scriptContent, setScriptContent] = React.useState<ScriptContent>({
    opening: "",
    decision: "",
    pitch: "",
    proposal: ""
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [comparisonMode, setComparisonMode] = React.useState(false);
  const [selectedVersions, setSelectedVersions] = React.useState<[string | null, string | null]>([null, null]);
  const [previewVersion, setPreviewVersion] = React.useState<ScriptVersion | null>(null);

  // Mock version history
  const [versionHistory] = React.useState<VersionHistory>({
    opening: generateMockVersions("opening"),
    decision: generateMockVersions("decision"),
    pitch: generateMockVersions("pitch"),
    proposal: generateMockVersions("proposal")
  });
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (historyOpen && !target.closest('.history-dropdown') && !target.closest('.history-button')) {
        setHistoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [historyOpen]);
  const currentTab = tabs.find(tab => tab.id === activeTab);
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };
  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };
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
  const getCurrentVersions = () => {
    if (activeTab === "final") return [];
    return versionHistory[activeTab as keyof ScriptContent] || [];
  };
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff % 3600000 / 60000);
    if (hours > 24) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };
  const handleRestoreVersion = (version: ScriptVersion) => {
    if (activeTab !== "final") {
      setScriptContent(prev => ({
        ...prev,
        [activeTab]: version.content
      }));
      setHistoryOpen(false);
      setPreviewVersion(null);
    }
  };
  const handlePreviewVersion = (version: ScriptVersion) => {
    setPreviewVersion(version);
  };
  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    setSelectedVersions([null, null]);
  };
  const selectVersionForComparison = (versionId: string) => {
    if (selectedVersions[0] === null) {
      setSelectedVersions([versionId, null]);
    } else if (selectedVersions[1] === null && selectedVersions[0] !== versionId) {
      setSelectedVersions([selectedVersions[0], versionId]);
    } else {
      setSelectedVersions([versionId, null]);
    }
  };
  const getVersionById = (versionId: string) => {
    const versions = getCurrentVersions();
    return versions.find(v => v.id === versionId);
  };
  const getVersionCount = (tabId: TabId) => {
    if (tabId === "final") return 0;
    return versionHistory[tabId as keyof ScriptContent]?.length || 0;
  };
  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      {leftSidebarOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }} onClick={() => setLeftSidebarOpen(false)} className="fixed inset-0 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-sm z-30" aria-hidden="true" />}

      <motion.aside animate={{
      width: leftSidebarOpen ? 280 : 72
    }} transition={{
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }} className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 flex-shrink-0 flex flex-col shadow-2xl shadow-slate-900/5 overflow-hidden fixed inset-y-0 left-0 z-40`}>
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center">
          {leftSidebarOpen ? <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
                <div className="w-6 h-6 bg-white/90 dark:bg-slate-900/90 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-600">
                  <span>L</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                  <span>Logo Here</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
                  <span>Platform</span>
                </p>
              </div>
            </div> : <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <div className="w-6 h-6 bg-white/90 dark:bg-slate-900/90 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-600">
                <span>L</span>
              </div>
            </div>}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1.5">
            {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = item.active;
            return <motion.button key={item.id} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className={`w-full flex items-center ${leftSidebarOpen ? "justify-start px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-300 relative group ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : "bg-[#e2e8f0] dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} title={!leftSidebarOpen ? item.label : undefined}>
                  {leftSidebarOpen ? <div className="flex items-center gap-3 w-full">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight truncate">
                          <span>{item.label}</span>
                        </div>
                      </div>
                    </div> : <Icon className="w-5 h-5 flex-shrink-0" />}
                </motion.button>;
          })}
          </div>
        </nav>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0 ml-[144px]">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-6 lg:p-12 pr-[360px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md group flex-shrink-0" aria-label="Toggle left sidebar">
                  {leftSidebarOpen ? <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" /> : <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />}
                </button>

                <div className="relative">
                  <button onClick={() => setHistoryOpen(!historyOpen)} className="history-button flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span>History</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${historyOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence mode="wait">
                    {historyOpen && <motion.div initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.95
                  }} transition={{
                    duration: 0.2
                  }} className="history-dropdown absolute top-full left-0 mt-2 w-[480px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                              <span>Version History</span>
                            </h3>
                            <div className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
                              <span>{getCurrentVersions().length}</span>
                            </div>
                          </div>
                          <button onClick={toggleComparisonMode} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${comparisonMode ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            <span>Compare</span>
                          </button>
                        </div>

                        {comparisonMode && selectedVersions[0] && selectedVersions[1] && <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-200 dark:border-emerald-900/30">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">
                                  <span>Comparing versions</span>
                                </p>
                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                  <span>{formatTimestamp(getVersionById(selectedVersions[0])?.timestamp || new Date())}</span>
                                  <ArrowLeftRight className="w-3 h-3" />
                                  <span>{formatTimestamp(getVersionById(selectedVersions[1])?.timestamp || new Date())}</span>
                                </div>
                              </div>
                              <button onClick={() => setSelectedVersions([null, null])} className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                                <span>Clear</span>
                              </button>
                            </div>
                          </div>}

                        <div className="max-h-[480px] overflow-y-auto">
                          {getCurrentVersions().length === 0 ? <div className="p-12 text-center">
                              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                              <p className="text-sm text-slate-500 dark:text-slate-500">
                                <span>No version history yet</span>
                              </p>
                            </div> : <div className="p-4 space-y-3">
                              {getCurrentVersions().map((version, index) => {
                          const isSelected = comparisonMode && (selectedVersions[0] === version.id || selectedVersions[1] === version.id);
                          const isPreviewing = previewVersion?.id === version.id;
                          return <motion.div key={version.id} initial={{
                            opacity: 0,
                            y: 10
                          }} animate={{
                            opacity: 1,
                            y: 0
                          }} transition={{
                            delay: index * 0.05
                          }} onClick={() => comparisonMode && selectVersionForComparison(version.id)} className={`p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' : isPreviewing ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                          <span>{formatTimestamp(version.timestamp)}</span>
                                        </p>
                                        {version.autoSaved && <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                                            <Save className="w-3 h-3" />
                                            <span>Auto-saved</span>
                                          </div>}
                                      </div>
                                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                          <FileType className="w-3.5 h-3.5" />
                                          <span>{version.characterCount} chars</span>
                                        </div>
                                        {version.modifiedSections.length > 0 && <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            <span>{version.modifiedSections.length} section{version.modifiedSections.length !== 1 ? 's' : ''} modified</span>
                                          </div>}
                                      </div>
                                    </div>
                                    {comparisonMode && isSelected && <div className="px-2 py-1 bg-emerald-500 text-white rounded-lg text-xs font-semibold">
                                        <span>✓</span>
                                      </div>}
                                  </div>

                                  {version.modifiedSections.length > 0 && <div className="mb-3">
                                      <div className="flex flex-wrap gap-1.5">
                                        {version.modifiedSections.map((section, idx) => <div key={idx} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded text-xs">
                                            <span>{section}</span>
                                          </div>)}
                                      </div>
                                    </div>}

                                  {!comparisonMode && <div className="flex items-center gap-2">
                                      <button onClick={e => {
                                e.stopPropagation();
                                handlePreviewVersion(version);
                              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Preview</span>
                                      </button>
                                      <button onClick={e => {
                                e.stopPropagation();
                                handleRestoreVersion(version);
                              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-all">
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Restore</span>
                                      </button>
                                    </div>}
                                </motion.div>;
                        })}
                            </div>}
                        </div>

                        {comparisonMode && selectedVersions[0] && selectedVersions[1] && <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                            <button onClick={() => {
                        const v1 = getVersionById(selectedVersions[0]!);
                        const v2 = getVersionById(selectedVersions[1]!);
                        if (v1 && v2) {
                          alert(`Comparing:\nVersion 1: ${v1.characterCount} chars\nVersion 2: ${v2.characterCount} chars\n\nDifference: ${Math.abs(v1.characterCount - v2.characterCount)} chars`);
                        }
                      }} className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                              <span>View Side-by-Side</span>
                            </button>
                          </div>}
                      </motion.div>}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex-1 text-center px-4 min-w-0">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  <span>Script Builder</span>
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  <span>Build your perfect script step by step</span>
                </p>
              </div>

              <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-md group flex-shrink-0" aria-label="Toggle right sidebar">
                {rightSidebarOpen ? <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" /> : <Lightbulb className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />}
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="flex items-start gap-4 mb-6">
                  {currentTab && <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 flex-shrink-0">
                      {React.createElement(currentTab.icon, {
                    className: "w-7 h-7"
                  })}
                    </div>}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      <span>{currentTab?.label}</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      <span>{currentTab?.description}</span>
                    </p>
                  </div>
                </motion.div>

                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const hasContent = tab.id !== "final" && scriptContent[tab.id as keyof ScriptContent]?.trim().length > 0;
                  const versionCount = getVersionCount(tab.id);
                  return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0 relative ${isActive ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"}`}>
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                        {hasContent && !isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        {versionCount > 0 && <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'}`}>
                            <Clock className="w-3 h-3" />
                            <span>{versionCount}</span>
                          </div>}
                      </button>;
                })}
                </div>
              </div>

              {previewVersion && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        <span>Preview: {formatTimestamp(previewVersion.timestamp)}</span>
                      </h3>
                    </div>
                    <button onClick={() => setPreviewVersion(null)} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-slate-700 dark:text-slate-300 text-sm">
                    <p>{previewVersion.content}</p>
                  </div>
                </motion.div>}

              <motion.div key={activeTab} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    <span>Your Script</span>
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {activeTab === "final" ? <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 min-h-[400px] font-mono text-sm whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
                    <p>{getFinalScript() || "Complete the other sections to see your final script here..."}</p>
                  </div> : <textarea value={scriptContent[activeTab as keyof ScriptContent]} onChange={e => handleScriptChange(e.target.value)} placeholder="Begin writing your script here..." className="w-full min-h-[400px] bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl p-6 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none transition-all" />}

                <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                  <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2 font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>Get AI Feedback</span>
                    </button>
                    <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium">
                      <span>Compare</span>
                    </button>
                  </div>
                  {currentIndex < tabs.length - 1 && <button onClick={handleNext} className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 font-medium ml-auto">
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>}
                </div>
              </motion.div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                    <Mic className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    <span>Practice Recording</span>
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group">
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
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {rightSidebarOpen && <motion.aside initial={{
        x: 360,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} exit={{
        x: 360,
        opacity: 0
      }} transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }} className="w-[360px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800/60 flex-shrink-0 flex flex-col shadow-2xl shadow-slate-900/5 overflow-y-auto">
            <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  <span>Examples & Tips</span>
                </h2>
              </div>
              {isMobile && <button onClick={() => setRightSidebarOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close sidebar">
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>}
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
                      <div className="px-2.5 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-semibold">
                        <span>NO</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 flex-1">
                        <span>{exampleContent.decision.ifNo}</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold">
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
          </motion.aside>}
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