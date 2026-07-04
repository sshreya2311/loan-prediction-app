from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)

# ✅ Allow frontend requests
CORS(app, resources={r"/*": {"origins": "*"}})

# ✅ Load trained model
model = joblib.load("model.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # ✅ Use DataFrame to avoid sklearn warning
        features = pd.DataFrame([{
            "Age": float(data["Age"]),
            "Income": float(data["Income"]),
            "LoanAmount": float(data["LoanAmount"]),
            "CreditScore": float(data["CreditScore"])
        }])

        # ✅ Prediction
        prediction = model.predict(features)[0]

        # ✅ Probability
        probability = model.predict_proba(features)[0][1]

        # ✅ Final result
        result = "Approved" if prediction == 1 else "Rejected"

        return jsonify({
            "prediction": result,
            "probability": round(float(probability), 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# ✅ Health check route (important for deployment)
@app.route("/")
def home():
    return "Loan Prediction API is running"


# ✅ Required for Render deployment
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)