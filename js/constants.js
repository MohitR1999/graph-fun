const BASE_URL = 'http://localhost:3000'
const SOCKET_URL = 'http://localhost:9000'

const WINDOW_PROPS = {
    X: 100,
    Y: 100,
    WIDTH: 400,
    HEIGHT: 200
}

const SERVICE_CREATION_WINDOW_PROPS = {
    X: 100,
    Y: 100,
    WIDTH: 1000,
    HEIGHT: 500
}

const LINK_CREATION_WINDOW_PROPS = {
    X: 100,
    Y: 100,
    WIDTH: 550,
    HEIGHT: 300
}

const NODE_ADDITION_FORM_PROPS = [
    {
        type: "settings",
        position: "label-top",
        inputWidth: 300
    },

    {
        type: "input", label: "IP Address:", name: "ip"
    },

    {
        type: "button", value: "Proceed", name: "proceed"
    }
]

const SERVICE_CREATION_FORM_PROPS = [
    {
        type: "settings",
        position: "label-top",
        inputWidth: 300
    },

    {
        type: "input", label: "Service Name:", name: "serviceName"
    },

    {
        type: "combo", label: "Technology:", name: "technology",
        options: [
            {
                text: ".1q/.1ad",
                value: "DOT1Q_DOT1AD"
            },
            {
                text: "MPLS-TP",
                value: "MPLS_TP"
            }
        ]
    },

    {
        type: "button", value: "Proceed", name: "proceed"
    }
]

const LINK_CREATION_FORM_PROPS = [
    {
        type: "settings",
        position: "label-top",
        inputWidth: 200,
    },

    {
        type : "input", label : "Link name (optional)", name : "label", value : "Default Link"
    },

    {
        type : "block", width : 500, list : [
            {
                type: "block", width: 250, list: [
                    {
                        type: "label", label: "Source"
                    },
        
                    {
                        type: "combo", label: "IP Address:", name: "source"
                    },
        
                    {
                        type: "combo", label: "Port:", name: "sourcePort"
                    }
                ]
            },
            
            { type: "newcolumn" },

            {
                type: "block", width: 250, list: [
        
                    {
                        type: "label", label: "Destination"
                    },
        
                    {
                        type: "combo", label: "IP Address:", name: "target"
                    },
        
                    {
                        type: "combo", label: "Port:", name: "targetPort"
                    },
                ]
            }
        ]
    },

    {
        type: "button", value: "Proceed", name: "proceed", offsetTop: 20
    }
]

const SIDE_GRID_PROPS = {
    parent: "grid",
    columns: [
        {
            label: "IP Address",
            type: "ro",
            id: "ip",
            width: '*'
        },

        {
            label: "Label",
            type: "ro",
            id: "label",
            width: '*'
        }
    ],
    skin: "dhx_skyblue",
    image_path: "dhtmlx3/dhtmlxGrid/codebase/imgs/",
}

const VALIDATION_ERRORS = {
    BAD_IP : "Invalid IP address provided",
    BAD_SOURCE : "Invalid source IP address provided",
    BAD_TARGET : "Invalid target IP address provided",
    BAD_SOURCE_PORT : "Invalid source port provided",
    BAD_TARGET_PORT : "Invalid target port provided",
    SOURCE_EQUALS_TARGET : "Source and Destination cannot be the same"
}