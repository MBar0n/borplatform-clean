import React from 'react';
import { motion } from 'framer-motion';

type ModernStepCardProps = {
  stepNumber?: number;
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient?: string;
  onButtonClick?: () => void;
  className?: string;
};

// @component: ModernStepCard
export const ModernStepCard = ({
  stepNumber = 1,
  title = 'Identify Target Prospects',
  description = 'Find businesses that are ready to move',
  buttonText = 'Start Targeting',
  icon: Icon,
  gradient = 'from-blue-500 to-cyan-400',
  onButtonClick = () => console.log('Button clicked'),
  className = ''
}: ModernStepCardProps) => {
  return <div className={`w-full max-w-xl mx-auto ${className}`}>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200/50 dark:border-slate-800/50 px-8 py-8 md:px-8 md:py-8 space-y-8 h-[310px] flex flex-col">
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.2
      }} className="flex items-center gap-5">
          <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg flex-shrink-0`}>
            {Icon && <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
            {title}
          </h2>
        </motion.div>

        <motion.p initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="text-gray-500 dark:text-slate-400 text-base md:text-lg leading-relaxed text-center min-h-[3.5rem]">
          {description}
        </motion.p>

        <motion.button initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} whileHover={{
        scale: 1.02,
        y: -2
      }} whileTap={{
        scale: 0.98
      }} onClick={onButtonClick} className="w-full text-white font-semibold rounded-2xl shadow-md transition-all duration-200 flex items-stretch group overflow-hidden relative" style={{
        backgroundColor: '#0C7E67'
      }}>
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
          <span className="flex items-center justify-center px-6 py-4 text-white font-bold border-r border-white/10 rounded-l-2xl relative overflow-hidden" style={{
          width: "60px",
          maxWidth: "60px",
          fontSize: "24px",
          backgroundColor: '#134d3e'
        }}>
            <span className="relative z-10">{stepNumber}</span>
          </span>
          <span className="text-base md:text-lg flex-1 flex items-center justify-center py-4 relative z-10" style={{
          fontSize: "22px",
          fontWeight: "400"
        }}>{buttonText}</span>
        </motion.button>
      </motion.div>
    </div>;
};
