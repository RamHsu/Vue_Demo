export default { // content, payload
    init({ commit }, payload) {
        setTimeout(function() {
            let pinboard = {
                id: 13,
                name: "Pin_1"
            };
            let config = {
                width: 1920,
                height: 1080
            };
            let components = [
                {
                    id: 10001,
                    type: "background",
                    config: {
                        element: {
                            width: 360,
                            height: 360,
                            top: 20,
                            left: 20
                        }
                    }
                },
                {
                    id: 10002,
                    type: "border",
                    config: {
                        element: {
                            width: 360,
                            height: 360,
                            top: 20,
                            left: 420
                        }
                    }
                },
                {
                    id: 10003,
                    type: "answer",
                    chartType: "column",
                    config: {
                        element: {
                            width: 360,
                            height: 360,
                            top: 20,
                            left: 820
                        }
                    }
                }
            ];
            commit("setPinboard", { pinboard });
            commit("setConfig", { config });
            commit("setComponents", { components });
        }, 200);
    }
};
