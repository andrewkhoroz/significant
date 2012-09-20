// named function expression
var examples={
    hoisting:function(){
        var add = function add(a, b) {
            return a + b;
        };
        //console.log(add(1,2));
        //console.log(add1(1,2));
        //console.log(add2(1,2));

        // antipattern
        // for illustration only
        // global functions
        function foo() {
            alert('global foo');
        }
        function bar() {
            alert('global bar');
        }
        function hoistMe() {
            console.log(typeof foo); // "function"
            console.log(typeof bar); // "undefined"
            foo(); // "local foo"
            bar(); // TypeError: bar is not a function
            // function declaration:
            // variable 'foo' and its implementation both get hoisted
            function foo() {
                alert('local foo');
            }
            // function expression:
            // only variable 'bar' gets hoisted
            // not the implementation
            var bar = function () {
                alert('local bar');
            };
        }
        hoistMe();
    },
    callbacks:function(){
        // refactored findNodes() to accept a callback
        var findNodes = function (callback) {
            var i = 100000,
            nodes = [],
            found;
            // check if callback is callable
            if (typeof callback !== "function") {
                callback = false;
            }
            while (i) {
                i -= 1;
                // complex logic here...
                // now callback:
                if (callback) {
                    callback(found);
                }
                nodes.push(found);
            }
            return nodes;
        };
        // a callback function
        var hide = function (node) {
            node.style.display = "none";
        };
        // find the nodes and hide them as you go
        findNodes(hide); 
    },
    returningFunctions:function(){
        var setup = function () {
            var count = 0;
            return function () {
                return (count += 1);
            };
        };
        // usage
        var next = setup();
        next(); // returns 1
        next(); // 2
        next(); // 3
    }
    ,
    selfDefiningFunctions:function(){
        var scareMe = function () {
            alert("Boo!");
            scareMe = function () {
                alert("Double boo!");
            };
        };
        // using the self-defining function
        scareMe(); // Boo!
        scareMe(); // Double boo!
        scareMe(); // Double boo!
    }
    ,
    immediateFunctions:function(){
        (function (global) {
            alert('watch out!');
            console.log(global);
        }(this));
    }
    ,
    returnedValuesFromImmediateFunctions:function(){
        var o = {
            message: (function () {
                var who = "me",
                what = "call";
                return what + " " + who;
            }()),
            getMsg: function () {
                return this.message;
            }
        };
        // usage
        o.getMsg(); // "call me"
        o.message; // "call me"
    }
    ,
    prototypesAndPrivacy:function(){
        function Gadget() {
            // private member
            var name = 'iPod';
            // public function
            this.getName = function () {
                return name;
            };
        }
        Gadget.prototype = (function () {
            // private member
            var browser = "Mobile Webkit";
            // public prototype members
            return {
                getBrowser: function () {
                    return browser;
                }
            };
        }());
        var toy = new Gadget();
        console.log(toy.getName()); // privileged "own" method
        console.log(toy.getBrowser()); // privileged prototype method
    }
    ,
    empty:function(){
    }
}
examples.prototypesAndPrivacy();