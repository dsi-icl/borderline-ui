/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import { Component, Children } from 'react';
import { default as T } from 'prop-types';
import bodyStyles from './styles/Body.css';

export default class Body extends Component {

    // Custom name for container
    static displayName = 'InspectorManager';

    // Typechecking for container's props
    static propTypes = {
        children: T.oneOfType([T.array, T.element])
    };

    componentDidMount() {
        document.documentElement.classList.add(bodyStyles.general);
    }

    shouldComponentUpdate() {
        console.debug(`@--># ${this.constructor.name} > shouldComponentUpdate`); // eslint-disable-line no-console
        return false;
    }

    render() {
        const { children } = this.props;
        return children ? Children.only(this.props.children) : null;
    }
}
