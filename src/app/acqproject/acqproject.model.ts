export interface AcqProject {
  id: string;
  area: string;
  contract: string;
  vessel: string;
  contractor: string;
  start_date: Date;
  end_date: Date;
  mob_start_date: Date;
  mob_end_date: Date;
  volume: number;
  source_interval: number;
  sail_line_interval: number;
  streamer_length: number;
  receiver_interval: number;
  shot_point_interval: number;
  source_array: number;
  streamers: number;
  record_length: number;
  prime: number;
  infill_cap: number;
  prefix: string;
  direction: { x: number, y: number };
  streamer_profile: [string];
  planned_completion_days: number;
  creator: string;
}
