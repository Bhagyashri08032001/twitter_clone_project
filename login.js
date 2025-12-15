const loginBtn = document.getElementById("loginBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpInput = document.getElementById("otpInput");
const status = document.getElementById("status");
const loginInfo = document.getElementById("loginInfo");

let generatedOtp;

// Detect browser
function getBrowser() {
  const userAgent = navigator.userAgent;
  if(userAgent.includes("Chrome")) return "Chrome";
  if(userAgent.includes("Edg")) return "Edge";
  if(userAgent.includes("Firefox")) return "Firefox";
  return "Other";
}

// Detect device
function getDevice() {
  const ua = navigator.userAgent;
  if(/Mobi|Android/i.test(ua)) return "Mobile";
  return "Desktop";
}

// Simulate IP fetch (public API)
async function getIP(){
  try{
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch(e){
    return "127.0.0.1"; // fallback
  }
}

// Send OTP
function sendOtp(){
  generatedOtp = Math.floor(100000 + Math.random()*900000);
  console.log("OTP sent to email:", generatedOtp);
  status.innerText = "OTP sent to your email. Check console for simulation.";
  otpInput.style.display = "inline";
  verifyOtpBtn.style.display = "inline";
}

// Login button click
loginBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  if(!username){
    status.innerText = "Enter username ❌";
    return;
  }

  const browser = getBrowser();
  const device = getDevice();
  const ip = await getIP();
  const now = new Date();
  const hour = now.getHours();

  loginInfo.innerHTML = `Browser: ${browser}<br>Device: ${device}<br>IP: ${ip}`;

  // Rules
  if(device === "Mobile" && (hour < 10 || hour > 13)){
    status.innerText = "Mobile login allowed only 10 AM – 1 PM IST ❌";
    return;
  }

  if(browser === "Chrome"){
    sendOtp();
  } else if(browser === "Edge"){
    status.innerText = "Login successful without OTP ✔️";
  } else {
    status.innerText = "Login successful ✔️";
  }
});

// Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const userOtp = otpInput.value;
  if(userOtp == generatedOtp){
    status.innerText = "OTP verified. Login successful ✔️";
    otpInput.style.display = "none";
    verifyOtpBtn.style.display = "none";
  } else {
    status.innerText = "Wrong OTP ❌ Try again";
  }
});
