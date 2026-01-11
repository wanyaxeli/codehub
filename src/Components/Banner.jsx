import React,{useState,useEffect,useContext} from 'react'
import { context } from '../App';
import pic from '../assets/happychild.jpg'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
export default function Banner() {
    const [error, setError] = useState()
    const [token, setToken] = useState('')
    const africanCountries = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
        'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 
        'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 
        'NG', 'RW', 'RE', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 
        'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW'
      ];
    const {value,setValue,CountryCode,setCountryCode}=useContext(context)
    const navigate=useNavigate()
    const handleTOFreeLesson =()=>{
        // if (isValidPhoneNumber(value)) {
        //     console.log('Valid phone number:', value);
        //     navigate('/laptop')
        //   } else {
        //     setError('Invalid phone number');
        //   }
        navigate('/register')
    }
    console.log('va',value)
     // Handle phone number change
  const handlePhoneChange = (phone) => {
    setError('')
    if (phone) {
      const parsed = parsePhoneNumber(phone, "KE"); // Replace "KE" with default country code if needed
      const countryCode = parsed?.countryCallingCode ? `+${parsed.countryCallingCode}` : "";
      const phoneNumber = parsed?.nationalNumber || "";
      const number=countryCode + phoneNumber
      setValue(number)
      setCountryCode(countryCode)
      console.log('phone',number,'code',countryCode)
    //   setValue({ countryCode, phoneNumber }); // Update state with both values
    } else {
    //   setValue({ countryCode: null, phoneNumber: null }); // Handle empty input
    }
  };
    const customStyle = {
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingLeft: "10px",
      };
      async function getToken(){
        try{
            const token= JSON.parse(localStorage.getItem('token')) // No need to await
            if (token){
                setToken(token);
            }
        } catch(error) {
            console.log(error);
        }
    }
   
  // useEffect(()=>{
  // getToken()
  // },[])
  return (
    <div className='bannerWrapper'
    // style={{backgroundImage:`url(${pic})`}}
    >
        <div className='bannerContainer'>
          <div className='bannerDetailsWrapper'>
            <div className='sharedStyles introWrapper'>
              <span className='IConWrapper'><i className="fa fa-bolt" aria-hidden="true"></i></span>
              <p>Welcome to codingscholar.com online coding school for kids</p>
            </div>
              <div className='Aboutcodehub'>
              <p>Let your kid start learning from <br/> the world's best coding institution</p>
              </div>
              <ul>
                  <li><span className='IConWrapper engage'><i className="fa fa-rss" aria-hidden="true"></i></span> Engaging live video lesson</li>
                  <li><span className='IConWrapper learn'><i className="fa fa-users" aria-hidden="true"></i></span> Learn from top-rated ,world class instructors</li>
              </ul>
              {error && <p className='errorText'>{error}</p>}
              <div className='inputWrapper'>
                  {/* <div className='countCodeHolder'></div>
                  <input type="text" /> */}
                  {/* <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  countries={africanCountries}
                  defaultCountry="KE"
                  style={customStyle}
                  onChange={handlePhoneChange}/> */}
                  <button onClick={handleTOFreeLesson} >Try Free Lesson</button>
              </div>
              <div className='sharedStyles kidsContainer'>
                  <span className='IConWrapper'><i className="fa fa-bolt" aria-hidden="true"></i></span>
                  <p>Join 1000+ kids who took a lesson in the last 24 hours</p>
              </div>
              <div className='sharedStyles numberOfStudentTaking'>
                  <span  className='IconContainer'>
                  <i className=" fa fa-graduation-cap" aria-hidden="true"></i>
                  </span>
                <div className='acitiveStudentsWrapper'>
                  <h3>9.5k +</h3>
                  <p>Total active students taking<br/> coding courses</p>
                </div>
              </div>
         </div>
        <div className='bannerImgWrapper'>
            <img src={pic} alt="codingscholar"/>
            <div className='bannnerAnimationWrapper'>
                <div className='InnerbannnerAnimationWrapper'>
                <div className='bannerAnimationIcon'>
                <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className='bannerAnimationDetailsWRapper'>
                <h3>150k +</h3>
                <p>Assisted students</p>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div className='smallDeviceBanner'>
        <img loading="lazy" src={pic} alt="codingscholar"/>
        <div className='smallDeviceBannerCover'>
           <div className='smallDeviceBannerContainer'>
              <div className='smallDeviceBannerContainerHolder'>
                  <div className='smallDeviceBannerContainerHeader'>
                    <p>Welcome to codingScholar.com online coding school for kids</p>
                  </div>
                  <div className='smallDeviceBannerContainerAboutcodehub'>
                  <p>Let your kid start learning from  the world's best coding institution</p>
                  </div>
                  <ul>
                    <li>Engaging live video lesson</li>
                    <li>Learn from top-rated ,world class instructors</li>
                </ul>
                <div className='smallDeviceBannerContainerAboutcodehub'>
                    <p>Join 1000+ kids who took a lesson in the last 24 hours</p>
                </div>
                <div className='inputWrapper smallDeviceBannerContainerBtnHolder'>
                    <button onClick={handleTOFreeLesson} >Try Free Lesson</button>
                </div>
              </div>
           </div>
        </div>
        </div>
    </div>
  )
}
