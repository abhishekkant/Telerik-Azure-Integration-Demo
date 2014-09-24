(function (global) {
    var app = global.app = global.app || {};

    
    document.addEventListener("deviceready", function () {
        console.log("Heelo");
        //navigator.splashscreen.hide();
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    }, false);
    

})(window);