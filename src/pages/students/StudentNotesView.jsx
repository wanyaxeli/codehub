import { PDFViewer } from "@/Components/students/pdfviewer";
import { VideoPlayer } from "@/Components/students/vedioplayer";
// import { resourceLimits } from "node:worker_threads";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AssignmentsSidebar } from "@/Components/students/project-sidebar";
export default function StudentNotesView() {
  const [notes, setNotes] = useState("");
  const [videoUrl,setVideoUrl]=useState()
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const resources=location.state
      console.log('lesson resources..',resources)
      setNotes(resources.notesurl);
      setVideoUrl(resources.videourl)
    }
  }, [location]); // Add location as a dependency]
  // const vedioUrl='https://codingschoolbucket.s3.amazonaws.com/videos/whereby-53-spider-man-143b4d384a5be9-b1ae-4aee-8622-34fcd4f61bc4-09-Apr-2026-1734-GMT_2B3.webm'

  console.log('notesm...', notes)
  return (
    <div>
      {notes ? (
        <div className="flex !px-3  w-full bg-gray-200 gap-1 ">
        {/* <div className=" flex-col  w-170 !space-y-3  "> */}
          <div className=" flex-col  w-full !space-y-3  ">
          <section>
            <VideoPlayer videoUrl={videoUrl} title="lesson vedio"/>
          </section>
          <section className="h-screen">
            <PDFViewer 
            pdfUrl={`https://res.cloudinary.com/dbxsncq5r/${notes}`}
            title=""/>
          </section>
        </div>
        <div className="  top-0 sticky ">
  {/* commented side bar */}
        {/* <AssignmentsSidebar /> */}
        </div>
        </div>
      ) : (
        <p>Loading notes...</p>
      )}
    </div>
  );
}