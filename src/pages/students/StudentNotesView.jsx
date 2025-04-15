import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function StudentNotesView() {
  const [notes, setNotes] = useState("");
  const location = useLocation();
  console.log(location)
  useEffect(() => {
    if (location.state) {
      setNotes(location.state);
    }
  }, [location]); // Add location as a dependency
  console.log('notes',notes)
  return (
    <div className="NotesViewerWrapper">
      {notes ? (
        <iframe
          src={`https://res.cloudinary.com/dbxsncq5r/${notes}`}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
      ) : (
        <p>Loading notes...</p>
      )}
    </div>
  );
}