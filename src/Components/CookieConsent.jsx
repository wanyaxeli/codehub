import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CookieConsent from "react-cookie-consent";
const CookieConsentComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie_consent', 'true', { expires: 365 });
    setIsVisible(false);
    // ✅ You can enable analytics or tracking scripts here
  };

  const declineCookies = () => {
    Cookies.set('cookie_consent', 'false', { expires: 365 });
    setIsVisible(false);
    // ✅ Prevent loading tracking scripts here
  };

  if (!isVisible) return null;

  return (
    <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        disableStyles={true}
        cookieName="cookie_consent"
        // style={{ background: "#222", color: "#fff" }}
        containerClasses="cookie-wrapper"
        buttonStyle={{ background: "#fff", color: "#000", borderRadius: "4px" }}
        declineButtonStyle={{ background: "#888", color: "#fff", borderRadius: "4px" }}
        onAccept={() => {
          console.log("Cookies accepted");
          // load analytics here if needed
        }}
        onDecline={() => {
          console.log("Cookies declined");
        }}
      >
        We use cookies to improve your experience.{" "}
        <a href="/cookie-policy" style={{ color: "#00f" }}>Learn more</a>
      </CookieConsent>
  );
};

export default CookieConsentComponent;
