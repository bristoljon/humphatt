import React, { PropTypes } from 'react';
import { classNames } from '../../utils';

export default class ToolTip extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        color: PropTypes.string,
        tip: PropTypes.node,
        position: PropTypes.string,
        arrowSize: PropTypes.number,
    };

    static defaultProps = {
        position: 'above',
        arrowSize: 10,
        zIndex: 100,
    };

    componentDidMount() {
        const el = document.createElement('div');
        el.style.visibility = 'hidden';
        el.className = classNames(this.props, 'tooltip');
        el.style.zIndex = this.props.zIndex;
        document.body.appendChild(el);
        this.el = el;
        window.addEventListener('resize', this.onUpdate);
        window.addEventListener('scroll', this.onUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onUpdate);
        window.removeEventListener('scroll', this.onUpdate);
        document.body.removeChild(this.el);
    }

    onUpdate = () => {
        if (this.el.style.visibility === 'visible') {
            this.displayTooltip();
        }
    }

    getActualViewportDimensions() {
        // Cross browser method for taking account of scroll bars
        const el = document.createElement('div');
        const ret = {};
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        document.body.appendChild(el);
        el.style.height = '100%';
        el.style.width = '100%';
        ret.height = el.offsetHeight;
        ret.width = el.offsetWidth;
        document.body.removeChild(el);
        return ret;
    }

    setTooltipStyles() {
        // Calc left offset
        const elHalfWidth = this.el.offsetWidth / 2;
        const elHeight = this.el.offsetHeight;
        const offsetX = this.calculateXOffset();

        this.el.style.left = `${this.x - elHalfWidth + offsetX}px`;
        this.arrow.style.left = `${elHalfWidth - offsetX}px`;

        ['top', 'bottom', 'borderTopColor', 'borderBottomColor'].forEach(p => {
            this.arrow.style[p] = null;
        });

        const boxBelow = () => {
            this.arrow.style.bottom = '100%';
            this.arrow.className = 'rm-tooltip-arrow-below';
            this.el.style.top = `${this.y + this.calculateYOffset('below')}px`;
        };

        const boxAbove = () => {
            this.arrow.style.top = '100%';
            this.arrow.className = 'rm-tooltip-arrow-above';
            this.el.style.top = `${this.y + this.calculateYOffset('above')}px`;
        };

        const testHeight = elHeight + this.props.arrowSize + this.anchorRect.height / 2;
        if (this.props.position === 'below') {
            if (testHeight >= this.space.bottom) {
                boxAbove();
            }
            else {
                boxBelow();
            }
        }
        else {
            if (testHeight >= this.space.top) {
                boxBelow();
            }
            else {
                boxAbove();
            }
        }
    }

    calculateXOffset() {
        const elHalfWidth = this.el.offsetWidth / 2;
        const space = this.space;
        if (space.left < elHalfWidth + 5) {
            const align = Math.min(space.left - 15, 5);
            return elHalfWidth - space.left + align;
        }
        else if (space.right < elHalfWidth + 5) {
            const align = Math.min(space.right - 15, 5);
            return space.right - elHalfWidth - align;
        }
        return 0;
    }

    calculateYOffset(box) {
        const gap = 2;
        const height = this.el.offsetHeight;
        const halfAnchorHeight = this.anchorRect.height / 2;
        if (box === 'above') {
            return -(height + this.props.arrowSize + halfAnchorHeight + gap);
        }
        return this.props.arrowSize + halfAnchorHeight + gap;
    }

    checkSpace() {
        const space = {};
        const { width, height } = this.getActualViewportDimensions();
        space.left = this.x;
        space.right = width - this.x;
        space.top = this.y;
        space.bottom = height - this.y;
        return space;
    }

    displayTooltip = () => {
        if (this.anchor) {
            this.anchorRect = this.anchor.getBoundingClientRect();
            this.x = this.anchorRect.left + this.anchorRect.width / 2;
            this.y = this.anchorRect.top + this.anchorRect.height / 2;
            this.space = this.checkSpace();
            this.el.innerHTML = this.contentElement.innerHTML;
            this.arrow = this.el.getElementsByClassName('rm-tooltip-arrow')[0];
            this.setTooltipStyles();
            this.el.style.visibility = 'visible';
        }
    }

    hideTooltip = () => {
        if (this.el) {
            this.el.style.visibility = 'hidden';
        }
    }

    render() {
        const attrs = {
            ref: ref => {
                this.anchor = ref;
            },
            className: classNames(this.props, 'tooltip-handler'),
        };
        if (!this.props.hasOwnProperty('visible')) {
            attrs.onMouseEnter = this.displayTooltip;
            attrs.onMouseLeave = this.hideTooltip;
        }
        const content = (<div {...attrs}>
            {this.props.children}
            <div style={{ display: 'none' }}
                ref={ref => {
                    this.contentElement = ref;
                }}>
                {this.props.tip}
                <div className="rm-tooltip-arrow"></div>
            </div>
        </div>);
        if (this.props.visible) {
            setTimeout(this.displayTooltip, 0);
        }
        else {
            this.hideTooltip();
        }
        return content;
    }
}