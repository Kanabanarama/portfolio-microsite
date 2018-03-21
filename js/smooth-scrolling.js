// Smooth scrolling animations
module.exports = class SmoothScrolling {

    constructor() {
        $(document).ready(function() {
            $('#topBarNavigationMenu a').on('click', function(event) {
                if (this.hash !== '') {
                    event.preventDefault();
                    $('html, body').stop(true, false);
                    var hash = this.hash;
                    var target = $('a[name="'+hash.substring(1, hash.length)+'"]');
                    var targetPosition = $(target).offset();
                    var nowPosition = $(document).scrollTop();
                    var scrollingDistance = Math.max(500, Math.round(Math.abs(nowPosition - targetPosition.top)));
                    if(targetPosition) {
                        $('html, body').animate({
                            scrollTop: targetPosition.top
                        }, scrollingDistance, function(){
                            window.location.hash = hash;
                        });
                    }
                }
            });
        });
    }

};