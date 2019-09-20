'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;

var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var YOU_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var HISTOGRAM_TOP_GAP = 70;
var HISTOGRAM_LEFT_GAP = 140;
var MAX_COLUMN_HEIGHT = 150;

var TEXT_HEIGHT = 10;
var TEXT_GAP = 10;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {

  var getColumnColor = function() {
    if (names[i] === 'Вы') {
      return 'red';
    }
    return 'hsl(240, ' + Math.round((Math.random() * 99 + 1)) + '%, 50%)';
  };

  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  for (var i = 0; i < names.length; i++) {

    ctx.fillText(Math.round(times[i]), HISTOGRAM_LEFT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * [i], HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + TEXT_HEIGHT - times[i] * MAX_COLUMN_HEIGHT / maxTime);

    ctx.fillStyle = getColumnColor();
    ctx.fillRect(HISTOGRAM_LEFT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * [i], HISTOGRAM_TOP_GAP + TEXT_GAP + TEXT_HEIGHT + MAX_COLUMN_HEIGHT - times[i] * MAX_COLUMN_HEIGHT / maxTime, COLUMN_WIDTH, times[i] * MAX_COLUMN_HEIGHT / maxTime);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], HISTOGRAM_LEFT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * [i], HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + 2 * TEXT_GAP + 2 * TEXT_HEIGHT);
  };
};
