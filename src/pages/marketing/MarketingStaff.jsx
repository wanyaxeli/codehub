import Header from '@/Components/Header'
import React from 'react'
import { useLocation,useNavigate ,Outlet} from 'react-router-dom'
export default function MarketingStaff() {
    const handleToTrial =()=>{
   navigate('/MarketerDashboard')
    }
    const handleToDashboard =()=>{
    
    }
    const navigate=useNavigate()
    const location=useLocation()
    const {pathname}=location
    console.log('ppp',pathname)
    const dashboardLinks=['/marketingStaff','/MarketerDashboard']
    const TrialLinks=[]
  return (
    <div>
        <Header/>
        <div className='marketingWrapper'>
          <aside>
            <ul>
                <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
                <li className={TrialLinks.includes(pathname)?'active':""}  >Trials</li>
            </ul>
          </aside>
          <main>
             <Outlet/>
          </main>
        </div>
    </div>
  )
}
