interface IUpdateProcessDispatchDTO {
  id: string;

  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  publication: string;

  process_id: string;

  dispatch_id: string;
}

export default IUpdateProcessDispatchDTO;
