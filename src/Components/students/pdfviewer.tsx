'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';



pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
}

export function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  console.log('pdfurl', pdfUrl)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prev) => Math.min(prev + 1, numPages));
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="flex flex-col h-[90vh] top-0 sticky bg-white rounded-lg shadow-lg ">
      {/* Header */}
      <div className="!p-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900">NOTES</h3>
          {/* <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 !px-3 !py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </a> */}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="!px-3 !py-1 text-sm bg-slate-200 hover:bg-slate-300 text-slate-600 rounded transition"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="text-sm text-slate-600 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="!px-3 !py-1 text-sm text-slate-600 bg-slate-200 hover:bg-slate-300 rounded transition"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-slate-100  !p-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-slate-600 text-center !py-8">
              Loading PDF...
            </div>
          }
          error={
            <div className="text-red-600 text-center !py-8">
              Failed to load PDF. Please try again.
            </div>
          }
        >
          {/* <div className="bg-white shadow-lg">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </div> */}
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={700} // adjust for your layout
            />
          ))}
        </Document>
      </div>

      {/* Footer Navigation */}
      {/* <div className="!p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="flex items-center gap-2 !px-4 !py-2 text-slate-700 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="text-sm text-slate-600">
            Page{' '}
            <input
              type="number"
              min="1"
              max={numPages || 1}
              value={pageNumber}
              onChange={(e) =>
                setPageNumber(
                  Math.max(1, Math.min(parseInt(e.target.value) || 1, numPages || 1))
                )
              }
              className="w-12 !px-2 !py-1 border border-slate-300 rounded text-center"
              aria-label="Page number"
            />{' '}
            of {numPages || '?'}
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="flex items-center gap-2 !px-4 !text-slate-700 !py-2 !bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div> */}
    </div>
  );
}
