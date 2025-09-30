import React,{useState,useRef} from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import cert from '../assets/cert.jpeg'
export default function Certificates() {
    const certRef = useRef();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [courseName,setCourseName]=useState('')
    const generatePDF = () => {
      const doc = new jsPDF();
    
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
    
      doc.addImage(cert, "JPEG", 0, 0, pageWidth, pageHeight);
    
      doc.setFontSize(30);
      doc.text("Certificate of Completion", pageWidth / 2, pageHeight * 0.35, { align: "center" });
    
      doc.setFontSize(20);
      doc.text(`This certifies that Elias wanyama`, pageWidth / 2, pageHeight * 0.50, { align: "center" });
      doc.text(
        `has successfully completed the ${courseName} course`,
        pageWidth / 2,
        pageHeight * 0.58,
        { align: "center" }
      );
    
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);
    };
      const handleCreateCert =()=>{
        console.log('ht',courseName)
        if(courseName){
          generatePDF()
        }
      }
      const handleChange=(e)=>{
       setCourseName(e.target.value)
      }
  return (
    <div className='CertificatesWrapper'>
         <div className='CertificatesInputWrapper'>
             <input onChange={handleChange} placeholder='Enter Certificate name'/>
             <button onClick={handleCreateCert}>Create</button>
         </div>
         <div className='CertificatesContainer'>
            <div className='Certificates'>
            <iframe
              src={previewUrl}
              title="Certificate Preview"
              width="100%"
              height="100%"
              // style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            />
            </div>
            <div className='Certificates'></div>
            <div className='Certificates'></div>
            <div className='Certificates'></div>
         </div>
    </div>
  )
}
