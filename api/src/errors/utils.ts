/* Beginning of Source:
  https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
*/
function toErrorWithMessage(maybeError: unknown): Error {
  // [gccunha015] changed to return if it's already an Error
  if (maybeError instanceof Error) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}
/* End of source:
  https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
*/

export { toErrorWithMessage }
