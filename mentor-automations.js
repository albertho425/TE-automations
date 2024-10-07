function onFormSubmit(e) {
  // Define recipients for admin notification
  var recipients = "mentoring@thrivingelements.org, albert@thrivingelements.org"; 

  var formLink = "https://docs.google.com/forms/d/e/1FAIpQLScOCJegsGsz7tmbyBdPEA3ic-yLv9Zwqd3Q2pgnDro04lflkQ/viewform"; // Link to your Google Form
  var sheetLink = SpreadsheetApp.getActiveSpreadsheet().getUrl(); // Link to the Google Sheet
  
  try {
    var sheet = e.source.getActiveSheet();
    var response = e.values;

    // Get the respondent's email and first name (adjust index to match your form)
    var emailAddress = response[1];  // Assuming the email is in the second column
    var firstName = response[3];  // Assuming the first name is in the fourth column (D)

    // Get the date from the form (adjust index to match the form)
    var formDate = new Date(response[2]); 
    var year = formDate.getFullYear();

    // Get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Check for the year tab, create if not found
    var yearSheet = spreadsheet.getSheetByName(year.toString());
    if (!yearSheet) {
      yearSheet = spreadsheet.insertSheet(year.toString());
      // Optional: Add header rows if needed
      yearSheet.appendRow(sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]);
    }
    yearSheet.appendRow(response);  // Save to the year tab

    // Create a formatted string for form results
    var formResults = "";
    for (var i = 0; i < response.length; i++) {
      formResults += "Question " + (i + 1) + ": " + response[i] + "\n";
    }

    // Email to the admin team
    var adminSubject = "Thriving Elements Mentor Form Submission Success";
    var adminMessage = "The form submission was successfully processed for the year: " + year + ".\n\n" +
                       "Form link: " + formLink + "\n" +
                       "Sheet link: " + sheetLink + "\n\n" +
                       "Form Results:\n" + formResults + "\n\n" +
                       "First Name: " + firstName;

    MailApp.sendEmail({
      to: recipients,
      subject: adminSubject,
      body: adminMessage,
      name: "Thriving Elements Mentoring Program",  // Custom From Name
      replyTo: "mentoring@thrivingelements.org",    // Custom Reply-To email
    });

    // Send thank-you email to respondent (if email exists)
    if (emailAddress) {
      var subject = "Thank you for applying for the Thriving Elements STEM mentoring program!";
      
      // Construct the HTML email message
      var htmlMessage = `
        <p>Dear ${firstName},</p>
        <p>Thank you for applying for the Thriving Elements STEM mentoring program!</p>
        <p>Our team is currently reviewing your application and we will notify you of the next steps soon. 
        You can learn more about the recruitment process on the 
        <a href="https://www.thrivingelements.org/">Thriving Elements website</a>.</p>
        <br>
        <p>Best regards,</p>
        <br>
        <p>Your Thriving Elements Team</p>
        <br>
        <img style="width: 150px;" src="https://secureservercdn.net/45.40.144.60/vv3.2c5.myftpupload.com/wp-content/uploads/2016/05/logo-large-optimized.jpg?time=1611780714" alt="Thriving Elements logo" />
        <br>
        <a href="https://www.thrivingelements.org/">www.thrivingelements.org</a>
      `;
      
      // Send the email with HTML content
      MailApp.sendEmail({
        to: emailAddress,
        subject: subject,
        htmlBody: htmlMessage,
        name: "Thriving Elements Mentoring Program",      // Custom From Name
        replyTo: "mentoring@thrivingelements.org"         // Custom Reply-To email address
      });
    }

  } catch (error) {
    // Send a failure notification if there is an error
    var subject = "Thriving Elements Mentor Form Submission Failure";
    var message = "The form submission failed with the following error: " + error.message + "\n\n" +
                  "Form link: " + formLink + "\n" +
                  "Sheet link: " + sheetLink;

    MailApp.sendEmail(recipients, subject, message);
  }
}
