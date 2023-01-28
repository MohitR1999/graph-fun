const BASE_URL = 'http://10.124.5.82:3000'

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
        type : "button", value: "Proceed", name : "proceed"
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
        options : [
            {
                text : ".1q/.1ad",
                value : "DOT1Q_DOT1AD"
            },
            {
                text : "MPLS-TP",
                value : "MPLS_TP"
            }
        ]
    },

    {
        type : "button", value: "Proceed", name : "proceed"
    }
]