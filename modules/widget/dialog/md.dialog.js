define(function (require, exports, module) {

    var Drag, MDDialog;

    Drag = require('draggable');

    return MDDialog = (function ($) {
        function Dialog(element, opts) {
            this.element = element;
            this.opts = opts;
            this.$el = $(this.element);
            this.options = $.extend({}, Dialog.Options, this.opts);
            this.inti();
        }

        Dialog.Options = {
            onConfirm: function(){},
            onShow: null,
            onHide: null,
            title: '',
            content: null,
            width: 400,
            $dialog: null,
            draggable: false,
            footer: null,
            height: "auto"
        };

        Dialog.STATICS = {
            template: '<div class="md-dialog overlay"><div class="dialog"><div class="dialog-header"><span class="btn-link btn-close" type="button">×</span></div><div class="dialog-body"></div><div class="dialog-footer"><button class="btn btn-cancel">取消</button><button class="btn btn-primary btn-ok">确定</button></div></div></div>'
        };

        Dialog.prototype.inti = function () {
            this.dialog().show().remove();
            this.$header = this.$dialog.find(".dialog-header");
            this.$body = this.$dialog.find(".dialog-body");
            this.$footer = this.$dialog.find(".dialog-footer");
            var _this = this;
            if (this.options.title !== null) {
                this.$header.append(this.options.title);
            }
            if (this.options.content !== null) {
                this.$body.empty().append(this.options.content);
            }
            if (this.options.footer !== null) {
                this.$footer.append(this.options.footer);
            }
            this.$el.on("click", $.proxy(this.show, this));
        };

        Dialog.prototype.setPosition = function () {

            var left, top;

            left = ($(window).innerWidth() - this.$dialog.find(".dialog").innerWidth()) / 2;
            top = ($(window).innerHeight() - this.$dialog.find(".dialog").innerHeight()) / 2;
            return this.$dialog.find(".dialog").css({
                left: left,
                top: top
            });
        };

        Dialog.prototype.dialog = function () {
            return this.$dialog = this.$dialog || this.options.$dialog || $(Dialog.STATICS.template);
        };

        Dialog.prototype.show = function (opts) {
            var options;
            options = $.extend({}, Dialog.Options, this.options, opts);
            if (typeof this.options.onShow === 'function') {
                options.onShow.call(this);
            }
            this.dialog().show().appendTo("body");
            this.$dialog.on("click", ".btn-cancel,.btn-close", $.proxy(this.hide, this));
            this.$dialog.on("click", ".btn-ok", $.proxy(this.ok, this));
            $(document).on("keyup.md", function (e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            })
            if (this.options.draggable) {
                this.dialog().addClass('draggable');
                this.$header.draggable(this.$dialog.find(".dialog")[0]);
            }
            return this.setPosition();
        };

        Dialog.prototype.hide = function () {
            if (typeof this.options.onHide === 'function') {
                this.options.onHide();
            }
            $(document).off("keyup.md");
            return this.$dialog.remove();
        };

        Dialog.prototype.ok = function () {

            if (typeof this.options.onConfirm === 'function') {
                this.options.onConfirm.call(this);
            }
        };

        $.fn.dialog = function (options) {
            return this.each(function () {
                return new Dialog(this, options);
            });
        };

        $.fn.dialog.Constructor = Dialog;

        module.exports = Dialog;

    })(jQuery);
});