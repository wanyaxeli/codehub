import React from 'react'
import { useNavigate,useOutletContext } from 'react-router-dom'
import img from '../../assets/kidspic.png'
export default function AttemptedQuizesDisplayer() {
    const {attemptedquiz} = useOutletContext();
    function normalizeProjectLink(url) {
        if (!url) return url;
      
        // Only handle Code.org links
        if (url.includes('studio.code.org')) {
          return url.replace(
            /\/global\/[a-z]{2}\//,
            '/global/en/'
          );
        }
      
        return url;
      }
      console.log('ss',attemptedquiz)
  return (
    <div className='AttemptedQuizesDisplayer'>
        {attemptedquiz && attemptedquiz.length>0?attemptedquiz.map((item,i)=>{
            return(
        <div key={i} className='AttemptedQuizesWrapper'>
            <div className='AttemptedQuizesImgWrapper'>
                <img src={img}/>
            </div>
            <div className='AttemptedQuizesContentWrapper'>
                <h2>{item.quiz.title}</h2>
                <a
                 href={normalizeProjectLink(item.project_link)}
                 target="_blank"
                 rel="noopener noreferrer"
                >View Project</a>
                 {item.review===true?<p>Points {item.score}</p>:<p>Points:Yet to be reviewed by teacher</p>}
                 {item.comment!==''?<p>Teacher comment: <span style={{color:'orange',textTranform:'capitalize'}}>{item.comment}</span> </p>:""}
            </div>
        </div>
            )
        }):<p>Loading...</p>}
    </div>
  )
}
