// Animated svg sections
module.exports = class AnimatedSheet {

    constructor(svgSelector, options) {
        this.svgElement = $(svgSelector);
        //if(this.svgElement) {
        //    this.svg = svgElement;
        //} else {
        if(!this.svgElement) {
            console.error('No svg found by selector "' + svgSelector + '"');
        }

        this.d3Svg = d3
            .select(svgSelector)
            .attr('width', (options.width) ? options.width : '100%');

        let self = this;

        // resize viewbox on small displays
        let reformatViewbox = function() {
            let screenWidth = 1920;
            let screenHeight = 2000;
            let positionShiftX = 0;
            let positionShiftY = -(1/(window.innerWidth))*100*100*25;
            let viewboxValue = positionShiftX+' '+positionShiftY+' '+screenWidth+' '+screenHeight;

            //console.log('reformat', viewboxValue);
            self.d3Svg
                .attr('height', 2000)
                .attr('viewBox', viewboxValue)
                .attr('preserveAspectRatio', 'xMinYMin meet');

            if(Foundation.MediaQuery.current === 'medium') {
                self.d3Svg
                    .attr('height', 1400)
            }
            if(Foundation.MediaQuery.current === 'small') {
                self.d3Svg
                    .attr('height', 800)
            }
        };

        this.scopes = [];

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
                    percent = 100;
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