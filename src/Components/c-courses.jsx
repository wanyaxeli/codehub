'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Code2, Rocket, Lightbulb } from 'lucide-react';
import { useState } from 'react';



const CourseCard = ({
  icon,
  title,
  subtitle,
  gradeLevel,
  duration,
  lessons,
  outcomes,
  badge,
  badgeColor,
  difficultyLevel,
  difficultyBars,
  ctaText,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const bars = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className={`h-1.5 w-3 rounded-full transition-all ${
        i < difficultyBars ? 'bg-[#0097b2]' : 'bg-gray-300'
      }`}
    />
  ));

  return (
    <Card
      className={`privacy-infocollect-container group relative overflow-hidden rounded-2xl border-0 bg-white p-6 transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      } ${isHovered ? 'translate-y-[-8px]' : 'translate-y-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="privacy-infocollect-title mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#0097b2] to-cyan-600 text-white shadow-md transition-transform group-hover:scale-110">
          {icon}
        </div>

        {/* Title & Subtitle */}
        <h3 className="marginbottom-two mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="nav-title mb-4 text-sm text-gray-600">{subtitle}</p>

        {/* Details Row */}
        <div className="nav-title mb-5 flex flex-wrap gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-700">📚</span> {gradeLevel}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-700">⏱️</span> {duration}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-700">✓</span> {lessons}
          </div>
        </div>

        {/* Outcomes */}
        <div className="nav-title spacing-y-two mb-5 space-y-2">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="margintop-i mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#0097b2]" />
              <p className="text-sm text-gray-700">{outcome}</p>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="margin-btm-four ">
          <Badge className={`${badgeColor} commentpadding text-white border-0 text-xs font-semibold`}>
            {badge}
          </Badge>
        </div>

        {/* Difficulty Indicator */}
        <div className="margin-btm-four mb-6 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">{difficultyLevel}</span>
          <div className="flex gap-1">{bars}</div>
        </div>

        {/* CTA Button - with spacer to push to bottom */}
        <div className="mtauto mt-auto">
          <Button className="padding-yfour w-full rounded-lg bg-gradient-to-r from-[#0097b2] to-cyan-600 py-5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105 active:scale-95">
            {ctaText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function CourseSection() {
  const courses= [
    {
      icon: <Code2 className="h-7 w-7" />,
      title: 'Coding Explorer',
      subtitle: 'Building the Blocks of Technology',
      gradeLevel: 'Grade 1–3',
      duration: '6 months',
      lessons: '48 lessons',
      outcomes: [
        'Take the first steps into coding with fun, interactive lessons',
        'Learn through stories, games, and animations',
        'Perfect for first-time coders',
      ],
      badge: 'Beginner Friendly ✅',
      badgeColor: 'bg-green-500',
      difficultyLevel: 'Beginner',
      difficultyBars: 1,
      ctaText: 'Start Exploring Today',
    },
    {
      icon: <Rocket className="h-7 w-7" />,
      title: 'Coding Innovator',
      subtitle: 'From Curiosity to Creation',
      gradeLevel: 'Grade 4–6',
      duration: '12 months',
      lessons: '144 lessons',
      outcomes: [
        'Level up coding skills with guided projects',
        'Build real apps and design websites',
        'Ideal for students with basic coding experience',
      ],
      badge: 'Intermediate Level 🔹',
      badgeColor: 'bg-blue-500',
      difficultyLevel: 'Intermediate',
      difficultyBars: 2,
      ctaText: 'Level Up Your Coding',
    },
    {
      icon: <Lightbulb className="h-7 w-7" />,
      title: 'Coding Specialist',
      subtitle: 'Where Young Minds Master Big Tech',
      gradeLevel: 'Grade 7–8',
      duration: '12 months',
      lessons: '144 lessons',
      outcomes: [
        'Dive into Python and JavaScript development',
        'Work on advanced, real-world projects',
        'Designed for advanced learners ready to innovate',
      ],
      badge: 'Advanced Level 🌟',
      badgeColor: 'bg-purple-500',
      difficultyLevel: 'Advanced',
      difficultyBars: 3,
      ctaText: 'Become a Coding Specialist',
    },
  ];

  return (
    <section className="paddingysxtn w-full bg-slate-200 py-16 md:py-24">
      <div className="heroblogcontainer mxauto mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mbottomsxtn mb-16 text-center">
          <h2 className="margin-btm-four mb-4 text-balance text-4xl font-bold text-gray-900 md:text-5xl">
            Exploring Courses
          </h2>
          <p className="mxauto mx-auto mb-3 max-w-2xl text-xl text-gray-600">
            Unlock a Coding Course That Ignites Your Child's Imagination
          </p>
          <p className="text-sm text-gray-500">
            Choose the perfect learning journey based on your child's age and experience.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="mbottomsxtn mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="rounded-2xl  p-10 text-center md:p-16">
          {/* <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Not sure which course fits your child best?
          </h3>
          <p className="mb-8 text-gray-700">
            Let them try a lesson before committing.
          </p> */}
          <Button className="paddingy-six paddingx-ten rounded-full bg-gradient-to-r from-[#0097b2] to-cyan-600 px-10 py-6 text-base font-semibold text-white transition-all hover:shadow-xl hover:scale-105 active:scale-95">
            Book Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
