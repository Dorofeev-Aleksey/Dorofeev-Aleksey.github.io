'use strict';

(function () {
  var Nav = document.querySelector(".page-header__menu");
  var Toggler = document.querySelector(".page-header__toogler");

  Toggler.addEventListener("click", function() {
    if (Nav.classList.contains("page-header__menu--opened")) {
      Nav.classList.remove("page-header__menu--opened");
      Nav.classList.add("page-header__menu--closed");
      Toggler.classList.remove("page-header__toogler--opened");
      Toggler.classList.add("page-header__toogler--closed");
    } else {
      Nav.classList.remove("page-header__menu--closed");
      Nav.classList.add("page-header__menu--opened");
      Toggler.classList.add("page-header__toogler--opened");
      Toggler.classList.remove("page-header__toogler--closed");
    }
  });
})();
