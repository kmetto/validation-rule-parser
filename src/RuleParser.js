class RulesParser {
    /**
     * 
     * @param {string} rulesStr 
     */
    constructor(rulesStr) {
        this.rules = [];
        this.rulesStr = rulesStr;
        this.compiledRules = {};
        this.compileRules();
    }

    compileRules() {
        if(this.rulesStr.length === 0){
            return;
        }
        const rawRules = this.rulesStr.split('|');
        if (rawRules.length > 0) {
            this.parseRules(rawRules);
        }
    }

    /**
     * 
     * @param {array} rawRules 
     */
    parseRules(rawRules) {
        rawRules.forEach((rowRule) => {
            let rule;
            let rawParams;

            [rule, ...rawParams] = rowRule.split(":");

            if (!rawParams.length) {
                this.compiledRules[this.normalize(rule)] = true;
                return;
            }

            this.parseParams(this.normalize(rule), rawParams);

        });
    }

    /**
     * 
     * @param {string} rawParams 
     */
    parseParams(rule, rawParams) {
        rawParams.forEach(rawParam => {
            if (rule === 'format') {
                this.compiledRules[rule] = rawParam;
            } else if (rawParam.indexOf(';') === -1) {
                const parsedParamsValues = this.parseParamValues(rule, rawParam);
                if (typeof parsedParamsValues === 'object') {
                    let name;
                    let value;
                    ({ name, value } = parsedParamsValues);
                    this.compiledRules[rule] = {
                        [name]: value
                    };
                } else {
                    this.compiledRules[rule] = parsedParamsValues;
                };
            } else {
                let parsedParamsValues = {};
                let name;
                let value;

                rawParam.split(';').forEach((rawParamValue) => {
                    ({ name, value } = this.parseParamValues(rule, rawParamValue));
                    parsedParamsValues[name] = value;
                });

                this.compiledRules[rule] = parsedParamsValues;
            }
        });
    }

    parseParamValues(rule, rawParam) {
        if (rawParam.indexOf('=') === -1) {
            return this.normalize(rawParam);
        } else {
            let param = {};
            let name;
            let value;

            [name, value] = rawParam.split('=');
            name = this.normalize(name);
            value = this.normalize(value);
            param.name = name;
            param.value = value;
            return param;
        }
    }

    parseFormatValues(rawParam) {
        if (rawParam.indexOf('=') === -1) {
            return this.normalize(rawParam);
        }
    }

    /**
     * 
     * @param {string} str 
     */
    normalize(str) {
        if (isFinite(str)) {
            return parseFloat(str);
        } else if (str === 'true' || str === 'false') {
            return str === 'true';
        } else if (typeof str === 'string') {
            return str.replace(/^\s+|\s+$/g, '');
        }


    }

    getCompiled() {
        return this.compiledRules;
    }
}

module.exports = RulesParser;