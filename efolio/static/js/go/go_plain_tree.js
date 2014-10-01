var $go = go.GraphObject.make;
            var diagram =
            $go(go.Diagram, "myDiagramDiv",{
                initialContentAlignment: go.Spot.Center, // Center Diagram contents
                
                // have mouse wheel events zoom in and out instead of scroll up and down
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                // support double-click in background creating a new node
//                 "clickCreatingTool.archetypeNodeData": { text: "new node" },
                "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
            });

        
            // define a function named "addChild" that is invoked by a button click
            addChild = function() {
                var selnode = diagram.selection.first();
                if (!(selnode instanceof go.Node)) return;
                diagram.startTransaction("add node and link");
                // have the Model add a new node data
                var new_node = { parent: selnode.data.key, key: "N" };
//                 diagram.model.addNodeData(newnode);  // this makes sure the key is unique
                // and then add a link data connecting the original node with the new one
//                 var newlink = { from: selnode.data.key, to: newnode.key };
//                 var new_node = { parent: selnode.data.key, key: newnode.key };
                // add the new link to the model
                diagram.model.addNodeData(new_node);
//                 diagram.model.addLinkData(newlink);
                // finish the transaction
                diagram.commitTransaction("add node and link");
            };
        

                
            function setupTree(diagram) {
                diagram.nodeTemplate =
                    $go(go.Node, "Auto",
                    $go(go.Shape, "RoundedRectangle", { fill: "white" }),
                    $go(go.TextBlock,
                        { 
                            margin: 5,
                            editable: true  // editing the text automatically updates the model data
                        },
                        new go.Binding("text", "key").makeTwoWay()
                        )
                        
                    );


                    
                diagram.linkTemplate =
                    $go(  go.Link,
                        {   
                            routing: go.Link.Orthogonal,
                            corner: 5,
                            relinkableFrom: true,
                            relinkableTo: true 
                        },
                        $go(go.Shape,
                            { strokeWidth: 1,},
                            new go.Binding("stroke", "color")),
                        $go(go.Shape,
                            { toArrow: "", stroke: null },
                            new go.Binding("fill", "color"))
                    );
                    
                    
                    
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

            setupTree(diagram);
            diagram.layout = $go(go.TreeLayout);  // automatic tree layout
            
            