async function login(){

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let error = document.getElementById("error");

  error.innerText = "";

  if(!username || !password){
    error.innerText = "⚠ Please enter all fields";
    return;
  }

  try {
    let res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if(!res.ok){
      error.innerText = "❌ Invalid username or password";
      return;
    }

    let user = await res.json();

    console.log("User:", user);

    // ✅ STORE USER
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // 🔐 ROLE BASED REDIRECT
    if(user.role === "ADMIN"){
      window.location.href = "admin.html";
    } 
    else if(user.role === "STUDENT"){
      window.location.href = "student.html";
    } 
    else {
      error.innerText = "⚠ Unknown role";
    }

  } catch(err){
    console.error(err);
    error.innerText = "⚠ Server error";
  }
}


// ✅ ENTER KEY SUPPORT
function handleEnter(e){
  if(e.key === "Enter"){
    login();
  }
}