import React from 'react'
import logo from '../assets/logoCodeHub.png'
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footerWrapper'>
        <div className='footerContainer'>
            <div className='footerLogoWrapper'>
                <div className='footerLogo'>
                 <div className='footerLogoImage'>
                  <img src={logo} alt="Kids learning coding online in Kenya"/>
                </div>
                <h4>Codingscholar</h4>
                </div>
                <div className='footerCoourses'>
                    <ul>
                        <li>Courses</li>
                        <li>python</li>
                        <li>scratch</li>
                        <li>html</li>
                    </ul>
                </div>
                <div className='footerAboutus'>
                  <ul>
                    <li> about us</li>
                    <li><a href='/Why Us'> why  codingscholar</a></li>
                    <li>terms and condtion</li>
                    <li>privacy policy</li>
                    <li>content policy</li>
                    <li>
                    <a
                     href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                     target="_blank"
                     rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}>contact us
                     </a></li>
                  </ul>
                </div>
            </div>
            <div className='FooterCopyrightWrapper'>
                 <div className='footerIconsWrapper'>
                <a href='https://web.facebook.com/profile.php?id=61578298134834&_rdc=1&_rdr#'><i   className="fa fa-facebook" aria-hidden="true"></i></a> 
                <a href='https://x.com/codingscho63098'> <i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href='https://www.linkedin.com/company/codingscholar'><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
                <a href='https://www.instagram.com/codingscholarkids/'><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
                <div>
                    <p><i className="fa fa-copyright" aria-hidden="true"></i> {currentYear} codingscholar.com All Rights Reserved</p>
                </div>
            </div>
        </div>
    </div>
  )
}
