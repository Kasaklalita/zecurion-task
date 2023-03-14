export interface Task {
  id: number;
  title: string;
}

export interface DateType {
  id: number;
  value: Date;
}

export interface Status {
  id: number;
  value: string;
}

export interface Event {
  id: number;
  taskId: number;
  dateId: number;
  statusId: number;
}
