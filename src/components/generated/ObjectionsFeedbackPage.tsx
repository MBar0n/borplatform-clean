"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Home, Users, BarChart3, Settings, MessageSquare, FileText, BookOpen, Download, Award, UserCircle2, LogOut, ChevronDown, Search, Target, TrendingUp, Check, Clock, Library, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
import objectionsFeedbackThumbnail from "@/assets/images/objections_feedback.png";
import objectionsFeedbackVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Objection + Feedback.mp4";
import { useAuth } from "@/contexts/AuthContext";
import { deriveUserProfile } from "@/lib/auth/user";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active?: boolean;
};

type VideoData = {
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoSrc: string;
  progress: number;
};

// Shared icon for Revenue Stacker - used in sidebar and back button
const RevenueStackerIcon = MessageSquare;

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
  icon: RevenueStackerIcon,
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

const videoData: VideoData = {
  title: "Video - Handling Objections & Feedback",
  duration: "5:44",
  description: "Collect and refine objections to improve your approach",
  thumbnail: objectionsFeedbackThumbnail,
  videoSrc: objectionsFeedbackVideo,
  progress: 0
};

const introText = `Naturally, you're going to get objections — both from prospects and from yourself. That's part of the process.

The goal here isn't to avoid objections; it's to collect them, refine them, and use them to sharpen your script. The AI script builder has the objection handling framework and you will use that to continually improve your objection handling.

Write Down Objections

Every time you get a new objection or a tough response, write it down. Drop it into the AI Script Builder and ask for feedback or variations on how to handle it. You can also reach out for direct support — we'll walk through it together and tweak your messaging to fit your tone and style.

Diffuse The Objection

Every objection gets one simple response:

"Not a problem."

This diffuses the objection, allows you a minute to think of a rebuttal, and then go back in for the ask.`;

const keyPoints = [
  "Collect and categorize common objections you hear on calls",
  "Develop thoughtful responses that address concerns directly",
  "Use feedback to improve your scripts and positioning over time",
  "Build confidence by knowing how to handle any pushback"
];

export const ObjectionsFeedbackPage = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"overview" | "lesson" | "resources">("overview");
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
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
  const [lessonCompleted, setLessonCompleted] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tabs = React.useMemo(
    () => [
      { id: "overview" as const, label: "Overview", icon: FileText },
      { id: "lesson" as const, label: "Lesson", icon: BookOpen },
      { id: "resources" as const, label: "Resources", icon: Download },
    ],
    [],
  );

  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      {/* Overlay for sidebar */}
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

      {/* Left Sidebar - Navigation */}
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
              if (item.id === 'revenue-stacker') {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'revenue-stacker' } }));
              } else if (item.id !== 'objections-feedback') {
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: item.id } }));
              }
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
            <motion.button
              onClick={handleUserButtonClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center ${leftSidebarOpen ? "justify-between px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-300 group`}
            >
              {leftSidebarOpen ? (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-sm shadow-lg flex-shrink-0"
                    style={{ backgroundColor: "#ced57f", color: "#134d3e" }}
                  >
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
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  ) : null}
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold text-sm shadow-lg"
                  style={{ backgroundColor: "#ced57f", color: "#134d3e" }}
                >
                  <span>{profile.initials}</span>
                </div>
              )}
            </motion.button>

            <AnimatePresence>
              {profile.isAuthenticated && userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className={`absolute ${leftSidebarOpen ? "left-0 right-0" : "left-full ml-3"} bottom-full mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50`}
                  style={{ minWidth: leftSidebarOpen ? "auto" : "240px" }}
                >
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
                </motion.div>
              )}
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

      {/* Main Content Area */}
      <motion.div className="flex-1 flex overflow-hidden min-w-0 ml-[72px]">
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
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'execute-build-plan' } }))} className="px-4 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0" aria-label="Go to next step">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    Next Step
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 rounded-md">
                      Step 4
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-3"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Revenue Stacker - Step 3</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>Objections + Feedback</span>
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
              {activeTab === "overview" && <motion.div key="overview" initial={{
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
            }} className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      <span>Handling Objections & Feedback</span>
                    </h2>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      <span>Naturally, you're going to get objections — both from prospects and from yourself. That's part of the process.</span>
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      <span>The goal here isn't to avoid objections; it's to collect them, refine them, and use them to sharpen your script. The AI script builder has the objection handling framework and you will use that to continually improve your objection handling.</span>
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 mt-6">
                      <span>Write Down Objections</span>
                    </h3>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      <span>Every time you get a new objection or a tough response, write it down. Drop it into the AI Script Builder and ask for feedback or variations on how to handle it. You can also reach out for direct support — we'll walk through it together and tweak your messaging to fit your tone and style.</span>
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 mt-6">
                      <span>Diffuse The Objection</span>
                    </h3>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      <span>Every objection gets one simple response:</span>
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      <span className="font-semibold">"Not a problem."</span>
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      <span>This diffuses the objection, allows you a minute to think of a rebuttal, and then go back in for the ask.</span>
                    </p>
                  </div>
                </motion.div>}

              {activeTab === "lesson" && <motion.div key="lesson" initial={{
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
            }} className="max-w-5xl mx-auto space-y-6">
                  {/* Video Player */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        controls
                        poster={videoData.thumbnail}
                        className="w-full h-full object-cover"
                      >
                        <source src={videoData.videoSrc} type="video/mp4" />
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

                  {/* Lesson Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <h2 className="text-slate-900 dark:text-slate-100">
                        <span>Understanding Objections as Feedback</span>
                      </h2>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        <span>When a prospect pushes back, they're not shutting you down—they're telling you what matters to them. Your job is to listen, document, and refine your approach.</span>
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

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        <span>Every objection gets one simple response:</span>
                      </p>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        <span><strong>"Not a problem."</strong></span>
                      </p>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        <span>This diffuses the objection, allows you a minute to think of a rebuttal, and then go back in for the ask.</span>
                      </p>

                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        <span>Every objection you hear is an opportunity to improve your messaging, build trust, and position yourself as someone who understands their concerns.</span>
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

                      <h3 className="text-slate-900 dark:text-slate-100">
                        <span>Building Your Objection Library</span>
                      </h3>

                      <p className="text-slate-700 dark:text-slate-300 mb-4">
                        <span>Keep a running document with:</span>
                      </p>

                      <ul className="text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                        <li>The exact objection you heard</li>
                        <li>The context (what part of the call it came up)</li>
                        <li>Your response and how it landed</li>
                        <li>A refined version to use next time</li>
                      </ul>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 my-8">
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          <span><strong>The more objections you collect, the better prepared you become.</strong></span>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          <span>Over time, you'll stop being surprised by pushback. Instead, you'll recognize patterns and respond with confidence.</span>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          <span><strong>Remember:</strong></span>
                        </p>
                        <ul className="text-slate-700 dark:text-slate-300 mb-4 space-y-2">
                          <li>Objections are not personal—they're part of the process.</li>
                          <li>The best closers aren't the ones who avoid objections; they're the ones who handle them gracefully.</li>
                        </ul>
                        <p className="text-slate-700 dark:text-slate-300 m-0">
                          <span>Track your objections, refine your responses, and watch your conversion rate improve.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mark Complete Section */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-900/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setLessonCompleted(!lessonCompleted)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${lessonCompleted ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600 hover:border-amber-500'}`}>
                          {lessonCompleted && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          <span>Mark lesson as complete</span>
                        </span>
                      </div>
                      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'revenue-stacker' } }))} className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 font-medium flex items-center gap-2">
                        <span>Back to Revenue Stacker</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>}

              {activeTab === "resources" && <motion.div key="resources" initial={{
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
            }} className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      <span>Downloadable Resources</span>
                    </h2>
                    <div className="space-y-4">
                      {[{
                    title: "Objection Handling Framework",
                    size: "PDF • 0.8 MB",
                    icon: FileText
                  }, {
                    title: "Common Objections Library",
                    size: ".XLSX • 0.4 MB",
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
                              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
                            <button className="p-3 rounded-xl bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300 group-hover:scale-110">
                              <Download className="w-5 h-5" />
                            </button>
                          </motion.div>;
                  })}
                    </div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>;
};
