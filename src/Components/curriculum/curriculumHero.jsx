import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function CurriculumHero() {
  return (
    <section className="w-full bg-gradient-to-br from-[rgb(0,151,178)] to-[rgb(0,120,140)] text-white !py-20 !px-4 sm:!px-6 lg:!px-8">
      <div className="max-w-[100rem] !mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="!space-y-6"
          >
            <div>
              <h1 className="font-heading text-5xl sm:text-6xl font-bold !mb-4 leading-tight">
                Learning Pathways
              </h1>
              <p className="font-paragraph text-xl text-blue-50 !mb-4">
                Our structured, step-by-step methodology guides each child from foundational concepts to advanced mastery.
              </p>
              <p className="font-paragraph !text-lg !text-blue-100">
                Each pathway builds on the last to ensure deep understanding and real progress.
              </p>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://static.wixstatic.com/media/fc528a_f928adef03644115a8af58ce8412e563~mv2.png?originWidth=448&originHeight=384"
              alt="Kids learning coding on laptops"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0,151,178)]/20 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
