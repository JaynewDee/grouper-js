import { parentPort } from "worker_threads";

parentPort?.on("message", (data) => {
  parentPort?.postMessage(`${data}`); //
});

export default parentPort;
