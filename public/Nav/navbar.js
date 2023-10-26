// export const logout = () => {
//     signOut(authService)
//       .then(() => {
//         // Sign-out successful.
//         localStorage.clear();
//         console.log("로그아웃 성공");
//         // User is not logged in, so hide myPage and logout buttons
//         document.getElementById("myPageBtn").style.display = "none";
//         document.getElementById("logoutBtn").style.display = "none";

//         // Show login and signup buttons
//         document.getElementById("loginBtn").style.display = "block";
//         document.getElementById("signupBtn").style.display = "block";
//       })
//       .catch((error) => {
//         // An error happened.
//         console.log("error:", error);
//       });
//   };

function logout() {
    // Clear the loggedUser value from local storage
    localStorage.removeItem("loggedUser");
  
    // Redirect to the login page or any other desired page
    window.location.href = "/user/login.html";
  }