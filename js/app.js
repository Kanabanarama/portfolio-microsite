$(document).foundation();

// CSS Animations
function CssAnimations() {
  var animatedElements = $('.animated:visible');
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  animatedElements.each(function(index, element) {
    // Popup animation triggered when icon is scrolled into view
    if($(element).attr('class').indexOf('animate-view-popup') !== -1) {
      var viewportTop = $(scrollElem).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      var elementTop = Math.round($(element).offset().top);
      if(elementTop +300 < viewportBottom) {
        $(element).addClass('animate-popup')
      }
    }
  });
}

// TODO: register at end of animation, so that the icons cannot appear if the animation has not yet finished
window.addEventListener('scroll', CssAnimations);

// Scroll bound line animation
// TODO: replace fixed values for other resolutions
var w = 1920;//window.innerWidth;
var h = 1080;//window.innerHeight;
var posY = window.pageYOffset;

var svg = d3
  .select('#svg-1');

var path = [
  [w/2-5, 200],
  [w/2+30, 300],
  [w/2-70, 400],
  [w/2+100, 520],
  [w/2-100, 620],
  [w/2-960, 660],
  [w/2-940, 390],
  [w/2+50, 450],
  [w/2+160, 1410],
  [w/2+190, 1410],
  [w/2+450, 1300],
  [w/2+500, 1300],
  [w/2+1000, 5000]
];

var bezierLine = d3
  .line()
  .x(function(d) {
    return d[0];
  })
  .y(function(d) {
    return d[1];
  })
  .curve(d3.curveBasis);

var pageSizeY =  $('.content-container')[0].getBoundingClientRect().height;
var progress = 0;

var stroke = svg.selectAll('liner')
  .data([posY])
  .enter()
  .append('path')
  .attr('d', bezierLine(path))
  .attr('stroke', '#FFFFFF')
  .attr('stroke-width', 10)
  .attr('fill', 'none')
  .attr('stroke-linecap', 'round')
  .attr('stroke-dasharray', function() {
    var strokeLength = this.getTotalLength();
    progress = this.getTotalLength()-posY;
    return strokeLength+' '+strokeLength;
  })
  .attr('stroke-dashoffset', function() {
    return this.getTotalLength()-posY;
  });

var animatePath = function() {
  stroke
    .attr('stroke-dashoffset', function() {
      //var forwardOnlyProgress = Math.min(progress, this.getTotalLength()-posY);
      //var progressWithLimit = Math.max(0, forwardOnlyProgress);
      var lineSpeed = 4;
      if(Foundation.MediaQuery.current === 'medium') {
        lineSpeed = 9;
      }
      if(Foundation.MediaQuery.current === 'small') {
        lineSpeed = 20;
      }
      var progress = this.getTotalLength()-posY*lineSpeed;

      return progress;
    });
}

d3.select(window).on('scroll.scroller', function() {
  posY = window.pageYOffset;
  animatePath();
  sheet1.animate();
});



// animated svg sections
function AnimatedSheet(svgSelector, options) {
  var svgElement = $(svgSelector);
  if(svgElement) {
    this.svg = svgElement;
  } else {
    console.error('No svg found by selector "' + svgSelector + '"');
  }

  var d3Svg = d3
    .select(svgSelector)
    .attr('width', (options.width) ? options.width : '100%');

  var resizeBreakpointsToMedia = function(x, y) {
    var factor = 1.115;
    if(Foundation.MediaQuery.current === 'medium') {
      factor = 0.84;
    }
    if(Foundation.MediaQuery.current === 'small') {
      factor = 0.72;
    }
    coord = {
      x: x * factor,
      y: y * factor
    }

    return coord;
  }

  // resize viewbox on small displays
  var reformatViewbox = function() {
    var screenWidth = 1920;
    var screenHeight = 2000;
    var positionShiftX = 0;
    var positionShiftY = -(1/(window.innerWidth))*100*100*25;
    var viewboxValue = positionShiftX+' '+positionShiftY+' '+screenWidth+' '+screenHeight;

    //console.log('reformat', viewboxValue);
    d3Svg
      .attr('height', 2000)
      .attr('viewBox', viewboxValue)
      .attr('preserveAspectRatio', 'xMinYMin meet');

    if(Foundation.MediaQuery.current === 'medium') {
      d3Svg
        .attr('height', 1400)
    }
    if(Foundation.MediaQuery.current === 'small') {
      d3Svg
        .attr('height', 800)
    }
  }

  var scopes = [];

  this.init = function() {
    options.keyframes.forEach(function(keyframe, scopeIndex) {
      var createScope = keyframe.create(d3Svg);
      if(createScope.element) {
        createScope.element.attr('visibility', 'visible');
      } else {
        console.warn('The create function should return the element key, so it can be accessed in the animate/interpolate function via the "createScope" parameter')
      }
      scopes[scopeIndex] = createScope
    });
    reformatViewbox();
    window.addEventListener('resize', reformatViewbox);
  }();

  this.animate = function() {
    var svgPosition =  svgElement.position().top;
    var progress = window.pageYOffset - svgPosition + h;
    options.keyframes.forEach(function(keyframe, scopeIndex) {
      var from = resizeBreakpointsToMedia(0, keyframe.from).y;
      var to = resizeBreakpointsToMedia(0, keyframe.to).y;
      if(keyframe.interpolate) {
        var percent = 0;
        // start default value
        if(progress < from) {
          percent = 0;
        }
        // all values inbetween
        if(progress >= from && progress <= to) {
          var totalLength = to - from;
          var progressFromStart = progress - from;
          var openPercent = (progressFromStart * 100) / totalLength;
          percent = Math.min(Math.max(0, openPercent), 100) / 100;
        }
        // end default value
        if(progress > to) {
          percent = 100;
        }
        //console.log('from', from, 'to', to, 'progress', progress, 'percent', percent);
        keyframe.interpolate(d3Svg, scopes[scopeIndex], percent);
      } else {
        //console.log('position', keyframe.position, 'progress', progress, 'remove', keyframe.remove);
        if(progress >= keyframe.position && !keyframe.running) {
          var animatedElement = keyframe.animate(d3Svg, scopes[scopeIndex]);
          if(keyframe.remove) {
            animatedElement.on('end', function() {
              this.remove();
            });
          }
          keyframe.running = true;
        }
      }
    });
  };

  this.destroy = function() {
  };

  return this.animate();
}

AnimatedSheet.easeOutElastic = function(t) {
  var p = 0.4;
  return Math.pow(2,-10*t) * Math.sin((t-p/4)*(2*Math.PI)/p) + 1;
}

var sheet1 = new AnimatedSheet('#svg-1', {
  keyframes: [
    {
      from: 1627,
      to: 2023,
      remove: false,
      create: function(svg) {
        this.element = svg
          .append('g')
          .attr('class', 'bar')
          .attr('transform', 'translate('+(w/2-300)+', 1400)')
          .append('rect')
          .attr('width', 600)
          .attr('height', 50)
          .attr('opacity', 1)
          .attr('fill', '#FFFFFF');

        return this;
      },
      interpolate: function(svg, createScope, interpolatePercent) {
        var rotation = d3.interpolateNumber(0, 90);
        return svg
            .select('.bar rect')
            .attr('transform', 'rotate('+rotation(AnimatedSheet.easeOutElastic(interpolatePercent))+', 300, 25)');
      }
    },
    {
      from: 1627,
      to: 2140,
      remove: true,
      create: function(svg) {
        this.trajectoryPoints = [
          [w/2-260, 1365],
          [w-50, 1000],
          [w/2-300, 3200]
        ];
        this.trailcurve = d3
          .line()
          .curve(d3.curveCatmullRom);
        this.trajectory = svg.selectAll('line')
          .data(this.trajectoryPoints)
          .enter()
          .append('path')
          .attr('d', this.trailcurve(this.trajectoryPoints))
          .attr('fill', 'none');
        this.element = svg
          .select('#icon-monitor');

        return this;
      },
      interpolate: function(svg, createScope, interpolatePercent) {
        function translateAlong(path, percent) {
          var l = path.getTotalLength();
          var p = path.getPointAtLength(percent * l);
          return 'translate(' + (p.x-40) + ', ' + (p.y-36) + ')';
        }
        var rotation = d3.interpolateNumber(0, 360);

        return createScope
          .element
          .attr('transform',
            translateAlong(createScope.trajectory.node(), interpolatePercent) +
            'rotate('+rotation(interpolatePercent)+', 30, 25)'
          );
      }
    },
    {
      from: 1627,
      to: 2240,
      remove: true,
      create: function(svg) {
        this.trajectoryPoints = [
          [w/2-80, 1365],
          [w-55, 1100],
          [w/2-300, 3000]
        ];
        this.trailcurve = d3
          .line()
          .curve(d3.curveCatmullRom);
        this.trajectory = svg.selectAll('line')
          .data(this.trajectoryPoints)
          .enter()
          .append('path')
          .attr('d', this.trailcurve(this.trajectoryPoints))
          .attr('fill', 'none');
        this.element = svg
          .select('#icon-database');

        return this;
      },
      interpolate: function(svg, createScope, interpolatePercent) {
        function translateAlong(path, percent) {
          var l = path.getTotalLength();
          var p = path.getPointAtLength(percent * l);
          return 'translate(' + (p.x-40) + ', ' + (p.y-36) + ')';
        }
        var rotation = d3.interpolateNumber(0, 360);

        return createScope
          .element
          .attr('transform',
            translateAlong(createScope.trajectory.node(), interpolatePercent) +
            'rotate('+rotation(interpolatePercent)+', 30, 25)'
          );
      }
    },
    {
      from: 1627,
      to: 2240,
      remove: true,
      create: function(svg) {
        this.element = svg
          .select('#icon-cloud')

        return this;
      },
      interpolate: function(svg, createScope, interpolatePercent) {
        var arc = d3.interpolateObject(
          { x: (w / 2 + 100 - 40),
            y: 1333
          },
          {
            x: (w - 600),
            y: 3000
          }
        );
        var pos = arc(interpolatePercent);
        return svg
          .select('#icon-cloud')
          .attr('transform', 'translate('+ pos.x + ', ' + pos.y + ')');
      }
    },
    {
      from: 1627,
      to: 2240,
      remove: true,
      create: function(svg) {
        this.element = svg
          .select('#icon-app')

        return this;
      },
      interpolate: function(svg, createScope, interpolatePercent) {
        var arc = d3.interpolateObject(
          { x: (w / 2 + 300 - 70),
            y: 1325
          },
          {
            x: (w - 300),
            y: 3200
          }
        );
        var pos = arc(interpolatePercent);
        return svg
          .select('#icon-app')
          .attr('transform', 'translate('+ pos.x + ', ' + pos.y + ')');
      }
    }
  ]
});



// Helper that shows x/y position of the cursor
var initPositionHelper = function() {
  var positionDisplay = d3
    .select('body')
    .append('div')
    .attr('data-allow-html', true)
    .attr('class', 'tooltip top')
    .style('display', 'none');
  var centerOffsetDisplay = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip right')
    .style('display', 'none');
  var scrollDisplay = d3
    .select('body')
    .append('span')
    .attr('class', 'tooltip bottom')
    .style('width', '200px')
    .style('text-align', 'center');

  d3.select(window).on('mousemove', function() {
    positionDisplay
      .html('x: ' + d3.event.pageX + '<br /> y: ' + d3.event.pageY)
      .style('top', (d3.event.pageY - 100) + 'px')
      .style('left', (d3.event.pageX - 34) + 'px')
      .style('display', 'inline');
    var centerOffset =  d3.event.pageX - w/2;
    centerOffsetDisplay
      .html('center: ' + centerOffset)
      .style('top', (d3.event.pageY - 25) + 'px')
      .style('left', (d3.event.pageX + 35) + 'px')
      .style('display', 'inline');
  });

  d3.select(window).on('scroll', function() {
    scrollDisplay
      .html('scroll: ' + posY)
      .style('top', (posY + 100) + 'px')
      .style('left', ($(window).width()- 200) + 'px')
  });
}

//initPositionHelper();