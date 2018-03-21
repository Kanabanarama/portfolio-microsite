var positionHelper = require('./position-helper');
var popupIcons = require('./popup-icons');
var animatedSheet = require('./animated-sheet');
var smoothScrolling = require('./smooth-scrolling');

var firstAnimation = require('./animation-1');
var secondAnimation = require('./animation-2');
var thirdAnimation = require('./animation-3');
var fourthAnimation = require('./animation-4');

$(document).foundation();

var icons1 = new popupIcons();
var scrolling = new smoothScrolling();

var sheet1 = firstAnimation;
var sheet2 = secondAnimation;
var sheet3 = thirdAnimation;
var sheet4 = fourthAnimation;

d3.select(window).on('scroll.scroller', function() {
    icons1.animate();
    sheet1.animate();
    sheet2.animate();
    sheet3.animate();
    sheet4.animate();
});

//var helper = new positionHelper().show();
