// Select DOM elements
const form = document.getElementById('bookmark-form');
const siteNameInput = document.getElementById('site-name');
const siteUrlInput = document.getElementById('site-url');
const bookmarkList = document.getElementById('bookmark-list');

// Load bookmarks from localStorage
function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarks') || '[]');
}

// Save bookmarks to localStorage
function setBookmarks(bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Render bookmarks
function renderBookmarks() {
  const bookmarks = getBookmarks();
  bookmarkList.innerHTML = '';
  bookmarks.forEach((bookmark, idx) => {
    const li = document.createElement('li');
    li.className = 'bookmark-item';
    li.innerHTML = `
      <a href="${bookmark.url}" class="bookmark-link" target="_blank">${bookmark.name}</a>
      <button class="delete-btn" data-idx="${idx}">Delete</button>
    `;
    bookmarkList.appendChild(li);
  });
}

// Add bookmark
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = siteNameInput.value.trim();
  const url = siteUrlInput.value.trim();
  if (!name || !url) return;
  const bookmarks = getBookmarks();
  bookmarks.push({ name, url });
  setBookmarks(bookmarks);
  renderBookmarks();
  form.reset();
});

// Delete bookmark
bookmarkList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const idx = e.target.getAttribute('data-idx');
    const bookmarks = getBookmarks();
    bookmarks.splice(idx, 1);
    setBookmarks(bookmarks);
    renderBookmarks();
  }
});

// Initial render
renderBookmarks();

// Add tag field to form
const tagInput = document.createElement('input');
tagInput.type = 'text';
tagInput.id = 'site-tag';
tagInput.placeholder = 'Tags (comma-separated)';
form.insertBefore(tagInput, form.lastElementChild);

// Modify save logic
bookmarks.push({
    name, 
    url,
    tags: tagInput.value.split(',').map(tag => tag.trim())
});
