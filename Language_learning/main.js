window.addEventListener("DOMContentLoaded", displayLogin);
populate();
let profileName = document.querySelector("#Name");
let age = document.querySelector("#Age");
let email = document.querySelector("#Email");
let password = document.querySelector("#Password");
const accountButton = document.querySelector("#signUp");
const gameDesc = document.querySelector("#game_description");
const loginForm = document.querySelector("#form_section");
const quizQues = document.querySelector(".quiz_question");
const radioButtons = document.querySelectorAll('input[name="answer"]');
const check = document.querySelector("#check_button");
const answerLabel = document.querySelectorAll(".answer");
const ul = document.querySelector(".login_list");

let answerArray = [];
let loginDetails = { Level: 0 };
let buttonText = ["Sign up", "Log in"];

function displayLogin() {
  gameDesc.classList.remove("hide");
  loginForm.classList.add("hide");
  for (let i = 0; i <= 1; i++) {
    const navList = document.createElement("li");
    navList.classList.add(`nav_List${i}`);
    const navButton = document.createElement("button");
    navButton.classList.add(`nav_button${i}`);
    navList.appendChild(navButton);
    navButton.textContent = `${buttonText[i]}`;
    ul.appendChild(navList);
  }
  const signupButton = document.querySelector(".nav_button0");
  signupButton.addEventListener("click", buttonClicked);
  const loginButton = document.querySelector(".nav_button1");
  loginButton.addEventListener("click", buttonClicked);
}

function buttonClicked(e) {
  if (e.target.classList.contains("nav_button0")) {
    gameDesc.classList.add("hide");
    loginForm.classList.remove("hide");
    return acctSetup();
  }
}

function acctSetup() {
  accountButton.addEventListener("click", function (e) {
    //get input values from form fields
    e.preventDefault();
    const userName = profileName.value;
    const userAge = age.value;
    const userEmail = email.value;
    const userPassword = password.value;

    //add user data to object
    loginDetails.Name = userName;
    loginDetails.Age = userAge;
    loginDetails.Email = userEmail;
    loginDetails.Password = userPassword;
    //local storage to store settings and progress
    if (!localStorage.getItem(`account${userEmail}`)) {
      localStorage.setItem(`account${userEmail}`, JSON.stringify(loginDetails));
      gameDesc.classList.remove("hide");
      loginForm.classList.add("hide");
    } else {
      alert("An account already exists with this email address");
    }
    //loginDetails = JSON.parse(localStorage.getItem(`login`));
    //console.log(JSON.parse(localStorage.getItem("account")))
    //localStorage.clear();
    profileName.value = "";
    age.value = "";
    email.value = "";
    password.value = "";
  });
}

// conplete babel configuration and install postcss
//Pick random objects from the JSON
const generateRandom = (size = 12) => {
  let randomIndex;
  for (let i = 0; i <= size; i++) {
    randomIndex = Math.floor(Math.random() * 12);
  }
  return randomIndex;
};

// Feching and dispaying quiz questions

async function populate() {
  const requestURL =
    "https://raw.githubusercontent.com/Seyi-Toluhi/Language_learning/main/Yoruba.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const yorubaQuiz = await response.json();
  displayQuiz(yorubaQuiz);
}

function displayQuiz(response) {
  const optionsArr = ["a", "b", "c", "d"]; //this array gives me the keys to my quiz answers
  let rand = generateRandom();
  let obj = response;
  console.log(obj); //gives me the array of 12 objects
  const quiz = obj[rand]["quiz"]; //gives me the questions
  console.log(obj[rand]);
  console.log(quiz);
  quizQues.textContent = quiz;
  //const radioContainer = document.createElement("div");
  //radioContainer.setAttribute("role", "radiogroup");

  //To display answer labels
  for (let i = 0; i < optionsArr.length; i++) {
    let answer = obj[rand].answers[`${optionsArr[i]}`];
    answerArray.push(answer);
  }
  console.log(answerArray);
  for (let i = 0; i < answerLabel.length; i++) {
    answerLabel[i].innerHTML = `${answerArray[i]}`;
  }

  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].setAttribute("value", `${answerArray[i]}`);
  }
}

//const val = radioButtons.getAttribute("value")

check.addEventListener("click", checkAnswer);
function checkAnswer() {
  let selectedAnswer;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedAnswer = radioButton.value;
      break;
    }
  }
  console.log(`You answered: ${selectedAnswer}`);
}
