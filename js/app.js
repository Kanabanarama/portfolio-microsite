var positionHelper = require('./position-helper');
var popupIcons = require('./popup-icons');
var pathAnimation = require('./path-animations');
var animatedSheet = require('./animated-sheet');

var firstAnimation = require('./animation-1');
var secondAnimation = require('./animation-2');
var thirdAnimation = require('./animation-3');

$(document).foundation();

// TODO: generalize svg attribute initialization somewhere
var screenWidth = 1920;
var screenHeight = 2000;
var positionShiftX = 0;
var positionShiftY = -(1/(window.innerWidth))*100*100*25;
var viewboxValue = positionShiftX+' '+positionShiftY+' '+screenWidth+' '+screenHeight;

var d3Svg = d3
    .select('#svg-1')
    .attr('width', '100%')
    .attr('height', '2000')
    .attr('viewBox', viewboxValue)
    .attr('preserveAspectRatio', 'xMinYMin meet');

var path1 = new pathAnimation();
var icons1 = new popupIcons();

var sheet1 = firstAnimation;
var sheet2 = secondAnimation;
var sheet3 = thirdAnimation;

d3.select(window).on('scroll.scroller', function() {
    path1.animate();
    icons1.animate();
    sheet1.animate();
    sheet2.animate();
    sheet3.animate();
});

var helper = new positionHelper().show();
