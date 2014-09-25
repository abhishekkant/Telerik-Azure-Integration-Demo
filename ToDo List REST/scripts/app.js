(function (global) {
    var app = global.app = global.app || {};

    
    document.addEventListener("deviceready", function () {
        //navigator.splashscreen.hide();
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", initial: "views/viewtodos.html" });
    }, false);

    app.createToDo = "/todo/add";
    app.TO_DO_URL = "https://tplatform.azure-mobile.net/tables/ToDoList";
    app.azureKey = "tEXZhTzumuywJOLMJCiDCVXBviDVfq51";

})(window);