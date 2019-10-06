'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QTY = 4;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomItem = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var generateWizards = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    var wizardItem = {
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(WIZARD_COAT_COLORS),
      eyesColor: getRandomItem(WIZARD_EYES_COLORS)
    };
    wizards.push(wizardItem);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getWizards = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = generateWizards(WIZARDS_QTY);
  for (var i = 0; i < WIZARDS_QTY; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return similarListElement.appendChild(fragment);
};

var renderSetupScreen = function () {
  getWizards();
};

renderSetupScreen();

// Учебный проект: одеть Надежду

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputName = document.querySelector('.setup-user-name');
var setupForm = document.querySelector('.setup-wizard-form');
var setupSubmit = document.querySelector('.setup-submit');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');

var onPopupEscPress = function (evt) {
  if (document.activeElement === inputName) {
    return null;
  } else {
    if (evt.keyCode === ESC_KEYCODE) {
      return closePopup();
    }
  }
  return null;
};

var changeElementColor = function (element, elementColors, input, property) {
  var randomElementColor = getRandomItem(elementColors);
  if (property === 'fill') {
    element.style.fill = randomElementColor;
  } else {
    element.style.background = randomElementColor;
  }
  input.value = randomElementColor;
};

var onWizardCoatClick = function () {
  changeElementColor(wizardCoat, WIZARD_COAT_COLORS, inputCoatColor, 'fill');
};

var onWizardEyesClick = function () {
  changeElementColor(wizardEyes, WIZARD_EYES_COLORS, inputEyesColor, 'fill');
};

var onWizardFireballClick = function () {
  changeElementColor(wizardFireball, FIREBALL_COLORS, inputFireballColor, 'background');
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
};

var submitForm = function () {
  setupForm.submit();
};

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupSubmit.addEventListener('click', function () {
  submitForm();
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keydown === ENTER_KEYCODE) {
    submitForm();
  }
});
