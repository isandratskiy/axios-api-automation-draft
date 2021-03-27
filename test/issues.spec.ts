import {ApiClient} from '../src/lib/api_client'
import * as fake from 'faker'
import {Issue} from '../src/types/issue_type'
import {IssuesController} from '../src/controller/issues_controller'

describe('Issues controller', () => {
	let controller: IssuesController
	let issue: any
	let issueNumber: number

	beforeEach(async () => {
		issue = {
			title: fake.random.uuid(),
		}

		let client = ApiClient.api()
		controller = IssuesController.controller(client)
		await controller.createIssue(issue)
	})

	test('should return created issue', async () => {
		const receivedIssue: Issue = await controller.getIssueWithTitle(issue.title)
		issueNumber = receivedIssue.number
		expect(receivedIssue.title).toBe(issue.title)
	})

	test('should update issue', async () => {
		const receivedIssue: Issue = await controller.getIssueWithTitle(issue.title)
		issueNumber = receivedIssue.number
	})

	afterEach(async () => {
		await controller.updateIssue({
			number: issueNumber,
			state: 'closed',
		})
	})
})
