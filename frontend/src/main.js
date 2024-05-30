const BACKEND_URL =
document.addEventListener("DOMContentLoaded", initialize);

//global variables
let answerDisplay,
  correctAnswer,
  score = 0,
  randomSaved = {};


  //required elements from HTML pages
const elements = {
  next_quiz: document.querySelector("#next_button"),
  check_answer: document.querySelector("#check_button"),
  quiz_options_labels: document.querySelectorAll(".answer"),
  radio_buttons: document.querySelectorAll("input[name='answer']"),
  quiz_ques: document.querySelector(".quiz_question"),
  login_button: document.querySelector("#login_button"),
  signup_button: document.querySelector("#signup_button"),
  quiz_answer_check: document.querySelector("#answer_check"),
  signup_form: document.querySelector("#account_form"),
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
  logout: document.querySelector("#logout"),
  logout_button: document.querySelector("#logout_button"),
  matching_game_instruction: document.querySelector("#matching_game_instruction"),
  play_word_speech: document.querySelector(".play_word_speech"),
  select_speech_practice_div: document.querySelector("#select_speech_practice_div"),
  word_speech: document.querySelector("#word_speech"),
  speech_practice_answers: Array.from(document.querySelectorAll(".speech_practice_answers")),
  close_button: document.querySelector("#close-button"),
  next_speech: document.querySelector("#next_speech"),
  delete_account: document.querySelector("#delete_account_button")
};

//initialize function to add all event listeners on web laod, check if a user is logged in and hide logout/delete account buttons on profile page if not.
function initialize() {
  attachEventListeners();
  checkUserLoggedIn()
  hideProfileButtons()
  
}

//function to add all event listeners on web laod
function attachEventListeners() {
  let selectionArr = [];
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
  if (elements.login_form_submit) {
    elements.login_form_submit.addEventListener("submit", logUserIn);
  }
  
  if (elements.signup_form) {
    elements.signup_form.addEventListener("submit", createNewUser);
  }
  
  if(elements.check_answer){
    elements.check_answer.addEventListener("click", checkQuizAnswer);
  }
  
  if(elements.next_quiz){
    elements.next_quiz.addEventListener("click", skipQuiz);}
    
  if(elements.logout_button){
    elements.logout_button.addEventListener("click", logOut);
  }
  if (elements.delete_account) {
    elements.delete_account.addEventListener("click", deleteAccount);
  }

  if (elements.speech_practice_answers){
    elements.speech_practice_answers.forEach(
      answer => answer.addEventListener("click", checkSelectedAnswer)
      );
    }

  if(elements.close_button){
    elements.close_button.addEventListener("click", hideActivities)}
    
  if(document.getElementById("closePopup")){
    document.getElementById("closePopup").addEventListener("click", closePopup);
  }
}
        
// let animation = lottie.loadAnimation({
  //   container: document.getElementById('lottie-animation'), // the dom element that will contain the animation
  //   renderer: 'svg',
  //   loop: true,
  //   autoplay: true,
  //   path: 'https://assets2.lottiefiles.com/packages/lf20_hh15zjiv.json' // replace this with the URL to your chosen animation
  // });

//function to hide logout/delete account buttons on profile page if no user is logged in
function hideProfileButtons(){
  document.getElementById("logout").classList.add("hide")
  document.getElementById("delete_account_button").classList.add("hide")
}

//function to check if a user token is on localStorage for JWT authentication
function isLoggedIn() {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn
}

// function to make CRUD operation for new user creation
function createNewUser(e) {
  e.preventDefault(); // Prevent default form submission
  const formData = new FormData(elements.signup_form); // Get form data
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  // Make fetch request to backend endpoint for creating user
  fetch(`${BACKEND_URL}/create_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json(); // Parse response JSON
  })
  .then(data => {
    alert('User created successfully'); // Show success message
    elements.signup_form.reset(); // Reset form fields
    window.location.href = './login.html'; //if successful user creation, navigate to log in page
  })
  .catch(error => {
    console.error(error); // Handle error
    alert('Failed to create user'); // Show error message
  });
}

// function to make CRUD operation for user log in
function logUserIn(e){
  e.preventDefault(); // Prevent default form submission
  const formData = new FormData(elements.login_form_submit); // Get form data
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  // Make fetch request to backend endpoint for login
  fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject),
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    return response.json(); // Parse response JSON
  })
  .then(data => {
    alert('Login successful');// Handle successful response
    localStorage.setItem('token', data.token); 
    localStorage.setItem('user_id', data.user.id); 
    localStorage.setItem('user_score', data.user.score); 
    window.location.href = './profile.html';//if successful user creation, navigate to profile page
    elements.login_form_submit.reset(); // Reset form fields
  })
  .catch(error => {
    console.error(error); // Handle error
    alert('Failed to get user'); // Show error message
  });
}
            
// Fetch protected resource
function fetchProtectedResource() {
  const token = localStorage.getItem('token');
  fetch('${BACKEND_URL}/protected', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Protected resource data:');
  })
  .catch(error => console.error('Error:', error));
}

//function to persistently check if a user is logged in, get the user from database and updated score as user plays learning games
function checkUserLoggedIn () {
  const token = localStorage.getItem('token');
  // Check session request example
  fetch(`${BACKEND_URL}/check_session`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include'  // Important to include credentials
  })
  .then(response => response.json())
  .then(data => {
    if(data.user){
      displayUserInfo(data.user, data.score)
      document.getElementById("logout").classList.remove("hide")
      document.getElementById("delete_account_button").classList.remove("hide")
    } else{
      document.querySelector("#display_msg").innerHTML = 'Log in to view your profile'
    }
  })
  .catch(error => console.error('Error:', error));
}

//function to display user info on the profile page
function displayUserInfo(user, score_data) {
  const age = document.querySelector("#age");
  const profileMsg = document.querySelector("#display_msg");
  const user_score = document.querySelector("#score");
  const XPDisplayDiv = document.querySelector("#yoruba_display_level");
  const scoreDisplay = document.querySelector("#yoruba_display_score");
  document.getElementById("profile_redirect_login").classList.add("hide")
  profileMsg.innerHTML += `Welcome, ${user.first_name}`
  age.innerHTML += `Age: ${user.age}`
  user_score.innerHTML += `Total XP: ${score_data}`
}

//function to log user out and delete all user credentials from localStorage
function logOut() {
  fetch(`${BACKEND_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    document.querySelector("#display_msg").innerHTML = 'Log in to view your profile'
    document.getElementById("logout").classList.add("hide")
    document.getElementById("profile_redirect_login").classList.remove("hide")
    localStorage.removeItem('token'); 
    localStorage.removeItem('score'); 
    localStorage.removeItem('user_id'); 
    window.location.reload();
  })
  .catch(error => console.error('Error:', error));
}

//function to delete user acount and log user out
function deleteAccount() {
  const user_id = localStorage.getItem("user_id")
  const token = localStorage.getItem("token")
  
  const payload = {
    id : user_id
  }
  
  fetch(`${BACKEND_URL}/delete_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
    credentials: 'include'  // include credentials
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    logOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("score");
  })
  .catch(error => console.error('Error:', error));
}
            
//function to load different learning activities based on user selection
function loadActivity(e) {
  elements.activity_div.classList.add("hide");
  document.getElementById("exit_link").classList.add("hide")
  document.getElementById("close-button").classList.remove("hide")
  if (e.target.classList.contains("select_quiz")) {
    elements.quiz_content.classList.remove("hide");
    fetchQuiz();
  } 
  if (e.target.classList.contains("select_grammar_exercises")) {
    elements.matching_game_instruction.remove("hide");
    elements.grammar_exercise_container.classList.remove("hide");
    wordMatch();
  } 
  if (e.target.classList.contains("select_speech_practice")) {
    elements.select_speech_practice_div.classList.remove("hide")
    speechPractice();
  }
}
            
function hideActivities() {
  location.reload();
}

              
//api call to fetct quiz json file from github where ive hosted it 
async function fetchQuiz() {
  try {
    const requestURL = "https://raw.githubusercontent.com/Seyi-Toluhi/language_learning_app/main/Language_learning/frontend/src/json_files/Yoruba.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const yorubaQuiz = await response.json();
  displayQuiz(yorubaQuiz);}
  catch (e) {
    console.log('Failed to fetch quiz questions', e.message)}
}

//generate a random number for random quiz question selection
const generateRandom = (size) => {
  let randomIndex;
  if (Object.keys(randomSaved).length < size) {
    while (true) {
      randomIndex = Math.floor(Math.random() * size);
      if (!randomSaved[randomIndex]) {
        randomSaved[randomIndex] = true;
        return randomIndex;
      }
    }}
    else {
      displayQuizResult();
    }
  };

//dispaying quiz questions
function displayQuiz(response) {
  const optionsArr = ["a", "b", "c", "d"]; //this array gives me the keys to my quiz answers
  let rand = generateRandom(12);
  let obj = response;
  const quiz = obj[rand]["quiz"]; //gives a random question in obj
  correctAnswer = obj[rand]["correctAnswer"]; //stores the correct answer to above random question
  elements.quiz_ques.textContent = quiz;
  
  for (let i = 0; i < optionsArr.length; i++) {
    let answers = obj[rand].answers[`${optionsArr[i]}`]; //looping through options arr to access the keys to the answers
    elements.quiz_options_labels[i].innerHTML = `${answers}`; //attaching them as labels to radio buttons
    elements.radio_buttons[i].setAttribute("value", `${answers}`);
  }
}

//function to check user's selected answer and respond if its correct or incorrect
function checkQuizAnswer() {
  let selectedAnswer;
  
  for (const radioButton of elements.radio_buttons) {
    if (radioButton.checked) {
      selectedAnswer = radioButton.value;   //check value of clicked button and update selectedAnswer  
      break;
    }
  }
  if (selectedAnswer) {
    if (selectedAnswer === correctAnswer) { // check that selected answer is correct and increment score. log score
      if (isLoggedIn())  // if a user is logged in and quiz score is less than 12, increment score
      { localStorage.setItem("score", score)
        if (score < 12){
          score++
          let currentScore = parseInt(localStorage.getItem("score"))
          currentScore = currentScore + 1;
          localStorage.setItem("score", currentScore);
          if(score == 12)
          {updateScoreData()}
        }
      }
      correctAnswerDisplay();
    } 
    else 
    {
      wrongAnswerDisplay();
    }
  } else {
    alert("Please pick your answer");
  }
}

//function to show user the final quiz result
function displayQuizResult(){
  const questionsCount = 12
  const score = localStorage.getItem("score")
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";
  if(score == 12){
    resultContainer.innerHTML = `You're a gem. You got ${score} out of ${questionsCount} in Yoruba and earned 20 XP`;
  } else{
    resultContainer.innerHTML = `Quiz Completed.You got ${score} out of ${questionsCount} in Yoruba. To earn 20 XP, you need a score of 12`;
  }
  elements.quiz_content.appendChild(resultContainer);
  elements.game_progress.classList.add("hide")
  elements.quiz_div.classList.add("hide")
}

//function to update user table in the database with quiz XP if earned
async function updateScoreData(){
  let user_id = parseInt(localStorage.getItem("user_id"))
  let token = localStorage.getItem("token")
  
  const payload = {
    XP : 20,
    id : user_id
  }
  
  await fetch(`${BACKEND_URL}/update_user_score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  }
  )
  if (response.status !== 200) {
    throw new Error("Unable to update score");
  }
}


//function for displaying feedback for quiz if user selection is correct
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

//function for displaying feedback for quiz if user selection is incorrect
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

//function to display next quiz
function nextQuiz() {
  fetchQuiz();
  elements.quiz_answer_check.classList.remove("hide_check");
  if(answerDisplay){
    elements.game_progress.removeChild(answerDisplay);}
  }

//function to skip a quiz question
function skipQuiz(){
  fetchQuiz();
}

//image and matching name for word/iamge match
const imgMatch = [
  { name: "Omi", image: "water.jpg" },
  { name: "Ero Ibanisoro", image: "telephone.png" },
  { name: "Baba", image: "father.jpg" },
  { name: "Omo", image: "child.jpg" },
  { name: "Iya", image: "mother.jpg" },
];

const imageName = ["Baba", "Omi", "Ero Ibanisoro", "Iya", "Omo"];

//function to display word and image matching activity and check if correctly matched
function wordMatch() {
  let firstClicked = false;
  let firstValue, secondValue, firstElementClass, secondElementClass;
  let tempArray = [...imageName], clickedItems = [];
  tempArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < imgMatch.length; i++) { //loop to display images and names
  elements.img_wrapper.innerHTML += `<div class="img-container" data-item-value="${imgMatch[i].name}">
  <div class="img-display">
  <img src="images/${imgMatch[i].image}" class="image"/></div>
  </div>`;
  elements.img_name_wrapper.innerHTML += `<div class="name-container" data-item-value="${tempArray[i]}"><span>${tempArray[i]}</span>
  </div>`;
  }
  let imgs = Array.from(document.querySelectorAll(".img-container"));
  let names = Array.from(document.querySelectorAll(".name-container"));
  clickedItems = [...imgs, ...names];
  let correctAnswerCount = 0;
  clickedItems.forEach((item) => {
  item.addEventListener("click", () => {
  if (!firstClicked) {
  firstClicked = item;
  firstClicked.style.backgroundColor = "rgba(112, 177, 212, 0.2)";
  firstValue = item.getAttribute("data-item-value");
  firstElementClass = item.getAttribute("class");
  } else {
  let secondClicked = item;
  secondValue = item.getAttribute("data-item-value");
  secondElementClass = item.getAttribute("class");

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
  resultMsg.innerText="You must be proud of yourself! You've earned 20 XP";
  updateScoreData()
  elements.grammar_exercise_container.classList.add("hide")
  result.appendChild(resultMsg);

  if(!localStorage.getItem("Yoruba_XP_earned")){
  let completedMatchReward = 100
  localStorage.setItem("Yoruba_XP", completedMatchReward);
  localStorage.setItem("Yoruba_XP_earned", "true");
  }}
  });
  });
}

//speech practice data structure
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

let voices = [];

//function to load voices and store in above array
function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (!voices.length) {
    // Voices not yet loaded, so attach an event listener
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
    };
  }
}

//function to sa voice from the voice array and speak when user clicks on a word
function speak(e) {
  const utterance = new SpeechSynthesisUtterance(e.target.getAttribute("id"));
  const selectedVoice = voices[2] || voices[0]; // Use the third voice if available, otherwise fallback to the first voice
  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);
}

//correct speech answer set to 0
let speechAnswer;
let correctSpeechAnswer = 0;

function speechPractice() {
  displaySpeechQuestion();
}

// function to display a speech practice exercise. max of 5. if all 5 answered correctly, user score in updated in database
function displaySpeechQuestion() {
  if (correctSpeechAnswer < 5) {
    const rand_speech = generateRandom(5);
    elements.word_speech.innerHTML = speechPracticeArray[rand_speech].word;
    speechAnswer = speechPracticeArray[rand_speech].correctAnswer;
    elements.play_word_speech.setAttribute("id", speechPracticeArray[rand_speech].word);

    // Detach any existing event listeners to avoid duplicates
    elements.play_word_speech.removeEventListener("click", speak);
    elements.play_word_speech.addEventListener("click", speak);

    const speechPracticeOptions = Object.values(speechPracticeArray[rand_speech].options);
    speechPracticeOptions.forEach((option, i) => {
      elements.speech_practice_answers[i].textContent = option;
    });
  } else {
    elements.select_speech_practice_div.classList.add("hide");
    updateScoreData();
    document.getElementById("speech_practice_completed").classList.remove("hide");
  }
}

//function to check selected answer and provide feeback in a popup
function checkSelectedAnswer(e) {
  if (e.target.innerHTML === speechAnswer) {
    correctSpeechAnswer++;
    showPopup("Correct! Well done!");
    giveCorrectFeedback();
    setTimeout(closePopup, 1000);
    displaySpeechQuestion();
  } else {
    showPopup("Incorrect! Try again!");
    giveIncorrectFeedback();
    setTimeout(closePopup, 1000);
  }
}

//correct answer feedback
function giveCorrectFeedback() {
  const utterance = new SpeechSynthesisUtterance("Correct! Well done");
  const selectedVoice = voices[3] || voices[0];
  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);
}

//wrong answer feedback
function giveIncorrectFeedback() {
  const utterance = new SpeechSynthesisUtterance("Incorrect! Try again");
  const selectedVoice = voices[3] || voices[0];
  utterance.voice = selectedVoice;
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

//voices are loaded before using them
loadVoices();

// Attach click event to the answer options dynamically
// document.querySelectorAll('.speech-practice-answer').forEach(answer => {
//   answer.addEventListener('click', checkSelectedAnswer);
// });
