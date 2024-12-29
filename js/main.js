// variable of the url
const url = "./data/data.json";

// call showElements when widow scroll
window.addEventListener('scroll', showElements);
// call getdata from json
getData(url, "projects");
getData(url, "services");

// function to get data
function getData(url, key) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true && data.error === false) {
        if (key === "projects") {
          myProjects = data.projects;
          if (myProjects) {
            let projectsWithAngular = document.getElementById("projectsWithAngular");
            let projectsWithJavaScript = document.getElementById("projectsWithJavaScript");
            let projectsWithBasics = document.getElementById("projectsWithBasics");
            myProjects.forEach((project) => {
              let projectCard = `
                    <div class="col-12 col-lg-4">
                      <div class="card mb-3 mb-lg-4">
                        <img src="${project.image}" class="card-img-top" alt="${project.title}" loading="lazy">
                        <div class="card-body">
                          <h5 class="card-title fw-semibold text-center">${project.title}</h5>
                          <p class="card-text text-secondary lh-sm">${project.details}</p>
                          <div class="d-flex justify-content-center align-items-center flex-column flex-lg-row gap-2">
                            <a href="${project.code}" class="btn text-capitalize" target="_blank">Github</a>
                            <a href="${project.demo}" class="btn text-capitalize" target="_blank">preview</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                `;
              if (project.category === "Angular") {
                projectsWithAngular.innerHTML += projectCard;
              } else if (project.category === "Java Script") {
                projectsWithJavaScript.innerHTML += projectCard;
              } else if (project.category === "Basics") {
                projectsWithBasics.innerHTML += projectCard;
              }
            })
          }
        } else if (key === "services") {
          mySkills = data.services;
          if (mySkills) {
            const skillsContainer = document.getElementById("service-list-content");
            for (let i = 0; i < mySkills.length; i++) {
              const element = mySkills[i];
              let skillItem = `
                        <li class="d-flex align-items-start">
                              <p class="me-3 p-0">
                                  <i class="fa-solid fa-check"></i>
                              </p>
                              <p>
                                  ${element.skill}
                              </p>
                          </li>
                      `;
              skillsContainer.innerHTML += skillItem
            }
          }
        } else {
          swal.fire({
            title: data.message ? data.message : "Something is wrong",
            type: 'Error',
          })
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// function send message with emailjs
function sendMessage(event) {
  event.preventDefault();
  // variables for the form values 
  let clientEmail = document.getElementById("clientEmail").value;
  let fClientName = document.getElementById("fClientName").value;
  let lClientName = document.getElementById("lClientName").value;
  let clientMessage = document.getElementById("clientMessage").value;

  // Select the error message
  let errorMessage = document.getElementById("errorAlert");

  // Patterns
  let patternString = /^[a-zA-Z]+$/;
  let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Client data
  let client = {
    from_name: fClientName + " " + lClientName,
    from_mail: clientEmail,
    message: clientMessage,
  };

  // Initialize isValid
  let isValid = true;

  // Validation
  if (clientEmail === "" || fClientName === "" || lClientName === "" || clientMessage === "") {
    errorMessage.classList.remove("d-none");
    errorMessage.innerHTML = "Please, fill all the fields.";
    isValid = false;
  } else if (!patternString.test(fClientName)) {
    errorMessage.classList.remove("d-none");
    errorMessage.innerHTML = "Enter first name as a valid string.";
    isValid = false;
  } else if (!patternString.test(lClientName)) {
    errorMessage.classList.remove("d-none");
    errorMessage.innerHTML = "Enter last name as a valid string.";
    isValid = false;
  } else if (!patternEmail.test(clientEmail)) {
    errorMessage.classList.remove("d-none");
    errorMessage.innerHTML = "Enter a valid email.";
    isValid = false;
  } else if (clientMessage.length < 10 && patternString.test(clientMessage)) {
    errorMessage.classList.remove("d-none");
    errorMessage.innerHTML = "Enter a message with at least 10 characters.";
    isValid = false;
  } else {
    errorMessage.classList.add("d-none");
    errorMessage.innerHTML = "";
    isValid = true;
  }

  // Send data with emailjs if data is valid
  if (isValid) {
    emailjs.init({ publicKey: "Ykreg4loTWs4uThbC" });
    emailjs
      .send("service_zfys2qp", "template_yuajnzi", client)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
  }
}

// funtion showElements when widow scroll
function showElements() {
  const elements = document.querySelectorAll('.items');
  elements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}
