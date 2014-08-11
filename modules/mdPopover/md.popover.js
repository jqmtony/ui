define(["jquery"], function (require, moduel, exports) {
    var $ = require("jquery");

    return (function ($) {
        var MDPopover = function (element, options) {
            this.$el = $(element);
            this.options = $.extend({}, MDPopover.DEFAULTS, options);
            this.inti();
        }

        MDPopover.DEFAULTS = {
            template: '<div class="popover popover-auto" data-open="false"><div class="arrow"></div></div>',
            related: 'body',
            relatedSpace: 10,
            onlyOne: false,
            placement: "bottom",
            content: null,
            $popover: null
        }

        //初始化的函数
        MDPopover.prototype.inti = function () {
            this.popover().data("open", false);
            this.isOpen = false;
            this.isManual = this.options.content ? false : true;
            this.$el.on("click", $.proxy(this.toggle, this));
        }

        MDPopover.prototype.popover = function () {
            return this.$popover = this.$popover || $(this.options.template).append(this.options.content);
        }

        MDPopover.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.popover().find('.arrow');
        }

        MDPopover.prototype.getPosition = function () {
            var position = {};
            position.left = this.$el.offset().left - $(this.options.related).offset().left;
            position.top = this.$el.offset().top - $(this.options.related).offset().top;
            if (this.options.placement === "bottom") {
                this.popover().addClass("popover-bottom");
                position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
                position.top += this.$el.innerHeight();
            } else if (this.options.placement === "right") {
                this.popover().addClass("popover-right");
                position.left += this.$el.innerWidth();
                position.top += +(this.$el.innerHeight() - this.popover().innerHeight()) / 2
            } else if (this.options.placement === "top") {
                this.popover().addClass("popover-top");
                position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
                position.top -= this.popover().innerHeight();
            } else if (this.options.placement === "left") {
                this.popover().addClass("popover-left");
                position.left -= this.$el.innerWidth();
                position.top += +(this.$el.innerHeight() - this.popover().innerHeight()) / 2
            }
            return position;
        }

        MDPopover.prototype.setPosition = function () {
            var position = this.getPosition();
            var popLeft = position.left//参照
            var popTop = position.top;

            popLeft = popLeft >= this.options.relatedSpace ? popLeft : this.options.relatedSpace;//如果popover的安全距离小于一定值，则保持安全距离
            popTop = popTop >= this.options.relatedSpace ? popTop : this.options.relatedSpace;//如果popover的安全距离小于一定值，则保持安全距离

            if (popLeft <= this.options.relatedSpace) {//水平方向越界
                popLeft = this.options.relatedSpace;
                this.arrow().css("left", this.$el.offset().left + this.$el.innerWidth() / 2);
            }
            if (popTop <= this.options.relatedSpace) {//垂直方向越界
                popTop = this.options.relatedSpace;
                this.arrow().css("top", this.$el.offset().top + this.$el.innerHeight() / 2);
            }
            this.popover().css({"left": popLeft, "top": popTop });
//
        }

        MDPopover.prototype.close = function () {//关闭
            if (!this.isOpen) {
                return;
            } else {
                if (this.isManual) {
                    this.$popover.hide();
                } else {
                    this.$popover.remove();
                }
                this.isOpen = false
                this.$popover.data("open", false);
            }
        }

        MDPopover.prototype.open = function () {//打开
            if (this.isManual) {
                this.$popover.show();
            } else {
                this.popover().appendTo(this.options.related);
                this.setPosition();
            }
            if (this.options.onlyOne) this.hideOther();//隐藏其他的popover
            this.isOpen = true;
            this.popover().data("open", true);
        }

        MDPopover.prototype.toggle = function () {
            this.isOpen = this.$popover.data("open") === true;
            if (this.isOpen) {//切换当前状态
                this.close();
            } else {
                this.open();
            }
        }

        //隐藏其他所有的popover
        MDPopover.prototype.hideOther = function () {
            if (this.options.isManual) {
                $(".popover-manual").not(this.$popover).data("open", false).hide();
                $(".popover-auto").data("close", true).remove();
            } else {
                $(".popover-manual").data("open", false).hide();
                $(".popover-auto").not(this.$popover).remove();
            }
        }

        $.fn.mdPopover = function (options) {
            return this.each(function () {
                new MDPopover(this, options);
            })
        }

        $.fn.mdPopover.Constructor = MDPopover
    })(jQuery)
})