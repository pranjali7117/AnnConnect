import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-title">AnnaConnect</p>
        <p>
          Email:{" "}
          <a href="mailto:annaconnect@support.org">annaconnect@support.org</a>
        </p>
        <p>Contact No.: xxx-xxx-xxxx</p>
        <p>&copy; 2024 AnnaConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
