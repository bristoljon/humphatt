import filter from '../filter';

describe("company/config/selectors/filter", () => {

    const _items = [
        { id: "1", label: "one" },
        { id: "2", label: "two" },
        { id: "3", label: "three" },
        { id: "4", label: '<img src="http://css.com" />' },
        { id: "4", label: "'q'" },
    ];
    const makeInput = ({
        all = _items,
        filter = '',
    } = {}) => ({ all, filter });

    it("returns original list ('all' prop) if filter prop is empty string", () => {
        const result = filter(makeInput());
        expect(result).to.equal(_items);
    });

    it("returns empty array if filter has no matches", () => {
        const result = filter(makeInput({ filter: 'Not Gonna Match'}));
        expect(result.length).to.equal(0)
    });

    it("returns fuzzy matches", () => {
        let result = filter(makeInput({ filter: 'o'}));
        expect(result.length).to.equal(3);
        result = filter(makeInput({ filter: 'ee'}));
        expect(result.length).to.equal(1);
    });

    it("adds <b> tags to matching characters of item labels", () => {
        let result = filter(makeInput({ filter: 'ee'}));
        expect(result.length).to.equal(1);
        expect(result[0].label).to.equal('thr<b>e</b><b>e</b>');
    });

    it("should escape labels (XSS prevention)", () => {
        const results = filter(makeInput({  filter: 'img' }));
        expect(results[0].label).to.equal('&lt;<b>i</b><b>m</b><b>g</b> src=&quot;http://css.com&quot; /&gt;');
    });

    it("should be able to search special characters", () => {
        const results = filter(makeInput({  filter: "'" }));
        expect(results[0].label).to.equal('<b>&#39;</b>q&#39;');
    });
})