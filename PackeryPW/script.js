const galleryContainer = document.getElementById('galleryContainer');
let page = 1;
let isLoading = false;

const repoOwner = 'poiroe';
const repoName = 'picx-images-hosting';
const folderPath = 'VRChat';

async function fetchImagesFromGitHub() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?page=${page}&per_page=4`);
    const data = await response.json();
    
    const imageUrls = data.map(file => {
      const fileName = encodeURIComponent(file.name);
      return `https://${repoOwner}.github.io/picx-images-hosting/${folderPath}/${fileName}`;
    });

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
    return [];
  }
}


function changeLoadingRingColor() {
  const loadingRing = document.getElementById('loadingRing');
  let colorIndex = 0;
  const colorValues = [
    { r: 161, g: 189, b: 255 },
    { r: 161, g: 189, b: 255 },
    { r: 161, g: 189, b: 255}
  ];

  function changeBoxShadowColor() {
    const currentColor = colorValues[colorIndex];
    const newColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.8)`;
    loadingRing.style.setProperty('--box-shadow-color', newColor);
    loadingRing.style.setProperty('--ring-color', newColor);

    colorValues[colorIndex].r = Math.min(currentColor.r + 5, 255);
    colorValues[colorIndex].g = Math.min(currentColor.g + 5, 255);
    colorValues[colorIndex].b = Math.min(currentColor.b + 5, 255);

    if (currentColor.r === 255 && currentColor.g === 255 && currentColor.b === 255) {
      colorIndex = (colorIndex + 1) % colorValues.length;
    }
  }

  setInterval(changeBoxShadowColor, 100);
}

function createGalleryItem(imageUrl, index) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid__item', 'grid-item');

  const link = document.createElement('a');
  link.href = imageUrl;
  link.setAttribute('data-fancybox', 'gallery');

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = imageUrl;

  link.appendChild(img);
  gridItem.appendChild(link);
  galleryContainer.appendChild(gridItem);

  if (index % 2 === 1) {
    gridItem.classList.add('grid-item--width2');
  }
}

async function loadImages() {
  if (isLoading) {
    return;
  }

  isLoading = true;

  try {
    const imageUrls = await fetchImagesFromGitHub();
    const uniqueImageUrls = imageUrls.filter(url => !loadedImages.has(url));

    uniqueImageUrls.forEach((imageUrl, index) => {
      createGalleryItem(imageUrl, index);
      const newItem = galleryContainer.lastElementChild;
      newItem.style.transition = 'none';
      loadedImages.add(imageUrl);
    });

    page++;

    $grid = $('.grid').packery({
      itemSelector: '.grid__item',
      percentPosition: true
    });

    $grid.imagesLoaded().progress(function () {
      $grid.packery('layout');
    });

    setTimeout(() => {
      galleryContainer.querySelectorAll('.grid__item').forEach(item => {
        item.style.transition = '';
      });
    }, 0);
  } finally {
    isLoading = false;
  }
}

// 保留已加载的图片的集合
let loadedImages = new Set();

// 颜色变换
changeLoadingRingColor();

// 初始化加载
loadImages();

// 延时后关闭加载动画
setTimeout(() => {
  document.getElementById('loadingOverlay').style.display = 'none';
}, 3500);

// 延时五秒后删除 overflow-Y: hidden
setTimeout(() => {
  document.body.style.overflowY = 'visible';
}, 3500);

// 在滚动到页面底部时调用 loadImages
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});
