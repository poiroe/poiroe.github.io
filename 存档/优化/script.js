

/* // 按钮点击事件监听器
document.getElementById('switchToGame').addEventListener('click', async function() {
  console.log('Switching to Game-G');
  folderPath = 'Game-G';
  console.log('FolderPath:', folderPath);

  // 获取新文件夹的图片
  const images = await fetchImagesFromGitHub();
  console.log('Fetched images:', images);

  // 更新图片墙
  await updateImageWall(images);

  document.getElementById('switchToGame').blur();

});


document.addEventListener('DOMContentLoaded', function() {
  var switchToGame = document.getElementById('switchToGame');

  switchToGame.addEventListener('click', function() {
    // 在按钮点击时输出日志
    console.log('按钮被点击，等待1秒后触发布局');
	  // 移除按钮焦点
  this.blur();

    // 延迟1秒后触发布局
    setTimeout(function() {
      $grid.packery('layout');
      console.log('布局已触发');
    }, 2000); // 1秒的延迟时间
  });
});




// updateImageWall定义
async function updateImageWall(images) {
  const galleryContainer = document.getElementById('galleryContainer');

// 获取所有现有的 grid__sizer 元素
const existingItems = galleryContainer.querySelectorAll('.grid__sizer');

// 跳过前三个元素
const itemsToKeep = Array.from(existingItems).slice(1);

// 清空现有元素的内容
itemsToKeep.forEach(item => {
  item.innerHTML = '';
});


  // 删除所有 Fancybox 容器
  $('.fancybox__container').remove();



  // 遍历新的图片数组，创建新的 grid__item 元素
  images.forEach(imageUrl => {
    createGalleryItem(imageUrl);
  });

  // 重新初始化 Packery Fancybox
  Fancybox.bind('[data-fancybox]', {
        // Your custom options
      }); 
} */

  // 动态颜色
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




// 颜色变换
changeLoadingRingColor();


/* setTimeout(function() {
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
}, 5000); // 在这里设置延迟的时间，单位为毫秒 */