/*
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function isVersionGTE(version1, version2) {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);

  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0; // Treat missing parts as 0.
    const v2Part = v2Parts[i] || 0; // Treat missing parts as 0.

    if (v1Part > v2Part) {
      return true;
    } else if (v1Part < v2Part) {
      return false;
    }
    // If parts are equal, continue to the next part.
  }
  // If all parts are equal, the versions are equal.
  return true;
}

function getLargestVersion(version1, version2) {
  return isVersionGTE(version1, version2) ? version1 : version2;
}

function assignLargestVersions(baseSet, compareSet) {
  for (const browser of coreBrowsers) {
    baseSet[browser] = getLargestVersion(baseSet[browser], compareSet[browser]);
  }
}

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function toPercent(num) {
  return (Math.round(num * 10000) / 100).toFixed(1);
}

function stripLTEPrefix(dateString) {
  return dateString.charAt(0) === '≤' ? dateString.slice(1) : dateString;
}

function formatDate(dateString) {
  return new Date(
    [
      dateString.slice(0, 4),
      dateString.slice(4, 6),
      dateString.slice(6, 8),
    ].join('-')
  ).toLocaleDateString();
}

async function fetchJSON(url) {
  const response = await fetch(url);
  return await response.json();
}

async function fetchData(url) {
  const response = await fetch(url);
  return await response.text();
}

function parseData(data) {
  const rawLines = data.split('\n');

  const property = rawLines[1].match(/# (.+)/) && RegExp.$1;
  const dateRange = rawLines[3].match(/# (\d{8})\-(\d{8})/) && [
    RegExp.$1,
    RegExp.$2,
  ];

  const lines = rawLines.filter((l) => l.match(/^\w/));
  return {
    property,
    startDate: formatDate(dateRange[0]),
    endDate: formatDate(dateRange[1]),
    columns: Object.fromEntries(lines[0].split(/\t/).map((e, i) => [e, i])),
    rows: lines.slice(1).map((l) => l.split(/\t/)),
  };
}

function initBaselineYearBrowsers() {
  const WIDELY_AVAILABLE = 'Widely available';
  const NEWLY_AVAILABLE = 'Newly available';
  const initVersionSet = (b) => Object.fromEntries([...b].map((b) => [b, '0']));

  const data = {
    [WIDELY_AVAILABLE]: initVersionSet(coreBrowsers),
    [NEWLY_AVAILABLE]: initVersionSet(coreBrowsers),
    // Specific year data will be filled in next.
  };

  // Construct a mapping between years and the most-recent versions of all core browsers
  // that support all features that become Baseline in that year.
  for (const feature of Object.values(webFeatures.features)) {
    if (feature.status.baseline) {
      const today = new Date();
      const newlyAvailableDate = new Date(
        stripLTEPrefix(feature.status.baseline_low_date)
      );
      // Manually compute the "baseline_high_date" to catch cases where
      // the web-features data hasn't been updated yet.
      const widelyAvailableDate = new Date(newlyAvailableDate);
      widelyAvailableDate.setMonth(widelyAvailableDate.getMonth() + 30);

      const newlyAvailableYear = newlyAvailableDate.getUTCFullYear();
      if (newlyAvailableYear < today.getUTCFullYear()) {
        data[newlyAvailableYear] ??= initVersionSet(coreBrowsers);
        assignLargestVersions(data[newlyAvailableYear], feature.status.support);
      }

      if (toDateString(today) >= toDateString(widelyAvailableDate)) {
        assignLargestVersions(data[WIDELY_AVAILABLE], feature.status.support);
      } else {
        assignLargestVersions(data[NEWLY_AVAILABLE], feature.status.support);
      }
    }
  }
  return data;
}

function getBrowserData(browser, majorVersion, minorVersion) {
  if (allBrowsers[browser]?.releases[`${majorVersion}.${minorVersion}`]) {
    return {
      browser: browser,
      version: `${majorVersion}.${minorVersion}`,
      data: allBrowsers[browser].releases[`${majorVersion}.${minorVersion}`],
    };
  } else {
    return {
      browser: browser,
      version: majorVersion,
      data: allBrowsers[browser]?.releases[majorVersion],
    };
  }
}

function lookupBrowser(row, columns) {
  let browser = row[columns['Browser']];
  let browserVersion = row[columns['Browser version']];
  let device = row[columns['Device category']];
  let os = row[columns['Operating system']];
  let osVersion = row[columns['OS version']];

  let normalizedBrowser;
  let normalizedVersion;

  // All browsers on iOS are actually Safari, so ignore the browser version
  // and default to the iOS version instead as it's more accurate.
  if (os === 'iOS') {
    normalizedBrowser =
      browser === 'Safari (in-app)' ? 'webview_ios' : 'safari_ios';
    normalizedVersion = osVersion;
  } else {
    if (browser === 'Chrome' && device === 'desktop') {
      normalizedBrowser = 'chrome';
    }
    if (browser === 'Chrome' && device !== 'desktop') {
      normalizedBrowser = 'chrome_android';
    }
    if (browser === 'Edge') {
      normalizedBrowser = 'edge';
    }
    if (browser === 'Safari' && device === 'desktop') {
      normalizedBrowser = 'safari';
    }
    if (browser === 'Safari' && device !== 'desktop') {
      normalizedBrowser = 'safari_ios';
    }
    if (browser === 'Android Webview' && device !== 'desktop') {
      normalizedBrowser = 'webview_android';
    }
    if (browser === 'Firefox' && device === 'desktop') {
      normalizedBrowser = 'firefox';
    }
    if (browser === 'Firefox' && device !== 'desktop') {
      normalizedBrowser = 'firefox_android';
    }
    if (browser === 'Samsung Internet') {
      normalizedBrowser = 'samsunginternet_android';
    }
    // TODO: distinguish between YaBrowser for desktop and mobile
    if (browser === 'YaBrowser') {
      normalizedBrowser = 'ya_android';
    }
    if (browser === 'Opera' && device === 'desktop') {
      normalizedBrowser = 'opera';
    }
    if (browser === 'Opera' && device !== 'desktop') {
      normalizedBrowser = 'opera_android';
    }
    if (browser === 'UC Browser') {
      normalizedBrowser = 'uc_android';
    }
  }

  const [majorVersion, minorVersion] = (
    normalizedVersion ?? browserVersion
  ).split('.');
  return getBrowserData(normalizedBrowser, majorVersion, minorVersion);
}

function processData(rawData) {
  let baselineYearCounts = Object.fromEntries(
    Object.keys(baselineYearBrowsers).map((y) => [y, 0])
  );
  baselineYearCounts['Unknown'] = 0;

  const data = parseData(rawData);
  let total = 0;

  for (const row of data.rows) {
    const count = Number(row[data.columns['Active users']]);
    const match = lookupBrowser(row, data.columns);

    let {browser, version} = match;
    if (!coreBrowsers.has(browser) && allBrowsers[match.browser]?.upstream) {
      browser = allBrowsers[match.browser].upstream;
      version = match.data?.engine_version ?? match.version;
    }

    if (browser && version && match.data) {
      total += count;

      for (const [year, data] of Object.entries(baselineYearBrowsers)) {
        if (isVersionGTE(version, data[browser])) {
          baselineYearCounts[year] += count;
        }
      }
    } else {
      // Uncomment to debug which rows could not be matched.
      // console.log(row);
      baselineYearCounts['Unknown'] += count;
    }
  }

  document.getElementById('report-container').innerHTML = `
    <div class="Report">
      <p class="Report-meta">
        <strong>${data.property}</strong><br>${data.startDate} – ${data.endDate}
      </p>
      <table class="Report-table">
        <tr>
          <th>Baseline version</th>
          <th>% of users supporting</th>
        </tr>
        ${Object.keys(baselineYearCounts)
          .filter((i) => i !== 'Unknown')
          .map((year) => {
            const percent = toPercent(baselineYearCounts[year] / total);
            return `<tr ${year[0] === 'W' ? ' class="Report-break"' : ''}>
              <td>${year}</td>
              <td style="--percent: ${percent}%">${percent}%</td>
            </tr>`;
          })
          .join('')}
      </table>
    </div>
    <aside class="Note">
      <strong>Note:</strong> In this dataset,
      ${toPercent(baselineYearCounts['Unknown'] / total)}% of visitors had a
      browser or browser version that was not reported by Google Analytics.
      Since these may or may not have been compatible with various Baseline
      versions, they've been excluded from Baseline percentage calculations.
    </aside>
  `;

  const resultsSection = document.getElementById('report-section');

  if (resultsSection.hidden) {
    resultsSection.hidden = false;
  } else {
    // On second renders, show an animation so it's clear something changed.
    document
      .querySelector('#report-section')
      .animate([{backgroundColor: '#ffc'}, {backgroundColor: '#fff'}], {
        duration: 2000,
      });
  }

  resultsSection.scrollIntoView({behavior: 'smooth', block: 'start'});
}

const [bcdBrowsers, otherBrowsers, webFeatures] = await Promise.all([
  fetchJSON('https://unpkg.com/@mdn/browser-compat-data/data.json'),
  fetchJSON(
    'https://unpkg.com/baseline-browser-mapping/dist/data/downstream-browsers.json'
  ),
  fetchJSON('https://unpkg.com/web-features/data.json'),
]);

const allBrowsers = {...bcdBrowsers.browsers, ...otherBrowsers.browsers};
const coreBrowsers = new Set(Object.keys(webFeatures.browsers));
const baselineYearBrowsers = initBaselineYearBrowsers();

function handleImport(file) {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => processData(event.target.result));
  reader.readAsText(file);
}

document.getElementById('input').addEventListener('change', ({target}) => {
  if (target.files.length > 0) {
    handleImport(target.files[0]);
  }
});

// Add smooth scrolling anchor links.
document.addEventListener(
  'click',
  (e) => {
    if (e.target.nodeName.toLowerCase() === 'a') {
      const url = new URL(e.target.href);
      if (url.hash.startsWith('#') && url.origin === location.origin) {
        const targetElement = document.querySelector(url.hash);
        if (targetElement) {
          e.preventDefault();
          history.pushState({}, null, url.href);
          targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    }
  },
  true
);

const dropZone = document.getElementById('drop-zone');

// --- Prevent default browser behavior for drag events ---
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// --- Highlight drop zone when item is dragged over it ---
dropZone.addEventListener('dragenter', handleDragEnter);
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);

function handleDragEnter(e) {
  highlight(e);
}

function handleDragOver(e) {
  preventDefaults(e);
  highlight(e);
}

function handleDragLeave(e) {
  unhighlight(e);
}

function highlight(e) {
  dropZone.classList.add('Importer--active');
}

function unhighlight(e) {
  dropZone.classList.remove('Importer--active');
}

function handleDrop(e) {
  preventDefaults(e);
  unhighlight(e);
  console.log('DROP!');

  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length) {
    setTimeout(() => {
      handleImport(files[0]);
    }, 500);
  }
}
