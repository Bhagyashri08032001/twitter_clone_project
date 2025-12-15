let requestMade = false; // Track daily request

const requestBtn = document.getElementById("requestBtn");
const status = document.getElementById("status");
const newPassword = document.getElementById("newPassword");

function generateRandomPassword(length=8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";
  for(let i=0; i<length; i++){
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

requestBtn.addEventListener("click", () => {
  if(requestMade){
    status.innerText = "You can request password reset only once per day ❌";
    return;
  }

  const input = document.getElementById("emailPhone").value;
  if(!input){
    status.innerText = "Please enter Email or Phone ❌";
    return;
  }

  requestMade = true;
  status.innerText = "Password reset successful ✔️";
  const password = generateRandomPassword();
  newPassword.innerText = "Your new password: " + password;
});
