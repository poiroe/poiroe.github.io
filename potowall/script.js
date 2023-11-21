const galleryContainer = document.getElementById('galleryContainer');
let page = 1;

async function fetchImages() {
  const response = await fetch(`https://api.unsplash.com/photos/?page=${page}&client_id=YOUR_UNSPLASH_API_KEY`);
  const data = await response.json();
  return data;
}

function createGalleryItem(photo) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');

  const img = document.createElement('img');
  img.src = photo.urls.small;
  img.alt = photo.alt_description;

  galleryItem.appendChild(img);
  galleryContainer.appendChild(galleryItem);
}

async function loadImages() {
  const images = await fetchImages();
  images.forEach(createGalleryItem);
  page++;
}

loadImages();

// Infinite scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});
