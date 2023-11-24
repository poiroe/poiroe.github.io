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