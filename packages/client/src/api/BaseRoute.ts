import { AxiosInstance } from 'axios';

export abstract class BaseRoute {
    protected readonly axios: AxiosInstance;
    protected readonly route: string;

    constructor(axios: AxiosInstance, route: string) {
        this.axios = axios;
        this.route = route;
    }

    protected getEndpoint(endpoint: string) {
        return `${this.route}/${endpoint}`;
    }
}