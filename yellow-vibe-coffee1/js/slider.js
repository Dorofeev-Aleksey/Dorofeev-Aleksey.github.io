'use strict';

(function () {
  var radioButtons = document.querySelectorAll('input[type="radio"]');
  var slider = document.querySelector('.slider');

  for (var i = radioButtons.length - 1; i >= 0; i--) {
          radioButtons[i].addEventListener("change", function(event){
            event.preventDefault();
            var filter = 'slider--photo' + event.currentTarget.value;
            slider.classList.remove('slider--photo1');
            slider.classList.remove('slider--photo2');
            slider.classList.remove('slider--photo3');
            slider.classList.remove('slider--photo4');
            slider.classList.remove('slider--photo5');
            slider.classList.add(filter);
        });
      }
})();
