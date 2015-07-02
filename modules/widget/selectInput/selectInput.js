/*
 *@description:可输入和自动提示的下拉选择框
 *
 * */

define(function (require, exports, modules) {
    require("jquery");
    require("scroller");

    var SelectInput = function (el, options) {
        this.$el = $(el);
        this.$input = this.$el.find("input");
        this.$optionList = this.$input.next(".optionList").scroller();
        this.options = $.extend({}, SelectInput.options, options);
        this.init()
    }

    SelectInput.options = {
        autoTip: true,
        clearBtn: true,
        allowLines:5//允许同时显示的行数
    }
    SelectInput.Options = {
        clearBtn: '<span class="btnClear" title="清除">×</span>'
    }

    //格式化结果
    SelectInput.formatResult = function (target, currentValue) {
        var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return target.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };
    SelectInput.onKeyup = function () {
        $.trim(this.$input.val()) !== "" ? this.$clearBtn.show() : this.$clearBtn.hide();
        if (this.currentValue !== this.$input.val()) {
            this.currentValue = this.$input.val()
            this.$input.trigger("selectChange");
        } else {
            return;//没有改变
        }
    };


    SelectInput.prototype.init = function () {
        var _this = this;
        var lines=Math.min(this.options.allowLines,this.$optionList.find("li").size());
        this.$optionList.height(lines*30);
        this.$el
            .on("mouseover", function () {
                if (_this.$input.val() !== "") {
                    _this.$clearBtn.show();
                }
            }).on("mouseout", function () {
                if(!_this.$input.is(":focus")){
                    _this.$clearBtn.hide();
                }
            });
        this.$input
            .on("focus", function () {
                _this.show();
                if (_this.$input.val() !== "") {
                    _this.$clearBtn.show();
                }else{
                    _this.$clearBtn.hide();
                }
            })
            .on("blur", function () {
                _this.$clearBtn.hide();
            })
            .on("keyup", $.proxy(SelectInput.onKeyup, this))
            .on("selectChange", $.proxy(SelectInput.filter, this));//用户输入变化时
        //选中下拉
        this.$optionList.on("click", ".option", function () {
            _this.$input.val($(this).text());
            _this.hide();
        })
        if (this.options.clearBtn) {
            this.$clearBtn = this.clearBtn()
        }
        $(window).on("click.md", function (e) {
            if ($.inArray(_this.$el.get(0), $(e.target).parents()) === -1) {
                _this.hide();
            }
        })

    }
    SelectInput.prototype.clearBtn = function () {
        return this.$clearBtn || $(SelectInput.Options.clearBtn).on("click", $.proxy(this.clear, this)).appendTo(this.$el);
    }

    SelectInput.prototype.clear = function () {
        this.$input.val("").trigger("focus");
    }

    //通过排用户的输入过滤显示下拉选项
    SelectInput.filter = function () {
        var currentValue = this.currentValue.toLowerCase();
        var html;

        var $resultOption = $.grep(this.$optionList.find("li"), function (option) {
            return option.outerHTML.indexOf(currentValue) !== -1;
        })
        $.each($resultOption, function (option) {
//            html += SelectInput.formatResult(option, currentValue)
        })

        this.$optionList.html(html);
    }
    //显示下拉选项
    SelectInput.prototype.show = function () {
        this.$optionList.show();
    };

    //隐藏下拉选项
    SelectInput.prototype.hide = function () {
        this.$optionList.hide();
    }

    $.fn.selectInput = function (options) {
        return this.each(function () {
            new SelectInput(this, options);
        })
    }

    $("[data-toggle='selectinput']").each(function () {
        new SelectInput(this);
    });


})