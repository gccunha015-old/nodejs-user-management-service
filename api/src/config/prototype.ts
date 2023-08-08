// Required to stringfy BigInt values
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
