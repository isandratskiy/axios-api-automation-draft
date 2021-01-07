import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

export class AxiosClient {
    private options: AxiosRequestConfig
    private token: string
    private headers: any

    constructor() {
        this.options = {
            baseURL: 'http://localhost:80/',
            method: 'GET'
        }
    }

    public post(path: string): AxiosClient {
        this.setHeaders()
        this.options.url = path
        this.options.method = 'POST'
        return this
    }

    public get(path: string): AxiosClient {
        this.setHeaders()
        this.options.data = undefined
        this.options.url = path
        this.options.method = 'GET'
        return this
    }

    public body(body: any): AxiosClient {
        this.options.data = body
        return this
    }

    public async send(): Promise<any> {
        const response = await axios.request(this.options)
        const cookies = response.headers['set-cookie']

        if (!this.headers)
            this.headers = {
                'content-type': 'application/json',
                'set-cookie': cookies
            }

        return response.data
    }

    private setHeaders(): AxiosClient {
        this.options.headers = this.headers || {
            'content-type': 'application/json'
        }
        return this
    }

    private getToken(response: AxiosResponse): string {
        const tokenRow = response.headers['set-cookie'].find((h: string) => h.startsWith('logged_in'))
        if (tokenRow) {
            const [leftPart] = tokenRow.split(';');
            this.token = leftPart.substr('logged_in='.length);
        }
        return this.token
    }
}
