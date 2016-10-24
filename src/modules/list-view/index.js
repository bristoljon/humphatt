import React from 'react';

export default class ListView extends React.Component {

    // TODO: test it!!!
    shouldComponentUpdate(nextProps) {
        return this.props.items !== nextProps.items;
    }

    render() {
        const { items, ListItem, emptyMessage } = this.props;

        let content;
        if (items.length) {
            content = (
                <ul>
                    {
                        items.map(item => (
                            <li key={item.id}>
                                <ListItem {...this.props.props} {...item} />
                            </li>
                        ))
                    }
                </ul>
            );
        }
        else {
            content = (
                <div className="message">
                    {(emptyMessage || 'Empty list').replace(/\\n/g, '\n')}
                </div>
            );
        }

        return (
            <div className="list-view">
                {content}
            </div>
        );
    }
}
