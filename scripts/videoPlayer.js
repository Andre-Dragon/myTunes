import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const  videoVolume = document.querySelector('.video-volume');
  const videoIconOff = document.querySelector('.video-icon__off');
  const videoIconMax = document.querySelector('.video-icon__max');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0.9;
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const duration = videoPlayer.duration;
    const currentTime = videoPlayer.currentTime;
    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secoundsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secoundsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secoundsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secoundsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoPlayer.volume = 0.5;

  const maxVideoValue = () => videoVolume.value = videoPlayer.volume * 100;

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  });

  videoIconOff.addEventListener('click', () => {
    if (videoPlayer.volume) {
      videoPlayer.volume = 0;
    } else {
      videoPlayer.volume = 0.5;
    }
    maxVideoValue();
  });

  videoIconMax.addEventListener('click', () => {
    videoPlayer.volume = 1;
    maxVideoValue();
  });

  maxVideoValue();

  videoPlayerInit.stop = () => {
    if (!videoPlayer.paused) stopPlay();
  };

};