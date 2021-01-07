import {ApiClient} from "../../src/github/lib/api_client";
import * as fake from 'faker';
import {Issue} from "../../src/github/types/issue_type";

describe("Issues controller", () => {
    let http: ApiClient
    let issue
    let issueNumber

    beforeEach(async () => {
        issue = {
            title: fake.random.uuid()
        }

        http = ApiClient.api(`https://api.github.com/repos/isandratskiy`)
        await http.post('axios-api-automation-draft/issues').body(issue).send()
    })

    test('should return created issue', async () => {
        const issues: Issue[] = await http.get('axios-api-automation-draft/issues').send()
        const receivedIssue: Issue = issues.find(it => it.title = issue.title)
        issueNumber = receivedIssue.number
        expect(receivedIssue.title).toBe(issue.title)
    });

    test('should update issue', async () => {
        const issues: Issue[] = await http.get('axios-api-automation-draft/issues').send()
        const receivedIssue: Issue = issues.find(it => it.title = issue.title)
        issueNumber = receivedIssue.number
    });

    afterEach(async () => {
        await http.patch(`axios-api-automation-draft/issues/${issueNumber}`)
            .body({
                title: issue.title,
                number: issueNumber,
                state: 'closed'
            }).send()
    })
});
