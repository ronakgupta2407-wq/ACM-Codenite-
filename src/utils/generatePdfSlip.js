/**
 * ACM MITS Student Chapter - CodeNite 2027
 * Client-Side Registration PDF & Print Slip Generator
 */

export function generateRegistrationSlipHtml(data, registrationId) {
  const members = data.members || [];

  const memberRows = members
    .map((m, idx) => {
      const isLeader = idx === 0;
      const roleLabel = isLeader ? "TEAM LEADER" : `MEMBER ${idx + 1}`;
      const roleBadgeStyle = isLeader
        ? "background-color: #0085CA; color: #ffffff;"
        : "background-color: #e2e8f0; color: #1e293b;";

      return `
        <tr style="border-bottom: 1px solid #cbd5e1; background-color: ${
          idx % 2 === 0 ? "#f8fafc" : "#ffffff"
        };">
          <td style="padding: 10px; font-weight: bold; font-size: 13px;">
            <span style="${roleBadgeStyle} padding: 2px 7px; border-radius: 4px; font-size: 10px; font-weight: bold; display: inline-block; margin-bottom: 4px;">
              ${roleLabel}
            </span>
            <div>${m.name || "N/A"}</div>
            <div style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">
              ${m.gender || "Gender N/A"} &bull; ${m.city || "City N/A"}
            </div>
          </td>
          <td style="padding: 10px; font-size: 12px; color: #334155;">
            <strong>${m.college || "N/A"}</strong>
            <div style="color: #64748b; font-size: 11px; margin-top: 2px;">Roll: ${m.enrollmentNo || "N/A"}</div>
          </td>
          <td style="padding: 10px; font-size: 12px; color: #334155;">
            <div>${m.email || "N/A"}</div>
            <div style="font-family: monospace; color: #0085CA; font-weight: bold; font-size: 11px; margin-top: 2px;">${m.phone || "N/A"}</div>
          </td>
          <td style="padding: 10px; font-size: 12px; color: #334155;">
            ${m.branch || "N/A"}
            <div style="color: #64748b; font-size: 11px;">${m.year || "N/A"}</div>
          </td>
          <td style="padding: 10px; font-size: 11px; color: #334155;">
            <div><strong>T-Shirt:</strong> ${m.tshirt || "L"}</div>
            <div style="color: #64748b; margin-top: 2px;"><strong>Diet:</strong> ${m.dietary || "Veg"}</div>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>CodeNite 2027 Registration Slip - ${data.teamName}</title>
        <style>
          @media print {
            body { margin: 0; padding: 15mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            line-height: 1.5;
            background: #ffffff;
            margin: 20px auto;
            max-width: 820px;
            padding: 30px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
          }
          .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #0085CA;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 26px;
            font-weight: 900;
            color: #0085CA;
            letter-spacing: -0.5px;
            margin: 0;
            text-transform: uppercase;
          }
          .subtitle {
            font-size: 13px;
            color: #475569;
            margin: 3px 0 0 0;
            font-weight: 600;
          }
          .reg-badge {
            background-color: #020617;
            color: #38bdf8;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 15px;
            font-weight: bold;
            text-align: right;
          }
          .grid-meta {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            background-color: #f1f5f9;
            padding: 14px;
            border-radius: 8px;
            margin-bottom: 25px;
          }
          .meta-item-label {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .meta-item-value {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin-top: 3px;
          }
          .section-heading {
            font-size: 15px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 10px;
            border-left: 4px solid #0085CA;
            padding-left: 8px;
            text-transform: uppercase;
          }
          .table-members {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border: 1px solid #cbd5e1;
          }
          .table-members th {
            background-color: #0085CA;
            color: #ffffff;
            padding: 10px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .checkin-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 14px 16px;
            margin-bottom: 25px;
            font-size: 12px;
            color: #1e3a8a;
          }
          .checkin-title {
            font-weight: 800;
            margin-bottom: 6px;
            color: #1e40af;
          }
          .footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 11px;
            color: #64748b;
          }
          .print-btn {
            background-color: #0085CA;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: right; margin-bottom: 15px;">
          <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
        </div>

        <div class="header-row">
          <div>
            <h1 class="title">CodeNite 2027</h1>
            <p class="subtitle">ACM MITS Student Chapter &bull; Madhav Institute of Technology & Science, Gwalior</p>
          </div>
          <div class="reg-badge">
            <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8;">Registration Code</div>
            ${registrationId}
          </div>
        </div>

        <div class="grid-meta">
          <div>
            <div class="meta-item-label">Team Name</div>
            <div class="meta-item-value">${data.teamName}</div>
          </div>
          <div>
            <div class="meta-item-label">Innovation Track</div>
            <div class="meta-item-value">${data.track}</div>
          </div>
          <div>
            <div class="meta-item-label">Squad Size</div>
            <div class="meta-item-value">${data.teamSize} Members</div>
          </div>
          <div>
            <div class="meta-item-label">Date & Mode</div>
            <div class="meta-item-value">17 Jan 2027 &bull; Campus</div>
          </div>
        </div>

        <div class="section-heading">Squad Roster & Participant Information (${members.length} Members)</div>
        <table class="table-members">
          <thead>
            <tr>
              <th style="width: 24%;">Member, Gender & City</th>
              <th style="width: 24%;">College & Roll No.</th>
              <th style="width: 20%;">Email & Phone</th>
              <th style="width: 16%;">Branch & Year</th>
              <th style="width: 16%;">Swag & Diet</th>
            </tr>
          </thead>
          <tbody>
            ${memberRows}
          </tbody>
        </table>

        <div class="checkin-box">
          <div class="checkin-title">Instructions for Check-in at MITS Gwalior:</div>
          <div>&bull; Reporting begins at <strong>06:00 PM IST on 17 January 2027</strong> at the MITS Computing & Seminar Complex.</div>
          <div>&bull; All team members must present their College Student Identity Card matching the credentials on this slip.</div>
          <div>&bull; 12 Hours of overnight hacking commences at 08:00 PM IST. Midnight snacks, drinks, and high-speed Wi-Fi provided.</div>
          <div>&bull; A copy of this PDF is stored in the official ACM CodeNite Google Drive repository and emailed to the Team Leader.</div>
        </div>

        <div class="footer-row">
          <div>
            <strong>ACM MITS Technical Team</strong> &bull; Chartered 2014<br>
            Madhav Institute of Technology & Science, Gwalior (M.P.)
          </div>
          <div style="text-align: right;">
            Status: <strong>OFFICIALLY REGISTERED</strong><br>
            Inquiries: acmmits@mitsgwalior.in
          </div>
        </div>

        <script>
          // Automatically prompt print dialog when opened
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
    </html>
  `;
}

export function openPrintSlipWindow(data, registrationId) {
  const html = generateRegistrationSlipHtml(data, registrationId);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
