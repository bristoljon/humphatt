import React from 'react';
import styles from './style';
import Modal from '../../widgets/Modal';
import Header from '../Header';
import Poem from '../Poem';
import RSVP from '../modals/RSVP';

export default class Home extends React.Component {
    componentWillMount = () => {
        console.log('Home', this.props);
        this.props.actions.initialise(this.props.location);
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.modal.show();
        }, 5000);
        setTimeout(() => {
            this.modal.hide();
        }, 10000);
    }
    render() {
        return (<div className={styles.main}>
            <div className={`${styles.wrap} ${status.small ? 'mobile' : ''}`}>
                <div className={styles.body}>
                    <Header {...this.props} />
                    <Poem />
                </div>
                <Modal ref={ref => (this.modal = ref)} in={150} out={150} >
                    <RSVP {...this.props} />
                </Modal>
            </div>
        </div>);
    }
};
