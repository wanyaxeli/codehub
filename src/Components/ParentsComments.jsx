import React from 'react'
import Slider from 'react-slick'
export default function ParentsComments() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        
      }
  return (
    <div className='parentsComments'>
        <div className='parentsCommentsHolder'>
             <h3>Students and parents love codingScholar’s training program and curriculum</h3>
             <div >
             <Slider {...settings} className='parentsCommentsContainer'>
             {Array(8).fill(0).map((item,i)=>{
                return(
                    <div key={i} className='parentsCommentsCard'>
                   <div className='parentDetailsHolder'>
                     <div className='PArentimageHolder'></div>
                     <div className='PArentNameHolder'>
                        <h4>Elias wanyama</h4>
                        <p>Codehub Parent</p>
                     </div>
                   </div>
                   <div className='commentHolder'>
                   <h4>Elias wanyama</h4>
                    <p>This platform is amazing for kids to learn coding in such young age. The staff is so cooperative and the instructor knows how to make kids learn in more interesting way. Codehub you are doing Amazing work!</p>
                   </div>
                   <div className='ParantsLocationHolder'>
                   <i class="fa fa-map-marker" aria-hidden="true"></i>
                   <p>kenya</p>
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
