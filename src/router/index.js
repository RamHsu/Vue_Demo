import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Index",
            redirect: "/pinboard",
            component: function(resolve) {
                require(["@/components/Index"], resolve);
            },
            children: [
                {
                    path: "/pinboard",
                    name: "Pinboard",
                    component: function(resolve) {
                        require(["@/components/Pinboard"], resolve);
                    }
                },
                {
                    path: "/Config",
                    name: "Config",
                    component: function(resolve) {
                        require(["@/components/Config"], resolve);
                    }
                }
            ]
        }
    ]
});
