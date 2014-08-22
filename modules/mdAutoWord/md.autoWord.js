/**
 * Created by debiancc on 8/19/14.
 */

define(['jquery'], function (require, exports, module) {
    return (function ($) {
        var el, isVisible = false;

        var MDAutoWord = function (options) {
            this.CONFIG = $.extend({}, MDAutoWord.CONFIG, options);
            this.init(this.CONFIG);

        }

        MDAutoWord.CONFIG = {
            key: '@',
            isTwins: false,
            listLength: 10,
            isLoopList: true,
            data: ['asdadz', 'qwe123123', 'zxzvzx', 'asdqwe', 'asdqweqw', 'zv312)(*&', '束手就擒和', '企鹅231请问怎么牛逼']
        }

        MDAutoWord.WhichKey = {
            UP: 38,
            DOWN: 40,
            ESC: 27,
            ENTER: 13,
            LEFT: 37,
            RIGHT: 39
        }

        MDAutoWord.prototype.init = function (options) {
            var autoWordSelector, autoWordLISelector, _this = this;
            el.on({
                'keydown': function () {
                    if (isVisible && (event.which == MDAutoWord.WhichKey.UP
                        || event.which == MDAutoWord.WhichKey.DOWN
                        || event.which == MDAutoWord.WhichKey.LEFT
                        || event.which == MDAutoWord.WhichKey.RIGHT
                        || event.which == MDAutoWord.WhichKey.ESC
                        || event.which == MDAutoWord.WhichKey.ENTER)) {
                        event.preventDefault();
                    }
                },
                'keyup': function () {
                    var elVal = el.val();
                    if (elVal.substr(elVal.length - 1) != options.key)return;
                    if (!autoWordSelector) {
                        autoWordSelector = $('<div class="md-auto-word-block"></div>')
                            .html('<ol><li class="hover">' + options.data.join('</li><li>') + '</li></ol>')
                            .insertAfter(el);
                        isVisible = true;

                        autoWordLISelector = autoWordSelector.find('li');

                        autoWordLISelector.on('click', function () {
                            var liValue = this.innerText;
                            el.val(function (index, val) {
                                return val + liValue + (options.isTwins ? options.key : ' ');
                            });
                            _this.hide.call(autoWordSelector, autoWordLISelector);
                        }).hover(function () {
                            var thisSelector = $(this);
                            autoWordLISelector.removeClass('hover');
                            thisSelector.addClass('hover');
                        });

                        return;
                    }

                    //TODO::eq(0)===[0]
                    if (!isVisible) {
                        _this.show.call(autoWordSelector, autoWordLISelector.eq(0));
                    }

                    switch (event.which) {
                        case MDAutoWord.WhichKey.DOWN:
                            var hoverSelector = autoWordSelector.find('li.hover');
                            if (hoverSelector.next().length) {
                                autoWordSelector.find('li.hover').removeClass('hover').next().addClass('hover');
                            } else if (MDAutoWord.CONFIG.isLoopList) {
                                autoWordSelector.find('li.hover').removeClass('hover');
                                autoWordLISelector.eq(0).addClass('hover');
                            }
                            break;
                        case MDAutoWord.WhichKey.UP:
                            var hoverSelector = autoWordSelector.find('li.hover');
                            if (hoverSelector.prev().length) {
                                hoverSelector.removeClass('hover').prev().addClass('hover');
                            } else if (MDAutoWord.CONFIG.isLoopList) {
                                autoWordSelector.find('li.hover').removeClass('hover');
                                autoWordLISelector.eq(-1).addClass('hover');
                            }
                            break;
                        case MDAutoWord.WhichKey.ESC:
                            _this.hide.call(autoWordSelector, autoWordLISelector);
                            break;
                        case MDAutoWord.WhichKey.ENTER:
                            autoWordSelector.find('li.hover').trigger('click');
                            break;
                    }
                }
            });
        };

        MDAutoWord.prototype.hide = function (li) {
            this.hide();
            this.css('z-index', 0);
            li.removeClass('hover');
//            el.focus();
            isVisible = false;
        }

        MDAutoWord.prototype.show = function (li) {
            this.show();
            this.css('z-index', 99);
            li.eq(0).addClass('hover');
            isVisible = true;
        }

        $.fn.autoWord = function (options) {
            el = $(this);
            return new MDAutoWord(options);
        }

        $.fn.getCursorPosition = function () {
            var el = $(this).get(0);
            var pos = 0;
            if ('selectionStart' in el) {
                pos = el.selectionStart;
            } else if ('selection' in document) {
                el.focus();
                var Sel = document.selection.createRange();
                var SelLength = document.selection.createRange().text.length;
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - SelLength;
            }
            return pos;
        }


    })(jQuery);
});
