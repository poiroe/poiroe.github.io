
// loadingOverlay触发淡出倒计时 
 var loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.add('fadeIn');

  setTimeout(function() {
    fadeOutLoadingOverlay();
  }, 3500);

function fadeOutLoadingOverlay() {
  var loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.remove('fadeIn');
  loadingOverlay.classList.add('fadeOut');
}

// 延时后关闭加载动画
setTimeout(() => {
  document.getElementById('loadingOverlay').style.display = 'none';
}, 4000);

setTimeout(() => {
  document.getElementById('loadingOverlayB').style.display = 'none';
}, 2000);


// 延时显示滚动条 overflow-Y: hidden
setTimeout(() => {
  document.body.style.overflowY = 'visible';
}, 4000);

// 延迟显示body
setTimeout(() => {
  const bodyDisplay = document.getElementById('bodydisplay');
  bodyDisplay.style.visibility = 'visible';
  bodyDisplay.style.opacity = '1';
}, 4000);
