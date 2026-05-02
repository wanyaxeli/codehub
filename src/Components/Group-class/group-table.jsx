'use client'

import {Eye} from 'lucide-react'

export function GroupTable({groups,onViewGroup}){
    return(
        <div>
            <table className='w-full'>
                <thead>
                    <tr className='border-b border-slate-700 bg-white'>
                        <th className='table-header text-left text-sm font-semibold text-slate-600 '>
                            Group Name
                        </th>
                        <th className='table-header text-left text-sm font-semibold text-slate-600 '>
                            Description
                        </th>
                        <th className='table-header text-left text-sm font-semibold text-slate-600 '>
                            Students
                        </th>
                        <th className='table-header text-left text-sm font-semibold text-slate-600 '>
                            Status
                        </th>
                        <th className='table-header text-left text-sm font-semibold text-slate-600 '>
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        groups.map((group)=>(
                            <tr
                            key={group.id}
                            className='border-b border-slate-700 hover:bg-slate-500/30 trasition-colors'>
                                <td className='table-header'>
                                    <p className='font-medium '>{group.group_name}</p>
                                </td>
                                <td className='table-header'>
                                    <p className='text-slate-400 text-sm'>{group.description || '-'}</p>
                                </td>
                                <td className='table-header text-center'>
                                    <span className='table-stcount inline-block bg-slate-700 text-slate-200 rounded-full text-sm font-medium'> 
                                        {group.students.length}
                                    </span>
                                </td>
                                <td className='table-header text-center'>
                                    <span className={`table-stcount inline-block rounded-full  text-sm font-medium ${
                                        group.status ==='Active'?'bg-green-500/20 text-green-400':'bg-slate-600/20 text-slate-400'
                                    }`}>
                                       { group.status?group.status:'Inactive'}
                                    </span>
                                </td>
                                <td className='table-header text-center'>
                                    <button className="view-btn"
                                    onClick={()=>onViewGroup(group)}>
                                        <Eye className="icon" />
                                        View
                                    </button>


                                </td>

                                

                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}