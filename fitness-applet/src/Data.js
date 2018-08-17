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
export let dateTable = [];
export let dataSheet = [];


export const getDateTable = (name) => {
    if (name !== "none" && name !== "") {
        dateTable = data[name].map((key, i) => {
            return key.time;
        });
        return dateTable;
    } return ["none"];
}
export const getCellIndex = (date)=>{
    let index;
    dateTable.filter((cell, i)=>{
        if(cell===date){
            index =  i+3;
        }return null
    });
    return index;
}

export const fillOfflineSheet = (dataSet, tableName) => {
    if (tableName !== "") {
        dataSet.slice(2).map((row, i) => {
            row.map((cell, j) => {
                switch (j) {
                    case 0:
                        addElementToPersonalData(i, "time", cell, "Dennis");
                        addElementToPersonalData(i, "time", cell, "Daniel");
                        addElementToPersonalData(i, "time", cell, "Moritz");
                        break;
                    case 2:
                    case 6:
                    case 10:
                        if (!parseWorkoutData(i, tableName, cell, j)) {
                            return null;
                        }
                        break;
                    default:
                        return null
                }
                return null;
            }
            );
            return null;
        })
    }
}

const parseWorkoutData = (i, tableName, cell, j) => {
    let celldata = 0;
    if (cell === "") {
        return false;
    } else {
        celldata = parseFloat(cell);
    }
    addElementToPersonalData(i, tableName, celldata, userData[j].name);
    return true;
}


function addElementToPersonalData(index, newKey, cell, userName) {
    var personalData = Object.assign({}, data[userName][index]);
    var newInput = newKey;
    personalData[newInput] = cell;
    data[userName][index] = personalData;
}

export const data = {
    Dennis: [],
    Daniel: [],
    Moritz: []
}

export let workoutData = {
}