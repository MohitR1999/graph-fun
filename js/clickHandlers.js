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

function linkCreationFormHandler(id) {
    if (id == "proceed") {
        const sourceIP = linkCreationForm.getItemValue("source");
        const targetIP = linkCreationForm.getItemValue("target");
        const sourcePort = linkCreationForm.getItemValue("sourcePort");
        const targetPort = linkCreationForm.getItemValue("targetPort");
        if (!sourceIP || sourceIP == "") {
            linkCreationStatusBar.setText(VALIDATION_ERRORS.BAD_SOURCE);
        } else if (!targetIP || targetIP == "") {
            linkCreationStatusBar.setText(VALIDATION_ERRORS.BAD_TARGET);
        } else if (!sourcePort || sourcePort == "") {
            linkCreationStatusBar.setText(VALIDATION_ERRORS.BAD_SOURCE_PORT);
        }
        else if (!targetPort || targetPort == "") {
            linkCreationStatusBar.setText(VALIDATION_ERRORS.BAD_TARGET_PORT);
        } 
        else if (targetIP == sourceIP) {
            linkCreationStatusBar.setText(VALIDATION_ERRORS.SOURCE_EQUALS_TARGET);
        }
        else {
            linkCreationStatusBar.setText("Create a link specifying source and destination attributes");
            const submitData = {
                source : sourceIP,
                target : targetIP,
                sourcePort : sourcePort,
                targetPort : targetPort
            };
            linkCreationForm.lock();
            fetch(`${BASE_URL}/addlink`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(submitData)
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                linkCreationForm.unlock();
                linkCreationForm.reset();
                linkCreationWindow.hide();
            }).catch(err => {
                console.log(err);
                linkCreationForm.unlock();
                linkCreationForm.reset();
                linkCreationWindow.hide();
            }) 
        }
    }
}