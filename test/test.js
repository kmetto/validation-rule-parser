require("babel-register");
const assert = require('chai').assert;
const RulesParser = require('../index');

describe("Validation rule parser", () => {
    it('empty string', () => {
        const rules = new RulesParser('');
        assert.deepEqual(rules.getCompiled(), {});
    });
    it('presence', () => {
        const rules = new RulesParser('presence');
        assert.deepEqual(rules.getCompiled(), { presence: true });
    });
    it('mail', () => {
        const rules = new RulesParser('mail');
        assert.deepEqual(rules.getCompiled(), { mail: true });
    });
    it('mail:true', () => {
        const rules = new RulesParser('mail:true');
        assert.deepEqual(rules.getCompiled(), { mail: true });
    });
    it('mail|precense', () => {
        const rules = new RulesParser('mail|presence');
        assert.deepEqual(rules.getCompiled(), { mail: true, presence: true });
    });
    it('length:1', () => {
        const rules = new RulesParser('length:1');
        assert.deepEqual(rules.getCompiled(), { length: 1 });
    });
    it('length:minimum=1', () => {
        const rules = new RulesParser('length:minimum=1');
        assert.deepEqual(rules.getCompiled(), { length: { minimum: 1 } });
    });
    it('length:minimum=1;maximum=10', () => {
        const rules = new RulesParser('length:minimum=1;maximum=10');
        assert.deepEqual(rules.getCompiled(), { length: { minimum: 1, maximum: 10 } });
    });
    it('format:[a-z0-9]+', () => {
        const rules = new RulesParser('format:[a-z0-9]+');
        assert.deepEqual(rules.getCompiled(), { format: '[a-z0-9]+' });
    });
    it('format:[a-z0-9]+|length:minimum=1;maximum=10|mail', () => {
        const rules = new RulesParser('format:[a-z0-9]+|length:minimum=1;maximum=10|mail');
        assert.deepEqual(rules.getCompiled(), { format: '[a-z0-9]+', length: { minimum: 1, maximum: 10 }, mail: true });
    });
});