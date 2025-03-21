export interface BaseTimeEntry {
  id: string;
  project: string;
  description: string;
  notes?: string;
}

export interface DayTimeEntry extends BaseTimeEntry {
  time: string;
}

export interface WeekTimeEntry extends BaseTimeEntry {
  times: { [key: string]: string };
  total: string;
}

export type ViewMode = 'day' | 'week';

export interface TimeEntryFormData {
  project: string;
  task: string;
  notes: string;
  time: string;
}