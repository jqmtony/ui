define(["jquery"], function (require, module, exports) {

    'use strict';

    return (function ($) {
        //构造方法
        var Modal = function (options, element) {
            this.$el = $(element);
            this.options = $.extend({}, Modal.Options, options);
            this.inti();
        };

        //默认设置
        Modal.Options = {
            bgClose: true,//点击背景关闭
            target: null,//目标Model选择器
            onShow: null,
            onClose: null,
            onDestroy: null,
            content: null
        };

        //常量
        Modal.prototype.STATICS = {
            template: '<div class="modal"><div class="modalContainer"><div class="modalHeader"><span class="btnClose" title="关闭"><i class="icon-closeelement"></i> </span></div><div class="modalBody"></div> </div> </div>'
        };

        //初始化方法
        Modal.prototype.inti = function () {
            this.$model = this.model();
            //注册事件
            if (this.$el.length) this.$el.off("click.md").on("click.md", $.proxy(this.show, this));
            var _this = this;
            this.$model.find(".btnClose").on("click", $.proxy(this.hide, this));
            //ESC键退出
            $(document).on("keyup", function (e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            })

            if (this.options.bgClose) {//点击背景遮罩，关闭model
                _this.$model.on("click", function (e) {
                    if (e.target === _this.$model[0]) _this.hide();
                });
            }
        };
        //返回model
        Modal.prototype.model = function () {
            if (this.$model) {
                return this.$model;
            } else if (this.options.target) {
                return $(this.options.target);
            } else {
                return $(this.STATICS.template).find(".modalBody").append(this.options.content).parents(".modal").appendTo("body");
            }
        };
        Modal.prototype.show = function () {//显示
            if (typeof this.options.onShow === 'function') this.options.onShow();
            this.$model.addClass("open");
        };

        Modal.prototype.hide = function () {//隐藏
            if (typeof this.options.onClose === 'function') this.options.onClose();
            this.$model.removeClass("open");
        };
        Modal.prototype.destroy = function () {
            if (typeof this.options.onDestroy === 'function') this.options.onDestroy();
            this.$model.remove();
            this.$el.off("click.md");
        }

        $.fn.mdModel = function (options) {
            return this.each(function () {
                new Modal(options, this);
            });
        };
        $.fn.mdModel.show = function (options) {
            return new Modal(options).show();
        };
        $.fn.mdModel.destroyAll = function () {
            $(".mdModel").remove();
        }

        // data方式调用
        $("[data-toggle='model']").each(function () {
            var targetSelector = $(this).attr("href") || $(this).data("target");
            new Modal({
                target: targetSelector
            }, this);
        });

        $.fn.mdModel.Constructor = Modal;

        module.exports = Modal;

    })(jQuery)
});