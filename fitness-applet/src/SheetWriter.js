import apiKey from './apiKey.json';

export const WriteSingleCell = (props) => {
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
    });
}