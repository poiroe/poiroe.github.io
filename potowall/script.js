const galleryContainer = document.getElementById('galleryContainer');
let page = 1;

// 替换成你的GitHub仓库信息
const repoOwner = 'poiroe';
const repoName = 'poiroe.github.io';
const folderPath = 'photowall/images'; // 替换成你存放图片的文件夹路径

// 从GitHub获取图片链接的函数
async function fetchImagesFromGitHub() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?page=${page}&per_page=10`);
    const data = await response.json();
    
    // Extract image URLs
    const imageUrls = data.map(file => file.download_url);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
    return [];
  }
}

// 创建图片元素的函数
function createGalleryItem(imageUrl, index) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid__item', 'grid-item'); // 添加 'grid-item' 类

  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');

  const a = document.createElement('a');
  a.href = imageUrl;
  a.setAttribute('data-lightbox', 'gallery'); // 设置 Lightbox2 的 data-lightbox 属性

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = imageUrl;

  // 将 img 添加到 a
  a.appendChild(img);

  // 将 a 添加到 galleryItem
  galleryItem.appendChild(a);

  // 将 galleryItem 添加到 gridItem
  gridItem.appendChild(galleryItem);

  // 将 gridItem 添加到 galleryContainer
  galleryContainer.appendChild(gridItem);

  // 添加 grid-item--width2 类
  if (index % 2 === 1) {
    gridItem.classList.add('grid-item--width2');
  }
}



// 加载图片的函数
async function loadImages() {
  const imageUrls = await fetchImagesFromGitHub();
  imageUrls.forEach((imageUrl, index) => createGalleryItem(imageUrl, index));
  page++;

  // 在 loadImages 函数异步操作完成后进行 Lightbox2 的初始化
  lightbox.init();

  // 刷新 Lightbox2，以确保新加载的图片被识别
  lightbox.refresh();

  // 手动刷新 Masonry 布局
  var $grid = $('.grid').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid__item',
    // use element for option
    columnWidth: '.grid__sizer',
    percentPosition: true
  });

  // layout Masonry after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.masonry('layout');
  });
}

// 在页面加载完毕时进行 Lightbox2 和 Masonry 的初始化
document.addEventListener('DOMContentLoaded', () => {
  loadImages();

  // 手动初始化 Lightbox2，并设置选项
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel': false  // 禁用显示图片计数信息
  });

  // 初始化 Masonry
  imagesLoaded(document.querySelector('.grid'), function () {
    var masonry = new Masonry('.grid', {
      itemSelector: '.grid__item',
      columnWidth: '.grid__sizer',
      percentPosition: true,
      transitionDuration: 0
    });
  });
});