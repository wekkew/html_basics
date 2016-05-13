//
// simple framework for drawing
// drawing on canvas is a nice visual way to learn js
//
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var pen = new Pen(canvas);
var printPosY = 0;
var animate = animate || false;

/**
 * requestAnimationFrame version: "0.0.23" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */
(function(global) {
  (function() {
    if (global.requestAnimationFrame) {
      return;
    }

    if (global.webkitRequestAnimationFrame) { // Chrome <= 23, Safari <= 6.1, Blackberry 10
      global.requestAnimationFrame = global['webkitRequestAnimationFrame'];
      global.cancelAnimationFrame = global['webkitCancelAnimationFrame'] || global['webkitCancelRequestAnimationFrame'];
      return;
    }

    // IE <= 9, Android <= 4.3, very old/rare browsers
    var lastTime = 0;
    global.requestAnimationFrame = function( callback ) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
      var id = global.setTimeout( function() {
          callback( currTime + timeToCall );
      }, timeToCall );
      lastTime = currTime + timeToCall;
      return id; // return the id for cancellation capabilities
    };

    global.cancelAnimationFrame = function( id ) {
      clearTimeout( id );
    };

  })();

})(window);

// reset drawing defaults
function resetCanvas()
{
  printPosY = 0;
  pen.dir = -90;
  pen.font('normal 13px sans-serif');

  // clear canvas
  context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

  // redraw scene
  if (typeof draw !== 'undefined') {
    draw();
  }
}

// set canvas size for hdpi display
function initCanvas()
{
  var wWidth = window.innerWidth - 30;
  var wHeight = window.innerHeight - 30;
  canvas.width = wWidth * 2;
  canvas.height = wHeight * 2;
  canvas.style.width = wWidth + 'px';
  canvas.style.height = wHeight + 'px';

  // default scale is 2x
  context.scale(2, 2);

  // reset drawing
  resetCanvas();
}
window.addEventListener('resize', initCanvas, false);
initCanvas();

// animation support
function animationTick()
{
  if (animate && typeof draw !== 'undefined') {
    resetCanvas();
    window.requestAnimationFrame(animationTick);
  }
}
if (animate) {
  window.requestAnimationFrame(animationTick);
}

//
// utility functions
//

function print(text) {
  printPosY += 16;
  pen.jump(0, printPosY).text(text);
}
