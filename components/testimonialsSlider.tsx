"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Linkedin } from "lucide-react";

import TestimonialImg01 from "@/public/testimonials/ives.png";
import TestimonialImg02 from "@/public/testimonials/necoline.png";
import TestimonialImg03 from "@/public/testimonials/ioana.png";
import TestimonialImg04 from "@/public/testimonials/joana.png";
import TestimonialImg05 from "@/public/testimonials/tamas.png";
import TestimonialImg06 from "@/public/testimonials/oskar.png";

interface Testimonial {
  img: StaticImageData;
  url: string;
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialsSlider() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  const testimonials: Testimonial[] = [
    {
      img: TestimonialImg01,
      url: "https://www.linkedin.com/in/ivesvh/",
      quote:
        "From all the people that I've worked with, James is one of the people who has shown most ownership, reliability and clear communication. It's a joy to work with him, and you can be certain that he gets the job done when asked. He set up the whole support system at CodeSandbox, and even took on extra work like rewriting our website to a new technology stack",
      name: "Ives van Hoorne",
      role: "Founder & CTO",
    },
    {
      img: TestimonialImg02,
      url: "https://www.linkedin.com/in/necoline/",
      quote:
        "In the 2 years of working together James has cultivated a support system that goes beyond resolving customer concerns and has become an essential part of community building, product feedback and an important source of health metrics.",
      name: "Necoline Hubner",
      role: "Head of Product",
    },
    {
      img: TestimonialImg03,
      url: "https://www.linkedin.com/in/ioanachiorean/",
      quote:
        "I was lucky to work directly with James Amey on different initiatives that involved Engineering and Support. He always showed professionalism and cultivated and improved a community and customer support system. His involvement went beyond the role by helping both Product and Engineering with feedback, ideas, and solutions too. He is an instrumental part of dealing with customer success and community building. His attention to requests, managing priorities and severity of multiple tracks and products at times, was always impressive!",
      name: "Ioana Chiorean",
      role: "Engineering Manager",
    },
    {
      img: TestimonialImg04,
      url: "https://www.linkedin.com/in/joana-telker/",
      quote:
        "It is a pleasure to collaborate with James. He takes great pride in driving process improvement initiatives and compliance matters. It's been very refreshing to work with James because he concerns himself with matters beyond his responsibilities and gets involved where reinforcement is needed regardless of his role. I also very much appreciate his support in helping us shape our company culture. He has been fantastic about getting new team members integrated.",
      name: "Joana Telker",
      role: "People Operations Manager",
    },
    {
      img: TestimonialImg05,
      url: "https://www.linkedin.com/in/tamasszuromi/",
      quote:
        "What truly sets James apart is his proactive approach to problem-solving. He not only addressed incoming issues with expertise and empathy but also anticipated potential challenges, offering proactive solutions that enhanced our overall support experience. Beyond his technical proficiency, James is a fantastic collaborator and team player. He seamlessly integrated feedback, communicated effectively with everybody, and fostered a positive working environment that contributed to our collective success.",
      name: "Tamas Szuromi",
      role: "Product Manager & Data Analyst",
    },
    {
      img: TestimonialImg06,
      url: "https://www.linkedin.com/in/vaneeden/",
      quote:
        "For years he's been a driving force in customer support and has shown tremendous adaptation skills in handling different tasks: from streamlining how a product team categorizes and learns from support channel feedback, designing weekly reporting all the way up to handling vendor deals with an awareness of economics.",
      name: "Oskar van Eeden",
      role: "Head of Business Operations",
    },
  ];

  const handleSetActive = (index: number) => {
    setPrevious(active);
    setActive(index);
  };

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setPrevious(active);
      setActive((prev) => (prev + 1 === testimonials.length ? 0 : prev + 1));
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [autorotate, testimonials.length, active]);

  // Clear previous after animation completes
  useEffect(() => {
    if (previous !== null) {
      const timeout = setTimeout(() => setPrevious(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [previous]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  const getImageClasses = (index: number) => {
    if (index === active) {
      // Entering: fade in and rotate from tilted to straight
      return "opacity-100 rotate-0";
    }
    if (index === previous) {
      // Leaving: fade out and rotate away
      return "opacity-0 -rotate-[60deg]";
    }
    // Hidden: positioned for next entry
    return "opacity-0 rotate-[60deg]";
  };

  const getTextClasses = (index: number) => {
    if (index === active) {
      // Entering: slide in from right to center
      return "opacity-100 translate-x-0 relative";
    }
    if (index === previous) {
      // Leaving: slide out to left
      return "opacity-0 -translate-x-8 absolute inset-0";
    }
    // Hidden: positioned off-screen right for next entry
    return "opacity-0 translate-x-8 absolute inset-0 pointer-events-none";
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-colorlink/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 h-full -z-10 transition-all duration-700 ease-[cubic-bezier(0.68,-0.3,0.32,1)] ${getImageClasses(index)}`}
              >
                <a href={testimonial.url} target="_blank" rel="noreferrer">
                  <Image
                    className="relative top-11 left-1/2 -translate-x-1/2 rounded-sm"
                    src={testimonial.img}
                    width={56}
                    height={56}
                    alt={testimonial.name}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out ${getTextClasses(index)}`}
            >
              <div className="text-1xl w-1xl content-center before:content-['\201C'] after:content-['\201D'] min-h-[200px] sm:min-h-[125px] justify-center">
                {testimonial.quote}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`justify-center whitespace-nowrap rounded-sm px-3 py-1.5 m-1.5 text-s shadow-sm border border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-transparent dark:focus-visible:ring-transparent transition-colors duration-150 ${active === index ? "bg-white shadow-colorlink-950/10 dark:bg-neutral-800/90 dark:border-neutral-700" : "bg-gray-100 hover:bg-white dark:bg-neutral-800/40 hover:dark:bg-neutral-800/90 hover:dark:border-neutral-700"}`}
            onClick={() => {
              handleSetActive(index);
              setAutorotate(false);
            }}
          >
            <h2>{testimonial.name}</h2>
            <p className="opacity-50 text-xs">{testimonial.role}</p>
            <a
              target="_blank"
              href={testimonial.url}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="px-4 text-gray-500 hover:text-blue-500"
            >
              <Linkedin className="h-4 w-4 fill-current inline-block align-middle" />
            </a>
          </button>
        ))}
      </div>
    </div>
  );
}
