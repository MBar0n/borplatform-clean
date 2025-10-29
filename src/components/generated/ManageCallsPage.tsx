"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Home, Users, BarChart3, Settings, MessageSquare, FileText, Download, UserCircle2, LogOut, ChevronDown, Phone, Library, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
import callsOppThumbnail from "@/assets/images/calls_opp.png";
import callsOppVideo from "@/assets/videos/revenue_stacker/Revenue Stacker - Manage Calls + Opportunities.mp4";
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

export const ManageCallsPage = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"overview" | "resources">("overview");
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

  const tabs = React.useMemo(
    () => [
      { id: "overview" as const, label: "Overview", icon: FileText },
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
              } else if (item.id !== 'manage-calls') {
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
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'prospecting-confidence' } }))} className="px-4 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-300 group flex items-center gap-2 flex-shrink-0" aria-label="Go to next step">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-rose-700 dark:group-hover:text-rose-400">
                    Next Step
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
                      Step 6
                    </span>
                    <ChevronRight className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 rounded-full text-sm font-semibold mb-3"
                >
                  <Phone className="w-4 h-4" />
                  <span>Revenue Stacker - Step 5</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>Manage Calls + Opportunities</span>
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
            }} className="max-w-5xl mx-auto space-y-6">
                  {/* Video Player */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        controls
                        poster={callsOppThumbnail}
                        className="w-full h-full object-cover"
                      >
                        <source src={callsOppVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        <span>Video - Manage Calls + Opportunities</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        <span>Every call you make fits into one of two categories: Cold or Follow-up</span>
                      </p>
                    </div>
                  </div>

                  {/* Main Content Card */}
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
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      <span>Resources will be added here.</span>
                    </p>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>;
};
