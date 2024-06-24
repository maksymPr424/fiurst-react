const expenses = {
    "2023-01": {
        "01": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
};

function getFirstSunday(yearMonth) {
    const [year, month] = yearMonth.split('-').map(Number);
    const date = new Date(year, month - 1, 1); // month - 1 because JavaScript Date months are 0-based
    while (date.getDay() !== 0) { // 0 is Sunday
        date.setDate(date.getDate() + 1);
    }
    return date.getDate();
}

function calculateMedian(values) {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const middle = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
        return (values[middle - 1] + values[middle]) / 2;
    } else {
        return values[middle];
    }
}

function solution(expenses) {
    const result = {};
    for (const yearMonth in expenses) {
        const firstSunday = getFirstSunday(yearMonth);
        const allExpenses = [];
        for (const day in expenses[yearMonth]) {
            if (parseInt(day) <= firstSunday) {
                for (const category in expenses[yearMonth][day]) {
                    allExpenses.push(...expenses[yearMonth][day][category]);
                }
            }
        }
        result[yearMonth] = calculateMedian(allExpenses);
    }
    return result;
}

console.log(solution(expenses));
