import React from 'react'
import '../index.css'
import Footer from '../Components/Footer'
import Header from '../Components/Header'


export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen flex flex-col '>
      <Header/>
         

           <main className="flex-grow bg-[rgb(232,242,251)]">
        {/* Hero Section */}
        <section className="privacy-hero">
          <div className="privacy-container">
            <div className="privacy-header">
              <h1 className="privacy-title">Privacy Policy</h1>
              <p className="text-lg text-[rgb(100,106,110)]">
                Your privacy and trust matter to us. Learn how Coding Scholar protects your personal information.
              </p>
            </div>
            <div className="flex justify-center gap-4 text-sm text-[rgb(100,106,110)]">
              <span>Last updated: January 5, 2025</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="privacy-content">
          <div className="privacy-container">
            {/* Quick Navigation */}
            <div className="nav-cont bg-[rgb(255,255,255)]  border border-[rgb(223,230,235)] rounded-lg">
              <h2 className="nav-title text-sm font-semibold text-[rgb(0,34,140)]  uppercase tracking-wide">Quick Navigation</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[rgb(0,34,140)] ">
                {[
                  "Introduction",
                  "Information We Collect",
                  "How We Use Information",
                  "Data Security",
                  "Your Rights",
                  "Contact Us",
                ].map((item, index) => (
                  <li key={index}>
                    <a href={`#section-${index + 1}`} className="nav-link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 1: Introduction */}
            <section id="section-1" className="privacy-sections scroll-mt-20">
              <h2 className=" nav-title text-3xl font-bold text-[rgb(4,12,19)]">1. Introduction</h2>
              <p className="text-lg text-[rgb(100,106,110)] leading-relaxed">
                Welcome to Coding Scholar (“we”, “our”, or “us”), an online, web-based educational platform accessible at <a href="https://www.codingscholar.com/" className='nav-link' > codingscholar.com.</a> We provide coding and mathematics learning services delivered by qualified human teachers to students across Kenya and other African countries through live and structured online classes.<br></br><br/>

                We are committed to protecting the privacy and personal information of our users, including students, parents or guardians, teachers, and tutors. This Privacy Policy explains how we collect, use, store, and protect information when you access our website, register an account, enroll in classes, or interact with our online learning services. We collect only the information necessary to operate the platform, deliver educational services, and comply with applicable legal obligations.<br/><br/>

                Coding Scholar places particular importance on the protection of children’s personal data. Information relating to students is collected and processed only with the consent of a parent or legal guardian and is handled in accordance with applicable data protection laws and best practices. By using <a href="https://www.codingscholar.com/" className='nav-link' > codingscholar.com.</a>, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of information as described herein.</p>
            </section>

            {/* Section 2: Applicable Laws */}
            <section id="section-2" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title  text-3xl font-bold text-[rgb(4,12,19)] ">2. Applicable Laws</h2>
              <p className=" nav-title text-[rgb(100,106,110)]">We comply with the following regulations:</p>
              <ul className=" privacy-ul space-y-2 ml-4 text-[rgb(100,106,110)]">
                {[
                  "The Kenya Data Protection Act, 2019",
                  "Applicable African data protection principles",
                  "International best practices for children's online privacy",
                ].map((law, index) => (
                  <li key={index} className="flex items-start">
                    <span className=" privacy-bullets text-[rgb(0,34,140)]  font-bold">•</span>
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3: Information We Collect */}
            <section id="section-3" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)]">3. Information We Collect</h2>
              <p className="privacy-infocollect-description text-[rgb(100,106,110)] ">
                We only collect information that is necessary to provide our educational services.
              </p>

              <div className="flex flex-col gap-6">
                {/* Parents/Guardians */}
                <div className=" privacy-infocollect-container bg-[rgb(255,255,255)] rounded-lg border border-[rgb(223,230,235)]">
                  <h3 className=" privacy-infocollect-title text-xl font-semibold text-[rgb(4,12,19)] ">3.1 Information from Parents/Guardians</h3>
                  <ul className="privacy-ul flex flex-col gap-2 text-[rgb(100,106,110)]">
                    {[
                      "Parent/guardian name",
                      "Email address",
                      "Phone number",
                      "Country and city",
                      "Payment information (processed by secure third-party providers)",
                    ].map((info, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="privacy-bullets text-accent ">✓</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Students */}
                <div className=" privacy-infocollect-container bg-[rgb(255,255,255)]  rounded-lg border border-[rgb(223,230,235)]">
                  <h3 className=" privacy-infocollect-title text-xl font-semibold text-[rgb(4,12,19)] ">3.2 Information About Students</h3>
                  <ul className="privacy-ul flex flex-col gap-2 ml-4 text-[rgb(100,106,110)]">
                    {[
                      "First name or nickname",
                      "Age or grade level",
                      "Learning progress and class performance",
                      "Class attendance records",
                    ].map((info, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className=" privacy-bullets text-accent mr-3">✓</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                  <p className=" privacy-margintop text-sm text-[rgb(100,106,110)] mt-4 italic">
                    We do not require children to provide sensitive personal information.
                  </p>
                </div>

                {/* Teachers/Tutors */}
                <div className="privacy-infocollect-container bg-[rgb(255,255,255)] rounded-lg border border-[rgb(223,230,235)]">
                  <h3 className="privacy-infocollect-title text-xl font-semibold text-[rgb(4,12,19)] mb-3">3.3 Information from Teachers/Tutors</h3>
                  <ul className=" privacy-ul flex flex-col gap-2 ml-4 text-[rgb(100,106,110)]">
                    {[
                      "Full name",
                      "Email address",
                      "Phone number",
                      "Country and city",
                      "Educational qualifications and teaching experience",
                      "Subjects taught",
                      "Availability and class schedules",
                      "Payment details (processed via secure providers)",
                    ].map((info, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="privacy-bullets text-accent mr-3">✓</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Automatically Collected */}
                <div className=" privacy-infocollect-container bg-[rgb(255,255,255)]  p-6 rounded-lg border border-[rgb(223,230,235)]">
                  <h3 className="privacy-infocollect-title text-xl font-semibold text-[rgb(4,12,19)] mb-3">
                    3.4 Automatically Collected Information
                  </h3>
                  <ul className="privacy-ul flex flex-col gap-2 ml-4 text-[rgb(100,106,110)]">
                    {[
                      "Device type and browser",
                      "IP address (used for security and fraud prevention)",
                      "Usage data (pages visited, class duration)",
                    ].map((info, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="privacy-bullets text-accent mr-3">✓</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: How We Use Information */}
            <section id="section-4" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">4. How We Use Your Information</h2>
              <div className="privacy-infocollect-container bg-[rgb(0,34,140)]/5 border border-[rgb(0,34,140)]/10 p-6 rounded-lg">
                <ul className="flex flex-col gap-3 text-[rgb(100,106,110)]">
                  {[
                    "Provide and manage online classes",
                    "Communicate with parents/guardians",
                    "Track learning progress and improve teaching quality",
                    "Process payments and subscriptions",
                    "Ensure platform safety and security",
                    "Comply with legal obligations",
                  ].map((use, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="privacy-bullets text-[rgb(0,34,140)] mr-3 text-lg">→</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 5: Children's Privacy */}
            <section id="section-5" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">5. Children's Privacy</h2>
              <div className="privacy-infocollect-container bg-accent/5 border border-accent/10  rounded-lg space-y-4">
                <p className="privacy-infocollect-description text-[rgb(100,106,110)]">
                  At Coding Scholar, protecting children's privacy is our highest priority. Here's what you should know:
                </p>
                <ul className="privacy-ul flex flex-col gap-3  ml-4 text-[rgb(100,106,110)]">
                  {[
                    "Our Services are designed for children under parental supervision",
                    "We only collect children's data with parent or guardian consent",
                    "Children are not allowed to create accounts on their own",
                    "Parents/guardians may review, update, or request deletion of their child's data at any time",
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="privacy-bullets text-accent mr-3 font-bold">★</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 6: Data Sharing */}
            <section id="section-6" className="privacy-sections scroll-mt-20">
              <h2 className=" nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">6. Data Sharing & Third Parties</h2>
              <p className=" privacy-infocollect-description text-[rgb(100,106,110)] mb-6">
                <span className="font-semibold text-[rgb(4,12,19)]">We do not sell or rent personal data.</span> We only
                share information with trusted partners who help us deliver our services:
              </p>
              <div className="privacy-infocollect-description grid md:grid-cols-2 gap-4">
                {[
                  { title: "Tutors & Instructors", desc: "Strictly for teaching purposes" },
                  { title: "Payment Processors", desc: "Secure processing of transactions" },
                  { title: "Technology Providers", desc: "Video conferencing and learning platforms" },
                  { title: "Legal Authorities", desc: "Only when required by law" },
                ].map((partner, idx) => (
                  <div key={idx} className="paddingfour bg-[rgb(255,255,255)]  p-4 rounded-lg border border-[rgb(223,230,235)]">
                    <h4 className=" mb-one font-semibold text-[rgb(4,12,19)] mb-1">{partner.title}</h4>
                    <p className="text-sm text-[rgb(100,106,110)]">{partner.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[rgb(100,106,110)] mt-6 text-sm">
                All third parties are contractually required to protect your data with appropriate security measures.
              </p>
            </section>

            {/* Section 7: Data Security */}
            <section id="section-7" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">7. Data Storage & Security</h2>
              <p className="privacy-infocollect-description text-[rgb(100,106,110)] mb-6">
                We take reasonable technical and organizational measures to protect your personal data:
              </p>
              <div className="privacy-infocollect-description flex flex-col gap-3 ">
                {[
                  "Secure servers with encrypted connections",
                  "Password-protected accounts with strong authentication",
                  "Limited access to sensitive student data",
                  "Regular security audits and compliance checks",
                ].map((measure, idx) => (
                  <div key={idx} className=" paddingfour flex items-start bg-[rgb(255,255,255)]  p-4 rounded-lg border border-[rgb(223,230,235)]">
                    <span className="privacy-bullets text-[rgb(0,34,140)] mr-3 font-bold">✓</span>
                    <span className="text-[rgb(100,106,110)]">{measure}</span>
                  </div>
                ))}
              </div>
              <p className="text-[rgb(100,106,110)] mt-6 text-sm">
                Data is stored only for as long as necessary to provide our services or meet legal requirements.
              </p>
            </section>

            {/* Section 8: Your Rights */}
            <section id="section-8" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">8. Your Rights</h2>
              <p className="privacy-infocollect-description text-[rgb(100,106,110)] mb-6">
                Under the Kenya Data Protection Act, you have the following rights:
              </p>
              <div className="grid gap-4">
                {[
                  { right: "Right to Access", desc: "View all personal data we hold about you" },
                  { right: "Right to Correct", desc: "Update or correct inaccurate information" },
                  { right: "Right to Delete", desc: "Request deletion of your data" },
                  { right: "Right to Withdraw Consent", desc: "Stop data processing at any time" },
                  { right: "Right to Object", desc: "Oppose certain data processing activities" },
                  { right: "Right to Data Portability", desc: "Receive your data in a portable format" },
                ].map((item, idx) => (
                  <div key={idx} className=" info-item border-l-4 border-accent pl-4 py-2">
                    <h4 className="font-semibold text-[rgb(4,12,19)]">{item.right}</h4>
                    <p className="text-[rgb(100,106,110)] text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Contact Information */}
            <section id="section-9" className=" privacy-contactsection mb-12 scroll-mt-20 bg-[rgb(255,255,255)]  p-8 rounded-lg border border-[rgb(223,230,235)]">
              <h2 className="privacy-infocollect-description text-3xl font-bold text-[rgb(4,12,19)] mb-6">9. Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="marginbottom-two font-semibold text-[rgb(4,12,19)] mb-2">Coding Scholar</h3>
                  <p className="nav-title text-[rgb(100,106,110)] text-sm mb-4">
                    Have questions about our privacy practices? We're here to help.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-[rgb(100,106,110)] uppercase tracking-wide">Email</p>
                    <a
                      href="mailto:support@codingscholar.com"
                      className=" nav-link text-[rgb(0,34,140)] hover:text-accent transition-colors"
                    >
                      support@codingscholar.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[rgb(100,106,110)] uppercase tracking-wide">Website</p>
                    <a
                      href="https://www.codingscholar.com"
                      className="nav-link text-[rgb(0,34,140)] hover:text-accent transition-colors"
                    >
                      www.codingscholar.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[rgb(100,106,110)] uppercase tracking-wide">Country</p>
                    <p className="text-[rgb(100,106,110)]">Kenya</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10: Changes to Policy */}
            <section id="section-10" className="privacy-sections scroll-mt-20">
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">10. Changes to This Policy</h2>
              <p className="text-[rgb(100,106,110)]">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                legal requirements, or other factors. Any changes will be posted on our website with an updated date. We
                encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            {/* Section 11: Parental Consent */}
            <section
              id="section-11"
              className="privacy-parentalconsent mb-12 scroll-mt-20 bg-[rgb(0,34,140)]/5 border border-[rgb(0, 34, 140)]/10 p-6 rounded-lg"
            >
              <h2 className="nav-title text-3xl font-bold text-[rgb(4,12,19)] mb-4">11. Parental Consent</h2>
              <p className="text-[rgb(100,106,110)]">
                By enrolling a child on our platform, the parent or legal guardian confirms that they have read and
                understood this Privacy Policy and consent to the collection and use of information as described herein.
              </p>
            </section>
          </div>
        </section>
      </main>

         
         <Footer/>
    </div>
  )
}
