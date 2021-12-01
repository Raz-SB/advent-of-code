type GroupInfo = {
    groupAnswers: Array<string>
}
export const parseTestCases = (data: string): Array<GroupInfo> => {
    return data.split('\n\n').map(group => ({groupAnswers: group.split('\n')}));
}

export const answeredYes = (groupAnswers: Array<string>): Array<string> => {
    let answers: { [key: string]: number } = {};
    groupAnswers.forEach(ans => ans.split('').forEach(answer => {
        answers[answer] = (answers[answer] || 0) + 1;
    }))
    return Object.keys(answers);
}

export const everyoneAnsweredYes = (groupAnswers: Array<string>): Array<string> => {
    const questionsAnsweredYes = answeredYes(groupAnswers);
    return  questionsAnsweredYes.filter(question => groupAnswers.every(groupAnswer => groupAnswer.includes(question)));
}

