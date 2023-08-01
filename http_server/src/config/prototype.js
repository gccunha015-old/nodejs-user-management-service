// Required to stringfy BigInt values
BigInt.prototype.toJSON = function() { return this.toString() }