define(["jquery"], function () {

    return (function ($) {
        //构造方法
        var MDModel = function (options, element) {
            this.$el = $(element);
            this.options = $.extend({}, MDModel.DEFAULTS, options);
            this.inti();
        };

        MDModel.DEFAULTS = {
            bgClose: true,//点击背景关闭
            target: null,//目标Model选择器
            onShow: null,
            onClose: null,
            onDestroy: null,
            content: null
        };

        //常量
        MDModel.prototype.STATICS = {
            template: '<div class="md-box"><div class="box-container"><div class="box-header"><span class="btn-close" title="关闭"><i class="icon-closeelement"></i> </span></div><div class="box-content"></div> </div> </div>'
        };

        //初始化方法
        MDModel.prototype.inti = function () {
            this.$model = this.model();
            //注册事件
            if (this.$el.length) this.$el.off("click").on("click", $.proxy(this.show, this));

            this.$model.find(".btn-close").on("click", $.proxy(this.hide, this));
            var _this = this;
            if (this.options.bgClose) {//点击背景遮罩，关闭model
                _this.$model.on("click", function (e) {
                    if (e.target === _this.$model[0]) _this.hide();
                });
            }
        };
        //返回model
        MDModel.prototype.model = function () {
            if (this.$model) {
                return this.$model;
            } else if (this.options.target) {
                return $(this.options.target);
            } else {
                return $(this.STATICS.template).find(".box-content").append(this.options.content).parents(".md-box").appendTo("body");
            }
        };
        MDModel.prototype.show = function () {//显示
            if (typeof this.options.onShow === 'function') this.options.onShow();
            this.$model.addClass("open");
        };

        MDModel.prototype.hide = function () {//隐藏
            if (typeof this.options.onClose === 'function') this.options.onClose();
            this.$model.removeClass("open");
        };
        MDModel.prototype.destroy = function () {
            if (typeof this.options.onDestroy === 'function') this.options.onDestroy();
            this.$model.remove();
        }

        $.fn.mdModel = function (options) {
            return this.each(function () {
                new MDModel(options, this);
            })
        };
        $.fn.mdModel.show = function (options) {
            return new MDModel(options).show();
        };
        $.fn.mdModel.destroyAll = function () {
            $(".mdModel").remove();
        }

        /*
         * data方式调用
         * */
        $("[data-toggle='box']").each(function () {
            var targetSelector = $(this).attr("href") || $(this).data("target");
            new MDModel({
                target: targetSelector
            }, this);
        });

        $.fn.mdModel.Constructor = MDModel;

        return MDModel;
    })(jQuery)
});