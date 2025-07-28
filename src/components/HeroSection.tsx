"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split text into individual characters for animation
    const title = titleRef.current;
    if (title) {
      const text = title.textContent || '';
      title.innerHTML = '';
      
      // Create spans for each character
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        span.style.display = 'inline-block';
        title.appendChild(span);
      });

      // Animate each character
      const chars = title.querySelectorAll('span');
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.5
      });
    }

    // Animate subtitle and CTA
    const tl = gsap.timeline({ delay: 2 });
    
    tl.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-newsreader), serif' }}
          >
            Hello
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-newsreader), serif' }}
          >
            I'm a Senior Computer Science student at Baylor university.
          </p>
        </div>
      </div>
    </section>
  );
} 