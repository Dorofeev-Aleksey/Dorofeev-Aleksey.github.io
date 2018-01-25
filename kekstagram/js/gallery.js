'use strict';

(function () {
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  var picturesList = document.querySelector('.pictures');
  var filterForm = document.querySelector('.filters');
  var pictureItems = document.querySelectorAll('.picture');

  var sortFilterLikes = function (pictures) {
    var sortedArray = pictures;
    sortedArray.sort(function (first, second) {
      return second.likes - first.likes;
    });
    return sortedArray;
  };

  var sortFilterComments = function (pictures) {
    var sortedArray = pictures;
    sortedArray.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return sortedArray;
  };

  var sortFilterRandomize = function (pictures) {
    var sortedArray = pictures;
    sortedArray.sort(function () {
      return Math.random() - 0.5;
    });
    return sortedArray;
  };

  var changeFilterSort = function (pictures) {
    var filterSortElements = document.querySelectorAll('.filters input[type="radio"]');
    for (var i = 0; i < filterSortElements.length; i++) {
      if (filterSortElements[i].checked) {
        var filter = filterSortElements[i].value;
        var filterSort;

        switch (filter) {
          case 'recommend':
            filterSort = pictures;
            break;
          case 'popular':
            filterSort = sortFilterLikes(pictures);
            break;
          case 'discussed':
            filterSort = sortFilterComments(pictures);
            break;
          case 'random':
            filterSort = sortFilterRandomize(pictures);
            break;
        }
        break;
      }
    }
    return filterSort;
  };

  var closeSlider = function () {
    galleryOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', sliderEscPressHandler);
  };

  var sliderEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeSlider);
  };

  var openSlider = function () {
    galleryOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', sliderEscPressHandler);
  };

  var openPhotoHandler = function (evt) {
    evt.preventDefault();
    var el = evt.currentTarget.children[0];
    window.preview.renderMainPhoto(el, window.pictures);
    openSlider();
  };

  var cleanOldPictures = function () {
    pictureItems.forEach(function (element) {
      element.removeEventListener('click', openPhotoHandler);
    });
    picturesList.innerHTML = '';
  };

  var insertingNewPictures = function () {
    var pictures = changeFilterSort(window.pictures.slice());
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (element) {
      fragment.appendChild(window.picture.renderPhoto(element));
    });
    picturesList.appendChild(fragment);
  };

  var updatePictures = function () {
    cleanOldPictures();
    insertingNewPictures();
    pictureItems = document.querySelectorAll('.picture');
    pictureItems.forEach(function (element) {
      element.addEventListener('click', openPhotoHandler);
    });
  };

  var successRenderPhotoHandler = function (pictures) {
    window.pictures = pictures; // первоначальный массив картинок
    filterForm.classList.remove('filters-inactive');
    updatePictures();
  };

  filterForm.addEventListener('change', function () {
    window.debounce(updatePictures);
  });

  window.backend.load(successRenderPhotoHandler, window.backend.onError);

  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  galleryOverlayClose.addEventListener('click', function () {
    window.preview.closePopup();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.preview.ENTER_KEYCODE) {
      window.preview.closePopup();
    }
  });
})();
