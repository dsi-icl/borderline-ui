import { BehaviorSubject } from 'rxjs';
import storeManager from '../utilities/StoreManager';

class PluginContext {

    constructor(extension) {
        this.extension = extension;
        this.reducers = {};
        this.epics = {};
        this.epicsTag = [];
        this.uniq = null;
        this.bootstrap();
    }

    bootstrap() {
        this.validate();
        this.prepare();
        this.uniq = this.instance.identity();
        this.instance.invocation.apply(this.access);
    }

    validate() {
        this.instance = new this.extension();
        if (!this.instance.__proto__.identity)
            throw 'Extention cannot be identified';
        if (!this.instance.__proto__.invocation)
            throw 'Extention cannot be invoked';
    }

    prepare() {
        this.access = {

            declareReducers: (reducers) => {
                Object.assign(this.reducers, reducers);
                this.declareReducers();
            },

            declareEpics: (epics) => {
                if (process.env.NODE_END !== 'production' && this.epicsTag.length > 0)
                    console.info(`In ${this.uniq} when declareEpics is called multiple time homonyms will be dropped`); // eslint-disable-line no-console
                Object.assign(this.epics, epics);
                this.declareEpics();
            },

            declareLocation: () => {
            },

            declareBinding: () => {
            },
        };
    }

    declareReducers() {
        // Reducers are OK to re-inject at runtime provided the same identifier
        let chain = (reducers) => (previous, action) => reducers.reduce((state, r) => r(state, action), previous);
        storeManager.injectAsyncReducer(this.uniq, chain(Object.values(this.reducers)));
    }

    declareEpics() {
        // Epics will lead to enormous problems while re-injected, here we filter only the new ones
        // Note this will leave previously loaded homony active
        let current = [];
        Object.keys(this.epics).map((key) => {
            if (!this.epicsTag.includes(key))
                current.push(this.epics[key]);
            else if (process.env.NODE_END !== 'production')
                console.info(`An epic named '${key}' was already inject earlier, new one will be ignored.`); // eslint-disable-line no-console
        });
        if (current.length === 0)
            return;
        let chain = (epics) => (action, store) => epics.mergeMap(epic => epic(action, store));
        storeManager.injectAsyncEpic(this.uniq, chain(new BehaviorSubject(...current)));
        this.epicsTag = Object.keys(this.epics);
    }
}

export default PluginContext;
