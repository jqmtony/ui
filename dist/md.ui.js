/*! MDUI - v0.9.0 - 2014-11-05 */ define("/modules/widget/dialog/md.dialog-debug.css", [], function() {
    seajs.importStyle(".md-dialog{display:none}.md-dialog.draggable .dialog-header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-dialog .dialog{position:absolute;background:#fff;left:50%;top:50%;width:400px}.md-dialog .dialog .dialog-header{height:25px;line-height:25px;padding:15px;border-bottom:solid 1px #ededed;position:relative}.md-dialog .dialog .dialog-header .btn-close{font-size:20px;position:absolute;right:0;top:0;display:block;width:20px;height:20px;line-height:20px;text-align:center;cursor:pointer}.md-dialog .dialog .dialog-body{padding:15px}.md-dialog .dialog .dialog-footer{padding:15px;text-align:right}");
});

define("/modules/widget/dialog/md.dialog-debug", [ "/modules/widget/draggable/md.draggable-debug" ], function(require, exports, module) {
    var Drag, MDDialog;
    Drag = require("/modules/widget/draggable/md.draggable-debug");
    return MDDialog = function($) {
        function Dialog(element, opts) {
            this.element = element;
            this.opts = opts;
            this.$el = $(this.element);
            this.options = $.extend({}, Dialog.Options, this.opts);
            this.inti();
        }
        Dialog.Options = {
            onConfirm: function() {},
            onShow: null,
            onHide: null,
            title: "",
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
        Dialog.prototype.inti = function() {
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
        Dialog.prototype.setPosition = function() {
            var left, top;
            left = ($(window).innerWidth() - this.$dialog.find(".dialog").innerWidth()) / 2;
            top = ($(window).innerHeight() - this.$dialog.find(".dialog").innerHeight()) / 2;
            return this.$dialog.find(".dialog").css({
                left: left,
                top: top
            });
        };
        Dialog.prototype.dialog = function() {
            return this.$dialog = this.$dialog || this.options.$dialog || $(Dialog.STATICS.template);
        };
        Dialog.prototype.show = function(opts) {
            var options;
            options = $.extend({}, Dialog.Options, this.options, opts);
            if (typeof this.options.onShow === "function") {
                options.onShow.call(this);
            }
            this.dialog().show().appendTo("body");
            this.$dialog.on("click", ".btn-cancel,.btn-close", $.proxy(this.hide, this));
            this.$dialog.on("click", ".btn-ok", $.proxy(this.ok, this));
            $(document).on("keyup.md", function(e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            });
            if (this.options.draggable) {
                this.dialog().addClass("draggable");
                this.$header.draggable(this.$dialog.find(".dialog")[0]);
            }
            return this.setPosition();
        };
        Dialog.prototype.hide = function() {
            if (typeof this.options.onHide === "function") {
                this.options.onHide();
            }
            $(document).off("keyup.md");
            return this.$dialog.remove();
        };
        Dialog.prototype.ok = function() {
            if (typeof this.options.onConfirm === "function") {
                this.options.onConfirm.call(this);
            }
        };
        $.fn.dialog = function(options) {
            return this.each(function() {
                return new Dialog(this, options);
            });
        };
        $.fn.dialog.Constructor = Dialog;
        module.exports = Dialog;
    }(jQuery);
});

define("/modules/widget/dialog/md.dialog.css", [], function() {
    seajs.importStyle(".md-dialog{display:none}.md-dialog.draggable .dialog-header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-dialog .dialog{position:absolute;background:#fff;left:50%;top:50%;width:400px}.md-dialog .dialog .dialog-header{height:25px;line-height:25px;padding:15px;border-bottom:solid 1px #ededed;position:relative}.md-dialog .dialog .dialog-header .btn-close{font-size:20px;position:absolute;right:0;top:0;display:block;width:20px;height:20px;line-height:20px;text-align:center;cursor:pointer}.md-dialog .dialog .dialog-body{padding:15px}.md-dialog .dialog .dialog-footer{padding:15px;text-align:right}");
});

define("/modules/widget/dialog/md.dialog", [ "/modules/widget/draggable/md.draggable" ], function(require, exports, module) {
    var Drag, MDDialog;
    Drag = require("/modules/widget/draggable/md.draggable");
    return MDDialog = function($) {
        function Dialog(element, opts) {
            this.element = element;
            this.opts = opts;
            this.$el = $(this.element);
            this.options = $.extend({}, Dialog.Options, this.opts);
            this.inti();
        }
        Dialog.Options = {
            onConfirm: function() {},
            onShow: null,
            onHide: null,
            title: "",
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
        Dialog.prototype.inti = function() {
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
        Dialog.prototype.setPosition = function() {
            var left, top;
            left = ($(window).innerWidth() - this.$dialog.find(".dialog").innerWidth()) / 2;
            top = ($(window).innerHeight() - this.$dialog.find(".dialog").innerHeight()) / 2;
            return this.$dialog.find(".dialog").css({
                left: left,
                top: top
            });
        };
        Dialog.prototype.dialog = function() {
            return this.$dialog = this.$dialog || this.options.$dialog || $(Dialog.STATICS.template);
        };
        Dialog.prototype.show = function(opts) {
            var options;
            options = $.extend({}, Dialog.Options, this.options, opts);
            if (typeof this.options.onShow === "function") {
                options.onShow.call(this);
            }
            this.dialog().show().appendTo("body");
            this.$dialog.on("click", ".btn-cancel,.btn-close", $.proxy(this.hide, this));
            this.$dialog.on("click", ".btn-ok", $.proxy(this.ok, this));
            $(document).on("keyup.md", function(e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            });
            if (this.options.draggable) {
                this.dialog().addClass("draggable");
                this.$header.draggable(this.$dialog.find(".dialog")[0]);
            }
            return this.setPosition();
        };
        Dialog.prototype.hide = function() {
            if (typeof this.options.onHide === "function") {
                this.options.onHide();
            }
            $(document).off("keyup.md");
            return this.$dialog.remove();
        };
        Dialog.prototype.ok = function() {
            if (typeof this.options.onConfirm === "function") {
                this.options.onConfirm.call(this);
            }
        };
        $.fn.dialog = function(options) {
            return this.each(function() {
                return new Dialog(this, options);
            });
        };
        $.fn.dialog.Constructor = Dialog;
        module.exports = Dialog;
    }(jQuery);
});

define("/modules/widget/draggable/md.draggable-debug", [], function(require, exports, module) {
    var Drag = function(dragEl, targetEl, options) {
        this.options = $.extend({}, Drag.Options, options);
        this.$drapEl = $(dragEl);
        //拖拽元素
        this.$targetEl = $(targetEl);
        this.moveable = false;
        var _this = this;
        this.$drapEl.on("mousedown", function(e1) {
            _this.moveable = true;
            _this.lastEvent = e1;
            $(document).on("mousemove", function(e2) {
                _this.move(e2);
            });
            $(document).on("mouseup", function(e) {
                _this.moveable = false;
                $(document).off("mousemove");
                $(window).off("selectstart");
            });
            $(window).on("selectstart", function() {
                return false;
            });
        });
    };
    Drag.Options = {
        container: "body"
    };
    Drag.prototype.lastEvent = null;
    Drag.prototype.move = function(curEvent) {
        if (!this.moveable) return;
        var $container = $(this.options.container);
        var orgEvent = this.lastEvent;
        var pLeft = this.$drapEl.offset().left + curEvent.clientX - orgEvent.clientX, pTop = this.$drapEl.offset().top + curEvent.clientY - orgEvent.clientY;
        //拖拽设置边界
        pTop = Math.max(pTop, $container.offset().top);
        //上边界
        pLeft = Math.max(pLeft, $container.offset().left);
        //左边界
        pTop = Math.min(pTop, $container.offset().top + $container.innerHeight() - this.$targetEl.innerHeight());
        //下边界
        pLeft = Math.min(pLeft, $container.offset().left + $container.innerWidth() - this.$targetEl.innerWidth());
        //右边界
        this.$targetEl.css({
            left: pLeft - $container.offset().left,
            top: pTop - $container.offset().top
        });
        this.lastEvent = curEvent;
    };
    $.fn.draggable = function(target, options) {
        return this.each(function() {
            new Drag(this, target, options);
        });
    };
    $.fn.draggable.Constructor = Drag;
    module.exports = Drag;
});

define("/modules/widget/draggable/md.draggable", [], function(require, exports, module) {
    var Drag = function(dragEl, targetEl, options) {
        this.options = $.extend({}, Drag.Options, options);
        this.$drapEl = $(dragEl);
        //拖拽元素
        this.$targetEl = $(targetEl);
        this.moveable = false;
        var _this = this;
        this.$drapEl.on("mousedown", function(e1) {
            _this.moveable = true;
            _this.lastEvent = e1;
            $(document).on("mousemove", function(e2) {
                _this.move(e2);
            });
            $(document).on("mouseup", function(e) {
                _this.moveable = false;
                $(document).off("mousemove");
                $(window).off("selectstart");
            });
            $(window).on("selectstart", function() {
                return false;
            });
        });
    };
    Drag.Options = {
        container: "body"
    };
    Drag.prototype.lastEvent = null;
    Drag.prototype.move = function(curEvent) {
        if (!this.moveable) return;
        var $container = $(this.options.container);
        var orgEvent = this.lastEvent;
        var pLeft = this.$drapEl.offset().left + curEvent.clientX - orgEvent.clientX, pTop = this.$drapEl.offset().top + curEvent.clientY - orgEvent.clientY;
        //拖拽设置边界
        pTop = Math.max(pTop, $container.offset().top);
        //上边界
        pLeft = Math.max(pLeft, $container.offset().left);
        //左边界
        pTop = Math.min(pTop, $container.offset().top + $container.innerHeight() - this.$targetEl.innerHeight());
        //下边界
        pLeft = Math.min(pLeft, $container.offset().left + $container.innerWidth() - this.$targetEl.innerWidth());
        //右边界
        this.$targetEl.css({
            left: pLeft - $container.offset().left,
            top: pTop - $container.offset().top
        });
        this.lastEvent = curEvent;
    };
    $.fn.draggable = function(target, options) {
        return this.each(function() {
            new Drag(this, target, options);
        });
    };
    $.fn.draggable.Constructor = Drag;
    module.exports = Drag;
});

define("/modules/widget/dropdown/dropdown-debug.css", [], function() {
    seajs.importStyle('.dropdown{position:relative;display:inline-block;color:#06c}.dropdown .dropdown-btn{border:solid 1px #06c;background:#FFF}.dropdown .dropdown-btn .icon-arrow-down{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.dropdown .dropdown-list{position:absolute;margin-top:-1px;width:100%;z-index:99;top:100%;left:0;display:none;border:solid 1px #06c;border-bottom:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.dropdown .dropdown-list:before,.dropdown .dropdown-list:after{content:" ";display:table}.dropdown .dropdown-list:after{clear:both}.dropdown .dropdown-list li{line-height:30px;padding:0 6px;border-bottom:solid 1px #06c;background:#FFF}.dropdown .dropdown-list li:hover{background:#06c;cursor:pointer;color:#FFF}.dropdown.open .dropdown-btn i{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.dropdown.open .dropdown-list{display:block}');
});

define("/modules/widget/dropdown/dropdown.css", [], function() {
    seajs.importStyle('.dropdown{position:relative;display:inline-block;color:#06c}.dropdown .dropdown-btn{border:solid 1px #06c;background:#FFF}.dropdown .dropdown-btn .icon-arrow-down{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.dropdown .dropdown-list{position:absolute;margin-top:-1px;width:100%;z-index:99;top:100%;left:0;display:none;border:solid 1px #06c;border-bottom:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.dropdown .dropdown-list:before,.dropdown .dropdown-list:after{content:" ";display:table}.dropdown .dropdown-list:after{clear:both}.dropdown .dropdown-list li{line-height:30px;padding:0 6px;border-bottom:solid 1px #06c;background:#FFF}.dropdown .dropdown-list li:hover{background:#06c;cursor:pointer;color:#FFF}.dropdown.open .dropdown-btn i{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.dropdown.open .dropdown-list{display:block}');
});

/*
 *
 * @description:下拉菜单
 * */
define("/modules/widget/dropdown/md.dropdown-debug", [], function(require, exports, module) {
    return function($) {
        var Dropdown = function(el, options) {
            this.$el = $(el);
            this.options = $.extend({}, Dropdown.options, options);
            this.init();
        };
        Dropdown.options = {
            trigger: "click",
            //触发事件，可选“click”、“hover”
            onClick: function(li) {},
            //点击回调方法，li为当前点击的元素
            onShow: function() {},
            onHide: function() {}
        };
        Dropdown.prototype.init = function() {
            var _this = this;
            if (_this.options.trigger === "hover") {
                _this.$el.hover(function() {
                    if (!_this.$el.hasClass("open")) {
                        _this.$el.addClass("open");
                        _this.options.onShow.call(_this);
                    }
                }, function() {
                    _this.$el.removeClass("open");
                    _this.options.onHide.call(_this);
                });
            } else if (_this.options.trigger === "click") {
                _this.$el.click(function() {
                    _this.$el.toggleClass("open");
                });
            }
            this.$el.on("click", ".dropdown-list li", function() {
                _this.options.onClick.call(_this, this);
            });
        };
        $.fn.dropdown = function(options) {
            return this.each(function() {
                new Dropdown(this, options);
            });
        };
        $("[data-toggle='dropdown']").each(function() {
            new Dropdown(this);
        });
        $.fn.dropdown.Constructor = Dropdown;
        module.exports = Dropdown;
    }(jQuery);
});

/*
 *
 * @description:下拉菜单
 * */
define("/modules/widget/dropdown/md.dropdown", [], function(require, exports, module) {
    return function($) {
        var Dropdown = function(el, options) {
            this.$el = $(el);
            this.options = $.extend({}, Dropdown.options, options);
            this.init();
        };
        Dropdown.options = {
            trigger: "click",
            //触发事件，可选“click”、“hover”
            onClick: function(li) {},
            //点击回调方法，li为当前点击的元素
            onShow: function() {},
            onHide: function() {}
        };
        Dropdown.prototype.init = function() {
            var _this = this;
            if (_this.options.trigger === "hover") {
                _this.$el.hover(function() {
                    if (!_this.$el.hasClass("open")) {
                        _this.$el.addClass("open");
                        _this.options.onShow.call(_this);
                    }
                }, function() {
                    _this.$el.removeClass("open");
                    _this.options.onHide.call(_this);
                });
            } else if (_this.options.trigger === "click") {
                _this.$el.click(function() {
                    _this.$el.toggleClass("open");
                });
            }
            this.$el.on("click", ".dropdown-list li", function() {
                _this.options.onClick.call(_this, this);
            });
        };
        $.fn.dropdown = function(options) {
            return this.each(function() {
                new Dropdown(this, options);
            });
        };
        $("[data-toggle='dropdown']").each(function() {
            new Dropdown(this);
        });
        $.fn.dropdown.Constructor = Dropdown;
        module.exports = Dropdown;
    }(jQuery);
});

/*
* @description:此插件为了在一个容器中预览一张图片，使之在任何情况下都能盛满整个容器
*
* */
define("/modules/widget/imgCover/md.imgCover-debug", [], function(require, moduel, exports) {
    (function($) {
        var ImgCover = function(element, options) {
            this.$el = $(element);
            this.options = $.extend({}, ImgCover.Options, options);
            this.$img = this.$el.find("img");
            this.setCover();
        };
        ImgCover.Options = {
            mode: "cover"
        };
        ImgCover.prototype.setCover = function() {
            var imgRatio = null;
            var img = new Image();
            img.src = this.$img.attr("src");
            if (img.complete) {
                this.setStyle(img);
            } else {
                img.onload = function() {
                    this.setStyle(img);
                };
            }
        };
        ImgCover.prototype.setStyle = function(img) {
            var imgRatio = img.width / img.height;
            var containerRatio = this.$el.innerWidth() / this.$el.innerHeight();
            if (this.options.mode === "cover" && imgRatio < containerRatio) {
                //高度超出
                this.$img.css({
                    "max-width": "100%",
                    width: "100%",
                    height: "auto"
                });
            } else if (this.options.mode === "cover" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "none",
                    height: "100%",
                    width: "auto"
                });
            } else if (this.options.mode === "contain" && imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    height: "100%",
                    width: "auto"
                });
            } else if (this.options.mode === "contain" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    width: "100%",
                    height: "auto"
                });
            }
        };
        $.fn.imgCover = function(options) {
            return this.each(function() {
                new ImgCover(this, options);
            });
        };
        $.fn.imgCover.Constructor = ImgCover;
    })(jQuery);
});

/*
* @description:此插件为了在一个容器中预览一张图片，使之在任何情况下都能盛满整个容器
*
* */
define("/modules/widget/imgCover/md.imgCover", [], function(require, moduel, exports) {
    (function($) {
        var ImgCover = function(element, options) {
            this.$el = $(element);
            this.options = $.extend({}, ImgCover.Options, options);
            this.$img = this.$el.find("img");
            this.setCover();
        };
        ImgCover.Options = {
            mode: "cover"
        };
        ImgCover.prototype.setCover = function() {
            var imgRatio = null;
            var img = new Image();
            img.src = this.$img.attr("src");
            if (img.complete) {
                this.setStyle(img);
            } else {
                img.onload = function() {
                    this.setStyle(img);
                };
            }
        };
        ImgCover.prototype.setStyle = function(img) {
            var imgRatio = img.width / img.height;
            var containerRatio = this.$el.innerWidth() / this.$el.innerHeight();
            if (this.options.mode === "cover" && imgRatio < containerRatio) {
                //高度超出
                this.$img.css({
                    "max-width": "100%",
                    width: "100%",
                    height: "auto"
                });
            } else if (this.options.mode === "cover" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "none",
                    height: "100%",
                    width: "auto"
                });
            } else if (this.options.mode === "contain" && imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    height: "100%",
                    width: "auto"
                });
            } else if (this.options.mode === "contain" && !imgRatio < containerRatio) {
                this.$img.css({
                    "max-height": "100%",
                    "max-width": "100%",
                    width: "100%",
                    height: "auto"
                });
            }
        };
        $.fn.imgCover = function(options) {
            return this.each(function() {
                new ImgCover(this, options);
            });
        };
        $.fn.imgCover.Constructor = ImgCover;
    })(jQuery);
});

define("/modules/widget/modal/md.modal-debug", [], function(require, module, exports) {
    "use strict";
    return function($) {
        //构造方法
        var Modal = function(options, element) {
            this.$el = $(element);
            this.options = $.extend({}, Modal.Options, options);
            this.inti();
        };
        //默认设置
        Modal.Options = {
            bgClose: true,
            //点击背景关闭
            target: null,
            //目标Model选择器
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
        Modal.prototype.inti = function() {
            this.$model = this.model();
            //注册事件
            if (this.$el.length) this.$el.off("click.md").on("click.md", $.proxy(this.show, this));
            var _this = this;
            this.$model.find(".btnClose").on("click", $.proxy(this.hide, this));
            //ESC键退出
            $(document).on("keyup", function(e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            });
            if (this.options.bgClose) {
                //点击背景遮罩，关闭model
                _this.$model.on("click", function(e) {
                    if (e.target === _this.$model[0]) _this.hide();
                });
            }
        };
        //返回model
        Modal.prototype.model = function() {
            if (this.$model) {
                return this.$model;
            } else if (this.options.target) {
                return $(this.options.target);
            } else {
                return $(this.STATICS.template).find(".modalBody").append(this.options.content).parents(".modal").appendTo("body");
            }
        };
        Modal.prototype.show = function() {
            //显示
            if (typeof this.options.onShow === "function") this.options.onShow();
            this.$model.addClass("open");
        };
        Modal.prototype.hide = function() {
            //隐藏
            if (typeof this.options.onClose === "function") this.options.onClose();
            this.$model.removeClass("open");
        };
        Modal.prototype.destroy = function() {
            if (typeof this.options.onDestroy === "function") this.options.onDestroy();
            this.$model.remove();
            this.$el.off("click.md");
        };
        $.fn.mdModel = function(options) {
            return this.each(function() {
                new Modal(options, this);
            });
        };
        $.fn.mdModel.show = function(options) {
            return new Modal(options).show();
        };
        $.fn.mdModel.destroyAll = function() {
            $(".mdModel").remove();
        };
        // data方式调用
        $("[data-toggle='model']").each(function() {
            var targetSelector = $(this).attr("href") || $(this).data("target");
            new Modal({
                target: targetSelector
            }, this);
        });
        $.fn.mdModel.Constructor = Modal;
        module.exports = Modal;
    }(jQuery);
});

define("/modules/widget/modal/md.modal", [], function(require, module, exports) {
    "use strict";
    return function($) {
        //构造方法
        var Modal = function(options, element) {
            this.$el = $(element);
            this.options = $.extend({}, Modal.Options, options);
            this.inti();
        };
        //默认设置
        Modal.Options = {
            bgClose: true,
            //点击背景关闭
            target: null,
            //目标Model选择器
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
        Modal.prototype.inti = function() {
            this.$model = this.model();
            //注册事件
            if (this.$el.length) this.$el.off("click.md").on("click.md", $.proxy(this.show, this));
            var _this = this;
            this.$model.find(".btnClose").on("click", $.proxy(this.hide, this));
            //ESC键退出
            $(document).on("keyup", function(e) {
                if (e.keyCode === 27) {
                    _this.hide();
                }
            });
            if (this.options.bgClose) {
                //点击背景遮罩，关闭model
                _this.$model.on("click", function(e) {
                    if (e.target === _this.$model[0]) _this.hide();
                });
            }
        };
        //返回model
        Modal.prototype.model = function() {
            if (this.$model) {
                return this.$model;
            } else if (this.options.target) {
                return $(this.options.target);
            } else {
                return $(this.STATICS.template).find(".modalBody").append(this.options.content).parents(".modal").appendTo("body");
            }
        };
        Modal.prototype.show = function() {
            //显示
            if (typeof this.options.onShow === "function") this.options.onShow();
            this.$model.addClass("open");
        };
        Modal.prototype.hide = function() {
            //隐藏
            if (typeof this.options.onClose === "function") this.options.onClose();
            this.$model.removeClass("open");
        };
        Modal.prototype.destroy = function() {
            if (typeof this.options.onDestroy === "function") this.options.onDestroy();
            this.$model.remove();
            this.$el.off("click.md");
        };
        $.fn.mdModel = function(options) {
            return this.each(function() {
                new Modal(options, this);
            });
        };
        $.fn.mdModel.show = function(options) {
            return new Modal(options).show();
        };
        $.fn.mdModel.destroyAll = function() {
            $(".mdModel").remove();
        };
        // data方式调用
        $("[data-toggle='model']").each(function() {
            var targetSelector = $(this).attr("href") || $(this).data("target");
            new Modal({
                target: targetSelector
            }, this);
        });
        $.fn.mdModel.Constructor = Modal;
        module.exports = Modal;
    }(jQuery);
});

define("/modules/widget/modal/modal-debug.css", [], function() {
    seajs.importStyle(".modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;background:#000;background:rgba(0,0,0,.8);-webkit-transition:all .3s .3s linear;-o-transition:all .3s .3s linear;transition:all .3s .3s linear}.modal.open{opacity:1;display:block}.modal.open .modalContainer{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0)}.modal .modalContainer{position:absolute;padding:20px;left:50%;margin-left:-300px;margin-top:-200px;top:50%;width:600px;height:400px;background:#e8e8e8;-webkit-box-shadow:3px 3px 6px #333;box-shadow:3px 3px 6px #333;-webkit-transform:translate(0,25%);-moz-transform:translate(0,25%);-ms-transform:translate(0,25%);-o-transform:translate(0,25%);-webkit-transition:all .3s .3s ease-out;-o-transition:all .3s .3s ease-out;transition:all .3s .3s ease-out}.modal .btnClose{position:absolute;display:block;right:5px;top:5px;width:20px;height:20px;font-size:20px;line-height:20px;text-align:center;cursor:pointer}");
});

define("/modules/widget/modal/modal.css", [], function() {
    seajs.importStyle(".modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;background:#000;background:rgba(0,0,0,.8);-webkit-transition:all .3s .3s linear;-o-transition:all .3s .3s linear;transition:all .3s .3s linear}.modal.open{opacity:1;display:block}.modal.open .modalContainer{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0)}.modal .modalContainer{position:absolute;padding:20px;left:50%;margin-left:-300px;margin-top:-200px;top:50%;width:600px;height:400px;background:#e8e8e8;-webkit-box-shadow:3px 3px 6px #333;box-shadow:3px 3px 6px #333;-webkit-transform:translate(0,25%);-moz-transform:translate(0,25%);-ms-transform:translate(0,25%);-o-transform:translate(0,25%);-webkit-transition:all .3s .3s ease-out;-o-transition:all .3s .3s ease-out;transition:all .3s .3s ease-out}.modal .btnClose{position:absolute;display:block;right:5px;top:5px;width:20px;height:20px;font-size:20px;line-height:20px;text-align:center;cursor:pointer}");
});

/**
 * Created by debiancc on 10/09/14.
 */
define("/modules/widget/pager/md.pager-debug", [], function(require, exports, module) {
    return function($) {
        $.fn.Pager = function(param) {
            new $Pager($(this), param);
        };
        var $Pager = function($el, settings) {
            var $this = this;
            var options = $.extend({
                pageIndex: 1,
                pageSize: 20,
                //每页显示多少条
                count: 0,
                //总共多少条数据
                pageCount: 5,
                //超过几页显示 ...
                align: "center",
                //页码呈现的位置
                prev: "上一页",
                next: "下一页",
                changePage: function(pageIndex) {}
            }, settings);
            $this.init = function() {
                if ($el.find("div.mdPager").length == 0) {
                    var pagerObj = $("<div/>");
                    if (options.className) {
                        pagerObj.addClass(options.className);
                    }
                    pagerObj.addClass("mdPager");
                    $el.append(pagerObj);
                }
                $this.create();
            };
            $this.showPages = options.pageCount;
            //最多展示几页
            $this.pageIndex = 1;
            //当前数据的第几页
            if (options.pageIndex) $this.pageIndex = options.pageIndex;
            $this.pageCount = options.pageCount;
            $this.create = function() {
                var pageParent = $("<div/>").attr("align", options.align);
                var totalPages = Math.ceil(options.count / options.pageSize);
                var pageItem = "";
                if ($this.pageIndex != 1) {
                    pageItem = $("<a/>").addClass("pageBtn").attr("href", "javascript:void(0)").text(options.prev).click(function() {
                        $this.changePage(null, $this.pageIndex - 1);
                    });
                } else pageItem = $("<span/>").addClass("pageBtnDisable").text(options.prev);
                pageParent.append(pageItem);
                if (totalPages > $this.showPages + 1) {
                    if ($this.pageIndex < $this.pageCount - 1) {
                        for (var i = 1; i <= $this.showPages; i++) {
                            if ($this.pageIndex == i) pageItem = $("<span/>").addClass("pageOn").text(i); else pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                $this.changePage(this);
                            });
                            pageParent.append(pageItem);
                        }
                        pageParent.append($("<span/>").text("..."));
                        pageItem = $("<a/>").attr("href", "javascript:void(0)").text(totalPages).click(function() {
                            $this.changePage(null, totalPages);
                        });
                        pageParent.append(pageItem);
                    } else {
                        pageItem = $("<a/>").attr("href", "javascript:void(0)").text(1).click(function() {
                            $this.changePage(null, 1);
                        });
                        pageParent.append(pageItem);
                        if ($this.pageIndex > $this.pageCount - 1) pageParent.append($("<span/>").text("..."));
                        if (totalPages < $this.pageIndex + $this.pageCount - 1) {
                            var startIndex = $this.pageIndex - 2;
                            if (totalPages - startIndex < $this.pageCount - 1) startIndex = totalPages - ($this.pageCount - 1);
                            for (var i = startIndex; i <= totalPages; i++) {
                                if ($this.pageIndex == i) pageItem = $("<span/>").addClass("pageOn").text(i); else pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                    $this.changePage(this);
                                });
                                pageParent.append(pageItem);
                            }
                        } else {
                            var currentLeftRightCount = ($this.pageCount - 1) / 2;
                            for (var i = $this.pageIndex - currentLeftRightCount; i <= $this.pageIndex + currentLeftRightCount; i++) {
                                if ($this.pageIndex == i) {
                                    pageItem = $("<span/>").addClass("pageOn").text(i);
                                } else {
                                    pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                        $this.changePage(this);
                                    });
                                }
                                pageParent.append(pageItem);
                            }
                            pageParent.append($("<span/>").text("..."));
                            pageItem = $("<a/>").attr("href", "javascript:void(0)").text(totalPages).click(function() {
                                $this.changePage(null, totalPages);
                            });
                            pageParent.append(pageItem);
                        }
                    }
                } else {
                    for (var i = 1; i <= totalPages; i++) {
                        if ($this.pageIndex == i) {
                            pageItem = $("<span/>").addClass("pageOn").text(i);
                        } else {
                            pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                $this.changePage(this);
                            });
                        }
                        pageParent.append(pageItem);
                    }
                }
                if ($this.pageIndex != totalPages) {
                    pageItem = $("<a/>").addClass("pageBtn").attr("href", "javascript:void(0)").text(options.next).click(function() {
                        $this.changePage(null, parseInt($this.pageIndex) + 1);
                    });
                } else pageItem = $("<span/>").addClass("pageBtnDisable").text(options.next);
                pageParent.append(pageItem);
                if (options.count > options.pageSize) {
                    $el.find("div.mdPager").empty().append(pageParent).show();
                } else {
                    $el.find("div.mdPager").empty().hide();
                }
            };
            $this.changePage = function(obj, pIndex) {
                if (obj) {
                    $this.pageIndex = Number($(obj).text());
                } else $this.pageIndex = pIndex;
                options.changePage($this.pageIndex);
                $this.create();
            };
            $this.init();
            return $el;
        };
    }(jQuery);
});

/**
 * Created by debiancc on 10/09/14.
 */
define("/modules/widget/pager/md.pager", [], function(require, exports, module) {
    return function($) {
        $.fn.Pager = function(param) {
            new $Pager($(this), param);
        };
        var $Pager = function($el, settings) {
            var $this = this;
            var options = $.extend({
                pageIndex: 1,
                pageSize: 20,
                //每页显示多少条
                count: 0,
                //总共多少条数据
                pageCount: 5,
                //超过几页显示 ...
                align: "center",
                //页码呈现的位置
                prev: "上一页",
                next: "下一页",
                changePage: function(pageIndex) {}
            }, settings);
            $this.init = function() {
                if ($el.find("div.mdPager").length == 0) {
                    var pagerObj = $("<div/>");
                    if (options.className) {
                        pagerObj.addClass(options.className);
                    }
                    pagerObj.addClass("mdPager");
                    $el.append(pagerObj);
                }
                $this.create();
            };
            $this.showPages = options.pageCount;
            //最多展示几页
            $this.pageIndex = 1;
            //当前数据的第几页
            if (options.pageIndex) $this.pageIndex = options.pageIndex;
            $this.pageCount = options.pageCount;
            $this.create = function() {
                var pageParent = $("<div/>").attr("align", options.align);
                var totalPages = Math.ceil(options.count / options.pageSize);
                var pageItem = "";
                if ($this.pageIndex != 1) {
                    pageItem = $("<a/>").addClass("pageBtn").attr("href", "javascript:void(0)").text(options.prev).click(function() {
                        $this.changePage(null, $this.pageIndex - 1);
                    });
                } else pageItem = $("<span/>").addClass("pageBtnDisable").text(options.prev);
                pageParent.append(pageItem);
                if (totalPages > $this.showPages + 1) {
                    if ($this.pageIndex < $this.pageCount - 1) {
                        for (var i = 1; i <= $this.showPages; i++) {
                            if ($this.pageIndex == i) pageItem = $("<span/>").addClass("pageOn").text(i); else pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                $this.changePage(this);
                            });
                            pageParent.append(pageItem);
                        }
                        pageParent.append($("<span/>").text("..."));
                        pageItem = $("<a/>").attr("href", "javascript:void(0)").text(totalPages).click(function() {
                            $this.changePage(null, totalPages);
                        });
                        pageParent.append(pageItem);
                    } else {
                        pageItem = $("<a/>").attr("href", "javascript:void(0)").text(1).click(function() {
                            $this.changePage(null, 1);
                        });
                        pageParent.append(pageItem);
                        if ($this.pageIndex > $this.pageCount - 1) pageParent.append($("<span/>").text("..."));
                        if (totalPages < $this.pageIndex + $this.pageCount - 1) {
                            var startIndex = $this.pageIndex - 2;
                            if (totalPages - startIndex < $this.pageCount - 1) startIndex = totalPages - ($this.pageCount - 1);
                            for (var i = startIndex; i <= totalPages; i++) {
                                if ($this.pageIndex == i) pageItem = $("<span/>").addClass("pageOn").text(i); else pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                    $this.changePage(this);
                                });
                                pageParent.append(pageItem);
                            }
                        } else {
                            var currentLeftRightCount = ($this.pageCount - 1) / 2;
                            for (var i = $this.pageIndex - currentLeftRightCount; i <= $this.pageIndex + currentLeftRightCount; i++) {
                                if ($this.pageIndex == i) {
                                    pageItem = $("<span/>").addClass("pageOn").text(i);
                                } else {
                                    pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                        $this.changePage(this);
                                    });
                                }
                                pageParent.append(pageItem);
                            }
                            pageParent.append($("<span/>").text("..."));
                            pageItem = $("<a/>").attr("href", "javascript:void(0)").text(totalPages).click(function() {
                                $this.changePage(null, totalPages);
                            });
                            pageParent.append(pageItem);
                        }
                    }
                } else {
                    for (var i = 1; i <= totalPages; i++) {
                        if ($this.pageIndex == i) {
                            pageItem = $("<span/>").addClass("pageOn").text(i);
                        } else {
                            pageItem = $("<a/>").attr("href", "javascript:void(0)").text(i).click(function() {
                                $this.changePage(this);
                            });
                        }
                        pageParent.append(pageItem);
                    }
                }
                if ($this.pageIndex != totalPages) {
                    pageItem = $("<a/>").addClass("pageBtn").attr("href", "javascript:void(0)").text(options.next).click(function() {
                        $this.changePage(null, parseInt($this.pageIndex) + 1);
                    });
                } else pageItem = $("<span/>").addClass("pageBtnDisable").text(options.next);
                pageParent.append(pageItem);
                if (options.count > options.pageSize) {
                    $el.find("div.mdPager").empty().append(pageParent).show();
                } else {
                    $el.find("div.mdPager").empty().hide();
                }
            };
            $this.changePage = function(obj, pIndex) {
                if (obj) {
                    $this.pageIndex = Number($(obj).text());
                } else $this.pageIndex = pIndex;
                options.changePage($this.pageIndex);
                $this.create();
            };
            $this.init();
            return $el;
        };
    }(jQuery);
});

define("/modules/widget/pager/pager-debug.css", [], function() {
    seajs.importStyle(".mdPager{padding:10px 5px!important;font-size:12px}.mdPager span,.mdPager a{font-family:Arial,'微软雅黑';color:#666;display:inline-block;padding:3px 8px;text-align:center;vertical-align:middle;margin-right:10px;border:1px solid #fff}.mdPager a:hover{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;color:#000;text-decoration:none}.mdPager .pageBtn{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;text-decoration:none;color:#666}.mdPager .pageBtnDisable{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;text-decoration:none;color:#ccc}.mdPager .pageOn{color:#333;font-weight:700;text-decoration:underline}");
});

define("/modules/widget/pager/pager.css", [], function() {
    seajs.importStyle(".mdPager{padding:10px 5px!important;font-size:12px}.mdPager span,.mdPager a{font-family:Arial,'微软雅黑';color:#666;display:inline-block;padding:3px 8px;text-align:center;vertical-align:middle;margin-right:10px;border:1px solid #fff}.mdPager a:hover{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;color:#000;text-decoration:none}.mdPager .pageBtn{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;text-decoration:none;color:#666}.mdPager .pageBtnDisable{border:1px solid #ccc;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;text-decoration:none;color:#ccc}.mdPager .pageOn{color:#333;font-weight:700;text-decoration:underline}");
});

define("/modules/widget/popover/md.popover-debug", [], function(require, module, exports) {
    var Popover = function(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, Popover.Options, options);
        this.inti();
    };
    //默认值
    Popover.Options = {
        related: "body",
        relatedSpace: 10,
        onlyOne: false,
        placement: "bottom",
        content: null
    };
    Popover.STATICS = {
        template: '<div class="popover popover-auto" data-open="false"><div class="arrow"></div></div>'
    };
    //初始化的函数
    Popover.prototype.inti = function() {
        this.popover().data("open", false);
        this.isOpen = false;
        this.isManual = this.options.content ? false : true;
        this.$el.on("click", $.proxy(this.toggle, this));
    };
    //得到popover
    Popover.prototype.popover = function() {
        return this.$popover = this.$popover || $(Popover.STATICS.template).append(this.options.content);
    };
    //得到尖角
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.popover().find(".arrow");
    };
    Popover.prototype.getPosition = function() {
        var position = {};
        position.left = this.$el.offset().left - $(this.options.related).offset().left;
        position.top = this.$el.offset().top - $(this.options.related).offset().top;
        //各个边界的计算
        if (this.options.placement === "bottom") {
            this.popover().addClass("popover-bottom");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top += this.$el.outerHeight();
        } else if (this.options.placement === "right") {
            this.popover().addClass("popover-right");
            position.left += this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2;
        } else if (this.options.placement === "top") {
            this.popover().addClass("popover-top");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top -= this.popover().outerHeight();
        } else if (this.options.placement === "left") {
            this.popover().addClass("popover-left");
            position.left -= this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2;
        }
        return position;
    };
    Popover.prototype.setPosition = function() {
        var position = this.getPosition();
        var popLeft = position.left;
        //参照
        var popTop = position.top;
        popLeft = popLeft >= this.options.relatedSpace ? popLeft : this.options.relatedSpace;
        //如果popover的安全距离小于一定值，则保持安全距离
        popTop = popTop >= this.options.relatedSpace ? popTop : this.options.relatedSpace;
        //如果popover的安全距离小于一定值，则保持安全距离
        if (popLeft <= this.options.relatedSpace) {
            //水平方向越界
            popLeft = this.options.relatedSpace;
            this.arrow().css("left", this.$el.offset().left + this.$el.innerWidth() / 2);
        }
        if (popTop <= this.options.relatedSpace) {
            //垂直方向越界
            popTop = this.options.relatedSpace;
            this.arrow().css("top", this.$el.offset().top + this.$el.outerHeight() / 2);
        }
        this.popover().css({
            left: popLeft,
            top: popTop
        });
    };
    Popover.prototype.close = function() {
        //关闭
        if (!this.isOpen) {
            return;
        } else {
            if (this.isManual) {
                this.$popover.hide();
            } else {
                this.$popover.remove();
            }
            this.isOpen = false;
            this.$popover.data("open", false);
        }
    };
    Popover.prototype.open = function() {
        //打开
        if (this.isManual) {
            this.$popover.show();
        } else {
            this.popover().appendTo(this.options.related);
            this.setPosition();
        }
        if (this.options.onlyOne) this.hideOther();
        //隐藏其他的popover
        this.isOpen = true;
        this.popover().data("open", true);
    };
    Popover.prototype.toggle = function() {
        this.isOpen = this.$popover.data("open") === true;
        if (this.isOpen) {
            //切换当前状态
            this.close();
        } else {
            this.open();
        }
    };
    //隐藏其他所有的popover
    Popover.prototype.hideOther = function() {
        if (this.options.isManual) {
            $(".popover-manual").not(this.$popover).data("open", false).hide();
            $(".popover-auto").data("close", true).remove();
        } else {
            $(".popover-manual").data("open", false).hide();
            $(".popover-auto").not(this.$popover).remove();
        }
    };
    $.fn.mdPopover = function(options) {
        return this.each(function() {
            new Popover(this, options);
        });
    };
    $.fn.mdPopover.Constructor = Popover;
    module.exports = Popover;
});

define("/modules/widget/popover/md.popover", [], function(require, module, exports) {
    var Popover = function(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, Popover.Options, options);
        this.inti();
    };
    //默认值
    Popover.Options = {
        related: "body",
        relatedSpace: 10,
        onlyOne: false,
        placement: "bottom",
        content: null
    };
    Popover.STATICS = {
        template: '<div class="popover popover-auto" data-open="false"><div class="arrow"></div></div>'
    };
    //初始化的函数
    Popover.prototype.inti = function() {
        this.popover().data("open", false);
        this.isOpen = false;
        this.isManual = this.options.content ? false : true;
        this.$el.on("click", $.proxy(this.toggle, this));
    };
    //得到popover
    Popover.prototype.popover = function() {
        return this.$popover = this.$popover || $(Popover.STATICS.template).append(this.options.content);
    };
    //得到尖角
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.popover().find(".arrow");
    };
    Popover.prototype.getPosition = function() {
        var position = {};
        position.left = this.$el.offset().left - $(this.options.related).offset().left;
        position.top = this.$el.offset().top - $(this.options.related).offset().top;
        //各个边界的计算
        if (this.options.placement === "bottom") {
            this.popover().addClass("popover-bottom");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top += this.$el.outerHeight();
        } else if (this.options.placement === "right") {
            this.popover().addClass("popover-right");
            position.left += this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2;
        } else if (this.options.placement === "top") {
            this.popover().addClass("popover-top");
            position.left += (this.$el.innerWidth() - this.popover().innerWidth()) / 2;
            position.top -= this.popover().outerHeight();
        } else if (this.options.placement === "left") {
            this.popover().addClass("popover-left");
            position.left -= this.$el.innerWidth();
            position.top += +(this.$el.outerHeight() - this.popover().outerHeight()) / 2;
        }
        return position;
    };
    Popover.prototype.setPosition = function() {
        var position = this.getPosition();
        var popLeft = position.left;
        //参照
        var popTop = position.top;
        popLeft = popLeft >= this.options.relatedSpace ? popLeft : this.options.relatedSpace;
        //如果popover的安全距离小于一定值，则保持安全距离
        popTop = popTop >= this.options.relatedSpace ? popTop : this.options.relatedSpace;
        //如果popover的安全距离小于一定值，则保持安全距离
        if (popLeft <= this.options.relatedSpace) {
            //水平方向越界
            popLeft = this.options.relatedSpace;
            this.arrow().css("left", this.$el.offset().left + this.$el.innerWidth() / 2);
        }
        if (popTop <= this.options.relatedSpace) {
            //垂直方向越界
            popTop = this.options.relatedSpace;
            this.arrow().css("top", this.$el.offset().top + this.$el.outerHeight() / 2);
        }
        this.popover().css({
            left: popLeft,
            top: popTop
        });
    };
    Popover.prototype.close = function() {
        //关闭
        if (!this.isOpen) {
            return;
        } else {
            if (this.isManual) {
                this.$popover.hide();
            } else {
                this.$popover.remove();
            }
            this.isOpen = false;
            this.$popover.data("open", false);
        }
    };
    Popover.prototype.open = function() {
        //打开
        if (this.isManual) {
            this.$popover.show();
        } else {
            this.popover().appendTo(this.options.related);
            this.setPosition();
        }
        if (this.options.onlyOne) this.hideOther();
        //隐藏其他的popover
        this.isOpen = true;
        this.popover().data("open", true);
    };
    Popover.prototype.toggle = function() {
        this.isOpen = this.$popover.data("open") === true;
        if (this.isOpen) {
            //切换当前状态
            this.close();
        } else {
            this.open();
        }
    };
    //隐藏其他所有的popover
    Popover.prototype.hideOther = function() {
        if (this.options.isManual) {
            $(".popover-manual").not(this.$popover).data("open", false).hide();
            $(".popover-auto").data("close", true).remove();
        } else {
            $(".popover-manual").data("open", false).hide();
            $(".popover-auto").not(this.$popover).remove();
        }
    };
    $.fn.mdPopover = function(options) {
        return this.each(function() {
            new Popover(this, options);
        });
    };
    $.fn.mdPopover.Constructor = Popover;
    module.exports = Popover;
});

define("/modules/widget/popover/popover-debug.css", [], function() {
    seajs.importStyle(".popover{position:absolute;padding:10px;background:#fff;border:solid 1px #dadada;max-width:250px;z-index:1000;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;-webkit-box-shadow:0 0 15px rgba(99,99,99,.5);box-shadow:0 0 15px rgba(99,99,99,.5)}.popover .arrow,.popover .arrow:after{width:0;height:0;display:block;position:absolute;border-color:transparent;border-style:solid;border-width:8px}.popover .arrow:after{content:''}.popover.popover-bottom{margin-top:8px}.popover.popover-bottom .arrow,.popover.popover-bottom .arrow:after{border-top-width:0}.popover.popover-bottom .arrow{left:50%;margin-left:-8px;top:-8px;border-bottom-color:rgba(199,199,199,.5)}.popover.popover-bottom .arrow:after{border-bottom-color:#fff;top:1px;margin-left:-8px}.popover.popover-top{margin-top:-8px}.popover.popover-top .arrow,.popover.popover-top .arrow:after{border-bottom-width:0}.popover.popover-top .arrow{left:50%;margin-left:-8px;bottom:-8px;border-top-color:rgba(199,199,199,.5)}.popover.popover-top .arrow:after{border-top-color:#fff;bottom:1px;margin-left:-8px}.popover.popover-left{margin-right:8px}.popover.popover-left .arrow,.popover.popover-left .arrow:after{border-right-width:0}.popover.popover-left .arrow{top:50%;margin-top:-8px;right:-8px;border-left-color:rgba(199,199,199,.5)}.popover.popover-left .arrow:after{border-left-color:#fff;right:1px;margin-top:-8px}.popover.popover-right{margin-left:8px}.popover.popover-right .arrow,.popover.popover-right .arrow:after{border-left-width:0}.popover.popover-right .arrow{top:50%;margin-top:-8px;left:-8px;border-right-color:rgba(199,199,199,.5)}.popover.popover-right .arrow:after{margin-top:-8px;border-right-color:#fff;left:1px}");
});

define("/modules/widget/popover/popover.css", [], function() {
    seajs.importStyle(".popover{position:absolute;padding:10px;background:#fff;border:solid 1px #dadada;max-width:250px;z-index:1000;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;-webkit-box-shadow:0 0 15px rgba(99,99,99,.5);box-shadow:0 0 15px rgba(99,99,99,.5)}.popover .arrow,.popover .arrow:after{width:0;height:0;display:block;position:absolute;border-color:transparent;border-style:solid;border-width:8px}.popover .arrow:after{content:''}.popover.popover-bottom{margin-top:8px}.popover.popover-bottom .arrow,.popover.popover-bottom .arrow:after{border-top-width:0}.popover.popover-bottom .arrow{left:50%;margin-left:-8px;top:-8px;border-bottom-color:rgba(199,199,199,.5)}.popover.popover-bottom .arrow:after{border-bottom-color:#fff;top:1px;margin-left:-8px}.popover.popover-top{margin-top:-8px}.popover.popover-top .arrow,.popover.popover-top .arrow:after{border-bottom-width:0}.popover.popover-top .arrow{left:50%;margin-left:-8px;bottom:-8px;border-top-color:rgba(199,199,199,.5)}.popover.popover-top .arrow:after{border-top-color:#fff;bottom:1px;margin-left:-8px}.popover.popover-left{margin-right:8px}.popover.popover-left .arrow,.popover.popover-left .arrow:after{border-right-width:0}.popover.popover-left .arrow{top:50%;margin-top:-8px;right:-8px;border-left-color:rgba(199,199,199,.5)}.popover.popover-left .arrow:after{border-left-color:#fff;right:1px;margin-top:-8px}.popover.popover-right{margin-left:8px}.popover.popover-right .arrow,.popover.popover-right .arrow:after{border-left-width:0}.popover.popover-right .arrow{top:50%;margin-top:-8px;left:-8px;border-right-color:rgba(199,199,199,.5)}.popover.popover-right .arrow:after{margin-top:-8px;border-right-color:#fff;left:1px}");
});

define("/modules/widget/scroller/scroller-debug.css", [], function() {
    seajs.importStyle(".scroller{position:relative;overflow:hidden}.scroller .contentWrap{position:absolute;width:100%;top:0;left:0}.scroller .scrollBar{position:absolute;height:100%;top:0;right:0;width:12px;background:rgba(225,225,225,.2);border:solid 1px #ccc;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.scroller .scrollBar:hover{background:rgba(225,225,225,.5)}.scroller .scrollBar .scrollBtn{display:block;position:absolute;left:0;right:0;top:0;height:20px;background:#06c;cursor:pointer}");
});

/*
 *
 * @description:自定义滚动条
 * */
define("/modules/widget/scroller/scroller-debug", [], function(require, exports, modules) {
    /*构造函数*/
    var Scroller = function(el, options) {
        this.$scroller = $(el);
        this.options = $.extend({}, Scroller.options, options);
        this.init();
    };
    Scroller.prototype.init = function() {
        var _this = this;
        this.$scroller.addClass("scroller").wrapInner('<div class="contentWrap"></div>');
        this.$content = this.$scroller.find(".contentWrap");
        if (this.getHeight(this.$content) - this.getHeight(this.$scroller) < 0) {
            //高度不够时将不会触发滚动条
            return false;
        }
        this.$scrollBar = this.scrollBar();
        //设置滚动条的高度
        this.$scrollBtn = this.$scrollBar.find(".scrollBtn");
        var scrollContainer = this.$scroller[0];
        if (scrollContainer.addEventListener) {
            scrollContainer.addEventListener("mousewheel", $.proxy(this.scroll, this), false);
            //IE9, Chrome, Safari, Oper
            scrollContainer.addEventListener("DOMMouseScroll", $.proxy(this.scroll, this), false);
        } else {
            scrollContainer.attachEvent("onmousewheel", $.proxy(this, this.scroll));
        }
        this.$scrollBtn.on("mousedown.md.", function(e) {
            var disY = _this.$content.position().top;
            $(document).on("mousemove.md", function(ev) {
                var scrollHeight = _this.$content.innerHeight() - _this.$scroller.innerHeight(), //滚动内容高度,
                scrollBarHeight = _this.$scrollBar.innerHeight() - _this.$scrollBtn.innerHeight();
                //滚动条的滚动高度
                var top = disY + (e.clientY - ev.clientY) * scrollHeight / scrollBarHeight;
                //将滚动条的滚动距离转化为内容的滚动位移
                _this.setPosition(top);
            });
            $(document).on("mouseup.md", function() {
                $(document).off("mousemove.md");
            });
            return false;
        });
    };
    Scroller.prototype.scroll = function(e) {
        var top, delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail));
        //滚轮
        if (delta > 0) {
            //向上滚动
            top = this.$content.position().top + 10;
        } else {
            //向下滚动
            top = this.$content.position().top - 10;
        }
        this.setPosition(top);
    };
    Scroller.prototype.setPosition = function(offset) {
        var scrollHeight = this.$content.innerHeight() - this.$scroller.innerHeight(), //滚动内容高度,
        scrollBarHeight = this.$scrollBar.innerHeight() - this.$scrollBtn.innerHeight();
        //滚动条的滚动高度
        offset = Math.min(0, offset) && Math.max(-scrollHeight, offset);
        var scrollBarTop = -scrollBarHeight * offset / scrollHeight;
        this.$content.css("top", offset);
        this.$scrollBtn.css("top", scrollBarTop);
    };
    Scroller.prototype.scrollBar = function() {
        var $scrollBar = $('<div class="scrollBar"><div class="scrollBtn"></div> </div>').appendTo(this.$scroller);
        $scrollBar.find(".scrollBtn").css("height", Math.max(30, this.$scroller.innerHeight() * this.$scroller.innerHeight() / this.$content.innerHeight()));
        return $scrollBar;
    };
    Scroller.prototype.getHeight = function($target) {
        var preStyle = this.$scroller.attr("style");
        if (this.$scroller.css("display") === "none") {
            //隐藏时
            this.$scroller.css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            });
        }
        var height = $target.outerHeight();
        this.$scroller.attr("style", preStyle);
        return height;
    };
    $.fn.scroller = function(options) {
        return this.each(function() {
            new Scroller(this, options);
        });
    };
    $("[data-toggle='scroller']").each(function() {
        new Scroller(this);
    });
    return Scroller;
});

define("/modules/widget/scroller/scroller.css", [], function() {
    seajs.importStyle(".scroller{position:relative;overflow:hidden}.scroller .contentWrap{position:absolute;width:100%;top:0;left:0}.scroller .scrollBar{position:absolute;height:100%;top:0;right:0;width:12px;background:rgba(225,225,225,.2);border:solid 1px #ccc;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.scroller .scrollBar:hover{background:rgba(225,225,225,.5)}.scroller .scrollBar .scrollBtn{display:block;position:absolute;left:0;right:0;top:0;height:20px;background:#06c;cursor:pointer}");
});

/*
 *
 * @description:自定义滚动条
 * */
define("/modules/widget/scroller/scroller", [], function(require, exports, modules) {
    /*构造函数*/
    var Scroller = function(el, options) {
        this.$scroller = $(el);
        this.options = $.extend({}, Scroller.options, options);
        this.init();
    };
    Scroller.prototype.init = function() {
        var _this = this;
        this.$scroller.addClass("scroller").wrapInner('<div class="contentWrap"></div>');
        this.$content = this.$scroller.find(".contentWrap");
        if (this.getHeight(this.$content) - this.getHeight(this.$scroller) < 0) {
            //高度不够时将不会触发滚动条
            return false;
        }
        this.$scrollBar = this.scrollBar();
        //设置滚动条的高度
        this.$scrollBtn = this.$scrollBar.find(".scrollBtn");
        var scrollContainer = this.$scroller[0];
        if (scrollContainer.addEventListener) {
            scrollContainer.addEventListener("mousewheel", $.proxy(this.scroll, this), false);
            //IE9, Chrome, Safari, Oper
            scrollContainer.addEventListener("DOMMouseScroll", $.proxy(this.scroll, this), false);
        } else {
            scrollContainer.attachEvent("onmousewheel", $.proxy(this, this.scroll));
        }
        this.$scrollBtn.on("mousedown.md.", function(e) {
            var disY = _this.$content.position().top;
            $(document).on("mousemove.md", function(ev) {
                var scrollHeight = _this.$content.innerHeight() - _this.$scroller.innerHeight(), //滚动内容高度,
                scrollBarHeight = _this.$scrollBar.innerHeight() - _this.$scrollBtn.innerHeight();
                //滚动条的滚动高度
                var top = disY + (e.clientY - ev.clientY) * scrollHeight / scrollBarHeight;
                //将滚动条的滚动距离转化为内容的滚动位移
                _this.setPosition(top);
            });
            $(document).on("mouseup.md", function() {
                $(document).off("mousemove.md");
            });
            return false;
        });
    };
    Scroller.prototype.scroll = function(e) {
        var top, delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail));
        //滚轮
        if (delta > 0) {
            //向上滚动
            top = this.$content.position().top + 10;
        } else {
            //向下滚动
            top = this.$content.position().top - 10;
        }
        this.setPosition(top);
    };
    Scroller.prototype.setPosition = function(offset) {
        var scrollHeight = this.$content.innerHeight() - this.$scroller.innerHeight(), //滚动内容高度,
        scrollBarHeight = this.$scrollBar.innerHeight() - this.$scrollBtn.innerHeight();
        //滚动条的滚动高度
        offset = Math.min(0, offset) && Math.max(-scrollHeight, offset);
        var scrollBarTop = -scrollBarHeight * offset / scrollHeight;
        this.$content.css("top", offset);
        this.$scrollBtn.css("top", scrollBarTop);
    };
    Scroller.prototype.scrollBar = function() {
        var $scrollBar = $('<div class="scrollBar"><div class="scrollBtn"></div> </div>').appendTo(this.$scroller);
        $scrollBar.find(".scrollBtn").css("height", Math.max(30, this.$scroller.innerHeight() * this.$scroller.innerHeight() / this.$content.innerHeight()));
        return $scrollBar;
    };
    Scroller.prototype.getHeight = function($target) {
        var preStyle = this.$scroller.attr("style");
        if (this.$scroller.css("display") === "none") {
            //隐藏时
            this.$scroller.css({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            });
        }
        var height = $target.outerHeight();
        this.$scroller.attr("style", preStyle);
        return height;
    };
    $.fn.scroller = function(options) {
        return this.each(function() {
            new Scroller(this, options);
        });
    };
    $("[data-toggle='scroller']").each(function() {
        new Scroller(this);
    });
    return Scroller;
});

define("/modules/widget/select/select-debug.css", [], function() {
    seajs.importStyle('.select{position:relative;display:inline-block;color:#06c;font-size:0}.select.open .selectList{display:block}.select .selectDetail{line-height:24px;padding:4px 8px;font-size:12px;display:inline-block;vertical-align:middle;border:solid 1px #06c;border-bottom-left-radius:3px;border-top-left-radius:3px}.select .selectDetail+.selectBtn{margin-left:-1px;border-top-right-radius:3px;border-bottom-right-radius:3px}.select .selectBtn{border:solid 1px #06c;outline:0;line-height:24px;padding:4px 8px;background:#EEE}.select .selectBtn .caret{display:inline-block;width:0;height:0;vertical-align:middle;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:"";-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.select .selectList{display:none;position:absolute;top:100%;width:100%;font-size:12px;background:#FFF;border:solid 1px #EDEDED;border-radius:3px;padding:5px 0;box-shadow:0 0 8px rgba(0,0,0,.2);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.select .selectList:before,.select .selectList:after{content:" ";display:table}.select .selectList:after{clear:both}.select .selectList li{line-height:30px;padding:0 10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select .selectList li:hover{color:#FFF;background:#06c}.select.open .selectBtn i{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.select.open .selectList{display:block}');
});

/*
 *
 * @description:自定义的select
 * */
define("/modules/widget/select/select-debug", [], function(require, exports, moudles) {
    var Select = function(el, options) {
        this.$el = $(el);
        this.options = $.extend({}, Select.options, options);
        this.init();
    };
    Select.options = {
        onChange: function(option, select) {},
        onSelect: function(option, select) {}
    };
    Select.prototype.init = function() {
        var _this = this;
        this.$el.on("click.md", ".selectBtn", $.proxy(this.toggle, this)).on("click.md", ".selectList li", function() {
            _this.onSelect(this);
        }).on("change.md", function(e, option) {
            //当选项改变时
            _this.options.onChange.call(_this, option, _this);
        });
    };
    /*切换下拉*/
    Select.prototype.toggle = function() {
        this.$el.toggleClass("open");
    };
    /*选中一个选项时*/
    Select.prototype.onSelect = function(option) {
        var $option = $(option), $detail = this.$el.find(".selectDetail"), optionValue = $option.data("value") || "", //如果没有设置时则为空字符串
        selectValue = $detail.data("value") || "";
        if (optionValue !== selectValue) {
            this.value = optionValue;
            //更新select的值
            $detail.data("value", optionValue).text($option.text());
            //更新值
            this.$el.trigger("change.md", option);
        }
        this.options.onSelect.call(this, option, this);
        this.toggle();
    };
    $.fn.select = function(options) {
        return this.each(function() {
            new Select(this, options);
        });
    };
    $("[data-toggle='select']").each(function() {
        new Select(this);
    });
    $.fn.select.Constructor = Select;
    return Select;
});

define("/modules/widget/select/select.css", [], function() {
    seajs.importStyle('.select{position:relative;display:inline-block;color:#06c;font-size:0}.select.open .selectList{display:block}.select .selectDetail{line-height:24px;padding:4px 8px;font-size:12px;display:inline-block;vertical-align:middle;border:solid 1px #06c;border-bottom-left-radius:3px;border-top-left-radius:3px}.select .selectDetail+.selectBtn{margin-left:-1px;border-top-right-radius:3px;border-bottom-right-radius:3px}.select .selectBtn{border:solid 1px #06c;outline:0;line-height:24px;padding:4px 8px;background:#EEE}.select .selectBtn .caret{display:inline-block;width:0;height:0;vertical-align:middle;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:"";-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.select .selectList{display:none;position:absolute;top:100%;width:100%;font-size:12px;background:#FFF;border:solid 1px #EDEDED;border-radius:3px;padding:5px 0;box-shadow:0 0 8px rgba(0,0,0,.2);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.select .selectList:before,.select .selectList:after{content:" ";display:table}.select .selectList:after{clear:both}.select .selectList li{line-height:30px;padding:0 10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select .selectList li:hover{color:#FFF;background:#06c}.select.open .selectBtn i{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.select.open .selectList{display:block}');
});

/*
 *
 * @description:自定义的select
 * */
define("/modules/widget/select/select", [], function(require, exports, moudles) {
    var Select = function(el, options) {
        this.$el = $(el);
        this.options = $.extend({}, Select.options, options);
        this.init();
    };
    Select.options = {
        onChange: function(option, select) {},
        onSelect: function(option, select) {}
    };
    Select.prototype.init = function() {
        var _this = this;
        this.$el.on("click.md", ".selectBtn", $.proxy(this.toggle, this)).on("click.md", ".selectList li", function() {
            _this.onSelect(this);
        }).on("change.md", function(e, option) {
            //当选项改变时
            _this.options.onChange.call(_this, option, _this);
        });
    };
    /*切换下拉*/
    Select.prototype.toggle = function() {
        this.$el.toggleClass("open");
    };
    /*选中一个选项时*/
    Select.prototype.onSelect = function(option) {
        var $option = $(option), $detail = this.$el.find(".selectDetail"), optionValue = $option.data("value") || "", //如果没有设置时则为空字符串
        selectValue = $detail.data("value") || "";
        if (optionValue !== selectValue) {
            this.value = optionValue;
            //更新select的值
            $detail.data("value", optionValue).text($option.text());
            //更新值
            this.$el.trigger("change.md", option);
        }
        this.options.onSelect.call(this, option, this);
        this.toggle();
    };
    $.fn.select = function(options) {
        return this.each(function() {
            new Select(this, options);
        });
    };
    $("[data-toggle='select']").each(function() {
        new Select(this);
    });
    $.fn.select.Constructor = Select;
    return Select;
});

define("/modules/widget/selectInput/selectInput-debug.css", [], function() {
    seajs.importStyle(".selectInput{position:relative;display:inline-block}.selectInput input{padding-right:20px}.selectInput .optionList{display:none;position:absolute;top:100%;width:100%;background:#FFF;border:solid 1px #EDEDED;border-radius:3px;box-sizing:border-box;padding:5px 0;box-shadow:0 0 8px rgba(0,0,0,.2);overflow-y:auto}.selectInput .optionList .option{line-height:30px;padding:0 10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.selectInput .optionList .option:hover{color:#FFF;background:#06c}.selectInput .btnClear{display:none;position:absolute;font-size:22px;top:9px;right:9px;color:#666;cursor:pointer}");
});

/*
 *@description:可输入和自动提示的下拉选择框
 *
 * */
define("/modules/widget/selectInput/selectInput-debug", [ "/modules/jquery/jquery-1.11.1-debug.js", "/modules/widget/scroller/scroller-debug" ], function(require, exports, modules) {
    require("/modules/jquery/jquery-1.11.1-debug.js");
    require("/modules/widget/scroller/scroller-debug");
    var SelectInput = function(el, options) {
        this.$el = $(el);
        this.$input = this.$el.find("input");
        this.$optionList = this.$input.next(".optionList").scroller();
        this.options = $.extend({}, SelectInput.options, options);
        this.inti();
    };
    SelectInput.options = {
        autoTip: true,
        clearBtn: true,
        allowLines: 5
    };
    SelectInput.Options = {
        clearBtn: '<span class="btnClear" title="清除">×</span>'
    };
    //格式化结果
    SelectInput.formatResult = function(target, currentValue) {
        var pattern = "(" + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return target.replace(new RegExp(pattern, "gi"), "<strong>$1</strong>");
    };
    SelectInput.onKeyup = function() {
        $.trim(this.$input.val()) !== "" ? this.$clearBtn.show() : this.$clearBtn.hide();
        if (this.currentValue !== this.$input.val()) {
            this.currentValue = this.$input.val();
            this.$input.trigger("selectChange");
        } else {
            return;
        }
    };
    SelectInput.prototype.inti = function() {
        var _this = this;
        var lines = Math.min(this.options.allowLines, this.$optionList.find("li").size());
        this.$optionList.height(lines * 30);
        this.$el.on("mouseover", function() {
            if (_this.$input.val() !== "") {
                _this.$clearBtn.show();
            }
        }).on("mouseout", function() {
            if (!_this.$input.is(":focus")) {
                _this.$clearBtn.hide();
            }
        });
        this.$input.on("focus", function() {
            _this.show();
            if (_this.$input.val() !== "") {
                _this.$clearBtn.show();
            } else {
                _this.$clearBtn.hide();
            }
        }).on("blur", function() {
            _this.$clearBtn.hide();
        }).on("keyup", $.proxy(SelectInput.onKeyup, this)).on("selectChange", $.proxy(SelectInput.filter, this));
        //用户输入变化时
        //选中下拉
        this.$optionList.on("click", ".option", function() {
            _this.$input.val($(this).text());
            _this.hide();
        });
        if (this.options.clearBtn) {
            this.$clearBtn = this.clearBtn();
        }
        $(window).on("click.md", function(e) {
            if ($.inArray(_this.$el.get(0), $(e.target).parents()) === -1) {
                _this.hide();
            }
        });
    };
    SelectInput.prototype.clearBtn = function() {
        return this.$clearBtn || $(SelectInput.Options.clearBtn).on("click", $.proxy(this.clear, this)).appendTo(this.$el);
    };
    SelectInput.prototype.clear = function() {
        this.$input.val("").trigger("focus");
    };
    //通过排用户的输入过滤显示下拉选项
    SelectInput.filter = function() {
        var currentValue = this.currentValue.toLowerCase();
        var html;
        var $resultOption = $.grep(this.$optionList.find("li"), function(option) {
            return option.outerHTML.indexOf(currentValue) !== -1;
        });
        $.each($resultOption, function(option) {});
        this.$optionList.html(html);
    };
    //显示下拉选项
    SelectInput.prototype.show = function() {
        this.$optionList.show();
    };
    //隐藏下拉选项
    SelectInput.prototype.hide = function() {
        this.$optionList.hide();
    };
    $.fn.selectInput = function(options) {
        return this.each(function() {
            new SelectInput(this, options);
        });
    };
    $("[data-toggle='selectinput']").each(function() {
        new SelectInput(this);
    });
});

define("/modules/widget/selectInput/selectInput.css", [], function() {
    seajs.importStyle(".selectInput{position:relative;display:inline-block}.selectInput input{padding-right:20px}.selectInput .optionList{display:none;position:absolute;top:100%;width:100%;background:#FFF;border:solid 1px #EDEDED;border-radius:3px;box-sizing:border-box;padding:5px 0;box-shadow:0 0 8px rgba(0,0,0,.2);overflow-y:auto}.selectInput .optionList .option{line-height:30px;padding:0 10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.selectInput .optionList .option:hover{color:#FFF;background:#06c}.selectInput .btnClear{display:none;position:absolute;font-size:22px;top:9px;right:9px;color:#666;cursor:pointer}");
});

/*
 *@description:可输入和自动提示的下拉选择框
 *
 * */
define("/modules/widget/selectInput/selectInput", [ "/modules/jquery/jquery-1.11.1.js", "/modules/widget/scroller/scroller" ], function(require, exports, modules) {
    require("/modules/jquery/jquery-1.11.1.js");
    require("/modules/widget/scroller/scroller");
    var SelectInput = function(el, options) {
        this.$el = $(el);
        this.$input = this.$el.find("input");
        this.$optionList = this.$input.next(".optionList").scroller();
        this.options = $.extend({}, SelectInput.options, options);
        this.inti();
    };
    SelectInput.options = {
        autoTip: true,
        clearBtn: true,
        allowLines: 5
    };
    SelectInput.Options = {
        clearBtn: '<span class="btnClear" title="清除">×</span>'
    };
    //格式化结果
    SelectInput.formatResult = function(target, currentValue) {
        var pattern = "(" + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return target.replace(new RegExp(pattern, "gi"), "<strong>$1</strong>");
    };
    SelectInput.onKeyup = function() {
        $.trim(this.$input.val()) !== "" ? this.$clearBtn.show() : this.$clearBtn.hide();
        if (this.currentValue !== this.$input.val()) {
            this.currentValue = this.$input.val();
            this.$input.trigger("selectChange");
        } else {
            return;
        }
    };
    SelectInput.prototype.inti = function() {
        var _this = this;
        var lines = Math.min(this.options.allowLines, this.$optionList.find("li").size());
        this.$optionList.height(lines * 30);
        this.$el.on("mouseover", function() {
            if (_this.$input.val() !== "") {
                _this.$clearBtn.show();
            }
        }).on("mouseout", function() {
            if (!_this.$input.is(":focus")) {
                _this.$clearBtn.hide();
            }
        });
        this.$input.on("focus", function() {
            _this.show();
            if (_this.$input.val() !== "") {
                _this.$clearBtn.show();
            } else {
                _this.$clearBtn.hide();
            }
        }).on("blur", function() {
            _this.$clearBtn.hide();
        }).on("keyup", $.proxy(SelectInput.onKeyup, this)).on("selectChange", $.proxy(SelectInput.filter, this));
        //用户输入变化时
        //选中下拉
        this.$optionList.on("click", ".option", function() {
            _this.$input.val($(this).text());
            _this.hide();
        });
        if (this.options.clearBtn) {
            this.$clearBtn = this.clearBtn();
        }
        $(window).on("click.md", function(e) {
            if ($.inArray(_this.$el.get(0), $(e.target).parents()) === -1) {
                _this.hide();
            }
        });
    };
    SelectInput.prototype.clearBtn = function() {
        return this.$clearBtn || $(SelectInput.Options.clearBtn).on("click", $.proxy(this.clear, this)).appendTo(this.$el);
    };
    SelectInput.prototype.clear = function() {
        this.$input.val("").trigger("focus");
    };
    //通过排用户的输入过滤显示下拉选项
    SelectInput.filter = function() {
        var currentValue = this.currentValue.toLowerCase();
        var html;
        var $resultOption = $.grep(this.$optionList.find("li"), function(option) {
            return option.outerHTML.indexOf(currentValue) !== -1;
        });
        $.each($resultOption, function(option) {});
        this.$optionList.html(html);
    };
    //显示下拉选项
    SelectInput.prototype.show = function() {
        this.$optionList.show();
    };
    //隐藏下拉选项
    SelectInput.prototype.hide = function() {
        this.$optionList.hide();
    };
    $.fn.selectInput = function(options) {
        return this.each(function() {
            new SelectInput(this, options);
        });
    };
    $("[data-toggle='selectinput']").each(function() {
        new SelectInput(this);
    });
});

define("/modules/widget/textEdit/md.textEdit-debug", [], function(require, moduel, exports) {
    (function($) {
        var TextEdit = function(element, options) {
            this.$editGroup = $(element);
            this.options = $.extend({}, TextEdit.Options, options);
            this.inti();
        };
        TextEdit.Options = {
            active: false,
            url: "",
            //服务器请求的地址
            isShowButton: true,
            onSuccess: null,
            //修改成功时调用的函数
            onFail: null,
            //修改失败
            onTimeout: null
        };
        TextEdit.prototype.inti = function() {
            this.$inputEdit = this.$editGroup.find(".input-editable");
            this.$btnEdit = this.$editGroup.find(".btn-edit");
            this.$groupSave = this.$editGroup.find(".group-save");
            this.$btnCancel = this.$groupSave.find(".btn-cancel");
            this.$btnSave = this.$groupSave.find(".btn-save");
            this.active = this.options.active;
            this.$btnEdit.on("click", $.proxy(this.allowEdit, this));
            this.$btnCancel.on("click", $.proxy(this.cancelEdit, this));
            this.$btnSave.on("click", $.proxy(this.saveEdit, this));
            var _this = this;
            $("body").on("click.md", function(e) {
                if ($.inArray(_this.$editGroup.get(0), $(e.target).parents()) === -1) {
                    _this.cancelEdit();
                }
            });
        };
        TextEdit.prototype.getEditText = function() {
            var inputVal = this.$inputEdit.val();
            this.extension = inputVal.substring(inputVal.lastIndexOf(".") + 1);
            return this.editText = inputVal.substring(0, inputVal.lastIndexOf("."));
        };
        TextEdit.prototype.allowEdit = function() {
            this.getEditText();
            this.$inputEdit.addClass("focus").removeAttr("disabled").val(this.editText).focus();
            if (this.options.isShowButton) {
                this.$btnEdit.parents(".group-edit").hide();
                this.$groupSave.show();
            }
            this.active = true;
            return this;
        };
        TextEdit.prototype.cancelEdit = function() {
            //取消编辑
            if (!this.active) return;
            this.$groupSave.hide();
            this.$inputEdit.removeClass("focus").prop("disabled", "disabled").val(this.editText + "." + this.extension);
            this.$btnEdit.parents(".group-edit").show();
            return this;
        };
        TextEdit.prototype.saveEdit = function() {
            //保存编辑
            if (this.editText === this.$inputEdit.val()) {
                this.cancelEdit();
                return;
            }
            var _this = this;
            $.ajax({
                url: this.options.url,
                data: {
                    editName: this.$inputEdit.val()
                },
                global: false,
                success: function(data, textStatus) {
                    if (data.trim() === "ok") {
                        if (typeof _this.options.onShow === "function") _this.options.onShow();
                    } else {
                        _this.cancelEdit();
                        if (typeof _this.options.onFail === "function") _this.options.onFail();
                    }
                },
                error: function() {
                    _this.cancelEdit();
                    if (typeof _this.options.onTimeout === "function") _this.options.onTimeout();
                }
            });
        };
        $.fn.mdTextEdit = function(options) {
            return this.each(function() {
                new TextEdit(this, options);
            });
        };
        $.fn.mdTextEdit.Constructor = TextEdit;
    })(jQuery);
});

define("/modules/widget/textEdit/md.textEdit", [], function(require, moduel, exports) {
    (function($) {
        var TextEdit = function(element, options) {
            this.$editGroup = $(element);
            this.options = $.extend({}, TextEdit.Options, options);
            this.inti();
        };
        TextEdit.Options = {
            active: false,
            url: "",
            //服务器请求的地址
            isShowButton: true,
            onSuccess: null,
            //修改成功时调用的函数
            onFail: null,
            //修改失败
            onTimeout: null
        };
        TextEdit.prototype.inti = function() {
            this.$inputEdit = this.$editGroup.find(".input-editable");
            this.$btnEdit = this.$editGroup.find(".btn-edit");
            this.$groupSave = this.$editGroup.find(".group-save");
            this.$btnCancel = this.$groupSave.find(".btn-cancel");
            this.$btnSave = this.$groupSave.find(".btn-save");
            this.active = this.options.active;
            this.$btnEdit.on("click", $.proxy(this.allowEdit, this));
            this.$btnCancel.on("click", $.proxy(this.cancelEdit, this));
            this.$btnSave.on("click", $.proxy(this.saveEdit, this));
            var _this = this;
            $("body").on("click.md", function(e) {
                if ($.inArray(_this.$editGroup.get(0), $(e.target).parents()) === -1) {
                    _this.cancelEdit();
                }
            });
        };
        TextEdit.prototype.getEditText = function() {
            var inputVal = this.$inputEdit.val();
            this.extension = inputVal.substring(inputVal.lastIndexOf(".") + 1);
            return this.editText = inputVal.substring(0, inputVal.lastIndexOf("."));
        };
        TextEdit.prototype.allowEdit = function() {
            this.getEditText();
            this.$inputEdit.addClass("focus").removeAttr("disabled").val(this.editText).focus();
            if (this.options.isShowButton) {
                this.$btnEdit.parents(".group-edit").hide();
                this.$groupSave.show();
            }
            this.active = true;
            return this;
        };
        TextEdit.prototype.cancelEdit = function() {
            //取消编辑
            if (!this.active) return;
            this.$groupSave.hide();
            this.$inputEdit.removeClass("focus").prop("disabled", "disabled").val(this.editText + "." + this.extension);
            this.$btnEdit.parents(".group-edit").show();
            return this;
        };
        TextEdit.prototype.saveEdit = function() {
            //保存编辑
            if (this.editText === this.$inputEdit.val()) {
                this.cancelEdit();
                return;
            }
            var _this = this;
            $.ajax({
                url: this.options.url,
                data: {
                    editName: this.$inputEdit.val()
                },
                global: false,
                success: function(data, textStatus) {
                    if (data.trim() === "ok") {
                        if (typeof _this.options.onShow === "function") _this.options.onShow();
                    } else {
                        _this.cancelEdit();
                        if (typeof _this.options.onFail === "function") _this.options.onFail();
                    }
                },
                error: function() {
                    _this.cancelEdit();
                    if (typeof _this.options.onTimeout === "function") _this.options.onTimeout();
                }
            });
        };
        $.fn.mdTextEdit = function(options) {
            return this.each(function() {
                new TextEdit(this, options);
            });
        };
        $.fn.mdTextEdit.Constructor = TextEdit;
    })(jQuery);
});

define("/modules/widget/textEdit/textEdit-debug.css", [], function() {
    seajs.importStyle(".edit-group .input-editable{border:0;background:transparent;display:inline-block;width:100%;resize:none;overflow:hidden;border:solid 1px transparent;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;outline:0}.edit-group .input-editable.focus{border:solid 1px #06c}.edit-group .group-btn{display:inline-block}.edit-group .group-btn.group-save{display:none}.edit-group .btn-edit{cursor:pointer;padding:0 10px;color:#06c}");
});

define("/modules/widget/textEdit/textEdit.css", [], function() {
    seajs.importStyle(".edit-group .input-editable{border:0;background:transparent;display:inline-block;width:100%;resize:none;overflow:hidden;border:solid 1px transparent;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;outline:0}.edit-group .input-editable.focus{border:solid 1px #06c}.edit-group .group-btn{display:inline-block}.edit-group .group-btn.group-save{display:none}.edit-group .btn-edit{cursor:pointer;padding:0 10px;color:#06c}");
});
