// components/AboutSection/AboutSection.tsx
'use client';

import { useRef, useEffect, ReactNode } from 'react'; // Import ReactNode for children prop
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

interface AboutSectionProps {
  children: ReactNode; // This will be your Hero component
}

export default function AboutSection({ children }: AboutSectionProps) { // Accept children prop
  const sectionRef = useRef<HTMLElement>(null); // The About section itself
  const statementsRef = useRef<HTMLDivElement>(null); // For the staggered content
  const scrollWrapperRef = useRef<HTMLDivElement>(null); // New ref for the scroll container

  useEffect(() => {
    const ctx = gsap.context(() => {

      // --- Main Scroll Over Animation ---
      gsap.to(sectionRef.current, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: "+=100%", // Animates over a 100vh scroll distance
          scrub: 1,
          pin: true,
          pinSpacing: false,
          // markers: true // Uncomment for debugging scroll positions
        }
      });

      // --- Staggered Content Animation (inside About section) ---
      const statements = statementsRef.current?.children as HTMLCollectionOf<Element>;
      
      if (statements) {
        gsap.set(statements, {
          opacity: 0,
          y: 50
        });

        gsap.to(statements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            toggleActions: "play none none reverse",
            // markers: true // Uncomment for debugging
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // This wrapper acts as the total scrollable area for the transition
    // Its height will determine how much scroll is needed for the About section to cover the Hero
    <div ref={scrollWrapperRef} className="relative h-[200vh] overflow-hidden">
      {/*
        This is where your Hero component will be rendered.
        It's passed as 'children' to this AboutSection wrapper.
        Ensure your Hero component fills 100vh and has a lower z-index.
      */}
      <div className="absolute top-0 left-0 w-full h-screen z-10">
        {children} {/* This will render your Hero component */}
      </div>

      {/* The About Section slides up over the Hero */}
      <section ref={sectionRef} className="absolute bottom-0 left-0 w-full h-screen bg-white z-20 flex items-center">
        <div className="container mx-auto px-6 py-12">
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
    </div>
  );
}