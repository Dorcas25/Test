# Connecting the diagnostic to a results sheet (no coding required)

This lets every completed diagnostic land as a new row in a Google Sheet you own — no database, no server, no login system. Takes about 5 minutes, one time.

## Step 1 — Create the sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **"AVECGAZELLE Diagnostic Results."**

## Step 2 — Add the backend script
1. In the sheet, go to **Extensions → Apps Script**.
2. Delete anything in the editor and paste in the full contents of `Code.gs` (included alongside this file).
3. Click the **Save** icon (or Ctrl/Cmd+S).

## Step 3 — Deploy it as a web app
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script — click through the "Advanced" / "Go to (unsafe)" prompt. This is expected; it's your own script running on your own sheet.
6. Copy the **Web app URL** it gives you — it looks like `https://script.google.com/macros/s/AKfycb.../exec`.

## Step 4 — Connect the website to it
1. Open `index.html` in a text editor.
2. Find this line near the top of the `<script>` section:
   ```js
   const SHEET_WEBHOOK_URL = ''; // e.g. 'https://script.google.com/macros/s/XXXXXXXX/exec'
   ```
3. Paste your URL between the quotes.
4. Save the file and re-upload/host it wherever the site lives.

## Step 5 — Test it
1. Open the live site, complete a full test run yourself.
2. Check the Google Sheet — a new row should appear with your name, score, level, and competency breakdown.
3. If nothing appears: re-open **Deploy → Manage deployments** and confirm the deployment is still active, and that "Who has access" is set to **Anyone**.

## Important notes
- **Every time you edit `Code.gs`,** you must go to **Deploy → Manage deployments → Edit (pencil icon) → New version → Deploy** for the change to take effect. Saving alone isn't enough.
- This sheet is only as private as your Google account sharing settings — share it only with people who should see candidate results, the same way you'd protect any spreadsheet of personal data.
- This is a lightweight logging layer, not a real database — there's no login system, no per-candidate history lookup, and no protection against someone finding the URL and posting fake rows. Fine for a small cohort you're personally running; if you outgrow that, that's the point to move to the fuller Supabase-backed build we discussed.
