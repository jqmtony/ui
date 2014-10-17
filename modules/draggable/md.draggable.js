define("jquery", function (require) {
    return (function ($) {
        var Drag = function (dragEl, targetEl, options) {
            this.options = $.extend({}, Drag.DEFAULTS, options);
            this.$drapEl = $(dragEl);//拖拽元素
            this.$targetEl = $(targetEl);
            this.moveable = false;
            var _this = this;
            this.$drapEl.on("mousedown", function (e1) {
                _this.moveable = true;
                _this.lastEvent = e1;
                $(document).on("mousemove", function (e2) {
                    _this.move(e2);
                });
                $(document).on("mouseup", function (e) {
                    _this.moveable = false;
                    $(document).off("mousemove");
                    $(window).off("selectstart");
                })
                $(window).on("selectstart", function () {
                    return false;
                })
            })
        }

        Drag.DEFAULTS = {
            container: "body"
        }
        Drag.prototype.lastEvent = null;
        Drag.prototype.move = function (curEvent) {
            if (!this.moveable) return;
            var $container = $(this.options.container);
            var orgEvent = this.lastEvent;


            var pLeft = this.$drapEl.offset().left + curEvent.clientX - orgEvent.clientX,
                pTop = this.$drapEl.offset().top  + curEvent.clientY - orgEvent.clientY;
            //拖拽设置边界
            pTop = Math.max(pTop, $container.offset().top);//上边界
            pLeft = Math.max(pLeft, $container.offset().left);//左边界
            pTop = Math.min(pTop, $container.offset().top + $container.innerHeight() - this.$targetEl.innerHeight());//下边界
            pLeft = Math.min(pLeft, $container.offset().left + $container.innerWidth() - this.$targetEl.innerWidth());//右边界

            this.$targetEl.css({
                "left": pLeft - $container.offset().left,
                "top": pTop- $container.offset().top
            });
            this.lastEvent = curEvent;
        }
        $.fn.draggable = function (target, options) {
            return this.each(function () {
                new Drag(this, target, options);
            })
        }
        $.fn.draggable.Constructor = Drag;
        return Drag;
    })(jQuery)
})