function initializeLayout() {
    appLayout = new dhtmlXLayoutObject(document.body, "2U", "dhx_skyblue");
    bodyCell = appLayout.cells("b");
    bodyCell.hideHeader();
    bodyCell.attachObject("graph");

    sideGridCell = appLayout.cells("a");
    sideGridCell.hideHeader();
    sideGridCell.setWidth(400);
    sideGridCell.attachObject("grid");
    appLayout.dhxWins.setEffect("move", true);
    appLayout.dhxWins.setEffect("resize", true);
}

function initializeMenu() {
    menuBar = appLayout.attachMenu();
    // Add parent options
    menuBar.addNewSibling(null, "file", "File", false);
    menuBar.addNewSibling("file", "view", "View", false);
    // Add child options for File
    menuBar.addNewChild("file", 0, "file_new_node", "Add a node", false);
    menuBar.addNewChild("file", 1, "file_new_link", "Create a link", false);
    menuBar.addNewChild("file", 2, "file_new_service", "Create a service", false);
    // Add child options for View
    menuBar.addNewChild("view", 0, "file_view_links", "View all links", false);
    menuBar.addNewChild("view", 1, "file_view_services", "View all services", false);
    menuBar.attachEvent("onClick", menuClickHandler);
}

function initializeWindow() {
    nodeAdditionWizardBox = appLayout.dhxWins.createWindow("addNode", WINDOW_PROPS.X, WINDOW_PROPS.Y, WINDOW_PROPS.WIDTH, WINDOW_PROPS.HEIGHT);
    nodeAdditionWizardBox.setText("Add a node");
    nodeAdditionWizardBox.attachStatusBar().setText("Add a node to the network topology");
    nodeAdditionWizardBox.center();
    nodeAdditionWizardBox.keepInViewport(true);
    nodeAdditionWizardBox.hide();
    nodeAdditionWizardBox.attachEvent("onClose", function (id) {
        nodeAdditionForm.clear();
        nodeAdditionWizardBox.hide();
    });
}

function initializeServiceCreationWindow() {
    serviceCreationWindow = appLayout.dhxWins.createWindow("createService", SERVICE_CREATION_WINDOW_PROPS.X, SERVICE_CREATION_WINDOW_PROPS.Y, SERVICE_CREATION_WINDOW_PROPS.WIDTH, SERVICE_CREATION_WINDOW_PROPS.HEIGHT);
    serviceCreationWindow.setText("Create service");
    serviceCreationWindow.attachStatusBar().setText("Create a service specifying certain attributes");
    serviceCreationWindow.center();
    serviceCreationWindow.keepInViewport(true);
    // serviceCreationWindow.hide();
    serviceCreationWindow.attachEvent("onClose", function (id) {
        serviceCreationWindow.hide();
    });
}

function initializeLinkCreationWindow() {
    linkCreationWindow = appLayout.dhxWins.createWindow("createLink", LINK_CREATION_WINDOW_PROPS.X, LINK_CREATION_WINDOW_PROPS.Y, LINK_CREATION_WINDOW_PROPS.WIDTH, LINK_CREATION_WINDOW_PROPS.HEIGHT);
    linkCreationWindow.setText("Create Link");
    linkCreationWindow.attachStatusBar().setText("Create a link specifying source and destination attributes");
    linkCreationWindow.center();
    linkCreationWindow.keepInViewport(true);
    linkCreationWindow.attachEvent("onClose", function (id) {
        linkCreationWindow.hide();
    });
}

function initializeNodeAdditionForm() {
    nodeAdditionForm = nodeAdditionWizardBox.attachForm();
    nodeAdditionForm.loadStruct(NODE_ADDITION_FORM_PROPS, "json");
    nodeAdditionForm.attachEvent("onButtonClick", nodeAdditionFormHandler);
}

function initializeServiceCreationForm() {
    serviceCreationForm = serviceCreationWindow.attachForm();
    serviceCreationForm.loadStruct(SERVICE_CREATION_FORM_PROPS, "json");
    serviceCreationForm.attachEvent("onButtonClick", serviceCreationHandler);
}

function initializeLinkCreationForm() {
    linkCreationForm = linkCreationWindow.attachForm();
    linkCreationForm.loadStruct(LINK_CREATION_FORM_PROPS, "json");
    sourceCombo = linkCreationForm.getCombo("source");
    targetCombo = linkCreationForm.getCombo("target");
    sourceCombo.attachEvent("onChange", sourceNodeChangeEventHandler);
    targetCombo.attachEvent("onChange", targetNodeChangeEventHandler);
    sourcePortCombo = linkCreationForm.getCombo("sourcePort");
    targetPortCombo = linkCreationForm.getCombo("targetPort");
    sourceCombo.sync(nodesDataStore);
    targetCombo.sync(nodesDataStore);
    sourcePortCombo.sync(sourcePortDataStore);
    targetPortCombo.sync(targetPortDataStore);
}

function initializeServiceCreationTree() {
    serviceCreationTree = serviceCreationWindow.attachTree();
    const treeStruct = {
        id: 0,
        item: [
            { id: 1, text: "first" },
            {
                id: 2, text: "middle", child: "1", img0: "book.gif",
                item: [
                    { id: "21", text: "child" }
                ]
            },
            { id: 3, text: "last" }
        ]
    }
    serviceCreationTree.loadJSONObject(treeStruct, () => {});
}

function initializeServiceCreationTabbbar() {
    serviceCreationTabbar = serviceCreationWindow.attachTabbar();
    serviceCreationTabbar.setImagePath("dhtmlx3/dhtmlxTabbar/codebase/imgs/");
    serviceCreationTabbar.addTab("general_attributes", "General Attributes");
    serviceCreationTabbar.addTab("endpoints", "Endpoints");
    serviceCreationTabbar.setTabActive("general_attributes");
    generalAttributesForm = serviceCreationTabbar.cells("general_attributes").attachForm();
    generalAttributesForm.loadStruct(SERVICE_CREATION_FORM_PROPS, "json");
}

function initializeGraphContextMenu() {
    graphContextMenu = new dhtmlXMenuObject();
    graphContextMenu.renderAsContextMenu();
    graphContextMenu.addContextZone("graph");
    graphContextMenu.addNewChild(null, 0, "delete_node", "Delete Node");
}

function initializeNodesDataStore() {
    nodesDataStore = new dhtmlXDataStore();
    sourcePortDataStore = new dhtmlXDataStore();
    targetPortDataStore = new dhtmlXDataStore();
    nodesDataStore.data.scheme({
        $init : function (obj) {
            obj.value = obj.ip;
            obj.text = obj.ip;
            obj.ports = obj.ports.map(function(port) {
                return {
                    value : port,
                    text : port
                };
            });
        }
    })
    sideGrid.sync(nodesDataStore);
}

function initializeSideGrid() {
    sideGrid = new dhtmlXGridObject(SIDE_GRID_PROPS);
}