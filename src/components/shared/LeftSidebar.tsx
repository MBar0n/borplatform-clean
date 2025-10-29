import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronDown, LogOut, Home, Users, BarChart3, MessageSquare, Library, Bot, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
import { useAuth } from "@/contexts/AuthContext";
import { deriveUserProfile } from "@/lib/auth/user";

const SIDEBAR_STORAGE_KEY = "boros:leftSidebarOpen";

const readStoredSidebarPreference = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active?: boolean;
  subItems?: {
    id: string;
    label: string;
  }[];
};

const navigationItems: NavItem[] = [{
  id: "home",
  label: "Home",
  icon: Home
}, {
  id: "new-business-growth",
  label: "New Business Growth Engine",
  icon: Zap,
  subItems: [
    { id: "opportunities", label: "Opportunity Converter" },
    { id: "network", label: "Prospect Reactivator" },
    { id: "revenue-stacker", label: "Revenue Stacker" },
    { id: "network-engager", label: "Network Engager" }
  ]
}, {
  id: "bor-bro",
  label: "BOR BRO",
  icon: Bot
}];

interface LeftSidebarProps {
  activePage?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activePage = '' }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(readStoredSidebarPreference);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = React.useState<Set<string>>(() => {
    const parentItem = navigationItems.find(item =>
      item.subItems?.some(subItem => subItem.id === activePage)
    );
    return parentItem ? new Set([parentItem.id]) : new Set();
  });
  const { user, signOut: signOutUser } = useAuth();
  const profile = React.useMemo(() => deriveUserProfile(user), [user]);

  // Auto-expand dropdown if active page is a sub-item
  React.useEffect(() => {
    const parentItem = navigationItems.find(item =>
      item.subItems?.some(subItem => subItem.id === activePage)
    );
    if (parentItem) {
      setExpandedDropdowns(prev => {
        // Only update if not already expanded to prevent re-render flicker
        if (!prev.has(parentItem.id)) {
          return new Set([parentItem.id]);
        }
        return prev;
      });
    }
  }, [activePage]);

  // Auto-open sidebar for sub-items only when user has no stored preference
  React.useEffect(() => {
    const isSubItem = navigationItems.some(item =>
      item.subItems?.some(subItem => subItem.id === activePage)
    );
    if (isSubItem) {
      const storedPreference = typeof window !== "undefined"
        ? window.localStorage.getItem(SIDEBAR_STORAGE_KEY)
        : null;
      if (storedPreference === null) {
        setLeftSidebarOpen(true);
      }
    }
  }, [activePage]);

  const dispatchNavigation = React.useCallback((page: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("navigate", { detail: { page } }));
  }, []);

  const updateLeftSidebarOpen = React.useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setLeftSidebarOpen(prev => {
      const value = typeof next === "function" ? (next as (state: boolean) => boolean)(prev) : next;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, value ? "true" : "false");
      }
      return value;
    });
  }, []);

  const toggleDropdown = React.useCallback((itemId: string) => {
    setExpandedDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
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

  return (
    <>
      <AnimatePresence mode="wait">
        {leftSidebarOpen && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }} onClick={() => updateLeftSidebarOpen(false)} className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-sm z-30" aria-hidden="true" />}
      </AnimatePresence>

      <motion.aside initial={false} animate={{
        width: leftSidebarOpen ? 330 : 72
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
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const hasActiveSubItem = hasSubItems && item.subItems?.some(subItem => subItem.id === activePage);
              const isActive = !hasActiveSubItem && item.id === activePage;
              const isExpanded = expandedDropdowns.has(item.id);

              return (
                <div key={item.id}>
                  <motion.button onClick={() => {
                    if (hasSubItems) {
                      toggleDropdown(item.id);
                    } else {
                      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: item.id === 'script-builder' ? 'script-builder-hub' : item.id } }));
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
                          {hasSubItems && (
                            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          )}
                        </div> : <Icon className="w-5 h-5 flex-shrink-0" />}
                    </motion.button>

                  {/* Dropdown sub-items */}
                  {hasSubItems && leftSidebarOpen && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '500px' : '0',
                        opacity: isExpanded ? 1 : 0
                      }}
                    >
                      <div className="ml-4 mt-1.5 space-y-1">
                        {item.subItems?.map(subItem => {
                          const isSubItemActive = subItem.id === activePage;
                          return (
                            <motion.button
                              key={subItem.id}
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: subItem.id } }));
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full flex items-center justify-start px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                isSubItemActive
                                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 font-medium"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                              }`}
                            >
                              <span>{subItem.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
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
          <button onClick={() => updateLeftSidebarOpen(prev => !prev)} className={`w-full p-3 rounded-xl transition-all duration-300 group flex ${leftSidebarOpen ? "justify-between items-center" : "justify-center"}`} aria-label="Toggle left sidebar">
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
    </>
  );
};
