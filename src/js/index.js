"use strict";
window.onload = function () {
    for (var i = 0; i < document.getElementsByTagName("appitem").length; i++) {
        var appitem = document.getElementsByTagName("appitem")[i];
        appitem.addEventListener("click", function (self) {
            location.href = self.toElement.getAttribute("url");
        });
    }
};
