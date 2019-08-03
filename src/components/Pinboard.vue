<template>
    <div class="pinboard-edit-container">
        <!-- 顶部操作 -->
        <div class="top-action"></div>
        <!-- 核心编辑操作 -->
        <div class="edit-action">
            <!-- 左侧列表操作 -->
            <div class="list-container"></div>
            <!-- 大屏编辑区域 -->
            <div class="pinboard-container">
                <!-- 画布 -->
                <div class="layout-container">
                    <template v-for="component,index in components">
                        <component-container :curComponent="component" :curIndex="index"></component-container>
                    </template>
                </div>
            </div>
            <!-- 右侧配置操作 -->
            <div class="config-container"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import ComponentContainer from "./common/ComponentContainer";
export default {
    name: "Pinboard",
    components: { ComponentContainer },
    data() {
        return {};
    },
    computed: {
        ...mapState("pinboard", {
            pinboard: "pinboard",
            config: "config",
            components: "components",
            scale: "scale",
            increaseFlag: "increaseFlag"
        }),
        ...mapGetters("pinboard", {
            selectedComponents: "selectedComponents"
        }),

        dragActionStyle() {
            let _self = this;
            if (_self.selectedComponents.length) {
                let topArr = [];
                let rightArr = [];
                let bottomArr = [];
                let leftArr = [];

                _self.selectedComponents.forEach(component => {
                    let element = component.config.element;
                    topArr.push(element.top);
                    rightArr.push(element.left + element.width);
                    bottomArr.push(element.top + element.height);
                    leftArr.push(element.left);
                });

                let top = Math.min(...topArr);
                let right = Math.max(...rightArr);
                let bottom = Math.max(...bottomArr);
                let left = Math.min(...leftArr);

                return {
                    width: right - left + "px",
                    height: bottom - top + "px",
                    top: top + "px",
                    left: left + "px"
                };
            } else {
                return {
                    display: "none"
                };
            }
        }
    },
    methods: {
        ...mapActions("pinboard", {
            init: "init"
        }),
        ...mapMutations("pinboard", {
            setComponents: "setComponents",
            setIncreaseFlag: "setIncreaseFlag"
        }),

        saveRulerLines() {
            // do something
        },
        dragAction() {
            // do something
        }
    },
    mounted() {
        let _self = this;
        _self.init();

        _self.$refs.rulerWrapper && _self.$refs.rulerWrapper.drawTicks();

        window.onmousedown = function() {
            console.log("--- window mousedown ---");
            _self.setComponents({
                callback(components) {
                    components.forEach((component, index) => {
                        _self.$set(component, "selected", false);
                    });
                }
            });
        };

        window.onresize = function() {
            console.log("--- window resize ---");
            _self.$refs.rulerWrapper && _self.$refs.rulerWrapper.drawTicks();
        };

        // 按键事件 onkeydown--onkeypress--onkeyup
        window.onkeydown = function(e) {
            console.log("--- window keydown ---");

            let event = e || window.event;
            let keyCode = event.keyCode;
            let eventKey = null;

            if (keyCode >= 37 && keyCode <= 40) {
                switch (keyCode) {
                    case 37:
                        eventKey = "left";
                        break;
                    case 38:
                        eventKey = "top";
                        break;
                    case 39:
                        eventKey = "right";
                        break;
                    case 40:
                        eventKey = "bottom";
                        break;
                }
            } else if (keyCode === 17) {
                _self.setIncreaseFlag({ increaseFlag: true });
            }
        };
        window.onkeyup = function(e) {
            console.log("--- window keyup ---");

            let event = e || window.event;
            let keyCode = event.keyCode;

            if (keyCode === 17) _self.setIncreaseFlag({ increaseFlag: false });
        };
    },
    beforeDestroy() {
        window.onclick = null;
        window.onresize = null;
    }
};
</script>

<style scoped>
    .pinboard-edit-container {
        flex-grow: 1;
    }
    .top-action {
        height: 50px;
        background-color: #333;
    }
    .edit-action {
        height: calc(100% - 50px);
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
    }
    .list-container,
    .config-container {
        width: 200px;
    }
    .pinboard-container {
        flex-grow: 1;
        background: #fff;
        position: relative;
        overflow: auto;
    }
    .layout-container {
        position: absolute;
        top: 50px;
        right: 50px;
        bottom: 50px;
        left: 50px;
        background-color: #333;
    }
</style>
