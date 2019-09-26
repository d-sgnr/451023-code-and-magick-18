'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getWizardName = function (names, surnames) {
  return names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)];
};
var getCoatColor = function (coatColors) {
  return coatColors[Math.floor(Math.random() * coatColors.length)];
};
var getEyesColor = function (eyesColors) {
  return eyesColors[Math.floor(Math.random() * eyesColors.length)];
};

var showWizardSetup = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var userSetup = document.querySelector('.setup-similar');
  userSetup.classList.remove('hidden');
};

var changeWizardsLook = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    similarListElement.appendChild(wizardElement);
  }
};

var wizards = [{
  name: getWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
  coatColor: getCoatColor(WIZARD_COAT_COLORS),
  eyesColor: getEyesColor(WIZARD_EYES_COLORS)
},
{
  name: getWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
  coatColor: getCoatColor(WIZARD_COAT_COLORS),
  eyesColor: getEyesColor(WIZARD_EYES_COLORS)
},
{
  name: getWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
  coatColor: getCoatColor(WIZARD_COAT_COLORS),
  eyesColor: getEyesColor(WIZARD_EYES_COLORS)
},
{
  name: getWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
  coatColor: getCoatColor(WIZARD_COAT_COLORS),
  eyesColor: getEyesColor(WIZARD_EYES_COLORS)
}
];

var generateWizards = function () {
  showWizardSetup();
  changeWizardsLook();
};

generateWizards();
