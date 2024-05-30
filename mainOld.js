//const { doc } = require("prettier");
window.addEventListener("DOMContentLoaded", displayUserInfo);


let answerDisplay,
  correctAnswer,
  userEmail,
  loginEmail,
  loginPassword,
 // profileMsg,
  username,
 // levelDisplay,
  userLevel;

let selectionArr = [];
let randomSaved = {};
let userAcct = { Level: 1 };
const contentParam = getQueryParam("content");

const imgMatch = [
  { name: "Omi", image: "water.jpg" },
  { name: "Ero Ibanisoro", image: "telephone.png" },
  { name: "Baba", image: "father.jpg" },
  { name: "Omo", image: "child.jpg" },
  { name: "Iya", image: "mother.jpg" },
];

const imageName = ["Baba", "Omi", "Ero Ibanisoro", "Iya", "Omo"];

//selecting elements from HTML
let profileName = document.querySelector("#Name");
let age = document.querySelector("#Age");
let email = document.querySelector("#Email");
let password = document.querySelector("#Password");
const next = document.querySelector("#next_button");
const check = document.querySelector("#check_button");
const optionsLabels = document.querySelectorAll(".answer");
const radioButtons = document.querySelectorAll("input[name='answer']");
const quizQues = document.querySelector(".quiz_question");
const loginButton = document.querySelector("#login_button");
const signupButton = document.querySelector("#signup_button");
const answerCheck = document.querySelector("#answer_check");
const signupForm = document.querySelector("#signup_form");
const loginForm = document.querySelector("#login_form_div");
const gameProgress = document.querySelector("#game_progress");
const selectionButtons = document.querySelectorAll("#select_activity");
const activityDiv = document.querySelector("#activity_selection_div");
const quizContent = document.querySelector("#quiz_content");
const correction = document.querySelector("#correct_answer");
const grammarExercise = document.querySelector(".grammar_exercise_container");
const imgWrapper = document.querySelector(".img_wrapper");
const nameWrapper = document.querySelector(".name_wrapper");
const loginSubmit = document.querySelector("#login_form");
//const profile = document.querySelector("#profile");
const logoutButton = document.querySelector("#logout_button");
const profileDisplay = document.querySelector("#profile_display");
const signupInfo = document.querySelector("#signup_info");

//attaching lisening events to login button to redirect to profile page

if (loginButton) {
  loginButton.addEventListener("click", () => {
    window.location.href = "profile.html?content=login";
  });
}

//To show signup form if a new user wants to sign up
if (signupButton) {
  // Event listener for signup button click
  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Show signup form, hide login form and signup info
    signupForm.classList.remove("hide");
    loginForm.classList.add("hide");
    signupInfo.classList.add("hide");
    // Attach event listener for signup form submission
    signupForm.addEventListener("submit", acctSetup);
  });

  // Event listener for logout button click
  logoutButton.addEventListener("click", logOut);

// Check if the content parameter is 'login'
  if (contentParam === "login") {
    if (localStorage.getItem("isLoggedIn") === "true") {
      // User is logged in
      loginForm.classList.add("hide");
      profileDisplay.classList.remove("hide");
      displayUserInfo();
    } else {
      // User is not logged in
      console.log("User not logged in");
      loginForm.classList.remove("hide");
      profileDisplay.classList.add("hide");
      // Attach event listener for login form submission
      loginSubmit.addEventListener("submit", handleFormSubmit);
    }
  } else {
    // Content parameter is not 'login', hide the logout button
    logoutButton.classList.add("hide");
  }
}

// Function to check if the user is logged in
function isLoggedIn() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true"; 
}

// Function to display user-related information
function displayUserInfo() {
  if (isLoggedIn()) {
    const loggedUser = localStorage.getItem("username");
    const level = localStorage.getItem("level");

    const profileMsg = document.querySelector("#display_msg");
    const levelDisplay = document.querySelector("#display_level");

    profileMsg.innerHTML = `Welcome ${loggedUser}`;
    levelDisplay.innerHTML = `Level: ${level}`;

    signupInfo.classList.add("hide");
  }
}


//To store user account details to local storage
function acctSetup(e) {
  e.preventDefault();
  console.log("hello");
  userEmail = email.value;
  userAcct.Name = profileName.value;
  userAcct.Age = age.value;
  userAcct.Email = userEmail;
  userAcct.Password = password.value;
  console.log(userAcct);

  if (!localStorage.getItem(`account${userEmail}`)) {
    localStorage.setItem(`account${userEmail}`, JSON.stringify(userAcct));
    window.location.href = "profile.html?content=login";
  } else {
    alert("An account already exists with this email address");
  }

  profileName.value = "";
  age.value = "";
  email.value = "";
  password.value = "";
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get username and password from form inputs
  loginEmail = document.querySelector("#login_email").value;
  loginPassword = document.querySelector("#login_password").value;

  let retrievedForm = getUserForm(loginEmail);

  if (retrievedForm) {
    console.log(retrievedForm);
    username = retrievedForm.Name;
    userLevel = retrievedForm.Level;
    console.log(userLevel);

    // Perform login validation
    if (
      loginEmail === retrievedForm.Email &&
      loginPassword === retrievedForm.Password
    ) {
      // if successful login, store the user details in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("level", userLevel);
      // Manipulating the DOM to update content
      loginForm.classList.add("hide");
      profileDisplay.classList.remove("hide");
      displayUserInfo();
    } else {
      // Failed login
      alert("Login failed. Please try again.");
    }
  } else {
    alert("Please create a user account");
  }
}

function getUserForm(email) {
  let userForm = window.localStorage.getItem(`account${email}`);
  if (userForm) {
    return JSON.parse(userForm);
  }
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function logOut() {
  localStorage.removeItem("isLoggedIn", "true");
  localStorage.removeItem("username", username);
  localStorage.removeItem("level", userLevel);
  loginForm.classList.remove("hide");
  profileDisplay.classList.add("hide");
  signupInfo.classList.remove("hide");
}

//Learn Page Code

//attaching lisening events to activity buttons
for (let i = 0; i < selectionButtons.length; i++) {
  selectionArr.push(selectionButtons[i]);
  selectionArr[i].addEventListener("click", selectActivity);
}

//function to display activity selected
function selectActivity(e) {
  activityDiv.classList.add("hide");
  quizContent.classList.remove("hide");
  if (e.target.classList.contains("select_quiz")) {
    console.log("quiz clicked");
    //const quizButton = e.target;
    // Feching and dispaying quiz questions
    //quizButton.addEventListener("click", fetchQuiz);
    fetchQuiz();
  } else if (e.target.classList.contains("select_grammar_exercises")) {
    quizContent.classList.add("hide");
    console.log("grammar exercise clicked");
    //const grammarButton = e.target;
    // Feching and dispaying grammar exercise
    //grammarButton.addEventListener("click", wordMatch);
    wordMatch();
  } else if (e.target.classList.contains("select_speech_practice")) {
    console.log("grammar exercise clicked");
    // Feching and dispaying speech practice
    speechPractice();
  }
}

//Picking random quiz from the JSON
const generateRandom = (size) => {
  let randomIndex;
  for (let i = 0; i <= size; i++) {
    randomIndex = Math.floor(Math.random() * 12);
  }
  if (Object.keys(randomSaved).length < 12) {
    if (randomSaved[randomIndex] === true) {
      return;
    } else {
      randomSaved[randomIndex] = true;
      console.log(randomSaved);
      return randomIndex;
    }
  } else {
    for (let props in randomSaved) {
      delete randomSaved[props];
    }
  }
};

// Feching and dispaying quiz questions
async function fetchQuiz() {
  const requestURL =
    "https://raw.githubusercontent.com/Seyi-Toluhi/language_learning_app/main/Language_learning/Yoruba.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const yorubaQuiz = await response.json();
  displayQuiz(yorubaQuiz);
}

//dispaying quiz questions
function displayQuiz(response) {
  const optionsArr = ["a", "b", "c", "d"]; //this array gives me the keys to my quiz answers
  let rand = generateRandom(12);
  let obj = response;
  const quiz = obj[rand]["quiz"]; //gives a random question in obj
  correctAnswer = obj[rand]["correctAnswer"]; //stores the correct answer to above random question
  quizQues.textContent = quiz;

  for (let i = 0; i < optionsArr.length; i++) {
    let answers = obj[rand].answers[`${optionsArr[i]}`]; //looping through options arr to access the keys to the answers
    optionsLabels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
    radioButtons[i].setAttribute("value", `${answers}`);
  }

  check.addEventListener("click", checkAnswer);
  next.addEventListener("click", nextQuiz);
}
//compare selected answer with correct answer
function checkAnswer() {
  let selectedAnswer;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedAnswer = radioButton.value;
      //next.classList.add("hide");
      break;
    }
  }
  if (selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
      answerCheck.classList.add("hide_check");
      answerDisplay = document.createElement("div");
      const answerPara = document.createElement("p");
      const continueButton = document.createElement("button");
      answerDisplay.setAttribute("id", "answer_div");
      answerDisplay.style.backgroundColor = "green";
      answerPara.textContent = "That's Correct";
      continueButton.textContent = "Continue";
      answerDisplay.append(answerPara, continueButton);
      continueButton.addEventListener("click", nextQuiz);
    } else {
      answerCheck.classList.add("hide_check");
      answerDisplay = document.createElement("div");
      const answerPara = document.createElement("p");
      const continueButton = document.createElement("button");
      answerDisplay.setAttribute("id", "answer_div");
      answerDisplay.style.backgroundColor = "red";
      answerPara.textContent = `That's Wrong. The correct answer is ${correctAnswer}`;
      continueButton.textContent = "Continue";
      answerDisplay.append(answerPara, continueButton);
      continueButton.addEventListener("click", nextQuiz);
      //correction.textContent = `The correct answer is ${correctAnswer}`;
    }
    //unable to uncheck radio button
    //radioButtons.setAttribute("checked", false);

    gameProgress.appendChild(answerDisplay);
  } else {
    alert("Please pick your answer");
  }
}

//skip current question and load another question
function nextQuiz() {
  correction.textContent = "";
  fetchQuiz();
  answerCheck.classList.remove("hide_check");
  gameProgress.removeChild(answerDisplay);
}

function wordMatch() {
  let firstClicked = false;
  let firstValue, secondValue, firstElementClass, secondElementClass;
  
  //let secondClicked
  let tempArray = [...imageName], clickedItems = [];
  tempArray.sort(() => Math.random() - 0.5);
  //loop to display images and names
  for (let i = 0; i < imgMatch.length; i++) {
    imgWrapper.innerHTML += `<div class="img-container" data-item-value="${imgMatch[i].name}">
  <div class="img-display">
  <img src="image/${imgMatch[i].image}" class="image"/></div>
  </div>`;

    nameWrapper.innerHTML += `<div class="name-container" data-item-value="${tempArray[i]}"><span>${tempArray[i]}</span>
  </div>`;
  }

  let imgs = Array.from(document.querySelectorAll(".img-container"));
  let names = Array.from(document.querySelectorAll(".name-container"));
  clickedItems = [...imgs, ...names];
  console.log(clickedItems);
  let correctAnswerCount = 0;
  clickedItems.forEach((item) => {
    
    item.addEventListener("click", () => {
      
      if (!firstClicked) {
        firstClicked = item;
        firstClicked.style.backgroundColor = "rgba(112, 177, 212, 0.2)";
        firstValue = item.getAttribute("data-item-value");
        firstElementClass = item.getAttribute("class");
        console.log(firstClicked);
      } else {
        let secondClicked = item;
        secondValue = item.getAttribute("data-item-value");
        secondElementClass = item.getAttribute("class");
        console.log(secondClicked);

        if (firstValue === secondValue) {
          correctAnswerCount++;
          firstClicked.style.backgroundColor = "rgba(0,255,0,0.1)";
          secondClicked.style.backgroundColor = "rgba(0,255,0,0.1)";
          firstClicked.classList.remove("firstElementClass");
          secondClicked.classList.remove("secondElementClass");
          firstClicked.classList.add("disabled");
          secondClicked.classList.add("disabled");
          firstClicked = false;
        }
        else{
         const click1 = firstClicked;
         const click2 = secondClicked;
         firstClicked.style.backgroundColor ="";
          firstClicked.classList.add("red-background");
          secondClicked.classList.add("red-background");
          
          setTimeout(() => {
          click1.classList.remove("red-background");
          click2.classList.remove("red-background");
          }, 500)
          
            
        firstClicked = false;
        }
     
  }
if(correctAnswerCount === 5){
const result = document.querySelector("#result")
  const resultMsg = document.createElement("p")
  resultMsg.innerText="Congratulations, You Won!";
  grammarExercise.classList.add("hide")
  result.appendChild(resultMsg)
}
});
  });
}

function speechPractice() {}
