import React from 'react'
import ReactDOM from 'react-dom'; // Correct import
export default function NoLaptopModal() {
  return  ReactDOM.createPortal(
    <div className='NoLapTopModal'>
        <div className='NoLapTopModalContainer'>
            <div className='NoLapTopModalHolder' ></div>
        </div>
    </div>,
    document.getElementById('laptop')
  )
}
