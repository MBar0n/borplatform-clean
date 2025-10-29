"use client";

import * as React from "react";
import { Menu, ChevronLeft, ChevronRight, Home, Users, BarChart3, Settings, MessageSquare, Library, BookOpen, PlayCircle, CheckCircle2, XCircle, Clock, Award, Download, Bookmark, BookmarkCheck, Printer, ChevronDown, ChevronUp, FileText, Video, Target, TrendingUp, Sparkles, Star, Lock, Check, AlertCircle, RotateCcw, Activity, UserCircle2, LogOut, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import logoLarge from "@/assets/logos/BOROperatingSystem_logo large.png";
import borProspectingMindsetVideo from "@/assets/videos/build_your_script/BOR Prospecting Mindset.mp4";
import borProspectingScriptVideo from "@/assets/videos/build_your_script/BOR Prospecting Script.mp4";
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

type TrainingModule = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  lessonsCount: number;
  duration: string;
  completed: boolean;
  locked: boolean;
  completionPercentage: number;
  keyPoints: string[];
};

type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  readingTime: string;
  completed: boolean;
  locked: boolean;
  hasVideo: boolean;
  hasQuiz: boolean;
};

type QuizQuestion = {
  id: string;
  type: "multiple-choice" | "true-false";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
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

const trainingModules: TrainingModule[] = [];

const moduleLessons: Record<string, Lesson[]> = {};

const quizQuestions: QuizQuestion[] = [];

const videoDataByModule: Record<string, VideoData> = {};

export const PipelineReactivatorPage = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [modulesSidebarOpen, setModulesSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"overview" | "lessons" | "quiz" | "resources">("lessons");
  const [selectedModule, setSelectedModule] = React.useState<string>("");
  const [selectedLesson, setSelectedLesson] = React.useState<string>("");
  const [expandedModules, setExpandedModules] = React.useState<string[]>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [lessonCompleted, setLessonCompleted] = React.useState(false);
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

  // Quiz state
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [showResults, setShowResults] = React.useState(false);
  const [showExplanation, setShowExplanation] = React.useState<number | null>(null);


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
      { id: "lessons" as const, label: "Lesson", icon: BookOpen },
      { id: "quiz" as const, label: "Quiz", icon: Award },
      { id: "resources" as const, label: "Resources", icon: Download },
    ],
    [],
  );

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModules(prev => prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(null);
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(currentQuestion);
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
    setShowExplanation(null);
  };

  const currentLessons = moduleLessons[selectedModule] || [];
  const currentModuleData = trainingModules.find(m => m.id === selectedModule);
  const currentLessonData = currentLessons.find(l => l.id === selectedLesson);
  const currentVideoData = videoDataByModule[selectedModule] || videoDataByModule["module-2"];
  const scorePercentage = showResults ? calculateScore() / quizQuestions.length * 100 : 0;

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
              if (item.id !== 'pipeline-reactivator') {
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
              <div className="absolute left-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-2 flex flex-col gap-2 z-10">
                <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'script-builder-hub' } }))} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group flex-shrink-0" aria-label="Back to Script Builder">
                  <RevenueStackerIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                </button>
              </div>
              <div className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-3"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>New Business Growth Engine</span>
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  <span>Build Your Script</span>
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
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-3xl p-8 border border-emerald-200/50 dark:border-emerald-900/30">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      <span>Module Overview</span>
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      <span>{currentModuleData?.description}</span>
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 text-center">
                        <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          <span>{currentModuleData?.lessonsCount}</span>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <span>Lessons</span>
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 text-center">
                        <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          <span>{currentModuleData?.duration}</span>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <span>Duration</span>
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 text-center">
                        <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          <span>{currentModuleData?.completionPercentage}%</span>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <span>Complete</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      <span>Key Points</span>
                    </h3>
                    <ul className="space-y-3">
                      {(currentModuleData?.keyPoints || []).map((item, index) => <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                </motion.div>}

              {activeTab === "lessons" && <motion.div key="lessons" initial={{
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
                  {currentLessonData?.hasVideo && <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/5">
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          key={selectedModule}
                          controls
                          poster={currentVideoData.thumbnail}
                          className="w-full h-full object-cover"
                        >
                          <source src={currentVideoData.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          <span>{currentVideoData.title}</span>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          <span>{currentVideoData.description}</span>
                        </p>
                      </div>
                    </div>}

                  {/* Lesson Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {selectedModule === "module-1" ? (
                        <>
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

                        </>
                      ) : (
                        <>
                          <h2 className="text-slate-900 dark:text-slate-100">
                            <span>The BOR Prospecting Machine</span>
                          </h2>

                          <p className="text-slate-700 dark:text-slate-300">
                            <span>The fastest way to help you differentiate yourself and show immediate value is by offering a different outcome and a different experience.</span>
                          </p>
                          
                          <p className="text-slate-700 dark:text-slate-300 mb-6">
                            <span>Instead of providing a quote or a coverage analysis, you’ll give them a strategy they can use to negotiate premiums and get the best deal in the market, with or without you.</span>
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
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mark Complete Section */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-900/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setLessonCompleted(!lessonCompleted)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${lessonCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'}`}>
                          {lessonCompleted && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          <span>Mark lesson as complete</span>
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium flex items-center gap-2">
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium flex items-center gap-2">
                          <span>Next Lesson</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>}

              {activeTab === "quiz" && <motion.div key="quiz" initial={{
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
            }} className="max-w-4xl mx-auto">
                  {!quizStarted ? <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xl shadow-slate-900/5">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        <span>Ready to Test Your Knowledge?</span>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                        <span>This quiz contains {quizQuestions.length} questions designed to reinforce what you've learned in this module. You'll receive immediate feedback on each answer.</span>
                      </p>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            <span>{quizQuestions.length}</span>
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span>Questions</span>
                          </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            <span>~10</span>
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span>Minutes</span>
                          </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            <span>70%</span>
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span>To Pass</span>
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setQuizStarted(true)} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-semibold text-lg">
                        <span>Start Quiz</span>
                      </button>
                    </div> : showResults ? <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xl shadow-slate-900/5">
                      <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${scorePercentage >= 70 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-amber-500 to-orange-500'}`}>
                        <div className="text-5xl font-bold text-white">
                          <span>{Math.round(scorePercentage)}%</span>
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {scorePercentage >= 70 ? <span>Congratulations! 🎉</span> : <span>Keep Learning!</span>}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                        {scorePercentage >= 70 ? <span>You've passed the quiz! You got {calculateScore()} out of {quizQuestions.length} questions correct. You're ready to move on to the next module.</span> : <span>You got {calculateScore()} out of {quizQuestions.length} questions correct. Review the lesson materials and try again to improve your score.</span>}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button onClick={resetQuiz} className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium flex items-center gap-2">
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake Quiz</span>
                        </button>
                        {scorePercentage >= 70 && <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium flex items-center gap-2">
                            <span>Continue Learning</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>}
                      </div>
                    </div> : <div className="space-y-6">
                      {/* Progress Bar */}
                      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                          </span>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            <span>{Math.round((currentQuestion + 1) / quizQuestions.length * 100)}% Complete</span>
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div initial={{
                      width: 0
                    }} animate={{
                      width: `${(currentQuestion + 1) / quizQuestions.length * 100}%`
                    }} transition={{
                      duration: 0.3
                    }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        </div>
                      </div>

                      {/* Question Card */}
                      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                          <span>{quizQuestions[currentQuestion].question}</span>
                        </h3>

                        <div className="space-y-3 mb-8">
                          {quizQuestions[currentQuestion].options?.map((option, index) => {
                      const isSelected = selectedAnswers[currentQuestion] === index;
                      const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                      const showResult = showExplanation === currentQuestion;
                      return <button key={index} onClick={() => !showResult && handleAnswerSelect(index)} disabled={showResult} className={`w-full p-5 rounded-2xl text-left transition-all duration-300 flex items-center gap-4 ${showResult ? isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500' : isSelected ? 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500' : 'bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700' : isSelected ? 'bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500' : 'bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${showResult ? isCorrect ? 'bg-emerald-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400' : isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                  {showResult ? isCorrect ? <CheckCircle2 className="w-5 h-5" /> : isSelected ? <XCircle className="w-5 h-5" /> : <span>{String.fromCharCode(65 + index)}</span> : <span>{String.fromCharCode(65 + index)}</span>}
                                </div>
                                <span className={`flex-1 ${showResult ? isCorrect ? 'text-emerald-900 dark:text-emerald-100 font-medium' : isSelected ? 'text-red-900 dark:text-red-100' : 'text-slate-600 dark:text-slate-400' : isSelected ? 'text-emerald-900 dark:text-emerald-100 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                                  {option}
                                </span>
                              </button>;
                    })}
                        </div>

                        {/* Explanation */}
                        {showExplanation === currentQuestion && <motion.div initial={{
                    opacity: 0,
                    height: 0
                  }} animate={{
                    opacity: 1,
                    height: "auto"
                  }} className="bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-800 rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                  <span>Explanation</span>
                                </h4>
                                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                                  <span>{quizQuestions[currentQuestion].explanation}</span>
                                </p>
                              </div>
                            </div>
                          </motion.div>}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                          <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0} className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                          </button>

                          <div className="flex gap-3">
                            {showExplanation !== currentQuestion && selectedAnswers[currentQuestion] !== null && <button onClick={handleCheckAnswer} className="px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 font-medium">
                                <span>Check Answer</span>
                              </button>}

                            {currentQuestion < quizQuestions.length - 1 ? <button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestion] === null} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                              </button> : <button onClick={handleSubmitQuiz} disabled={selectedAnswers.some(a => a === null)} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span>Submit Quiz</span>
                                <CheckCircle2 className="w-4 h-4" />
                              </button>}
                          </div>
                        </div>
                      </div>
                    </div>}
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
                    title: "Opening Statement Templates",
                    size: "PDF • 2.4 MB",
                    icon: FileText
                  }, {
                    title: "Cold Call Script Worksheet",
                    size: "PDF • 1.8 MB",
                    icon: FileText
                  }, {
                    title: "Practice Recording Guide",
                    size: "PDF • 3.1 MB",
                    icon: FileText
                  }, {
                    title: "Common Objections Cheat Sheet",
                    size: "PDF • 1.2 MB",
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
                              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
                            <button className="p-3 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 group-hover:scale-110">
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
