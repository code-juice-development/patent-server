interface ICreateDispatchsDTO {
  name: string;

  code: string;

  description: string;

  deadline: number | null;

  send_message: boolean;

  model_message: string;

  send_email: boolean;

  model_email: string;

  after_sale: number | null;
}

export default ICreateDispatchsDTO;
