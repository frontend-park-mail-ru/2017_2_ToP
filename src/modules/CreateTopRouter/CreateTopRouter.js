import router from '../Router/Router';
import {appendChilds} from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';

export default function CreateTopRouter(className, componentsRoutes, defaultComponents) {
    appendChilds(className, defaultComponents);
    componentsRoutes.forEach(route => router.use(route.path, route.component));
    router.connectRouting(window);

    UserService.getData()
        .catch(response => {
        })
        .then(response => {
           router.start();
        });
}
