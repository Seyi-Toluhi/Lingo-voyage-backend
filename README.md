# Lingo voyage Demo
<p align="center">
 <a href="https://www.youtube.com/watch?v=4fQG6Ho1NHU">
    <img src="https://img.youtube.com/vi/4fQG6Ho1NHU/0.jpg" alt="Watch the video" width="560" height="315">
  </a>
</p>

# Lingo voyage - Language learning app
<p>Welcome to Lingo Voyage, your app for learning cool new languages, built using HTML, CSS, JavaScript, Node and Express for the frontend and Python and Flask for the backend. Features user authentication handled by JSON Web Tokens. Lingo Voyage teaches Spanish and Yoruba using fun and interactive games, providing language lovers with an intuitive platform to learn. 

It also features the Speech Synthesis Utterance API, a part of the Web Speech API, which allows web applications to handle speech synthesis (text-to-speech). This lets users listen to the pronunciation of Spanish and Yoruba words to aid their learning.</p>

# Features
- **User Account Management:** Sign up to create your account stored on PostgreSQL database.
- **User Authentication:** Securely sign up and log in with JSON Web Tokens for a personalized and secure learning experience.
- **Language Selection:** Navigate through lingo voyage's language options to learn a specific language.
- **User Profiles:** Manage your profile and keep track of your learning progress.
- **Quiz:** Engage in quizzes to support your learning experience.
- **Match Words to Pictures:** Play a fun game that tests your knowledge of a word by matching it to a corresponding picture.
- **Word Practice:** Listen to the pronunciation of a word in the language you are learning to aid your learning progress.
- **Score Tracking:** View your score via experience points earned to track your learning progress.
- **Responsive Design:** Enjoy a seamless learning experience across all devices, thanks to my responsive design.

# Tech Stack
- **Frontend:** HTML, CSS, JavaScript, Node and Express for a dynamic and responsive user interface. 
- **Backend:** Python, Flask for robust server-side logic and API endpoints. Database: PostgreSQL for flexible and scalable data storage.

# Author 
Seyi Toluhi - https://github.com/Seyi-Toluhi

# Trello
https://trello.com/b/5xZqdOIU/lingo-voyage

# Excalidraw Project Planning
https://excalidraw.com/#json=06I5dszO72cMUq5_G2Mey,oWxinqSJo3bMObHoWjOeew

# API Documents 

Getting Started
To set up the Lingo voyage project locally, follow these steps:

# Prerequisites
Install Node, Express and Jest in frontend directory:


Frontend - run cd frontend in your terminal to navigate to frontend directory
- **Node:** Go to the [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) website and download the installer for your operating system
- **Express:** npm init -y and npm install express
- **Jest:** run npm install --save-dev jest

Install Python3, Pip, PostgreSQL and Pytest in backend directory:
- **Python3:** Go to the official [Python](https://www.python.org/doc/) website. Click on the "Download Python 3.x.x" button.
- **Pip:** If not already installed, python -m ensurepip --upgrade
- **PostgreSQL:** Go to the official [PostgreSQL](https://www.postgresql.org/download/windows/) website. Click on the "Download the installer" link
- **Pytest:** run pip install pytest

# Installation

Clone the repository or download the source code: 


git clone https://github.com/Seyi-Toluhi/Lingo-Voyage.git

Frontend and backend server start:


Navigate to the frontend directory: cd frontend


run npm install - installs dependencies


Start the frontend express server: run node server.js


The frontend should now be running on http://localhost:3000.

Navigate to the backend directory: cd backend


Start the backend flask server: python3 app.py


The backend should now be running on port 5000

# Run Tests
- **cd frontend:** run jest
- **cd backend:** run pytest

# Configuration
Environment Variables set up the required environment variables in .env files within the backend directory and .env in frontend.


DATABASE_URL: Connection string for your Postgres database. FLASK_SECRET_KEY: secret connection key for flask server.

# Usage
Explore Lingo voyage, sign up or log in, select a language to learn, and proceed to engage in interactive activities. Enjoy a seamless learning experience from the comfort of your home.

# Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your features or fixes.

Happy Learning! 📚