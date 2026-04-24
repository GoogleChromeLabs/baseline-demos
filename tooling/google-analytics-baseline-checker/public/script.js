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

const schema = {
  metric: {
    USERS: 'Active users',
  },
  dimension: {
    BROWSER: 'Browser',
    BROWSER_VERSION: 'Browser version',
    DEVICE_CATEGORY: 'Device category',
    OS: 'Operating system',
    OS_VERSION: 'OS version',
  },
};

function toPercent(num) {
  return (Math.round(num * 10000) / 100).toFixed(1);
}

function formatDate(dateString) {
  return new Date(
    Number(dateString.slice(0, 4)),
    Number(dateString.slice(4, 6) - 1),
    Number(dateString.slice(6, 8))
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

  if (lines[0].includes(',')) {
    const msg =
      `Oops! It looks like you're trying to import CVS ` +
      `instead of TSV. Re-export the data as TSV and try again.`;
    alert(msg);
    throw new Error(msg);
  }

  const columns = Object.fromEntries(
    lines[0].split(/\t/).map((e, i) => [e, i])
  );

  // Validate that all required dimensions and metrics are present;
  for (const type of Object.keys(schema)) {
    for (const column of Object.values(schema[type])) {
      if (!columns.hasOwnProperty(column)) {
        const msg =
          `Oops! The ${type} '${column}' was not found ` +
          `in the imported TSV data.`;
        alert(msg);
        throw new Error(msg);
      }
    }
  }

  return {
    property,
    columns,
    rows: lines.slice(1).map((l) => l.split(/\t/)),
    startDate: formatDate(dateRange[0]),
    endDate: formatDate(dateRange[1]),
  };
}

function lookupBrowser(row, columns) {
  let browser = row[columns[schema.dimension.BROWSER]];
  let browserVersion = row[columns[schema.dimension.BROWSER_VERSION]];
  let device = row[columns[schema.dimension.DEVICE_CATEGORY]];
  let os = row[columns[schema.dimension.OS]];
  let osVersion = row[columns[schema.dimension.OS_VERSION]];

  let normalizedBrowser;
  let normalizedVersion;

  // All browsers on iOS are actually Safari, so ignore the browser version
  // and default to the iOS version instead as it's more accurate.
  if (os === 'iOS') {
    normalizedBrowser = 'safari_ios';
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

  if (browserMapping[normalizedBrowser]?.[`${majorVersion}.${minorVersion}`]) {
    return {
      browser: normalizedBrowser,
      version: `${majorVersion}.${minorVersion}`,
      data: browserMapping[normalizedBrowser]?.[
        `${majorVersion}.${minorVersion}`
      ],
    };
  } else {
    return {
      browser: normalizedBrowser,
      version: majorVersion,
      data: browserMapping[normalizedBrowser]?.[majorVersion],
    };
  }
}

function processData(rawData) {
  // This only looks at Safari because Safari is a one of the Core baseline
  // browsers, so there couldn't have been a Baseline year without a Safari
  // release. Looking through all Browsers is unnecessary, and Safari has the
  // fewest number of releases, so it's fastest to iterate over.
  const baselineYears = Object.values(browserMapping.safari)
    .map((e) => e.year)
    .filter(Number);

  const minYear = Math.min(...baselineYears);
  const maxYear = Math.max(...baselineYears);

  // Initialize all Baseline target counts;
  const baselineTargetCounts = {};
  for (let i = minYear; i <= maxYear; i++) {
    baselineTargetCounts[i] = 0;
  }
  baselineTargetCounts['Widely Available'] = 0;
  baselineTargetCounts['Newly Available'] = 0;

  let unknownCount = 0;

  const data = parseData(rawData);
  let total = 0;

  for (const row of data.rows) {
    const count = Number(row[data.columns[schema.metric.USERS]]);
    const match = lookupBrowser(row, data.columns);

    if (match.browser && match.version && match.data) {
      total += count;

      for (const target of Object.keys(baselineTargetCounts)) {
        if (target === 'Newly Available') {
          if (match.data.supports === 'newly') {
            baselineTargetCounts[target] += count;
          }
        } else if (target === 'Widely Available') {
          if (
            match.data.supports === 'widely' ||
            match.data.supports === 'newly'
          ) {
            baselineTargetCounts[target] += count;
          }
        } else {
          if (target <= match.data.year) {
            baselineTargetCounts[target] += count;
          }
        }
      }
    } else {
      // Uncomment to debug which rows could not be matched.
      // console.log(row);
      unknownCount += count;
    }
  }

  document.getElementById('report-container').innerHTML = `
    <div class="Report">
      <p class="Report-meta">
        <strong>${data.property}</strong><br>${data.startDate} – ${data.endDate}
      </p>
      <table class="Report-table">
        <tr>
          <th>Baseline target</th>
          <th>% of users supporting</th>
        </tr>
        ${Object.keys(baselineTargetCounts)
          .map((year) => {
            const percent = toPercent(baselineTargetCounts[year] / total);
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
      ${toPercent(unknownCount / total)}% of visitors had a browser or browser
      version that was not reported by Google Analytics. Since these may or may
      not have been compatible with various Baseline targets, they've been
      excluded from Baseline percentage calculations.
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

const browserMapping = await fetchJSON(
  'https://web-platform-dx.github.io/baseline-browser-mapping/with_downstream/all_versions_object_with_supports.json'
);

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

document.getElementById('example-report').addEventListener('click', (event) => {
  event.preventDefault();
  fetchData('web-dev-baseline-export.tsv').then(processData);
});

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
