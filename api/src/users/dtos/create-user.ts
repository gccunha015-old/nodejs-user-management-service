class CreateUserDto {
  constructor(
    public email: string,
    public password: string,
    options?: object
  ) {}
}

export { CreateUserDto }
