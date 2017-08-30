/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */

import { Children, Component } from 'react';
import { default as T } from 'prop-types';

export default class NotAuthenticated extends Component {

    // Custom name for container
    static displayName = 'NotAuthenticated';

    // Types for available context
    static contextTypes = {
        session: T.object
    };

    render() {
        let {session} = this.context;
        let {children} = this.props;
        if (session && session.ok)
            return null;
        return children ? Children.only(children) : null;
    }
}
