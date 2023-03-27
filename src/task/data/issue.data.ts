import { getUniqueValue, getRandomText } from "../../common/data/generator.data"

type IssueData = {
    name: string,
    comment: string,
}

const issueData: IssueData = {
    name: getUniqueValue('IssueName', 10),
    comment: getRandomText(200),
}

export {
    issueData,
    IssueData,
}