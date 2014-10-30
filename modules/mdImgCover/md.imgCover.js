define(["jquery"], function (require, moduel, exports) {
    (function ($) {
        var ImgCover = function (element, options) {
            this.$el = $(element);
            this.options = $.extend({}, ImgCover.Options, options);
            this.$img = this.$el.find("img");
            this.setCover();
        }

        ImgCover.Options = {
            mode: "cover"//两种模式,一是cover，二是contain
        }
        ImgCover.prototype.setCover = function () {
            var imgRatio = null;
            var img = new Image();
            img.src = this.$img.attr("src");
            if (img.complete) {
                this.setStyle(img);
            } else {
                img.onload = function () {
                    this.setStyle(img);
                }
            }

        }
        ImgCover.prototype.setStyle = function (img) {
            var imgRatio = img.width / img.height;
            var containerRatio = this.$el.innerWidth() / this.$el.innerHeight();

            if (this.options.mode === "cover" && imgRatio < containerRatio) {//高度超出
                this.$img.css({
                    "max-width": "100%",
                    "width": "100%",
                    "height": "auto"
                })
            } else if (this.options.mode === "cover" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "none",
                    "height": "100%",
                    "width": "auto"
                })
            } else if (this.options.mode === "contain" && imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    "height": "100%",
                    "width": "auto"
                })
            } else if (this.options.mode === "contain" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    "width": "100%",
                    "height": "auto"
                })
            }
        }
        $.fn.imgCover = function (options) {
            return this.each(function () {
                new ImgCover(this, options);
            })
        }
        $.fn.imgCover.Constructor = ImgCover;
    })(jQuery)
})