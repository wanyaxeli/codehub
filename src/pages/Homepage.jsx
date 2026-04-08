// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import faqsData from '@/lib/faq';
import testimonialsData from '@/lib/testimonials';
import howItWorksData from '@/lib/howitworks';
import coursesData from '@/lib/courses';
import benefitsData from '@/lib/benefits';
import { CheckCircle2, PlayCircle, ArrowRight, Star, BookOpen, Users, Target, Sparkles, ChevronDown, Code, Calculator, Laptop, ChevronLeft, ChevronRight, TerminalIcon, Terminal, GraduationCapIcon, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import heropic from '../assets/black kids.jpg'
// import HeaderDetails from '@/Components/HeaderDetails';
import HeaderSection from '@/Components/code-headers'
// import Footer from '@/components/Footer';
import Footer from '@/Components/newFooter';
import { Link, Navigate, useNavigate } from 'react-router-dom';


// --- Utility Components & Animations ---
// : { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" | "none" }

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// : { src: string, alt: string, className?: string }

const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[130%] -mt-[15%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// --- Page Sections ---

const HeroSection = () => {
  const ref = useRef(null);
  const navigate=useNavigate()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="homeherosect relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[var(--primarysec)]sec/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-accentsec/5 blur-3xl" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="homeheropadxsix mxauto container mx-auto px-6 md:px-12 max-w-[120rem] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div style={{ y: yText, opacity: opacityText }} className="max-w-2xl">
            <FadeIn delay={0.1}>
              <div className="paddingy-two paddingx-four privacy-infocollect-description inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primarysec)]/10 text-[var(--primarysec)] font-heading text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Empowering Young Minds</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="privacy-infocollect-description font-heading font-bold text-[var(--foregroundsec)] leading-[1.1] tracking-tight mb-6 text-balance">
                <span className='text-3xl md:text-4xl lg:text-5xl'>
                  Think. Code. Solve. — Live
                </span>{"  "}
                <span className="text-[var(--primarysec)] text-5xl md:text-6xl lg:text-7xl">
                  Coding
                </span>{"  "}
                <span className='text-5xl md:text-6xl lg:text-6xl'>&</span>{" "}
                <span className="text-[var(--accentsec)] text-5xl md:text-6xl lg:text-7xl">
                  Math
                </span>{"  "}
                <span className='text-3xl md:text-4xl lg:text-5xl'>
                Classes for kids

                </span>
              </h1>

            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="group-header text-lg md:text-xl text-[var(--foregroundsec)]/70 font-paragraph mb-8 text-balance max-w-xl">
                Helping Students build real coding and math skills, confidence, and problem-solving ability through expert-led live classes.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className='flex items-start justify-between '>
              <ul className="spacing-y-three mb-ten space-y-3 mb-10">
                {[
                  "Live teacher-led classes",
                  "Project-based learning ",
                  "Beginner friendly"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--foregroundsec)]/80 font-paragraph font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accentsec)]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accentsec)]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
              size="lg" 
              className=" md:flex hidden paddingx-eight  cursor-pointer border-![var(--primarysec)]/20 text-white hover:text-white !bg-[var(--accentsec)] hover:!bg-[var(--primarysec)]/55 font-heading text-lg h-14 px-8 rounded-xl transition-all"
              onClick={()=>{navigate('/register')}}>
                Book Free Trial
              </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 md:hidden ">
              <Button size="lg" className="paddingx-eight bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-white font-heading text-lg h-14 px-8 rounded-xl shadow-lg shadow-[var(--accentsec)]/20 transition-all hover:scale-105"
              onClick={()=>{navigate('/register')}}>
                Book Free Trial Class
              </Button>
              {/* <Button size="lg" variant="outline" className="paddingx-eight border-[var(--primarysec)]/20 text-[var(--primarysec)] hover:bg-[var(--primarysec)]/5 font-heading text-lg h-14 px-8 rounded-xl transition-all">
                View Courses
              </Button> */}
            </FadeIn>
          </motion.div>

          {/* Right Image Composition */}
          <FadeIn delay={0.3} direction="left" className="relative h-[60vh] lg:h-[80vh] w-full  md:block">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[var(--primarysec)]/10">
              <Image 
                src="https://media.istockphoto.com/id/2236084141/photo/portrait-of-teenage-black-girl-smiling-while-learning-coding-in-classroom.jpg?s=612x612&w=0&k=20&c=qjhuZmS2uRgcR1MT-F7aNPBqcQPzccw-x1NfnAAywX8=" 
                alt="Kids learning coding on laptops" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primarysec)]/20 to-transparent mix-blend-overlay" />
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="paddingone absolute -left-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-[var(--primarysec)]/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--primarysec)]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[var(--primarysec)]" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm">1000+</p>
                <p className="font-paragraph text-xs text-[var(--foregroundsec)]/60">Active Students</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="paddingone absolute -right-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-[var(--accentsec)]/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--accentsec)]/10 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-[var(--accentsec)]" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm">500+</p>
                <p className="font-paragraph text-xs text-[var(--foregroundsec)]/60">Projects built</p>
              </div>
            </motion.div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

// : { data: Benefits[], isLoading: boolean }
const BenefitsSection = ({ data, isLoading }) => {
  const icons = [Users, Laptop, Target, BookOpen]; // Fallback icons

  return (
    <section id="benefits" className="py-twentyfour py-24 bg-slate-50 relative">
      <div className="homeheropadxsix mxauto container mx-auto px-6 md:px-12 max-w-[120rem]">
        <div className="mxauto mb-sxtn text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="privacy-infocollect-description text-3xl md:text-5xl font-heading font-bold text-[var(--foregroundsec)] mb-6">
              Why Choose <span className="text-[var(--primarysec)]">Coding Scholar</span>
            </h2>
            <p className="text-lg text-[var(--foregroundsec)]/70 font-paragraph">
              We provide a supportive, interactive environment where children thrive and build essential skills for the future.
            </p>
          </FadeIn>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {data.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            return (
              <FadeIn key={benefit._id} delay={index * 0.1} className="h-full">
                <div className="groupstdnt-container bg-white rounded-3xl p-8 h-full shadow-lg shadow-[var(--primarysec)]/5 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="privacy-infocollect-description w-16 h-16  rounded-2xl bg-[var(--primarysec)]/5 flex items-center justify-center mb-6 group-hover:bg-[var(--primarysec)] group-hover:text-white transition-colors duration-300">
                    {benefit.benefitImage ? (
                       <Image src={benefit.benefitImage} alt={benefit.benefitTitle || "Benefit"} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <Icon className="w-7 h-7 text-[var(--primarysec)] group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <h3 className="nav-title text-xl font-heading font-bold text-[var(--foregroundsec)] mb-4">{benefit.benefitTitle}</h3>
                  <p className="text-[var(--foregroundsec)]/70 font-paragraph leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// : { data: Courses[], isLoading: boolean }

const CoursesSection = ({ data, isLoading }) => {
  const containerRef = useRef(null);

  return (
    <section id="courses" ref={containerRef} className="py-thirtytwo py-32 bg-white relative">
      <div className="mxauto homeheropadxsix container mx-auto px-6 md:px-12 max-w-[120rem]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <FadeIn>
                <div className="privacy-infocollect-description w-12 h-1 bg-[var(--accentsec)] mb-6 rounded-full" />
                <h2 className="privacy-infocollect-description text-4xl md:text-5xl font-heading font-bold text-[var(--foregroundsec)] mb-6 leading-tight">
                  Explore Our <br/><span className="text-[var(--primarysec)]">Programs</span>
                </h2>
                <p className="group-header text-lg text-[var(--foregroundsec)]/70 font-paragraph mb-8">
                  Tailored curriculum designed to engage young minds, from block-based coding to advanced math concepts.
                </p>
                <Button className="group-stdtsection !bg-[var(--primarysec)] hover:!bg-[var(--primarysec)]/90 text-white font-heading rounded-xl h-12 px-6 hidden lg:inline-flex">
                  View All Courses
                </Button>
              </FadeIn>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className={`spacing-y-twelve lg:col-span-8 space-y-12 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {data.map((course, index) => (
              <FadeIn key={course._id} delay={0.1} direction="left">
                <div className="group bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-slate-100 hover:shadow-2xl hover:shadow-[var(--primarysec)]/10 transition-all duration-500">
                  <div className="md:w-2/5 relative overflow-hidden min-h-[250px]">
                    <Image 
                      src={course.courseImage || "https://static.wixstatic.com/media/fc528a_a7e2492779e2459495db86b866fa2674~mv2.png?originWidth=640&originHeight=384"} 
                      alt={course.courseTitle || "Course"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="px-three py-one absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-lg font-heading font-bold text-[var(--accentsec)]">
                      {course.targetAgeGroup || "All Ages"}
                    </div>
                  </div>
                  <div className="paddin-ten md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-[var(--foregroundsec)] mb-4 group-hover:text-[var(--primarysec)] transition-colors">
                      {course.courseTitle}
                    </h3>
                    <p className="group-header text-[var(--foregroundsec)]/70 font-paragraph mb-8 line-clamp-3">
                      {course.shortDescription}
                    </p>
                    <div className="mtauto mt-auto">
                      <Button variant="ghost" className="p-0 hover:bg-transparent text-[var(--accentsec)] font-heading font-bold group/btn">
                        Learn More 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// : { data: HowItWorks[], isLoading: boolean }
const HowItWorksSection = ({ data, isLoading }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="py-thirtytwo py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--primarysec)] via-transparent to-transparent" />
      
      <div className="mxauto homeheropadxsix container mx-auto px-6 md:px-12 max-w-[120rem] relative z-10">
        <div className="mxauto mb-twentyfour text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <h2 className="privacy-infocollect-description text-3xl md:text-5xl font-heading font-bold mb-6">
              How It <span className="text-[var(--accentsec)]">Works</span>
            </h2>
            <p className="text-lg text-slate-300 font-paragraph">
              A simple, seamless process to get your child started on their learning journey.
            </p>
          </FadeIn>
        </div>

        <div className={`mxauto relative max-w-4xl mx-auto transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {/* Central Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-[var(--accentsec)] -translate-x-1/2 rounded-full origin-top"
          />

          <div className="howitworksspacing-y  space-y-16 md:space-y-24">
            {data.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step._id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[28px] md:left-1/2 w-14 h-14 bg-slate-900 border-4 border-[var(--accentsec)] rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(210,65,19,0.3)]">
                    <span className="font-heading font-bold text-xl text-white">{step.stepNumber}</span>
                  </div>

                  {/* Content */}
                  <div className={`pl-twenty w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'pr-sxtn md:pr-16 text-left md:text-right' : 'pl-sxtn md:pl-16 text-left'}`}>
                    <FadeIn direction={isEven ? "right" : "left"}>
                      <div className="groupstdnt-container bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-[var(--primarysec)]/50 transition-colors">
                        <h3 className="nav-title text-2xl font-heading font-bold mb-4 text-white">{step.stepTitle}</h3>
                        <p className="text-slate-300 font-paragraph leading-relaxed">
                          {step.stepDescription}
                        </p>
                      </div>
                    </FadeIn>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ForParentsSection = () => {
  const navigate=useNavigate()
  return (
    <section className="py-twentyfour py-24 bg-white relative overflow-hidden">
      <div className="homeheropadxsix mxauto container mx-auto px-6 md:px-12 max-w-[120rem]">
        <div className="bg-[var(--primarysec)] rounded-[3rem] overflow-hidden relative flex flex-col lg:flex-row items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:absolute lg:inset-y-0 lg:right-0">
            <Image 
              src="https://static.vecteezy.com/system/resources/thumbnails/070/384/192/small/smiling-african-american-mom-helping-her-studying-kid-looking-at-computer-screen-copy-space-happy-black-school-girl-using-laptop-having-online-lesson-while-coronavirus-pandemic-kitchen-interior-photo.jpg"
              alt="Child learning at home" 
              className="w-full h-full items-center object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primarysec)] via-[var(--primarysec)]/80 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primarysec)] via-transparent to-transparent hidden lg:block" />
          </div>

          {/* Content Side */}
          <div className="home-p-ten w-full lg:w-1/2 p-10 md:p-16 lg:p-24 relative z-10 text-white">
            <FadeIn>
              <div className="paddingy-two paddingx-four group-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md font-heading text-sm font-semibold mb-8">
                <Users className="w-4 h-4" />
                <span>For Parents</span>
              </div>
              <h2 className="group-header text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                Building Skills for the <span className="text-[var(--accentsec)]">Future</span>
              </h2>
              <p className="mb-ten text-lg md:text-xl font-paragraph text-white/90 leading-relaxed mb-10">
                “Coding and strong math skills help children develop logical thinking, creativity, and problem-solving abilities. At Coding Scholar, our live online classes create a supportive learning environment where students build confidence while developing valuable skills for the future.”
              </p>
              <Button
               className="paddingx-eight bg-white text-[var(--primarysec)] hover:bg-slate-100 font-heading text-lg h-14 px-8 rounded-xl shadow-xl"
               onClick={()=>{
                navigate('/about-us#our-approach')
               }}
               >
                Learn About Our Methodology
              </Button>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

// : { data: Testimonials[], isLoading: boolean }
const TestimonialsSection = ({ data, isLoading }) => {
  const testimonialData=data
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const testimoniallist=[...data,...data,...data]
  const ITEMS_PER_SLIDE = 3;
  const AUTO_SLIDE_DELAY = 8000;
  const totalSlides = Math.ceil(testimonialData.length / ITEMS_PER_SLIDE);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [isHovered, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const startIndex = currentIndex * ITEMS_PER_SLIDE;
  const currentTestimonials = testimonialData.slice(
    startIndex,
    startIndex + ITEMS_PER_SLIDE
  );

  return (
    <section 
    id="testimonials" 
    className="py-thirtytwo py-32 bg-slate-50 overflow-hidden"
    // onMouseEnter={()=>setIsHovered(true)}
    // onMouseLeave={()=>setIsHovered(false)}
    >
      <div className="mxauto homeheropadxsix container mx-auto px-6 md:px-12 max-w-[120rem]">
        <div className="mxauto mb-twenty text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <h2 className="privacy-infocollect-description text-3xl md:text-5xl font-heading font-bold text-[var(--foregroundsec)] mb-6">
              Loved by <span className="text-[var(--primarysec)]">Parents</span> & Kids
            </h2>
            <p className="text-lg text-[var(--foregroundsec)]/70 font-paragraph">
              Don't just take our word for it. Hear from the families who have joined the Coding Scholar community.
            </p>
          </FadeIn>
        </div>
        
        {/* couresel */}
        <div className='relative'>
        <div className={`flex flex-wrap justify-center gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          
          {currentTestimonials.map((testimonial, index) => (
            <FadeIn key={testimonial._id} delay={index * 0.1} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]">
              <div className="pad-eight-homsect bg-white p-8 md:p-10 rounded-[2rem] shadow-lg shadow-[var(--primarysec)]/5 border border-slate-100 h-full flex flex-col relative">
                <div className="absolute top-8 right-8 text-[var(--accentsec)]/20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.182C14.618 14.136 13.204 12.664 13.204 10.841C13.204 8.981 14.713 7.472 16.573 7.472C18.433 7.472 19.942 8.981 19.942 10.841C19.942 13.536 18.16 18.655 15.64 21H14.017ZM5.017 21L7.411 14.182C5.618 14.136 4.204 12.664 4.204 10.841C4.204 8.981 5.713 7.472 7.573 7.472C9.433 7.472 10.942 8.981 10.942 10.841C10.942 13.536 9.16 18.655 6.64 21H5.017Z" />
                  </svg>
                </div>
                
                <div className="privacy-infocollect-description flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--accentsec)] text-[var(--accentsec)]" />
                  ))}
                </div>
                
                <p className="group-header text-[var(--foregroundsec)]/80 font-paragraph text-lg leading-relaxed mb-8 flex-grow italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="mtauto flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-[var(--primarysec)]/10 overflow-hidden flex-shrink-0">
                    {testimonial.photo ? (
                      <Image src={testimonial.photo} alt={testimonial.parentName || "Parent"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--primarysec)] font-heading font-bold">
                        {testimonial.parentName?.charAt(0) || "P"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[var(--foregroundsec)]">{testimonial.parentName}</h4>
                    <p className="text-sm text-[var(--foregroundsec)]/60 font-paragraph">{testimonial.studentGrade}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* indicator dots  */}
        <div className="mt-twelve flex justify-center gap-2 mt-12">
          <div>
          <button
            onClick={goToPrevious}
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors z-10 hidden lg:flex items-center justify-center"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          </div>

          <div className='flex gap-2 items-center '>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-slate-300 hover:bg-slate-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          </div>

          <button
            onClick={goToNext}
            className=" p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors z-10 hidden lg:flex items-center justify-center"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>



        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate=useNavigate()
  return (
    <section className="py-twentyfour py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--accentsec)]" />
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      
      <div className="mxauto homeheropadxsix container mx-auto px-6 md:px-12 max-w-[120rem] relative z-10 text-center">
        <FadeIn>
          <h2 className="mxauto privacy-infocollect-description text-4xl md:text-6xl font-heading font-bold text-white mb-6 text-balance max-w-4xl mx-auto">
            Start Your Child’s Coding Journey Today
          </h2>
          <p className="mxauto mb-ten text-xl text-white/90 font-paragraph mb-10 max-w-2xl mx-auto">
            Book a free trial class and see how fun learning coding and math can be.
          </p>
          <Button size="lg" 
          className="paddingx-ten cursor-pointer bg-white text-[var(--accentsec)] hover:bg-slate-100 font-heading text-xl h-16 px-10 rounded-2xl shadow-2xl transition-transform hover:scale-105"
          onClick={()=>{navigate('/register')}}>
            Book Free Trial
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

// : { data: FrequentlyAskedQuestions[], isLoading: boolean }
const FAQSection = ({ data, isLoading }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-thirtytwo py-32 bg-white">
      <div className="mxauto homeheropadxsix container mx-auto px-6 md:px-12 max-w-[120rem]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-5">
            <FadeIn>
              <h2 className="privacy-infocollect-description text-3xl md:text-5xl font-heading font-bold text-[var(--foregroundsec)] mb-6">
                Frequently Asked <span className="text-[var(--primarysec)]">Questions</span>
              </h2>
              <p className="group-header text-lg text-[var(--foregroundsec)]/70 font-paragraph mb-8">
                Everything you need to know about our classes, curriculum, and how we help your child succeed.
              </p>
              <div className="hidden lg:block w-full h-64 rounded-3xl overflow-hidden relative">
                 <Image 
                  src="https://static.wixstatic.com/media/fc528a_cd72533b19e54518b27f4d79161326d6~mv2.png?originWidth=640&originHeight=384" 
                  alt="Student asking question" 
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          <div className={`lg:col-span-7 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="scheduleclass-modalspacing space-y-4">
              {data.map((faq, index) => (
                <FadeIn key={faq._id} delay={index * 0.05}>
                  <div 
                    className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-[var(--primarysec)] bg-[var(--primarysec)]/5' : 'border-slate-200 bg-white hover:border-[var(--primarysec)]/30'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="paddingx-six paddingy-five w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="pr-eight font-heading font-bold text-lg text-[var(--foregroundsec)] pr-8">{faq.question}</span>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'bg-[var(--primarysec)] text-white rotate-180' : 'bg-slate-100 text-[var(--foregroundsec)]/50'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="paddingx-six pb-six px-6 pb-6 text-[var(--foregroundsec)]/70 font-paragraph leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---

export default function Home() {
  const [benefits, setBenefits] = useState([]);
  const [courses, setCourses] = useState([]);
  const [howItWorks, setHowItWorks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // const [benefitsData, coursesData, howItWorksData, testimonialsData, faqsData] = await Promise.all([
      //   BaseCrudService.getAll<Benefits>('benefits'),
      //   BaseCrudService.getAll<Courses>('courses'),
      //   BaseCrudService.getAll<HowItWorks>('howitworks'),
      //   BaseCrudService.getAll<Testimonials>('testimonials'),
      //   BaseCrudService.getAll<FrequentlyAskedQuestions>('faq')
      // ]);

      setBenefits(benefitsData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      setCourses(coursesData.items);
      setHowItWorks(howItWorksData.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
      setTestimonials(testimonialsData.items);
      setFaqs(faqsData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-[var(--foregroundsec)] overflow-clip selection:bg-[var(--primarysec)]/20 selection:text-[var(--primarysec)]">
      <HeaderSection/>
                    <main>
        <HeroSection />
        <BenefitsSection data={benefits} isLoading={isLoading} />
        <CoursesSection data={courses} isLoading={isLoading} />
        <HowItWorksSection data={howItWorks} isLoading={isLoading} />
        <ForParentsSection />
        <TestimonialsSection data={testimonials} isLoading={isLoading} />
        <CTASection />
        <FAQSection data={faqs} isLoading={isLoading} />
      </main>

      <Footer />
    </div>
  );
}