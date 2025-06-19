import React from 'react'

export default function Benefit() {
  return (
    <div className='BenefitWrapper'>
        <div className='BenefitContainer'>
            <h3>What Will Your Child Gain with codingscholar?</h3>
            <div className='BenefitDetailsWrapper'>
             <div className='benefitCard '>
              <h4>Learn Skills That Schools Don’t Teach</h4>
               <div className='benefitListWrapper'>
                 <ul>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Kids learn to build apps, websites, and games</li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Hands-on coding experience from day one</li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Skills directly relevant to today's tech-driven world</li>
                  {/* <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Kids learn to build apps, websites, and games</li> */}
                 </ul>
               </div>
             </div>
             <div className='benefitCard'>
               <h4>Built for Brainpower</h4>
               <div className='benefitListWrapper'>
                 <ul>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Strengthens logic and reasoning</li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span>Boosts performance in math and science</li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span>Builds a smarter, sharper learner </li>
                  {/* <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Kids learn to build apps, websites, and games</li> */}
                 </ul>
               </div>
             </div>
             <div className='benefitCard '>
             <h4>Personalized 1:1 Guidance</h4>
               <div className='benefitListWrapper'>
                 <ul>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Live, 1-on-1 sessions with expert instructors</li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span>Real relationships that build trust </li>
                  <li><span><i className="fa fa-star" aria-hidden="true"></i> </span>Personalized support tailored to your child’s pace</li>
                  {/* <li><span><i className="fa fa-star" aria-hidden="true"></i></span> Kids learn to build apps, websites, and games</li> */}
                 </ul>
               </div>
             </div>
            </div>
        </div>
    </div>
  )
}
