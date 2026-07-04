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

    // 🔥 Validation
    if (!age || !income || !loanAmount || !creditScore) {
        resultBox.innerHTML = `
            <div style="color:#ff4d4d;">
                ⚠️ Please fill all fields
            </div>
        `;
        return;
    }

    try {
        // 🔄 UI loading state
        button.disabled = true;
        button.innerText = "Processing...";

        resultBox.innerHTML = showLoading();

        const response = await fetch("http://127.0.0.1:5000/predict", {
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

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        const isApproved = data.prediction === "Approved";
        const color = isApproved ? "#00ff88" : "#ff4d4d";

        // 🔥 Result UI
        resultBox.innerHTML = `
            <div class="result-card">

                <h2 style="color:${color}; margin-bottom:10px;">
                    ${data.prediction}
                </h2>

                <p>
                    Confidence Score: 
                    <b>${data.probability}</b>
                </p>

                <h4 style="margin-top:15px;">Decision Factors:</h4>

                <ul style="text-align:left;">
                    ${data.reasons.map(reason => `<li>${reason}</li>`).join("")}
                </ul>

                <div class="progress">
                    <div class="progress-bar" style="
                        width:${data.probability * 100}%;
                        background:${color};
                    "></div>
                </div>

            </div>
        `;

    } catch (error) {
        console.error(error);

        resultBox.innerHTML = `
            <div style="color:#ff4d4d;">
                ❌ Error: ${error.message}
            </div>
        `;

    } finally {
        // 🔄 Reset button
        button.disabled = false;
        button.innerText = "Predict";
    }
}