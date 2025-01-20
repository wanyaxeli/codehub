import React from 'react'

export default function AllTeachers() {
  return (
    <div className='AllTeachersWrapper'>
        <h3>All Teachers</h3>
        <div className='AllTeachersContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Number</th>
                        <th>Country</th>
                        <th>Earning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>2000</td>
                        <td><button>fire</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>2000</td>
                        <td><button>fire</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>2000</td>
                        <td><button>fire</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
