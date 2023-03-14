export interface ITask {
  id: string;
  title: string;
}

export interface IDate {
  id: string;
  value: Date;
}

export interface IStatus {
  id: string;
  value: string;
}

export interface IEvent {
  id: string;
  taskId: string;
  dateId: string;
  statusId: string;
}
