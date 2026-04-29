import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Zap, Brain, Lightbulb, Users, Code, CheckCircle, Rocket, ChevronDown } from 'lucide-react';

export default function AboutPage() {
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle code brackets */}
          <div className="absolute top-20 left-10 text-foreground/5 text-8xl font-bold">&lt;&gt;</div>
          <div className="absolute bottom-32 right-16 text-foreground/5 text-8xl font-bold">{'{ }'}</div>
          
          {/* Subtle flow lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Subtle node connections */}
          <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
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
        <div className="relative z-10 max-w-[100rem] mx-auto px-4 md:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Building Future{' '}
              <span className="text-primary">Coders</span>
              {' '}&{' '}
              <span className="text-accent">Problem Solvers</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
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
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-10 py-7 rounded-xl transition-all hover:shadow-lg hover:scale-105"
              onClick={() => {
                window.location.href = '#trial-form';
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

      {/* ... keep existing code (Intro Section - Who We Are) ... */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-4 leading-relaxed">
                At Coding Scholar, we believe every child has the potential to become a creator. We provide live, one-on-one online coding classes designed specifically for K-12 students, where they learn to build apps, design games, and develop websites—all while having fun.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                Our expert instructors bring real-world computer science knowledge and a passion for teaching. They create a supportive learning environment where questions are encouraged, progress is celebrated, and every student feels confident to explore their creativity.
              </p>
              <div className="flex items-center gap-3 text-primary font-semibold">
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
                  src="https://static.wixstatic.com/media/fc528a_622c40d4217c44cb92b92b7264e52c1d~mv2.png?originWidth=448&originHeight=384"
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
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
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
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-4 flex-shrink-0">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
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
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 rounded-full p-4 flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
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
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://static.wixstatic.com/media/fc528a_befaf48051f84bddab0b8f41824ce8d5~mv2.png?originWidth=448&originHeight=384"
                  alt="Children coding together and learning"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div {...fadeInUp} className="order-1 md:order-2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                Why Learn Coding?
              </h2>

              <div className="space-y-6">
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
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
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
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Approach to Learning
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
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
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary/10 rounded-full p-4 w-fit mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
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
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 md:p-16 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your Child's Coding Journey Today
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Give your child the opportunity to explore their creativity, build real projects, and gain skills that will shape their future. Book a free trial class and experience the Coding Scholar difference.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 py-6 rounded-lg transition-all hover:shadow-lg"
              onClick={() => {
                // This will link to the trial class request form
                window.location.href = '#trial-form';
              }}
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
