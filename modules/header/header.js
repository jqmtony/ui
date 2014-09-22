/*
 *
 *@description：demo页的通用头部
 *
 * */

define(function (require, exprots, modules) {
    require("jquery");
    var header = require("./header.html");

    $("body").prepend($(header));

})