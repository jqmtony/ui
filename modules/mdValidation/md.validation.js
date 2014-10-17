/**
 * Created by debiancc on 10/15/14.
 */
define(function (require, exports, module) {
    return (function ($) {
        var defaults = {
            errorFunc: function ($errorEl, errorMsg) {
                $errorEl.addClass('validationError');
                alert(errorMsg);
            }
        };
        $.fn.validation = function (param) {
            var $this = $(this),
                options = $.extend(defaults, param),
                regExpress = {
                    mail: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]+$/i,
                    url: /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/,
                    tel: /^[+]?((\d){3,4}([ ]|[-]))?((\d){7,8})(([ ]|[-])(\d){1,12})?$/,
                    mobile: /^(1[3-8]{1})\d{9}$/
                };
            $this.on({
                focusout: function () {
                    var $item = $(this), type;
                    if ($item.is(':hidden') || $item.is(':disabled')) {
                        return;
                    }
                    //验证必填
                    if ($item.attr('data-required')) {
                        //value is empty or false
                        if (!$item.val().trim().length || $item.val() == '-1') {
                            options.errorFunc($item, $item.attr('data-info-name') + '必填');
                            return;
                        }
                        //value verify is pass,then update required status
                        $item.attr('data-required') && $item.attr('data-required', 'done').removeClass('validationError');

                    }
                    //格式验证
                    if (type = $item.attr('data-required-type')) {
                        var typeArr = type.split('::');
                        typeArr.length != 2 ? typeArr = [type, type + '格式不正确'] : null;

                        //标准格式  type::msg
                        //只填写 msg时，则不做正则格式验证，直接提示消息
                        //只填写 type时，会自动补全msg值。做标准格式处理。
                        if (!typeArr[0].length) {
                            options.errorFunc($item, typeArr[1]);
                        } else if (!regExpress[typeArr[0]].test($item.val())) {
                            options.errorFunc($item, typeArr[1]);
                        } else {
                            $item.attr('data-required', 'done').removeClass('validationError');
                        }
                    }


                },
                focusin: function () {
                    $(this).removeClass('error');
                }
            }, '[data-required]');

            return check.call($this);
        };
        var check = function () {
            debugger;
            var $this = $(this),
                notPassElement = $this.find('[data-required="true"]:visible').eq(0);//verify not pass element
            if (notPassElement.length) {
                notPassElement.trigger('focusout');
                return false;
            }
            return true;
        };
    })(jQuery);
});
