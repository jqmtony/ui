/*
 *
 * @description:自定义的select
 * */

define(function (require, exports, moudles) {

    var Select = function (el, options) {
        this.$el = $(el);
        this.options = $.extend({}, Select.options, options);
        this.init();
    };

    Select.options = {
        onChange: function (option, select) {
        },
        onSelect: function (option, select) {
        }
    };
    Select.prototype.init = function () {

        var _this = this;
        this.$el
            .on("click.md", ".selectBtn", $.proxy(this.toggle, this))
            .on("click.md", ".selectList li", function () {
                _this.onSelect(this);
            })
            .on("change.md", function (e, option) {//当选项改变时
                _this.options.onChange.call(_this, option, _this);
            });
    };
    /*切换下拉*/
    Select.prototype.toggle = function () {

        this.$el.toggleClass("open");

    };
    /*选中一个选项时*/
    Select.prototype.onSelect = function (option) {

        var $option = $(option),
            $detail = this.$el.find(".selectDetail"),
            optionValue = $option.data("value") || "",//如果没有设置时则为空字符串
            selectValue = $detail.data("value") || "";

        if (optionValue !== selectValue) {
            this.value = optionValue;//更新select的值
            $detail.data("value", optionValue).text($option.text());//更新值
            this.$el.trigger("change.md", option);//触发change事件
        }
        this.options.onSelect.call(this, option, this);
        this.toggle();
    };

    $.fn.select = function (options) {
        return this.each(function () {
            new Select(this, options);
        })
    };

    $("[data-toggle='select']").each(function () {
        new Select(this);
    });

    $.fn.select.Constructor = Select;

    return Select;
});