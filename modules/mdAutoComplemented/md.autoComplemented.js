/**
 * Created by debiancc on 8/19/14.
 */

define('jquery', function (req, exp, modules) {
    return (function ($) {
        $.fn.autoWord = function () {
            var el = $(this);

            $(document).on('keyup', el, function () {

            });


        }
    })(jQuery);
});
