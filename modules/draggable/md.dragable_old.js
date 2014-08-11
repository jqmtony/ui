var Drag = function (dragEl, targetEl, options) {
    var isIE = !-[1, ];
    var isIE6 = isIE && /msie 6/.test(navigator.userAgent.toLowerCase());// 判断IE6

    // 清除文本选择
    var clearSelect = 'getSelection' in Window ? function () {
            Window.getSelection().removeAllRanges();
        } : function () {
            try {
                document.selection.empty();
            }
            catch (e) {
                console.log(e);
            }
        },

        self = this,
        event = self.event,
        isDown = false,
        newElem = isIE ? targetEl : doc,
        fixed = dragEl.style.position === 'fixed',
        _fixed = Dialog.data('options').fixed;

    // mousedown
    var down = function (e) {
        isDown = true;
        var scrollTop = self.getScroll('top'),
            scrollLeft = self.getScroll('left'),
            edgeLeft = fixed ? 0 : scrollLeft,
            edgeTop = fixed ? 0 : scrollTop;

        Dialog.data('dragData', {
            x: e.clientX - self.getOffset(dragEl, 'left') + (fixed ? scrollLeft : 0),
            y: e.clientY - self.getOffset(dragEl, 'top') + (fixed ? scrollTop : 0),
            // 设置上下左右4个临界点的位置
            // 固定定位的临界点 = 当前屏的宽、高(下、右要减去元素本身的宽度或高度)
            // 绝对定位的临界点 = 当前屏的宽、高 + 滚动条卷起部分(下、右要减去元素本身的宽度或高度)
            el: edgeLeft, // 左临界点
            et: edgeTop,  // 上临界点
            er: edgeLeft + docElem.clientWidth - dragEl.offsetWidth,  // 右临界点
            eb: edgeTop + docElem.clientHeight - dragEl.offsetHeight  // 下临界点
        });

        if (isIE) {
            // IE6如果是模拟fixed在mousedown的时候先删除模拟，节省性能
            if (isIE6 && _fixed) {
                dragEl.style.removeExpression('top');
            }
            targetEl.setCapture();
        }

        event.bind(newElem, 'mousemove', move);
        event.bind(newElem, 'mouseup', up);

        if (isIE) {
            event.bind(targetEl, 'losecapture', up);
        }

        e.stopPropagation();
        e.preventDefault();

    };

    event.bind(targetEl, 'mousedown', down);

    // mousemove
    var move = function (e) {
        if (!isDown) return;
        clearSelect();
        var dragData = Dialog.data('dragData'),
            left = e.clientX - dragData.x,
            top = e.clientY - dragData.y,
            et = dragData.et,
            er = dragData.er,
            eb = dragData.eb,
            el = dragData.el,
            style = dragEl.style;

        // 设置上下左右的临界点以防止元素溢出当前屏
        style.marginLeft = style.marginTop = '0px';
        style.left = (left <= el ? el : (left >= er ? er : left)) + 'px';
        style.top = (top <= et ? et : (top >= eb ? eb : top)) + 'px';
        e.stopPropagation();
    };

    // mouseup
    var up = function (e) {
        isDown = false;
        if (isIE) {
            event.unbind(targetEl, 'losecapture', arguments.callee);
        }
        event.unbind(newElem, 'mousemove', move);
        event.unbind(newElem, 'mouseup', arguments.callee);
        if (isIE) {
            targetEl.releaseCapture();
            // IE6如果是模拟fixed在mouseup的时候要重新设置模拟
            if (isIE6 && _fixed) {
                var top = parseInt(dragEl.style.top) - self.getScroll('top');
                dragEl.style.setExpression('top', "fuckIE6=document.documentElement.scrollTop+" + top + '+"px"');
            }
        }
        e.stopPropagation();
    };
};
$.fn.draggable = function (targetEl, options) {
    return this.each(function () {
        new Drag(this, this, options);
    })
};

$.fn.draggable.Constructor = Drag;