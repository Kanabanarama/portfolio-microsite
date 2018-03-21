// CSS Icon Animations
module.exports = class PopupIcons {

    constructor() {
        window.addEventListener('pathEnd', this.animate);
    }

    animate() {
        var animatedElements = $('.animated:visible');

        animatedElements.each(function (index, element) {
            // Popup animation triggered when icon is scrolled into view
            if ($(element).attr('class').indexOf('animate-popup') === -1
                && $(element).attr('class').indexOf('animate-view-popup') !== -1) {
                var viewportTop = $(document).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                var elementTop = Math.round($(element).offset().top);
                if (elementTop + 300 < viewportBottom) {
                    $(element).addClass('animate-popup')
                }
            }
        });
    }

};