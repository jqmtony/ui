/*
 *
 * @description:下拉菜单
 * */


 define(["jquery"], function (require, exports, moudles) {

    require("./dropdown.css");

    return (function ($) {
        var Dropdown = function (el, options) {
            this.$el = $(el);
            this.options = $.extend({}, Dropdown.options, options);
            this.init();

        }
        Dropdown.options = {
            trigger: "hover",
            clickCallbacks: []
        }
        Dropdown.prototype.init = function () {
            var _this = this;
            if (_this.options.trigger === "hover") {
                _this.$el.hover(function () {
                    if (!_this.$el.hasClass("open")) {
                        _this.$el.addClass("open")
                    }
                }, function () {
                    _this.$el.removeClass("open")
                });
            } else if (_this.options.trigger === "click") {
                _this.$el.click(function () {
                    _this.$el.toggleClass("open");
                })
            }
            var $dropdownItem = _this.$el.find(".dropdown-list li");
            for (var i = 0; i < _this.options.clickCallbacks.length; i++) {
                $dropdownItem.eq(i).on("click", (function (i) {//闭包
                    return function () {
                        if (typeof _this.options.clickCallbacks[i] === "function") _this.options.clickCallbacks[i].call();
                    }
                })(i))
            }
        }
        $.fn.dropdown = function (options) {
            return this.each(function () {
                new Dropdown(this, options);
            })
        };
        $("[data-toggle='dropdown']").each(function () {
            new Dropdown(this);
        });
    })(jQuery)
})
