import moment from 'moment';

export const userData = {
    2: {
        name: "Dennis",
        sheetScope: "C"
    },
    6: {
        name: "Daniel",
        sheetScope: "G"
    },
    10: {
        name: "Moritz",
        sheetScope: "K"
    },
};

export let getNames = () => {
    return Object.values(userData).map(user => user.name);
}

export let getCell = (user) => {
    let scope;
    Object.values(userData).map(id => {
        if (id.name === user) {
            scope = id.sheetScope;
        } return null;
    })
    return scope;
}
export let workoutName = ["Squat", "Deadlift", "Press", "BenchPress", "ChinUp", "Bent-Over Barbell Row"];
let dateTable = { "Squat": [], "Deadlift": [], "Press": [], "BenchPress": [], "ChinUp": [], "Bent-Over Barbell Row": [] };
let dataSheets = {}


export const getDateTable = (workoutName) => {
    return dateTable[workoutName];
}
export const getCellIndex = (workout, date) => {
    let index;
    // date = date.substr(0,date.indexOf(' ')); 
    dateTable[workout].filter((cell, i) => {
        if (cell === date) {
            index = i + 3;
        } return null
    });
    return index;
}
export const fillOfflineSheet = (dataSet, tableName) => {
    if (tableName !== "") {
        let currentDate = "";
        dataSet.slice(2).map((row, i) => {
            row.map((cell, j) => {
                if (cell !== "") {
                    switch (j) {
                        case 0:
                            if (!Object.keys(dataSheets).includes(cell)) {
                                let workoutObject = {};
                                for (let i = 0; i < workoutName.length; i++) {
                                    workoutObject = Object.assign({ [workoutName[i]]: {} }, workoutObject);
                                }
                                dataSheets[cell] = { ...workoutObject };
                            }
                            currentDate = cell;
                            break;
                        case 2:
                        case 6:
                        case 10:
                            dataSheets[currentDate][tableName] = Object.assign({ [userData[j].name]: { "weight": parseFloat(cell) } }, dataSheets[currentDate][tableName]);
                            break;
                        default:
                            return null
                    }
                }
                return null;
            }
            );
            return null;
        })
        fillWorkoutDates(tableName);
    }
    return null;
}

const fillWorkoutDates = (workoutName) => {
    let today = moment();
    dateTable[workoutName] = [];
    Object.values(dataSheets).map((tupel, i) => {
        if (Object.keys(tupel[workoutName]).length > 0) {
            dateTable[workoutName].push(Object.keys(dataSheets)[i]);
            return null;
        }
        return null;
    })
    dateTable[workoutName].sort(function (a, b) {
        let first = moment(a, 'DD.MM.YY');
        let second = moment(b, 'DD.MM.YY');
        let diff = moment.duration(first.diff(second));
        return diff.asDays();
    });
    let lastEntry = moment(dateTable[workoutName][dateTable[workoutName].length - 1], 'DD.MM.YY');
    let differ = moment.duration(today.diff(lastEntry)).asDays();
    if (differ >= 1) {  // >= 1 because hours are irrelevant 
        dateTable[workoutName].push(`${today.format('DD.MM.YY')} (today)`);
    } else {
        dateTable[workoutName].pop();
        dateTable[workoutName].push(`${today.format('DD.MM.YY')} (today)`);
    }
}

export const fillData = (username) => {
    data = [];
    Object.keys(dataSheets).map(date => {
        data.push({
            "time": date,
        });
        return null;
    });
    Object.values(dataSheets).map((workout, i) => {
        Object.keys(workout).map(entry => {
            try {
                Object.values(dataSheets[data[i].time][entry][username]).map(weight => {
                    data[i] = Object.assign({ [entry]: weight }, data[i]);
                    return null;
                });
            } catch (e) {
            }
            return null;
        });
        return null;
    });

    var sortable = [];
    for (var date in data) {
        sortable.push([date, data[date]]);
    }

    sortable.sort(function (a, b) {
        let first = moment(a[1].time, 'DD.MM.YY');
        let second = moment(b[1].time, 'DD.MM.YY');
        let test = moment.duration(first.diff(second));
        let testDays = test.asDays();
        return testDays;
    });
    data = [];
    sortable.map((entry, i) => { return entry.slice(1).map(cell => data[i] = Object.assign(cell, data[i])) });
    return null;
}

export const fillVersusData = (props) => {
    versusData = [];
    Object.keys(dataSheets).map(date => {
        versusData.push({
            "time": date,
        });
        return null;
    });
    Object.values(dataSheets).map((workout, i) => {
        Object.keys(workout).map(entry => {
            try {
                if (props.username !== props.versusname) {
                    Object.values(dataSheets[versusData[i].time][entry][props.username]).map(weight => {
                        if (props.versusworkout.includes(entry)) {
                            let entryName = `Your ${entry}`;
                            versusData[i] = Object.assign({ [entryName]: weight }, versusData[i]);
                            return null;
                        }
                        return null;
                    });
                    Object.values(dataSheets[versusData[i].time][entry][props.versusname]).map(weight => {
                        if (props.versusworkout.includes(entry)) {
                            let entryName = `${props.versusname}'s ${entry}`;
                            versusData[i] = Object.assign({ [entryName]: weight }, versusData[i]);
                            return null;
                        }
                        return null;
                    });
                } else {
                    Object.values(dataSheets[versusData[i].time][entry][props.username]).map(weight => {
                        versusData[i] = Object.assign({ [entry]: weight }, versusData[i]);
                        return null;
                    });
                }
            } catch (e) {
            }
            return null;
        });
        return null;
    });

    var sortable = [];
    for (var date in versusData) {
        sortable.push([date, versusData[date]]);
    }

    sortable.sort(function (a, b) {
        let first = moment(a[1].time, 'DD.MM.YY');
        let second = moment(b[1].time, 'DD.MM.YY');
        let diff = moment.duration(first.diff(second));
        return diff.asDays();
    });
    versusData = [];
    sortable.map((entry, i) => { return entry.slice(1).map(cell => versusData[i] = Object.assign(cell, versusData[i])) });
    return versusData;
}


export let versusData = [];
export let data = [];

export let workoutData = {
}