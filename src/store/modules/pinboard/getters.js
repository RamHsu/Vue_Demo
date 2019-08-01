export default {  // state, getters
    selectedComponents(state) {
        let components = state.components || [];
       return components.filter(component => component.selected);
    }
};
