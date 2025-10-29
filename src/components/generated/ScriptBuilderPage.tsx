"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, Play, Menu, X, BookOpen, Target, TrendingUp, FileText, CheckCircle2, Mic, Home, Users, BarChart3, Settings, MessageSquare, Library, Lightbulb, Grid3x3, Edit3, Search, Copy, Trash2, Clock, Calendar, LayoutGrid, FileEdit, Eye, RotateCcw, ChevronDown, ArrowLeftRight, FileType, Save, LogOut, UserCircle2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
import scriptBackground from "@/assets/images/script_background.png";
import { useAuth } from "@/contexts/AuthContext";
import { deriveUserProfile } from "@/lib/auth/user";
import { ScriptBuilderNavigation, ScriptBuilderTab } from "@/components/script-builder/ScriptBuilderNavigation";
type ViewMode = "editor" | "library";
type TabId = "opening" | "decision" | "pitch" | "proposal" | "final";
type Tab = ScriptBuilderTab<TabId> & {
  description: string;
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
type ScriptCard = {
  id: string;
  title: string;
  createdDate: string;
  modifiedDate: string;
  completionPercentage: number;
  preview: string;
  status: "completed" | "in-progress" | "archived";
};
type FilterType = "all" | "completed" | "in-progress" | "archived";
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
  id: "opportunities",
  label: "Opportunity Converter",
  icon: BarChart3
}, {
  id: "network",
  label: "Prospect Reactivator",
  icon: Users
}, {
  id: "revenue-stacker",
  label: "Revenue Stacker",
  icon: MessageSquare,
  active: true
}, {
  id: "network-engager",
  label: "Network Engager",
  icon: Library
}, {
  id: "bor-bro",
  label: "BOR BRO",
  icon: Bot
}];
const tabs: Tab[] = [{
  id: "opening",
  label: "Opening Introduction",
  description: "Make them say yes by saying no",
  icon: BookOpen
}, {
  id: "decision",
  label: "Decision Maker",
  description: "Identify their position",
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
// Dynamic content for each section
const sectionContent: {
  [key: string]: {
    example: string;
    tips: string[];
    subheading?: string;
    example2?: string;
    subheading2?: string;
  };
} = {
  opening: {
    example: `"Hi [First Name], this is [Your Name] with [Agency Name]. Am I catching you at a bad time?"`,
    tips: [
      "If Yes:",
      "  \"No worries—I can call back. What works better, later today at 1:00 or tomorrow at 9:00?\"",
      "Set a follow-up in your CRM and call back",
      "If No:",
      "Continue to the Decision Maker"
    ]
  },
  decision: {
    example: `"Quick question for you—are you the person who handles the commercial insurance, or is that someone else?"`,
    tips: [
      "If Yes:",
      "Continue to Decision Maker Script",
      "If No:",
      "Follow the Gatekeeper Script"
    ]
  },
  pitch: {
    example: `"Alright, cool. I'm guessing you get a ton of calls from insurance brokers. Is it over or under 10 a week?"\n\n"Let me guess, they are all calling to quote. Is that right?"`,
    subheading: "Playful Pitch",
    example2: `"Alright, cool. I'll keep this quick."`,
    subheading2: "Direct Pitch",
    tips: [
      "Choose a path",
      "Quoting Is Dead",
      "New Strategy",
      "Ask for the 15-minute call"
    ]
  },
  proposal: {
    example: `"Awesome — we're set to meet on [Day] at [Time]. I'll send over the calendar invite."\n\n"And real quick, before we jump off. What are you most excited about with this new strategy?"\n\n"Alright, cool. We will dive into that on our call."`,
    tips: [
      "You don't need to prepare for every objection up front.",
      "Instead, learn the rhythm:",
      "Acknowledge → Defuse → Ask Again"
    ]
  },
  final: {
    example: `This is your complete compiled script combining all sections. Review it for flow and consistency.`,
    tips: [
      "Read through the entire script",
      "Check for smooth transitions",
      "Ensure consistent tone throughout",
      "Practice out loud multiple times",
      "Time yourself to stay within limits"
    ]
  }
};

// Mock script library data
const mockScripts: ScriptCard[] = [];

// Standard script templates
const standardScripts: ScriptCard[] = [{
  id: "standard-1",
  title: "Script 1",
  createdDate: "2024-01-01",
  modifiedDate: "2024-01-01",
  completionPercentage: 0,
  preview: "Template placeholder - to be updated",
  status: "in-progress"
}, {
  id: "standard-2",
  title: "Script 2",
  createdDate: "2024-01-01",
  modifiedDate: "2024-01-01",
  completionPercentage: 0,
  preview: "Template placeholder - to be updated",
  status: "in-progress"
}, {
  id: "standard-3",
  title: "Script 3",
  createdDate: "2024-01-01",
  modifiedDate: "2024-01-01",
  completionPercentage: 0,
  preview: "Template placeholder - to be updated",
  status: "in-progress"
}];

// Mock version history data
const generateMockVersions = (sectionId: keyof ScriptContent): ScriptVersion[] => {
  const baseTimestamp = new Date();
  const versions: ScriptVersion[] = [];
  for (let i = 0; i < 5; i++) {
    const timestamp = new Date(baseTimestamp.getTime() - i * 3600000); // 1 hour apart
    versions.push({
      id: `${sectionId}-v${i + 1}`,
      timestamp,
      content: `Sample content for ${sectionId} version ${i + 1}. This is a ${i === 0 ? 'recent' : 'previous'} version of your script with different wording and structure.`,
      characterCount: 150 + i * 50,
      autoSaved: i % 2 === 0,
      modifiedSections: i === 0 ? ["Opening paragraph", "Conclusion"] : ["Opening paragraph"]
    });
  }
  return versions;
};
export const ScriptBuilderPage = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<TabId>("opening");
  const [scriptContent, setScriptContent] = React.useState<ScriptContent>({
    opening: "",
    decision: "",
    pitch: "",
    proposal: ""
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("editor");
  const [filterType, setFilterType] = React.useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [comparisonMode, setComparisonMode] = React.useState(false);
  const [selectedVersions, setSelectedVersions] = React.useState<[string | null, string | null]>([null, null]);
  const [previewVersion, setPreviewVersion] = React.useState<ScriptVersion | null>(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [aiFeedback, setAiFeedback] = React.useState<{[key in keyof ScriptContent]?: string}>({});
  const [aiFeedbackLoading, setAiFeedbackLoading] = React.useState(false);
  const { user, signOut: signOutUser } = useAuth();
  const profile = React.useMemo(() => deriveUserProfile(user), [user]);

  const dispatchNavigation = React.useCallback((page: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("navigate", { detail: { page } }));
  }, []);

  const handleUserButtonClick = React.useCallback(() => {
    if (!profile.isAuthenticated) {
      dispatchNavigation("sign-in");
      return;
    }
    setUserMenuOpen(prev => !prev);
  }, [dispatchNavigation, profile.isAuthenticated]);

  const handleSignOut = React.useCallback(async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setUserMenuOpen(false);
      dispatchNavigation("sign-in");
    }
  }, [dispatchNavigation, signOutUser]);

  React.useEffect(() => {
    if (!profile.isAuthenticated) {
      setUserMenuOpen(false);
    }
  }, [profile.isAuthenticated]);

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
  const tabCompletion = React.useMemo<Partial<Record<TabId, boolean>>>(() => ({
    opening: scriptContent.opening.trim().length > 0,
    decision: scriptContent.decision.trim().length > 0,
    pitch: scriptContent.pitch.trim().length > 0,
    proposal: scriptContent.proposal.trim().length > 0
  }), [scriptContent]);
  const activeFeedbackValue = aiFeedback[activeTab as keyof ScriptContent];
  const activeFeedbackText = typeof activeFeedbackValue === "string" ? activeFeedbackValue : "";
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

  const handleGetAiFeedback = async () => {
    if (activeTab === "final") return; // Don't allow AI feedback for final script

    const currentContent = scriptContent[activeTab as keyof ScriptContent];
    if (!currentContent || currentContent.trim().length === 0) {
      alert("Please write some content first before getting AI feedback.");
      return;
    }

    setAiFeedbackLoading(true);

    try {
      const response = await fetch('https://boropsys.app.n8n.cloud/webhook/1af76565-046f-44d5-9608-0b4969f9deb0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: activeTab,
          content: currentContent,
          stageName: tabs.find(t => t.id === activeTab)?.label || activeTab
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI feedback');
      }

      const data = await response.json();

      const extractedFeedback =
        typeof data.feedback === "string" ? data.feedback :
        typeof data.message === "string" ? data.message :
        typeof data.message?.content === "string" ? data.message.content :
        typeof data.message?.content?.AIFeedback === "string" ? data.message.content.AIFeedback :
        typeof data.content === "string" ? data.content :
        null;

      if (!extractedFeedback) {
        console.warn("Unexpected AI feedback payload", data);
        throw new Error("Invalid AI feedback response format");
      }

      // Store the feedback for the current stage
      setAiFeedback(prev => ({
        ...prev,
        [activeTab]: extractedFeedback
      }));

    } catch (error) {
      console.error('Error getting AI feedback:', error);
      alert('Failed to get AI feedback. Please try again.');
    } finally {
      setAiFeedbackLoading(false);
    }
  };

  const closeFeedback = () => {
    if (activeTab !== "final") {
      setAiFeedback(prev => {
        const newFeedback = { ...prev };
        delete newFeedback[activeTab as keyof ScriptContent];
        return newFeedback;
      });
    }
  };

  // Filter and search scripts
  const filteredScripts = React.useMemo(() => {
    let filtered = mockScripts;

    // Apply filter
    if (filterType !== "all") {
      filtered = filtered.filter(script => script.status === filterType);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(script => script.title.toLowerCase().includes(query) || script.preview.toLowerCase().includes(query));
    }

    // Limit to 3 scripts
    return filtered.slice(0, 3);
  }, [filterType, searchQuery]);

  // Get standard scripts (templates)
  const recentScripts = React.useMemo(() => {
    return standardScripts;
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400";
      case "in-progress":
        return "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400";
      case "archived":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "archived":
        return "Archived";
      default:
        return status;
    }
  };
  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <AnimatePresence mode="wait">
        {leftSidebarOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} onClick={() => setLeftSidebarOpen(false)} className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-sm z-30" aria-hidden="true" />}
      </AnimatePresence>

      <motion.aside initial={false} animate={{
      width: leftSidebarOpen ? 280 : 72
    }} transition={{
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }} className={`${leftSidebarOpen ? 'bg-white dark:bg-slate-900' : 'bg-white/80 dark:bg-slate-900/80'} backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 flex-shrink-0 flex flex-col shadow-2xl shadow-slate-900/5 overflow-hidden fixed inset-y-0 left-0 z-40`}>
        <div className="p-6 flex items-center justify-center">
          {leftSidebarOpen ? <div className="flex items-center gap-3 w-full">
              <img src={logoLarge} alt="BOR Operating System" className="w-full h-auto object-contain" />
            </div> : <img src={logoSmall} alt="BOR Operating System" className="w-14 h-14 object-contain" />}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1.5">
            {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = item.active;
            return <motion.button key={item.id} onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: { page: item.id === 'script-builder' ? 'script-builder-hub' : item.id } }));
            }} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className={`w-full flex items-center ${leftSidebarOpen ? "justify-start px-4 py-3" : "justify-center aspect-square py-3"} rounded-xl transition-all duration-300 relative group ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : leftSidebarOpen ? "bg-[#e2e8f0] dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800" : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} title={!leftSidebarOpen ? item.label : undefined}>
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

        {/* User Profile Section */}
        <div className="p-4 mt-auto">
          <div className="relative">
            <motion.button onClick={handleUserButtonClick} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className={`w-full flex items-center ${leftSidebarOpen ? "justify-between px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-300 group`}>
              {leftSidebarOpen ? <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-sm shadow-lg flex-shrink-0" style={{ backgroundColor: '#ced57f', color: '#134d3e' }}>
                    <span>{profile.initials}</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      <span>{profile.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      <span>{profile.subtitle}</span>
                    </div>
                  </div>
                  {profile.isAuthenticated ? (
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${userMenuOpen ? "rotate-180" : ""}`} />
                  ) : null}
                </div> : <div className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-sm shadow-lg" style={{ backgroundColor: '#ced57f', color: '#134d3e' }}>
                  <span>{profile.initials}</span>
                </div>}
            </motion.button>

            <AnimatePresence>
              {profile.isAuthenticated && userMenuOpen && <motion.div initial={{
              opacity: 0,
              y: 10,
              scale: 0.95
            }} animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }} exit={{
              opacity: 0,
              y: 10,
              scale: 0.95
            }} transition={{
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }} className={`absolute ${leftSidebarOpen ? "left-0 right-0" : "left-full ml-3"} bottom-full mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50`} style={{
              minWidth: leftSidebarOpen ? "auto" : "240px"
            }}>
                  <div className="p-3 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-left group">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                        <UserCircle2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          <span>View Profile</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <span>Manage your account</span>
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-left group">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                        <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          <span>Account Settings</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <span>Preferences & privacy</span>
                        </div>
                      </div>
                    </button>

                    <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 dark:group-hover:bg-red-950/50 transition-colors">
                        <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-sm font-medium text-red-600 dark:text-red-400">
                          <span>Sign Out</span>
                        </div>
                        <div className="text-xs text-red-500 dark:text-red-500">
                          <span>Log out of your account</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse/Expand button at bottom */}
        <div className="p-4">
          <button onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className={`w-full p-3 rounded-xl transition-all duration-300 group flex ${leftSidebarOpen ? "justify-between items-center" : "justify-center"}`} aria-label="Toggle left sidebar">
            {leftSidebarOpen ? (
              <>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Collapse</span>
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
              </>
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
            )}
          </button>
        </div>
      </motion.aside>

      <motion.div className="flex-1 flex flex-col overflow-hidden min-w-0 ml-[72px]">
        <div className="flex-1 overflow-y-auto" style={{
          backgroundImage: `url(${scriptBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className={`max-w-[1600px] mx-auto py-6 px-24 lg:py-8 lg:px-32 ${viewMode === "editor" && rightSidebarOpen ? "lg:pr-[384px]" : ""}`}>
            {/* LINE 1: Script Builder heading + Editor/Library toggle */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'script-builder-hub' } }))} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Back to Build Your Script">
                  <Home className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>Script Builder</span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl p-1 shadow-md border border-slate-200 dark:border-slate-700 flex-shrink-0" style={{ backgroundColor: '#0c7e67' }}>
                  <button onClick={() => {
                  setViewMode("editor");
                  setRightSidebarOpen(true);
                }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2`} style={viewMode === "editor" ? { backgroundColor: '#134d3e', color: 'white' } : { color: '#ced57f', backgroundColor: 'transparent' }}>
                    <FileEdit className="w-4 h-4" />
                    <span>Editor</span>
                  </button>
                  <button onClick={() => {
                  setViewMode("library");
                  setRightSidebarOpen(false);
                }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2`} style={viewMode === "library" ? { backgroundColor: '#134d3e', color: 'white' } : { color: '#ced57f', backgroundColor: 'transparent' }}>
                    <LayoutGrid className="w-4 h-4" />
                    <span>Library</span>
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "editor" ? <div className="space-y-6">
                {/* LINE 2: Sub-heading buttons for each segment */}
                <div className="flex justify-center">
                  <ScriptBuilderNavigation
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    completionMap={tabCompletion}
                  />
                </div>

                {/* LINE 3: Heading of selected script builder section */}
                <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }} className="flex items-center gap-4">
                  {currentTab && <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 flex-shrink-0">
                      {React.createElement(currentTab.icon, {
                  className: "w-7 h-7"
                })}
                    </div>}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      <span>{currentTab?.label}</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      <span>{currentTab?.description}</span>
                    </p>
                  </div>
                </motion.div>

      {/* AI Feedback Card (appears above script editor) */}
      {activeTab !== "final" && activeFeedbackText && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                          <span>AI Feedback</span>
                        </h3>
                      </div>
                      <button onClick={closeFeedback} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
        <p>{activeFeedbackText}</p>
                    </div>
                  </motion.div>}

                {/* Preview Version (appears above script editor) */}
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

                {/* Script editor section */}
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
                      <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400" title="AI Suggestions">
                        <Sparkles className="w-4 h-4" />
                      </button>
                      
                      {/* History Button with Dropdown */}
                      <div className="relative">
                        <button onClick={() => setHistoryOpen(!historyOpen)} className="history-button flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>History</span>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${historyOpen ? 'rotate-180' : ''}`} />
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
                      }} className="history-dropdown absolute top-full right-0 mt-2 w-[480px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden">
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
                  </div>

                  {activeTab === "final" ? <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 min-h-[200px] font-mono text-sm whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
                      <p>{getFinalScript() || "Complete the other sections to see your final script here..."}</p>
                    </div> : <textarea value={scriptContent[activeTab as keyof ScriptContent]} onChange={e => handleScriptChange(e.target.value)} placeholder="Begin writing your script here..." className="w-full min-h-[200px] bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl p-6 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none transition-all" />}

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleGetAiFeedback}
                        disabled={aiFeedbackLoading || activeTab === "final"}
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className={`w-4 h-4 ${aiFeedbackLoading ? 'animate-spin' : ''}`} />
                        <span>{aiFeedbackLoading ? 'Getting Feedback...' : 'Get AI Feedback'}</span>
                      </button>
                      <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium flex items-center gap-2" aria-label="Toggle tips sidebar">
                        <span>BOR Script</span>
                      </button>
                    </div>
                    {activeTab === "final" ? <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2 font-medium ml-auto">
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button> : currentIndex < tabs.length - 1 && <button onClick={handleNext} className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 font-medium ml-auto">
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>}
                  </div>
                </motion.div>

                {/* Practice Recording Section */}
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
              </div> : <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="space-y-8">
                {/* Standard Scripts Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-900/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      <span>Standard Scripts</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {recentScripts.map(script => <motion.div key={script.id} whileHover={{
                  scale: 1.02
                }} className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                            <span>{script.title}</span>
                          </h3>
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(script.status)}`}>
                            <span>{getStatusLabel(script.status)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-4">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Modified {formatDate(script.modifiedDate)}</span>
                        </div>
                        <button onClick={() => setViewMode("editor")} className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
                          <Edit3 className="w-4 h-4" />
                          <span>Quick Edit</span>
                        </button>
                      </motion.div>)}
                  </div>
                </div>

                {/* All Scripts Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-900/5">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Library className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        <span>All Scripts</span>
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                      <div className="relative flex-1 lg:flex-initial lg:min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search scripts by name or content..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        <button onClick={() => setFilterType("all")} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${filterType === "all" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                          <span>All Scripts</span>
                        </button>
                        <button onClick={() => setFilterType("completed")} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${filterType === "completed" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                          <span>Completed</span>
                        </button>
                        <button onClick={() => setFilterType("in-progress")} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${filterType === "in-progress" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                          <span>In Progress</span>
                        </button>
                        <button onClick={() => setFilterType("archived")} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${filterType === "archived" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                          <span>Archived</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {filteredScripts.length === 0 ? <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        <span>No scripts found</span>
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        <span>Try adjusting your search or filters</span>
                      </p>
                    </div> : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredScripts.map(script => <motion.div key={script.id} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} whileHover={{
                  y: -4
                }} className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 line-clamp-2 flex-1">
                              <span>{script.title}</span>
                            </h3>
                            <div className={`px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 ml-2 ${getStatusColor(script.status)}`}>
                              <span>{getStatusLabel(script.status)}</span>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Created: {formatDate(script.createdDate)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Modified: {formatDate(script.modifiedDate)}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-slate-600 dark:text-slate-400">
                                <span>Completion</span>
                              </span>
                              <span className="font-semibold text-slate-900 dark:text-slate-100">
                                <span>{script.completionPercentage}%</span>
                              </span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div initial={{
                        width: 0
                      }} animate={{
                        width: `${script.completionPercentage}%`
                      }} transition={{
                        duration: 0.8,
                        ease: "easeOut"
                      }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                            </div>
                          </div>

                          <div className="mb-5">
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                              <span>{script.preview}</span>
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button onClick={() => setViewMode("editor")} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
                              <Edit3 className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300">
                              <Copy className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>)}
                    </div>}
                </div>
              </motion.div>}
          </div>
        </div>
      </motion.div>

      {/* Right Sidebar - Examples & Tips */}
      <AnimatePresence mode="wait">
        {rightSidebarOpen && viewMode === "editor" && <motion.aside initial={{
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
      }} className="w-[360px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800/60 flex-shrink-0 flex flex-col shadow-2xl shadow-slate-900/5 overflow-y-auto fixed right-0 top-0 bottom-0 z-40">
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                <span>BOR Script</span>
              </h2>
              {isMobile && <button onClick={() => setRightSidebarOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close sidebar">
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>}
            </div>

            <div className="flex-1 p-6 space-y-6">
              <motion.div key={`example-${activeTab}`} initial={{
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
                  {sectionContent[activeTab].subheading && (
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {sectionContent[activeTab].subheading}
                    </h4>
                  )}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm border border-amber-100 dark:border-amber-900/30">
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed whitespace-pre-line">
                      <span dangerouslySetInnerHTML={{
                        __html: sectionContent[activeTab].example.replace(/\[([^\]]+)\]/g, '<strong>[$1]</strong>')
                      }} />
                    </p>
                  </div>
                  {sectionContent[activeTab].subheading2 && sectionContent[activeTab].example2 && (
                    <>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 pt-2">
                        {sectionContent[activeTab].subheading2}
                      </h4>
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm border border-amber-100 dark:border-amber-900/30">
                        <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed whitespace-pre-line">
                          <span dangerouslySetInnerHTML={{
                            __html: sectionContent[activeTab].example2!.replace(/\[([^\]]+)\]/g, '<strong>[$1]</strong>')
                          }} />
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div key={`tips-${activeTab}`} initial={{
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
                  {sectionContent[activeTab].tips.map((tip, index) => <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      {!tip.startsWith('If Yes:') && !tip.startsWith('If No:') && !tip.startsWith('Choose a path') && !tip.startsWith('Ask for the 15-minute call') && !tip.startsWith('Instead, learn the rhythm:') && <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      </div>}
                      <span className={`leading-relaxed ${(tip.startsWith('If Yes:') || tip.startsWith('If No:') || tip.startsWith('Choose a path') || tip.startsWith('Ask for the 15-minute call') || tip.startsWith('Instead, learn the rhythm:')) ? 'font-semibold' : ''}`}>{tip}</span>
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
