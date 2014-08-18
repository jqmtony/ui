/*Created by Debiancc,2014-08-15 14:44:36*/
define(["jquery"], function (require, moduel, exports) {
    return (function ($) {
        var MdLoading = function (options) {
            this.options = $.extend({}, MdLoading.CONFIG, options);
            this.init();
        };

        MdLoading.CONFIG = {
            html: '<div class="md-loading-block"><img src="{imageSrc}"/></div>',
            imageSrc: '/images/folderLoading.gif',
            color: 'black',
            opacity: '0.7'
        };

        MdLoading.prototype.init = function () {
            var selector = $('.md-loading-block');
            //判断是否存在dom
            if (!selector.length) {
                var options = this.options;
                var screenHeight = $(window).height();
                $(options.html.replace('{imageSrc}', options.imageSrc))
                    .css({'color': options.color, 'opacity': options.opacity, 'height': screenHeight, 'line-height': screenHeight+'px'})
                    .appendTo('body');
            } else {
                selector.toggle();
            }
        };

        $.fn.loading = function (options) {
            return new MdLoading(options);
        };

        $.fn.loading.Constructor = MdLoading;

        return MdLoading;
    })(jQuery);
});