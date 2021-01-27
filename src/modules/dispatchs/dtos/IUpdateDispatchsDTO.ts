interface IUpdateDispatchsDTO {
  id: string;

  name: string;

  code: string;

  description: string;

  deadline: string;

  send_message: boolean;

  model_message: string;

  send_email: boolean;

  model_email: string;
}

export default IUpdateDispatchsDTO;