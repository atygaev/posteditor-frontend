import Vue from "vue"
import VueRouter from "vue-router"
import PageHome from "../views/pages/PageHome"
import Page404 from "../views/pages/Page404"
import PagePostEditor from "../views/pages/PagePostEditor"
import PagePostView from "../views/pages/PagePostView"
import PagePostList from "../views/pages/PagePostList"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome
    },
    {
        path: '/posts/:postId/editor',
        name: 'post.edit',
        component: PagePostEditor
    },
    {
        path: '/posts/:postId',
        name: 'post.view',
        component: PagePostView
    },
    {
        path: '/posts',
        name: 'post.list',
        component: PagePostList
    },
    {
        path: "*",
        name: '404',
        props: {
            path: String
        },
        component: Page404
    },
];

const router = new VueRouter({
    routes
});

export default router
