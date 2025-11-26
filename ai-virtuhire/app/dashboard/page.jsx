"use client";

import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

import {
  BriefcaseIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
  PlayIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const stats = [
    { label: "Total Interviews", value: "12", icon: BriefcaseIcon, color: "text-blue-600" },
    { label: "Pending Feedback", value: "3", icon: ClockIcon, color: "text-amber-600" },
    { label: "Avg. Score", value: "78%", icon: ChartBarIcon, color: "text-green-600" },
    { label: "This Week", value: "4", icon: CalendarIcon, color: "text-purple-600" },
  ];

  const quickFlows = [
    {
      title: "Coding & DSA drills",
      href: "/working",
      duration: "20 min • Focus mode",
      icon: PlayIcon,
    },
    {
      title: "Logical & aptitude round",
      href: "/logical-reasoning",
      duration: "MCQ style",
      icon: ChartBarIcon,
    },
    {
      title: "How VirtuHire works",
      href: "/about",
      duration: "2 min overview",
      icon: LightBulbIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Header (no extra profile here – navbar already has it) */}
        <section className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-600">
            VirtuHire · Interview Studio
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">
            Create AI-powered mock interviews, track your progress, and refine your skills.
          </p>
        </section>

        {/* Stats row */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              <div>
                <p className="text-xs font-medium text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
              <item.icon className={`h-7 w-7 ${item.color}`} />
            </div>
          ))}
        </section>

        {/* Start new mock interview – FULL WIDTH */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BriefcaseIcon className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Start a new mock interview
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Choose role, tech stack, and experience level. VirtuHire will generate smart questions.
          </p>

          {/* Your friend’s original gradient UI lives inside here */}
          <AddNewInterview />
        </section>

        {/* Quick practice flows + tip – also FULL WIDTH (simpler layout) */}
        <section className="grid gap-4 md:grid-cols-[2.1fr,1.2fr]">
          {/* Quick flows */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <PlayIcon className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Quick practice flows
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Jump directly into focused practice sessions.
            </p>
            <div className="space-y-2">
              {quickFlows.map((flow) => (
                <a
                  key={flow.title}
                  href={flow.href}
                  className="group flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 text-slate-800 shadow-sm transition-all hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <flow.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-sm font-medium">{flow.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">{flow.duration}</span>
                    <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Weekly tip */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <LightBulbIcon className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-900">
                Weekly tip
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              After each mock interview, write down 3 strengths and 3 improvements.
              Reviewing these before your next session will make your answers
              sharper and more confident.
            </p>
          </div>
        </section>

        {/* Previous interviews */}
        <section className="pb-10">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <ChartBarIcon className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Previous interviews
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Review attempts, revisit questions, or continue unfinished sessions.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <InterviewList />
          </div>
        </section>
      </main>
    </div>
  );
}
