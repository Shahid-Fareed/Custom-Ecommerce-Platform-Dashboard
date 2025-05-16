// import React, { useState } from 'react';
// import Popup from './Popup';

// const OpenPopup = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleOpenPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1>Popup Example</h1>
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         onClick={handleOpenPopup}
//       >
//         Open Popup
//       </button>
//       <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
//         <h2>This is a Popup</h2>
//         <p>Content goes here...</p>
//       </Popup>
//     </div>
//   );
// };

// export default OpenPopup;

import React, { useState } from "react";
import Popup from "./Popup";

const OpenPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLoaderButtonClick = () => {
    // Simulate loading for 2 seconds (you can replace this with actual async logic)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1>Popup Example</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleOpenPopup}
      >
        Open Popup{" "}
      </button>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <h2>This is a Popup</h2>
            <p>Content goes here...</p>
            <button
              className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleLoaderButtonClick}
            >
              Close
            </button>
          </>
        )}
      </Popup>
    </div>
  );
};

export default OpenPopup;
