function logout() {
    // Clear the loggedUser value from local storage
    localStorage.removeItem("loggedUser");
  
    // Redirect to the login page or any other desired page
    window.location.href = "/user/login.html";
  }