import { getUniqueValue, getRandomText } from "../../common/data/generator.data"

type IssueData = {
    name: string,
    comment: string,
}

function generateIssueData(): IssueData
{
    return {
        name: getUniqueValue('IssueName', 10),
        comment: getRandomText(200),
    }
}

export {
    IssueData,
    generateIssueData,
}