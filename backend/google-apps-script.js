/**
 * ==============================================================================
 * ACM MITS Student Chapter - CodeNite 2027 Registration Backend (Google Apps Script)
 * ==============================================================================
 *
 * HOW TO DEPLOY:
 * 1. Open Google Sheets (create a new blank spreadsheet titled "CodeNite 2027 Registrations").
 * 2. In the top menu, navigate to: Extensions > Apps Script.
 * 3. Delete any existing template code in Code.gs, paste this entire file, and click Save (Ctrl+S).
 * 4. Click "Deploy" (top right) > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "CodeNite 2027 Registration API".
 * 7. Set "Execute as": "Me" (your email).
 * 8. Set "Who has access": "Anyone" (crucial for web submissions without auth prompt).
 * 9. Click "Deploy", authorize permissions when prompted, and copy the provided Web App URL.
 * 10. Paste the Web App URL into your fetch endpoint in `src/sections/Registration.jsx`.
 * ==============================================================================
 */

function setupSheetHeaders(sheet) {
  const headers = [
    "Timestamp",
    "Registration ID",
    "Team Name",
    "Team Size",
    "Innovation Track",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "Leader College",
    "Leader Enrollment",
    "Leader Year",
    "Leader Branch",
    "Leader GitHub",
    "Leader LinkedIn",
    "Member 2 Name",
    "Member 2 Email",
    "Member 2 Phone",
    "Member 2 College",
    "Member 2 Enrollment",
    "Member 2 Year",
    "Member 2 Branch",
    "Member 3 Name",
    "Member 3 Email",
    "Member 3 Phone",
    "Member 3 College",
    "Member 3 Enrollment",
    "Member 3 Year",
    "Member 3 Branch",
    "Member 4 Name",
    "Member 4 Email",
    "Member 4 Phone",
    "Member 4 College",
    "Member 4 Enrollment",
    "Member 4 Year",
    "Member 4 Branch",
    "Member 5 Name (If 6-member squad)",
    "Member 5 Email",
    "Member 5 Phone",
    "Member 5 College",
    "Member 5 Enrollment",
    "Member 5 Year",
    "Member 5 Branch",
    "Member 6 Name (If 6-member squad)",
    "Member 6 Email",
    "Member 6 Phone",
    "Member 6 College",
    "Member 6 Enrollment",
    "Member 6 Year",
    "Member 6 Branch",
    "Raw JSON Payload"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0085CA");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(15000); // Wait up to 15s to prevent concurrent row overwrite

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("Registrations");
    if (!sheet) {
      sheet = doc.insertSheet("Registrations");
    }

    setupSheetHeaders(sheet);

    const data = JSON.parse(e.postData.contents);
    const members = data.members || [];

    const row = [
      data.timestamp || new Date().toISOString(),
      data.registrationId || "",
      data.teamName || "",
      data.teamSize || "",
      data.track || ""
    ];

    // Append up to 6 members sequentially
    for (let i = 0; i < 6; i++) {
      if (members[i]) {
        row.push(
          members[i].name || "",
          members[i].email || "",
          members[i].phone || "",
          members[i].college || "",
          members[i].enrollmentNo || "",
          members[i].year || "",
          members[i].branch || ""
        );
        // Include leader links on leader
        if (i === 0) {
          row.push(members[0].github || "", members[0].linkedin || "");
        }
      } else {
        // Empty placeholders if squad has 4 members
        if (i === 0) {
          row.push("", "", "", "", "", "", "", "", "");
        } else {
          row.push("", "", "", "", "", "", "");
        }
      }
    }

    // Also store complete raw JSON for auditing
    row.push(JSON.stringify(data));

    sheet.appendRow(row);

    // Optional: Send auto-confirmation email to Team Leader
    try {
      if (members[0] && members[0].email) {
        MailApp.sendEmail({
          to: members[0].email,
          subject: "ACM MITS CodeNite 2027 Registration Confirmed: " + data.teamName,
          htmlBody: `
            <div style="font-family: Arial, sans-serif; background-color: #020617; color: #f8fafc; padding: 25px; border-radius: 12px;">
              <h2 style="color: #38bdf8;">Welcome to CodeNite 2027!</h2>
              <p>Dear <strong>${members[0].name}</strong>,</p>
              <p>Your team <strong>"${data.teamName}"</strong> has been successfully registered for CodeNite 2027, organized by the ACM MITS Student Chapter.</p>
              <table style="color: #cbd5e1; font-size: 14px; margin: 15px 0;">
                <tr><td><strong>Registration Code:</strong></td><td style="color: #22d3ee; font-weight: bold;">${data.registrationId}</td></tr>
                <tr><td><strong>Track:</strong></td><td>${data.track}</td></tr>
                <tr><td><strong>Team Size:</strong></td><td>${data.teamSize} Members</td></tr>
                <tr><td><strong>Date:</strong></td><td>17 January 2027, 08:00 PM IST</td></tr>
                <tr><td><strong>Venue:</strong></td><td>MITS Gwalior Campus</td></tr>
              </table>
              <p>Please ensure all team members carry their student identity cards to the venue.</p>
              <p style="margin-top: 25px; font-size: 12px; color: #94a3b8;">ACM MITS Technical Team &bull; Madhav Institute of Technology & Science, Gwalior</p>
            </div>
          `
        });
      }
    } catch (emailErr) {
      Logger.log("Email dispatch skipped: " + emailErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", registrationId: data.registrationId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "ACM CodeNite 2027 Registration Webhook is Live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
