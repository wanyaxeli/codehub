import React from 'react'
import pic from '../assets/pic4.png'
import pic1 from '../assets/Learning Through Virtual and Digital Worlds.png'
import pic2 from '../assets/img1.png'
import pic3 from '../assets/pic3.png'
import pic5 from '../assets/img.png'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
export default function WhyUs() {
   const navigate= useNavigate()
   const handleToBookTrail=()=>{
      navigate('/register')
   }
  return (
    <div className='WhyUsWrapper'>
       <div className='AboutCodingScholarHolder'>
       <div className='AboutCodingScholarWrapper'>
        <div className='AboutCodingScholarImgWrapper'>
           <div className='AboutCodingScholarImg'>
           <img src={pic} alt='image'/>
           </div>
        </div>
        <div className='AboutCodingScholarContent'>
           <h2>Codingscholar: Fostering a Foundation for Lifelong Learning</h2>
           <p>Codingscholar builds essential numeracy and computational-thinking skills for kids through hands-on coding and math classes. We nurture problem-solvers and creative thinkers, laying the foundation for long-term academic and career success.</p>
        </div>
       </div>
       </div>
       <div className='OurOfferingWrapper'>
          <div className='OurOfferingContainer'>
            <h2>what we offer</h2>
            <div className='ourOfferingCardWrapper'>
                <div className='ourOfferingCard'>
                  <h3>Immersive Learning</h3>
                  <div className='ourOfferingCardImageWrapper'>
                     <img src={ pic3} alt='image'/>
                  </div>
                  <div>
                     <p>Placing learners at the heart of an engaging experience that sparks curiosity and sharpens skills through thought-provoking questions, captivating stories, fun quizzes, and rich multimedia—making education both enjoyable and memorable.</p>
                  </div>
                </div>
                <div className='ourOfferingCard'>
                  <h3>Digital Personalized Learning</h3>
                  <div className='ourOfferingCardImageWrapper'>
                  <img src={ pic1} alt='image'/>
                  </div>
                  <div>
                     <p>Helping students reach their full potential through tailored learning paths that use data-driven insights to identify strengths and areas for improvement, ending with detailed progress reports that showcase growth and accomplishments.</p>
                  </div>
                </div>
                <div className='ourOfferingCard'>
                   <h3>Play-Powered Learning Adventures</h3>
                   <div className='ourOfferingCardImageWrapper'>
                   <img src={ pic2} alt='image'/>
                   </div>
                   <div>
                     <p>Empowering students to stay motivated through a variety of engaging games connected to their academic progress. Each milestone unlocks new challenges and rewards, fostering responsibility, consistency, curiosity, and care while making learning an enjoyable adventure.</p>
                   </div>
               </div>
            </div>
            <div className='SmallDeviceourOfferingCardWrapper'>
                <div className='ourOfferingCard'>
                  <h3>Immersive Learning</h3>
                  <div className='ourOfferingCardImageWrapper'>
                     <img src={ pic3} alt='image'/>
                  </div>
                  <div>
                     <p>Placing learners at the heart of an engaging experience that sparks curiosity and sharpens skills through thought-provoking questions, captivating stories, fun quizzes, and rich multimedia—making education both enjoyable and memorable.</p>
                  </div>
                </div>
                <div className='ourOfferingCard'>
                  <h3>Digital Personalized Learning</h3>
                  <div className='ourOfferingCardImageWrapper'>
                  <img src={ pic1} alt='image'/>
                  </div>
                  <div>
                     <p>Helping students reach their full potential through tailored learning paths that use data-driven insights to identify strengths and areas for improvement, ending with detailed progress reports that showcase growth and accomplishments.</p>
                  </div>
                </div>
                <div className='ourOfferingCard'>
                   <h3>Play-Powered Learning Adventures</h3>
                   <div className='ourOfferingCardImageWrapper'>
                   <img src={ pic2} alt='image'/>
                   </div>
                   <div>
                     <p>Empowering students to stay motivated through a variety of engaging games connected to their academic progress. Each milestone unlocks new challenges and rewards, fostering responsibility, consistency, curiosity, and care while making learning an enjoyable adventure.</p>
                   </div>
               </div>
            </div>
          </div>
       </div>
       <div className='whyChooseUsWrapper'>
          <div className='whyChooseUsContainer'>
            <h2>Why Choose codingscholar?</h2>
            <div className="whyChooseUsContainer">
               <div className="timeline">
                  <div className="timeline-item left">
                     <div className="content">
                     <h3>Expert Tutors</h3>
                     <p>Learn from experienced coding and math tutors who make learning fun and engaging.</p>
                     </div>
                  </div>

                  <div className="timeline-item right">
                     <div className="content">
                     <h3>Interactive Learning</h3>
                     <p>Hands-on lessons that help kids apply concepts in real-world scenarios.</p>
                     </div>
                  </div>

                  <div className="timeline-item left">
                     <div className="content">
                     <h3>Personalized Approach</h3>
                     <p>Every child learns differently — we adapt lessons to their unique needs.</p>
                     </div>
                  </div>

                  <div className="timeline-item right">
                     <div className="content">
                     <h3>Fun Projects</h3>
                     <p>Kids build cool projects, boosting their confidence and creativity.</p>
                     </div>
                  </div>
               </div>
               </div>
          </div>
       </div>
       <div className='WhyUsTrialBtnWrapper'>
          <div className='WhyUsTrialBtnContainer'>
            <div className='WhyUsTrialBtnContainerImgWrapper'>
                <img src={pic5}/>
            </div>
            <div className='WhyUsTrialBtnContainerContentWrapper'>
                <h2>Ignite your child’s curiosity and passion for learning</h2>
                <div className='WhyUsTrialBtnContainerBtnWrapper'>
                  <button onClick={handleToBookTrail}>Book free class</button>
                </div>
            </div>
          </div>
       </div>
        <Footer/>
    </div>
  )
}
