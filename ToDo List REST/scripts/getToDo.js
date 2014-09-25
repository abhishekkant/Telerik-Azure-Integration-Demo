(function (global) {
    var app = global.app = global.app || {};
  
    // Define the model
    var todoModel = kendo.data.Model.define({
        id: "id",
        fields: {
            todoItem: {
                type: "string",
                validation: {
                    required: true
                }
            },
            todoEntered: {
                type: "string",
                defaultValue: new Date()
            },
            isComplete: {
                type: "boolean",
                defaultValue: false,
nullable: false
            },
            importance: {
                type: "string",
                defaultValue: "Medium",
                nullable: false,
                validation: {
                    pattern: "(?:Urgent|Medium|Low)"
                }
            }

        }
    });

    // Define the DataSource
    var azureToDoItemDS = new kendo.data.DataSource({
        offlineStorage: "todoItems-offline",
        schema: {
            model: todoModel
        },
        transport: {
            read: {
                url: app.TO_DO_URL,
                dataType: "json",
                headers: 
                    { "X-ZUMO-APPLICATION": app.azureKey }
            },
            create: {
                url: app.TO_DO_URL,
                dataType: "json",
                headers: 
                    { "X-ZUMO-APPLICATION": app.azureKey,
                    "Content-Type":"application/json"},
                type: "POST"
            },
            parameterMap: function(data, type) {
      if (type == "create") {
        return JSON.stringify(data);
      }
    }
             
        }
    });


 
    var openView = function (e) {
       
  console.log("User swiped the element:" + $(e.touch.currentTarget).text());
        
    }
    
    
    var saveViewforOffline = function (e) {
       app.azureService.azureToDoItemDS.online(false);
        alert("data saved");
    }


    // Subscribe to events
    /*$.subscribe(app.createToDo, function (e, value) {
        azureToDoItemDS.add(value);
        azureToDoItemsDS.sync();
    });*/

    app.azureService = {
        azureToDoItemDS: azureToDoItemDS,
        openView: openView,
        saveViewforOffline: saveViewforOffline
    };

})(window);