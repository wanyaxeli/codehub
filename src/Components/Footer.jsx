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
                  <img src={logo}/>
                </div>
                <h4>CodingScholar</h4>
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
                    <li>about us</li>
                    <li>why  CodingScholar</li>
                    <li>
                    <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:info@codingscholar.com" style={{ textDecoration: 'none', color: 'inherit' }}>contact us
                     </a></li>
                  </ul>
                </div>
            </div>
            <div className='FooterCopyrightWrapper'>
                 <div className='footerIconsWrapper'>
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <i className="fa fa-twitter" aria-hidden="true"></i>
                 <a href='https://www.linkedin.com/company/codingscholar'><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
                <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
                <div>
                    <p><i className="fa fa-copyright" aria-hidden="true"></i> {currentYear} codingscholar.com All Rights Reserved</p>
                </div>
            </div>
        </div>
    </div>
  )
}
