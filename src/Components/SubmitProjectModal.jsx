import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import axios from 'axios';
export default function SubmitProjectModal({openSubmitModal,bookingId,ClassName,setopenSubmitModal}) {
    const [project,setProject]=useState('')
    const handleCloseModal=()=>{
        setopenSubmitModal(false)
    }
    const handleChange=(e)=>{
        setProject(e.target.value)
    }
    const handleSubmit =()=>{
        if(ClassName && project){
            const url = `${API}/Project/`
            const data={project:project,className:ClassName}
            axios.post(url,data,{withCredentials:true})
            .then(res=>{
                console.log(res.data)
                setProject('')
                alert(res.data)
                setopenSubmitModal(false)
            })
            .catch(error=>console.log(error))
        }else if(bookingId && project){
            const url = `${API}/TrialProject/`
            const data={project:project,bookingId:bookingId}
            axios.post(url,data,{withCredentials:true})
            .then(res=>{
                console.log(res.data)
                alert(res.data)
                setProject('')
                setopenSubmitModal(false)
            })
            .catch(error=>console.log(error)) 
        }
    }
    console.log('booktwo',bookingId,project)
   
    return ReactDOM.createPortal(
      <div className="SubmitWrapper">
        <div className='submitInnerWrapper'>
            <div className='submitContainer'>
                <div className='closeBnt'>
                    <div onClick={handleCloseModal} className='closeBtnWrapper'>
                        <span>&times;</span>
                    </div>
                </div>
                <div className='submitinputWrapper'>
                    <input value={project} onChange={handleChange} type='text' placeholder='Link'/><br/>
                    <button onClick={handleSubmit}>submit</button>
                 </div>
            </div>
        </div>
      </div>,
      document.getElementById('modal') // Ensure this matches your index.html
    );
  }
