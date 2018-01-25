'use strict';
// Отрисовка миниатуры
(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  window.picture = {
    renderPhoto: function (photo) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture img').src = photo.url;
      pictureElement.querySelector('.picture-likes').textContent = photo.likes;
      pictureElement.querySelector('.picture-comments').textContent = photo.comments.length;

      return pictureElement;
    }
  };

})();
