import { Worker } from "worker_threads";
import * as url from "url";
import { Deque } from "../../lib/models.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

type JobData = any;

export class BalancerPool {
  size: number;
  workers: Deque<Worker>;
  jobQueue: Deque<any>;
  script: string;
  static instances: number = 0;

  constructor(size: number) {
    this.script = `${__dirname}/worker.js`;
    this.size = size;
    this.workers = new Deque();
    this.jobQueue = new Deque();
  }

  private makeOne = () => {
    const worker = new Worker(this.script);
    const handleMessage = (msg: any) => {
      console.dir(msg);
      console.log(`Received data message: ${msg}`);
    };
    worker.on("message", handleMessage);
    worker.on("message", handleMessage);
    const handleError = (err: Error) => {
      console.log(`Worker error: ${err}`);
    };
    worker.on("error", handleError);
    worker.on("exit", () => {
      this.workers.pushBack(worker);
    });
    return worker;
  };

  private fill() {
    [...Array(this.size)].forEach((_) => {
      this.workers.pushBack(this.makeOne());
    });
  }

  private initialize() {
    if (BalancerPool.instances > 0)
      return new Error(`BalancerPool is enforced as a singleton.`);

    this.fill();

    BalancerPool.instances++;
  }

  queueJob(data: JobData) {
    this.jobQueue.pushBack(data);
  }

  executeJob(jobData: JobData) {
    if (BalancerPool.instances === 0) {
      this.initialize();
    }
    // If free workers,
    if (!this.workers.isEmpty()) {
      const worker = this.workers.popFront() as Worker;
      console.log(this.workers.size());
      // If no jobs waiting
      if (this.jobQueue.isEmpty()) {
        // console.log("Job Queue Empty");
        worker.postMessage(jobData);
      } else {
        console.log("Getting Job from Queue");
        worker.postMessage(this.jobQueue.popFront());
      }
    } else {
      // Handle case of no workers available
      this.queueJob(jobData);
      console.log("No workers available");
    }
  }

  reset() {
    BalancerPool.instances--;
    this.initialize();
  }
}

export const workerPool = new BalancerPool(4);
