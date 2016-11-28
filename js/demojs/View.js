

example.View = draw2d.Canvas.extend({   

    init:function(id){  

		this._super(id);
		
		this.setScrollArea("#"+id);

        //console.log(this.canvasId);
		
		this.currentDropConnection = null;
    },

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     * 
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    { 
        //console.log(droppedDomNode);
    },
    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {   var jsonDocument = [];
        
        //console.log(droppedDomNode);
        var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        
        //if(droppedDomNode[0].innerHTML == 'Rectangle') {
            figure.width = 120;
            figure.height = 80;
            //figure.text = "Component One";
        //}


        // Create any Draw2D figure as decoration for the connection
      //
      figure.label = new draw2d.shape.basic.Label({text:"I'm a Label", color:"#0d0d0d", fontColor:"#0d0d0d"});
      
      // add the new decoration to the connection with a position locator.
      //
      figure.add(figure.label, new draw2d.layout.locator.CenterLocator(figure));
      
      figure.label.installEditor(new draw2d.ui.LabelInplaceEditor());


        
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        
        this.getCommandStack().execute(command);
        
       /*var reader = new draw2d.io.json.Reader();
        reader.unmarshal(this, jsonDocument); */
        //var currentCanvas = this;

        var myCanvas = this;

        myCanvas.getCommandStack().addEventListener(function(e){ 
                      if(e.isPostChangeEvent()){    
                          displayJSON(myCanvas);
                      }
                  });
        
    }

});
