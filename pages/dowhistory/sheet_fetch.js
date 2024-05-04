const sheetData = {
    jdow: {
        wh: [
            '1fGUsdZKDVElZy_ykyFWGvTRDtWzIuwMbq27KzwJR8u8',
            '22/23'
        ],
        ush: [
            '1ElefyLVgjWw4bRuM54uEgEIBAVMO0hOJGcCkPHT5DuM',
            'Sheet1'
        ]
    },
    bdow: {
        cwp: [
            '1gT4wlmj0m65sz4cI7b80ldJJkiyVKv0k8tJ7-qRl9fQ',
            'CWP Homework Log'
        ],
        wh: [
            '14bkehe4b9k_dtsCunj72bQeBnfttULELBmzIWh5Hj24',
            'World History Homework Log'
        ]
    }
}

// For headers mostly
const sheet_styles = {
    dow_standard: {
        title: "Classwork",
        details: "Details"
    }
}

function loadSheet(sheet) {
    let sheet_id = sheet[0];
    let sheet_name = encodeURIComponent(sheet[1]);
    let sheet_URL = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`;

    fetch(sheet_URL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText));
}

loadSheet(sheetData.jdow.wh)

function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
    // sheetObjects is now an array of objects
    //console.log(sheetObjects)
    document.getElementById('classworks').innerHTML = "";
    sheetObjects.forEach(cell => {
        objectToDiv(cell);
    })
    // ADD CODE HERE
}

// Cell object to div 
function objectToDiv(object, sheet_style = sheet_styles.dow_standard) {
    let assignment = document.createElement('div');
    let title = document.createElement('h1');
    let details = document.createElement('p');

    title.innerText = object[sheet_style.title];
    details.innerText = object[sheet_style.details];

    assignment.appendChild(title);
    assignment.appendChild(details);

    assignment.classList.add('assignment')

    document.getElementById('classworks').appendChild(assignment);
}

function csvToObjects(csv) {
    const csvRows = csv.split("\n"); // Split request text into an array of rows
    const propertyNames = csvSplit(csvRows[0]); // Get the top row (usually the header)
    let objects = []; // Array of objects that will get returned

    // Start at second item in csvRows array
    // Loop through rest of rows
    for (let i = 1; i < csvRows.length; i++) {
        let thisObject = {};
        let row = csvSplit(csvRows[i]);
        // Loop over each cell in the row
        for (let j = 0; j < row.length; j++) {
            // Find matching header to fit to each cell
            if (propertyNames[j] != "") {
                thisObject[propertyNames[j]] = row[j];
            }
        }
        objects.push(thisObject);
    }
    return objects;
}

function csvSplit(row) {
    // Remove all "" and split row into cells
    // *Fixed for having commas in cells
    return row.substring(1, row.length-1).split('","');
}
