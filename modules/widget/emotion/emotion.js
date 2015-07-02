define(["modernizr", "./data", "./emotion.json"], function (require, module) {

    'use strict';

    require("./emotion.css");
    var data = require("./data.js");
    var Emotion = function (el, options) {
        this.$el = $(el);
        this.options = $.extend({}, Emotion.options, options);
        this._init();
    };

    Emotion.options = {
        input: "",//要绑定的表单元素的选择器
        imgPath: "/modules/widget/emotion/images/",//表情图片的路径
        defaultTab: 0,//默认显示哪一列表情
        mdBear: true,
        offset: 20,//尖角的位置偏移
        history: true,
        relatedSpace: 0,//与相对元素的位置
        placement: "top",//表情面板显示的位置，有top、right、bottom、left
        onSelect: function () {//当选中表情时触发
        },
        onMDBearSelect: function () {
        }
    };

    Emotion.prototype._init = function () {

        this.isOpen = false;
        this.$target = $(this.options.input);
        this.$el.on("click", $.proxy(this.toggle, this));
    };

    /**
     * 获取emotion
     */
    Emotion.prototype.emotion = function () {
        if (this.$emotion) {
            return this.$emotion;
        } else {
            var $mdEmotion = $('<div class="mdEmotion"><span class="arrow"></span> <div class="mdEmotionWrapper"></div><div class="mdEmotionTab"></div></div>'),
                tab = "",
                content = "",
                _this = this;

            $.each(data, function (index, item) {
                //明道和历史表情是否显示
                if (!_this.options.mdBear && index === 2 ||
                    (!_this.options.history && index === 0))return;
                //设置默认跳转
                tab += ('<span class="tabItem tab'
                + (index + 1)
                + (index === _this.options.defaultTab ? " active" : "") + '" title="'
                + item.tab.name + '"><i class="'
                + item.tab.emotionClass + '"></i>'
                + (item.tab.text || "") + '</span>');
                content += '<div class="mdEmotionPanel panel' + (index + 1) + (index === _this.options.defaultTab ? " active" : "") + '"></div>';
            });
            $mdEmotion.find(".mdEmotionTab").html(tab).end().find(".mdEmotionWrapper").html(content);

            return $mdEmotion;
        }
    };

    /**
     * 获取角标
     * @returns {*}
     */
    Emotion.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.emotion().find('.arrow');
    };

    /**
     * 获取表情面板的位置
     * @returns {{}}
     * @private
     */
    Emotion.prototype._getPosition = function () {

        var position = {
            top: 0,
            left: 0
        };

        if (this.$el.length) {

            position.left = this.$el.offset().left + this.options.relatedSpace;
            position.top = this.$el.offset().top + this.options.relatedSpace;

            //各个边界的计算
            if (this.options.placement === "bottom") {
                position.top += this.$el.outerHeight();
            } else if (this.options.placement === "right") {
                position.left += this.$el.outerWidth();
            } else if (this.options.placement === "top") {
                position.top -= this.emotion().outerHeight();
            } else if (this.options.placement === "left") {
                position.left -= this.emotion().outerWidth();
            }
        }
        return position;
    };

    /**
     * 设置表情元素的位置
     * @private
     */
    Emotion.prototype._setPosition = function (left, top) {

        this.emotion().addClass("emotion-" + this.options.placement);
        //垂直方向
        if (this.options.placement === "top" || this.options.placement === "bottom") {//水平方向越界
            this.arrow().css("left", this.$el.length ? Math.min(this.options.offset, this.$el.innerWidth() / 2) : this.options.offset);
        }

        //水平方向
        if (this.options.placement === "left" || this.options.placement === "right") {//垂直方向越界
            this.arrow().css("top", this.$el.length ? Math.min(this.options.offset, this.$el.outerHeight() / 2) : this.options.offset);
        }
        this.emotion().css({"left": left, "top": top});
    };

    /**
     * 选中表情
     * @param event
     */
    Emotion.prototype.select = function (event) {

        this.hide();
        var targetEmotion = event.currentTarget.outerHTML,
            targetEmotionSrc = event.currentTarget.getElementsByTagName("img")[0].getAttribute("src");

        //对于图片类的表情，由于其图片过大，无法跟文字在一起排版，所以一般单独做一条信息处理，所以不会在输入框中显示，需要单独处理
        if ($(event.currentTarget).closest(".mdEmotionPanel.panel3").length) {

            targetEmotion = targetEmotion.replace(" active", "").replace(".gif", ".png");
            targetEmotionSrc = targetEmotionSrc.replace(".png", ".gif");
            this._storeHistory(targetEmotion);

            //当点击选中明道的萌熊表情时，返回表情的图片和名称
            typeof this.options.onSelect === "function" && this.options.onMDBearSelect.call(this, event.currentTarget.getAttribute("title"), targetEmotionSrc);
            return;
        }
        this._storeHistory(targetEmotion);
        this.$target.val(this.$target.val() + '[' + event.currentTarget.getAttribute("title") + "]");
        typeof this.options.onSelect === "function" && this.options.onSelect.call(this, event.currentTarget.getAttribute("title"), targetEmotionSrc);
    };


    /**
     * 存储最近使用的表情
     * @param emotionStr
     * @private
     */
    Emotion.prototype._storeHistory = function (emotionStr) {
        if (window.localStorage) {
            if (!window.localStorage["mdEmotion"]) {
                window.localStorage["mdEmotion"] = JSON.stringify([emotionStr]);
                return;
            }
            var htyEmotions = JSON.parse(window.localStorage["mdEmotion"]), index;
            //如果要记录的表情已存在，则将该表情的位置提前
            if ((index = $.inArray(emotionStr, htyEmotions)) !== -1) {
                htyEmotions.splice(index, 1);
            }
            htyEmotions.unshift(emotionStr);
            window.localStorage["mdEmotion"] = JSON.stringify(htyEmotions);
        }
    };

    /**
     * 显示表情
     */
    Emotion.prototype.show = function (left, top) {
        var _this = this;
        this.$emotion = this.emotion()
            .on("click", ".emotionItem", $.proxy(this.select, this)).appendTo("body").on("click", ".mdEmotionTab .tabItem", function () {
                var $this = $(this);
                if (!$this.hasClass("active")) {
                    $this.siblings(".active").removeClass("active").end().addClass("active");
                    _this.emotion().find(".mdEmotionPanel").removeClass("active").eq($this.index()).addClass("active");
                    _this.load($this.index());
                }
            }).on("mouseover", ".emotionItemBear", function () {
                // 鼠标移过来时，显示gif图片
                var $bear = $(this).toggleClass("active").find("img");
                $bear.attr("src", $bear.attr("src").replace(".png", ".gif"))
            }).on("mouseout", ".emotionItemBear", function () {
                //鼠标移出时，显示png
                var $bear = $(this).toggleClass("active").find("img");
                $bear.attr("src", $bear.attr("src").replace(".gif", ".png"))
            });

        left = left || _this._getPosition().left, top = top || _this._getPosition().top;
        this._setPosition(left, top);
        this.load(_this.options.defaultTab);
        $(document).on("click.mdEmotion", function (e) {
            if (!$(e.target).closest(".mdEmotion").length || $.contains(_this.$el[0], e.target)) {
                _this.hide();
            }
        });
        $(window).on("resize.mdEmotion", function () {
            _this._setPosition();
        });
        this.isOpen = true;

        return this.$emotion;
    };

    /**
     * 载入表情
     * @param index
     */
    Emotion.prototype.load = function (index) {
        var $targetEmotion = this.emotion().find(".mdEmotionPanel").eq(index), _this = this, content = "";

        //历史记录
        if (_this.options.history && index === 0 && window.localStorage && window.localStorage["mdEmotion"]) {
            $.each(JSON.parse(window.localStorage["mdEmotion"]), function (i, item) {
                content += item;
            });
            $targetEmotion.html(content)
        }
        if (!$targetEmotion.data("loaded")) {
            $.each(data[index].content, function (i, item) {
                content += ('<a class="emotionItem '
                + (index === 2 ? "emotionItemBear" : "") //是否是明道熊
                + '" title="' + item.key + '"><img src="'
                + _this.options.imgPath + data[index].tab.path + item.img + '"> </a>')
            });
            $targetEmotion.html(content).data("loaded", true)
        }
    };

    Emotion.prototype.hide = function () {
        if (this.$emotion) {
            this.$emotion.remove();
            $(document).off("click.mdEmotion");
            $(window).off("resize.mdEmotion");
            this.isOpen = false;
        }
    };

    /**
     * 切换表情的状态
     * @returns {boolean}
     */
    Emotion.prototype.toggle = function () {
        if (!this.isOpen) {
            this.show();
        } else {
            this.hide();
        }
        return false;
    };

    /**
     * 表情的解析
     * @param str
     */
    Emotion.parse = function (str) {
        str = str || "";
        $.each(data, function (index, item) {
            $.each(item.content, function (index2, item2) {
                var reg = new RegExp("\\[" + item2.key + "\\]", "gi");
                if (str.search(reg) > -1) {
                    str = str.replace(reg, '<img src="' + Emotion.options.imgPath + item2.img + '">');
                }
            });
        });
        return str;
    };

    $.fn.emotion = function (options) {
        options = options || {};
        return this.each(function () {
            new Emotion(this, $.extend({}, {input: "#" + $(this).data("target")}, options));
        })
    };

    $.fn.emotion.parse = function (str) {
        return Emotion.parse(str);
    };
    $.fn.emotion.show = function (left, top) {
        return new Emotion().show(left, top);
    };

    $.fn.emotion.Constructor = Emotion;

    module.exports = Emotion;
});
