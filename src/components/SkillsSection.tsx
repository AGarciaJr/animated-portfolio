"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "GraphQL", level: 82 }
    ]
  },
  {
    category: "Design",
    skills: [
      { name: "Figma", level: 88 },
      { name: "Adobe Creative Suite", level: 85 },
      { name: "UI/UX Design", level: 90 },
      { name: "Prototyping", level: 87 }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 80 }
    ]
  }
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skillElements = skillsRef.current?.children as HTMLCollectionOf<Element>;
    
    if (skillElements) {
      // Set initial state
      gsap.set(skillElements, {
        y: 100,
        opacity: 0,
        scale: 0.7,
        rotation: -10
      });

      // Create scroll-triggered animations
      gsap.to(skillElements, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Newspaper texture background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Skills &
            <span className="block text-blue-600">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit for bringing creative visions to life
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scrapbook elements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 rounded-lg p-6 shadow-lg transform rotate-1">
            <div className="text-sm text-gray-600 mb-2">📚 Learning Journey</div>
            <div className="text-lg font-semibold text-gray-900">
              "Always learning, always growing"
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 shadow-lg transform -rotate-1">
            <div className="text-sm text-gray-600 mb-2">🎯 Focus Areas</div>
            <div className="text-lg font-semibold text-gray-900">
              "Specialized expertise in modern web technologies"
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 shadow-lg transform rotate-2">
            <div className="text-sm text-gray-600 mb-2">🚀 Innovation</div>
            <div className="text-lg font-semibold text-gray-900">
              "Pushing boundaries with cutting-edge solutions"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 