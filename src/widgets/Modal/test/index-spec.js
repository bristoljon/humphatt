import proxyquire from 'proxyquire';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = proxyquire('..', {
    'react-addons-css-transition-group': mockComponent('ReactCSSTransitionGroup'),
}).default;


describe("<Modal/>", () => {

    let _node;
    let _clock;

    beforeEach(() => {
        _clock = sinon.useFakeTimers();
        _node = render(<Modal visible={true}
            in={10} out={20} >CONTENT</Modal>);
    });

    afterEach(() => {
        _clock.restore();
    });

    it("should render a wrapper element", () => {
        expect(_node).to.have.prop('tagName', 'DIV');
    });

    it("should make the wrapper invisable when state.visible is false", () => {
        expect(_node).to.have.css('display', 'none');
    });

    it("should make the wrapper visable when state.visible is true", () => {
        _node.doc.setState({ visible: true });
        expect(_node).to.have.css('display', 'block');
    });

    it("should show the wrapper when it is visible", () => {
        expect(_node.doc.state.visible).to.equal(false);
        _clock.tick(0);
        expect(_node.doc.state.visible).to.equal(true);
    });

    it("should show the wrapper when on show()", () => {
        _node = _node.reRender({ visible: false });
        _clock.tick(20);
        expect(_node.doc.state.visible).to.equal(false);
        _node.doc.show();
        _clock.tick(0);
        expect(_node.doc.state.visible).to.equal(true);
    });

    it("should hide the wrapper when it is invisible", () => {
        _node.doc.setState({ visible: true });
        expect(_node.doc.state.visible).to.equal(true);
        _node = _node.reRender({ visible: false });
        expect(_node.doc.state.visible).to.equal(true);
        _clock.tick(20);
        expect(_node.doc.state.visible).to.equal(false);
    });

    it("should hide the wrapper on hide()", () => {
        _node.doc.setState({ visible: true });
        expect(_node.doc.state.visible).to.equal(true);
        _node.doc.hide();
        expect(_node.doc.state.visible).to.equal(true);
        _clock.tick(20);
        expect(_node.doc.state.visible).to.equal(false);
    });

    it("should initate the animation with the proper option", () => {
        const tg = _node.find('>*');
        expect(tg).to.have.prop('transitionName', 'animate');
        expect(tg).to.have.prop('transitionEnterTimeout', 10);
        expect(tg).to.have.prop('transitionLeaveTimeout', 20);
    });

    it("should show the content when state.visisble is true", () => {
        const content = _node.find('>*>.rm-dialog');
        expect(content).to.exist;
        expect(content).to.text('CONTENT');
    });

    it("should hide the content when state.visisble is false", () => {
        _node = _node.reRender({ visible: false });
        const content = _node.find('>*>.rm-dialog');
        expect(content).to.not.exist;
    });

});
