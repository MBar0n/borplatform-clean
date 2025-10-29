"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, RefreshCw, Layers, Users, Download } from "lucide-react";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { Footer } from "@/components/shared/Footer";
import newBusinessOverviewVideo from "@/assets/videos/New Business Growth Engine - Overview.mp4";
import newBusinessThumbnail from "@/assets/images/New-Business-Growth-Engine.png";
import overviewPdf from "@/assets/files/Overview_New Business Growth Engine .pdf";

type HomeCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  gradient: string;
  delay: number;
  targetPage: string;
};

const homeCards: HomeCard[] = [{
  id: "opportunity-converter",
  title: "Opportunity Converter",
  subtitle: "Transform prospects into closed deals",
  icon: Target,
  gradient: "from-violet-500 to-purple-600",
  delay: 0.2,
  targetPage: "opportunities"
}, {
  id: "prospect-reactivator",
  title: "Prospect Reactivator",
  subtitle: "Re-engage dormant opportunities",
  icon: RefreshCw,
  gradient: "from-blue-500 to-cyan-600",
  delay: 0.3,
  targetPage: "network"
}, {
  id: "revenue-stacker",
  title: "Revenue Stacker",
  subtitle: "Compound growth strategies",
  icon: Layers,
  gradient: "from-emerald-500 to-teal-600",
  delay: 0.4,
  targetPage: "revenue-stacker"
}, {
  id: "network-engager",
  title: "Network Engager",
  subtitle: "Activate strategic connections",
  icon: Users,
  gradient: "from-amber-500 to-orange-600",
  delay: 0.5,
  targetPage: "network-engager"
}];

export const HomePage: React.FC = () => {
  const handleNavigate = React.useCallback((page: string) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: { page } }));
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-950 relative overflow-hidden">
      <LeftSidebar activePage="home" />

      <motion.div className="flex-1 flex overflow-hidden min-w-0 ml-[72px]">
        <div className="relative flex-1 overflow-y-auto">
          <div className="relative min-h-screen bg-slate-950">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 lg:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 shadow-lg shadow-black/20"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-slate-300 tracking-wide">
                  BOR Operating System
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight"
              >
                <span className="block mb-3 text-white">Welcome!</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NEW BUSINESS GROWTH ENGINE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
              >
                <span>
                  Four playbooks to help you stack revenue fast and fill your pipeline with new opportunities over the next 90 days.
                </span>
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {/* Left Column - Video Player */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
              >
                <div className="relative aspect-video bg-slate-900">
                  <video
                    controls
                    poster={newBusinessThumbnail}
                    className="w-full h-full object-cover"
                  >
                    <source src={newBusinessOverviewVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
                      Overview
                    </p>
                    <a
                      href={overviewPdf}
                      download="Overview_New Business Growth Engine.pdf"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-all duration-300 group flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm uppercase tracking-wide">Overview</span>
                    </a>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    New Business Growth Engine
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Designed to give insurance producers a proven, repeatable process to generate consistent new business
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Stacked Cards */}
              <div className="flex flex-col gap-4 lg:gap-5">
                {homeCards.map(card => {
                  const Icon = card.icon;

                  return (
                    <motion.button
                      key={card.id}
                      type="button"
                      onClick={() => handleNavigate(card.targetPage)}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                      className="group relative text-left"
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />

                      <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 lg:p-6 shadow-2xl shadow-black/40 hover:shadow-black/60 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg shadow-black/30 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                          </div>

                          <div className="flex-1 space-y-1">
                            <h2 className="text-base lg:text-lg font-bold text-white tracking-tight">
                              <span>{card.title}</span>
                            </h2>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                              <span>{card.subtitle}</span>
                            </p>
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5">
                          <div className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-tl-full`} />
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <Footer />
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
};
