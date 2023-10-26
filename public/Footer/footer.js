function createFooter() {
    const footer = document.createElement("div");
    footer.id = "footer";
  
    const footerContainer = document.createElement("div");
    footerContainer.className = "footer-container";
  
    const copyright = document.createElement("div");
    copyright.className = "copyright";
    copyright.innerHTML = `
      <p>Busan, Republic of Korea</p>
      <p>ⓒ 2024 Busan-Expo2030-Association all rights reserved.</p>
      <p>Representative: Busan-Expo2030</p>
    `;
  
    const footerLogo = document.createElement("div");
    footerLogo.className = "footer-logo";
    const logoImage = document.createElement("img");
    logoImage.src = "../footer/footer_logo.png";
    logoImage.alt = "footer";
    logoImage.width = "60";
    footerLogo.appendChild(logoImage);
  
    footerContainer.appendChild(copyright);
    footerContainer.appendChild(footerLogo);
    footer.appendChild(footerContainer);
  
    return footer;
  }
  
  // Append the footer to the body element
  document.body.appendChild(createFooter());
