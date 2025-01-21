import React from 'react'
import ReactDOM from 'react-dom'; // Correct import
export default function SubmitProjectModal({openSubmitModal,setopenSubmitModal}) {
    const handleCloseModal=()=>{
        setopenSubmitModal(false)
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
                    <input type='text' placeHolder='Link'/><br/>
                    <button>submit</button>
                 </div>
            </div>
        </div>
      </div>,
      document.getElementById('modal') // Ensure this matches your index.html
    );
  }
