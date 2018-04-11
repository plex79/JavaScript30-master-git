let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    console.log(then, Date.now());
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
    
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;


  let spanNow = document.createElement("span");
  let spanPrev = document.createElement("span");
  spanNow.classList.add('now');
  spanPrev.classList.add('prev');

  spanNow.textContent = remainderSeconds;
  spanPrev.textContent = remainderSeconds -1 < 0 ? '0' : remainderSeconds -1;

  timerDisplay.appendChild(spanNow);
  timerDisplay.appendChild(spanPrev);


  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;



  //timerDisplay.textContent = display;
}



function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));




