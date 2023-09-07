const _receiveArgumentAndReturnIt = (argument: any) => argument;
export const receiveArgumentAndReturnIt = jest
  .fn()
  .mockImplementation(_receiveArgumentAndReturnIt);
export const receiveArgumentAndReturnItAsync = jest
  .fn()
  .mockImplementation(async (argument: any) =>
    _receiveArgumentAndReturnIt(argument)
  );
const _returnArray = () => [];
export const returnArray = jest.fn().mockImplementation(_returnArray);
export const returnArrayAsync = jest
  .fn()
  .mockImplementation(async () => _returnArray());
