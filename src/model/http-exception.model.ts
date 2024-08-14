class HttpException extends Error {
  errorCode: number;
  constructor(
    errorCode: number,
    public override readonly message: string | any,
  ) {
    super(message);
    this.errorCode = errorCode;
  }
}

export default HttpException;