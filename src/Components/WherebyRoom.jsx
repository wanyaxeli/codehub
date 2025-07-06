import React from 'react';
import { useRoomConnection } from '@whereby.com/browser-sdk/react';

export default function WherebyRoom({ roomUrl }) {
  const url = roomUrl
  // 🛡️ Before anything: prevent hook usage on invalid URL
  const isValidRoomUrl = url && url.startsWith('https://');

  // ⛔ Return early to avoid calling the hook with an invalid value
  // if (!isValidRoomUrl) {
  //   return <p>Loading room or invalid URL...</p>;
  // }

  // ✅ Only executed when `roomUrl` is valid — no conditional hook call
  // const {
  //   state,
  //   actions,
  //   components: { VideoTile },
  //   localParticipant,
  //   remoteParticipants,
  // } = useRoomConnection({
  //   url,
  //   localMediaOptions: { audio: true, video: true },
  // });

  return (
    <div style={{ padding: 20 }}>
      <iframe
      src={url}
      allow="camera; microphone; fullscreen; speaker; display-capture"
      style={{
        width: '100%',
        height: '600px',
        border: '0',
        borderRadius: '8px',
      }}
      allowFullScreen
      title="Whereby Video Room"
    />
      {/* <h2>Video Call (Status: {state.connectionState})</h2>

      <div style={{ display: 'flex', gap: 10 }}>
        {localParticipant && (
          <div>
            <p>You</p>
            <VideoTile participant={localParticipant} />
          </div>
        )}
        {remoteParticipants.map((p) => (
          <div key={p.id}>
            <p>{p.name || 'Guest'}</p>
            <VideoTile participant={p} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={actions.toggleCamera}>
          {localParticipant?.camera?.enabled ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
        <button onClick={actions.toggleMic} style={{ marginLeft: 10 }}>
          {localParticipant?.microphone?.enabled ? 'Mute' : 'Unmute'}
        </button>
        <button onClick={actions.leaveRoom} style={{ marginLeft: 10 }}>
          Leave Room
        </button>
      </div> */}
    </div>
  );
}
