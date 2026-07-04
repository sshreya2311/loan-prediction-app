console.log("script.js loaded");

function showLoading() {
    return `
        <div class="spinner"></div>
        <p style="margin-top:10px;">Analyzing financial profile...</p>
    `;
}

async function predictLoan() {
    console.log("Predict button clicked");

    const age = document.getElementById("age").value;
    const income = document.getElementById("income").value;
    const loanAmount = document.getElementById("loan").value;
    const creditScore = document.getElementById("credit").value;

    const resultBox = document.getElementById("result");
    const button = document.querySelector("button");

    // Validation
    if (!age || !income || !loanAmount || !creditScore) {
        resultBox.innerHTML = `
            <div style="color:#ff4d4d;">
                ⚠️ Please fill all fields.
            </div>
        `;
        return;
    }

    try {
        // Loading state
        button.disabled = true;
        button.innerText = "Processing...";
        resultBox.innerHTML = showLoading();

        const response = await fetch("https://loan-prediction-app-v3up.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Age: Number(age),
                Income: Number(income),
                LoanAmount: Number(loanAmount),
                CreditScore: Number(creditScore)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Server error: " + response.status);
        }

        const isApproved = data.prediction === "Approved";
        const color = isApproved ? "#00C853" : "#D50000";
        const confidence = (data.probability * 100).toFixed(0);

        resultBox.innerHTML = `
            <div class="result-card">

                <h2 style="color:${color}; margin-bottom:15px;">
                    ${isApproved ? "✅ Loan Approved" : "❌ Loan Rejected"}
                </h2>

                <p><strong>Prediction:</strong> ${data.prediction}</p>

                <p><strong>Confidence Score:</strong> ${confidence}%</p>

                <div style="
                    width:100%;
                    height:12px;
                    background:#ddd;
                    border-radius:10px;
                    overflow:hidden;
                    margin-top:18px;
                ">
                    <div style="
                        width:${confidence}%;
                        height:100%;
                        background:${color};
                        transition:width 0.5s ease;
                    "></div>
                </div>

            </div>
        `;

    } catch (error) {
        console.error(error);

        resultBox.innerHTML = `
            <div style="color:#ff4d4d;">
                ❌ ${error.message}
            </div>
        `;
    } finally {
        button.disabled = false;
        button.innerText = "Predict";
    }
}
