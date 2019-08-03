<template>
    <div
        class="component-container"
        :style="[containerStyle]"
        @mousedown.stop="selectCurComponent($event)"
    >
        <pre>{{curComponent}}</pre>

        <div class="drag-action" v-if="curComponent.selected">
            <span class="conner top-left" @mousedown.stop="dragAction($event, 'top-left')"></span>
            <span class="direction horizontal top" @mousedown.stop="dragAction($event, 'top')"></span>
            <span class="conner top-right" @mousedown.stop="dragAction($event, 'top-right')"></span>
            <span class="direction vertical right" @mousedown.stop="dragAction($event, 'right')"></span>
            <span class="conner bottom-right" @mousedown.stop="dragAction($event, 'bottom-right')"></span>
            <span class="direction horizontal bottom" @mousedown.stop="dragAction($event, 'bottom')"></span>
            <span class="conner bottom-left" @mousedown.stop="dragAction($event, 'bottom-left')"></span>
            <span class="direction vertical left" @mousedown.stop="dragAction($event, 'left')"></span>
        </div>

    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name: "ComponentContainer",
    props: ["curComponent", "curIndex"],
    data() {
        return {
            minSize: {
                width: 50,
                height: 50
            }
        };
    },
    computed: {
        ...mapState("pinboard", {
            increaseFlag: "increaseFlag"
        }),

        containerStyle() {
            let _self = this;
            let style = {};
            if (_self.curComponent) {
                let element = _self.curComponent.config && _self.curComponent.config.element || {};
                style.width = element.width + "px";
                style.height = element.height + "px";
                style.top = element.top + "px";
                style.left = element.left + "px";

                if (_self.curComponent.selected) style["z-index"] = 9999;
            }
            return style;
        }
    },
    methods: {
        ...mapMutations("pinboard", {
            setComponents: "setComponents",
            setSelectedComponents: "setSelectedComponents",
            setComponent: "setComponent"
        }),

        selectCurComponent($event) {
            let _self = this;
            let moveFlag = false;
            let preClientX = $event.clientX;
            let preClientY = $event.clientY;

            if (_self.curComponent.selected) {
                document.onmousemove = function(e) {
                    let event = e || window.event;
                    _self.setSelectedComponents({ 
                        path: "config.element",
                        callback(element) {
                            let top = element.top;
                            let left = element.left;
                            _self.$set(element, "top", top + event.clientY - preClientY);
                            _self.$set(element, "left", left + event.clientX - preClientX);
                        }
                    }); 
                    preClientX = event.clientX;
                    preClientY = event.clientY;
                    moveFlag = true;
                };
            } else {
                document.onmousemove = function(e) {
                    let event = e || window.event;
                    _self.setComponent({ 
                        index: _self.curIndex,
                        path: "config.element",
                        callback(element) {
                            let top = element.top;
                            let left = element.left;
                            _self.$set(element, "top", top + event.clientY - preClientY);
                            _self.$set(element, "left", left + event.clientX - preClientX);
                        }
                    }); 
                    preClientX = event.clientX;
                    preClientY = event.clientY;
                    moveFlag = true;
                };
            }

            document.onmouseup = function() {
                if (!moveFlag) {
                    _self.setComponents({ 
                        callback(components) {
                            if (_self.increaseFlag) {
                                let component = components[_self.curIndex];
                                let selected = component.selected || false;
                                _self.$set(component, "selected", !selected);
                            } else {
                                components.forEach((component, index) => {
                                    _self.$set(component, "selected", index === _self.curIndex);
                                });
                            }
                        }
                    }); 
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        dragAction($event, type) {
            let _self = this;
            let element = _self.curComponent.config && _self.curComponent.config.element || {};
            let width = element.width;
            let height = element.height;
            let top = element.top;
            let left = element.left;
            let preClientX = $event.clientX;
            let preClientY = $event.clientY;

            _self.setComponents({ 
                callback(components) {
                    components.forEach((component, index) => {
                        _self.$set(component, "selected", index === _self.curIndex);
                    });
                }
            });

            document.onmousemove = function(e) {
                let event = e || window.event;
                let diffX = event.clientX - preClientX;
                let diffY = event.clientY - preClientY;

                switch (type) {
                    case "top-left": 
                        width -= diffX;
                        height -= diffY;
                        top += diffY;
                        left += diffX;
                        break;
                    case "top": 
                        height -= diffY;
                        top += diffY;
                        break;
                    case "top-right": 
                        width += diffX;
                        height -= diffY;
                        top += diffY;
                        break;
                    case "right": 
                        width += diffX;
                        break;
                    case "bottom-right": 
                        width += diffX;
                        height += diffY;
                        break;
                    case "bottom": 
                        height += diffY;
                        break;
                    case "bottom-left": 
                        width -= diffX;
                        height += diffY;
                        left += diffX;
                        break;
                    case "left": 
                        width -= diffX;
                        left += diffX;
                        break;
                }

                if (width < _self.minSize.width) {
                    width = _self.minSize.width
                }

                if (height < _self.minSize.height) {
                    height = _self.minSize.height
                }

                _self.setComponent({ 
                    index: _self.curIndex,
                    path: "config.element",
                    callback(element) {
                        _self.$set(element, "width", width);
                        _self.$set(element, "height", height);
                        _self.$set(element, "top", top);
                        _self.$set(element, "left", left);
                    }
                }); 

                preClientX = event.clientX;
                preClientY = event.clientY;
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    },
    mounted() {
    }
};
</script>
<style scoped>
.component-container {
    position: absolute;
    background-color: #fff;

    user-select: none;
    cursor: move;
    color: #f00;

    display: flex;
    justify-content: center;
    align-items: center;
}
.drag-action {
    position: absolute;
    border: 1px solid #008ff8;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.drag-action .direction {
    position: absolute;
    background-color: #008ff8;
    border-radius: 5px;
}
.drag-action .direction.horizontal {
    width: 30px;
    height: 10px;
    left: calc(50% - 15px);
}
.drag-action .direction.vertical {
    width: 10px;
    height: 30px;
    top: calc(50% - 15px);
}
.drag-action .direction.top {
    top: -5px;
    cursor: n-resize;
}
.drag-action .direction.right {
    right: -5px;
    cursor: e-resize;
}
.drag-action .direction.bottom {
    bottom: -5px;
    cursor: s-resize;
}
.drag-action .direction.left {
    left: -5px;
    cursor: w-resize;
}
.drag-action .conner {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #008ff8;
    border-radius: 50%;
}
.drag-action .conner.top-left {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
}
.drag-action .conner.top-right {
    top: -5px;
    right: -5px;
    cursor: sw-resize;
}
.drag-action .conner.bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
}
.drag-action .conner.bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: ne-resize;
}
</style>
