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
    menuBar.attachEvent("onClick", menuClickHandler);
}

function initializeWindow() {
    nodeAdditionWizardBox = appLayout.dhxWins.createWindow("addNode", WINDOW_PROPS.X, WINDOW_PROPS.Y, WINDOW_PROPS.WIDTH, WINDOW_PROPS.HEIGHT);
    nodeAdditionWizardBox.setText("Add a node");
    nodeAdditionWizardBox.attachStatusBar().setText("Add a node to the network topology");
    nodeAdditionWizardBox.center();
    nodeAdditionWizardBox.keepInViewport(true);
    nodeAdditionWizardBox.hide();
    nodeAdditionWizardBox.attachEvent("onClose", function(id) {
        nodeAdditionForm.clear();
        nodeAdditionWizardBox.hide();
    });
}

function initializeNodeAdditionForm() {
    nodeAdditionForm = nodeAdditionWizardBox.attachForm();
    nodeAdditionForm.loadStruct(NODE_ADDITION_FORM_PROPS, "json");
    nodeAdditionForm.attachEvent("onButtonClick", nodeAdditionFormHandler);
}