function menuClickHandler(id) {
    if (id == "file_new_node") {
        nodeAdditionWizardBox.show();
    } else if (id == "file_new_link") {
        if (linkArray.length == 2) {
            const requestBody = {
                source : linkArray[0],
                target : linkArray[1]
            };
            fetch(`${BASE_URL}/addlink`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(requestBody)
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                cytoObject.add(data);
                linkArray = [];
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}

function nodeAdditionFormHandler(id) {
    if (id == "proceed") {
        const ip = nodeAdditionForm.getItemValue("ip");
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
                console.log(data);
                cytoObject.add(data);
                nodeAdditionForm.clear();
                nodeAdditionWizardBox.hide();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}