import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MarketerDashboard() {
  const navigate=useNavigate()
  const handleBlogManagement=()=>{
      navigate('/marketingStaff/blogs')
    }
  return (
    <div className='BlogManagerWrapper'>
        <div className='BlogManagerContainer' onClick={handleBlogManagement} >
            <p>Blog management</p>
        </div>
    </div>
  )
}
