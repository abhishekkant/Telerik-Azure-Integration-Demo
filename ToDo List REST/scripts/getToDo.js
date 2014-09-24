(function (global) {
    var app = global.app = global.app || {};
  
    // Define the model
    var todoModel = {
        id: "id",
        fields: {
            todoItem: {
                type: "string"
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
                defaultValue: "Medium"
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
                url: TO_DO_URL,
                type: "json"
            }
        }
    });

    // Subscribe to events
    $.subscribe(app.createToDo, function (e, value) {
        azureToDoItemDS.add(value);
        azureToDoItemsDS.sync();
    });

})(window);