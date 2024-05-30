document.addEventListener("DOMContentLoaded", initialize);

// decide which of these need to be global variables
let answerDisplay,
  correctAnswer,
  loginEmail,
  loginPassword,
  username,
  score = 0,
  questionsCount = 12,
  XP;


let selectionArr = [];
let randomSaved = {};
const contentParam = getQueryParam("content");
let xp_stored = parseInt(localStorage.getItem("XP"));
console.log(contentParam);

const imgMatch = [
  { name: "Omi", image: "water.jpg" },
  { name: "Ero Ibanisoro", image: "telephone.png" },
  { name: "Baba", image: "father.jpg" },
  { name: "Omo", image: "child.jpg" },
  { name: "Iya", image: "mother.jpg" },
];

const imageName = ["Baba", "Omi", "Ero Ibanisoro", "Iya", "Omo"];


// Select elements from HTML
const elements = {
  next_quiz: document.querySelector("#next_button"),
  check_answer: document.querySelector("#check_button"),
  quiz_options_labels: document.querySelectorAll(".answer"),
  radio_buttons: document.querySelectorAll("input[name='answer']"),
  quiz_ques: document.querySelector(".quiz_question"),
  login_button: document.querySelector("#login_button"),
  signup_button: document.querySelector("#signup_button"),
  quiz_answer_check: document.querySelector("#answer_check"),
  signup_form: document.querySelector("#signup_form"),
  login_form: document.querySelector("#login_form_div"),
  game_progress: document.querySelector("#game_progress"),
  quiz_div: document.querySelector("#quizes"),
  activity_selection_buttons: document.querySelectorAll("#select_activity"),
  activity_div: document.querySelector("#activity_selection_div"),
  quiz_content: document.querySelector("#quiz_content"),
  display_correct_answer: document.querySelector("#correct_answer"),
  grammar_exercise_container: document.querySelector(".grammar_exercise_container"),
  img_wrapper: document.querySelector(".img_wrapper"),
  img_name_wrapper: document.querySelector(".name_wrapper"),
  login_form_submit: document.querySelector("#login_form"),
  logout_button: document.querySelector("#logout_button"),
  profile_display_container: document.querySelector("#profile_display"),
  signup_info: document.querySelector("#signup_info"),
  login_email_input: document.querySelector("#login_email"),
  matching_game_instruction: document.querySelector("#matching_game_instruction"),
  login_password_input: document.querySelector("#login_password"),
  play_word_speech: document.querySelector(".play_word_speech"),
  select_speech_practice_div: document.querySelector("#select_speech_practice_div"),
  word_speech: document.querySelector("#word_speech"),
  speech_practice_answers: Array.from(document.querySelectorAll(".speech_practice_answers")),
  close_button: document.querySelector("#close-button"),
  next_speech: document.querySelector("#next_speech")
};

function initialize() {
  attachEventListeners();
 // handleLoginContent();
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function attachEventListeners() {
  if (elements.login_button) {
    elements.login_button.addEventListener("click", redirectToLogin);
  }
if (elements.activity_div) {
    for (let i = 0; i < elements.activity_selection_buttons.length; i++) {
        selectionArr.push(elements.activity_selection_buttons[i]);
        selectionArr[i].addEventListener("click", loadActivity);
      }
}
if (elements.signup_button) {
    elements.signup_button.addEventListener("click", showSignupForm);
  }

if(elements.check_answer){
    elements.check_answer.addEventListener("click", checkAnswer);}

if(elements.next_quiz){
    elements.next_quiz.addEventListener("click", skipQuiz);}

if(elements.logout_button){
    elements.logout_button.addEventListener("click", logOut);
}
if (contentParam === "login") {
    handleLoginContent();
    //elements.logout_button.classList.add("hide");
  } 
if (elements.speech_practice_answers){
  elements.speech_practice_answers.forEach(
    answer => answer.addEventListener("click", checkSelectedAnswer)
  );
}

if(elements.close_button){elements.close_button.addEventListener("click", hideActivities)}

if(document.getElementById("closePopup")){document.getElementById("closePopup").addEventListener("click", closePopup);}
}

function redirectToLogin() {
  window.location.href = "profile.html?content=login";
}

function showSignupForm(e) {
  e.preventDefault();
  elements.signup_form.classList.remove("hide");
  elements.login_form.classList.add("hide");
  elements.signup_info.classList.add("hide");
  elements.signup_form.addEventListener("submit", acctSetup);
}

function handleLoginContent() {
 if (isLoggedIn()) {
    //elements.login_form.classList.add("hide");
    //elements.profile_display_container.classList.remove("hide");
    displayUserInfo();
  } else {
    console.log("User not logged in");
    elements.login_form.classList.remove("hide");
    elements.profile_display_container.classList.add("hide");
    elements.login_form_submit.addEventListener("submit", handleLoginFormSubmit);
  }
}

function isLoggedIn() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}

function displayUserInfo() {
 // if (isLoggedIn()) {
    //elements.logout_button.classList.remove("hide");
    if(elements.login_form){
    elements.login_form.classList.add("hide");}
    if(elements.signup_info){
    elements.signup_info.classList.add("hide");}
    if(elements.profile_display_container){
    elements.profile_display_container.classList.remove("hide");}
    const loggedUser = localStorage.getItem("username");
    const userScore = localStorage.getItem("score");
    let xp_stored = localStorage.getItem("XP");
    //console.log(userScore)
   //const XP_retrieved = localStorage.getItem(`account${loginEmail}`);
   // const XP_display = JSON.parse(XP_retrieved)
    //console.log(XP_display)
    

    const profileMsg = document.querySelector("#display_msg");
    const XPDisplayDiv = document.querySelector("#yoruba_display_level");
    const scoreDisplay = document.querySelector("#yoruba_display_score");

    profileMsg.innerHTML = `Welcome ${loggedUser}`;
    XPDisplayDiv.innerHTML = `XP Earned: ${xp_stored}`;
    scoreDisplay.innerHTML = `Quiz Score: ${userScore}`;
 // }
}

function acctSetup(e) {
    e.preventDefault();
    const newUser = {
    profileName: document.querySelector("#Name").value,
    age: document.querySelector("#Age").value,
    email: document.querySelector("#Email").value,
    password: document.querySelector("#Password").value,
    //userScore: 0,
    XP: 0,
    };
  
    const userEmail = newUser.email;
    const userExists = localStorage.getItem(`account${userEmail}`);
  
    if (!userExists) {
      createNewUser(newUser);
      redirectToLoginPage();
    } else {
      alert("An account already exists with this email address");
    }
  
    clearInputFields();

    function clearInputFields() {
        newUser.profileName = "";
        newUser.age = "";
        newUser.email = "";
        newUser.password = "";
      }

  function createNewUser(newUser) {
    localStorage.setItem(`account${newUser.email}`, JSON.stringify(newUser));
  }
}

function redirectToLoginPage() {
    window.location.href = "profile.html?content=login";
}
  
function handleLoginFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    loginEmail = elements.login_email_input.value;
    loginPassword = elements.login_password_input.value;
    console.log(loginEmail,loginPassword);

    let retrievedForm = getUserForm(loginEmail);
    checkUserForm(loginEmail);
      // Perform login validation
      if (
        loginEmail === retrievedForm.email &&
        loginPassword === retrievedForm.password
      ) {
        // if successful login, store the user details in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("XP", retrievedForm.XP);
        localStorage.setItem("score", score);
        displayUserInfo();
      } else {
        // Failed login
        alert("Login failed. Please try again.");
      }
} 

function getUserForm(email) {
    let userForm = window.localStorage.getItem(`account${email}`);
    if (userForm) {
      return JSON.parse(userForm);
    }
}
  
function checkUserForm(email){
    let retrievedForm = getUserForm(email);
    if (retrievedForm) {
      console.log(retrievedForm);
      username = retrievedForm.profileName;
      XP = retrievedForm.XP;
      console.log(XP);
  
  }
  else {
    alert("Please create a user account");}
}

function logOut() {
    localStorage.removeItem("isLoggedIn", "true");
    localStorage.removeItem("username", username);
    //localStorage.removeItem("XP", XP);
    elements.login_form.classList.remove("hide");
    elements.signup_info.classList.remove("hide");
    localStorage.removeItem("score");
    localStorage.removeItem("XP_earned");
    elements.profile_display_container.classList.add("hide");   
}

function loadActivity(e) {
   elements.activity_div.classList.add("hide");
   document.getElementById("exit_link").classList.add("hide")
   document.getElementById("close-button").classList.remove("hide")
    //document.getElementById("activities_div").classList.remove("hide")
    if (e.target.classList.contains("select_quiz")) {
      console.log("quiz clicked");
      elements.quiz_content.classList.remove("hide");
      //elements.grammar_exercise_container.classList.add("hide");
      fetchQuiz();
    } 
    if (e.target.classList.contains("select_grammar_exercises")) {
        elements.matching_game_instruction.remove("hide");
        elements.grammar_exercise_container.classList.remove("hide");
      console.log("grammar exercise clicked");
      wordMatch();
    } 
    if (e.target.classList.contains("select_speech_practice")) {
      console.log("grammar exercise clicked");
      elements.select_speech_practice_div.classList.remove("hide")
      speechPractice();
    }
  }

  function hideActivities() {
    location.reload();
  }
  
/*const generateRandom = (size) => {
  let randomIndex;
    for (let i = 0; i <= size; i++) {
      randomIndex = Math.floor(Math.random() * 12);
    }
    console.log(randomIndex)

    if (Object.keys(randomSaved).length < 12) {
      //if random number already exists, return false and generate another random num
      if (randomSaved[randomIndex] === true) {
        //return;
      //generate another number thats not in randomsaved
      console.log(randomIndex)
      
        
        console.log(randomSaved);
      } else {
        randomSaved[randomIndex] = true;
        console.log(randomSaved);
        console.log(randomIndex)
        return randomIndex
        
      }
    } else {
      //i need to call a function that says quiz completed
      displayQuizResult()
    
    }
  };*/

  const generateRandom = (size) => {
    let randomIndex;
    if (Object.keys(randomSaved).length < size) {
    while (true) {
      randomIndex = Math.floor(Math.random() * size);
      if (!randomSaved[randomIndex]) {
        randomSaved[randomIndex] = true;
        console.log(randomSaved);
        console.log(randomIndex)
        return randomIndex;
      }
    }}
  else {
    //i need to call a function that says quiz completed
    displayQuizResult();
  
  }
  };

  function displayQuizResult(){
    const resultContainer = document.createElement("div");
    resultContainer.className = "result-container";
    resultContainer.innerHTML = `Quiz Completed.You got ${score} out of ${questionsCount}`;
    //resultContainer.innerHTML += `You got ${score} out of ${questionsCount}`;
    elements.quiz_content.appendChild(resultContainer);
    elements.game_progress.classList.add("hide")
    elements.quiz_div.classList.add("hide")
  }


  //give fetch a try/catch
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
    console.log(obj);
    const quiz = obj[rand]["quiz"]; //gives a random question in obj
    correctAnswer = obj[rand]["correctAnswer"]; //stores the correct answer to above random question
    elements.quiz_ques.textContent = quiz;
  
    for (let i = 0; i < optionsArr.length; i++) {
      let answers = obj[rand].answers[`${optionsArr[i]}`]; //looping through options arr to access the keys to the answers
      elements.quiz_options_labels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
      elements.radio_buttons[i].setAttribute("value", `${answers}`);
    }
  }
  /*
    function displayQuiz(response) {
    const optionsArr = ["a", "b", "c", "d"]; //this array gives me the keys to my quiz answers
    let obj = response;
    let answers
    //console.log(obj.length)
    for (let i = 0; i < obj.length; i++){
    const quiz = obj[i]["quiz"]; //gives a random question in obj
    correctAnswer = obj[i]["correctAnswer"]; //stores the correct answer to above random question
    elements.quiz_ques.textContent = quiz;
    answers = obj[i].answers;
    
    }
    for (let i = 0; i < optionsArr.length; i++) {
      answers = `${optionsArr[i]}`;
        //looping through options arr to access the keys to the answers
      elements.quiz_options_labels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
      elements.radio_buttons[i].setAttribute("value", `${answers}`);
      
    }
  }
*/
  function checkAnswer() {
    let selectedAnswer;
    
    for (const radioButton of elements.radio_buttons) {
      if (radioButton.checked) {
        selectedAnswer = radioButton.value;
        break;
      }
    }
    if (selectedAnswer) {
      if (selectedAnswer === correctAnswer) {
        //if (isLoggedIn()){
          if (score < 12){
          score++}
         // console.log(score)
          let currentScore = parseInt(localStorage.getItem("score"));
          //console.log(currentScore)
          //if(currentScore){
            console.log("YES");
            currentScore = currentScore + 1;
            //console.log(currentScore)
            localStorage.setItem("score", currentScore);
          //}
        /*else{
        localStorage.setItem("score", 0);}*/
       // }
        //console.log(score);
        //let currentScore = localStorage.getItem("yourKey");

        correctAnswerDisplay();
      } else {
        wrongAnswerDisplay();
      }
    } else {
      alert("Please pick your answer");
    }
  }

  function correctAnswerDisplay(){
    elements.quiz_answer_check.classList.add("hide_check");
    answerDisplay = document.createElement("div");
    const answerPara = document.createElement("p");
    const continueButton = document.createElement("button");
    answerDisplay.setAttribute("id", "answer_div");
    answerDisplay.style.backgroundColor = "green";
    answerPara.textContent = "That's Correct";
    continueButton.textContent = "Continue";
    answerDisplay.append(answerPara, continueButton);
    continueButton.addEventListener("click", nextQuiz);
    elements.game_progress.appendChild(answerDisplay);
  }

  function wrongAnswerDisplay(){
    elements.quiz_answer_check.classList.add("hide_check");
    answerDisplay = document.createElement("div");
    const answerPara = document.createElement("p");
    const continueButton = document.createElement("button");
    answerDisplay.setAttribute("id", "answer_div");
    answerDisplay.style.backgroundColor = "red";
    answerPara.textContent = `That's Wrong. The correct answer is ${correctAnswer}`;
    continueButton.textContent = "Continue";
    answerDisplay.append(answerPara, continueButton);
    continueButton.addEventListener("click", nextQuiz);
    elements.game_progress.appendChild(answerDisplay);
  }

  function nextQuiz() {
   // correction.textContent = ""; 
    fetchQuiz();
    elements.quiz_answer_check.classList.remove("hide_check");
    if(answerDisplay){
    elements.game_progress.removeChild(answerDisplay);}
  }

function skipQuiz(){
  fetchQuiz();
}
  function wordMatch() {
    let firstClicked = false;
    let firstValue, secondValue, firstElementClass, secondElementClass;
    
    //let secondClicked
    let tempArray = [...imageName], clickedItems = [];
    tempArray.sort(() => Math.random() - 0.5);
    //loop to display images and names
    for (let i = 0; i < imgMatch.length; i++) {
      elements.img_wrapper.innerHTML += `<div class="img-container" data-item-value="${imgMatch[i].name}">
    <div class="img-display">
    <img src="image/${imgMatch[i].image}" class="image"/></div>
    </div>`;
  
    elements.img_name_wrapper.innerHTML += `<div class="name-container" data-item-value="${tempArray[i]}"><span>${tempArray[i]}</span>
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
            }, 500);
            
              
          firstClicked = false;
          }
       
    }
  if(correctAnswerCount === 5){
    const result = document.querySelector("#result")
    const resultMsg = document.createElement("p")
    resultMsg.innerText="Congratulations, You Won!";
    elements.grammar_exercise_container.classList.add("hide")
    result.appendChild(resultMsg);
    //}
if(!localStorage.getItem("Yoruba_XP_earned")){
    let completedMatchReward = 100
    //const XP = parseInt(localStorage.getItem("XP"))
    //console.log(XP)
    //completedMatchReward = XP + completedMatchReward
    localStorage.setItem("Yoruba_XP", completedMatchReward);//}
    localStorage.setItem("Yoruba_XP_earned", "true");
  }}
  });
    });
  }

const speechPracticeArray = [
    {
      word: "Omi",
      options: {
        a: "Cup",
        b: "Water",
        c: "Food",
      },
      correctAnswer: "Water"
    },
    {
      word: "Baba",
      options: {
        a: "Mother",
        b: "Child",
        c: "Father",
      },
      correctAnswer: "Father"
    },
    {
      word: "Odabo",
      options: {
        a: "Goodbye",
        b: "Please",
        c: "Sorry",
      },
      correctAnswer: "Goodbye"
    },
    {
      word: "Bawo ni",
      options: {
        a: "Thanks",
        b: "Hello",
        c: "Sorry",
      },
      correctAnswer: "Hello"
    },
    {
      word: "Jowo",
      options: {
        a: "Thanks",
        b: "Sorry",
        c: "Please",
      },
      correctAnswer: "Please"
    }
  ];
function speak(e) {
const utterance = new SpeechSynthesisUtterance(`${e.target.getAttribute("id")}`);
utterance.voice = speechSynthesis.getVoices()[2];
speechSynthesis.speak(utterance); // This will speak the provided text
}
//elements.speech_testing.addEventListener("click", speak)
//elements.play_word_speech.addEventListener("click", speak)
//elements.play_word_speech.forEach((e) => e.addEventListener("click", speak))


let correctSpeechAnswer = 0
function speechPractice() {
//elements.next_speech.addEventListener("click", displaySpeechQuestion)
displaySpeechQuestion()

}

let speechAnswer
function displaySpeechQuestion(){
  if (correctSpeechAnswer < 5){
  const rand_speech = generateRandom(5);
  elements.word_speech.innerHTML = speechPracticeArray[rand_speech].word;
  
  speechAnswer = speechPracticeArray[rand_speech].correctAnswer
  console.log(speechAnswer)
  elements.play_word_speech.setAttribute("id", `${speechPracticeArray[rand_speech].word}`)
  elements.play_word_speech.addEventListener("click", speak);
  console.log(elements.play_word_speech)


  let speechPracticeOptions = Object.values(speechPracticeArray[rand_speech].options);
  for (let i = 0; i < speechPracticeOptions.length; i++){
    elements.speech_practice_answers[i].textContent = speechPracticeOptions[i]
  }
}

else{elements.select_speech_practice_div.classList.add("hide")
document.getElementById("speech_practice_completed").classList.remove("hide")}
}

function checkSelectedAnswer(e){
 if(e.target.innerHTML === speechAnswer){
  correctSpeechAnswer++
  console.log(correctSpeechAnswer)
    // Example usage to show feedback popup
showPopup("Correct! Well done!");
giveCorrectFeedback()
// To close the popup after a certain duration (e.g., 3 seconds)
setTimeout(closePopup, 1000);
displaySpeechQuestion()


  }
  else{// Example usage to show feedback popup
    showPopup("Inorrect! Try again!");
    giveIncorrectFeedback()
    // To close the popup after a certain duration (e.g., 3 seconds)
    setTimeout(closePopup, 1000);}
  //if (selectedOption === speechPracticeArray[rand_speech].correctAnswer)
}
function giveCorrectFeedback(){
const utterance = new SpeechSynthesisUtterance("Well done");
utterance.voice = speechSynthesis.getVoices()[2];
speechSynthesis.speak(utterance); 
}

function giveIncorrectFeedback(){
  const utterance = new SpeechSynthesisUtterance("Please Try again");
  utterance.voice = speechSynthesis.getVoices()[2];
  speechSynthesis.speak(utterance); 
  }

  // Function to show the popup with a custom message
function showPopup(message) {
  document.getElementById("feedbackMessage").textContent = message;
  document.getElementById("popupContainer").style.display = "flex";
}

// Function to close the popup
function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}

// Attach a click event to the close button



