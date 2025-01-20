import React from 'react'

export default function AddStudents() {
  return (
    <div className='AddStudentsWrapper'>
        <h3>Add Students</h3>
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                <input type='text' placeholder='Full name'/><br/>
                <input type='email' placeholder='Email'/><br/>
                <input type='text' placeholder='Country'/><br/>
                <input type='text' placeholder='Phone Number'/><br/>
                <input type='text' placeholder='Grade'/><br/>
                <input type='password' placeholder='Password'/><br/>
                <input type='password' placeholder='Cornfirm Password'/>
                <div className='AddBtnWrapper'>
                    <button>Add Student</button>
                </div>
            </div>
        </div>
    </div>
  )
}
