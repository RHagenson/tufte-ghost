/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        addFigCaptions();

        // If the window is resized, the footnotes will have to move.
        $(window).resize(placeFootnotes);
    });

    // Wait to make sure everything is loaded before calculating the locations of footnotes.
    $(window).load(function() {
        placeFootnotes();
    });


})(jQuery);

var placeFootnotes = function() {
    var top, prev = null;

    if($(window).width() > 760) {
        $('a[href^="#fnref"]').remove();

        $('.footnotes ol li').each(function(index, footnote) {
            top = Math.floor($('#fnref\\:' + (index+1)).position().top) - Math.floor(parseInt($(footnote).css('fontSize'))*1.5);

            if(prev != null && $(prev).position().top + $(prev).height() > top) {
                top = Math.floor($(prev).position().top + $(prev).height()) + 10;
            }

            $(footnote).css('top', top + 'px');
            prev = footnote;
        });

        if($('.post-content').height() < top + $(prev).height()) {
            $('.post-content').height(top + $(prev).height());
        }

    }
}

var addFigCaptions = function() {
    $('.post-content figure img').each(function(index, figure) {
        var caption = $(figure).attr('alt');
        $(figure).after('<figcaption>' + caption + '</figcaption>');
    });
}