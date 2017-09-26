import router from '../Router/Router';
import {appendChilds} from '../../components/TopComponent/TopComponent';

export default function CreateTopRouter(className, componentsRoutes, defaultComponents) {
    appendChilds(className, defaultComponents);
    componentsRoutes.forEach(route => router.use(route.path, route.component));
    router.connectRouting(window);

    return router;
}
