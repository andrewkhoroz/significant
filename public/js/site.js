window.APP_Significant=(function(){//init function
    var APP_Significant = APP_Significant || {};
    APP_Significant.constants = (function () {
        var consts = {},
        ownProp = Object.prototype.hasOwnProperty,
        allowed = {
            string: 1,
            number: 1,
            'boolean': 1
        },
        prefix = (Math.random() + "_").slice(2);
        return {
            set: function (name, value) {
                if (this.isDefined(name)) {
                    return false;
                }
                if (!ownProp.call(allowed, typeof value)) {
                    return false;
                }
                consts[prefix + name] = value;
                return true;
            },
            isDefined: function (name) {
                return ownProp.call(consts, prefix + name);
            },
            get: function (name) {
                if (this.isDefined(name)) {
                    return consts[prefix + name];
                }
                return null;
            },
            getsAll:function(){
                return consts; 
            }
        };
    }());
    return APP_Significant;
})();
//place to set constants