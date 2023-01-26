const BASE_URL = 'http://localhost:3000'

const WINDOW_PROPS = {
    X: 100,
    Y: 100,
    WIDTH: 400,
    HEIGHT: 200
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