"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Hammer, Zap } from "lucide-react";
import rsBackground from "@/assets/images/rs_b.png";
import { ModernStepCard } from "./ModernStepCard";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { Footer } from "@/components/shared/Footer";

type Step = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  color: string;
  bgColor: string;
  borderColor: string;
  action: string;
  gradient: string;
};

const steps: Step[] = [{
  id: 'identify',
  number: 1,
  title: 'Part 1 - Identify, Build & Refine',
  description: 'Find businesses, Get your Script & Refine objections',
  icon: Search,
  color: 'from-blue-500 to-cyan-500',
  bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  borderColor: 'border-blue-200 dark:border-blue-900/30',
  action: 'Start Targeting',
  gradient: 'from-blue-400 via-cyan-500 to-blue-600'
}, {
  id: 'execute',
  number: 2,
  title: 'Part 2 - Plan, Manage & Reinforce',
  description: 'Generate appointments fast - Focus entirely on cold calls',
  icon: Hammer,
  color: 'from-purple-500 to-pink-500',
  bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  borderColor: 'border-purple-200 dark:border-purple-900/30',
  action: 'Plan Now',
  gradient: 'from-purple-400 via-pink-500 to-purple-600'
}];

export const RevenueStackerPage = () => {
  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
      <LeftSidebar activePage="revenue-stacker" />

      {/* Main Content Area */}
      <motion.div className="flex-1 flex overflow-hidden min-w-0 ml-[72px]">
        <div className="flex-1 overflow-y-auto bg-cover bg-no-repeat" style={{ backgroundImage: `url(${rsBackground})`, backgroundPosition: 'center 75%' }}>
          <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            {/* Hero Section */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center mb-8 lg:mb-10">
              <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                <span>New Business Growth Engine</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  REVENUE
                </span>{' '}
                <span>STACKER</span>
              </h1>
            </motion.div>

            {/* Main Section: 4-Step Process */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="mb-20">
              {/* CTA Button */}
              <div className="text-center mb-16 lg:mb-24">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex flex-col items-center gap-2 mx-auto">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span className="text-xl">Create NEW opportunities in the next 90 Days!</span>
                  </div>
                  <p className="text-lg font-normal text-white/90">
                    <span>2 parts to build your pipeline and close deals</span>
                  </p>
                </motion.button>
              </div>

              {/* Steps Journey - Individual Cards Centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {steps.map((step, index) => (
                  <ModernStepCard
                    key={step.id}
                    stepNumber={step.number}
                    title={step.title}
                    description={step.description}
                    buttonText={step.action}
                    icon={step.icon}
                    gradient={step.gradient}
                    onButtonClick={() => {
                      if (step.id === 'identify') {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'target-prospects' } }));
                      } else if (step.id === 'execute') {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'execute-build-plan' } }));
                      }
                    }}
                    className=""
                  />
                ))}
                </div>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      </motion.div>
    </div>;
};
