import apiKey from './apiKey.json'; 

export const WriteSingleCell = (props, callback = 0) => {
    let values = [
        [
            props.value
        ],
    ];
    let body = {
        values: values
    };
    window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: apiKey.SheetID,
        range: props.range,
        valueInputOption: "USER_ENTERED",
        resource: body
    }).then((response) => {
        let result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        if (callback !== 0) {
            callback(response);
        }
    });
    // if (!props.range.includes('changedFlag')) {
    //     WriteChangedFlag({ value: true, range: `changedFlag!A1` });
    //     WriteChangedFlag({ value: true, range: `changedFlag!A2` });
    //     WriteChangedFlag({ value: true, range: `changedFlag!A3` });
    // }
}

// const WriteChangedFlag = (props) => {
//     let values = [
//         [
//             props.value
//         ],
//     ];
//     let body = {
//         values: values
//     };
//     window.gapi.client.sheets.spreadsheets.values.update({
//         spreadsheetId: apiKey.SheetID,
//         range: props.range,
//         valueInputOption: "USER_ENTERED",
//         resource: body
//     }).then((response) => {
//         let result = response.result;
//         console.log(`${result.updatedCells} flag updated.`);
//     });
// }