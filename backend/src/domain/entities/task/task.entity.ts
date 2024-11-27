export class TaskEntity {
  id: string;
  projectId: string;
  name?: string;
  description?: string;
  status?: string;
  assignedUid?: string;
  createdBy?: string;

  constructor(taskData: Partial<TaskEntity>) {
    Object.assign(this, taskData);
  }
}
