'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var controlsPreviewClass = '.upload-effect-preview';

  window.uploadPicture = function (file, container, callback) {
    var fileName = file.name.toLocaleLowerCase();
    var matches = FILE_TYPES.some(function (value) {
      return fileName.endsWith(value);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        container.src = reader.result;

        var style = document.createElement('style');
        style.textContent = controlsPreviewClass + '{background-image: url("' + reader.result + '");}';
        document.body.appendChild(style);
      });

      reader.readAsDataURL(file);

      reader.addEventListener('loadend', function () {
        callback();
      });
    }
  };
})();
