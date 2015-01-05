define('ace/mode/hhvm', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var HHVMHighlightRules = require("ace/mode/hhvm_highlight_rules").HHVMHighlightRules;

var Mode = function() {
    this.$tokenizer = new Tokenizer(new HHVMHighlightRules().getRules());
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/hhvm_highlight_rules', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var HHVMHighlightRules = function() {

    this.$rules = {
        start: [
            {
                token: "support.php_tag",
                regex: /<\?hh/
            },
            {
                token: "support.constant",
                regex: /(\/\/strict|\/\/partial|\/\/decl)/
            },
            {
                token: "keyword",
                regex: /(abstract|class|extends|implements|public|private|protected|return|int|string|new|as|case|break|enum)/
            },
            {
                token: "keyword",
                regex: /<[a-zA-Z0-9]*>/
            },
            {
                token: "variable",
                regex: /\$(\w)+|NULL|void/
            },
            {
                token: "support.function",
                regex: /(echo|function|require_once|json_encode|foreach|for|if|else|while)/
            },
            {
                token: "support.constant",
                regex: /[a-zA-Z_0-9]+(?=\()/
            },
            {
                token: "support.constant",
                regex: /(?!private\s)([A-Z]{1}[a-zA-Z]*)/
            },
            {
                token: "variable",
                regex: /(->[\w]+)/
            },
            {
                token: "string",
                regex: /\"(\\.|[^\"])*\"/
            },
            {
                token: "support.constant",
                regex: /(A-Z0-9)+/
            },
            {
                token: "comment",
                regex: /((\/\*)+[a-zA-Z\s\n\t]*(\*\/)+)+/
            },
            {
                token: "support.constant",
                regex: /[a-zA-Z0-9]+::[a-zA-Z]+/
            },
            {
                token: "support.constant",
                regex: /(Vector|Map|Set)/
            }
        ]
    };
    
    this.normalizeRules();
    
      
}

oop.inherits(HHVMHighlightRules, TextHighlightRules);

exports.HHVMHighlightRules = HHVMHighlightRules;
});