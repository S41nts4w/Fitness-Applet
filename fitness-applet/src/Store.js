import moment from 'moment';
import { WriteSingleCell } from './SheetWriter';
import _ from 'lodash';

const sheetUserJump = 4;
export const userData = {
};

export const apiKey = {
    "key": process.env.KEY,
    "SheetID": process.env.SHEET_ID,
    "Client-ID": process.env.CLIENT_ID
}
export let changeFlag = true;                          // Debugging without fetching data from the server
export let getNames = () => {
    return Object.values(userData).map(user => user.name);
}
let timeStamp;

export let getCell = (user) => {
    let scope;
    Object.values(userData).map(id => {
        if (id.name === user) {
            scope = id.sheetScope;
        } return null;
    })
    return scope;
}
export let workoutName = ["Squat", "BenchPress", "Bent-Over Barbell Row", "Deadlift", "Press", "PowerClean"];
let dateTable = { "Squat": [], "Deadlift": [], "Press": [], "BenchPress": [], "Bent-Over Barbell Row": [], "PowerClean": [], };
let dataSheets = {}


export const getDateTable = (workoutName) => {
    return dateTable[workoutName];
}
export const getCellIndex = (workout, date) => {
    let index;
    dateTable[workout].filter((cell, i) => {
        if (cell === date) {
            index = i + 3;
        } return null
    });
    return index;
}
export const fillOfflineSheet = (dataSet, tableName) => {
    if (tableName !== "UserRegister" && tableName !== "changedFlag") {
        let currentDate = "";
        dataSet.slice(2).map((row, i) => {
            row.map((cell, j) => {
                if (cell !== "") {
                    if (j === 0) {
                        if (!Object.keys(dataSheets).includes(cell)) {
                            let workoutObject = {};
                            for (let i = 0; i < workoutName.length; i++) {
                                workoutObject = Object.assign({ [workoutName[i]]: {} }, workoutObject);
                            }
                            dataSheets[cell] = { ...workoutObject };
                        }
                        currentDate = cell;
                    } else if ((j - 2) % 4 === 0) {
                        if (userData.hasOwnProperty(j)) {
                            const weight = parseFloat(cell.replace(/[^\d,.]/g, "").replace(/,/g, "."));
                            dataSheets[currentDate][tableName] = Object.assign({ [userData[j].name]: { weight } }, dataSheets[currentDate][tableName]);
                        }
                    }
                    if (j > 4 && ((j - 1) % 4 === 0)) {
                        if (userData.hasOwnProperty(j - 3)) {
                            dataSheets[currentDate][tableName][userData[j - 3].name] = {
                                ...dataSheets[currentDate][tableName][userData[j - 3].name],
                                "set": cell,
                            };
                        }
                    }
                }
                return null;
            }
            );
            return null;
        })
        fillWorkoutDates(tableName);
    } else if (tableName === 'UserRegister') {
        dataSet.slice(1).map((row, i) => {
            row.map((cell, j) => {
                switch (j) {
                    case 0:
                        userData[(sheetUserJump * i) + 2] = {
                            ...userData[(sheetUserJump * i) + 2],
                            "id": cell,
                        };
                        break;
                    case 1:
                        userData[(sheetUserJump * i) + 2] = {
                            ...userData[(sheetUserJump * i) + 2],
                            "name": cell,
                        };
                        break;
                    case 2:
                        userData[(sheetUserJump * i) + 2] = {
                            ...userData[(sheetUserJump * i) + 2],
                            "sheetScope": cell,
                        };
                        break;

                    default:
                        break;
                }
                return null;
            })
            return null;
        })
    }else if(tableName === 'changedFlag'){
        let stamp = JSON.stringify(dataSet);
            if(stamp !== timeStamp){
                changeFlag = true;       // commenting for debugging
                timeStamp = stamp;
            }else{
                changeFlag = false;
            }
    }
    return null;
}

export function getWeightsFor(workout, username) {
    if (workout !== "none" && username !== "none") {
        var sortable = [];
        _.forEach(dataSheets, (value, key) => {
            sortable.push([key, dataSheets[key]]);
        })
        sortable.sort(function (a, b) {
            let first = moment(a[0], 'DD.MM.YY');
            let second = moment(b[0], 'DD.MM.YY');
            let diff = moment.duration(first.diff(second));
            return diff.asDays();
        });
        let lastElem = sortable.pop();
        while (!lastElem[1][workout].hasOwnProperty(username) && sortable.length !== 0) {
            lastElem = sortable.pop();
        }
        if (lastElem[1][workout].hasOwnProperty(username)) {
            return {
                "lastWeight": lastElem[1][workout][username].weight,
                "lastSet": lastElem[1][workout][username].set
            };
        }
    }
    return {
        "lastWeight": 0,
        "lastSet": " "
    };
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

export const getStatistics = (username) => {
    let statistic;
    _.mapValues(dateTable, (value, name) => {
        statistic = {
            ...statistic,
            [name]: 0,
        };
        return _.forEach(value, (date) => {
            date = date.replace(/[^\d.]/g, "");
            if (!dataSheets.hasOwnProperty(date)) {
                return 0;
            } else if (dataSheets[date][name].hasOwnProperty(username)) {
                let set = dataSheets[date][name][username].set;
                if (typeof (set) !== 'undefined') {
                    let index = 0;
                    let rep = [''];
                    for (var v of set) {
                        if (v === '-') {
                            index++;
                            rep[index] = '';
                        } else {
                            rep[index] = rep[index].concat(v);
                        }
                    }
                    for (let j = 0; j < rep.length; j++) {
                        statistic[name] += ((dataSheets[date][name][username].weight * 2) + 20) * rep[j];
                    }
                }
            }
            return value;
        });

    })
    return statistic;
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


export const profileChecker = (profile) => {
    let newUser = true;
    if (userData.length) {
        Object.values(userData).reduce((prevVal, curVal, i) => {
            let id = profile.getId();
            if (curVal.id === id) {
                newUser = false;
            }
            return null;
        })
        if (newUser) {
            let newUserNumber = (sheetUserJump * Object.keys(userData).length) + 2;
            userData[newUserNumber] = {
                "id": profile.getId(),
                "name": profile.getName(),
                "sheetScope": String.fromCharCode(("A").charCodeAt(0) + newUserNumber),
            };
            let writeID = {
                value: userData[newUserNumber]["id"],
                range: `UserRegister!A${Object.keys(userData).length + 1}`,
            }
            let writeName = {
                value: userData[newUserNumber]["name"],
                range: `UserRegister!B${Object.keys(userData).length + 1}`,
            }
            let writeScope = {
                value: userData[newUserNumber]["sheetScope"],
                range: `UserRegister!C${Object.keys(userData).length + 1}`,
            }
            WriteSingleCell(writeID);
            WriteSingleCell(writeName);
            WriteSingleCell(writeScope);
        }
    }
}


export let versusData = [];
export let data = [];

export let workoutData = {
}