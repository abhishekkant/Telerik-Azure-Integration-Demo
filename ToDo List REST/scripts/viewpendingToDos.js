(function (global) {
    var app = global.app = global.app || {};
    var selecteditem = null;
  
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
        type: "odata",
        offlineStorage: "todoPendingItems-offline",
        schema: {
            total: "count",
            data: "results",
            model: todoModel
        },
        
         filter: { field: "isComplete", operator: "eq", value: false },
        transport: {
            read: {
                url: app.TO_DO_URL,
                dataType: "json",
                headers: 
                    { "X-ZUMO-APPLICATION": app.azureKey }
            },
            update: {
                url: function(e) {return app.TO_DO_URL + '/' + selecteditem},
                type:"PATCH",
                 headers: 
                    { "X-ZUMO-APPLICATION": app.azureKey,
"Content-Type":"application/json" }
                
            },
 
    }
             
    });


 
    var openView = function (e) {
       
  console.log("User swiped the element:" + $(e.touch.currentTarget).data("itemid"));
        
       selecteditem =  $(e.touch.currentTarget).data("itemid");
       var dataItem = azureToDoItemDS.get(selecteditem);
        console.log(dataItem);
        dataItem.isComplete = true;
        dataItem.dirty = true;
        azureToDoItemDS.sync();
        
    }
    
    
    var saveViewforOffline = function (e) {
        if (e.sender.element[0].innerText === 'Offline') {
            // The app is switching to offline mode
       app.azureService.azureToDoItemDS.online(false);
            e.sender.element[0].innerText = 'Online';
           
            }
        else {
            // The app is switching to online mode
             app.azureService.azureToDoItemDS.online(true);
            
            e.sender.element[0].innerText = 'Offline';
           /* $("#onlineStatusButton").kendoButton ({
                icon: "downloads"
            });*/
        }
       
    }


    app.azurePendingService = {
        azurePendingToDoItemDS: azureToDoItemDS,
        openView: openView,
        saveViewforOffline: saveViewforOffline
    };

})(window);