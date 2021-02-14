'use strict';

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const LIST_ALBUM_CLASS = 'list-album';
const LIST_ALBUM_SELECTOR = '.' + LIST_ALBUM_CLASS;

const listAlbumTemplate = document.querySelector('#list-album-template').innerHTML;
const listPhotoTemplate = document.querySelector('#list-photo-template').innerHTML;
const albumListEl = document.querySelector('#list-albums-id');
const photoListEl = document.querySelector('#list-photos-id');

let albumList = [];

albumListEl.addEventListener('click', onListAlbumClick);

init();

function init() {
  fetchAlbums();
}

function onListAlbumClick(event) {
  const albumId = getTaskElement(event.target);
  if (event.target.classList.contains(LIST_ALBUM_CLASS)) {
    fetchPhotos(+albumId.dataset.id);
  }
}

function getTaskElement(el) {
  return el.closest(LIST_ALBUM_SELECTOR);
}

function fetchAlbums() {
  fetch(ALBUMS_URL)
  .then(response => response.json())
  .then(setAlbums)
  .then(renderAlbums)
  .then(getFirstAlbumId)
  .then(fetchPhotos)
  .catch((error) => console.error(error));
}

function fetchPhotos(albumId) {
  fetch(PHOTOS_URL + albumId)
  .then(response => response.json())
  .then(renderPhotos)
  .catch((error) => console.error(error));
}

function setAlbums(list) {
  return (albumList = list)
}

function getFirstAlbumId() {
  return albumList.find((album) => !!album).id;
}

function renderAlbums(list) {
  const html = list.map(getAlbumHtml).join('');
  albumListEl.innerHTML = html;
}

function getAlbumHtml(album) {
  return listAlbumTemplate
    .replace('{{text}}', album.title)
    .replace('{{id}}', album.id);
}

function renderPhotos(list) {
  const html = list.map(getPhotoHtml).join('');
  photoListEl.innerHTML = html;
}

function getPhotoHtml(photo) {
  return listPhotoTemplate
    .replace('{{id}}', photo.id)
    .replace('{{big-photo}}', photo.url)
    .replace('{{small-photo}}', photo.thumbnailUrl);
}