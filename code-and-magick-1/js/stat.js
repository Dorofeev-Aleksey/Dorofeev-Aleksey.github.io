'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);

    ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);
    var max = -1;
    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }

    var histogramHeight = 150; // px;
    var step = histogramHeight / max; // px;

    var barWidth = 40;
    var indent = 50;
    var initialX = 120;
    var initialY = 260;
    ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла
    for (var n = 0; n < times.length; n++) {
      var randomNumber = Math.random();
      if (names[n] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + randomNumber + ')';
      }
      ctx.fillText(names[n], initialX + indent * n * 2, initialY);
      ctx.fillRect(initialX + indent * n * 2, initialY - times[n] * step - 5, barWidth, times[n] * step);
      ctx.fillText(Math.round(times[n]), initialX + indent * n * 2, initialY - times[n] * step - 30);
    }
  };
})();
