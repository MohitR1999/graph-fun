initializeLayout();
initializeMenu();
initializeWindow();
initializeNodeAdditionForm();

cytoObject = cytoscape({
    container: document.getElementById("graph"),
    elements : fetch(`${BASE_URL}/data`, {
        method : "GET",
    }).then(res => res.json()),
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-image': 'img/router.png',
                'label': 'data(label)',
                'background-fit': 'cover cover',
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'curve-style': 'bezier'
            }
        }
    ],

    layout: {
        name: 'grid',
        rows: 3,
        columns: 2
    }

});

let linkArray = [];

const collection = cytoObject.collection();
cytoObject.on('tap' , 'node', function(e) {
    const clickedNode = e.target;
    linkArray.push(clickedNode.data('id'));
})

cytoObject.on('tap', function(e) {
    if (e.target === cytoObject) {
        linkArray = [];
    }
})