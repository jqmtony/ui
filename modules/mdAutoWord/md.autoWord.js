/**
 * Created by debiancc on 8/19/14.
 */

define(['jquery'], function (require, exports, module) {
    return (function ($) {

        var MDAutoWord = function (options, el) {
            this.CONFIG = $.extend({}, MDAutoWord.CONFIG, options);
            this.init(el, this.CONFIG);

        }

        MDAutoWord.CONFIG = {
            key: '@',
            isTwins: false,
            data: ['asdadz', 'qwe123123', 'zxzvzx', 'asdqwe', 'asdqweqw', 'zv312)(*&', '束手就擒和', '企鹅231请问怎么牛逼']
        }

        MDAutoWord.prototype.init = function (el, options) {
            var autoWorkSelector;

            $(document).on('keyup', el, function () {
                debugger;
                if (!autoWorkSelector) {
                    autoWorkSelector = $('<div class="md-auto-word-block"></div>')
                        .html('<ol><li>' + options.data.join('</li><li>') + '</li></ol>')
                        .appendTo(el.parent());

                    //注册li点击事件
                    autoWorkSelector.on('click', autoWorkSelector.find('li'), function () {
                        debugger;
                        el.val(this.text);
                    });

                } else {
                    MDAutoWord.show.call(autoWorkSelector);
                }
            });


            el.focusout(function () {
                if (autoWorkSelector) {
                    MDAutoWord.hide.call(autoWorkSelector);
                }
            });

        };

        MDAutoWord.prototype.hide = function () {
            this.hide();
            this.css('z-index', 0);
        }

        MDAutoWord.prototype.show = function () {
            this.show();
            this.css('z-index', 99);
        }


        $.fn.autoWord = function (options) {
            return new MDAutoWord(options, $(this));
        }


    })(jQuery);
});
