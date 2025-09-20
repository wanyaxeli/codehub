import React,{useState,useRef} from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default function Certificates() {
    const certRef = useRef();
    const [pdfUrl, setPdfUrl] = useState(null);
    const generatePDF = () => {
        html2canvas(certRef.current, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("landscape", "pt", "a4");
    
          // Add the captured image to PDF
          pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
    
          // Generate blob URL
          const pdfBlob = pdf.output("blob");
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
        });
      };
  return (
    <div className='CertificatesWrapper'>
         <div className='CertificatesInputWrapper'>
             <input placeholder='Enter Certificate name'/>
             <button>Create</button>
         </div>
         <div className='CertificatesContainer'>
            <div className='Certificates'></div>
            <div className='Certificates'></div>
            <div className='Certificates'></div>
            <div className='Certificates'></div>
         </div>
    </div>
  )
}
