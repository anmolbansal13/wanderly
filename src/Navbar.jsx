import React, { useState } from "react";
import Popup from "./Popup";


export default function Navbar() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="navbar">
        <i class="fa-solid fa-bars hamicon"></i>
        <h1 className='websiteName'>Wanderly</h1>

        <i class="fa-solid fa-user"></i>
        <img src="" alt="" srcset="" />
        <button className='loginSignupBtn' onClick={() => setPopupOpen(true)}>LOG IN / SIGN UP</button>
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />

    </div>
  )
}
