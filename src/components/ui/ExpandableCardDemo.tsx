"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null),
  );

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center scrollbar-modern">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[100%] dark:bg-neutral-900"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    Register
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-50 md:h-40 flex-col items-start gap-4 overflow-y-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:max-h-80 md:text-sm lg:max-h-96 lg:text-base dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-lg gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl my-5 p-4 bg-gray-900 md:bg-transparent hover:bg-gray-300 md:h-50 md:flex-row dark:hover:bg-neutral-800"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 rounded-lg object-cover m-auto object-top md:h-30 md:w-30"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-center font-medium text-neutral-800 md:text-left dark:text-neutral-200"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-center text-neutral-600 md:text-left dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-green-500 hover:text-white md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Youth leading change!",
    title: "Youth Summit",
    src: "/youth-day.png",
    ctaText: "Details",
    ctaLink: "https://forms.gle/jxFJSpLA396cPNro8",
    content: () => {
      return (
        <p>
          <b>Registration Fees: 1 participant - ₹1600</b>
          <br />
          Participation - Individual <br />
          <br />
          Step into the nationalized version of a Model United Nations (MUN),
          where participants represent States, Union Territories, and National
          Ministries instead of countries. Engage in dynamic deliberations,
          draft impactful resolutions, and voice your stance on realtime
          national agendas through structured committee sessions. <br /> <br />{" "}
          Unlike traditional MUNs, there are no profile dossiers or research
          restrictions participants have the freedom to explore their agendas
          limitlessly, bringing creativity, critical thinking, and originality
          to the table. It’s a platform to discuss, debate, and design the
          future of India through youth-driven policymaking and innovative
          dialogue. <br />
          <br />
          <b>Contact:</b> <br />
          Shreya Bansal -{" "}
          <a
            href="tel:+91 92139 04040"
            className="text-blue-600 hover:underline"
          >
            +91 92139 04040
          </a>{" "}
          <br />
          Sudeeksha -{" "}
          <a
            href="tel:+91 93194 72527"
            className="text-blue-600 hover:underline"
          >
            +91 93194 72527
          </a>{" "}
          <br />
          Somya Jain -{" "}
          <a
            href="tel:+91 81683 64547"
            className="text-blue-600 hover:underline"
          >
            +91 81683 64547
          </a>{" "}
          <br />
        </p>
      );
    },
  },
  {
    description: "Win with the power of words!",
    title: "Debate Competition",
    src: "/debate.webp",
    ctaText: "Details",
    ctaLink: "https://forms.gle/z3qs5LCHwirpToga8",
    content: () => {
      return (
        <p>
          <b>Registration Fees: 1 participant - ₹250</b>
          <br />
          Participation - Individual <br />
          <br />
          Participants will select their agenda during registration. On the
          event day, each participant will be paired with an opponent. <br />
          <br />
          Stage 1: Speak against the motion. <br />
          Stage 2: Speak in Favor of the motion. <br />
          <br />
          After both rounds, shortlisted participants will advance based on
          their articulation, reasoning, and adaptability leading to the final
          declaration of winners. <br /> <br />
          <b>Session 1 Agenda:</b>
          <br /> ‘Exam frauds are not just administrative failures, but
          reflections of deeprooted corruption in society. <br />
          <br />
          <b>Session 2 Agenda:</b> <br /> ‘Do school policies sufficiently
          address student mental health and wellbeing?’ <br /> <br />
          <b>Contact:</b> <br />
          Shreya Bansal -{" "}
          <a
            href="tel:+91 92139 04040"
            className="text-blue-600 hover:underline"
          >
            +91 92139 04040
          </a>{" "}
          <br />
          Sudeeksha -{" "}
          <a
            href="tel:+91 93194 72527"
            className="text-blue-600 hover:underline"
          >
            +91 93194 72527
          </a>{" "}
          <br />
          Somya Jain -{" "}
          <a
            href="tel:+91 81683 64547"
            className="text-blue-600 hover:underline"
          >
            +91 81683 64547
          </a>{" "}
          <br />
        </p>
      );
    },
  },

  {
    description: "Show your musical talent!",
    title: "Music Competition",
    src: "/music-award.png",
    ctaText: "Details",
    ctaLink: "https://forms.gle/eHEJhcbbPRK4bcZZ8",
    content: () => {
      return (
        <p>
          <b>Registration Fees: 1 participant – ₹200</b>
          <br />
          Participation - Individual <br />
          <br />
          Participants will showcase their musical talents in two categories
          Indian Classical and Western Music. Performances will be evaluated by
          a panel of judges based on voice quality, expression, rhythm, and
          overall presentation. It’s a stage to celebrate melody, creativity,
          and confidence
          <br /> <br /> <b>1. Indian Classical Music -</b> Dive into the rich
          tradition of ragas and rhythm, highlighting the soulful depth of
          Indian melodies. <br />
          <br />
          <b>2. Western Music -</b> Showcase your versatility with contemporary,
          pop, or soulful western tunes that move the audience. <br /> <br />
          <b>Contact:</b> <br />
          Shreya Bansal -{" "}
          <a
            href="tel:+91 92139 04040"
            className="text-blue-600 hover:underline"
          >
            +91 92139 04040
          </a>{" "}
          <br />
          Sudeeksha -{" "}
          <a
            href="tel:+91 93194 72527"
            className="text-blue-600 hover:underline"
          >
            +91 93194 72527
          </a>{" "}
          <br />
          Somya Jain -{" "}
          <a
            href="tel:+91 81683 64547"
            className="text-blue-600 hover:underline"
          >
            +91 81683 64547
          </a>{" "}
          <br />
        </p>
      );
    },
  },
  {
    description: "Solve real business challenges!",
    title: "Business Case Study Competition",
    src: "/file-case.png",
    ctaText: "Details",
    ctaLink: "https://forms.gle/tPjiPEUy9cK5Vhjm8",
    content: () => {
      return (
        <p>
          <b>
            Registration Fees:
            <br />1 participant – ₹500
            <br />2 participants – ₹1000
          </b>
          <br />
          Participation - Individual / Duo <br />
          <br />
          Participants will be provided with a real-world business case study on
          the spot. They must analyses the situation, strategize solutions, and
          present their ideas through a PowerPoint presentation (PPT) prepared
          individually or with their team partners. The session will conclude
          with a Q&A round, where judges will assess clarity, innovation, and
          feasibility of the proposed strategies. <br /> <br />
          <b>Contact:</b> <br />
          Shreya Bansal -{" "}
          <a
            href="tel:+91 92139 04040"
            className="text-blue-600 hover:underline"
          >
            +91 92139 04040
          </a>{" "}
          <br />
          Sudeeksha -{" "}
          <a
            href="tel:+91 93194 72527"
            className="text-blue-600 hover:underline"
          >
            +91 93194 72527
          </a>{" "}
          <br />
          Somya Jain -{" "}
          <a
            href="tel:+91 81683 64547"
            className="text-blue-600 hover:underline"
          >
            +91 81683 64547
          </a>{" "}
          <br />
        </p>
      );
    },
  },
  {
    description: "Master the art of marketing!",
    title: "Marketing Marathon",
    src: "/bullhorn.png",
    ctaText: "Details",
    ctaLink: "https://forms.gle/DvgkVjEjp6K1Jt8W9",
    content: () => {
      return (
        <p>
          <b>
            Registration Fees:
            <br />1 participant – ₹600
            <br />2 participants – ₹1200
          </b>
          <br />
          Participation - Individual / Duo <br />
          <br />
          Participants will begin with a quick marketing quiz to test their
          conceptual understanding. Moving forward individuals or teams will
          then be given a product detail, for which they’ll create a marketing
          strategy and present it through a PPT. Evaluation will be based on
          creativity, market understanding, and presentation skills.
          <br />
          <br />
          <b>Contact:</b> <br />
          Shreya Bansal -{" "}
          <a
            href="tel:+91 92139 04040"
            className="text-blue-600 hover:underline"
          >
            +91 92139 04040
          </a>{" "}
          <br />
          Sudeeksha -{" "}
          <a
            href="tel:+91 93194 72527"
            className="text-blue-600 hover:underline"
          >
            +91 93194 72527
          </a>{" "}
          <br />
          Somya Jain -{" "}
          <a
            href="tel:+91 81683 64547"
            className="text-blue-600 hover:underline"
          >
            +91 81683 64547
          </a>{" "}
          <br />
        </p>
      );
    },
  },
];
