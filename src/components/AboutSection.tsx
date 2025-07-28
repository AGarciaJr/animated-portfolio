"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const aboutStatements = [
  {
    id: 1,
    text: "I'm passionate about creating innovative solutions that solve real-world problems.",
    icon: "💡"
  },
  {
    id: 2,
    text: "I'm interested in artificial intelligence, machine learning, and the future of technology.",
    icon: "🤖"
  },
  {
    id: 3,
    text: "I'm dedicated to writing clean, efficient code that scales and performs.",
    icon: "⚡"
  },
  {
    id: 4,
    text: "I'm committed to continuous learning and staying ahead of emerging technologies.",
    icon: "📚"
  },
  {
    id: 5,
    text: "My goal is to build impactful applications that make a difference in people's lives.",
    icon: "🎯"
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statements = statementsRef.current?.children as HTMLCollectionOf<Element>;
    
    if (statements) {
      // Set initial state for all statements
      gsap.set(statements, {
        x: 200,
        opacity: 0,
        rotation: 15,
        scale: 0.8
      });

      // Create scroll-triggered animations
      gsap.to(statements, {
        x: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Parallax effect - make the section move up over the hero quickly and smoothly
    gsap.to(sectionRef.current, {
      yPercent: -40,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 0.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white/95 backdrop-blur-sm relative overflow-hidden -mt-64 pt-64 shadow-2xl z-20">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-newsreader), serif' }}>
            About
            <span className="block text-blue-600">Me</span>
          </h2>
        </div>

        {/* About Statements */}
        <div ref={statementsRef} className="max-w-4xl mx-auto space-y-8">
          {aboutStatements.map((statement) => (
            <div
              key={statement.id}
              className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                {statement.icon}
              </div>
              <div className="flex-1">
                <p className="text-xl text-gray-800 leading-relaxed"
                   style={{ fontFamily: 'var(--font-newsreader), serif' }}>
                  {statement.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-newsreader), serif' }}>
              Currently Studying
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto"
               style={{ fontFamily: 'var(--font-newsreader), serif' }}>
              Computer Science at Baylor University, focusing on software engineering, 
              data structures, algorithms, and modern web development technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 