import {ApiClient} from "../lib/api_client";
import {Issue} from "../types/issue_type";

export class IssuesController {
    private http: ApiClient;

    constructor(client: ApiClient) {
        this.http = client
    }

    async createIssue(issue: any): Promise<void> {
        await this.http.post('axios-api-automation-draft/issues').body(issue).send()
    }

    async getIssues(): Promise<Issue[]> {
        return this.http.get('axios-api-automation-draft/issues').send()
    }

    async getIssueWithTitle(title: string): Promise<Issue> {
        const issues: Issue[] = await this.getIssues()
        return issues.find(it => it.title = title)
    }

    async updateIssue(issue: any): Promise<void> {
        await this.http.patch(`axios-api-automation-draft/issues/${issue.number}`).body(issue).send()
    }


}
