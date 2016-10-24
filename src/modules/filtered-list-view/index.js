import { Text, Button } from 'src/components/widgets';
import React, { Component } from 'react';
import ListView from '../rm-list-view';

export default class FilteredListView extends Component {

    constructor() {
        super();
        this.state = {
            active: false,
        };
    }

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        this.setState({ active: true });
    }

    onBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        this.setState({ active: false });
    }

    render() {
        const { active } = this.state;
        const { filter, placeholder, onFilterChanged, onFilterCleared,
            ListItem, items, emptyMessage } = this.props;
        return (
            <div className="filtered-list-view">
                <div className={`search-filter${active ? ' rm-focus' : ''}`}>
                    <Text type="text"
                        value={filter}
                        placeholder={placeholder || 'Search'}
                        onChange={onFilterChanged}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    <Button name="clear-button"
                        onClick={onFilterCleared}>
                        Clear
                    </Button>
                </div>
                <ListView ListItem={ListItem}
                    items={items}
                    emptyMessage={emptyMessage}
                />
            </div>
        );
    }

}
