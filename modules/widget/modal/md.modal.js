define(["modernizr"], function (require, module, exports) {

    require("modernizr");

    'use strict';

    return (function ($) {

        var animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
            animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

        //构造方法
        var Modal = function (options, element) {
            this.$el = $(element);
            this.options = $.extend({}, Modal.Options, options);
            this.inti();
        };

        //默认设置
        Modal.Options = {
            bgClose: true,//点击背景关闭
            target: null,//目标Modal选择器
            onShow: null,
            onClose: null,
            onDestroy: null,
            content: null
        };

        //常量
        Modal.prototype.STATICS = {
            template: '<div class="modal" style="display: none"><div class="modalOverlay"></div> <div class="modalContainer"><div class="modalHeader"><span class="btnClose" title="关闭"><i class="icon-closeelement"></i> </span></div><div class="modalBody"></div> </div> </div>'
        };

        //初始化方法
        Modal.prototype.inti = function () {
            this.$modal = this.modal();
            //注册事件
            if (this.$el.length) this.$el.off("click.md").on("click.md", $.proxy(this.show, this));
            this.$modal.find(".btnClose").on("click", $.proxy(this.hide, this));

            var _this = this;

            //ESC键退出
            $(document).on("keyup", function (e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            });

            if (this.options.bgClose) {//点击背景遮罩，关闭modal
                _this.$modal.on("click", ".modalOverlay", function (e) {
                    _this.hide();
                });
            }
        };
        //返回modal
        Modal.prototype.modal = function () {
            if (this.$modal) {
                return this.$modal;
            } else if (this.options.target) {
                return $(this.options.target);
            } else {
                return $(this.STATICS.template).find(".modalBody").append(this.options.content).parents(".modal").appendTo("body");
            }
        };
        Modal.prototype.show = function () {//显示
            if (typeof this.options.onShow === 'function') this.options.onShow();
            this.$modal.show().addClass("open");
        };

        Modal.prototype.hide = function () {//隐藏
            var _this = this;
            this.$modal.removeClass("open").addClass("close");

            this.$modal.find(".modalContainer").one(animEndEventName, function(){
                _this.$modal.hide().removeClass("close");
            });

            if (typeof this.options.onClose === 'function') this.options.onClose();
        };
        Modal.prototype.destroy = function () {
            if (typeof this.options.onDestroy === 'function') this.options.onDestroy();
            this.$modal.remove();
            this.$el.off("click.md");
        }

        $.fn.mdModal = function (options) {
            return this.each(function () {
                new Modal(options, this);
            });
        };
        $.fn.mdModal.show = function (options) {
            return new Modal(options).show();
        };
        $.fn.mdModal.destroyAll = function () {
            $(".mdModal").remove();
        };

        // data方式调用
        $("[data-toggle='modal']").each(function () {
            var targetSelector = $(this).attr("href") || $(this).data("target");
            new Modal({
                target: targetSelector
            }, this);
        });

        $.fn.mdModal.Constructor = Modal;

        module.exports = Modal;

    })(jQuery)
});