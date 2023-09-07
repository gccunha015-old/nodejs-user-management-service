export const receiveArgumentAndReturnIt = (argument: any) => argument;
export const receiveArgumentAndReturnItAsync = async (argument: any) =>
  receiveArgumentAndReturnIt(argument);
export const returnArray = () => [];
export const returnArrayAsync = async () => returnArray();
