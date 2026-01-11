import { useEffect, useState } from "react";
// import { Connect } from "vite";

export default function CookieConsent(){
    const [show,setShow]=useState<Boolean>(false)

    useEffect(()=>{
        const consent=localStorage.getItem('cookie_consent')
        if(!consent){
            setShow(true)
        }
    },[])

    const declineCookies=()=>{
      console.log('the cookies declined...')
       const declining= localStorage.setItem('cookie_consent','declined')
        console.log('declined from localstorage ;;',declining)
        setShow(false)
    }

    const acceptCookies=()=>{
        localStorage.setItem('cookie_consent', 'accepted')
        setShow(true)
    }

    if(!show) return null

    return(
       <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-gray-700">
          🍪 <strong>Cookies & Privacy</strong><br />
          CodingScholar uses cookies to improve learning experience, track
          progress, and keep students safe. Some information may be collected
          for educational and security purposes. By continuing, you agree to
          our use of cookies.
        </p>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  
    )
}