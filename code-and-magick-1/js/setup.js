'use strict';


(function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var WIZARDS_COUNT = 4;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };
  var successHandler = function (regularWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomItem(regularWizards)));
    }
    similarListElement.appendChild(fragment);
  };

  window.backend.load(successHandler, window.backend.errorHandler);
  // Смена цветов частей волшебника по клику

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballWrap = document.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(wizardCoat, window.util.COLOR_COAT, fillElement);
  window.colorizeElement(wizardEyes, window.util.COLOR_EYES, fillElement);
  window.colorizeElement(fireballWrap, window.util.COLOR_FIREBALLS, changeElementBackground);
})();
