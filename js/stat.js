'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;

var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var HISTOGRAM_TOP_GAP = 70;
var HISTOGRAM_LEFT_GAP = 140;
var MAX_COLUMN_HEIGHT = 150;

var TEXT_HEIGHT = 10;
var TEXT_GAP = 10;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = 'rgb(0, 0, 0)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColumnColor = function (names) {
  for (var i = 0; i < names.length; i++) {
    return names === 'Вы' ? 'red' : 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
  } return null;
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.font = TEXT_FONT;
  ctx.fillStyle = TEXT_COLOR;

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    var columnX = HISTOGRAM_LEFT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;

    var columnHeight = times[i] * MAX_COLUMN_HEIGHT / maxTime;

    var textNameY = HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + 2 * TEXT_GAP + 2 * TEXT_HEIGHT;

    var columnY = TEXT_GAP + HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + TEXT_HEIGHT - columnHeight;

    var textTimesY = HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + TEXT_HEIGHT - columnHeight;

    ctx.fillText(Math.round(times[i]), columnX, textTimesY);

    ctx.fillStyle = getColumnColor(names[i]);
    ctx.fillRect(columnX, columnY, COLUMN_WIDTH, columnHeight);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], columnX, textNameY);
  }
};
