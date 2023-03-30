import { parentPort } from "worker_threads";

parentPort?.on("message", (data) => {
  console.log(data);
  parentPort?.postMessage(`${data}`); //
});

export default parentPort;
