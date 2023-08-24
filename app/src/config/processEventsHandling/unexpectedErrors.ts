export function setUpUnexpectedErrorsHandling() {
  process.on("uncaughtException", (error, origin) => {
    console.log(`uncaughtException:\n Error: ${error}\n Origin: ${origin}`);
  });
  process.on("unhandledRejection", (reason) => {
    console.log(`unhandledRejection:\n  Reason: ${reason}`);
  });
}
