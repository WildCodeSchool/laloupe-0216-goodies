$(document).ready(function() {
    var trigger = angular.element($('.hamburger')),
        overlay = angular.element($('.overlay')),
        links = angular.element($('.links')),
        isClosed = false;

    trigger.click(function() {
        hamburger_cross();
    });
    links.click(function() {
        hamburger_cross();
        angular.element($('#wrapper')).toggleClass('toggled');
    });
    overlay.click(function() {
        hamburger_cross();
        angular.element($('#wrapper')).toggleClass('toggled');
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    angular.element($('[data-toggle="offcanvas"]')).click(function() {
        angular.element($('#wrapper')).toggleClass('toggled');
    });
});
