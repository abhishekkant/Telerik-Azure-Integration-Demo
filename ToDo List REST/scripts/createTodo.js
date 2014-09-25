(function (global) {
    var app = global.app = global.app || {};
    
var saveToAzure = function(e)
    {
        var newtodo = {"todoItem":$("#todoitem").val(),"importance":$('input[name=importance]:checked').val(), todoEntered: new Date(),"isComplete":false}
        console.log(JSON.stringify(newtodo));
        app.azureService.azureToDoItemDS.one("change", function(e) {
            alert("suceess");
        });
        app.azureService.azureToDoItemDS.one("error", function(e) {
            alert("failure");
        });
        app.azureService.azureToDoItemDS.add(newtodo);
        app.azureService.azureToDoItemDS.sync();
        
    }
    
   app.azureOperations = {
       saveToAzure: saveToAzure
    };

})(window);