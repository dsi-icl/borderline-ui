/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import React, { Component, Children, PropTypes as T } from 'react';
import Wrapper from '../Wrapper';
import bodyStyles from './Body.css';

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

    render() {
        return (
            <Wrapper absolute>
                {Children.map(this.props.children, child => child)}
            </Wrapper>
        );
    }
}
