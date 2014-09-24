(function (global) {
    var app = global.app = global.app || {};
  
    // Define the model
    var todoModel = {
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
                defaultValue: false
            },
            importance: {
                type: "string",
                defaultValue: "Medium",
                validation: {
                    pattern: "(?:Urgent|Medium|Low)"
                }
            }

        }
    };

    // Define the DataSource
    var azureToDoItemDS = new kendo.data.DataSource({
        schema: {
            model: todoModel
        },
        transport: {
            read: {
                url: app.TO_DO_URL,
                dataType: "json",
                headers: 
                    { "X-ZUMO-APPLICATION": app.azureKey }
            }
        }
    });


 
    var openView = function (e) {
       // e.preventDefault();        
        console.log(app.TO_DO_URL);
    }

    // Subscribe to events
    /*$.subscribe(app.createToDo, function (e, value) {
        azureToDoItemDS.add(value);
        azureToDoItemsDS.sync();
    });*/

    app.azureService = {
        azureToDoItemDS: azureToDoItemDS,
        openView: openView
    };

})(window);