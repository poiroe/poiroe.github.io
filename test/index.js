(function() {

  const videoBox = document.querySelector('.video-box'),
    videoContent = videoBox.querySelector('.video-content'),
    pauseIcon = videoBox.querySelector('.pause-icon'),
    videoMain = videoBox.querySelector('.video-main'),
    playBtn = videoBox.querySelector('.play-btn'),
    fullScreenBtn = videoBox.querySelector('.full-screen-btn'),
    progressBarBox = videoBox.querySelector('.progress-bar-box'),
    progressBarMain = videoBox.querySelector('.progress-bar-main'),
    progressBarLoad = videoBox.querySelector('.progress-bar-load');

    // 总的视频时长（整数）
    let totalT = 0;

    // 设置视频路径
    videoMain.src = '../m3u8/2.mp4';

    // 可以播放
    videoMain.addEventListener('canplay', () => {
      videoBox.style.display = 'block';
      totalT = Math.floor(videoMain.duration) || 0;
    });

    // 视频错误
    videoMain.addEventListener('error', () => {
      alert('获取视频源出错！！！');
    });

    videoMain.addEventListener('timeupdate', () => {
      progressBarMain.style.width = `${Math.floor(videoMain.currentTime) / totalT * 100}%`;
      progressBarLoad.style.width = `${Math.floor(videoMain.buffered.end(0)) / totalT * 100}%`;
    });

    progressBarBox.addEventListener('click', (event) => {
      const x = event.offsetX;
      const totalW = progressBarBox.offsetWidth;
      videoMain.currentTime = x / totalW * totalT;
      progressBarMain.style.width = `${Math.floor(videoMain.currentTime) / totalT * 100}%`;
    });

    videoMain.addEventListener('play', () => {
      playBtn.textContent = 'pause_circle_outline';
      pauseIcon.style.display = 'none';
    });

    videoMain.addEventListener('pause', () => {
      playBtn.textContent = 'play_circle_outline';
      pauseIcon.style.display = 'block';
    });

    videoMain.addEventListener('click', () => {
      if(!!videoMain.paused) {
        videoMain.play();
      } else {
        videoMain.pause();
      }
    });

    playBtn.addEventListener('click', () => {
      if(!!videoMain.paused) {
        videoMain.play();
      } else {
        videoMain.pause();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if(document.fullscreenElement) {
        fullScreenBtn.textContent = 'fullscreen_exit';
      } else {
        fullScreenBtn.textContent = 'fullscreen';
      }
    });

    fullScreenBtn.addEventListener('click', () => {
      if(!document.fullscreenElement) {
        videoContent.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

})();