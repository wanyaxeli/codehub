import { AnimatePresence, motion } from 'framer-motion';
// import { Header } from '@/components/Header';
import Footer from '@/Components/global-layoutss/newFooter';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useNavigate, useParams } from 'react-router-dom';
import pic from '@/assets/codingscholarlogo00v2.png'
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect, useState } from 'react';
import Select from "react-select";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import * as Flags from "country-flag-icons/react/3x2";
import axios from 'axios';



interface RegistrationModal{
    isOpen:boolean;
    onClose:()=>void;
    referrerName:string;
    referralCode?:string;
    defaultCourse:string;
    onSubmit:()=>void
}

interface ReferralHeaderProps{
    referrerName:string;
    isOpenModal:()=>void;
}

function getFlagEmoji(countryCode:any) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char:any) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const countryOptions = getCountries().map((country) => ({
  value: country,
  // label: `${getFlagEmoji(country)} ${en[country]}`,
  label: en[country],
  code: getCountryCallingCode(country),
}));

const defaultCountryOption = countryOptions.find((c) => c.value === "KE");


{/* Testimonials Section */}
function TestimonialsSection({ referrerName = "Billy" }) {
  const referrerTestimonial = {
    name: referrerName,
    role: "Parent",
    quote:
      "My daughter looks forward to her coding class every week now. The tutors actually know her by name and she's built projects I never expected her to be capable of at this age.",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_AzO01EmgUjdVXV1msMtF5dA-UI_7O73sdXcuXZrvsA&s=10",
  };

  const otherTestimonials = [
    {
      name: "Grace M.",
      role: "Parent",
      quote: "The small class sizes made all the difference. My son actually gets one-on-one attention.",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDpu2v_xRhVIW5Fl8qsNuOnBnwaEoWbtiBK1axBVpvdBBMOHXW9QPOT4&s=10",
    },
    {
      name: "David K.",
      role: "Parent",
      quote: "Finally a live tutor, not a pre-recorded video. My kid asks questions and gets real answers.",
      // avatar: "https://static.wixstatic.com/media/fc528a_75991b2bb4524ffca9994132cf505d70~mv2.png?originWidth=200&originHeight=200",
    },
    {
      name: "Amina R.",
      role: "Parent",
      quote: "I love that I can actually see her progress. No more guessing what she's learning.",
      // avatar: "https://static.wixstatic.com/media/fc528a_75991b2bb4524ffca9994132cf505d70~mv2.png?originWidth=200&originHeight=200",
    },
    {
      name: "James O.",
      role: "Parent",
      quote: "The math classes made problem-solving click for my son in a way school never did.",
      // avatar: "https://static.wixstatic.com/media/fc528a_75991b2bb4524ffca9994132cf505d70~mv2.png?originWidth=200&originHeight=200",
    },
  ];

  const VISIBLE_COUNT = 2;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + VISIBLE_COUNT) % otherTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [otherTestimonials.length]);

  const visibleTestimonials = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
    otherTestimonials[(startIndex + i) % otherTestimonials.length]
  );

  return (
    <section className="relative w-full max-w-[100rem] !mx-auto !px-6 !py-20 md:!py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center !mb-14 md:!mb-20 max-w-2xl !mx-auto"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground !mb-4">
          Families Who Believe In This
        </h2>
        <p className="font-paragraph text-lg text-foreground/70">
          Starting with the person who sent you here.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Referrer testimonial - fixed, featured */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl !p-8 md:!p-10 shadow-lg border-2 border-[var(--accentsec)]/30"
        >
          <div className="absolute -top-4 left-8 bg-[var(--accentsec)] text-[var(--accentsec)]-foreground text-xs font-semibold !px-4 !py-1.5 rounded-full shadow-md">
            {referrerName}
          </div>

          <p className="font-paragraph text-xl md:text-2xl text-foreground leading-relaxed !mb-8 !mt-4">
            "{referrerTestimonial.quote}"
          </p>

          <div className="flex items-center gap-4">
            <img
              src={referrerTestimonial.avatar}
              alt={referrerTestimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--accentsec)]/40"
            />
            <div>
              <p className="font-heading font-bold text-foreground">
                {referrerTestimonial.name}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">
                {referrerTestimonial.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rotating testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start items-center md:!mt-10">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl !p-6 shadow-sm border border-foreground/10"
              >
                <p className="font-paragraph text-sm text-foreground/70 leading-relaxed !mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                 {t.avatar ? (
  <img
    src={t.avatar}
    alt={t.name}
    className="w-10 h-10 rounded-full object-cover"
    onError={(e) => {
      e.currentTarget.style.display = "none";
      // e?.currentTarget?.nextElementSibling.style.display = "flex";
    }}
  />
) : null}
<div
  className="w-10 h-10 rounded-full bg-[var(--accentsec)]/15 items-center justify-center text-[var(--accentsec)] font-semibold text-sm"
  style={{ display: t.avatar ? "none" : "flex" }}
>
  {t.name?.charAt(0).toUpperCase()}
</div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="font-paragraph text-xs text-foreground/50">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
 {/*Sticky Header */}
function StickyHeader({ referrerName,isOpenModal }:ReferralHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 !px-6 md:!px-10 !pt-6"
    >
      <div
        className={`max-w-6xl !mx-auto flex items-center !mt-3 justify-between rounded-full !pl-4 !pr-2 !py-2 shadow-lg backdrop-blur-md border transition-colors duration-300 ${
          scrolled
            ? "bg-white/90 border-foreground/10"
            : "bg-white/15 border-white/25"
        }`}
      >
        {/* Logo + brand */}
        <div className="flex items-center">
          <div className="!w-14 !h-14 flex items-center !justify-center">
            <img
              src={pic}
              alt="CodingScholar logo"
              className="object-contain !h-14 !w-14 scale-110"
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`font-bold text-lg tracking-wide leading-tight transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Coding<span className="text-[var(--primarysec)]">Scholar</span>
            </span>
            <div className="flex items-center gap-1 !mt-0.5">
              <div className="!h-[2px] !w-15 bg-[var(--accentsec)]" />
              <div className="!w-1.5 !h-1.5 rounded-full bg-[var(--accentsec)]" />
              <div className="!h-[2px] !w-15 bg-[var(--accentsec)]" />
            </div>
          </div>
        </div>

        {/* Referral message pill */}
        <div
          className={`hidden sm:!flex items-center gap-2 border rounded-full !px-4 !py-2 transition-colors duration-300 ${
            scrolled
              ? "bg-foreground/5 border-foreground/10"
              : "bg-white/10 border-white/20"
          }`}
        >
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            ✦ <span className="font-semibold">{referrerName}</span> referred you and thought you'd love this
          </span>
        </div>

        {/* Compact CTA */}
        <Button
          size="sm"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full !px-5"
           onClick={()=>isOpenModal(true)}
        >
          Join Now
        </Button>
      </div>

      {/* Mobile-only referral line */}
      <div className="sm:hidden text-center !mt-3">
        <span
          className={`text-sm font-medium backdrop-blur-md border rounded-full !px-4 !py-1.5 inline-block transition-colors duration-300 ${
            scrolled
              ? "bg-white/90 border-foreground/10 text-foreground"
              : "bg-white/15 border-white/20 text-white"
          }`}
        >
          ✦ <span className="font-semibold">{referrerName}</span> thought you'd love this
        </span>
      </div>
    </motion.div>
  );
}

{/* Registration modal */}
function RegisterModal({ isOpen, onClose, referrerName, referralCode, defaultCourse, onSubmit }: RegistrationModal) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    grade: "",
    course: defaultCourse || "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(defaultCountryOption);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, course: defaultCourse || prev.course }));
  }, [defaultCourse]);

  console.log('selectedcountry...',selectedCountry)

  const handleChange = (field: any) => (e: any) => {
    const value = field === "consent" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate=useNavigate()

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if (!formData.consent) return;
    setIsSubmitting(true);

    const fullWhatsapp = `+${selectedCountry.code}${formData.whatsapp.replace(/^0+/, "")}`;
    console.log('fullwhatsapp...',fullWhatsapp)
       const leadData = {
          name:formData.name,
          email:formData.email,
          phone_number: fullWhatsapp,
          grade:formData.grade,
          course:formData.course,
          referral_code: referralCode,
          country: selectedCountry.label
        };

    console.log('leaddata...',leadData)

    const url = 'https://api.codingscholar.com/leads/';
        
    try {
    const res = await axios.post(url, leadData);

    if (res.data.message === "Lead created successfully") {
      setIsSuccess(true);
      // onSubmit?.(leadData);
    } else {
      setErrors("We experienced an error. Please try again.");
    }
  } catch (err) {
    setErrors("We experienced an error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
    // onSubmit?.({ ...formData, whatsapp: fullWhatsapp, referralCode });
  };

  if (!isOpen) return null;


  return (
    
    <AnimatePresence>
  
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center !p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl !p-6 md:!p-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 text-foreground/50 text-lg"
            aria-label="Close"
          >
            ✕
          </button>
          {
            isSuccess?(
              <>
                      <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="text-center !py-6"
  >
    <div className="w-16 h-16 rounded-full bg-[var(--accentsec)]/10 flex items-center justify-center !mx-auto !mb-6 text-3xl">
      ✓
    </div>

    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground !mb-3">
      You're All Set, {formData.name.split(" ")[0]}!
    </h2>

    <p className="font-paragraph text-base text-foreground/70 !mb-8 leading-relaxed max-w-sm !mx-auto">
      We'll reach out within <span className="font-semibold text-foreground">24 hours</span> to
      understand your schedule and book your free class at a time that works for you.
    </p>

    <div className="bg-[var(--accentsec)]/10 border border-[var(--accentsec)]/20 rounded-2xl !px-4 !py-3 !mb-6">
      <p className="font-paragraph text-sm text-foreground">
        ✦ Thanks to you, <span className="font-semibold">{referrerName}</span> will earn{" "}
        <span className="font-semibold">5 free classes</span>!
      </p>
    </div>

    <Button
      size="lg"
      onClick={()=>navigate('/')}
      className="w-full bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-accent-foreground font-semibold !py-6 text-lg rounded-full"
    >
      Explore Codingscholar
    </Button>
  </motion.div>
              </>
            ):
            (
              <>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground !mb-2">
            Reserve Your Free Class
          </h2>

          <div className="bg-[var(--accentsec)]/10 border border-[var(--accentsec)]/20 rounded-2xl !px-4 !py-3 !mb-6">
            <p className="font-paragraph text-sm text-foreground">
              ✦ By registering, <span className="font-semibold">{referrerName}</span> earns{" "}
              <span className="font-semibold">5 free classes</span> — thank them by joining!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="!space-y-4">
            {/* Name */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                Child's / Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Full name"
                className="w-full !px-4 !py-2.5 rounded-xl border border-foreground/15 focus:border-[var(--accentsec)] focus:outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                className="w-full !px-4 !py-2.5 rounded-xl border border-foreground/15 focus:border-[var(--accentsec)] focus:outline-none text-sm"
              />
            </div>

            {/* Country + WhatsApp - connected */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                WhatsApp Number
              </label>
              <div className="flex gap-2">
                <div className="w-48 shrink-0">
                  <Select
  options={countryOptions}
  value={selectedCountry}
  onChange={(selected) => setSelectedCountry(selected)}
  menuPortalTarget={document.body}
  isSearchable
  formatOptionLabel={(option:any) => {
    const FlagIcon = Flags[option.value];
    return (
      <div className="flex items-center gap-2 text-black">
        {FlagIcon && <FlagIcon style={{ width: "1.2em", height: "0.9em" }} />}
        <span className="truncate">{option.label}</span>
      </div>
    );
  }}
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, width: "260px" }),
    control: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      borderColor: "rgba(0,0,0,0.15)",
      minHeight: "42px",
      boxShadow: "none",
    }),
  }}
/>
                </div>

                <div className="flex-1 flex items-center rounded-xl border border-foreground/15 focus-within:border-[var(--accentsec)] overflow-hidden">
                  <span className="!pl-3 !pr-1 text-sm text-foreground/60 select-none whitespace-nowrap">
                    +{selectedCountry.code}
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/[^\d]/g, "");
                      setFormData((prev) => ({ ...prev, whatsapp: digitsOnly }));
                    }}
                    placeholder="7XX XXX XXX"
                    className="flex-1 !py-2.5 !pr-3 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Grade */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                Grade
              </label>
              <select
                required
                value={formData.grade}
                onChange={handleChange("grade")}
                className="w-full !px-4 !py-2.5 text-black rounded-xl border border-foreground/15 focus:border-[var(--accentsec)] focus:outline-none text-sm bg-white"
              >
                <option value="" disabled>Select grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                Course
              </label>
              <select
                required
                value={formData.course}
                onChange={handleChange("course")}
                className="w-full !px-4 !py-2.5 text-black rounded-xl border border-foreground/15 focus:border-[var(--accentsec)] focus:outline-none text-sm bg-white"
              >
                <option value="" disabled>Select course</option>
                <option value="coding">Coding</option>
                <option value="math">Mathematics</option>
              </select>
            </div>

            {/* Referral code - locked */}
            <div>
              <label className="block font-paragraph text-sm font-medium text-foreground !mb-1.5">
                Referral Code
              </label>
              <input
                type="text"
                value={referralCode}
                disabled
                readOnly
                className="w-full !px-4 !py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground/60 text-sm cursor-not-allowed"
              />
            </div>

            {/* Consent checkbox */}
            <label className="flex items-start gap-3 !pt-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={handleChange("consent")}
                className="mt-1 w-4 h-4 rounded border-foreground/30 accent-[var(--accentsec)]"
              />
              <span className="font-paragraph text-xs text-foreground/60 leading-relaxed">
                I agree to be contacted about my child's enrollment and class scheduling.
              </span>
            </label>

            <Button
  type="submit"
  size="lg"
  disabled={isSubmitting}
  className="w-full bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-accent-foreground font-semibold !py-6 text-lg rounded-full !mt-2 disabled:opacity-60"
>
  {isSubmitting ? "Submitting..." : "Reserve My Free Class →"}
</Button>

{errors && (
  <p className="font-paragraph text-sm text-red-500 text-center !mt-2">{errors}</p>
)}
          </form>
              </>
            )
          }

        </motion.div>
      </motion.div>

    </AnimatePresence>
  );
}

{/* referral page fallback */}
function ReferralNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white !px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        {/* Logo */}
        <div className="flex items-center justify-center !mb-8">
          <img
            src={pic}
            alt="CodingScholar logo"
            className="object-contain !h-16 !w-16"
          />
          <div className="flex flex-col items-start !ml-2">
            <span className="text-foreground font-bold text-xl tracking-wide leading-tight">
              Coding<span className="text-[var(--primarysec)]">Scholar</span>
            </span>
          </div>
        </div>

        <div className="w-16 h-16 rounded-full bg-[var(--accentsec)]/10 flex items-center justify-center !mx-auto !mb-6 text-3xl">
          ✦
        </div>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground !mb-4">
          This Invite Link Isn't Active
        </h1>

        <p className="font-paragraph text-base text-foreground/70 !mb-8 leading-relaxed">
          This referral page couldn't be found — it may have expired or the link
          might be incomplete. But you're welcome here regardless. Head to our
          homepage to learn more about CodingScholar and see what live coding
          and math classes for kids are all about.
        </p>

        <a href="https://www.codingscholar.com/">
          <Button
            size="lg"
            className="bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-accent-foreground font-semibold !px-8 !py-6 text-lg rounded-full"
          >
            Explore CodingScholar →
          </Button>
        </a>

        <p className="font-paragraph text-sm text-foreground/50 !mt-6">
          Know someone at CodingScholar? Ask them for their referral link.
        </p>
      </motion.div>
    </div>
  );
}

// Add once, near the top of your file — reusable across all sections
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function ReferralPage() {
    const {id}=useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourse,setIsSelectedCourse]=useState("")
     const[referrerName,setReferrerName]=useState("")
    
    const [referralCode,setReferralCode]=useState<string|undefined>()
    const API_URL='https://api.codingscholar.com'
    // const API_URL = import.meta.env.VITE_API_URL;
    const [isValid, setIsValid] = useState(false);
const [isChecking, setIsChecking] = useState(true);

useEffect(() => {
  fetch(`${API_URL}/validate_referrals/?code=${id}`)
    .then((res) => res.json())
    .then(({ valid ,referrer}) => {
      if (valid) {
        console.log('valid....',referrer)
        setReferralCode(id);
        const capitalize = (str:any) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

setReferrerName(capitalize(referrer?.user?.first_name));
        setIsValid(true);
      }
    })
    .catch(() => {
      // treat network/API errors the same as invalid — fail safe, don't leave visitor stuck
    })
    .finally(() => setIsChecking(false));
}, [id]);

if (isChecking) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-3 border-[var(--accentsec)]/20 border-t-[var(--accentsec)] rounded-full animate-spin" />
    </div>
  );
}

if (!isValid) {
  return <ReferralNotFound />;
}
    
   

  return (
    <div className="min-h-screen bg-white">
         <StickyHeader referrerName={referrerName} isOpenModal={()=>setIsModalOpen(true)}/>
      
      {/* Hero Section */}
<section className="relative w-full h-screen max-w-[120rem] !mx-auto overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="https://static.wixstatic.com/media/fc528a_01de5ae7b3b342f78902bd41201e856d~mv2.png?originWidth=1920&originHeight=1024"
      alt="Children learning and coding"
      className="w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
  </div>

 

  {/* Hero Content — bottom-left, personalized */}
  <div className="absolute inset-0 flex flex-col justify-end !px-6 md:!px-12 !pb-16 md:!pb-15">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-xl"
    >
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white !mb-4 leading-tight">
        Fun live online coding &amp; math classes designed to spark curiosity.
      </h1>
      <p className="font-paragraph text-base md:text-lg text-white/90 !mb-6">
        {referrerName} is already learning with CodingScholar — join in and see what the excitement's about.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold !px-8 !py-6 text-lg rounded-full"
          onClick={()=>{
            console.log('set is opening modal...')
            setIsModalOpen(true)
            
          }}
        >
          Join {referrerName} &amp; others →
        </Button>
      </motion.div>
    </motion.div>
  </div>

  {/* Optional decorative badge, bottom-right */}
  <div className="hidden md:flex absolute bottom-8 right-10 items-center justify-center w-24 h-24 rounded-full bg-white/90 shadow-lg text-center p-2 z-10">
    <span className="text-[var(--primary)] font-bold text-xs leading-tight">
      Learn<br />With Us!
    </span>
  </div>
</section>

 {/* Discover Section */}
<section className="relative w-full !max-w-[100rem] !mx-auto !px-10 !py-20 md:!py-32 ">
  {/* Section Heading */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center max-w-2xl !mx-auto !mb-14 md:!mb-20"
  >
    <p className="text-[var(--accentsec)] font-semibold text-sm uppercase tracking-wide !mb-3">
      What {referrerName} Wants You To Try
    </p>
    <h2 className="font-heading text-3xl md:!text-5xl font-bold text-foreground leading-tight">
      Two Classes Kids Actually Beg To Attend
    </h2>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center !ml-2 !mr-3">
    {/* Left Column - Coding */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="!space-y-4"
    >
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md !mx-auto md:!mx-0">
  <Image
    src="https://static.wixstatic.com/media/fc528a_75991b2bb4524ffca9994132cf505d70~mv2.png?originWidth=400&originHeight=300"
    alt="Kids learning to code"
    className="w-full h-full object-cover"
    width={400}
    height={300}
  />
</div>

      <div className="inline-block bg-[var(--accentsec)]/10 rounded-full !px-4 !py-2">
        <p className="text-[var(--accentsec)] font-semibold text-sm">Coding</p>
      </div>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
        Build Real Projects
      </h3>
      <p className="font-paragraph text-base md:text-lg text-foreground/70">
        From your first line of code to building interactive games and apps. Learn by doing, not just watching.
      </p>

      <Button className="bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-accent-foreground font-semibold rounded-full !px-6"
      onClick={()=>{
            console.log('set is opening modal...')
            setIsModalOpen(true)
            setIsSelectedCourse('coding')
            
          }}
          >
        Get Free Coding Class →
      </Button>
    </motion.div>

    {/* Center - Large Image */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="md:col-span-1 order-first md:order-none"
    >
      <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSdsnT91GGKRVXgpX574dao2aTjvTze7eVoe8Ugg-LXCWND4QlmJBn6m3a&s=10"
          alt="Child learning"
          className="w-full h-full object-cover"
          width={400}
          height={400}
        />
      </div>
    </motion.div>

    {/* Right Column - Maths */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="!space-y-4"
    >
      

      <div className="inline-block bg-[var(--primarysec)]/10 rounded-full !px-4 !py-2">
        <p className="text-[var(--primarysec)] font-semibold text-sm">Mathematics</p>
      </div>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
        Think Differently
      </h3>
      <p className="font-paragraph text-base md:text-lg text-foreground/70">
        Discover how math powers everything from games to AI. Problem-solving becomes your superpower.
      </p>

      <Button className="bg-[var(--primarysec)] hover:bg-[var(--primarysec)]/90 text-secondary-foreground font-semibold rounded-full !px-6"
        onClick={()=>{
            console.log('set is opening modal...')
            setIsModalOpen(true)
            setIsSelectedCourse('math')
            
          }}>
        Get Free Math Class →
      </Button>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md !mx-auto md:!mx-0 md:!ml-10"
     >
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNeZexL7I_aJ0Jlw8JubGw2O5rwzUWx0X-2c8sSmxBtQ&s=10"
          alt="Kids learning math"
          className="w-full h-full object-cover"
          width={300}
          height={300}
        />
      </div>
    </motion.div>
  </div>
</section>

     {/* Experience Section */}
<section className="relative w-full max-w-[100rem] !mx-auto !px-6 !py-20 md:!py-32 bg-gradient-to-b from-white via-[var(--accentsec)]/5 to-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center !mb-16 max-w-2xl !mx-auto"
  >
    <p className="text-[var(--primarysec)] font-semibold text-sm uppercase tracking-wide !mb-3">
      Why Parents Prefer CodingScholar
    </p>
    <h2 className="font-heading text-3xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4">
      The Codingscholar Experience. 
    </h2>
    <p className="font-paragraph text-lg text-foreground/70">
      Here's  what you're signing your child up for — A Real Tutor, Every Class.
    </p>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
    {/* Live Tutor-Led Classes */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-[var(--accentsec)]/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">🎓</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        Live Tutors, Not Recordings
      </h3>
      <p className="font-paragraph text-foreground/70">
        Every class is taught live by a real, qualified instructor. Your child can ask questions and get answered in the moment .
      </p>
    </motion.div>

    {/* Small Groups */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-secondary/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">👥</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        Dedicated Tutor, Personal Attention
      </h3>
      <p className="font-paragraph text-foreground/70">
        Your child learns one-on-one with a dedicated tutor who gets to know their pace, interests, strengths, and areas where they need more support.
      </p>
    </motion.div>

    {/* Safety */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-accent/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">🛡️</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        Safe, Vetted, Kid-First
      </h3>
      <p className="font-paragraph text-foreground/70">
        Every instructor is vetted before they teach. Every class is a supervised, kid-appropriate space — so you can step away with peace of mind.
      </p>
    </motion.div>

    {/* Real Projects */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-secondary/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">🚀</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        Proof, Not Just Grades
      </h3>
      <p className="font-paragraph text-foreground/70">
        Your child builds real games, apps, and projects they can show off. Something tangible to point to — not just a certificate.
      </p>
    </motion.div>

    {/* Progress visibility for parents */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-accent/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">📊</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        You'll Always Know How They're Doing
      </h3>
      <p className="font-paragraph text-foreground/70">
        No guessing. You get visibility into what your child is learning and how they're progressing — you're never in the dark.
      </p>
    </motion.div>

    {/* Flexibility */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl !p-8 md:!p-10 shadow-sm border border-secondary/10 hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center !mb-6">
        <span className="text-2xl">📅</span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-foreground !mb-4">
        Fits Your Family's Schedule
      </h3>
      <p className="font-paragraph text-foreground/70">
        Flexible class times mean this doesn't compete with homework, sports, or dinner. Learning that works around your life, not the other way around.
      </p>
    </motion.div>
  </div>
  {/* Closing CTA */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    viewport={{ once: true }}
    className="text-center !mt-14 md:!mt-20"
  >
    <p className="font-paragraph text-lg text-foreground/70 !mb-6">
      {referrerName} already made the switch — see what your child could build next.
    </p>
    <Button
      size="lg"
      className="bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-accent-foreground font-semibold !px-10 !py-6 text-lg rounded-full"
        onClick={()=>{
            console.log('set is opening modal...')
            setIsModalOpen(true)
            // setIsSelectedCourse('math')
            
          }}
    >
      Join {referrerName} & Others →
    </Button>
  </motion.div>
</section>

      {/* Stories Section */}
      <TestimonialsSection/>

     
     {/* Final CTA Section */}
<section className="relative w-full max-w-[120rem] !mx-auto overflow-hidden">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[600px] md:min-h-[700px]">
    {/* Left - Image */}
    <motion.div
    variants={fadeUp}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative h-full min-h-[400px] md:min-h-full"
    >
      <Image
        src="https://static.wixstatic.com/media/fc528a_fdec650d068b4141b3fc17b27b2349c5~mv2.png?originWidth=576&originHeight=640"
        alt="CodingScholar community"
        className="w-full h-full object-cover"
        width={600}
        height={700}
      />

      {/* Referrer badge overlay on image */}
      <div className="absolute !bottom-6 !left-6 !right-6 md:!right-auto !backdrop-blur-md bg-white/90 rounded-2xl !px-5 !py-4 shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--accentsec)]/20 flex items-center justify-center text-lg">
          ✦
        </div>
        <p className="font-paragraph text-sm text-foreground">
          <span className="font-semibold">{referrerName}</span> is already part of this community
        </p>
      </div>
    </motion.div>

    {/* Right - Content */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="!px-6 md:!px-12 lg:!px-16 !py-12 md:!py-0 bg-white"
    >
      <div className="!space-y-8">
        <div>
          <p className="text-[var(--accentsec)] font-semibold text-sm uppercase tracking-wide !mb-3">
            You've Seen Why. Here's How To Start.
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground !mb-6 leading-tight">
            {referrerName} Made The Move. Your Turn.
          </h2>
          <p className="font-paragraph text-lg text-foreground/70">
            This isn't just another coding class. It's a community where young minds discover their potential, build real projects, and develop the confidence to shape the future — starting with a free class, on us.
          </p>
        </div>

        <div className="!space-y-4">
          <div className="flex items-start gap-4">
            <span className="!text-2xl text-black">✓</span>
            <div>
              <p className="font-heading font-bold text-foreground">Live, Interactive Classes</p>
              <p className="font-paragraph text-sm text-foreground/60">Learn from expert instructors in real-time</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-black">✓</span>
            <div>
              <p className="font-heading font-bold text-foreground">Project-Based Learning</p>
              <p className="font-paragraph text-sm text-foreground/60">Build real apps and games from day one</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-black">✓</span>
            <div>
              <p className="font-heading font-bold text-foreground">A Community {referrerName} Already Trusts</p>
              <p className="font-paragraph text-sm text-foreground/60">Grow alongside peers who share your curiosity</p>
            </div>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="w-full bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-[var(--accentsec)]-foreground font-semibold !px-8 !py-6 text-lg rounded-full"
             onClick={()=>{
            console.log('set is opening modal...')
            setIsModalOpen(true)
            // setIsSelectedCourse('math')
            
          }}
          >
            Join {referrerName} — Start Free →
          </Button>
        </motion.div>

        <p className="font-paragraph text-sm text-foreground/50 text-center">
          No credit card required. Free trial class, no strings attached.
        </p>
      </div>
    </motion.div>
  </div>
</section>

      <Footer />

      <RegisterModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  referrerName={referrerName}
  referralCode={referralCode}       // e.g. the :id from the URL
  defaultCourse={selectedCourse}    // pass "coding" or "math" from wherever the Discover section CTA was clicked
  onSubmit={(data:any) => {
    console.log(data);
    // POST to your API here
    setIsModalOpen(false);
  }}
/>
    </div>
  );
}
