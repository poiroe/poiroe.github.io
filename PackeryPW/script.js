const galleryContainer = document.getElementById('galleryContainer');
let page = 1;
let isLoading = false;

const repoOwner = 'poiroe';
const repoName = 'picx-images-hosting';
const folderPath = 'VRChat';

async function fetchImagesFromGitHub() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?page=${page}&per_page=10`);
    const data = await response.json();
    
    const imageUrls = data.map(file => {
      const fileName = encodeURIComponent(file.name);
      return `https://cdn.jsdelivr.us/gh/poiroe/picx-images-hosting/${folderPath}/${fileName}`;
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


/* 创建属性 */
function createGalleryItem(imageUrl, index) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid__item', 'grid-item');

  const link = document.createElement('a');
  link.href = imageUrl;
  link.setAttribute('data-fancybox', 'gallery');

  const img = document.createElement('img');
  img.loading = 'lazy'; // 添加 lazy loading
  img.setAttribute('data-src', imageUrl);  // 存储真实图片路径到 data-src
  img.src = 'https://pic.imgdb.cn/item/65610e96c458853aefb72b48.webp'; // 占位图路径

  link.appendChild(img);
  gridItem.appendChild(link);
  galleryContainer.appendChild(gridItem);

  if (index % 2 === 1) {
    gridItem.classList.add('grid-item--width2');
  }

  // 添加监听器，当图片进入用户视野时触发加载
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 图片进入视野，将 data-src 替换为实际图片路径
        img.src = img.getAttribute('data-src');
		  // 图片进入视野，触发布局
		  $grid.packery('layout');
        // 停止监听，因为图片已经加载
        observer.unobserve(img);
      }
    });
  });

  // 开始监听
  observer.observe(img);
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

$grid.imagesLoaded().done(function () {
  console.log('All images have been successfully loaded!');
  $grid.packery('layout');
}).progress(function () {
  console.log('An image has been loaded!');
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
}, 7000);

setTimeout(() => {
  document.getElementById('loadingOverlayB').style.display = 'none';
}, 3000);

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

// 延迟显示body
setTimeout(() => {
  const bodyDisplay = document.getElementById('bodydisplay');
  bodyDisplay.style.visibility = 'visible';
  bodyDisplay.style.opacity = '1';
}, 5000);



setTimeout(function() {
  var style = document.createElement('style');
  style.textContent = '@font-face {' +
    'font-family: "Bree Serif";' +
    'src: url("https://lib.baomitu.com/fonts/bree-serif/bree-serif-regular.woff2") format("woff2"), ' +
         'url("https://lib.baomitu.com/fonts/bree-serif/bree-serif-regular.woff") format("woff"), ' +
         'url("https://lib.baomitu.com/fonts/bree-serif/bree-serif-regular.ttf") format("truetype");' +
    'font-weight: normal;' +
    'font-style: normal;' +
  '}';
  document.head.appendChild(style);
}, 5000); // 在这里设置延迟的时间，单位为毫秒