/**
 * Created by debiancc on 10/15/14.
 */

define(function (require, eports, module) {
    return (function ($) {
        if ('placeholder' in document.createElement('input') == false) {
            $(document).on({
                focusin: function () {
                    $(this).val('').addClass('placeHolderColor');
                },
                focusout: function () {
                    $(this).val($(this).attr('placeholder')).removeClass('placeholder');
                }
            }, '[placeholder]')
                .find('[placeholder]')
                .addClass('placeHolderColor')
                .val(function () {
                    return $(this).attr('placeholder');
                });
        }
    })(jQuery);

});
