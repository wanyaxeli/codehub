import React from 'react'
import Slider from 'react-slick'
import parent1 from '../assets/parent1.jpg'
import parent2 from '../assets/parent2.jpg'
import parent3 from '../assets/parent3.jpg'
import parent4 from '../assets/parent4.jpg'
import parent5 from '../assets/parent5.jpg'
import parent6 from '../assets/parent6.jpg'
export default function ParentsComments() {
   const comments=[{
      name:"Wanjiku Mwangi",
      comment:"I am amazed at how much my son has learned.codingScholar makes coding fun and relatable. He's even teaching his cousins what he learns online!",
      img:parent2,
      country:'Kenya'},
      {name:"Chinedu Okafor",
      comment:"My daughter used to be shy, but since she joined Fraic, she's full of ideas and confidence. She talks about loops and logic like a little engineer!",
      img:parent1,
      country:'Nigeria'},
      {name:"Lerato Mokoena",
      comment:"Coding always seemed too advanced for kids, but codingScholar made it easy and fun for my son. He now dreams of building apps that solve real problems.",
      img:parent4,
      country:'South Africa'},
      {name:"James Atwooki",
      comment:"codingScholar has opened a whole new world for my children. They’re learning skills that I wish I had learned at their age. Thank you for this opportunity!",
      img:parent5,
      country:'Uganda'},
      {name:" Akosua Mensah",
      comment:"I’m truly impressed by the progress my daughter has made. codingScholar’s approach is practical, interactive, and encourages creativity. She’s even teaching her friends now!",
      img:parent6,
      country:'Ghana',
   }]
    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        
      }
      var TwoDisplayersettings = {
        dots: false,
        infinite: true,
        speed: 800,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3500,
        
      }
      var OneDisplayersettings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        
      }
  return (
    <div className='parentsComments'>
        <div className='parentsCommentsHolder'>
             <h3>Students and parents love codingscholar’s training program and curriculum</h3>
             <div >
             <Slider {...settings} className='parentsCommentsContainer'>
             {comments.map((item,i)=>{
                return(
               <div key={i} className='parentsCommentsCard'>
                   <div className='parentDetailsHolder'>
                     <div className='PArentimageHolder'>
                     <img src={item.img} alt='parent'/>
                     </div>
                     <div className='PArentNameHolder'>
                        <h4>{item.name}</h4>
                        <p>codingscholar Parent</p>
                     </div>
                   </div>
                   <div className='commentHolder'>
                   <h4>{item.name}</h4>
                    <p>{item.comment}</p>
                   </div>
                   <div className='ParantsLocationHolder'>
                   <i class="fa fa-map-marker" aria-hidden="true"></i>
                   <p style={{color:'#0097b2'}}>{item.country}</p>
                   </div>
                </div>
                )
             })}
             </Slider>
             </div>
        </div>
        <div className='TwoDisplayerparentsCommentsHolder'>
             <h3>Students and parents love codingscholar’s training program and curriculum</h3>
             <div >
             <Slider {...TwoDisplayersettings} className='parentsCommentsContainer'>
             {comments.map((item,i)=>{
                return(
                    <div key={i} className='parentsCommentsCard'>
                   <div className='parentDetailsHolder'>
                     <div className='PArentimageHolder'>
                     <img src={item.img} alt='parent'/>
                     </div>
                     <div className='PArentNameHolder'>
                        <h4>{item.name}</h4>
                        <p>codingscholar Parent</p>
                     </div>
                   </div>
                   <div className='commentHolder'>
                   <h4>{item.name}</h4>
                    <p>{item.comment}</p>
                   </div>
                   <div className='ParantsLocationHolder'>
                   <i class="fa fa-map-marker" aria-hidden="true"></i>
                   <p>{item.country}</p>
                   </div>
                </div>
                )
             })}
             </Slider>
             </div>
        </div>
        <div className='OneDisplayerparentsCommentsHolder'>
             <h3>Students and parents love codingscholar’s training program and curriculum</h3>
             <div >
             <Slider {...OneDisplayersettings} className='parentsCommentsContainer'>
             {comments.map((item,i)=>{
                return(
                    <div key={i} className='parentsCommentsCard'>
                   <div className='parentDetailsHolder'>
                     <div className='PArentimageHolder'>
                       <img src={item.img} alt='parent'/>
                     </div>
                     <div className='PArentNameHolder'>
                        <h4>{item.name}</h4>
                        <p>codingscholar Parent</p>
                     </div>
                   </div>
                   <div className='commentHolder'>
                   <h4>{item.name}</h4>
                    <p>{item.comment}</p>
                   </div>
                   <div className='ParantsLocationHolder'>
                   <i class="fa fa-map-marker" aria-hidden="true"></i>
                   <p>{item.country}</p>
                   </div>
                </div>
                )
             })}
             </Slider>
             </div>
        </div>
    </div>
  )
}
