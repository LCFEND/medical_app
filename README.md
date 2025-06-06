StayHealthy Medical Web App — Project Overview
About the Project:
This web application was built during my studies the Project involved building a medical App for StayHealthy Inc., a non-profit organization dedicated to improving healthcare accessibility in underserved and remote areas. As part of their “Go Digital” initiative, the goal of the app is to give patients the ability to connect with doctors online—anytime, anywhere.

My Role:
As the front-end developer, I was responsible for designing and building the user interface of the application.

🔑 Key Features
Doctor Search:
Users can search for doctors by name to quickly find the medical professionals they need.

Consultation Feedback:
After each appointment, patients can leave ratings and feedback based on criteria like communication and effectiveness. This helps improve transparency and guide future patients.

User Profiles & Booking:
Users need to sign up to book consultations, ensuring a personalized and secure experience.

🗂️ Project Structure
src/ – Main front-end source code

mock-server/ – Express-based mock backend storing data in JSON

public/ – Static assets like HTML templates and images

screenshots/ – App mockups and visuals

Configuration files – Includes .babelrc, webpack.config.js, Dockerfile, package.json, and more for setting up and managing the project environment

⚙️ Tech Stack
Front-End: React (with Webpack and Babel for bundling and transpiling)

Back-End: Mock JSON server built with Express and LowDB

Containerization: Docker for easy deployment and environment management

Package Management: npm (Node Package Manager)

🚀 Getting Started
To set up and run the project locally:

Clone the repository

git clone https://github.com/LCFEND/medical_app.git
cd medical_app
Install dependencies

npm install

Install mock server dependencies (run once)
npm install --prefix mock-server

Start the development server
npm start

By default, the app will be running at: http://localhost:3000

Mock JSON Server
----------------
To simulate the backend open new terminal to run the mock server in the project folder.
(you only need to do this once):

```
npm run mock-server
```

The mock server listens on port `8181` and stores data in `mock-server/db.json`.

