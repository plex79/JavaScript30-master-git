const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const timer = player.querySelector('.timer');

//timer.textContent = parseFloat(video.duration);

function togglePlay() {
    if(video.paused) {
        video.play();
        //toggle.innerHTML = '❚❚';
    } else {
        video.pause();
        //toggle.innerHTML = '►';
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

    //time
    let time = video.currentTime;

    let min = Math.floor(time / 60);
    let sec = Math.floor((time - min * 60));

    if (min < 10) {
        min = '0'+min;
    } else {
        min = min;
    }
    if (sec < 10) {
        sec = '0'+sec;
    } else {
        sec = sec;
    }
    

    //videoTime = min.substr(-2) + ":" + sec.substr(-2);
    
    timer.textContent = min + ":" + sec;

    
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(e.offsetX, progress.offsetWidth, video.duration);
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button) => {
    button.addEventListener('click', skip);
})

// ranges.forEach((range) => {
//     range.addEventListener('change', handleRangeUpdate);
// })
ranges.forEach((range) => {
    range.addEventListener('input', handleRangeUpdate);
})

progress.addEventListener('click', scrub);

