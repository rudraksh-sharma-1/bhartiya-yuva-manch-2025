'use client';
import React from "react";
import { Container } from "./container";
import { motion } from "motion/react";
import { easeOut } from "framer-motion";

const cardTransition = { duration: 0.7, ease: easeOut };

const About = () => {
  return (
    <section
      id="about"
      className="relative py-16 bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Purple Gradient Element */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-br from-purple-300 via-purple-200 to-transparent opacity-30 blur-3xl pointer-events-none z-0" />

      <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
        About
      </h2>

      <Container>
        <div className="relative z-10 flex flex-col gap-8 md:gap-12 items-stretch text-left">
          <motion.article
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 transition-transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-pink-400 outline-none"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...cardTransition, delay: 0.15 }}
            tabIndex={0}
            aria-label="About the Summer School Card"
          >
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed mb-8">
              Bhartiya Yuva Manch 2025 is not just an event—it is a national platform for youth
              empowerment, leadership, and innovation. Bringing together students from diverse regions,
              it fosters meaningful dialogue, idea exchange, and collaborative problem-solving.
              The activities inspire young leaders to think boldly, act responsibly,
              and contribute actively to India’s growth story. By encouraging innovation, teamwork, and
              visionary thinking, Bhartiya Yuva Manch 2025 empowers the youth to shape a progressive
              and sustainable future for the nation.
            </p>

            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12 items-stretch text-center">
              <div className="flex-1 bg-white/50 dark:bg-gray-700 rounded-lg p-6 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-300 mb-2">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                  To inspire students to become confident, innovative, and socially responsible leaders of tomorrow.
                </p>
              </div>

              <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-600" />
              <div className="block md:hidden h-px bg-gray-300 dark:bg-gray-600" />
              
              <div className="flex-1 bg-white/50 dark:bg-gray-700 rounded-lg p-6 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-300 mb-2">
                  Our Mission
                </h3>
                <p className="bold text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                  To cultivate confidence, entrepreneurship, and teamwork by engaging youth in hands-on learning and real-world challenges.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
};

export { About };
