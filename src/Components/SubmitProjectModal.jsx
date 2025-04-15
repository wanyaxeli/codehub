import React,{useState} from 'react'
import ReactDOM from 'react-dom'; // Correct import
export default function SubmitProjectModal({openSubmitModal,SubmitProeject,project,setProject,setopenSubmitModal}) {
    // const [project,setProject]=useState('')
    const handleCloseModal=()=>{
        setopenSubmitModal(false)
    }
    const handleChange=(e)=>{
        setProject(e.target.value)
    }
    const handleSubmit =()=>{
        SubmitProeject()
    }
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
                    <input value={project} onChange={handleChange} type='text' placeHolder='Link'/><br/>
                    <button onClick={handleSubmit}>submit</button>
                 </div>
            </div>
        </div>
      </div>,
      document.getElementById('modal') // Ensure this matches your index.html
    );
  }
