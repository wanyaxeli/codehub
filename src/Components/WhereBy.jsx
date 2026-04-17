export default function WherebyIframe({ roomUrl }) {
   // Append `showLogo=false` if it's not already in the URL
   const formattedUrl = roomUrl.includes('?')
   ? `${roomUrl}&showLogo=false`
   : `${roomUrl}?showLogo=false`;
  return (
    <div className="wherebyWrapper">
      <iframe
        src={formattedUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ width: '97%', height: '87vh',marginTop:'8px', border: '0', borderRadius: '12px' }}
        title="Codingschalor Meeting"
      />
    </div>
  );
}
