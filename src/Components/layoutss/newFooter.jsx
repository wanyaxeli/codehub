import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import pic from '@/assets/codingscholarlogo003.png'

export default function NewFooter() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="homeheropadxsix boutcoursesect mxauto container max-w-[120rem] mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
             <div className="flex-col items-center  nav-title">
                <div className="w-24 h-24 flex items-center justify-center  rounded-lg overflow-hidden">
                    <img
                      src={pic}
                      alt="logo"
                      className="object-contain h-50 w-50 scale-180  "
                      />
                  </div>
                       <h3 className="text-[var(--primarysec)] font-bold text-lg tracking-wide">
                             Codingscholar
                         </h3>
             </div>
            {/* <h3 className="nav-title text-2xl font-heading font-bold mb-4">Coding Scholar</h3> */}
            <p className="nav-title font-paragraph text-gray-300 mb-4">
              Interactive online coding and math classes for children. Learn from expert teachers in small, engaging groups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="nav-title text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="spacing-y-two space-y-2 font-paragraph">
              <li>
                {/* <button
                //   onClick={() => scrollToSection('courses')}
                  
                > */}
                 <a 
                 className="footer-link-color hover:text-white transition-colors"
                 href='/Why Us'> why  codingscholar</a>
                {/* </button> */}
              </li>
              <li>
                  <a 
                  className="footer-link-color hover:text-white transition-colors"
                  href='/Privacy policy'>privacy policy</a>
                
              </li>
              <li>
                  <a 
                  className="footer-link-color text-gray-300  hover:text-white transition-colors"
                  href=''>Terms and conditions</a>
              </li>
              <li>
                
                    <a
                     className="footer-link-color hover:text-white transition-colors nav-title"
                     href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                     target="_blank"
                     rel="noopener noreferrer"
                    // style={{ textDecoration: 'none', color: 'inherit' }}
                    >contact us
                     </a>

                  
                
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="nav-title text-lg font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="spacing-y-three space-y-3 font-paragraph">
              <li className="flex items-center gap-3 text-gray-300">
                <Mail size={20} />
                <span><a
                     href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className='footer-link-color'
                    // style={{ textDecoration: 'none', color: 'inherit' }}
                    >info@codingscholar.com
                     </a></span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone size={18} />
                <span>+254 (738) 709-066</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="nav-title text-lg font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-color w-10 h-10 rounded-full bg-primarysec hover:bg-primary/80 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-color w-10 h-10 rounded-full bg-primarysec hover:bg-primary/80 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-color w-10 h-10 rounded-full bg-primarysec hover:bg-primary/80 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-color w-10 h-10 rounded-full bg-primarysec hover:bg-primary/80 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-eight mt-twelve border-t border-gray-700 mt-12 pt-8 text-center font-paragraph text-gray-400">
          <p>&copy; {new Date().getFullYear()} Coding Scholar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
