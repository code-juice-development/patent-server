interface ICreateProcessDispatchDTO {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  dispatch_id: string;
}

export default ICreateProcessDispatchDTO;