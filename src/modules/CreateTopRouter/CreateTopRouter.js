import Router from '../Router/Router';

export function appendChilds(parentComponent, childComponents) {
    for (let child of childComponents) {
        child.renderTo(parentComponent);
    }
}

export default function CreateTopRouter(className, componentsRoutes, defaultComponents) {
    const classObject = document.getElementsByClassName(className)[0];
    const router = new Router();

    componentsRoutes.forEach((route) => router.use(route.path, route.component));

    router.start();

    return router;
}