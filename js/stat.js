'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var SHADOW_X = CLOUD_X + SHADOW_GAP;
var SHADOW_Y = CLOUD_Y + SHADOW_GAP;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var HISTOGRAM_TOP_GAP = 70;
var HISTOGRAM_LEFT_GAP = 140;
var MAX_COLUMN_HEIGHT = 150;

var TEXT_HEIGHT = 10;
var TEXT_GAP = 10;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = 'rgb(0, 0, 0)';

var TITLE_FIRST = 'Ура вы победили!';
var TITLE_SECOND = 'Список результатов:';
var TITLE_FIRST_X = 120;
var TITLE_FIRST_Y = 40;
var TITLE_SECOND_X = 120;
var TITLE_SECOND_Y = 60;

var renderCloud = function (ctx, cloudX, cloudY, cloudColor, shadowX, shadowY, shadowColor, cloudWidth, cloudHeight) {
  ctx.fillStyle = shadowColor;
  ctx.fillRect(shadowX, shadowY, cloudWidth, cloudHeight);
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);
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

var getColumnColor = function (name) {
  return name === 'Вы' ? 'red' : 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
};

var renderText = function (ctx, x, y, text, color, font) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderHistogram = function (names, times, ctx, maxTime) {
  for (var i = 0; i < names.length; i++) {
    var columnX = HISTOGRAM_LEFT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var columnHeight = times[i] * MAX_COLUMN_HEIGHT / maxTime;
    var textNameY = HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + 2 * TEXT_GAP + 2 * TEXT_HEIGHT;
    var columnY = TEXT_GAP + HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + TEXT_HEIGHT - columnHeight;
    var textTimesY = HISTOGRAM_TOP_GAP + MAX_COLUMN_HEIGHT + TEXT_HEIGHT - columnHeight;
    var time = Math.round(times[i]);
    var colorBar = getColumnColor(names[i]);

    renderText(ctx, columnX, textTimesY, time, TEXT_COLOR, TEXT_FONT);
    renderBar(ctx, columnX, columnY, COLUMN_WIDTH, columnHeight, colorBar);
    renderText(ctx, columnX, textNameY, names[i], TEXT_COLOR, TEXT_FONT);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR, SHADOW_X, SHADOW_Y, SHADOW_COLOR, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderText(ctx, TITLE_FIRST_X, TITLE_FIRST_Y, TITLE_FIRST, TEXT_COLOR, TEXT_FONT);
  renderText(ctx, TITLE_SECOND_X, TITLE_SECOND_Y, TITLE_SECOND, TEXT_COLOR, TEXT_FONT);
  renderHistogram(names, times, ctx, maxTime);
};
