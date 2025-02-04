import React from 'react'
import pic from '../../assets/student.jpg'
export default function Stdent() {
  return (
    <div className='StudentWrapper'>
        <div className='studentDetailsWrapper'>
            <img src={pic}/>
            <div>
                <p>Elais wanyama</p>
            </div>
        </div>
    </div>
  )
}
