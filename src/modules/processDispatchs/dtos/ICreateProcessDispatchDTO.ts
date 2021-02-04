interface ICreateProcessDispatchDTO {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  publication: string;

  complement: string;

  annotation: string;

  process_id: string;

  dispatch_id: string;
}

export default ICreateProcessDispatchDTO;
