import React,{useState,useEffect, useMemo} from 'react'

import GroupSection from '../Components/groups-section'
import GroupDetails from '../Components/group-details'
const ITEMS_PER_PAGE=7
export default function GroupClass() {
  const [selectedGroup,setSelectedGroup]=useState(null)

  const handleviewGroup=(group)=>{
    setSelectedGroup(group)

  }

  const handleBacktogroups=()=>{
    setSelectedGroup(null)
  }
  
  return (
    <div className='GroupClass bg-[#e8e8ee] text-[#06b6d4] rounded-lg min-h-screen'>
     {
      selectedGroup?(
        <GroupDetails group={selectedGroup} onBack={handleBacktogroups}/>
      ):
      (
        <GroupSection onViewGroup={handleviewGroup}/>
      )
     }
    </div>
  )
}
