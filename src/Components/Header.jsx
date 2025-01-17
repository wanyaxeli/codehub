import React,{useState} from 'react'
import pic from '../assets/codeHubLogo.png'
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
  return (
    <div className='headerWrapper'>
        <div className='headerContainer'>
            <div className='leftHeader'>
                {/* //logo */}
                <div className='logoWRapper'>
                    <img src={pic}/>
                </div>
                <select value={selectedValue} onChange={handleChange}>
                <option value="" disabled>
                 courses
                </option>
                <option value="option1">python for kids</option>
                <option value="option2">web development</option>
                <option value="option3">scratch programming</option>
                </select>
            </div>
            <div className='rightHeader'>
                <button>login</button>
                <button>join class</button>
                <button>book free class</button>
            </div>
        </div>
    </div>
  )
}
