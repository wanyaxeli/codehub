import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, Gamepad2, Zap, Lightbulb, Layers, Download } from 'lucide-react';
import { Image } from '@/components/ui/image';

// interface CurriculumTabsProps {
//   selectedPathway: string;
//   setSelectedPathway: (pathway: string) => void;
// }

const pathwayDetails = {
  explorer: {
    title: 'Coding Explorer',
    subtitle: 'Beginner Level',
    color: 'from-blue-400 to-blue-600',
    keyLearnings: [
      { icon: Brain, label: 'Critical Thinking' },
      { icon: Code, label: 'Structured Coding' },
      { icon: Gamepad2, label: 'Game Development' },
      { icon: Zap, label: 'App Development' },
      { icon: Lightbulb, label: 'Problem Solving' },
      { icon: Layers, label: 'Visual Programming' },
    ],
    achievements: [
      'Build 100+ interactive projects',
      'Master block-based programming',
      'Create games and animations',
      'Develop problem-solving skills',
      'Complete 48 guided classes',
      'Earn achievement badges',
    ],
    // price: '$99/month',
    modules: [
      {
        number: 1,
        title: 'Storytelling Through Animation',
        description: 'Explore foundational programming through animated storytelling.',
        platform: 'Code.org (Sprite Lab)',
        type: 'Block-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
      {
        number: 2,
        title: 'Interactive App',
        description: 'Turn ideas into reality — design your first interactive application.',
        platform: 'Code.org (App Lab)',
        type: 'Block-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
      {
        number: 3,
        title: 'Visual Interface App',
        description: 'Design ideas into functional, beautiful interfaces.',
        platform: 'Code.org (App Lab)',
        type: 'Block-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
      {
        number: 4,
        title: 'Game Development',
        description: 'Build exciting games using Game Lab with sprites and animations.',
        platform: 'Code.org (Game Lab)',
        type: 'Block-Based',
        lessons: '6 Lessons & + Projects',
      },
       {
        number: 5,
        title: 'Advanced Game Development',
        description: 'Master complex Game Lab concepts and advanced mechanics.',
        platform: 'Code.org (Game Lab)',
        type: 'Block-Based',
        lessons: '6Lessons & 20+ Projects',
      },
       {
        number: 6,
        title: 'Intro to Animation Design',
        description: 'Explore loops to enhance logical reasoning and problem-solving.',
        platform: 'Scratch',
        type: 'Block-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
       {
        number: 7,
        title: 'Game Design',
        description: 'Design rich, interactive games inside the Scratch environment.',
        platform: 'Scratch',
        type: 'Scratch',
        lessons: '6 Lessons & 20+ Projects',
      },
       {
        number: 8,
        title: 'Advanced Game Development',
        description: 'Create advanced, polished games entirely in Scratch.',
        platform: 'Scratch',
        type: 'Block-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
    ],
  },
  innovator: {
    title: 'Coding Innovator',
    subtitle: 'Intermediate Level',
    color: 'from-purple-400 to-purple-600',
    keyLearnings: [
      { icon: Brain, label: 'Analytical Skills' },
      { icon: Code, label: 'HTML & CSS' },
      { icon: Zap, label: 'AI Concepts' },
      { icon: Gamepad2, label: 'Game Development' },
      { icon: Lightbulb, label: 'Machine Learning' },
      { icon: Layers, label: 'Capstone Project' },
    ],
    achievements: [
      'Build 200+ advanced projects',
      'Learn HTML, CSS, and JavaScript',
      'Explore AI and ML concepts',
      'Create web applications',
      'Complete 96 guided classes',
      'Develop analytical thinking',
    ],
    // price: '$149/month',
    modules: [
      {
        number: 1,
        title: 'Machine Learning Basics',
        description: 'Introduction to AI concepts and machine learning fundamentals.',
        platform: 'TensorFlow & Python',
        type: 'Hybrid',
        lessons: '6 Lessons & 20+ Projects',
      },
      {
        number: 2,
        title: 'Advanced Machine Learning',
        description: 'Real-world applications and advanced machine learning techniques.',
        platform: 'Python & Scikit-learn',
        type: 'Hybrid',
        lessons: '8 Lessons & 25+ Projects',
      },
      {
        number: 3,
        title: 'Introduction to HTML',
        description: 'Learn the building blocks of the web — HTML basics.',
        platform: 'VS Code',
        type: 'Text-Based',
        lessons: '10 Lessons & 30+ Projects',
      },
      {
        number: 4,
        title: 'Advanced HTML',
        description: 'Work with forms, tables, images, and semantic HTML tags.',
        platform: 'vs-code',
        type: 'Text-Based',
        lessons: '12 Lessons & 40+ Projects',
      },
      {
        number: 5,
        title: 'Introduction to CSS',
        description: 'Learn the fundamentals of web styling and layout.',
        platform: 'Vs-Code',
        type: 'Hybrid',
        lessons: '8 Lessons & 20+ Projects',
      },
      {
        number: 6,
        title: 'Advanced CSS',
        description: 'Master advanced styling techniques, animations, and effects.',
        platform: 'Vs-Code',
        type: 'Hybrid',
        lessons: '8 Lessons & 20+ Projects',
      },
      {
        number: 7,
        title: 'Bootstrap',
        description: 'Use the Bootstrap CSS framework to build responsive sites.',
        platform: 'Vs-Code',
        type: 'Hybrid',
        lessons: '8 Lessons & 20+ Projects',
      },
      {
        number: 8,
        title: 'Custom Project',
        description: 'Use the Bootstrap CSS framework to build responsive sites.',
        platform: 'Vs-Code',
        type: 'Hybrid',
        lessons: '8 Lessons & 20+ Projects',
      },
    ],
  },
  specialist: {
    title: 'Coding Specialist',
    subtitle: 'Advanced Level',
    color: 'from-orange-400 to-orange-600',
    keyLearnings: [
      { icon: Code, label: 'JavaScript' },
      { icon: Layers, label: 'Python Programming' },
      { icon: Brain, label: 'Advanced Web Dev' },
      { icon: Zap, label: 'Analytical Skills' },
      { icon: Lightbulb, label: 'Confidence Building' },
      { icon: Gamepad2, label: 'Capstone Project' },
    ],
    achievements: [
      'Build 300+ professional projects',
      'Master full-stack development',
      'Create mobile applications',
      'Develop portfolio-ready projects',
      'Complete 144 guided classes',
      'Become a coding specialist',
    ],
    // price: '$199/month',
    modules: [
      {
        number: 1,
        title: 'Front-End Development',
        description: 'HTML, CSS, JavaScript and modern frameworks like React.',
        platform: 'VS Code & React',
        type: 'Text-Based',
        lessons: '6 Lessons & 20+ Projects',
      },
      {
        number: 2,
        title: 'Advanced Front-End',
        description: 'Deeper JavaScript understanding — DOM, events, and AJAX.',
        platform: 'vs-Code',
        type: 'Text-Based',
        lessons: '8 Lessons & 25+ Projects',
      },
      {
        number: 3,
        title: 'Web Hosting ',
        description: 'Host and publish your websites live using Netlify.',
        platform: 'Netlify & Github',
        type: 'Hybrid',
        lessons: '10 Lessons & 35+ Projects',
      },
      {
        number: 4,
        title: 'Introduction to Python',
        description: 'Python fundamentals — variables, loops, functions and data types.',
        platform: 'Python & Colab',
        type: 'Hybrid',
        lessons: '8 Lessons & 30+ Projects',
      },
      {
        number: 5,
        title: 'Object-Oriented Programming',
        description: 'Understand classes, objects, and OOP principles in Python.',
        platform: 'python & Vs-Code',
        type: 'Hybrid',
        lessons: '10 Lessons & 40+ Projects',
      },
      {
        number: 6,
        title: 'Advanced Object-Oriented',
        description: 'Abstraction, polymorphism, and inheritance in Python.',
        platform: 'python & Vs-Code',
        type: 'Project-Based',
        lessons: '12 Weeks & Mentorship',
      },
      {
        number: 7,
        title: 'Game Development in Python',
        description: 'Create fully featured Python-based games using Pygame.',
        platform: 'python & Vs-Code',
        type: 'Project-Based',
        lessons: '12 Weeks & Mentorship',
      },
      {
        number: 8,
        title: 'App Development in JavaScript',
        description: 'Create real-world applications using vanilla JavaScript.',
        platform: 'Javascript& Vs-Code',
        type: 'Project-Based',
        lessons: '12 Weeks & Mentorship',
      },
    ],
  },
};

export default function CurriculumTabs({ selectedPathway, setSelectedPathway }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const curriculum_url='https://3pum5qwjd8qrcfrj.public.blob.vercel-storage.com/CodingScholar_Curriculum%20%282%29.pdf'

  const downloadCurriculum=async(url,filename='curriculum.pdf')=>{
    try{
      const response=await fetch(url,{method:'GET'})

      if(!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)

      const blob=await response.blob()
      const objecturl=URL.createObjectURL(blob)
      
      const a=document.createElement('a')
      a.href=objecturl
      a.download=filename
      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(objecturl)


    }catch(e){
      console.error("error in downloading the curriculum...",e)
    }
  }

  const pathway = pathwayDetails[selectedPathway ];

  useEffect(() => {
    setScrollPosition(0);
  }, [selectedPathway]);

  return (
    <section className="w-full !py-20 !px-4 sm:!px-6 lg:!px-8 bg-white">
      <div className="max-w-[100rem] !mx-auto">
        {/* Tabs Navigation */}
        <div className="mb-12">
          <div className="flex gap-4 !mb-8 overflow-x-auto !pb-4">
            {Object.entries(pathwayDetails).map(([key, details]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPathway(key)}
                className={`!px-6 !py-3 rounded-lg font-heading font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedPathway === key
                    ? 'bg-[rgb(0,151,178)] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {details.title.split(' ')[1]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sticky Panel */}
          <motion.div
            key={`panel-${selectedPathway}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className={`rounded-2xl bg-gradient-to-br ${pathway.color} text-white !p-8 shadow-lg`}>
              {/* Title */}
              <h3 className="font-heading text-3xl font-bold !mb-2">
                {pathway.title}
              </h3>
              <p className="font-paragraph text-white/90 !mb-8">
                {pathway.subtitle}
              </p>

              {/* Key Learnings */}
              <div className="!mb-8 !pb-8 border-b border-white/20">
                <h4 className="font-heading text-lg font-bold !mb-4">Key Learnings</h4>
                <div className="!space-y-3">
                  {pathway.keyLearnings.map((learning, idx) => {
                    const IconComponent = learning.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="font-paragraph text-sm">{learning.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="!mb-8 !pb-8 border-b border-white/20">
                <h4 className="font-heading text-lg font-bold !mb-4">Key Achievements</h4>
                <div className="!space-y-2">
                  {pathway.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-lg !mt-1">✓</span>
                      <span className="font-paragraph text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              {/* <div className="!mb-8 !pb-8 border-b border-white/20">
                <p className="font-paragraph text-sm text-white/80 !mb-2">Monthly Price</p>
                <p className="font-heading text-4xl font-bold">{pathway.price}</p>
              </div> */}

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-[rgb(0,151,178)] font-heading font-bold !py-3 !px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={async()=>{
                  await downloadCurriculum(curriculum_url)
                }}
              >
                <Download className="w-5 h-5" 
                />
                Download Curriculum
              </motion.button>
            </div>
          </motion.div>

          {/* Right Scrollable Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={`modules-${selectedPathway}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-heading text-3xl font-bold text-gray-900 !mb-8">
                  Course Modules
                </h4>
              </div>

              <div className="!space-y-6">
                {pathway.modules.map((module, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`!p-6 rounded-xl border-2 border-gray-200 hover:border-[rgb(0,151,178)] hover:shadow-lg transition-all duration-300 bg-white`}
                  >
                    <div className="flex items-start gap-4 !mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pathway.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="font-heading font-bold text-white text-lg">
                          {module.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-heading text-xl font-bold text-gray-900 !mb-2">
                          {module.title}
                        </h5>
                        <p className="font-paragraph text-gray-600">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 !pt-4 border-t border-gray-200">
                      <div>
                        <p className="font-paragraph text-xs text-gray-600 !mb-1">Platform</p>
                        <p className="font-paragraph text-sm font-semibold text-gray-900">
                          {module.platform}
                        </p>
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-gray-600 !mb-1">Type</p>
                        <span
                          className={`inline-block !px-2 !py-1 rounded-full text-xs font-semibold ${
                            module.type === 'Block-Based'
                              ? 'bg-blue-100 text-blue-700'
                              : module.type === 'Text-Based'
                              ? 'bg-purple-100 text-purple-700'
                              : module.type === 'Hybrid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {module.type}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="font-paragraph text-xs text-gray-600 !mb-1">Content</p>
                        <p className="font-paragraph text-sm font-semibold text-gray-900">
                          {module.lessons}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
