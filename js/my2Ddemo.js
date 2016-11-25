/*$(window).load(function () {
//(function () {

	var canvas = new draw2d.Canvas("gfx_holder");
	var triangle = new TriangleFigure({x: 100, y:100, width:100, height:140});
	canvas.add( triangle);

	// JUST ADD SOME DOCU ELEMENTS ON THE SCREEN
	var msg = new draw2d.shape.note.PostIt({text:"Simple example how to create your own vector figure"});
	canvas.add(msg, 20,20);
})();*/


$(window).load(function () {

    var canvas = new draw2d.Canvas("gfx_holder");


    // Add input and output ports to any shape via generic API calls 
    // and custom locators 
    //
    var d = new draw2d.shape.basic.Rectangle({width:50, height:100, x:100, y:100});
    var inputLocator  = new draw2d.layout.locator.InputPortLocator();
    var outputLocator = new draw2d.layout.locator.OutputPortLocator();

    d.createPort("hybrid",inputLocator);
    d.createPort("hybrid",inputLocator);
    d.createPort("hybrid",outputLocator);
    d.createPort("hybrid",outputLocator);

    canvas.add( d);
    canvas.add(new draw2d.shape.basic.Label({text:"Add ports to the shape with a given locator", x:230, y:130}));
    
    
    
    // add input and output ports via generic API calls and DEFAULT 
    // locators. The default locator arrange input on the left and ouput on the right 
    // side of the shape
    //
    var d2 = new draw2d.shape.basic.Diamond({width:50, height:60,x:100, y:300});
    canvas.add( d2);
    d2.createPort("input");
    d2.createPort("output");
    
    canvas.add(new draw2d.shape.basic.Label({text:"Add ports to the shape after canvas assignment with default locator", x:230, y:330}));
       
    
    
    // create my own implementation for the locators and use this for the port position
    // calculation 
    // 
    var MyInputPortLocator = draw2d.layout.locator.PortLocator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            this.applyConsiderRotation(figure, figure.getParent().getWidth()/2, 0);
        }
    });

    
    var MyOutputPortLocator = draw2d.layout.locator.PortLocator.extend({
        init:function( ){
          this._super();
        },    
        relocate:function(index, figure){
            var p = figure.getParent();

            this.applyConsiderRotation(figure, p.getWidth()/2, p.getHeight());
        }
    });

  var topBottom = new draw2d.shape.basic.Rectangle({width:50, height:100, x:100, y:500});
  topBottom.createPort("hybrid",new MyInputPortLocator());
  topBottom.createPort("hybrid",new MyOutputPortLocator());

  canvas.add( topBottom);
  canvas.add(new draw2d.shape.basic.Label({text:"Add ports to the shape with a custom locator", x:230, y:530}));
   
 
  // JUST ADD SOME DOCU ELEMENTS ON THE SCREEN
  var msg = new draw2d.shape.note.PostIt({text:"Add input and output ports at any position of the \nshape via generic API calls.", x:20, y:20});
  canvas.add(msg);

});
