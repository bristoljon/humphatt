import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './style';

export default class Modal extends React.Component {

    constructor(props) {
        super();
        this.visible = props.visible;
        this.state = {
            visible: false,
        };
    }

    componentWillReceiveProps(props) {
        this.visible = props.visible;
    }

    show() {
        this.visible = true;
        this.forceUpdate();
    }

    hide() {
        this.visible = false;
        this.forceUpdate();
    }

    render() {
        if (this.visible && !this.state.visible) {
            setTimeout(() => this.setState({ visible: true }), 0);
        }
        if (!this.visible && this.state.visible) {
            setTimeout(() => this.setState({ visible: false }), this.props.out);
        }
        return (<div className={styles.modal} style={{
            display: this.state.visible ? 'block' : 'none' }}>
            <ReactCSSTransitionGroup
                transitionName="animate"
                transitionEnterTimeout={this.props.in}
                transitionLeaveTimeout={this.props.out}>
                {this.visible ? (<div key="CONTENT"
                    className="rm-dialog">
                    {this.props.children}
                </div>) : null}
            </ReactCSSTransitionGroup>
        </div>);
    }

}
