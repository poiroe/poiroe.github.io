const galleryContainer = document.getElementById('galleryContainer');
let page = 1;

// 替换成你的GitHub仓库信息
const repoOwner = 'poiroe';
const repoName = 'poiroe.github.io';
const folderPath = 'img';
const githubToken = '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'; // 替换成你的GitHub个人访问令牌

// 从GitHub获取图片链接的函数
async function fetchImagesFromGitHub() {
  // 替换成你实际的GitHub API调用
  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}?page=${page}&per_page=10`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
    },
  });
  const data = await response.json();
  const imageUrls = data.map(file => file.download_url);
  return imageUrls;
}

// 创建图片元素的函数
function createGalleryItem(imageUrl) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');

  const img = document.createElement('img');
  // 懒加载属性
  img.loading = 'lazy';
  img.src = imageUrl;
  // 根据需要添加alt文本

  galleryItem.appendChild(img);
  galleryContainer.appendChild(galleryItem);
}

// 加载图片的函数
async function loadImages() {
  const imageUrls = await fetchImagesFromGitHub();
  imageUrls.forEach(createGalleryItem);
  page++;
}

loadImages();

// 无限下拉
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});
