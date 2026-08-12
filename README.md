#  Loan Prediction System

A machine learning-based web application that predicts whether a loan application is likely to be **approved or rejected** based on applicant information.

The system uses a **Decision Tree Classifier** to analyze user-provided financial and personal information and generates both a loan prediction and a confidence score.

##  Features

* Predicts **Loan Approval / Rejection**
* Displays a **Confidence Score**
* Interactive and user-friendly web interface
* Real-time prediction through a deployed application
* Machine learning model integrated with a Flask backend
* Separate frontend and backend deployment

##  Technologies Used

### Machine Learning & Backend

* Python
* Flask
* Scikit-learn
* Decision Tree Classifier

### Frontend

* HTML
* CSS
* JavaScript

### Deployment

* Render — Backend API
* Netlify — Frontend

##  Machine Learning Model

The application uses a **Decision Tree Classifier** to predict loan approval based on the following input features:

* Age
* Income
* Loan Amount
* Credit Score

### Prediction Output

The model returns:

* **Loan Status:** Approved / Rejected
* **Confidence Score:** Prediction confidence percentage

##  How It Works

```text
User Input
    ↓
Frontend Interface
    ↓
Flask Backend API
    ↓
Decision Tree Classifier
    ↓
Loan Prediction
    ↓
Confidence Score
    ↓
Result Displayed to User
```

##  Live Demo

### Frontend

🔗 [Loan Prediction System](https://6a49659e724ad50d730d83ef--papaya-mochi-102f37.netlify.app/)

### Backend API

🔗 [Backend API](https://loan-prediction-app-v3up.onrender.com/)

> The backend is deployed as a REST API and is accessed by the frontend to generate loan predictions.

##  GitHub Repository

🔗 [View Source Code](https://github.com/sshreya2311/loan-prediction-app)


##  Future Improvements

* Compare multiple machine learning algorithms
* Improve model performance through hyperparameter tuning
* Add additional applicant features
* Improve data validation and error handling
* Add model performance visualizations
* Enhance the user interface


