import React, { useState, useRef, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaWhatsapp, FaTelegramPlane, FaTwitter, FaFacebook } from "react-icons/fa";
import "./Share.css";

export default function Share({ title, url }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const encodedText = encodeURIComponent(`Check out this recipe: ${title}`);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  /* 🔥 Close on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* 🔥 Close on scroll */
  useEffect(() => {
    const closePopup = () => setOpen(false);
    if (open) window.addEventListener("scroll", closePopup);
    return () => window.removeEventListener("scroll", closePopup);
  }, [open]);

  /* 🔥 CLOSE POPUP before going to share link */
  const handleShareClick = (link) => {
    setOpen(false);               // close immediately
    setTimeout(() => {
      window.open(link, "_blank");
    }, 50);                       // small delay to allow popup close
  };

  return (
    <div className="share-container">
      <button className="share-btn" onClick={() => setOpen(!open)}>
        <FaShareAlt />
      </button>

      {open && (
        <div className="share-popup" ref={popupRef}>
          <span onClick={() => handleShareClick(shareLinks.whatsapp)}>
            <FaWhatsapp className="icon whatsapp" />
          </span>

          <span onClick={() => handleShareClick(shareLinks.telegram)}>
            <FaTelegramPlane className="icon telegram" />
          </span>

          <span onClick={() => handleShareClick(shareLinks.twitter)}>
            <FaTwitter className="icon twitter" />
          </span>

          <span onClick={() => handleShareClick(shareLinks.facebook)}>
            <FaFacebook className="icon facebook" />
          </span>
        </div>
      )}
    </div>
  );
}
