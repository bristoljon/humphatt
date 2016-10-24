import { createSelector } from 'reselect';
import fuzzy from 'fuzzy';
import escapeHtml from 'escape-html';

const itemsSelector = type => type.all;
const filterSelector = type => type.filter;
const MATCH_START = 'E59E90010F97';
const MATCH_END = 'CF663CF0C9C2';

const fuzzySelector = createSelector(
    itemsSelector,
    filterSelector,
    (items, value) => {
        return fuzzy.filter(value, items, {
            pre: MATCH_START,
            post: MATCH_END,
            extract: item => item.label,
        });
    }
);

const escape = items => {
    return items.map(item => {
        return {
            ...item.original,
            label: escapeHtml(item.string)
                .replace(new RegExp(MATCH_START, 'g'), '<b>')
                .replace(new RegExp(MATCH_END, 'g'), '</b>'),
        };
    });
};

const filter = createSelector(
    fuzzySelector,
    escape,
);

export default function (arg) {
    if (arg.filter !== '') return filter(arg);
    return arg.all;
}
