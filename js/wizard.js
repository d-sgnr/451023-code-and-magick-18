'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_QTY = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizards = function (wizardsCount) {
    var wizards = [];
    for (var i = 0; i < wizardsCount; i++) {
      var wizardItem = {
        name: window.util.randomize(WIZARD_NAMES) + ' ' + window.util.randomize(WIZARD_SURNAMES),
        coatColor: window.util.randomize(WIZARD_COAT_COLORS),
        eyesColor: window.util.randomize(WIZARD_EYES_COLORS)
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
    var wizards = generateWizards(WIZARD_QTY);
    for (var i = 0; i < WIZARD_QTY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return similarListElement.appendChild(fragment);
  };

  var renderSetupScreen = function () {
    getWizards();
  };

  renderSetupScreen();
})();
