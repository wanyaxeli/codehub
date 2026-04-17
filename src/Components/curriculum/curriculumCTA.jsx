import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function CurriculumCTA() {
  return (
    <section className="w-full !py-20 !px-4 sm:!px-6 lg:!px-8 bg-gradient-to-br from-[rgb(0,151,178)] to-[rgb(0,120,140)]">
      <div className="max-w-[100rem] !mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <Image
              src="https://media.istockphoto.com/id/2174839952/photo/teen-girl-using-laptop-in-school.jpg?s=612x612&w=0&k=20&c=D7SGWHOk2T3PqYEboeP9eJlUZ6p4BVHl8FzHX_Uog1g="
              alt="Child learning coding with enthusiasm"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0,151,178)]/30 to-transparent"></div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white !space-y-8 order-1 lg:order-2"
          >
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold !mb-4 leading-tight">
                Start Your Child's Coding Journey Today
              </h2>
              <p className="font-paragraph text-xl text-blue-50 leading-relaxed">
                Give your child the gift of computational thinking and problem-solving skills. Our expert instructors are ready to guide them through an engaging, personalized learning experience.
              </p>
            </div>

            <div className="!space-y-4">
              <p className="font-paragraph text-lg text-blue-100">
                ✓ Free trial class with no commitment
              </p>
              <p className="font-paragraph text-lg text-blue-100">
                ✓ Personalized learning pathway assessment
              </p>
              <p className="font-paragraph text-lg text-blue-100">
                ✓ Expert guidance from experienced instructors
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[rgb(210,65,19)] hover:bg-[rgb(180,55,15)] text-white font-heading font-bold text-lg !px-8 !py-4 rounded-lg shadow-lg transition-all duration-300"
            >
              Book Free Trial Class
            </motion.button>

            {/* <p className="font-paragraph text-sm text-blue-100">
              Limited spots available. Classes fill up quickly during peak seasons.
            </p> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
