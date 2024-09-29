function onFormSubmit(e) {
  // Define recipients for admin notification
  // var recipients = "mentoring@thrivingelements.org, sarah@thrivingelements.org, albert@thrivingelements.org"; 
  var recipients = "albert@thrivingelements.org"; 
  var formLink = "https://docs.google.com/forms/d/e/1FAIpQLScOCJegsGsz7tmbyBdPEA3ic-yLv9Zwqd3Q2pgnDro04lflkQ/viewform"; // Link to your Google Form
  var sheetLink = SpreadsheetApp.getActiveSpreadsheet().getUrl(); // Link to the Google Sheet
  
  try {
    var sheet = e.source.getActiveSheet();
    var response = e.values;

    // Get the respondent's email (adjust index to match your form)
    var emailAddress = response[1];  // Assuming the email is in the second column

    // Get the date from the form (adjust index to match the form)
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

    // Email to the admin team
    var adminSubject = "TE Mentor Form Submission Success";
    var adminMessage = "The form submission was successfully processed for the year: " + year + ".\n\n" +
                       "Form link: " + formLink + "\n" +
                       "Sheet link: " + sheetLink + "\n\n" +
                       "Form Results:\n" + formResults;

    MailApp.sendEmail(recipients, adminSubject, adminMessage);

    // Send thank-you email to respondent (if email exists)
    if (emailAddress) {
      var subject = "Thank you for your form submission";
      var message = "Hello,\n\n" +
                    "Thank you for submitting the form. Here are your responses:\n\n" +
                    formResults +
                    "\nWe appreciate your time and effort in filling out this form. If you have any questions, feel free to reach out to us.\n\n" +
                    "Best regards,\nThriving Elements Mentoring Program";

      MailApp.sendEmail({
        to: emailAddress,
        subject: subject,
        body: message,
        name: "Thriving Elements Mentoring Program",      // Custom From Name
        replyTo: "mentoring@thrivingelements.org"         // Custom Reply-To email address
      });
    }

  } catch (error) {
    // Send a failure notification if there is an error
    var subject = "In-Development Mentor Form Submission Failure";
    var message = "The form submission failed with the following error: " + error.message + "\n\n" +
                  "Form link: " + formLink + "\n" +
                  "Sheet link: " + sheetLink;

    MailApp.sendEmail(recipients, subject, message);
  }
}
