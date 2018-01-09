// First animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-1', {
    keyframes: [
        {
            from: 0,
            to: 2150,
            remove: false,
            create: function(svg) {
                let w = 1920; // resolution the viewbox scaling is based on
                let h = 1080;

                /*let svg = d3
                    .select('#svg-1');*/

                let path = [
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
                    [w/2+700, 2250]
                ];

                let bezierLine = d3
                    .line()
                    .x(function(d) {
                        return d[0];
                    })
                    .y(function(d) {
                        return d[1];
                    })
                    .curve(d3.curveBasis);

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
                this.element
                    .attr('stroke-dashoffset', function() {
                        let posY = window.pageYOffset;
                        //var forwardOnlyProgress = Math.min(progress, this.getTotalLength()-posY);
                        //var progressWithLimit = Math.max(0, forwardOnlyProgress);
                        let lineSpeed = 4;

                        /*if(Foundation.MediaQuery.current === 'xlarge') {
                            lineSpeed = 5;
                        }*/
                        if(Foundation.MediaQuery.current === 'large') {
                            lineSpeed = 8;
                        }
                        if(Foundation.MediaQuery.current === 'medium') {
                            lineSpeed = 9;
                        }
                        if(Foundation.MediaQuery.current === 'small') {
                            lineSpeed = 20;
                        }
                        let progress = this.getTotalLength()-posY*lineSpeed;

                        // event when path has reached its full length
                        if(progress < 0) {
                            let endEvent = new Event('pathEnd');
                            window.dispatchEvent(endEvent);
                        }

                        return Math.max(0, progress);
                    });
            }
        },
        {
            from: 1627,
            to: 2023,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .append('g')
                    .attr('class', 'bar')
                    .attr('transform', 'translate('+(960-300)+', 1400)')
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
                    [960-275, 1355],
                    [1920-50, 1000],
                    [960-300, 3200]
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
                    .select('#icon-clipboard');

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
                    [960-80, 1365],
                    [1920-55, 1100],
                    [960-300, 3000]
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
                    { x: (960 + 100 - 40),
                        y: 1333
                    },
                    {
                        x: (1920 - 600),
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
                    { x: (960 + 300 - 70),
                        y: 1325
                    },
                    {
                        x: (1920 - 300),
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
