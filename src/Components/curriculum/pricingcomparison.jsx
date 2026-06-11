import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Plans = [
  {
    id: 'Prime',
    title: 'Prime',
    subtitle: 'Private 1-on-1 tutoring ',
    price: 7.74,
    originalprice:11.90,
    period: '/session',
    description: 'Personalized 1-on-1 lessons with a dedicated tutor',
    features: [
      // { label: 'Classes', value: '48' },
      { label: 'Unlimited Projects', value: '✔' },
      // { label: 'Quizzes', value: '100+' },
      { label: 'Certificates', value: '✔' },
      { label: 'Community Access', value: '✔' },
      { label: 'Live Support', value: '✔' },
      { label: '1-on-1 Mentorship', value: '✔' },
      { label: 'Unlimited class rescheduling', value: '✔' },
    ],
    cta: 'Book Free Trial',
    highlighted: true,
    highlight:'35% off',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'Premier',
    title: 'Premier',
    subtitle: 'Micro group (2–3 students)',
    price: 6.19,
    originalprice:8.83,
    period: '/session',
    description: 'Personalized live group classes ',
    features: [
      // { label: 'Classes', value: '96' },
      { label: 'Unlimited Projects', value: '✔' },
      // { label: 'Quizzes', value: '100+' },
      { label: 'Certificates', value: '✔' },
      { label: 'Community Access', value: '✔' },
      { label: 'Priority Support', value: '✔' },
      { label: 'Coordinate class reschedule', value: '✔' },
    ],
    cta: 'Book Free Trial',
    highlighted: true,
    highlight:'30% off',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 'Plus',
    title: 'Plus ',
    subtitle: 'Small group (4–5 students)',
    price: 4.64,
    originalprice:6.18,
    period: '/session',
    description: 'Interactive live group learning with other students',
    features: [
      // { label: 'Classes', value: '144' },
      { label: 'Unlimited Projects', value: '✔' },
      // { label: 'Quizzes', value: '100+' },
      { label: 'Certificates', value: '✔' },
      { label: 'Community Access', value: '✔' },
      { label: 'Group support', value: '✔' },
      { label: 'class rescheduling', value: '❌' },
    ],
    cta: 'book Free Trial',
    highlighted: true,
    highlight:'25% off',
    colorFrom: 'from-orange-400',
    colorTo: 'to-orange-600'
    // color: 'from-orange-400 to-orange-600',
  },
];

export default function PricingComparison() {

  const [localpricing,setPricing]=useState(null)

   const apiurl = process.env.NEXT_PUBLIC_API_URL || " https://untawed-overheady-tony.ngrok-free.dev";
    console.log('api url',apiurl)
     const pricing=async()=>{
    try{
      const res=await axios.get(`${apiurl}/get_pricing/`,
        {
          headers:{
            "ngrok-skip-browser-warning": "true"
          }
        }
      )
      const response=res.data.country_iso
      console.log('response...',response)
      setPricing(response)
      
    }catch(e){
      console.error('error in getting the pricing...',e)
    }
  }


  useEffect(() => {
    pricing();
  }, []);
  
   
   const normalize = (str) => str.toLowerCase().trim();


const pricingMap = Object.fromEntries(
  (localpricing??[]).map(p => [normalize(p.name), p])
);

const pricingPlans = Plans.map(plan => {
  const match = pricingMap[normalize(plan.id)];

  return {
    ...plan,
    currency:match?.currency??'$',
    price: match?.now ?? plan.price,                 // fallback to original $
    originalprice: match?.before ?? plan.originalprice // fallback to original $
  };
});





  return (
    <section className="w-full !py-20 !px-4 sm:!px-6 lg:!px-8 bg-gray-50">
      <div className="max-w-[100rem] !mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center !mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 !mb-4">
            Pricing & Comparison
          </h2>
          <p className="font-paragraph text-lg text-gray-600 max-w-2xl !mx-auto">
            Choose the perfect plan for your child's learning journey. All plans include access to our full curriculum and community.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  flex justify-center items-center mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300  ${
                plan.highlighted ? 'ring-2 ring-[rgb(210,65,19)] md:scale-105' : ''
              }`}
            >
              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="absolute top-4 right-4 bg-[rgb(210,65,19)] text-white !px-4 !py-1 rounded-full text-sm font-semibold z-10">
                  {plan.highlight}
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.colorFrom} ${plan.colorTo} opacity-100`}></div>

              {/* Card Content */}
              <div className="relative !p-8 bg-white h-full flex flex-col">
                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-gray-900 !mb-1">
                  {plan.title}
                </h3>
                <p className="font-paragraph text-sm text-[rgb(0,151,178)] font-semibold !mb-4">
                  {plan.subtitle}
                </p>
                <p className="font-paragraph text-gray-600 text-sm !mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="!mb-8 !pb-8 !border-b border-gray-200">
                    {/* Current price row */}
               <div className="flex items-baseline gap-1.5">
                 <span className="text-md font-medium text-gray-500 tracking-wide">
                   {plan.currency??'$'}
                 </span>
                 <span className="text-5xl font-bold text-gray-900 tracking-tight leading-none">
                   {plan.price}
                 </span>
                 <span className="text-sm text-gray-500 ml-0.5">
                   {plan.period}
                 </span>
               </div>

               {/* Original price row — sits below, left-aligned */}
               <div className="flex items-center gap-2 !mt-3.5 !ml-5">
                 <span className="text-sm text-gray-400 line-through">
                   {plan.currency ?? '$'} {plan.originalprice}{plan.period}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  Save {plan.currency ?? '$'} {(plan.originalprice - plan.price).toFixed(2)}
                </span>
                </div>
             </div>

                {/* Features */}
                <div className="!space-y-4 !mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between"
                    >
                      <span className="font-paragraph text-gray-700">
                        {feature.label}
                      </span>
                      <span className="font-heading font-bold text-[rgb(0,151,178)]">
                        {feature.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full !py-3 !px-4 rounded-lg font-heading font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? '!bg-[rgb(210,65,19)] text-white hover:bg-[rgb(180,55,15)] shadow-md'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="!mt-16 bg-white rounded-2xl !p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[rgb(0,151,178)] text-white flex items-center justify-center !mx-auto !mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-gray-900 !mb-2">
                Free Trial Class
              </h4>
              <p className="font-paragraph text-gray-600">
                Try any pathway with a free trial class before committing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[rgb(0,151,178)] text-white flex items-center justify-center !mx-auto !mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-gray-900 !mb-2">
                Flexible Cancellation
              </h4>
              <p className="font-paragraph text-gray-600">
                Cancel anytime with no hidden fees or long-term contracts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[rgb(0,151,178)] text-white flex items-center justify-center !mx-auto !mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-gray-900 !mb-2">
                Money-Back Guarantee
              </h4>
              <p className="font-paragraph text-gray-600">
                30-day satisfaction guarantee if you're not happy with your plan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
