'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');

  var getMatchStr = function (object, pictures) {
    for (var i = 0; i < pictures.length; i++) {
      var str = object.src;
      var reg = pictures[i];
      var result = str.match(reg.url);
      if (result) {
        return [pictures[i].comments.length, pictures[i].likes];
      }
    }
    return [0, 0];
  };

  window.preview = {
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.preview.closePopup();
      }
    },
    openPopup: function () {
      galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.preview.onPopupEscPress);
    },
    closePopup: function () {
      galleryOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.preview.onPopupEscPress);
    },
    renderGalleryPhoto: function (usedPicture) {
      galleryOverlay.querySelector('.gallery-overlay-image').src = usedPicture.querySelector('img').src;
      galleryOverlay.querySelector('.likes-count').textContent = usedPicture.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = '1';
    },
    renderMainPhoto: function (object, pictures) {
      var matchStr = getMatchStr(object, pictures);
      galleryOverlay.querySelector('img').src = object.src;
      galleryOverlay.querySelector('.likes-count').textContent = matchStr[1];
      galleryOverlay.querySelector('.comments-count').textContent = matchStr[0];
    },
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
