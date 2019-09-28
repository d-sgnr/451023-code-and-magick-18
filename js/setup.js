'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QTY = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var showWizardSetup = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var userSetup = document.querySelector('.setup-similar');
  userSetup.classList.remove('hidden');
};

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
  showWizardSetup();
  getWizards();
};

renderSetupScreen();
