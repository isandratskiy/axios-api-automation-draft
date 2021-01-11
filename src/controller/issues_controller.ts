import {ApiClient} from "../lib/api_client";
import {Issue} from "../types/issue_type";
import {REPO_NAME} from "../constants";

const ISSUES_ENDPOINT = `repos/isandratskiy/${REPO_NAME}/issues`

export class IssuesController {
    private http: ApiClient;

    private constructor(client: ApiClient) {
        this.http = client
    }

    static controller(client: ApiClient): IssuesController {
        return new IssuesController(client)
    }

    async createIssue(issue: any): Promise<void> {
        await this.http.post(ISSUES_ENDPOINT).body(issue).send()
    }

    async getIssues(): Promise<Issue[]> {
        return this.http.get(ISSUES_ENDPOINT).send()
    }

    async getIssueWithTitle(title: string): Promise<Issue> {
        const issues: Issue[] = await this.getIssues()
        return issues.find(it => it.title = title)
    }

    async updateIssue(issue: any): Promise<void> {
        await this.http.patch(`${ISSUES_ENDPOINT}/${issue.number}`).body(issue).send()
    }
}
