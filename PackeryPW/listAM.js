// 拉取github仓库图片列表
const galleryContainer = document.getElementById('galleryContainer');
let page = 1;
let isLoading = false;

const repoOwner = 'poiroe';
const repoName = 'picx-images-hosting';
let folderPath = 'A&M';

async function fetchImagesFromGitHub() {
  try {
    const response = await fetch(`https://raw.gitmirror.com/poiroe/poiroe.github.io/main/PackeryPW/list/a&m.json`);
    const data = await response.json();
    
    const imageUrls = data.map(file => {
      const fileName = encodeURIComponent(file.name);
      return `https://jsd.cdn.zzko.cn/gh/poiroe/picx-images-hosting/${folderPath}/${fileName}`;
    });

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
    return [];
  }
}

/* 创建属性 */
function createGalleryItem(imageUrl, index) {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid__item', 'grid-item');
	
	  if (index % 2 === 1) {
    gridItem.classList.add('grid-item--width2');
  }

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
}, { once: true });


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
  console.log('藏到你们永远无法找到的代码里');
  $grid.packery('layout');
}).progress(function () {
  console.log('总是徘徊在孤独与痛苦之间 把自己的内心藏到毫无表情的面具下');
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

// 初始化加载
loadImages();

// 在滚动到页面底部时调用 loadImages
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});