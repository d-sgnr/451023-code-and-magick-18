'use strict';

(function () {

  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_QTY = 4;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupInput = document.querySelector('.setup-user-name');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupSubmit = document.querySelector('.setup-submit');
  var dialogHandler = document.querySelector('.upload');

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardBlock = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');

  var onWizardCoatClick = function () {
    window.colorize(wizardCoat, WIZARD_COAT_COLORS, inputCoatColor, 'fill');
  };

  var onWizardEyesClick = function () {
    window.colorize(wizardEyes, WIZARD_EYES_COLORS, inputEyesColor, 'fill');
  };

  var onWizardFireballClick = function () {
    window.colorize(wizardFireball, FIREBALL_COLORS, inputFireballColor, 'background');
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement === setupInput) {
      return null;
    }
    window.util.isEscEvent(evt, closePopup);
    return null;
  };

  var setupX = setup.style.left;
  var setupY = setup.style.top;

  var setupPositionReturn = function () {
    setup.style.left = setupX;
    setup.style.top = setupY;
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onWizardFireballClick);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireball.removeEventListener('click', onWizardFireballClick);
    setupPositionReturn();
  };

  var submitForm = function () {
    setupForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(setupForm), function () {
        setup.classList.add('hidden');
      });
      evt.preventDefault();
    });
  };

  var onClickPreventDefault = function (evt) {
    evt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var dialogDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_QTY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    similarWizardBlock.classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupSubmit.addEventListener('click', function () {
    submitForm();
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, submitForm);
  });

  dialogHandler.addEventListener('mousedown', dialogDrag);

  setup.classList.remove('hidden');

  window.backend.load(successHandler, errorHandler);

})();
