/**
 * Created by debiancc on 10/15/14.
 */

define(function (require, eports, module) {
    return (function ($) {
        if ('placeholder' in document.createElement('input') == false) {
            $('head').append($('<style>.mdPlaceholder{color:#BFBFBF !important;}</style>'));
            $(document).on({
                focusin: function () {
                    $(this)
                        .removeClass('mdPlaceholder');
                    origValFn.call($(this), function (index, value) {
                        var $this = $(this), placeholder = $this.attr('placeholder');
                        if (value != placeholder) {
                            return value;
                        }
                        return '';
                    });
                },
                focusout: function () {
                    origValFn.call($(this), function (index, value) {
                        var $this = $(this);
                        //has not value
                        if (!value.trim()) {
                            return $this.addClass('mdPlaceholder').attr('placeholder');
                        } else {
                            $this.removeClass('mdPlaceholder');
                        }
                        return value;
                    });
                }
            }, '[placeholder]')
                .find('[placeholder]')
                .addClass('mdPlaceholder')
                .val(function () {
                    return $(this).attr('placeholder');
                });

            var origValFn = $.fn.val;
            $.fn.val = function () {
                var returnValue = origValFn.apply(this, arguments);

                //fix at use jquery val function change element value,the element focusout event not trigger.
                var $this = $(this);
                if ($this.attr('placeholder') && arguments.length != 0) {
                    $this.trigger('focusout');
                }

                return returnValue;
            };


        }
    })(jQuery);
});