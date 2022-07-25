/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { agent as request } from "supertest";
import io = require("socket.io-client");
import { BoweryAutomation } from "../types/boweryAutomation.type";

export default {
    /**
     * Login by api
     * @returns response from `/user/login` endpoint
     */
    _loginApi: async function(_envUrl: string, _username: string, _password: string) {
        const response = await request(_envUrl)
            .post('/user/login')
            .send({
                username:_username,
                password:_password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        return response;
    },

    /**
     * Creates report with api. Uses websockets in order to be able to wait uncertain amount of time
     * (with http - it could fail due to response timeout).
     *
     * The flow is next:
     * Connect to remote server
     * -> create promise, which we will wait to resolved
     * In this promise we do next:
     *  -> wait on `connect` event
     *  -> when `connect` is emitted - wait on `init` event 
     * (we need to wait synchronously, exactly after `connect` event)
     *  -> when `init` is emitted - resolving callback with data from `init` event
     *  -> resolving promise with `resolve` fn and socketId param
     *
     * We "await" until our promise will be resolved with `socketId` value.
     * Then we wait with promise once more until event `report:created` will be emitted.
     *
     * Since we wrap this event into promise, the data which will be resolved there
     * will be our report with necessary props (reportId and reportNumber)
     */
    _createReportApi: async (_reportCreationData: BoweryAutomation.ReportCreationData,
        _payload, _token: string, _envUrl: string): Promise<string> => {
        let reportId = "not report id";
        const socket = io.connect(_envUrl);
        const _connect = new Promise((res, rej) =>
            /*
             * ernst: we have to chain sockets in order to have synchronous order of execution,
             * without it - we will not be able to wait until socket id will be generated and resolved by promise
             */
            socket.on('connect', () => console.log('Socket opened')).on('init', async socketId => {

                console.log(socketId);

                try {
                    await request(_envUrl)
                        .post('/report')
                        .set('Accept', 'application/json')
                        .send(_payload)
                        .set('Authorization', `Bearer ${_token}`)
                        .set('SocketId', `${socketId}`)
                        .expect(200);

                    res(socketId);
                } catch (error) {
                    console.log(error);
                    rej(error);
                }
            })
        );

        console.log("socketId is " + await _connect);

        const subscription = new Promise((res, rej) =>
            socket.on('report:created', (data) => {
                if (!data || data.report_number !== _payload.reportNumber) {
                    rej(new Error('Report was not found!'));
                } else {
                    res(data);
                }
            })
        );

        const report = await subscription;

        // @ts-ignore
        console.log("Report id: "+ report._id);
        // @ts-ignore
        console.log("Report number: "+ report.report_number);

        // @ts-ignore
        reportId = report._id;

        return reportId;

    }
};