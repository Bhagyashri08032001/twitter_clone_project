let mediaRecorder;
let audioChunks = [];
let recordedBlob;

const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");

// START Recording
recordBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    status.innerText = "Recording...";
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = e => {
      recordedBlob = new Blob(audioChunks, { type: 'audio/mp3' });

      // Check size
      if (recordedBlob.size > 100*1024*1024) {
        status.innerText = "Audio too large! Max 100MB ❌";
        downloadLink.style.display = "none";
        return;
      }

      // Check length
      const audioUrl = URL.createObjectURL(recordedBlob);
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        const duration = audio.duration; // in seconds
        if (duration > 300) {
          status.innerText = "Audio too long! Max 5 minutes ❌";
          downloadLink.style.display = "none";
        } else {
          downloadLink.href = audioUrl;
          downloadLink.download = "tweet_audio.mp3";
          downloadLink.style.display = "block";
          status.innerText = "Recording stopped. You can download now.";
        }
      };
    };

    recordBtn.disabled = true;
    stopBtn.disabled = false;
  } catch(err) {
    status.innerText = "Microphone access denied ❌";
  }
});

// STOP Recording
stopBtn.addEventListener("click", () => {
  if(mediaRecorder) mediaRecorder.stop();
  recordBtn.disabled = false;
  stopBtn.disabled = true;
});

// UPLOAD Audio (2 PM – 7 PM IST)
uploadBtn.addEventListener("click", () => {
  if(!recordedBlob) {
    status.innerText = "No audio recorded yet ❌";
    return;
  }

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // IST check: 2 PM = 14, 7 PM = 19
  if(hour < 14 || hour > 19) {
    status.innerText = "Audio upload allowed only 2 PM – 7 PM IST ❌";
    return;
  }

  // Simulate upload
  status.innerText = "Audio uploaded successfully ✔️";
  // TODO: Integrate backend or storage API
});

let generatedOtp;

// Simulate sending OTP
function sendOtp() {
  generatedOtp = Math.floor(100000 + Math.random() * 900000); // 6 digit
  console.log("OTP sent to email:", generatedOtp);
  status.innerText = "OTP sent to your email. Check console for simulation.";
  document.getElementById("otpInput").style.display = "inline";
  document.getElementById("verifyOtpBtn").style.display = "inline";
}

// Upload button click
uploadBtn.addEventListener("click", () => {
  if(!recordedBlob) {
    status.innerText = "No audio recorded yet ❌";
    return;
  }

  const now = new Date();
  const hour = now.getHours();

  if(hour < 14 || hour > 19) {
    status.innerText = "Audio upload allowed only 2 PM – 7 PM IST ❌";
    return;
  }

  sendOtp();
});

// Verify OTP
document.getElementById("verifyOtpBtn").addEventListener("click", () => {
  const userOtp = document.getElementById("otpInput").value;
  if(userOtp == generatedOtp) {
    status.innerText = "OTP verified. Audio uploaded successfully ✔️";
    document.getElementById("otpInput").style.display = "none";
    document.getElementById("verifyOtpBtn").style.display = "none";
    // TODO: real upload to backend
  } else {
    status.innerText = "Wrong OTP ❌ Try again";
  }
});
