/* Place the data on the correct google sheet tab based on year of submission
function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet();
  var response = e.values;
  
  // Get the current year from the form submission timestamp
  var timestamp = new Date(response[0]);
  var year = timestamp.getFullYear();

  // Get the spreadsheet and check for the sheet corresponding to the year
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var yearSheet = spreadsheet.getSheetByName(year.toString());

  // If the sheet for the current year doesn't exist, create it
  if (!yearSheet) {
    yearSheet = spreadsheet.insertSheet(year.toString());
    
    // Optional: Add header rows if needed
    yearSheet.appendRow(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
  }

  // Append the response to the appropriate year's sheet
  yearSheet.appendRow(response);
}
*/

// Place the data into the correct tab based on date question on the form 
function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet();
  var response = e.values;

  // Assume the form date question is the 29th response (adjust index as needed)
  var formDate = new Date(response[29]); 
  var year = formDate.getFullYear();

  // Get the spreadsheet and check for the sheet corresponding to the year
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var yearSheet = spreadsheet.getSheetByName(year.toString());

  // If the sheet for the current year doesn't exist, create it
  if (!yearSheet) {
    yearSheet = spreadsheet.insertSheet(year.toString());

    // Optional: Add header rows if needed
    yearSheet.appendRow(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
  }

  // Append the response to the appropriate year's sheet
  yearSheet.appendRow(response);
}
