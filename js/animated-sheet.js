//import 'foundation-sites/js/foundation.core';
//import 'foundation-sites/js/foundation.util.mediaQuery';

// Animated svg sections
module.exports = class AnimatedSheet {

    constructor(svgSelector, options) {
        d3.selection.prototype.moveToFront = function() {
          return this.each(function(){
            this.parentNode.appendChild(this);
          });
        };

        this.svgElement = $(svgSelector);
        //if(this.svgElement) {
        //    this.svg = svgElement;
        //} else {
        if(!this.svgElement.length) {
            console.error('No svg found by selector "' + svgSelector + '"');
            return false;
        }

        this.d3Svg = d3
            .select(svgSelector)
            .attr('width', (options.width) ? options.width : '100%');

        let self = this;

        //Foundation.MediaQuery._init();

        // resize viewbox on small displays
        let reformatViewbox = function() {
            let sheetWidth = 1920;
            let sheetHeight = 1080;
            let positionShiftX = 0;
            let positionShiftY = -(1/(window.innerWidth))*100*100*25;
            let viewboxValue = positionShiftX+' '+positionShiftY+' '+sheetWidth+' '+sheetHeight;
            // FIXME: viewbox should vertically touch
            viewboxValue = "0 -150 1920 2000";

            let small = 640;
            let medium = 1024;

            self.d3Svg
                .attr('height', 2000)
                .attr('viewBox', viewboxValue)
                .attr('preserveAspectRatio', 'xMinYMin meet');

            // FIXME: empty when using webpack (https://github.com/zurb/foundation-sites/issues/10363):
            //if(Foundation.MediaQuery.current === 'small') {
            if(window.innerWidth <= small) {
                self.d3Svg
                    .attr('height', 667)
            } else
            //if(Foundation.MediaQuery.current === 'medium') {
            if(window.innerWidth <= medium) {
                self.d3Svg
                    .attr('height', 1024)
            }

        };

        this.scopes = [];

        if(options.defs) {
            options.defs.forEach(function(def, index) {
                if(def.filter) {
                    def.filter(self.d3Svg);
                }
            });
        }

        //this.init = function() {
            options.keyframes.forEach(function(keyframe, scopeIndex) {
                let createScope = keyframe.create(self.d3Svg);
                if(createScope.element) {
                    createScope.element.attr('visibility', 'visible');
                } else {
                    console.warn('The create function should return the element key, so it can be accessed in the animate/interpolate function via the "createScope" parameter')
                }
                self.scopes[scopeIndex] = createScope
            });
            reformatViewbox();
            window.addEventListener('resize', reformatViewbox);
        //}();
        this.keyframes = options.keyframes;

        return this.animate();
    }

    animate() {
        let self = this;
        let h = 1080;
        let svgPosition =  this.svgElement.position().top;
        let progress = window.pageYOffset - svgPosition + h;
        this.keyframes.forEach(function(keyframe, scopeIndex) {
            let from = self.resizeBreakpointsToMedia(0, keyframe.from).y;
            let to = self.resizeBreakpointsToMedia(0, keyframe.to).y;
            if(keyframe.interpolate) {
                let percent = 0;
                // start default value
                if(progress < from) {
                    percent = 0;
                }
                // all values inbetween
                if(progress >= from && progress <= to) {
                    let totalLength = to - from;
                    let progressFromStart = progress - from;
                    let openPercent = (progressFromStart * 100) / totalLength;
                    percent = Math.min(Math.max(0, openPercent), 100) / 100;
                }
                // end default value
                if(progress > to) {
                    percent = 1;
                }
                //console.log('from', from, 'to', to, 'progress', progress, 'percent', percent);
                keyframe.interpolate(self.d3Svg, self.scopes[scopeIndex], percent);
            } else {
                //console.log('position', keyframe.position, 'progress', progress, 'remove', keyframe.remove);
                if(progress >= keyframe.position && !keyframe.running) {
                    let animatedElement = keyframe.animate(self.d3Svg, self.scopes[scopeIndex]);
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

    destroy() {
    };

    resizeBreakpointsToMedia(x, y) {
        let factor = 1.115;
        if(Foundation.MediaQuery.current === 'medium') {
            factor = 0.84;
        }
        if(Foundation.MediaQuery.current === 'small') {
            factor = 0.72;
        }

        return {
            x: x * factor,
            y: y * factor
        };
    };



    static easeOutElastic(t) {
        let p = 0.4;
        return Math.pow(2,-10*t) * Math.sin((t-p/4)*(2*Math.PI)/p) + 1;
    }

};
