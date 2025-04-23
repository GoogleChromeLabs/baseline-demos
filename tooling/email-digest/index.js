// Set this to true during development.
const DEBUG = false;

// Set this to whoever you want the email to go to:
const EMAIL_TO = "developer@example.com";

async function sendEmail () {
  // Get Baseline Newly available features:
  const BASELINE_NEWLY = await getBaselineData("newly");

  // Get Baseline Widely available features:
  const BASELINE_WIDELY = await getBaselineData("widely");

  // If there's no new features, end the job. No email to send!
  if (BASELINE_NEWLY.length === 0 && BASELINE_WIDELY.length === 0) {
    console.log("No Baseline feature changes found. No email will be sent.");

    return;
  }

  // Begin the email body:
  let htmlBody = "<div style=\"font-family: 'Google Sans';\">";
  htmlBody += "<div style=\"text-align: center;\">";
  htmlBody += "<h1 style=\"font-weight: 400; font-family: 'Google Sans';\">Weekly Baseline features digest</h1>"
  htmlBody += "<p style=\"font-family: 'Google Sans';\">This email is a digest of the latest features that became either Baseline Widely or Newly available in the last week.</p>";
  htmlBody += "</div>";

  if (BASELINE_NEWLY.length > 0) {
    htmlBody += "<h2 style=\"font-weight: 400; font-family: 'Google Sans';\">Recent Baseline Newly available features:</h2>";

    // Get Baseline features in a formatted list of Newly available features:
    htmlBody += htmlFromBaselineData(BASELINE_NEWLY, "newly");
  }

  if (BASELINE_WIDELY.length > 0) {
    htmlBody += "<h2 style=\"font-weight: 400; font-family: 'Google Sans';\">Recent Baseline Widely available features:</h2>";

    // Get Baseline features in a formatted list of Widely available features:
    htmlBody += htmlFromBaselineData(BASELINE_WIDELY, "widely");
  }

  // Add a final note:
  htmlBody += "<p style=\"font-family: 'Google Sans';\"><i><strong>Note:</strong> This email is sent every Tuesday, but won't be sent if any features haven't recently changed their Baseline status.</i></p>";

  // End the email body:
  htmlBody += "</div>";

  let gmailOptions = {
    htmlBody
  }

  // Send the email!
  GmailApp.sendEmail(EMAIL_TO, "Baseline weekly digest", "", gmailOptions);
}

async function getBaselineData(baselineStatus) {
  // Default to "newly" available features if the status string is incorrect:
  baselineStatus = baselineStatus !== "newly" && baselineStatus !== "widely" ? "newly" : baselineStatus;

  // Get the ending timestamp (now):
  const END_TIMESTAMP = new Date().getTime();

  // Determine whether to calculate for Newly or Widely available status:
  let START_TIMESTAMP = END_TIMESTAMP;

  if (baselineStatus === "newly") {
    START_TIMESTAMP -= (60*60*24*7*1000);
  } else if (baselineStatus === "widely") {
    START_TIMESTAMP -= (60*60*24*365.25*2.5*1000);
  }

  // Build the start date:
  const START_DATE_OBJ = new Date(START_TIMESTAMP);
  const START_MONTH = new String(START_DATE_OBJ.getMonth() + 1).padStart(2, "0");
  const START_DATE = new String(START_DATE_OBJ.getDate()).padStart(2, "0");
  const START_YEAR = new String(START_DATE_OBJ.getFullYear());
  let AVAILABLE_START;

  // If we're in debug mode, we want to ensure we get output, so set a date
  // in the far past to make sure something gets sent. This is because
  // sometimes there's no Newly available features in the last week
  if (DEBUG) {
    AVAILABLE_START = "2020-01-01";
  } else {
    AVAILABLE_START = `${START_YEAR}-${START_MONTH}-${START_DATE}`;
  }

  // Build the end date:
  const END_DATE_OBJ = new Date(END_TIMESTAMP);
  const END_MONTH = new String(END_DATE_OBJ.getMonth() + 1).padStart(2, "0");
  const END_DATE = new String(END_DATE_OBJ.getDate()).padStart(2, "0");
  const END_YEAR = new String(END_DATE_OBJ.getFullYear());
  let AVAILABLE_END;

  if (DEBUG) {
    AVAILABLE_END = "2025-01-01";
  } else {
    AVAILABLE_END = `${END_YEAR}-${END_MONTH}-${END_DATE}`;
  }

  const QUERY_PARAMS = encodeURI([
    `baseline_date:${AVAILABLE_START}..${AVAILABLE_END}`,
    `baseline_status:${baselineStatus}`
  ].join(" AND "));

  // Construct the fetch URL:
  const FETCH_URL = `https://api.webstatus.dev/v1/features?q=${QUERY_PARAMS}`;

  // If in debug mode, output the fetch URL to the console:
  if (DEBUG) {
    console.log(FETCH_URL);
  }

  // Fetch the data and get its JSON representation:
  const RESPONSE = await UrlFetchApp.fetch(FETCH_URL);
  const JSON_TEXT = RESPONSE.getContentText();
  const JSON_DATA = JSON.parse(JSON_TEXT).data;
  
  if (DEBUG) {
    console.log(JSON_DATA);
  }
  
  return JSON_DATA;
}

function htmlFromBaselineData(data, baselineStatus) {
  // Default to "newly" available features if the status string is incorrect:
  baselineStatus = baselineStatus !== "newly" && baselineStatus !== "widely" ? "newly" : baselineStatus;

  let featuresList = "<ul style=\"font-family: 'Google Sans';\">";

  for (const entry of data) {
    const featureName = entry.name;
    const featureId = entry.feature_id;
    let baselineDate;

    if (baselineStatus === "newly") {
      baselineDate = entry.baseline.low_date;
    } else if (baselineStatus === "widely") {
      baselineDate = entry.baseline.high_date;
    }

    const links = entry.spec.links;

    featuresList += "<li>";
    featuresList += `<strong><a href="https://webstatus.dev/features/${featureId}">${featureName}</a></strong> on <strong>${baselineDate}</strong>`;

    if (links.length) {
      featuresList += "<ul>";

      for (const { link } of links) {
        featuresList += "<li>";
        featuresList += `<a href="${link}">${link}</a>`;
        featuresList += "</li>";
      }

      featuresList += "</ul>";
    }

    featuresList += "</li>";
  }

  featuresList += "</ul>";

  return featuresList;
}