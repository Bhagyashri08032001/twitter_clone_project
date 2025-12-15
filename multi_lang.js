const langSelect = document.getElementById("langSelect");
const switchBtn = document.getElementById("switchBtn");
const status = document.getElementById("status");
const content = document.getElementById("content");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

let generatedOtp;
let selectedLang;

// Simulate sending OTP
function sendOtp(method){
  generatedOtp = Math.floor(100000 + Math.random() * 900000); // 6 digit
  console.log(`OTP sent via ${method}:`, generatedOtp);
  status.innerText = `OTP sent via ${method}. Check console for simulation.`;
  otpInput.style.display = "inline";
  verifyOtpBtn.style.display = "inline";
}

// Switch button click
switchBtn.addEventListener("click", () => {
  selectedLang = langSelect.value;

  if(selectedLang === "french"){
    sendOtp("Email");
  } else {
    sendOtp("Mobile");
  }
});

// Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const userOtp = otpInput.value;
  if(userOtp == generatedOtp){
    status.innerText = `Language switched to ${selectedLang.toUpperCase()} ✔️`;
    otpInput.style.display = "none";
    verifyOtpBtn.style.display = "none";

    // Sample translation
    switch(selectedLang){
      case "hindi": content.innerText = "नमस्ते! यह नमूना सामग्री है।"; break;
      case "spanish": content.innerText = "¡Hola! Este es contenido de muestra."; break;
      case "french": content.innerText = "Bonjour! Ceci est un contenu d'exemple."; break;
      case "portuguese": content.innerText = "Olá! Este é um conteúdo de exemplo."; break;
      case "chinese": content.innerText = "你好！这是示例内容。"; break;
      default: content.innerText = "Hello! This is sample content."; break;
    }

  } else {
    status.innerText = "Wrong OTP ❌ Try again";
  }
});
