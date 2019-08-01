export default { // state, payload
    setPinboard(state, { pinboard = null, callback = null }) {
        if (pinboard !== null) state.pinboard = pinboard;
        if (typeof callback === "function") callback(state.pinboard);
    },
    setConfig(state, { config = null, callback = null }) {
        if (config !== null) state.config = config;
        if (typeof callback === "function") callback(state.config);
    },
    setComponents(state, { components = null, callback = null }) {
        if (components !== null) state.components = components;
        if (typeof callback === "function") callback(state.components);
    },
    setSelectedComponents(state, { path = null, callback = null }) {
        if (path === null) {
            state.components.forEach(component => {
                if (component.selected) callback(component);
            });
        } else {
            path = path.split(".");
            state.components.forEach(component => {
                if (component.selected) {
                    let target = component;
                    for (let i = 0; i < path.length; i++) {
                        target = target && target[path[i]];
                    }
                    if (target !== undefined) callback(target);
                }
            });
        }
    },
    setComponent(state, { index = null, path = null, callback = null }) {
        if (index === null || typeof callback !== "function") return;
        let component = state.components[index];
        if (component === undefined) return;

        if (path === null) {
            callback(component);
        } else {
            let target = component;
            path = path.split(".");
            for (let i = 0; i < path.length; i++) {
                target = target && target[path[i]];
            }
            if (target !== undefined) callback(target);
        }
    },
    setScale(state, { scale = 1 }) {
        state.scale = scale;
    },
    setIncreaseFlag(state, { increaseFlag = 1 }) {
        state.increaseFlag = increaseFlag;
    }
};
