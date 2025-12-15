let tweetCount = 0;
let follows = 2; // change this number to test
let maxTweets;

function postTweet() {
  // Determine max tweets based on follows
  if (follows === 0) {
    maxTweets = 1;
  } else if (follows >= 2 && follows <= 10) {
    maxTweets = 2;
  } else if (follows > 10) {
    maxTweets = Infinity; // unlimited
  }

  // Time check
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let isAllowedTime = hour === 10 && minute >= 0 && minute <= 30;

  if (!isAllowedTime) {
    document.getElementById("result").innerText =
      "You can tweet only between 10:00 – 10:30 AM ❌";
    return;
  }

  if (tweetCount >= maxTweets) {
    document.getElementById("result").innerText =
      "Tweet limit reached ❌";
    return;
  }

  tweetCount++;
  document.getElementById("result").innerText = "Tweet Posted ✔️";
  document.getElementById("count").innerText = "Tweets today: " + tweetCount;
}
