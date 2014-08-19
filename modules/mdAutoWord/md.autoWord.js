/**
 * Created by debiancc on 8/19/14.
 */

define(['jquery'], function (require, exports, module) {
    return (function ($) {
        $.fn.autoWord = function () {
            var el = $(this);
            var autoWorkSelector;

            $(document).on('keyup', el, function () {
                var data = ['asdas', 'asdqweq', 'qweqwe', 'qwezasdas', 'hgfdsaqqqq', 'zxiquweuiwqr'];
//                debugger;
                if (!autoWorkSelector) {
                    autoWorkSelector = $('<div class="md-auto-word-block"></div>')
                        .html('<ol><li>' + data.join('</li><li>') + '</li></ol>')
                        .appendTo(el.parent());
                }

            });

            el.focusout(function () {
                if (autoWorkSelector) {
                    autoWorkSelector.hide();
                }
            });


        }


    })(jQuery);
});
