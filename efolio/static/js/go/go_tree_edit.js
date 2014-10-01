function init() {
      if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $go = go.GraphObject.make;  // for conciseness in defining templates
      
      diagram =
        $go(go.Diagram, "DiagramDiv",
          {
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true
          });


        diagram.nodeTemplate =
            $go(go.Node, "Auto",

                $go(go.Panel, "Auto",
                    { name: "BODY" },
                    $go(go.Shape, "RoundedRectangle",
                        { fill: "white",  minSize: new go.Size(120, 25) }
                    ),
                    $go(go.TextBlock,
                        { editable: true,
                            margin: new go.Margin(3, 3+11, 3, 3+4)},
                        new go.Binding("text", "key").makeTwoWay()
                    )
                ),
                // output port
                $go(go.Panel, "Auto",
                    { alignment: go.Spot.Right, portId: "from", fromLinkable: true, cursor: "pointer", click: addNodeAndLink },
                    $go(go.Shape, "Circle",
                    { width: 10, height: 10, fill: "white", stroke: "dodgerblue", strokeWidth: 2 }),
                    $go(go.Shape, "PlusLine",
                    { width: 5, height: 5, fill: null, stroke: "dodgerblue", strokeWidth: 1 })
                ),
                // input port
                $go(go.Panel, "Auto",
                    { alignment: go.Spot.Left, portId: "to", toLinkable: true },
                    $go(go.Shape, "Circle",
                    { width: 8, height: 8, fill: "white", stroke: "gray" }),
                    $go(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "dodgerblue", stroke: null })
                )
            );
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      diagram.nodeTemplate.contextMenu =
        $go(go.Adornment, "Vertical",
        
            $go("ContextMenuButton",
                $go(go.TextBlock, "Rename"),
                { click: function(e, obj) { e.diagram.commandHandler.editTextBlock(); } },
                new go.Binding("visible", "", function(o) { return o.diagram.commandHandler.canEditTextBlock(); }).ofObject()),
            // add one for Editing...
            $go("ContextMenuButton",
                $go(go.TextBlock, "Delete"),
                { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } },
                new go.Binding("visible", "", function(o) { return o.diagram.commandHandler.canDeleteSelection(); }).ofObject()),
            // add one for add child...
            $go("ContextMenuButton",
                $go(go.TextBlock, "Add child"),
                { click: function(e, obj) {
                    var selnode = e.diagram.selection.first();
                    if (!(selnode instanceof go.Node)) return;
                    e.diagram.startTransaction("add node and link");
                    var new_node = { parent: selnode.data.key, key: "N" };
                    e.diagram.model.addNodeData(new_node);
                    e.diagram.commitTransaction("add node and link"); 
                    } } )

       );

        
        
        
        
        
/*        
      // dropping a node on this special node will cause the selection to be deleted;
      // linking or relinking to this special node will cause the link to be deleted
      diagram.nodeTemplateMap.add("Recycle",
        $go(go.Node, "Auto",
          { portId: "to", toLinkable: true, deletable: false,
            layerName: "Background", locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { dragComputation: function(node, pt, gridpt) { return pt; } },
          { mouseDrop: function(e, obj) { diagram.commandHandler.deleteSelection(); } },
          $go(go.Shape,
            { fill: "lightgray", stroke: "gray" }),
          $go(go.TextBlock, "Drop Here\nTo Delete",
            { margin: 5, textAlign: "center" })
        ));

        */
        
        
        
        
        
        
      // this is a click event handler that adds a node and a link to the diagram,
      // connecting with the node on which the click occurred
      function addNodeAndLink(e, obj) {
            var fromNode = obj.part;
            var diagram = fromNode.diagram;
            diagram.startTransaction("Add State");
            // get the node data for which the user clicked the button
            var fromData = fromNode.data;
            // create a new "State" data object, positioned off to the right of the fromNode
            var p = fromNode.location.copy();
            p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
            var toData = {
            text: "new",
            loc: go.Point.stringify(p)
            };
            // add the new node data to the model
            var model = diagram.model;
            model.addNodeData(toData);
            // create a link data from the old node data to the new node data
            var linkdata = {
            from: model.getKeyForNodeData(fromData),
            to: model.getKeyForNodeData(toData)
            };
            // and add the link data to the model
            model.addLinkData(linkdata);
            // select the new Node
            var newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);
            // snap the new node to a valid location
            newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
            // then account for any overlap
//             shiftNodesToEmptySpaces();
            diagram.commitTransaction("Add State");
      }

      
      
      
      
      
      // Highlight ports when they are targets for linking or relinking.
      var OldTarget = null;  // remember the last highlit port
      function highlight(port) {
        if (OldTarget !== port) {
          lowlight();  // remove highlight from any old port
          OldTarget = port;
          port.scale = 1.3;  // highlight by enlarging
        }
      }
      function lowlight() {  // remove any highlight
        if (OldTarget) {
          OldTarget.scale = 1.0;
          OldTarget = null;
        }
      }

      
      /*
      
      
      // Connecting a link with the Recycle node removes the link
      diagram.addDiagramListener("LinkDrawn", function(e) {
        var link = e.subject;
        if (link.toNode.category === "Recycle") diagram.remove(link);
        lowlight();
      });
      diagram.addDiagramListener("LinkRelinked", function(e) {
        var link = e.subject;
        if (link.toNode.category === "Recycle") diagram.remove(link);
        lowlight();
      });

      
      */
      
      
      
//       diagram.linkTemplate =
//         $go(go.Link,
//           { selectionAdorned: false, fromPortId: "from", toPortId: "to", relinkableTo: true },
//           $go(go.Shape,
//             { stroke: "gray", strokeWidth: 2 },
//             { mouseEnter: function(e, obj) { obj.strokeWidth = 5; obj.stroke = "dodgerblue"; },
//               mouseLeave: function(e, obj) { obj.strokeWidth = 2; obj.stroke = "gray"; } })
//         );

        diagram.linkTemplate =
                $go(  go.Link,
                    {   selectionAdorned: false,
                        fromPortId: "from",
                        toPortId: "to",
                        routing: go.Link.Orthogonal,
                        corner: 5,
                        relinkableFrom: true,
                        relinkableTo: true 
                    },
                    $go(go.Shape,
                        { stroke: "gray", strokeWidth: 1,},
                        { mouseEnter: function(e, obj) { obj.strokeWidth = 2; obj.stroke = "dodgerblue"; },
                        mouseLeave: function(e, obj) { obj.strokeWidth = 1; obj.stroke = "gray"; } },
                        
                        new go.Binding("stroke", "color")),
                    $go(go.Shape,
                        { toArrow: "", stroke: null },
                        new go.Binding("fill", "color"))
                );
                    
        
        
      function commonLinkingToolInit(tool) {
        // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue
        tool.temporaryLink =
            $go(go.Link, { layerName: "Tool" },
              $go(go.Shape, { stroke: "dodgerblue", strokeWidth: 5 }));

        // change the standard proposed ports feedback from blue rectangles to transparent circles
        tool.temporaryFromPort.figure = "Circle";
        tool.temporaryFromPort.stroke = null;
        tool.temporaryFromPort.strokeWidth = 0;
        tool.temporaryToPort.figure = "Circle";
        tool.temporaryToPort.stroke = null;
        tool.temporaryToPort.strokeWidth = 0;

        // provide customized visual feedback as ports are targeted or not
        tool.portTargeted = function(realnode, realport, tempnode, tempport, toend) {
          if (realport === null) {  // no valid port nearby
            lowlight();
          } else if (toend) {
            highlight(realport);
          }
        };
      }

      var ltool = diagram.toolManager.linkingTool;
      commonLinkingToolInit(ltool);
      // do not allow links to be drawn starting at the "to" port
      ltool.direction = go.LinkingTool.ForwardsOnly;

      var rtool = diagram.toolManager.relinkingTool;
      commonLinkingToolInit(rtool);
      // change the standard relink handle to be a shape that takes the shape of the link
      rtool.toHandleArchetype =
        $go(go.Shape,
          { isPanelMain: true, fill: null, stroke: "dodgerblue", strokeWidth: 5 });

          
          
          
          
          
      // use a special DraggingTool to cause the dragging of a Link to start relinking it
      diagram.toolManager.draggingTool = new DragLinkingTool();

      // detect when dropped onto an occupied cell
//       diagram.addDiagramListener("SelectionMoved", shiftNodesToEmptySpaces);

      
      
      
      /*
      function shiftNodesToEmptySpaces() {
        diagram.selection.each(function(node) {
          if (!(node instanceof go.Node)) return;
          // look for Parts overlapping the node
          while (true) {
            var exist = diagram.findObjectsIn(node.actualBounds,
                                                // only consider Parts
                                                function(obj) { return obj.part; },
                                                // ignore Links and the dropped node itself
                                                function(part) { return part instanceof go.Node && part !== node; },
                                                // check for any overlap, not complete containment
                                                true).first();
            if (exist === null) break;
            // try shifting down beyond the existing node to see if there's empty space
            node.position = new go.Point(node.actualBounds.x, exist.actualBounds.bottom+10);
          }
        });
      }*/

      
      
/*      
      
      // prevent nodes from being dragged to the left of where the layout placed them
      diagram.addDiagramListener("LayoutCompleted", function(e) {
        diagram.nodes.each(function(node) {
          if (node.category === "Recycle") return;
          node.minLocation = new go.Point(node.location.x, -Infinity);
        });
      });*/

      
      
      
      
      
      
      load();  // load initial diagram from the mySavedModel textarea
      
        diagram.layout = $go(go.TreeLayout);
    }
    
    
    
    
    

    function save() {
      document.getElementById("mySavedModel").value = diagram.model.toJson();
      diagram.isModified = false;
    }
    function load() {
//       diagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
      
        var nodeDataArray = [
                    { key: "Alpha" },
                    { key: "Beta", parent: "Alpha" },
                    { key: "Gamma", parent: "Beta" },
                    { key: "Delta", parent: "Beta" },
                    { key: "Epsilon", parent: "Alpha" },
                    { key: "Zeta", parent: "Epsilon" },
                    { key: "Eta", parent: "Epsilon" },
                    { key: "Theta", parent: "Epsilon" }
        ];
        diagram.model = new go.TreeModel(nodeDataArray);
    }


    // Define a custom tool that changes a drag operation on a Link to a relinking operation,
    // but that operates like a normal DraggingTool otherwise.
    function DragLinkingTool() {
      go.DraggingTool.call(this);
      this.isGridSnapEnabled = true;
      this.isGridSnapRealtime = false;
      this.gridSnapCellSize = new go.Size(182, 1);
      this.gridSnapOrigin = new go.Point(5.5, 0);
    }
    go.Diagram.inherit(DragLinkingTool, go.DraggingTool);

    
    
    
    
    
    
    // Handle dragging a link specially -- by starting the RelinkingTool on that Link
    DragLinkingTool.prototype.doActivate = function() {
      var diagram = this.diagram;
      if (diagram === null) return;
      this.standardMouseSelect();
      var main = this.currentPart;  // this is set by the standardMouseSelect
      if (main instanceof go.Link) { // maybe start relinking instead of dragging
        var relinkingtool = diagram.toolManager.relinkingTool;
        // tell the RelinkingTool to work on this Link, not what is under the mouse
        relinkingtool.originalLink = main;
        // start the RelinkingTool
        diagram.currentTool = relinkingtool;
        // can activate it right now, because it already has the originalLink to reconnect
        relinkingtool.doActivate();
        relinkingtool.doMouseMove();
      } else {
        go.DraggingTool.prototype.doActivate.call(this);
      }
    };
    // end DragLinkingTool