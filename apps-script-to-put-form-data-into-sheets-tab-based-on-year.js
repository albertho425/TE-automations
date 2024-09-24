function onFormSubmit(e) {
  /var recipients = "mentoring@thrivingelements.org, sarah@thrivingelements.org, albert@thrivingelements.org"; // Add your recipients here
  // var recipients = "albert@thrivingelements.org"; // Add your recipients here
  var formLink = "https://docs.google.com/forms/d/e/1FAIpQLScOCJegsGsz7tmbyBdPEA3ic-yLv9Zwqd3Q2pgnDro04lflkQ/viewform"; // Link to your Google Form
  var sheetLink = SpreadsheetApp.getActiveSpreadsheet().getUrl(); // Link to the Google Sheet
  
  try {
    var sheet = e.source.getActiveSheet();
    var response = e.values;

    // Adjust the index to 2 for the date question (3rd column in the sheet)
    var formDate = new Date(response[2]); 
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

    // Create a formatted string for form results
    var formResults = "";
    for (var i = 0; i < response.length; i++) {
      formResults += "Question " + (i + 1) + ": " + response[i] + "\n";
    }

    // Send a success notification if the script completes successfully
    var subject = "In-Development Mentor Form Submission Success";
    var message = "The form submission was successfully processed for the year: " + year + ".\n\n" +
                  "Form link: " + formLink + "\n" +
                  "Sheet link: " + sheetLink + "\n\n" +
                  "Form Results:\n" + formResults;

    MailApp.sendEmail(recipients, subject, message);

  } catch (error) {
    // Send a failure notification if there is an error
    var subject = "In-Development Mentor Form Submission Failure";
    var message = "The form submission failed with the following error: " + error.message + "\n\n" +
                  "Form link: " + formLink + "\n" +
                  "Sheet link: " + sheetLink;

    MailApp.sendEmail(recipients, subject, message);
  }
}
