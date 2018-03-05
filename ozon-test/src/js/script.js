'use strict';

(function () {
  var puzzleList = document.querySelector('.puzzle-game__list');
  var puzzleField = document.querySelector('.puzzle-game__field-wrap');
  var draggedItem = null;

  var renderOutline = function (color, style, width) {
    puzzleList.style.outlineColor = color;
    puzzleList.style.outlineStyle = style;
    puzzleList.style.outlineWidth = width;
  };

  puzzleList.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    renderOutline('red', 'dashed', '2px');
  });

  window.addEventListener('mouseup', function () {
    renderOutline('', '', '');
  });

  puzzleField.addEventListener('dragover', function (evt) {
    renderOutline('', '', '');
    evt.preventDefault();
    return false;
  });

  puzzleField.addEventListener('drop', function (evt) {
    renderOutline('', '', '');
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });


  puzzleField.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  puzzleField.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
