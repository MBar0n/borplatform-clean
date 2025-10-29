import React from 'react';
import { motion } from 'framer-motion';
import logoSmall from "@/assets/logos/BOROperatingSystem_logo small.png";
import { LeftSidebar } from '@/components/shared/LeftSidebar';
import { Footer } from '@/components/shared/Footer';

type BorBroComingSoonProps = Record<string, never>;

// @component: BorBroComingSoon
export const BorBroComingSoon = (_props: BorBroComingSoonProps) => {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950 relative">
      <LeftSidebar activePage="bor-bro" />

      <div className="flex-1 relative overflow-hidden ml-[72px] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#cedc2e]/10 via-white dark:via-slate-950 to-[#1F9D7E]/5" />

        <div className="relative flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center gap-12 px-6"
            >
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40"
            >
              <img src={logoSmall} alt="BOR Operating System" className="w-full h-full object-contain" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-slate-100 text-center tracking-tight"
            >
              BOR BRO
            </motion.h1>

            <div className="relative flex flex-col items-center w-64 pt-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full h-1 bg-gradient-to-r from-transparent via-[#1F9D7E] to-transparent"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-full"
              >
                <div className="w-6 h-10 border-2 border-[#cedc2e] rounded-full flex justify-center pt-2">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 bg-[#cedc2e] rounded-full"
                  />
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-2xl md:text-3xl text-gray-600 dark:text-slate-400 text-center tracking-wide"
            >
              Coming Soon!
              <br />
              Your complete AI tool
            </motion.p>
          </div>

            </motion.div>
        </div>

        <div className="relative z-10">
          <Footer />
        </div>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-[#cedc2e] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
