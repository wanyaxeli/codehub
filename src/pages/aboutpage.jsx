import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/Components/layoutss/code-headers';
import Footer from '@/Components/layoutss/newFooter';
import { Zap, Brain, Lightbulb, Users, Code, CheckCircle, Rocket, ChevronDown } from 'lucide-react';
import { Navigate, useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function AboutPage() {
  const navigate=useNavigate()

  const location = useLocation();


  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      // small delay ensures DOM is fully rendered
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
    }
  }, [location]);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
    viewport: { once: true },
  };

  const scrollBounce = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-white via-white to-blue-50/30 flex items-center justify-center overflow-hidden">
        {/* Subtle Coding-Themed Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-foreground/30">
          {/* Subtle code brackets */}
          <div className="absolute top-20 left-10 text-foreground/5 text-8xl font-bold">&lt;&gt;</div>
          <div className="absolute bottom-32 right-16 text-foreground/5 text-8xl font-bold">{'{ }'}</div>
          
          {/* Subtle flow lines */}
          <svg className="absolute inset-0 w-full h-full opacity-8" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Subtle node connections */}
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="currentColor" strokeWidth="1" />
            <line x1="70%" y1="30%" x2="85%" y2="60%" stroke="currentColor" strokeWidth="1" />
            <line x1="20%" y1="70%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" />
            <circle cx="10%" cy="20%" r="3" fill="currentColor" />
            <circle cx="30%" cy="40%" r="3" fill="currentColor" />
            <circle cx="70%" cy="30%" r="3" fill="currentColor" />
            <circle cx="85%" cy="60%" r="3" fill="currentColor" />
            <circle cx="20%" cy="70%" r="3" fill="currentColor" />
            <circle cx="50%" cy="80%" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Content */}
        <div className=" py-twelve mxauto paddingx-four relative z-10 max-w-[100rem] mx-auto px-4 md:paddingxeight text-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-eight"
          >
            <h1 className="privacy-infocollect-description font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Building Future{' '}
              <span className="!text-[var(--primarysec)]">Coders</span>
              {' '}&{' '}
              <span className="!text-[var(--accentsec)]">Problem Solvers</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mbottomtwelve"
          >
            <p className="mxauto font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              At Coding Scholar, we empower students with real-world coding and math skills through live, personalized learning experiences designed to build confidence and creativity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="paddingx-ten py-seven !bg-[var(--accentsec)] hover:!bg-[var(--accentsec)]/90 text-white font-semibold text-lg px-10 py-7 rounded-xl transition-all hover:shadow-lg hover:scale-105"
              onClick={() => {
                navigate('/register')
              }}
            >
              Start Free Lesson
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          {...scrollBounce}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-8 h-8 text-foreground/40" />
        </motion.div>
      </section>

     {/* who we are */}
      <section className="paddingysxtn w-full py-16 md:paddingy-twentyfour bg-white">
        <div className="!mxauto !aboutsection  mx-auto paddingxfour md:paddingxeight">
          <motion.div {...fadeInUp} className="paddingxeight grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground privacy-infocollect-description">
                Who We Are
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-four leading-relaxed">
                At Coding Scholar, we believe every child has the potential to become a creator. We provide live, one-on-one online coding classes designed specifically for K-12 students, where they learn to build apps, design games, and develop websites—all while having fun.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 privacy-infocollect-description leading-relaxed">
                Our expert instructors bring real-world computer science knowledge and a passion for teaching. They create a supportive learning environment where questions are encouraged, progress is celebrated, and every student feels confident to explore their creativity.
              </p>
              <div className="flex items-center gap-3 text-[var(--primarysec)] font-semibold">
                <CheckCircle className="w-6 h-6" />
                <span>Personalized learning for every student</span>
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://media.istockphoto.com/id/1147656399/photo/smiling-computer-girl-portrait.jpg?s=612x612&w=0&k=20&c=VRq4_ACcWAj_FIt7ZtF7hGBHN19oc1nWRtWf-laccao="
                  alt="Child learning coding online on laptop"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full paddingysxtn md:paddingy-twentyfour bg-gradient-to-br from-[var(--primarysec)]/5 to-[var(--accentsec)]/5">
        <div className="max-w-[100rem] mxauto paddingx-four md:paddingxeight">
          <motion.div {...fadeInUp} className="text-center mbottomtwelve">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-four">
              Our Mission & Vision
            </h2>
            <p className="font-paragraph text-lg text-foreground/70">
              Guiding our commitment to education and innovation
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-eight shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[var(--primarysec)]/10 rounded-full paddingfour flex-shrink-0">
                  <Rocket className="w-8 h-8 text-[var(--primarysec)]" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground privacy-infocollect-title">
                    Our Mission
                  </h3>
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                    To spark passion for coding and empower future creators to shape the world through technology.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-eight shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[var(--accentsec)]/10 rounded-full paddingfour flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-[var(--accentsec)]" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground privacy-infocollect-title">
                    Our Vision
                  </h3>
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                    A world where every child has the skills and confidence to innovate, solve problems, and lead in a technology-driven future.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Learn Coding Section */}
      <section 
      className="w-full paddingysxtn md:paddingy-twentyfour bg-white">
        <div className="max-w-[100rem] mxauto paddingx-four md:paddingxeight">
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="overflow-hidden ">
                <Image
                  src="https://media.istockphoto.com/id/1413219514/vector/kids-with-laptop-learn-coding-programing-vector-illustration.jpg?s=612x612&w=0&k=20&c=ORAbk6NS_zG9gawzk1JDPxGoISyDJK1K4t8efAVBZ2Q="
                  alt="Children coding together and learning"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div {...fadeInUp} className="order-1 md:order-2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-eight">
                Why Learn Coding?
              </h2>

              <div className="spacing-y-six">
                {[
                  {
                    icon: Brain,
                    title: 'Problem-Solving Skills',
                    description: 'Coding teaches children to break down complex problems into manageable steps.',
                  },
                  {
                    icon: Zap,
                    title: 'Logical Thinking',
                    description: 'Students develop structured thinking patterns that apply to all areas of learning.',
                  },
                  {
                    icon: Lightbulb,
                    title: 'Creativity & Innovation',
                    description: 'Kids bring their ideas to life by building games, apps, and interactive projects.',
                  },
                  {
                    icon: Users,
                    title: 'Confidence & Collaboration',
                    description: 'Success in coding builds self-esteem and teaches teamwork and communication.',
                  },
                  {
                    icon: Rocket,
                    title: 'Future-Ready Skills',
                    description: 'Coding opens doors to countless career opportunities in our digital world.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--primarysec)]/10">
                        <item.icon className="h-6 w-6 text-[var(--primarysec)]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-one">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id='our-approach'
       className="w-full paddingysxtn !scroll-mt-20 md:paddingy-twentyfour bg-gradient-to-br from-[var(--primarysec)]/5 to-[var(--accentsec)]/5">
        <div className="max-w-[100rem] mxauto paddingx-four md:paddingxeight">
          <motion.div {...fadeInUp} className="text-center mbottomtwelve">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-four">
              Our Approach to Learning
            </h2>
            <p className="mxauto font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              We've designed our teaching methodology to ensure every student thrives and enjoys the learning journey.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: 'Live Interactive Classes',
                description:
                  'Students learn directly from expert teachers in real time. They can ask questions instantly, get immediate feedback, and stay fully engaged throughout each session.',
              },
              {
                icon: Code,
                title: 'Project-Based Learning',
                description:
                  'Rather than just theory, students build real projects like games, apps, and websites. This hands-on approach makes learning practical, memorable, and genuinely fun.',
              },
              {
                icon: Zap,
                title: 'Qualified Instructors',
                description:
                  'Our teachers bring strong computer science expertise and proven teaching experience. They create a supportive environment where every student feels encouraged to learn and grow.',
              },
              {
                icon: CheckCircle,
                title: 'Dedicated Support Sessions',
                description:
                  'After each module, we hold dedicated support sessions to answer questions and reinforce key concepts. This ensures every child fully grasps the material before moving forward.',
              },
              {
                icon: Rocket,
                title: 'Continuous Progress Tracking',
                description:
                  'Parents receive regular updates on their child\'s development, achievements, and milestones. You\'ll always know how your child is progressing.',
              },
              {
                icon: Lightbulb,
                title: 'Personalized Learning Paths',
                description:
                  'Each student learns at their own pace with customized lessons tailored to their skill level and interests, ensuring optimal growth and engagement.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-eight shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-[var(--primarysec)]/10 rounded-full paddingfour w-fit mb-four">
                  <item.icon className="w-8 h-8 text-[var(--primarysec)]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground privacy-infocollect-title">
                  {item.title}
                </h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full paddingysxtn md:paddingy-twentyfour bg-white">
        <div className="max-w-[100rem] mxauto paddingx-four md:paddingxeight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--primarysec)] to-[var(--primarysec)]/80 rounded-3xl p-twelve md:p-sxtn text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-four">
              Start Your Child's Coding Journey Today
            </h2>
            <p className="mxauto font-paragraph text-lg md:text-xl text-white/90 mb-eight max-w-2xl mx-auto leading-relaxed">
              Give your child the opportunity to explore their creativity, build real projects, and gain skills that will shape their future. Book a free trial class and experience the Coding Scholar difference.
            </p>
            <Button
              size="lg"
              className="!bg-[var(--accentsec)] hover:!bg-[var(--accentsec)]/90 text-white font-semibold text-lg paddingx-eight paddingy-six rounded-lg transition-all hover:shadow-lg"
              onClick={()=>{navigate('/register')}}
            >
              Book Free Trial Class
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
