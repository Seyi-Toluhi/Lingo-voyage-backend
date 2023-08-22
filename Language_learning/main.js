//const { doc } = require("prettier");
window.addEventListener("DOMContentLoaded", displayCenter);

let answerDisplay;
let correctAnswer;
let buttonsArr = [];
let selectionArr = [];
let userAcct = { Level: 1 };

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
const accountButtons = document.querySelectorAll("#account_button");
const signupButton = document.querySelector("#signUp");
const answerCheck = document.querySelector("#answer_check");
const gameDesc = document.querySelector("#game_description");
const signupForm = document.querySelector("#signup_form");
const loginForm = document.querySelector("#login_form");
const gameProgress = document.querySelector("#game_progress");
const selectionButtons = document.querySelectorAll("#select_activity");
const activityDiv = document.querySelector("#activity_selection_div");
const quizContent = document.querySelector("#quiz_content");
const correction = document.querySelector("#correct_answer");

//To hide signup and login forms
function displayCenter() {
  loginForm.classList.add("hide");
  signupForm.classList.add("hide");
}

//attaching lisening events to signup and login form buttons
for (let i = 0; i < accountButtons.length; i++) {
  buttonsArr.push(accountButtons[i]);
  buttonsArr[i].addEventListener("click", accountSaved);
}

//function to display either signup form or login form when target buttons are clicked
function accountSaved(e) {
  e.preventDefault()
  if (e.target.classList.contains("signup_button")) {
    signupForm.classList.remove("hide");
    gameDesc.classList.add("hide");
    loginForm.classList.add("hide");
    return acctSetup();
  } else if (e.target.classList.contains("login_button")) {
    loginForm.classList.remove("hide");
    gameDesc.classList.add("hide");
    signupForm.classList.add("hide");
  }
}

//To store user account details to local storage
function acctSetup() {
  signupButton.addEventListener("click", function () {
    //e.preventDefault();
    const userName = profileName.value;
    const userAge = age.value;
    const userEmail = email.value;
    const userPassword = password.value;
    userAcct.Name = userName;
    userAcct.Age = userAge;
    userAcct.Email = userEmail;
    userAcct.Password = userPassword;

    if (!localStorage.getItem(`account${userEmail}`)) {
      localStorage.setItem(`account${userEmail}`, JSON.stringify(userAcct));
    }
    //!profileName.value ==="" && !age.value === "" && !email.value === "" && !password.value === "" &&
    else {
      alert("An account already exists with this email address");
    }
    //userAcct = JSON.parse(localStorage.getItem(`login`));
    //console.log(JSON.parse(localStorage.getItem("account")))
    //localStorage.clear();
    profileName.value = "";
    age.value = "";
    email.value = "";
    password.value = "";
  });
}

//attaching lisening events to activity buttons
for (let i = 0; i < selectionButtons.length; i++) {
  selectionArr.push(selectionButtons[i]);
  selectionArr[0].addEventListener("click", selectActivity);
}

//function to display activity selected
function selectActivity(e) {
  activityDiv.classList.add("hide");
  quizContent.classList.remove("hide");
  if (e.target.classList.contains("select_quiz")) {
    console.log("clicked");
    return fetchQuiz;
  }
}

// Feching and dispaying quiz questions
fetchQuiz();

//Picking random quiz from the JSON
const generateRandom = (size = 12) => {
  let randomIndex;
  let randomSaved = [];
  for (let i = 0; i <= size; i++) {
    randomIndex = Math.floor(Math.random() * 12);
  }
  randomSaved.push(randomIndex);
  if (randomIndex !== randomSaved[0]) {
    randomSaved.pop();
    return randomIndex;
  } else {
    for (let i = 0; i <= size; i++) {
      randomIndex = Math.floor(Math.random() * 12);
    }
    return randomIndex;
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
  let rand = generateRandom();
  let obj = response;
  const quiz = obj[rand]["quiz"]; //gives a random question in obj
  correctAnswer = obj[rand]["correctAnswer"]; //stores the correct answer to above random question
  quizQues.textContent = quiz;

  for (let i = 0; i < optionsArr.length; i++) {
    let answers = obj[rand].answers[`${optionsArr[i]}`]; //looping through options arr to access the keys to the answers
    optionsLabels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
    radioButtons[i].setAttribute("value", `${answers}`);
  }
}

check.addEventListener("click", checkAnswer);
next.addEventListener("click", nextQuiz);

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
  correction.textContent = ""
  fetchQuiz();
  answerCheck.classList.remove("hide_check");
  gameProgress.removeChild(answerDisplay);
}
