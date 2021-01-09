import {ApiClient} from "../../src/github/lib/api_client";
import * as fake from 'faker';
import {Issue} from "../../src/github/types/issue_type";
import {IssuesController} from "../../src/github/controller/issues_controller";
import {BASE_URL} from "../../src/github/constants";

describe("Issues controller", () => {
    let controller: IssuesController
    let issue: any
    let issueNumber: number

    beforeEach(async () => {
        issue = {
            title: fake.random.uuid()
        }

        let client = ApiClient.api(`${BASE_URL}/repos/isandratskiy`)
        controller = IssuesController.controller(client)
        await controller.createIssue(issue)
    })

    test('should return created issue', async () => {
        const receivedIssue: Issue = await controller.getIssueWithTitle(issue.title)
        issueNumber = receivedIssue.number
        expect(receivedIssue.title).toBe(issue.title)
    });

    test('should update issue', async () => {
        const receivedIssue: Issue = await controller.getIssueWithTitle(issue.title)
        issueNumber = receivedIssue.number
    });

    afterEach(async () => {
        await controller.updateIssue({
            number: issueNumber,
            state: 'closed'
        })
    })
});
