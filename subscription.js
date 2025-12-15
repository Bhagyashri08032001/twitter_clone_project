const payBtn = document.getElementById("payBtn");
const planSelect = document.getElementById("planSelect");
const status = document.getElementById("status");
const invoice = document.getElementById("invoice");

payBtn.addEventListener("click", () => {
  const plan = planSelect.value;
  const now = new Date();
  const hour = now.getHours();

  // Payment time check 10-11 AM
  if(hour < 10 || hour >= 11){
    status.innerText = "Payment allowed only between 10 AM – 11 AM IST ❌";
    return;
  }

  let amount, tweetsAllowed;
  switch(plan){
    case "free":
      amount = 0; tweetsAllowed = 1; break;
    case "bronze":
      amount = 100; tweetsAllowed = 3; break;
    case "silver":
      amount = 300; tweetsAllowed = 5; break;
    case "gold":
      amount = 1000; tweetsAllowed = "Unlimited"; break;
  }

  status.innerText = "Payment Successful ✔️";

  // Simulate sending email invoice
  invoice.innerText = `Invoice:
Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}
Amount: ₹${amount}
Tweets Allowed: ${tweetsAllowed}
Email sent successfully! 📧`;
});
