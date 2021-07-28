const contactForm = document.querySelector(".contact-menu");

// Global variables for the contact form
let email = document.getElementById("inputEmail4");
let userName = document.getElementById("inputPassword4");
let problem = document.getElementById("exampleFormControlTextarea1");

// Prevent default function of the button
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('submit clicked');

  // Lets create an object to store the data of the user
  let inputFormData = {
    email: email.value,
    name: userName.value,
    problem: problem.value,
  };

  // console.log(inputFormData);

  // Now we need to pass to the backend the object information to send it to an email, we are using ajax to do so
  // We are using json to send the object because it is the best format to do so
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);

    // This if statement clears the form
    if (xhr.responseText === "success") {
      alert("Email sent");
      email.value = "";
      userName.value = "";
      problem.value = "";
    } else {
      alert("something went wrong");
    }
  };

  // Last thing we want to do is send the data to the backend
  xhr.send(JSON.stringify(inputFormData));

  // This was the last step for our front end javascript, the backend is located on the server.js file and will recieve this information
});
