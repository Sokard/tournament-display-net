import { DependencyList, useEffect } from "react";
import axios from "axios";

export class CancelToken {
    canceled: boolean;
    promise: Promise<void>;
    // @ts-ignore
    resolve: () => void;

    constructor() {
        this.canceled = false;
        const self = this;
        this.promise = new Promise<void>((resolve, reject) => {
            self.resolve = resolve;
        });
    }

    cancel() {
        this.canceled = true;
        this.resolve();
    }

    getAxiosToken() {
        const axiosCancelTokenSource = axios.CancelToken.source();
        this.promise.then(() => axiosCancelTokenSource.cancel());

        return axiosCancelTokenSource.token;
    }
}

export default (create: (cancelToken: CancelToken) => void, deps?: DependencyList, cleanup?: () => void) =>
    useEffect(() => {
        const cancelToken = new CancelToken();
        create(cancelToken);

        return () => {
            cancelToken.cancel();

            if (cleanup) {
                cleanup();
            }
        };
    }, deps);
