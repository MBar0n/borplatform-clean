"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Users, BarChart3, Settings, MessageSquare, Library, TrendingUp, BookOpen, FileEdit, GraduationCap, Sparkles, CheckCircle2, Clock, Play, FileText, Video, Target, History, Zap, Award, ArrowRight, UserCircle2, LogOut, ChevronDown, Bot } from "lucide-react";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
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

type FeatureItem = {
  text: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

type QuickStat = {
  label: string;
  value: string | number;
  icon: React.ComponentType<{
    className?: string;
  }>;
  color: string;
};

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

const educationFeatures: FeatureItem[] = [{
  text: "The BOR Prospecting Machine videos",
  icon: Video
}, {
  text: "BOR techniques",
  icon: Target
}, {
  text: "Real-world examples",
  icon: Play
}, {
  text: "Progress tracking",
  icon: TrendingUp
}];

const scriptBuilderFeatures: FeatureItem[] = [{
  text: "AI-powered feedback",
  icon: Sparkles
}, {
  text: "Version history & comparison",
  icon: History
}, {
  text: "Practice recordings",
  icon: Play
}, {
  text: "Script library",
  icon: FileText
}];

const quickStats: QuickStat[] = [{
  label: "Total Scripts",
  value: 12,
  icon: FileEdit,
  color: "from-emerald-500 to-teal-500"
}, {
  label: "Completed Modules",
  value: 8,
  icon: GraduationCap,
  color: "from-blue-500 to-cyan-500"
}, {
  label: "Practice Hours",
  value: "24.5",
  icon: Clock,
  color: "from-amber-500 to-orange-500"
}];

export const ScriptBuilderHub = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
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
              if (item.id !== 'network') {
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

      {/* Main Content */}
      <motion.div className="flex-1 flex flex-col overflow-hidden min-w-0 ml-[72px]">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 flex gap-2">
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'revenue-stacker' } }))} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Back to Revenue Stacker">
                  <MessageSquare className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                </button>
                <div className="h-full w-px bg-slate-200 dark:bg-slate-800" />
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'objections-feedback' } }))} className="px-4 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0" aria-label="Go to next step">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    Next Step
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                      Step 3
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  <span>Build Your Script</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  <span>Once you've got it built, you're ready to start calling</span>
                </p>
              </div>
            </div>

            {/* Main Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Education Modules Card */}
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.3
            }} whileHover={{
              y: -8,
              scale: 1.01
            }} className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-900/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 group relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  {/* Icon, Title, Description & Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        <span>Modules</span>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        <span>Get your mindset in the right place</span>
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
                      <Award className="w-3.5 h-3.5" />
                      <span>75% Complete</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {educationFeatures.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return <motion.div key={feature.text} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1
                    }} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">
                            <span>{feature.text}</span>
                          </p>
                        </motion.div>;
                  })}
                  </div>

                  {/* CTA Button */}
                  <motion.button onClick={() => {
                    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'pipeline-reactivator' } }));
                  }} whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <BookOpen className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Interactive Script Builder Card */}
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.4
            }} whileHover={{
              y: -8,
              scale: 1.01
            }} className="bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-emerald-950/20 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-900/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 group relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  {/* Icon, Title, Description & Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <FileEdit className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        <span>AI Script Builder</span>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        <span>Build, test, and refine your cold call scripts</span>
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                      <span>12 Scripts</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {scriptBuilderFeatures.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return <motion.div key={feature.text} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1
                    }} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">
                            <span>{feature.text}</span>
                          </p>
                        </motion.div>;
                  })}
                  </div>

                  {/* CTA Button */}
                  <motion.button onClick={() => {
                    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'script-builder-editor' } }));
                  }} whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span>Build Script</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Section */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.5
          }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return <motion.div key={stat.label} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1
              }} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-900/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          <span>{stat.label}</span>
                        </p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          <span>{stat.value}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>;
            })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>;
};
