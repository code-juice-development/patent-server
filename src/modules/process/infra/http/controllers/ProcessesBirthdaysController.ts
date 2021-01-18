import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProcessesBirthdaysService from '@modules/process/services/ListProcessesBirthdaysService';

class ProcessesBirthdaysController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProcessesBirthdaysService = container.resolve(
      ListProcessesBirthdaysService,
    );

    const processes = await listProcessesBirthdaysService.execute();

    return response.json(processes);
  }
}

export default ProcessesBirthdaysController;
