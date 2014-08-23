/**
 * Created by debiancc on 8/19/14.
 */

define(['jquery'], function (require, exports, module) {
    return (function ($) {
        var el, elValue, isVisible = false;

        var MDAutoWord = function (options) {
            this.CONFIG = $.extend({}, MDAutoWord.CONFIG, options);
            this.init(this.CONFIG);

        }

        MDAutoWord.CONFIG = {
            key: '@',
            isTwins: false,
            listLength: 10,
            isLoopList: true,
            data: ['asdadz', 'qwe123123', 'zxzvzx', 'asdqwe', 'asdqweqw', 'zva312)(*&', '束手就擒和', '企鹅231请问怎么牛逼'].sort()
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
                    var elValue = el.val();
                    //当列表为展开&&不为快捷键&&最后字符不为关键符，根据最后一个关键字reload列表
                    if (isVisible && !(event.which == MDAutoWord.WhichKey.UP
                        || event.which == MDAutoWord.WhichKey.DOWN
                        || event.which == MDAutoWord.WhichKey.LEFT
                        || event.which == MDAutoWord.WhichKey.RIGHT
                        || event.which == MDAutoWord.WhichKey.ESC
                        || event.which == MDAutoWord.WhichKey.ENTER) && (lastChar = elValue.substr(elValue.length - 1)) != options.key) {
                        if (!lastChar)return;
                        var lastIndexOfKeyWord = elValue.substring(elValue.lastIndexOf(options.key) + 1, elValue.length);

                        var firstRes , sencondsRes;
                        firstRes = sencondsRes = '';
                        for (var i = options.data.length - 1; i >= 0; i--) {
                            var item = options.data[i];
                            var positionIndex = item.indexOf(lastIndexOfKeyWord);
                            if (positionIndex == 0) {
                                firstRes += '<li>' + item.replace(lastIndexOfKeyWord, '<b>' + lastIndexOfKeyWord + '</b>') + '</li>';
                            } else if (positionIndex != -1) {
                                sencondsRes += '<li>' + item.replace(lastIndexOfKeyWord, '<b>' + lastIndexOfKeyWord + '</b>') + '</li>';
                            }
                        }

                        autoWordSelector[0].innerHTML = ('<ol>' + firstRes + sencondsRes + '</ol>').replace('<li>', '<li class="hover">');
                    }


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

                    var hoverSelector = $('.md-auto-word-block ol').find('.hover');
                    switch (event.which) {
                        case MDAutoWord.WhichKey.DOWN:
                            if (hoverSelector.next().length) {
                                hoverSelector.removeClass('hover').next().addClass('hover');
                            } else if (MDAutoWord.CONFIG.isLoopList) {
                                hoverSelector.removeClass('hover').siblings().eq(0).addClass('hover');
                            }
                            break;
                        case MDAutoWord.WhichKey.UP:
                            if (hoverSelector.prev().length) {
                                hoverSelector.removeClass('hover').prev().addClass('hover');
                            } else if (MDAutoWord.CONFIG.isLoopList) {
                                hoverSelector.removeClass('hover').siblings().eq(-1).addClass('hover');
                            }
                            break;
                        case MDAutoWord.WhichKey.ESC:
                            _this.hide.call(autoWordSelector, autoWordLISelector);
                            break;
                        case MDAutoWord.WhichKey.ENTER:
                            hoverSelector.trigger('click');
                            break;
                    }

                }
            });
        };

        MDAutoWord.prototype.hide = function (li) {
            this.hide();
            this.css('z-index', 0);
            li.removeClass('hover');
            el.focus();
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

//        $.fn.getCursorPosition = function () {
//            var el = $(this).get(0);
//
//            var pos = 0;
//            if ('selectionStart' in el) {
//                pos = el.selectionStart;
//            } else if ('selection' in document) {
//                el.focus();
//                var Sel = document.selection.createRange();
//                var SelLength = document.selection.createRange().text.length;
//                Sel.moveStart('character', -el.value.length);
//                pos = Sel.text.length - SelLength;
//            }
//            return pos;
//        }


    })(jQuery);
});
