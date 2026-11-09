/**
 * ==============================================================================
 * ACM MITS Student Chapter - CodeNite 2027 Registration Backend (Google Apps Script)
 * ==============================================================================
 *
 * FEATURES:
 * 1. Appends full registration details to Google Sheet ("Registrations").
 * 2. Automatically creates and manages a dedicated Google Drive folder:
 *    "CodeNite 2027 Registration PDFs"
 * 3. Dynamically generates an official, high-resolution, branded PDF for every
 *    registered team with complete team & member data (Name, College, Email, Phone, etc.).
 * 4. Saves the PDF in the Google Drive folder with shareable link permissions.
 * 5. Logs the Google Drive PDF URL into the Google Sheet.
 * 6. Automatically dispatches a confirmation email to the Team Leader with the PDF attached.
 * 7. Returns the registration ID and Google Drive PDF URL back to the frontend.
 *
 * HOW TO DEPLOY:
 * 1. Open Google Sheets (create a blank spreadsheet titled "CodeNite 2027 Registrations").
 * 2. Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this entire file and save (Ctrl+S).
 * 4. Deploy > New deployment > Web app.
 * 5. Description: "CodeNite 2027 Registration & Drive PDF API".
 * 6. Execute as: "Me" (your Google account).
 * 7. Who has access: "Anyone".
 * 8. Authorize permissions when prompted and copy the Web App URL.
 * 9. Paste the Web App URL into `src/sections/Registration.jsx`.
 * ==============================================================================
 */

const FOLDER_NAME = "CodeNite 2027 Registration PDFs";

function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(FOLDER_NAME);
}

function setupSheetHeaders(sheet) {
  const headers = [
    "Timestamp",
    "Registration ID",
    "Team Name",
    "Team Size",
    "Innovation Track",
    "Drive PDF URL",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "Leader Gender",
    "Leader College",
    "Leader Enrollment",
    "Leader Year",
    "Leader Branch",
    "Leader City",
    "Member 2 Name",
    "Member 2 Email",
    "Member 2 Phone",
    "Member 2 Gender",
    "Member 2 College",
    "Member 2 Enrollment",
    "Member 2 Year",
    "Member 2 Branch",
    "Member 2 City",
    "Member 3 Name",
    "Member 3 Email",
    "Member 3 Phone",
    "Member 3 Gender",
    "Member 3 College",
    "Member 3 Enrollment",
    "Member 3 Year",
    "Member 3 Branch",
    "Member 3 City",
    "Member 4 Name",
    "Member 4 Email",
    "Member 4 Phone",
    "Member 4 Gender",
    "Member 4 College",
    "Member 4 Enrollment",
    "Member 4 Year",
    "Member 4 Branch",
    "Member 4 City",
    "Member 5 Name (If applicable)",
    "Member 5 Email",
    "Member 5 Phone",
    "Member 5 Gender",
    "Member 5 College",
    "Member 5 Enrollment",
    "Member 5 Year",
    "Member 5 Branch",
    "Member 5 City",
    "Member 6 Name (If applicable)",
    "Member 6 Email",
    "Member 6 Phone",
    "Member 6 Gender",
    "Member 6 College",
    "Member 6 Enrollment",
    "Member 6 Year",
    "Member 6 Branch",
    "Member 6 City",
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

function generateRegistrationPdfHtml(data) {
  const members = data.members || [];
  
  let memberRowsHtml = "";
  members.forEach((m, idx) => {
    const isLeader = idx === 0;
    const roleBadge = isLeader ? 
      '<span style="background-color: #0284c7; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">TEAM LEADER</span>' : 
      '<span style="background-color: #e2e8f0; color: #334155; padding: 3px 8px; border-radius: 4px; font-weight: 600; font-size: 11px;">MEMBER ' + (idx + 1) + '</span>';

    const genderBadge = m.gender ? `<span style="display:inline-block; font-size:10px; color:#0284c7; background:#e0f2fe; padding:1px 6px; border-radius:3px; margin-left:4px;">${m.gender}</span>` : '';
    memberRowsHtml += `
      <tr style="border-bottom: 1px solid #cbd5e1; background-color: ${idx % 2 === 0 ? '#f8fafc' : '#ffffff'};">
        <td style="padding: 10px; font-weight: bold; color: #0f172a;">${roleBadge}${genderBadge}<br><div style="margin-top: 4px; font-size: 13px;">${m.name || 'N/A'}</div></td>
        <td style="padding: 10px; font-size: 12px; color: #334155;"><strong>${m.college || 'N/A'}</strong><br><span style="color: #64748b;">Roll: ${m.enrollmentNo || 'N/A'}</span></td>
        <td style="padding: 10px; font-size: 12px; color: #334155;">${m.email || 'N/A'}<br><span style="color: #64748b; font-family: monospace;">${m.phone || 'N/A'}</span></td>
        <td style="padding: 10px; font-size: 12px; color: #334155;">${m.branch || 'N/A'}<br><span style="color: #64748b;">${m.year || 'N/A'} • ${m.city || 'N/A'}</span></td>
      </tr>
    `;
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>CodeNite 2027 Registration - ${data.teamName}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 25px; line-height: 1.5; }
          .header-box { border-bottom: 3px solid #0085CA; padding-bottom: 15px; margin-bottom: 20px; display: table; width: 100%; }
          .header-left { display: table-cell; vertical-align: middle; }
          .header-right { display: table-cell; vertical-align: middle; text-align: right; }
          .title { font-size: 24px; font-weight: 800; color: #0085CA; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
          .subtitle { font-size: 13px; color: #475569; margin: 4px 0 0 0; font-weight: 600; }
          .reg-pill { display: inline-block; background-color: #0f172a; color: #38bdf8; padding: 6px 14px; border-radius: 6px; font-family: monospace; font-size: 14px; font-weight: bold; }
          .meta-table { width: 100%; margin-bottom: 25px; border-collapse: collapse; background: #f1f5f9; border-radius: 8px; }
          .meta-td { padding: 12px 15px; vertical-align: top; width: 25%; border-right: 1px solid #e2e8f0; }
          .meta-td:last-child { border-right: none; }
          .meta-label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 0.5px; }
          .meta-value { font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 3px; }
          .table-title { font-size: 15px; font-weight: bold; color: #0f172a; margin-bottom: 8px; border-left: 4px solid #0085CA; padding-left: 8px; }
          .members-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border: 1px solid #cbd5e1; }
          .members-th { background-color: #0085CA; color: #ffffff; padding: 10px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          .guidelines-box { background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px 15px; margin-bottom: 20px; font-size: 11px; color: #1e3a8a; }
          .footer { border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #64748b; display: table; width: 100%; }
          .footer-left { display: table-cell; }
          .footer-right { display: table-cell; text-align: right; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="header-left">
            <h1 class="title">CodeNite 2027</h1>
            <p class="subtitle">ACM MITS Student Chapter &bull; Madhav Institute of Technology & Science, Gwalior</p>
          </div>
          <div class="header-right">
            <div class="reg-pill">ID: ${data.registrationId}</div>
          </div>
        </div>

        <table class="meta-table">
          <tr>
            <td class="meta-td">
              <div class="meta-label">Team Name</div>
              <div class="meta-value">${data.teamName}</div>
            </td>
            <td class="meta-td">
              <div class="meta-label">Innovation Track</div>
              <div class="meta-value">${data.track}</div>
            </td>
            <td class="meta-td">
              <div class="meta-label">Team Sizing</div>
              <div class="meta-value">${data.teamSize} Members Squad</div>
            </td>
            <td class="meta-td">
              <div class="meta-label">Event Date & Venue</div>
              <div class="meta-value" style="font-size: 12px;">17 Jan 2027<br>MITS Gwalior Campus</div>
            </td>
          </tr>
        </table>

        <div class="table-title">Registered Squad Members (${members.length} Members)</div>
        <table class="members-table">
          <thead>
            <tr>
              <th class="members-th" style="width: 25%;">Member & Gender</th>
              <th class="members-th" style="width: 25%;">College & Roll No.</th>
              <th class="members-th" style="width: 25%;">Email & Phone</th>
              <th class="members-th" style="width: 25%;">Branch, Year & City</th>
            </tr>
          </thead>
          <tbody>
            ${memberRowsHtml}
          </tbody>
        </table>

        <div class="guidelines-box">
          <strong>Important Instructions for Check-in:</strong><br>
          1. Reporting starts at 06:00 PM IST on 17 January 2027 at the MITS Gwalior Computing & Seminar Complex.<br>
          2. Every participant must present their original College Student Identity Card matching this registration slip.<br>
          3. Hackathon starts at 08:00 PM sharp. High-speed campus Wi-Fi, power ports, and midnight meals are provided.<br>
          4. Squads must adhere strictly to the ${data.teamSize}-member size requirement and original code policy.
        </div>

        <div class="footer">
          <div class="footer-left">
            Generated on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br>
            Official Document &bull; ACM MITS Student Chapter (Est. 2014)
          </div>
          <div class="footer-right">
            Verification: VALIDATED REGISTRATION<br>
            Contact: acmmits@mitsgwalior.in
          </div>
        </div>
      </body>
    </html>
  `;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(20000); // 20s lock

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("Registrations");
    if (!sheet) {
      sheet = doc.insertSheet("Registrations");
    }

    setupSheetHeaders(sheet);

    const data = JSON.parse(e.postData.contents);

    // Support administrative clearing of test rows from the sheet
    if (data.action === "CLEAR_TEST_DATA" || data.clearSheet === true) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "All test data successfully purged from Google Sheet Registrations tab.",
          remainingRows: sheet.getLastRow()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const members = data.members || [];
    
    // Format timestamp in Indian Standard Time (IST)
    let timestamp = data.timestamp;
    if (!timestamp || typeof timestamp !== "string" || !timestamp.includes("IST")) {
      try {
        const d = timestamp ? new Date(timestamp) : new Date();
        timestamp = Utilities.formatDate(d, "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a 'IST'");
      } catch (_) {
        timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a 'IST'");
      }
    }
    const registrationId = data.registrationId || `CN27-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    data.registrationId = registrationId;

    // 1. Get or Create Dedicated Drive Folder
    const driveFolder = getOrCreateDriveFolder();

    // 2. Generate PDF Document
    const htmlContent = generateRegistrationPdfHtml(data);
    const htmlBlob = Utilities.newBlob(htmlContent, 'text/html', 'registration.html');
    const pdfBlob = htmlBlob.getAs('application/pdf');
    const sanitizedTeam = (data.teamName || 'Team').replace(/[^a-zA-Z0-9_-]/g, '_');
    pdfBlob.setName(`CodeNite2027_${sanitizedTeam}_${registrationId}.pdf`);

    // 3. Save PDF to Dedicated Google Drive Folder
    const pdfFile = driveFolder.createFile(pdfBlob);
    try {
      // Set permissions to anyone with link can view
      pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (permErr) {
      Logger.log("Sharing permission warning: " + permErr.toString());
    }
    const pdfUrl = pdfFile.getUrl();

    // 4. Record to Google Sheet Row
    const row = [
      timestamp,
      registrationId,
      data.teamName || "",
      data.teamSize || "",
      data.track || "",
      pdfUrl // Dedicated Drive PDF URL Column
    ];

    // Append up to 6 members sequentially (9 fields per member: name, email, phone, gender, college, enrollmentNo, year, branch, city)
    for (let i = 0; i < 6; i++) {
      if (members[i]) {
        row.push(
          members[i].name || "",
          members[i].email || "",
          members[i].phone || "",
          members[i].gender || "",
          members[i].college || "",
          members[i].enrollmentNo || "",
          members[i].year || "",
          members[i].branch || "",
          members[i].city || ""
        );
      } else {
        row.push("", "", "", "", "", "", "", "", "");
      }
    }

    // Append Raw JSON
    row.push(JSON.stringify(data));
    sheet.appendRow(row);

    // 5. Send Email to Team Leader with PDF Attachment & Drive Link
    try {
      if (members[0] && members[0].email) {
        MailApp.sendEmail({
          to: members[0].email,
          subject: `ACM MITS CodeNite 2027 Registration Confirmed: ${data.teamName} [${registrationId}]`,
          htmlBody: `
            <div style="font-family: Arial, sans-serif; background-color: #020617; color: #f8fafc; padding: 25px; border-radius: 12px; max-width: 600px;">
              <h2 style="color: #38bdf8; margin-top: 0;">CodeNite 2027 Registration Confirmed!</h2>
              <p>Dear <strong>${members[0].name}</strong>,</p>
              <p>Your squad <strong>"${data.teamName}"</strong> has been officially registered for <strong>CodeNite 2027</strong>, the flagship 12-hour overnight hackathon by ACM MITS Student Chapter.</p>
              
              <div style="background-color: #0f172a; padding: 15px; border-radius: 8px; border: 1px solid #1e293b; margin: 15px 0;">
                <table style="color: #cbd5e1; font-size: 13px; width: 100%;">
                  <tr><td><strong>Registration ID:</strong></td><td style="color: #22d3ee; font-weight: bold; font-family: monospace;">${registrationId}</td></tr>
                  <tr><td><strong>Selected Track:</strong></td><td>${data.track}</td></tr>
                  <tr><td><strong>Squad Size:</strong></td><td>${data.teamSize} Members</td></tr>
                  <tr><td><strong>Reporting Date:</strong></td><td>17 January 2027, 06:00 PM IST</td></tr>
                  <tr><td><strong>Venue:</strong></td><td>MITS Gwalior Campus</td></tr>
                </table>
              </div>

              <p style="margin: 20px 0;">
                <a href="${pdfUrl}" target="_blank" style="background-color: #0085CA; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
                  View & Download Registration PDF from Drive &rarr;
                </a>
              </p>

              <p style="font-size: 13px; color: #94a3b8;">
                Your official team registration PDF has also been generated and attached directly to this email for your records. Please ensure every member carries their College ID to the event.
              </p>

              <div style="margin-top: 25px; pt: 15px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
                ACM MITS Technical Team &bull; Madhav Institute of Technology & Science, Gwalior
              </div>
            </div>
          `,
          attachments: [pdfBlob]
        });
      }
    } catch (emailErr) {
      Logger.log("Email dispatch note: " + emailErr.toString());
    }

    // 6. Return response with Drive PDF URL
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        registrationId: registrationId,
        pdfUrl: pdfUrl,
        driveFolder: FOLDER_NAME,
        teamName: data.teamName
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "ok", 
      message: "ACM CodeNite 2027 Registration & Drive PDF API is Online",
      driveFolder: FOLDER_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
