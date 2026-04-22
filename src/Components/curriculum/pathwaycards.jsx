// import { E } from 'dist/assets/cert-CuqbVDbT';
import { motion } from 'framer-motion';
import { Zap, Target, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// interface PathwayCardsProps {
//   selectedPathway: string;
//   setSelectedPathway: (pathway: string) => void;
// }

const pathways = [
  {
    id: 'explorer',
    title: 'Coding Explorer',
    subtitle: 'Beginner',
    description: 'Perfect for kids just starting their coding journey. Build foundational skills through fun, interactive projects.',
    stats: [
      { label: 'Classes', value: '48' },
      { label: 'Projects', value: '100+' },
      { label: 'Quizzes', value: '100+' },
    ],
    // price: '$99/month',
    icon: Zap,
    color: 'from-blue-400 to-blue-600',
    // recommended: true,
  },
  {
    id: 'innovator',
    title: 'Coding Innovator',
    subtitle: 'Intermediate',
    description: 'For students ready to advance. Learn real programming languages and build impressive applications.',
    stats: [
      { label: 'Classes', value: '96' },
      { label: 'Projects', value: '200+' },
      { label: 'Quizzes', value: '100+' },
    ],
    // price: '$149/month',
    icon: Target,
    color: 'from-purple-400 to-purple-600',
    recommended: false,
  },
  {
    id: 'specialist',
    title: 'Coding Specialist',
    subtitle: 'Advanced',
    description: 'For aspiring tech experts. Master advanced concepts and build professional-grade projects.',
    stats: [
      { label: 'Classes', value: '144' },
      { label: 'Projects', value: '300+' },
      { label: 'Quizzes', value: '100+' },
    ],
    // price: '$199/month',
    icon: Crown,
    color: 'from-orange-400 to-orange-600',
    recommended: false,
  },
];

export default function PathwayCards({ selectedPathway, setSelectedPathway }) {
  return (
    <section className="w-full !py-20 !px-4 sm:!px-6 lg:!px-8 bg-gray-50">
      <div className="max-w-[100rem] !mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center !mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 1mb-4">
            Choose Your Learning Path
          </h2>
          <p className="font-paragraph text-lg text-gray-600 max-w-2xl !mx-auto">
            Each pathway is carefully designed to build skills progressively, from foundational concepts to advanced expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pathways.map((pathway, index) => {
            const IconComponent = pathway.icon;
            const isSelected = selectedPathway === pathway.id;
            const navigate=useNavigate()

            return (
              <motion.button
                key={pathway.id}
                onClick={() =>{ setSelectedPathway(pathway.id)
                    const el = document.getElementById('curriculum-tab');
                    if (el){
                        el.scrollIntoView({behavior:smooth})
                    }
 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 text-left ${
                  isSelected ? 'ring-2 ring-[rgb(210,65,19)] md:scale-105' : ''
                } ${pathway.recommended && !isSelected ? 'md:scale-105' : ''}`}
              >
                {/* Recommended Badge */}
                {pathway.recommended && (
                  <div className="absolute top-4 right-4 bg-[rgb(210,65,19)] text-white !px-3 !py-1 rounded-full text-sm font-semibold z-10">
                    Recommended
                  </div>
                )}

                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pathway.color} opacity-10`}></div>

                {/* Card Content */}
                <div className="relative !p-8 bg-white h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center !mb-6 shadow-md`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-gray-900 !mb-1">
                    {pathway.title}
                  </h3>
                  <p className="font-paragraph text-sm text-[rgb(0,151,178)] font-semibold !mb-4">
                    {pathway.subtitle}
                  </p>

                  {/* Description */}
                  <p className="font-paragraph text-gray-600 !mb-6 leading-relaxed flex-grow">
                    {pathway.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 !mb-6 !pt-6 border-t border-gray-200">
                    {pathway.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="font-heading text-2xl font-bold text-[rgb(0,151,178)]">
                          {stat.value}
                        </p>
                        <p className="font-paragraph text-xs text-gray-600 !mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="!mb-6 !pb-6 border-b border-gray-200">
                    <p className="font-heading text-3xl font-bold text-gray-900">
                      {pathway.price}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full !py-3 !px-4 rounded-lg font-heading font-semibold transition-all duration-300 ${
                      isSelected
                        ? `!bg-[rgb(210,65,19)] text-white hover:!bg-[rgb(180,55,15)] shadow-md`
                        : `bg-gray-100 text-gray-900 hover:bg-gray-200`
                    }`}

                  >
                    {isSelected ? 'Selected' : 'View Curriculum'}
                  </button>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
