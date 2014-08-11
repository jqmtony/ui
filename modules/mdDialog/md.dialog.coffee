define(["jquery", "../draggable/md.draggable.js"], (require, exports, module)->
  jquery = require("jquery")
  Drag = require('../draggable/md.draggable.js');

  class MDDialog
    constructor: (@element, @opts)->
      this.$el = $(@element)
      this.options = $.extend({}, MDDialog.DEFAULTS, @opts)
      this.inti()

    this.DEFAULTS = {
      onConfirm: null,
      onShow: null,
      onHide: null,
      title: '',
      content: null,
      width: 400,
      $dialog: null,
      draggable: true,
      footer: null,
      height: "auto"
    }
    this.STATICS = {
      template: '<div class="md-dialog overlay"><div class="dialog"><div class="dialog-header"><span class="btn-link btn-close" type="button">×</span></div><div class="dialog-body"></div><div class="dialog-footer"><button class="btn btn-cancel">取消</button><button class="btn btn-primary btn-ok">确定</button></div></div></div>'
    }
    inti: ->  #初始化
      this.dialog().show().remove()
      this.$header = this.$dialog.find(".dialog-header")
      this.$body = this.$dialog.find(".dialog-body")
      this.$footer = this.$dialog.find(".dialog-footer")
      if this.options.title isnt null then this.$header.append(this.options.title)
      if this.options.content isnt null then this.$body.empty().append(this.options.content)
      if this.options.footer isnt null then this.$footer.append(this.options.footer)
      this.$el.on("click", $.proxy(this.show, this))

    setPosition: ->
      left = ($(window).innerWidth() - this.$dialog.find(".dialog").innerWidth()) / 2;
      top = ($(window).innerHeight() - this.$dialog.find(".dialog").innerHeight()) / 2
      this.$dialog.find(".dialog").css({
        left: left,
        top: top
      })
    dialog: ->
      return this.$dialog = this.$dialog || this.options.$dialog || $(MDDialog.STATICS.template)
    show: (opts) ->
      options = $.extend({}, MDDialog.DEFAULTS, this.options, opts)
      if typeof this.options.onShow is 'function'
        options.onShow()
      this.dialog().show().appendTo("body")
      this.$dialog.on("click", ".btn-cancel,.btn-close", $.proxy(this.hide, this))
      this.$dialog.on("click", ".btn-ok", $.proxy(this.ok, this))
      if(this.options.draggable)
        this.dialog().addClass('draggable')
        this.$header.draggable(this.$dialog.find(".dialog")[0]);
      this.setPosition();

    hide: ->
      if typeof this.options.onHide is 'function'
        this.options.onHide()
      this.$dialog.remove()

    ok: ->
      if typeof this.options.onConfirm is 'function'
        this.options.onConfirm()

    $.fn.mdDialog = (options)->
      return this.each(->
        new MDDialog(this, options))
    $.fn.mdDialog.Constructor = MDDialog
)
