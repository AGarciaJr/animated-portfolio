"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless user experience and robust backend architecture.",
    image: "🛒",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Mobile App Design",
    category: "UI/UX Design",
    description: "Intuitive mobile interface that prioritizes user engagement and accessibility.",
    image: "📱",
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Data Visualization",
    category: "Data Science",
    description: "Interactive dashboards that transform complex data into actionable insights.",
    image: "📊",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 4,
    title: "Creative Portfolio",
    category: "Web Design",
    description: "Personal portfolio showcasing creative work with innovative animations and interactions.",
    image: "🎨",
    color: "from-pink-500 to-rose-600"
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projectElements = projectsRef.current?.children as HTMLCollectionOf<Element>;
    
    if (projectElements) {
      // Set initial state
      gsap.set(projectElements, {
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotation: 5
      });

      // Create scroll-triggered animations
      gsap.to(projectElements, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.2,
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Newspaper background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Featured
            <span className="block text-blue-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of work that showcases innovation, creativity, and technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Project Card */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl mr-4`}>
                    {project.image}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
                    View Project →
                  </button>
                  <div className="text-xs text-gray-400">
                    Project #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Newspaper corner fold effect */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-gray-100 opacity-60" />
            </div>
          ))}
        </div>

        {/* Scrapbook elements */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-yellow-50 rounded-lg p-6 shadow-lg transform rotate-1">
            <div className="text-sm text-gray-600 mb-2">📌 Scrapbook Note</div>
            <div className="text-lg font-semibold text-gray-900">
              "Every project is a story waiting to be told"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 