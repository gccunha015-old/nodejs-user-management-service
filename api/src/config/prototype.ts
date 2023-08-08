// Required to stringfy BigInt values
/* eslint-disable-next-line
@typescript-eslint/no-extra-semi,
@typescript-eslint/no-explicit-any
*/
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
