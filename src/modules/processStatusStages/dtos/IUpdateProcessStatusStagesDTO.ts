interface IUpdateProcessStatusStageDTO {
  id: string;

  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  process_stage_id: string;
}

export default IUpdateProcessStatusStageDTO;
