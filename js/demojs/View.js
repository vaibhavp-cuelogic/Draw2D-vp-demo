

example.View = draw2d.Canvas.extend({   

    init:function(id){  

		this._super(id);
		
		this.setScrollArea("#"+id);

        //console.log(this.canvasId);
		
		this.currentDropConnection = null;


        //var reader = new draw2d.io.json.Reader();

        /*this.getCommandStack().addEventListener(function(e){ console.log('Pathak');
                      if(e.isPostChangeEvent()){
                          displayJSON(this);
                      }
                  });*/
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
        //console.log(this.canvasId);
        console.log(droppedDomNode);
        //console.log(droppedDomNode[0].innerHTML);
        var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        
        //console.log(figure);

        //if(droppedDomNode[0].innerHTML == 'Rectangle') {
            figure.width = 120;
            figure.height = 80;
        //}

        //console.log('Type=>'+type);
        //console.log(figure);
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        //console.log(command);
        this.getCommandStack().execute(command);
        //console.log('Goint to call displayJSON with canvas as:', this);
        // displayJSON(this);

       /*var reader = new draw2d.io.json.Reader();
        reader.unmarshal(this, jsonDocument); */
        //var currentCanvas = this;

        //console.log(this);

        var myCanvas = this;

        myCanvas.getCommandStack().addEventListener(function(e){ 
                      if(e.isPostChangeEvent()){    
                          //displayJSON(myCanvas);
                      }
                  });
        
    }

/*
        displayJSON: function(canvas){   console.log('Display Json....');
                var writer = new draw2d.io.json.Writer();
                writer.marshal(canvas,function(json){
                    $("#json").text(JSON.stringify(json, null, 2));
                });
            }*/


});
