/*
 *
 * @description:下拉菜单
 * */


define(function (require, exports, module) {

    return (function ($) {
        var Dropdown = function (el, options) {
            this.$el = $(el);
            this.options = $.extend({}, Dropdown.options, options);
            this.init();
        };
        Dropdown.options = {
            trigger: "click",//触发事件，可选“click”、“hover”
            onClick: function (li) {
            },//点击回调方法，li为当前点击的元素
            onShow: function () {
            },

            onHide: function () {
            }
        };
        Dropdown.prototype.init = function () {
            var _this = this;
            if (_this.options.trigger === "hover") {
                _this.$el.hover(function () {
                    if (!_this.$el.hasClass("open")) {
                        _this.$el.addClass("open");
                        _this.options.onShow.call(_this);
                    }
                }, function () {
                    _this.$el.removeClass("open");
                    _this.options.onHide.call(_this);
                });
            } else if (_this.options.trigger === "click") {
                _this.$el.click(function () {
                    _this.$el.toggleClass("open");
                })
            }
            this.$el.on("click",".dropdown-list li", function () {
                _this.options.onClick.call(_this, this);
            })
        }
        $.fn.dropdown = function (options) {
            return this.each(function () {
                new Dropdown(this, options);
            })
        };
        $("[data-toggle='dropdown']").each(function () {
            new Dropdown(this);
        });

        $.fn.dropdown.Constructor = Dropdown;

        module.exports = Dropdown;

    })(jQuery)
})
