export default {  // state, getters
    // 获取所有已选中的组件
    selectedComponents(state) {
        let components = state.components || [];
       return components.filter(component => component.selected);
    }
};
