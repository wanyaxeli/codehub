import React, { useState } from 'react';
import jsPDF from "jspdf";
import cert from '../assets/cert.png';

export default function Certificates() {
  const [courseName, setCourseName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  function monthsInString(month) {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return 'Invalid month'; 
    }
  }
  
  const generatePDF = () => {
    const date= new Date()
    const day=String(date.getDate()).padStart(2, '0');
    const year=date.getFullYear()
    const month=date.getMonth() + 1
    const monthName=monthsInString(month)
    const certificateId=`CS-${courseName} -${year}-${day}`
    const fulldate=`${monthName} ${day},${year}`
 
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [768, 1087], // match your image resolution
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // background
    doc.addImage(cert, "JPG", 0, 0, pageWidth, pageHeight);

    const centerX = pageWidth / 2;
    const Datecenter = pageWidth / 1.8;
    const Certcenter = pageWidth / 1.6;
    // Title
    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(32);
    // doc.text("CERTIFICATE OF COMPLETION", centerX, pageHeight * 0.30, { align: "center" });

    // Recipient name
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 153, 204); // teal-blue like your template
    doc.setFontSize(54);
    doc.text("Elias Wanyama", centerX, pageHeight * 0.50, { align: "center" });

    // Course line
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 153, 204);
    doc.setFontSize(40);
    doc.text(
      `${courseName}`,
      centerX,
      pageHeight * 0.35,
      { align: "center" }
    );

    // Date
    doc.setFontSize(18);
    doc.text(fulldate, Datecenter, pageHeight * 0.66, { align: "center" });
    //certificate id

    doc.setFontSize(18);
    doc.text(certificateId, Certcenter, pageHeight * 0.91, { align: "center" });
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  };

  return (
    <div className="CertificatesWrapper">
      <div className="CertificatesInputWrapper">
        <input
          onChange={(e) => setCourseName(e.target.value.toUpperCase())}
          placeholder="Enter Course Name"
        />
        <button onClick={generatePDF}>Create</button>
      </div>

      <div className="CertificatesContainer">
        <div className='Certificates'>
        {previewUrl && (
          <iframe
            src={previewUrl}
            title="Certificate Preview"
            width="100%"
            height="100%"
            // style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        )}
        </div>
      </div>
    </div>
  );
}
