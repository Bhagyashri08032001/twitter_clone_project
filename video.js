const video = document.getElementById("video");
const comments = document.getElementById("comments");

let lastTap = 0;
let tapCount = 0;

video.addEventListener("click", function(e) {
  const currentTime = new Date().getTime();
  const tapInterval = currentTime - lastTap;
  lastTap = currentTime;
  
  tapCount++;

  const rect = video.getBoundingClientRect();
  const x = e.clientX - rect.left; // click x relative to video
  const width = rect.width;
  
  const leftZone = width * 0.3;
  const rightZone = width * 0.7;

  // Detect double-tap (≤300ms)
  if(tapInterval < 300){
    if(x < leftZone){
      video.currentTime -= 10; // double-tap left → backward
    } else if(x > rightZone){
      video.currentTime += 10; // double-tap right → forward
    }
  } else {
    // Single tap in middle
    if(x >= leftZone && x <= rightZone && tapCount === 1){
      if(video.paused) video.play();
      else video.pause();
    }
  }

  // Triple tap logic
  if(tapCount === 3){
    if(x < leftZone){
      comments.style.display = "block"; // show comments
    } else if(x > rightZone){
      window.close(); // close website
    } else {
      alert("Next video (simulate)"); // next video
    }
    tapCount = 0; // reset tap count
  }

  // Reset tap count after 500ms to avoid sticky taps
  setTimeout(() => { tapCount = 0; }, 500);
});
