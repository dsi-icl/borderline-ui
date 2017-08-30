/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import React, { Component, Children } from 'react';
import { default as T } from 'prop-types';
import ConnectedRouter from './ConnectedRouter';
import BorderlineScene from '../BorderlineScene';
import routerFlux from './flux';

// Container delcaration
export default class RouterManager extends Component {

    // Custom name for container
    static displayName = 'RouterManager';

    // Typechecking for container's props
    static propTypes = {
        children: T.element
    };

    shouldComponentUpdate() {
        console.debug(`@--># ${this.constructor.name} > shouldComponentUpdate`); // eslint-disable-line no-console
        return false;
    }

    render() {
        const { children } = this.props;
        return (
            <BorderlineScene scene={'core'} seed={routerFlux}>
                <ConnectedRouter>
                    {children ? Children.only(children) : null}
                </ConnectedRouter>
            </BorderlineScene>
        );
    }
}
