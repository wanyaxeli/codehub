import React from 'react'
import pic from '../assets/happychild.jpg'

export default function Banner() {
  return (
    <div className='bannerWrapper'>
        <div className='bannerDetailsWrapper'>
           <div className='sharedStyles introWrapper'>
            <span className='IConWrapper'><i className="fa fa-bolt" aria-hidden="true"></i></span>
            <p>Welcome to codehub online coding school for kids</p>
           </div>
            <div className='Aboutcodehub'>
            <p>Let your kid start learning from <br/> the world's best coding institution</p>
            </div>
            <ul>
                <li><span className='IConWrapper engage'><i className="fa fa-rss" aria-hidden="true"></i></span> Engaging live video lesson</li>
                <li><span className='IConWrapper learn'><i className="fa fa-users" aria-hidden="true"></i></span> Learn from top-rated ,world class instructors</li>
            </ul>
            <div className='inputWrapper'>
                <div className='countCodeHolder'></div>
                <input type="text" />
                <button>Try Free Lesson</button>
            </div>
            <div className='sharedStyles kidsContainer'>
                <span className='IConWrapper'><i className="fa fa-bolt" aria-hidden="true"></i></span>
                <p>Join 1000+ kids who took a lesson in the last 24 hours</p>
            </div>
            <div className='sharedStyles numberOfStudentTaking'>
                <span  className='IconContainer'>
                <i className=" fa fa-graduation-cap" aria-hidden="true"></i>
                </span>
               <div className='acitiveStudentsWrapper'>
                <h3>9.5k +</h3>
                <p>Total active students taking<br/> coding courses</p>
               </div>
            </div>
        </div>
        <div className='bannerImgWrapper'>
            <img src={pic}/>
            <div className='bannnerAnimationWrapper'>
                <div className='InnerbannnerAnimationWrapper'>
                <div className='bannerAnimationIcon'>
                <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className='bannerAnimationDetailsWRapper'>
                <h3>150k +</h3>
                <p>Assisted students</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
