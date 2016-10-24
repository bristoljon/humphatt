import React from 'react';
import ReactDOM from 'react-dom';
import proxyquire from 'proxyquire';

const FilteredListView = proxyquire('../', {
    '../rm-list-view' : { default: mockComponent('RMListView')},
    '../../components/widgets': {
        Text: mockComponent('Text'),
        Button: mockComponent('Button'),
    },
}).default;

const snapshotFileName = `${__dirname}/rm-filtered-list-view.snap`;

describe("<RMIFilteredListView />", () => {

    let _node;
    let _onFocus;
    let _onBlur;

    const createProps = ({
        items="ITEMS",
        filter="FILTER",
        ListItem="LIST_ITEM",
        emptyMessage="EMPTY_MESSAGE",
        placeholder="PLACEHOLDER",
        onFocus = () => {},
        onBlur = () => {},
    }) => {
        return {
            items, filter, ListItem, emptyMessage, placeholder, onFocus, onBlur
        }
    }

    beforeEach(() => {
        _onFocus = sinon.stub()
        _onBlur = sinon.stub();
        _node = render(<FilteredListView
            {...createProps({
                onFocus: _onFocus,
                onBlur: _onBlur,
            })}
        />)
    });

    describe("RMIFilteredListView:render()", () => {

        it("should wrap the component in a div element", () => {
            expect(_node).to.have.prop('tagName', 'DIV');
        });

        it("should set the class to 'rm-list-view' on the wrapper element", () => {
            expect(_node).to.have.class('rm-filtered-list-view');
        });

        it("should render a Text component", function () {
            const text = _node.find('[data-mock-type="Text"]');
            expect(text).to.exist;
        });

        it("should render a Button component", function () {
            const button = _node.find('[data-mock-type="Button"]');
            expect(button).to.exist;
        });

        it("should render a ListView component", function () {
            const listView = _node.find('[data-mock-type="RMListView"]');
            expect(listView).to.exist;
        });

        it("can be focused", () => {
            expect(_onFocus).not.to.have.been.called;
            expect(_node.doc.state.active).to.be.false;
            _node.doc.onFocus();
            expect(_onFocus).to.have.been.called;
            expect(_node.doc.state.active).to.be.true;
        });

        it("can be blurred", () => {
            _node.doc.onFocus();
            _node.doc.onBlur();
            expect(_onBlur).to.have.been.called;
            expect(_node.doc.state.active).to.be.false;
        });

        it("should match the snapshot", () => {
            const tree = _node.toJSON();
            expect(tree).to.matchSnapshot(snapshotFileName, "render()");
        });

    });

});
