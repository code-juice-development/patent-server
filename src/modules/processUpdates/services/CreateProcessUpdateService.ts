import Jobs from '@modules/processUpdates/infra/bull';

interface IRequest {
  path: string;
}

class CreateProcessUpdateService {
  public async execute({ path }: IRequest): Promise<void> {
    const { CreateProcessUpdateJob } = Jobs;

    await CreateProcessUpdateJob.add({
      path,
    });
  }
}

export default CreateProcessUpdateService;
