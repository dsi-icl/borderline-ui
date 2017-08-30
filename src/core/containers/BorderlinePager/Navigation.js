/* -------------------------------------------------------------------------------------------
 *  Copyright (c) Florian Guitton. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 * ---------------------------------------------------------------------------------------- */
/* global borderline */

import React, { Component } from 'react';
import { default as T } from 'prop-types';
import { NavLink } from 'react-router-dom';

import pageActions from './flux/actions';
import navigationStyles from './styles/Navigation.css';
import logoutIcon from './images/logoutIcon.svg';
import searchIcon from './images/searchIcon.svg';
import menuTitleIcon from './images/menuTitleIcon.svg';
import menuIcon from './images/menuIcon.svg';

// Container delcaration
@borderline.stateAware()
export default class Navigation extends Component {

    // Custom name for container
    static displayName = 'Navigation';

    // Types for available context
    static contextTypes = {
        model: T.string
    };

    componentWillMount() {
        this.pages = [];
        this.expanded = false;
    }

    componentWillUpdate(next) {
        let state = next.state ? next.state[this.context.model] : null;
        this.pages = state ? state.toJS().pages || [] : [];
        this.expanded = state ? state.toJS().expand || false : false;
    }

    render() {
        const { pathname = '' } = this.props;
        const Icon = borderline.components.svg;
        return (
            <div className={`${navigationStyles.bar} ${this.expanded ? navigationStyles.expand : ''}`}>
                <ExpandMenuButtonContainer expanded={this.expanded} />
                <MainSearchBoxContainer />
                {this.pages.map((component) => (
                    <NavLink to={`${pathname}/${component.particule}`} activeClassName={navigationStyles.active} className={navigationStyles.button} key={`${component.particule}_${(Math.random() * 1e32).toString(36)}}`}>
                        <div className={navigationStyles.link}>
                            <div className={navigationStyles.icon}>
                                <Icon src={component.icon} />
                            </div>
                            <div className={navigationStyles.title}>{component.name}</div>
                        </div>
                    </NavLink>
                ))}
                <LogoutButtonContainer />
            </div>
        );
    }
}

class ExpandMenuButtonContainer extends Component {

    // Types for available context
    static contextTypes = {
        dispatch: T.func
    };

    expand(e) {
        e.preventDefault();
        this.context.dispatch(pageActions.pageMenuToggle());
    }

    render() {
        const { expanded } = this.props;
        const Icon = borderline.components.svg;
        return (
            <div className={navigationStyles.button} onClick={::this.expand}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        {expanded ? <Icon src={menuIcon} /> : <Icon src={menuTitleIcon} />}
                    </div>
                </div>
            </div>
        );
    }
}

class MainSearchBoxContainer extends Component {

    render() {
        const Icon = borderline.components.svg;
        return (
            <div className={navigationStyles.button}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        <Icon src={searchIcon} />
                    </div>
                    <div className={navigationStyles.title}>Search</div>
                </div>
            </div>
        );
    }
}

class LogoutButtonContainer extends Component {

    // Types for available context
    static contextTypes = {
        dispatch: T.func,
    };

    logout(e) {
        e.preventDefault();
        this.context.dispatch({type: '@@core/session/SESSION_LOGOUT'});
    }

    render() {
        const Icon = borderline.components.svg;
        return (
            <div className={`${navigationStyles.button} ${navigationStyles.logout}`} onClick={::this.logout}>
                <div className={navigationStyles.link}>
                    <div className={navigationStyles.icon}>
                        <Icon src={logoutIcon} />
                    </div>
                    <div className={navigationStyles.title}>Logout</div>
                </div>
            </div>
        );
    }
}
