import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
export default function Dashboard() {
  return (
    <div className='DashboardWrapper'>
        <Header/>
      <div className='dashBoardContainer '>
        <aside>
          <ul>
            <li className='active'>dashboard</li>
            <li>dashboard</li>
            <li>dashboard</li>
            <li>dashboard</li>
            <li>dashboard</li>
          </ul>
        </aside>
        <main>
           <Outlet/>
        </main>
      </div>
    </div>
  )
}
