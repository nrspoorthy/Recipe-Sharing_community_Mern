import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaWhatsapp, FaTelegramPlane, FaTwitter, FaFacebook } from "react-icons/fa";
import "./Share.css";

export default function Share({ title, url }) {
  const [open, setOpen] = useState(false);

  const encodedText = encodeURIComponent(`Check out this recipe: ${title}`);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return (
    <div className="share-container">
      <button className="share-btn" onClick={() => setOpen(!open)}>
        <FaShareAlt /> 
      </button>

      {open && (
        <div className="share-popup">
          <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer">
            <FaWhatsapp className="icon whatsapp" /> 
          </a>
          <a href={shareLinks.telegram} target="_blank" rel="noreferrer">
            <FaTelegramPlane className="icon telegram" /> 
          </a>
          <a href={shareLinks.twitter} target="_blank" rel="noreferrer">
            <FaTwitter className="icon twitter" /> 
          </a>
          <a href={shareLinks.facebook} target="_blank" rel="noreferrer">
            <FaFacebook className="icon facebook" /> 
          </a>
        </div>
      )}
    </div>
  );
}
