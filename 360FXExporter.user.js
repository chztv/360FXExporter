// ==UserScript==
// @name       360FXExporter
// @namespace  http://yunpan.cn/
// @version    0.1
// @description  export 360 share url to aria2/wget
// @match      http://*.yunpan.cn/*
// @run-at document-end
// @copyright  2013+, chztv <0571chz@gmail.com>
// ==/UserScript==

var script = document.createElement('script');
script.id = "TLE_script";
script.src = "https://raw.github.com/chztv/360FXExporter/master/360FXExporter.js";
document.body.appendChild(script);