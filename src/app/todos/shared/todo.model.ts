export class Todo {
  constructor(
    public userId: number,
    public id: number,
    public title: string,
    public completed: boolean
  ) {}

  static fromJson(data: any) {
    if (!data.id) {
      throw(new Error('Invalid argument: argument structure db not macth with model'));
    }
    return new Todo(data.userId, data.id, data.title, data.completed);
  }
}
