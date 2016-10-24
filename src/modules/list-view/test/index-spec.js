import React from 'react';
import ListView from '..';

describe("<RMListView />", () => {

    let _node;
    const items = [
        { id: '1', label: 'one' },
        { id: '2', label: 'two' },
        { id: '3', label: 'three' },
    ];
    const ListItem = ({ id, label }) => {
        return <div>{label}</div>;
    };

    beforeEach(() => {
        _node = render(<ListView items={items} ListItem={ListItem} />);
    });

    it("should warap the component in a div element", () => {
        expect(_node).to.have.prop('tagName', 'DIV');
    });

    it("should set the class to 'rm-list-view' on the wrapper element", () => {
        expect(_node).to.have.class('rm-list-view');
    });

    it("should set the class to 'rm-list-view' on the wrapper element when the list is empty", () => {
        _node = _node.reRender({ items: [] });
        expect(_node).to.have.class('rm-list-view');
    });

    it("should render a list with three elements", function () {
        expect(_node.find('>ul>li').length).to.equal(3);
    });

    it("should render the content of the list elements", () => {
        expect(_node.find('>ul>li:nth-child(1)')).to.have.text('one');
        expect(_node.find('>ul>li:nth-child(2)')).to.have.text('two');
        expect(_node.find('>ul>li:nth-child(3)')).to.have.text('three');
    });

    it("should display a message when the item array is empty", () => {
        _node = _node.reRender({ items: [] });
        expect(_node.find('div.rm-message').text()).to.equal('Empty list');
    });

    it("should display custom message when it was provided", () => {
        _node = _node.reRender({ items: [], emptyMessage: 'Test message'  });
        expect(_node.find('div.rm-message').text()).to.equal('Test message');
    });

    it("shouldComponentUpdate() - true", () => {
        const update = _node.doc.shouldComponentUpdate({ items: [], ListItem })
        expect(update).to.be.true;
    });

    it("shouldComponentUpdate() - false", () => {
        const update = _node.doc.shouldComponentUpdate({ items, ListItem })
        expect(update).to.be.false;
    });

});
