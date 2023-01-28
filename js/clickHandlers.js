function menuClickHandler(id) {
    if (id == "file_new_node") {
        nodeAdditionWizardBox.show();
    } 
    else if (id == "file_new_service") {
        serviceCreationWindow.show();
    }
    else if (id == "file_new_link") {
        linkCreationWindow.show();
    }
}

function nodeAdditionFormHandler(id) {
    if (id == "proceed") {
        const ip = nodeAdditionForm.getItemValue("ip");
        sideGridCell.progressOn();
        if (ip) {
            const requestBody = { ip };
            fetch(`${BASE_URL}/addnode`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(requestBody)
            }).then(res => res.json())
            .then(data => {
                sideGridCell.progressOff();
                console.log(data);
                nodesDataStore.add(data);
                nodeAdditionForm.clear();
                nodeAdditionWizardBox.hide();
            })
            .catch(err => {
                sideGridCell.progressOff();
                console.log(err);
            })
        }
    }
}

function serviceCreationHandler(id) {
    console.log(id);
}

function sourceNodeChangeEventHandler() {
    const selectedIP = sourceCombo.getSelectedValue();
    const arrayOfPorts = nodesDataStore.serialize().filter(node => node.ip == selectedIP)[0].ports;
    sourcePortCombo.clearAll(true);
    sourcePortDataStore.clearAll();
    sourcePortDataStore.parse(arrayOfPorts);
}

function targetNodeChangeEventHandler() {
    const selectedIP = targetCombo.getSelectedValue();
    const arrayOfPorts = nodesDataStore.serialize().filter(node => node.ip == selectedIP)[0].ports;
    targetPortCombo.clearAll(true);
    targetPortDataStore.clearAll();
    targetPortDataStore.parse(arrayOfPorts);
}