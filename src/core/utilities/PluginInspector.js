import { Observable } from 'rxjs';

// We import plugin action as we need to use them upon component mount
import { actions as subAppsManager } from '../flux/subapps';
import store from '../store';

// We import system extensions here
import DashboardPlugin from '../../extensions/dashboard';
import StoryLinePlugin from '../../extensions/storyline';

const defaultExtensions = [
    DashboardPlugin,
    StoryLinePlugin
];

class PluginInspector {

    constructor() {
        this.initialized = false;
        this.systemExtensions = [];

        // For some unheard of reasons, borderline global is not yet available at this time.
        // We use Observable to delay the check and then carry on.
        let wait = Observable.interval(100)
            .filter(() => window.borderline && window.borderline.apiVersion)
            .subscribe(() => {
                wait.unsubscribe();
                this.loadSystemExtensions();
                // this.loadExternalExtensions();
            });
    }

    loadSystemExtensions() {
        defaultExtensions.map((extension) => {
            let current = new extension();
            try {
                current.invocation();
                this.systemExtensions.push(current);
            } catch (exception) {
                store.dispatch(subAppsManager.singleSubAppCorrupted(current.constructor.name));
                if (process.env.NODE_ENV === 'development')
                    console.error(exception); // eslint-disable-line no-console
            }
        });
    }

    loadExternalExtensions() {
        // After the component has updated we load the plugins
        store.dispatch(subAppsManager.loadSubApps());
    }

    refreshExtensions() {
        if (!this.initialized)
            return;
    }
}

const pluginInspector = new PluginInspector();
export default pluginInspector;
