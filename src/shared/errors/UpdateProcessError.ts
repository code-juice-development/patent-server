class UpdateProcessError {
  public readonly statusCode: number;

  public readonly message: string;

  /**
   * @todo Insert relevant information for Update Process
   * @param message Message do display on response
   * @param statusCode Status Code to display on response
   */
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default UpdateProcessError;
