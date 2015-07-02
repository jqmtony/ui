define(function (require, module, exports) {

    var Popover = function (element, options) {
        this.$el = $(element);
        this.options = $.extend({}, Popover.Options, options);
        this.init();
    };

    //默认值
    Popover.Options = {
        related: 'body',
        relatedSpace: 10,
        onlyOne: false,
        placement: "bottom",
        content: null
    };
    Popover.STATICS = {
        template: '<div class="popover popover-auto" data-open="false"><div class="arrow"></div></div>'
    };

    //初始化的函数
    Popover.prototype.init = function () {
        this.popover().data("open", false);
        this.isOpen = false;
        this.isManual = this.options.content ? false : true;
        this.$el.on("click", $.proxy(this.toggle, this));
        console.log("ok");
    };

    //得到popover
    Popover.prototype.popover = function () {
        return this.$popover = this.$popover || $(Popover.STATICS.template).append(this.options.content);
    };

    //得到尖角
    Popover.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.popover().find('.arrow');
    };

    Popover.prototype.getPosition = function () {

        var position = {};

        position.left = this.$el.offset().left - $(this.options.related).offset().left;
        position.top = this.$el.offset().top - $(this.options.related).offset().top;

        //各个边界的计算
        if (this.options.placement === "bottom") {
            this.popover().addClass("popover-bottom");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top += this.$el.outerHeight();
        } else if (this.options.placement === "right") {
            this.popover().addClass("popover-right");
            position.left += this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2
        } else if (this.options.placement === "top") {
            this.popover().addClass("popover-top");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top -= this.popover().outerHeight();
        } else if (this.options.placement === "left") {
            this.popover().addClass("popover-left");
            position.left -= this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2
        }

        return position;
    };

    Popover.prototype.setPosition = function () {
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
            this.arrow().css("top", this.$el.offset().top + this.$el.outerHeight() / 2);
        }
        this.popover().css({"left": popLeft, "top": popTop });
    };

    Popover.prototype.close = function () {//关闭
        if (!this.isOpen) {
            return;
        } else {
            if (this.isManual) {
                this.$popover.hide();
            } else {
                this.$popover.remove();
            }
            this.isOpen = false;
            this.$popover.data("open", false);
        }
    };

    Popover.prototype.open = function () {//打开
        if (this.isManual) {
            this.$popover.show();
        } else {
            this.popover().appendTo(this.options.related);
            this.setPosition();
        }
        if (this.options.onlyOne) this.hideOther();//隐藏其他的popover
        this.isOpen = true;
        this.popover().data("open", true);
    };

    Popover.prototype.toggle = function () {
        this.isOpen = this.$popover.data("open") === true;
        if (this.isOpen) {//切换当前状态
            this.close();
        } else {
            this.open();
        }
    };

    //隐藏其他所有的popover
    Popover.prototype.hideOther = function () {
        if (this.options.isManual) {
            $(".popover-manual").not(this.$popover).data("open", false).hide();
            $(".popover-auto").data("close", true).remove();
        } else {
            $(".popover-manual").data("open", false).hide();
            $(".popover-auto").not(this.$popover).remove();
        }
    };

    $.fn.mdPopover = function (options) {
        return this.each(function () {
            new Popover(this, options);
        })
    };

    $.fn.mdPopover.Constructor = Popover;

    module.exports = Popover;

});