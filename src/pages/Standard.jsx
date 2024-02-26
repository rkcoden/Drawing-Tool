import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

//import Datepicker from '../components/Datepicker';

import pdf from '../images/pdf.jpg'
function Standard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* PDF Icon */}
            {/* If the PDF icon is in the public directory */}
            <img src={pdf} alt="PDF Icon" />
            {/* If the PDF icon is in the src directory, use the imported variable */}
            {/* <img src={pdfIcon} alt="PDF Icon" /> */}
          </div>
        </main>

        

      </div>
    </div>
  );
}

export default Standard;