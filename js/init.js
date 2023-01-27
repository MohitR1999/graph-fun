function initializeLayout() {
    appLayout = new dhtmlXLayoutObject(document.body, "1C", "dhx_skyblue");
    bodyCell = appLayout.cells("a");
    bodyCell.hideHeader();
    bodyCell.attachObject("graph");
    appLayout.dhxWins.setEffect("move", true);
    appLayout.dhxWins.setEffect("resize", true);
}

function initializeMenu() {
    menuBar = appLayout.attachMenu();
    menuBar.addNewSibling(null, "file", "File", false);
    menuBar.addNewChild("file", 0, "file_new_node", "Add a node", false);
    menuBar.addNewChild("file", 1, "file_new_link", "Add a link", false);
    menuBar.addNewChild("file", 2, "file_new_service", "Create a service", false);
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
    serviceCreationWindow.attachStatusBar().setText("Create a service using the selected nodes");
    serviceCreationWindow.center();
    serviceCreationWindow.keepInViewport(true);
    // serviceCreationWindow.hide();
    serviceCreationWindow.attachEvent("onClose", function (id) {
        serviceCreationWindow.hide();
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
    // serviceCreationTabbar.setImagePath("dhtmlx3/dhtmlxTabbar/codebase/imgs/winbiscarf/");
    serviceCreationTabbar.setStyle("winScarf");
    serviceCreationTabbar.addTab("general_attributes", "General Attributes");
    serviceCreationTabbar.addTab("endpoints", "Endpoints");
}