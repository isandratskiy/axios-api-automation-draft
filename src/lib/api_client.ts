import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL, GITHUB_TOKEN} from "../constants";

export class ApiClient {
    private options: AxiosRequestConfig

    private constructor() {
        this.options = {
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`
            }
        }
    }

    static api(): ApiClient {
        return new ApiClient()
    }

    post(path?: string): ApiClient {
        this.options.url = path
        this.options.method = 'post'
        return this
    }

    get(path?: string): ApiClient {
        this.options.url = path
        this.options.method = 'get'
        this.options.data = undefined
        return this
    }

    delete(path: string): ApiClient {
        this.options.url = path
        this.options.method = 'delete'
        return this
    }

    patch(path?: string) {
        this.options.url = path
        this.options.method = 'patch'
        return this
    }

    body(body: any): ApiClient {
        this.options.data = body
        return this
    }

    async send(): Promise<any> {
        const response = await axios.request(this.options)
        return response.data
    }
}
