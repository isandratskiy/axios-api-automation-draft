import axios, {AxiosRequestConfig} from "axios";

export class ApiClient {
    private options: AxiosRequestConfig

    private constructor(baseURL: string) {
        this.options = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GH_API_TOKEN}`
            }
        }
    }

    public static api(baseURL: string): ApiClient {
        return new ApiClient(baseURL)
    }

    public post(path: string): ApiClient {
        this.options.url = path
        this.options.method = 'post'
        return this
    }

    public get(path?: string): ApiClient {
        this.options.url = path
        this.options.method = 'get'
        this.options.data = undefined
        return this
    }

    public delete(path: string): ApiClient {
        this.options.url = path
        this.options.method = 'delete'
        return this
    }

    patch(path: string) {
        this.options.url = path
        this.options.method = 'patch'
        return this
    }

    public body(body: any): ApiClient {
        this.options.data = body
        return this
    }

    public async send(): Promise<any> {
        const response = await axios.request(this.options)
        return response.data
    }
}
