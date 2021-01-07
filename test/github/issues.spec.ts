import {ApiClient} from "../../src/github/lib/api_client";
import * as fake from 'faker';
import {Issue} from "../../src/github/types/issue_type";

describe("Issues controller", () => {
    let http: ApiClient
    let issue
    let issueNumber

    beforeEach(async () => {
        issue = {
            owner: fake.name.firstName(),
            title: fake.random.alphaNumeric(10)
        }

        http = ApiClient.api(`https://api.github.com/repos/isandratskiy`)
        await http.post('api-automation-draft/issues').body(issue).send()
    })

    test('should return created issue', async () => {
        const issues: Issue[] = await http.get('api-automation-draft/issues').send()
        const receivedIssue: Issue = issues.find(it => it.title = issue.title)
        issueNumber = receivedIssue.number
        expect(receivedIssue.title).toBe(issue.title)
    });

    test('should update issue', async () => {

    });

    afterEach(async () => {
        await http.patch(`api-automation-draft/issues/${issueNumber}`)
            .body({
                owner: issue.owner,
                title: issue.title,
                number: issueNumber,
                state: 'closed'
            }).send()
    })
});
