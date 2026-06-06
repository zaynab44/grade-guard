# GradeGuard — AI-Powered Grade Calculator

GradeGuard is a web application that helps university students calculate exactly what marks they need in their final exams to pass or achieve their target grade.

## Overview

Enter your current marks for each subject along with the total marks available in finals. GradeGuard analyzes your academic standing and provides personalized advice on what you need to score to pass, get a B, or achieve an A.

## Features

- Add multiple subjects at once
- Enter current marks and final exam weightage
- AI calculates minimum required marks for passing
- Shows marks needed for Grade A and Grade B
- Identifies which subjects need most attention
- Personalized academic advice for each subject
- Clean dark themed interface

## Tech Stack

- Python
- Flask
- Groq API — LLaMA 3.3 70B
- HTML, CSS, JavaScript

## Getting Started

Clone the repository and navigate to the project folder.

Install dependencies:
pip install flask flask-cors groq python-dotenv

Create a .env file and add your Groq API key:
GROQ_API_KEY=your_key_here

Run the application:
python app.py

Open in browser:
http://localhost:5000

## Grading System

- Passing: 50% and above
- Grade B: 65% and above
- Grade A: 80% and above

## API Key

Get a free Groq API key at https://console.groq.com

## Author

Zainab
BS Information Technology
University of Lahore