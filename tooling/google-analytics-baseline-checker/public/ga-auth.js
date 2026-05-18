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

import { schema, renderReport } from './script.js';

let tokenClient;
let accessToken;

function initAuth() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: '1026410574114-eeif42b98jkibmalak6nmdrruasar17b.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    callback: (response) => {
      const authSection = document.querySelector('.AuthSection');
      if (response.error !== undefined) {
        console.error('Auth error:', response);
        authSection.classList.add('has-error');
        document.getElementById('auth-status').innerText = `Error: ${response.error}`;
        return;
      }
      accessToken = response.access_token;
      console.log('Token received:', accessToken);
      authSection.classList.add('is-connected');
      document.getElementById('auth-status').innerText = 'Connected to Google Analytics!';

      loadAccounts();
    },
  });
}

async function fetchAccounts() {
  const response = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accounts', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to fetch accounts: ${response.status} ${errorData.error?.message || response.statusText}`);
  }
  const data = await response.json();
  return data.accounts || [];
}

async function fetchProperties(accountId) {
  const response = await fetch(`https://analyticsadmin.googleapis.com/v1alpha/properties?filter=parent:${accountId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to fetch properties for ${accountId}: ${response.status} ${errorData.error?.message || response.statusText}`);
  }
  const data = await response.json();
  return data.properties || [];
}

async function loadAccounts() {
  const statusEl = document.getElementById('auth-status');
  const authSection = document.querySelector('.AuthSection');

  authSection.classList.add('is-loading');
  statusEl.innerText = 'Loading accounts...';

  try {
    const accounts = await fetchAccounts();
    const accountListEl = document.getElementById('account-list');
    accountListEl.innerHTML = '';
    accountListEl.setAttribute('role', 'listbox');

    accounts.forEach(account => {
      const li = document.createElement('li');
      li.className = 'SelectorListItem';
      li.dataset.accountId = account.name;
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'option');
      li.innerHTML = `
        <span class="SelectorListItem-title">${account.displayName}</span>
        <span class="SelectorListItem-subtitle">${account.name}</span>
      `;
      const selectAccount = async () => {
        document.querySelectorAll('#account-list .SelectorListItem').forEach(el => {
          el.classList.remove('is-selected');
          el.setAttribute('aria-selected', 'false');
        });
        li.classList.add('is-selected');
        li.setAttribute('aria-selected', 'true');

        await loadProperties(account.name);
      };
      li.addEventListener('click', selectAccount);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAccount();
        }
      });
      accountListEl.appendChild(li);
    });

    authSection.classList.remove('is-loading');
    authSection.classList.add('has-properties');
    statusEl.innerText = 'Connected to Google Analytics!';

    setupSearch('account-search', 'account-list');

  } catch (error) {
    console.error('Error loading accounts:', error);
    authSection.classList.remove('is-loading');
    authSection.classList.add('has-error');
    statusEl.innerText = `Error loading accounts: ${error.message}`;
  }
}

async function loadProperties(accountId) {
  const propertyListEl = document.getElementById('property-list');
  propertyListEl.innerHTML = '<li>Loading properties...</li>';
  propertyListEl.setAttribute('role', 'listbox');

  try {
    const properties = await fetchProperties(accountId);
    propertyListEl.innerHTML = '';

    if (properties.length === 0) {
      propertyListEl.innerHTML = '<li>No properties found for this account.</li>';
      return;
    }

    properties.forEach(property => {
      const li = document.createElement('li');
      li.className = 'SelectorListItem';
      li.dataset.propertyId = property.name;
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'option');
      li.innerHTML = `
        <span class="SelectorListItem-title">${property.displayName}</span>
        <span class="SelectorListItem-subtitle">${property.name}</span>
      `;
      const selectProperty = () => {
        document.querySelectorAll('#property-list .SelectorListItem').forEach(el => {
          el.classList.remove('is-selected');
          el.setAttribute('aria-selected', 'false');
        });
        li.classList.add('is-selected');
        li.setAttribute('aria-selected', 'true');

        document.getElementById('selected-property-id').value = property.name;
      };
      li.addEventListener('click', selectProperty);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProperty();
        }
      });
      propertyListEl.appendChild(li);
    });

    setupSearch('property-search', 'property-list');

  } catch (error) {
    console.error('Error loading properties:', error);
    propertyListEl.innerHTML = `<li>Error loading properties: ${error.message}</li>`;
  }
}

function setupSearch(searchInputId, listId) {
  const searchInput = document.getElementById(searchInputId);
  const list = document.getElementById(listId);

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const items = list.getElementsByClassName('SelectorListItem');

    Array.from(items).forEach(item => {
      const titleEl = item.querySelector('.SelectorListItem-title');
      const subtitleEl = item.querySelector('.SelectorListItem-subtitle');
      const title = titleEl ? titleEl.innerText.toLowerCase() : '';
      const subtitle = subtitleEl ? subtitleEl.innerText.toLowerCase() : '';
      if (title.includes(filter) || subtitle.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

async function fetchReportData(propertyId, startDate, endDate) {
  const statusEl = document.getElementById('auth-status');
  const btn = document.getElementById('generate-report-button');

  if (btn) {
    btn.setAttribute('aria-disabled', 'true');
    btn.innerText = 'Loading...';
  }

  statusEl.innerText = 'Fetching report data...';

  try {
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dimensions: [
          { "name": "browser" },
          { "name": "browserVersion" },
          { "name": "deviceCategory" },
          { "name": "operatingSystem" },
          { "name": "operatingSystemVersion" }
        ],
        metrics: [
          { "name": "activeUsers" }
        ],
        dateRanges: [
          {
            "startDate": startDate,
            "endDate": endDate
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch report data: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Report data received:', responseData);
    statusEl.innerText = 'Report data fetched successfully!';

    const selectedEl = document.querySelector('#property-list .SelectorListItem.is-selected');
    const propertyDisplayName = selectedEl ? selectedEl.querySelector('.SelectorListItem-title').innerText : propertyId;

    const columns = {
      [schema.dimension.BROWSER]: 0,
      [schema.dimension.BROWSER_VERSION]: 1,
      [schema.dimension.DEVICE_CATEGORY]: 2,
      [schema.dimension.OS]: 3,
      [schema.dimension.OS_VERSION]: 4,
      [schema.metric.USERS]: 5,
    };

    const rows = (responseData.rows || []).map(row => [
      row.dimensionValues[0].value,
      row.dimensionValues[1].value,
      row.dimensionValues[2].value,
      row.dimensionValues[3].value,
      row.dimensionValues[4].value,
      row.metricValues[0].value,
    ]);

    const formatDateISO = (isoString) => {
      const [year, month, day] = isoString.split('-');
      return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString();
    };
    const startDateFormatted = formatDateISO(startDate);
    const endDateFormatted = formatDateISO(endDate);

    renderReport({
      property: propertyDisplayName,
      columns,
      rows,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    });

  } catch (error) {
    console.error('Error fetching report data:', error);
    statusEl.innerText = `Error fetching report data: ${error.message}`;
  } finally {
    if (btn) {
      btn.removeAttribute('aria-disabled');
      btn.innerText = 'Generate Report';
    }
  }
}

document.getElementById('auth-button').addEventListener('click', () => {
  if (!tokenClient) {
    initAuth();
  }
  tokenClient.requestAccessToken();
});

function signOut() {
  if (accessToken) {
    try {
      google.accounts.oauth2.revoke(accessToken, () => {
        console.log('Google Access Token revoked.');
      });
    } catch (e) {
      console.error('Error revoking token:', e);
    }
  }

  accessToken = null;

  const authSection = document.querySelector('.AuthSection');
  authSection.classList.remove('is-connected', 'has-properties', 'is-loading', 'has-error');

  // Clear status and lists
  document.getElementById('auth-status').innerText = '';
  document.getElementById('account-list').innerHTML = '';
  document.getElementById('property-list').innerHTML = '';

  // Clear selected property inputs/values
  document.getElementById('selected-property-id').value = '';
  document.getElementById('account-search').value = '';
  document.getElementById('property-search').value = '';

  // Hide report section
  document.getElementById('report-section').hidden = true;
  document.getElementById('report-container').innerHTML = '';
}

document.getElementById('signout-button').addEventListener('click', signOut);

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function setDefaultDates() {
  const endDateInput = document.getElementById('end-date-input');
  const startDateInput = document.getElementById('start-date-input');
  
  if (endDateInput && startDateInput) {
    const end = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const start = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
    
    const formattedEnd = formatLocalDate(end);
    const formattedStart = formatLocalDate(start);
    
    endDateInput.value = formattedEnd;
    startDateInput.value = formattedStart;
    
    endDateInput.max = formattedEnd;
    startDateInput.max = formattedEnd;
  }
}

// Set up date range select event listeners
const dateRangeSelect = document.getElementById('date-range-select');
const customDateContainer = document.getElementById('custom-date-container');
const datePickerError = document.getElementById('date-picker-error');

if (dateRangeSelect && customDateContainer) {
  dateRangeSelect.addEventListener('change', () => {
    if (dateRangeSelect.value === 'custom') {
      customDateContainer.hidden = false;
      setDefaultDates();
    } else {
      customDateContainer.hidden = true;
      if (datePickerError) {
        datePickerError.innerText = '';
        datePickerError.hidden = true;
      }
    }
  });

  const startDateInput = document.getElementById('start-date-input');
  const endDateInput = document.getElementById('end-date-input');

  if (startDateInput && endDateInput) {
    const clearOrValidateCustomDates = () => {
      const start = startDateInput.value;
      const end = endDateInput.value;

      if (start && end) {
        if (new Date(start) <= new Date(end)) {
          if (datePickerError) {
            datePickerError.innerText = '';
            datePickerError.hidden = true;
          }
        } else {
          if (datePickerError) {
            datePickerError.innerText = 'Start date cannot be after end date.';
            datePickerError.hidden = false;
          }
        }
      }
    };

    startDateInput.addEventListener('change', () => {
      if (startDateInput.value) {
        endDateInput.min = startDateInput.value;
      }
      clearOrValidateCustomDates();
    });
    endDateInput.addEventListener('change', () => {
      if (endDateInput.value) {
        startDateInput.max = endDateInput.value;
      }
      clearOrValidateCustomDates();
    });
  }
}

document.getElementById('generate-report-button').addEventListener('click', () => {
  const btn = document.getElementById('generate-report-button');
  if (btn && btn.getAttribute('aria-disabled') === 'true') {
    return;
  }

  // Clear existing date picker errors before starting validation
  if (datePickerError) {
    datePickerError.innerText = '';
    datePickerError.hidden = true;
  }

  const propertyId = document.getElementById('selected-property-id').value;
  if (!propertyId) {
    const selectorEl = document.getElementById('property-flow-selector');
    selectorEl.style.borderColor = '#ea4335';
    selectorEl.style.boxShadow = '0 0 0 2px rgba(234,67,53,0.2)';
    setTimeout(() => {
      selectorEl.style.borderColor = '';
      selectorEl.style.boxShadow = '';
    }, 2000);

    const statusEl = document.getElementById('auth-status');
    statusEl.innerText = 'Please select a Google Analytics property first.';
    statusEl.style.color = '#ea4335';
    setTimeout(() => {
      statusEl.innerText = 'Connected to Google Analytics!';
      statusEl.style.color = '';
    }, 3000);

    return;
  }

  let startDate, endDate;

  if (dateRangeSelect && dateRangeSelect.value === 'custom') {
    const startDateInput = document.getElementById('start-date-input');
    const endDateInput = document.getElementById('end-date-input');
    
    startDate = startDateInput ? startDateInput.value : '';
    endDate = endDateInput ? endDateInput.value : '';

    if (!startDate || !endDate) {
      if (datePickerError) {
        datePickerError.innerText = 'Please specify both start and end dates for the custom range.';
        datePickerError.hidden = false;
      }
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      if (datePickerError) {
        datePickerError.innerText = 'Start date cannot be after end date.';
        datePickerError.hidden = false;
      }
      return;
    }
  } else if (dateRangeSelect) {
    const days = parseInt(dateRangeSelect.value, 10);
    endDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  }

  fetchReportData(propertyId, startDate, endDate);
});
