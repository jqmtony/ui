define(["jquery"], function (require, moduel, exports) {
    var $ = require("jquery");

    (function ($) {
        var TextEdit = function (element, options) {
            this.$editGroup = $(element);
            this.options = $.extend({}, TextEdit.Options, options);
            this.inti();
        }

        TextEdit.Options = {
            active: false,
            url: '',//服务器请求的地址
            isShowButton: true,
            onSuccess: null,//修改成功时调用的函数
            onFail: null,//修改失败
            onTimeout: null//网络连接失败
        }

        TextEdit.prototype.inti = function () {
            this.$inputEdit = this.$editGroup.find(".input-editable");
            this.$btnEdit = this.$editGroup.find(".btn-edit");
            this.$groupSave = this.$editGroup.find(".group-save");
            this.$btnCancel = this.$groupSave.find(".btn-cancel");
            this.$btnSave = this.$groupSave.find(".btn-save");
            this.active=this.options.active;

            this.$btnEdit.on("click", $.proxy(this.allowEdit, this));
            this.$btnCancel.on("click", $.proxy(this.cancelEdit, this));
            this.$btnSave.on("click", $.proxy(this.saveEdit, this));
            var _this = this;
            $("body").on("click.md", function (e) {
                if ($.inArray(_this.$editGroup.get(0), $(e.target).parents()) === -1) {
                    _this.cancelEdit();
                }
            })

        }
        TextEdit.prototype.getEditText = function () {
            var inputVal = this.$inputEdit.val();
            this.extension = inputVal.substring(inputVal.lastIndexOf(".") + 1);
            return this.editText = inputVal.substring(0, inputVal.lastIndexOf("."));
        }

        TextEdit.prototype.allowEdit = function () {
            this.getEditText();
            this.$inputEdit.addClass("focus").removeAttr("disabled").val(this.editText).focus();
            if (this.options.isShowButton) {
                this.$btnEdit.parents(".group-edit").hide();
                this.$groupSave.show();
            }
            this.active=true;
            return this;
        }
        TextEdit.prototype.cancelEdit = function () {//取消编辑
            if (!this.active) return;
            this.$groupSave.hide();
            this.$inputEdit.removeClass("focus").prop("disabled", "disabled").val(this.editText + "." + this.extension);
            this.$btnEdit.parents(".group-edit").show();
            return this;
        }
        TextEdit.prototype.saveEdit = function () {//保存编辑
            if (this.editText === this.$inputEdit.val()) {
                this.cancelEdit();
                return;
            }
            var _this = this;
            $.ajax({
                url: this.options.url,
                data: {editName: this.$inputEdit.val()},
                global: false,
                success: function (data, textStatus) {
                    if (data.trim() === "ok") {
                        if (typeof _this.options.onShow === 'function') _this.options.onShow();
                    } else {
                        _this.cancelEdit();
                        if (typeof _this.options.onFail === 'function') _this.options.onFail();
                    }
                },
                error: function () {
                    _this.cancelEdit();
                    if (typeof _this.options.onTimeout === 'function') _this.options.onTimeout();
                }
            })

        }

        $.fn.mdTextEdit = function (options) {
            return this.each(function () {
                new TextEdit(this, options);
            })
        }

        $.fn.mdTextEdit.Constructor = TextEdit

    })(jQuery)
})
