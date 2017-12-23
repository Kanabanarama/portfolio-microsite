// Third animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-3', {
    defs: [
        // TODO: is a filter independently usable for multiple elements?
        {
            filter: function(svg) {
                return svg
                    .append("defs")
                    .append("filter")
                    .attr("id", "motionFilter1")
                    .append("feGaussianBlur")
                    .attr("class", "blurValues1")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", "10 10");
            }
        },
        {
            filter: function(svg) {
                return svg
                    .append("defs")
                    .append("filter")
                    .attr("id", "motionFilter2")
                    .append("feGaussianBlur")
                    .attr("class", "blurValues2")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", "10 10");
            }
        },
        {
            filter: function(svg) {
                return svg
                    .append("defs")
                    .append("filter")
                    .attr("id", "motionFilter3")
                    .append("feGaussianBlur")
                    .attr("class", "blurValues3")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", "10 10");
            }
        },
        {
            filter: function(svg) {
                return svg
                    .append("defs")
                    .append("filter")
                    .attr("id", "motionFilter4")
                    .append("feGaussianBlur")
                    .attr("class", "blurValues4")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", "10 10");
            }
        },
    ],
    keyframes: [
        {
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let h = 1080;
                let path = [
                    [w/2-500, -150],
                    [w/2-500, 150],
                    [w/2-810, 150],
                    [w/2-810, 480],
                    [w/2-580, 480],
                    [w/2-580, 2000]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    });

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let startY = $(svg.node()).offset().top-window.innerHeight/3;
                        let posY = Math.max(0, window.pageYOffset-startY)
                        let lineSpeed = 1.6;

                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 7;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 16;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
                    });
            }
        },
        {
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let h = 1080;
                let path = [
                    [w/2-450, -150],
                    [w/2-450, 20],
                    [w/2-240, 20],
                    [w/2-240, 950],
                    [w/2-520, 950],
                    [w/2-520, 1280],
                    [w/2-70, 1280],
                    [w/2-620, 2000]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    });

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
              //return;
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let startY = $(svg.node()).offset().top-window.innerHeight/3;
                        let posY = Math.max(0, window.pageYOffset-startY)
                        let lineSpeed = 1.95;

                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 8;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 17;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
                    });
            }
        },
        {
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let h = 1080;
                let path = [
                    [w/2-400, -150],
                    [w/2-400, -80],
                    [w/2-400, -30],
                    [w/2-200, -30],
                    [w/2+150, -30],
                    [w/2+150, 1350],
                    [w/2+490, 1350],
                    [w/2+490, 1680],
                    [w/2+40, 1680],
                    [w/2-750, 2000]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    });

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
              //return;
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let startY = $(svg.node()).offset().top-window.innerHeight/3;
                        let posY = Math.max(0, window.pageYOffset-startY)
                        let lineSpeed = 2.31;

                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 9;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 18;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
                    });
            }
        },
        {
            from: 0,
            to: 2000,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let h = 1080;
                let path = [
                    [w/2-350, -150],
                    [w/2-350, -80],
                    [w/2+200, -80],
                    [w/2+200, 550],
                    [w/2+690, 550],
                    [w/2+690, 1730],
                    [w/2-1120, 2000]
                ];
                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    });

                this.progress = 0;

                this.element = svg.selectAll('line')
                    .data([window.pageYOffset])
                    .enter()
                    .append('path')
                    .attr('d', bezierLine(path))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', 10)
                    .attr('fill', 'none')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-dasharray', function() {
                        let strokeLength = this.getTotalLength();
                        this.progress = this.getTotalLength() - window.pageYOffset;
                        return strokeLength + ' ' + strokeLength;
                    })
                    .attr('stroke-dashoffset', function() {
                        return this.getTotalLength() - window.pageYOffset;
                    });

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
              //return;
                var self = this;
                this.element
                    .attr('stroke-dashoffset', function() {
                        let startY = $(svg.node()).offset().top-window.innerHeight/3;
                        let posY = Math.max(0, window.pageYOffset-startY)
                        let lineSpeed = 2.46;

                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 9;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 18;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('path2End');
                            window.dispatchEvent(endEvent);
                        }

                        return progress;
                    });
            }
        },
        {
            from: 750,
            to: 950,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .selectAll('#path-image-1')
                    .attr("filter", "url(#motionFilter1)")
                    .attr("opacity", 0);

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                var self = this;
                let transitionInterpolator = d3.interpolateNumber(400, 200);
                let opacityInterpolator = d3.interpolateNumber(0, 1);
                this.element
                    .attr('visibility', 'visible')
                    .attr("transform", "translate("+transitionInterpolator(interpolatePercent)+", 200)")
                    .attr("opacity", opacityInterpolator(interpolatePercent));

                let blurInterpolator = d3.interpolateString("10 10", "0 0");
                d3.select("#motionFilter1 .blurValues1")
                    .attr("stdDeviation", blurInterpolator(interpolatePercent));
            }
        },
        {
            from: 1050,
            to: 1250,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .selectAll('#path-image-2')
                    .attr("filter", "url(#motionFilter2)")
                    .attr("opacity", 0);

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                let transitionInterpolator = d3.interpolateNumber(1000, 1200);
                let opacityInterpolator = d3.interpolateNumber(0, 1);
                let blurInterpolator = d3.interpolateString("10 10", "0 0");

                this.element
                    .attr('visibility', 'visible')
                    .attr("transform", "translate("+transitionInterpolator(interpolatePercent)+", 600)")
                    .attr("opacity", opacityInterpolator(interpolatePercent));

                d3.select("#motionFilter2 .blurValues2")
                    .attr("stdDeviation", blurInterpolator(interpolatePercent));
            }
        },
        {
            from: 1150,
            to: 1350,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .selectAll('#path-image-3')
                    .attr("filter", "url(#motionFilter3)")
                    .attr("opacity", 0);

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                let transitionInterpolator = d3.interpolateNumber(700, 500);
                let opacityInterpolator = d3.interpolateNumber(0, 1);
                let blurInterpolator = d3.interpolateString("10 10", "0 0");

                this.element
                    .attr('visibility', 'visible')
                    .attr("transform", "translate("+transitionInterpolator(interpolatePercent)+", 1000)")
                    .attr("opacity", opacityInterpolator(interpolatePercent));
                d3.select("#motionFilter3 .blurValues3")
                    .attr("stdDeviation", blurInterpolator(interpolatePercent));
            }
        },
        {
            from: 1350,
            to: 1550,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .selectAll('#path-image-4')
                    .attr("filter", "url(#motionFilter4)")
                    .attr("opacity", 0);

                return this;
            },
            interpolate: function(svg, createScope, interpolatePercent) {
                let transitionInterpolator = d3.interpolateNumber(800, 1000);
                let opacityInterpolator = d3.interpolateNumber(0, 1);
                let blurInterpolator = d3.interpolateString("10 10", "0 0");

                this.element
                    .attr('visibility', 'visible')
                    .attr("transform", "translate("+transitionInterpolator(interpolatePercent)+", 1400)")
                    .attr("opacity", opacityInterpolator(interpolatePercent));

                d3.select("#motionFilter4 .blurValues4")
                    .attr("stdDeviation", blurInterpolator(interpolatePercent));
            }
        },
    ],
});
