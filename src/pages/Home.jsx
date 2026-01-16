import React, { useEffect } from 'react'
import Banner from '../Components/Banner'
import Benefit from '../Components/Benefit'
import Courses from '../Components/Courses'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie"

// import CookieConsent from '../Components/cookie-consent'
import ParentsComments from '../Components/ParentsComments'
import { Helmet } from 'react-helmet-async';
export default function Home() {

  useEffect(()=>{
    Cookies.remove("codingscholarCookieConsent")
  })

  return (
   <div className='HomeWrapper'>
    <Helmet>
        <title>Home - codingscholar</title>
        <meta name="description" content="Welcome to codingscholar -Let your kid learn coding with experts!" />
        <meta name="keywords" content="coding,coding for kids, education, online classes,online classes for kids, programming for kids, programming" />
        <link rel="canonical" href="https://www.codingscholar.com/" />
      </Helmet>
    <Header/>
    {/* <CookieConsent/> */}
    <Banner/>
    <Courses/>
    <Benefit/>
    <ParentsComments/>
    <Footer/>
   <CookieConsent
  location="bottom"
  buttonText="Accept"
  declineButtonText="Decline"
  cookieName="codingscholarCookieConsent"
  style={{ background: "#455053" }}
  buttonStyle={{ color: "#f1efef", fontSize: "13px",backgroundColor:"rgb(0,151,178)" }}
  declineButtonStyle={{ color: "#fff", fontSize: "13px", background: "#555" }}
  enableDeclineButton
  // expires={150}
  debug={true}
  onAccept={() => {
    console.log("User accepted cookies");
    // You can do other actions here, like analytics opt-in
  }}
  onDecline={() => {
    console.log("User declined cookies");
    // You can do other actions here, like disable tracking
  }}
>
  <p className="text-sm text-gray-200">
    <p className='cookieheader'>🍪 <strong>Cookies & Privacy</strong><br /> </p>
    CodingScholar uses cookies to improve learning experience, track
    progress, and keep students safe. <br/>Some information may be collected
    for educational and security purposes. By continuing, you agree to
    our use of cookies.
  </p>
</CookieConsent>

    {/* <CookieConsent/> */}
   </div>
  )
}
