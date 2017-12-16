// First animation
var AnimatedSheet = require("./animated-sheet");

module.exports = new AnimatedSheet('#svg-1', {
    keyframes: [
        {
            from: 1627,
            to: 2023,
            remove: false,
            create: function(svg) {
                this.element = svg
                    .append('g')
                    .attr('class', 'bar')
                    .attr('transform', 'translate('+(window.innerWidth/2-300)+', 1400)')
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
                    [window.innerWidth/2-275, 1355],
                    [window.innerWidth-50, 1000],
                    [window.innerWidth/2-300, 3200]
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
                    [window.innerWidth/2-80, 1365],
                    [window.innerWidth-55, 1100],
                    [window.innerWidth/2-300, 3000]
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
                    { x: (window.innerWidth / 2 + 100 - 40),
                        y: 1333
                    },
                    {
                        x: (window.innerWidth - 600),
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
                    { x: (window.innerWidth / 2 + 300 - 70),
                        y: 1325
                    },
                    {
                        x: (window.innerWidth - 300),
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
