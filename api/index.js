const cluster = require('cluster');
const app = require('./src/worker/server');
const logger = require('./src/common/logger');
const batch = require('./src/worker/batch');
const { WORKER_MAX, PORT } = require('./src/config/constants');

const HTTP_WORKER_INDEX = 0;
const BATCH_WORKER_INDEX = 1;

global.__basedir = __dirname;

// const Excel = require('./src/model/excel');
// const exportOT = require('./src/model/export/overtime.export');
// const excel = new Excel('./src/template/overtime_template.xlsx');
// exportOT.run(excel, '2022-10-01', '2022-10-30')
// .then(() => excel.save('./test.xlsx'))


if (cluster.isMaster) {
    let workerList = [0, 0];
    for (let i = 0; i < WORKER_MAX; i++) {
        const workerRunEnv = {};
        workerRunEnv['WORKER_INDEX'] = i;
        const worker = cluster.fork(workerRunEnv);
        workerList[i] = worker.id;
        logger.info(`[Server] fork success id: ${worker.id} - process: ${worker.process.pid}`);
    }

    cluster.on('exist', (worker) => {
        const id = worker.id;
        logger.info(`[Server] worker id=${id} was died`);
        for (let i = 0; i < WORKER_MAX; i++) {
            if (workerList[i] == id) {
                logger.info(`[Server] find died-worker success id: ${worker.id} - process: ${worker.process.pid}`);
                const workerRun = {
                    workerIndex: i,
                }
                const worker = cluster.fork(workerRun);
                workerList[i] = worker.id;
                logger.info(`[Server] re-fork success id: ${worker.id} - process: ${worker.process.pid}`);
            }
        }
    })
} else {
    const workerIndex = process.env.WORKER_INDEX
    if (workerIndex == HTTP_WORKER_INDEX) {
        logger.info(`[Server] Start http server`);
        app.run();
    } else if (workerIndex == BATCH_WORKER_INDEX) {
        logger.info(`[Server] Cron batch is running`);
        batch.run();
    }
}