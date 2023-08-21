import { PriorityQueue } from './PriorityQueue';

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {
  pq: PriorityQueue<() => Promise<any>> = new PriorityQueue();

  postTask(task: () => Promise<any>, priority: number): void {
    this.pq.enqueue(task, priority);
  }

  async run(): Promise<void> {
    while (this.pq.size()) {
      const task = this.pq.dequeue();
      task();
    }
  }
}
