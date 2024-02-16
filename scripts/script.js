$(document).ready(function() {
    // Replace text with spans
    replaceTextWithSpans('philoscope', 'Philo', 'scope');

    // Navbar scroll event
    var navbar = $('.navbar');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // Initialize Bootstrap tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
});

function replaceTextWithSpans(className, part1, part2) {
    var elements = $('.' + className);

    elements.each(function(index, element) {
        var originalText = $(element).text();
        var modifiedHTML = '<span class="philo">' + part1 + '</span><span class="scope">' + part2 + '</span>';
        $(element).html(originalText.replace(/Philo'scope/g, modifiedHTML));
    });
}
