const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const albumArt = document.getElementById('albumArt');

// Toggle Play / Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.innerText = '⏸';
      albumArt.classList.add('playing'); // Sisimulan ang soft pulse animation
    }).catch((err) => {
      console.log('Play blocked:', err);
    });
  } else {
    audio.pause();
    playBtn.innerText = '▶';
    albumArt.classList.remove('playing'); // Ihihinto ang pulse
  }
});

// Update Progress Bar & Time
audio.addEventListener('timeupdate', () => {
  const { duration, currentTime } = audio;
  if (isNaN(duration) || !duration) return;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Format Current Time
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

  // Format Total Duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
  durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
});

// Reset animation kapag natapos ang kanta
audio.addEventListener('ended', () => {
  playBtn.innerText = '▶';
  albumArt.classList.remove('playing');
  progress.style.width = '0%';
});
                       
