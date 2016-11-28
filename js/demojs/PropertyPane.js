
example.PropertyPane = Class.extend({
	
	init:function(elementId, view)
	{
		this.html = $("#"+elementId);
		this.view = view;

		// Databinding: helper attributes for the databinding
		this.selectedFigure = null;
		this.updateCallback = null;
		
        view.on("select", $.proxy(this.onSelectionChanged,this));
    },

	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event)
	{
		// Databinding: deregister the old update listener
		if(this.selectedFigure!==null && this.updateCallback !==null){
			this.selectedFigure.off(this.updateCallback);
		}
		
		this.selectedFigure = event.figure;
		
        this.html.html("");
        if(event.figure instanceof draw2d.shape.node.Node){
        	this.showPropertiesOpAmp(event.figure);
        }
	},


	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	showPropertiesOpAmp : function(figure)
	{
        // Set some good defaults
        // (better you create  new class and set the defaults in the init method)
        var userData = figure.getUserData();

        if(userData===null){
          figure.setUserData(userData={name:""});   
        }
        
        // simple x/y coordinate display
        //
        this.html.append(
                /*'<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                '     Position'+
                '</div>'+
                ' <div class="panel-body" id="position_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+
                '       x <input id="property_position_x" type="text" class="form-control"/><br>'+
                '       y <input id="property_position_y" type="text" class="form-control"/>'+
                '       width <input id="property_width" type="text" class="form-control"/>'+
                '      height <input id="property_height" type="text" class="form-control"/>'+
                '   </div>'+
                ' </div>'+
                '</div>'+*/
                
                '<div id="property_position_container" class="panel panel-default">'+
                ' <div class="panel-heading " >'+
                //'     Custom Property'+
                '</div>'+
                ' <div class="panel-body" id="userdata_panel">'+
                '   <div class="form-group">'+
                '       <div class="input-group" ></div> '+ 
                // '       Value <input id="property_name" type="text" class="form-control" value="'+figure.getUserData().name+'"/>'+
                '      Label <input id="property_component_lable" type="text" class="form-control"/>'+
                '   </div>'+
                ' </div>'+
                '</div>');
        
    	// Databinding: Figure --> UI
        //
        var isInUpdate=false;
    	figure.on("move",function(){
    		if(isInUpdate) return;
    		isInUpdate = true; // avoid recursion
    		$("#property_position_x").val(figure.getPosition().x);
            $("#property_position_y").val(figure.getPosition().y);
            $("#property_width").val(figure.getWidth());
            $("#property_height").val(figure.getHeight());
       		
            // For geeting text of component:
            $("#property_component_lable").val(figure.label.text);
       		isInUpdate=false;
       	});
    	
    	// Databinding: UI --> Figure
        //
    	$("#position_panel input").on("change", function(){ 
    	    
            // with undo/redo support
            // CommandMove is use only to calculate x and y axsis of the figure:
    	    var cmd = new draw2d.command.CommandMove(figure);

            // CommandResize is use to set the width and height of the figure:
            var cmdShapeResize = new draw2d.command.CommandResize(figure);

            cmd.setPosition(parseInt($("#property_position_x").val()),parseInt($("#property_position_y").val()));
    	    cmdShapeResize.setDimension(parseInt($("#property_width").val()),parseInt($("#property_height").val()));

            figure.getCanvas().getCommandStack().execute(cmd);
            figure.getCanvas().getCommandStack().execute(cmdShapeResize);
            
    	});

    	$("#property_name").on("change", function(){
            figure.getUserData().name=$("#property_name").val();
        });

        $("#property_component_lable").on("change", function() { 

            var currentComponentChangedLabelValue = $("#property_component_lable").val();
           
            figure.label.text = currentComponentChangedLabelValue;
           
            //add the new decoration to the connection with a position locator.
            figure.add(figure.label, new draw2d.layout.locator.CenterLocator());

        });

	}
});