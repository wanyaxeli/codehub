import React from 'react'
import pic from '../assets/student.jpg'
export default function About() {
  return (
    <div className='AboutWrapper'>
        <div className='smallDiviceAboutPage'>
        <div className='aboutContentWrapper'>
                <div className='aboutContent'>
                  <h2>about us</h2>
                  <div>
                    <p>Welcome to Codingscholar – Where Future Tech Stars Are Born! 
                    At Codingscholar, we turn screen time into creative genius time for learners aged 6 to 25!
                    </p> 
                    <p>From building games, websites, and animations to solving real-world problems with code, our fun, hands-on approach makes tech easy and exciting for beginners and beyond.
                    </p>
                  </div>
                  <div className='contactBtnWrapper'>
                    <a
                     href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                     target="_blank"
                     rel="noopener noreferrer"
                    >Contact Us</a>
                  </div>
                </div>
            </div>
        </div>
        <div className='AboutContainer'>
            <div className='abooutDotWrapper'>
                <div className='abooutDot'></div>
            </div>
            <div className='aboutImageWrapper'>
                <div className='aboutImage'>
                 <img src={pic}/>
                </div>
            </div>
            <div className='aboutContentWrapper'>
                <div className='aboutContent'>
                  <h2>about us</h2>
                  <div>
                    <p>Welcome to Codingscholar – Where Future Tech Stars Are Born! 
                    At Codingscholar, we turn screen time into creative genius time for learners aged 6 to 25!
                    </p> 
                    <p>From building games, websites, and animations to solving real-world problems with code, our fun, hands-on approach makes tech easy and exciting for beginners and beyond.
                    </p>
                  </div>
                  <div className='contactBtnWrapper'>
                    <a
                     href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                     target="_blank"
                     rel="noopener noreferrer"
                    >Contact Us</a>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
