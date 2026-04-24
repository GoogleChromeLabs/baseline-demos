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

let tokenClient;
let accessToken;

function initAuth() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: '1026410574114-eeif42b98jkibmalak6nmdrruasar17b.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    callback: (response) => {
      if (response.error !== undefined) {
        console.error('Auth error:', response);
        document.getElementById('auth-status').innerText = `Error: ${response.error}`;
        document.getElementById('auth-status').hidden = false;
        return;
      }
      accessToken = response.access_token;
      console.log('Token received:', accessToken);
      document.getElementById('auth-status').innerText = 'Connected to Google Analytics!';
      document.getElementById('auth-status').hidden = false;
      document.getElementById('auth-button').innerText = 'Connected';
      document.getElementById('auth-button').disabled = true;

      loadProperties();
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

async function loadProperties() {
  const statusEl = document.getElementById('auth-status');
  statusEl.innerText = 'Loading properties...';
  
  try {
    const accounts = await fetchAccounts();
    const selectEl = document.getElementById('property-select');
    selectEl.innerHTML = '<option value="">Select a GA property...</option>';
    
    for (const account of accounts) {
      const properties = await fetchProperties(account.name);
      for (const property of properties) {
        const option = document.createElement('option');
        option.value = property.name;
        option.innerText = `${account.displayName} > ${property.displayName}`;
        selectEl.appendChild(option);
      }
    }
    
    statusEl.innerText = 'Connected to Google Analytics!';
    selectEl.hidden = false;
    document.getElementById('date-range-select').hidden = false;
    document.getElementById('generate-report-button').hidden = false;
  } catch (error) {
    console.error('Error loading properties:', error);
    statusEl.innerText = `Error loading properties: ${error.message}`;
  }
}

async function fetchReportData(propertyId, days) {
  const statusEl = document.getElementById('auth-status');
  statusEl.innerText = 'Fetching report data...';
  
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  
  try {
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dimensions: [
          {"name": "browser"},
          {"name": "deviceCategory"},
          {"name": "operatingSystem"},
          {"name": "operatingSystemVersion"}
        ],
        metrics: [
          {"name": "activeUsers"}
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
    
    const data = await response.json();
    console.log('Report data received:', data);
    statusEl.innerText = 'Report data fetched successfully! Check console for details.';
    
  } catch (error) {
    console.error('Error fetching report data:', error);
    statusEl.innerText = `Error fetching report data: ${error.message}`;
  }
}

document.getElementById('auth-button').addEventListener('click', () => {
  if (!tokenClient) {
    initAuth();
  }
  tokenClient.requestAccessToken();
});

document.getElementById('generate-report-button').addEventListener('click', () => {
  const propertySelect = document.getElementById('property-select');
  const dateRangeSelect = document.getElementById('date-range-select');
  
  const propertyId = propertySelect.value;
  const days = parseInt(dateRangeSelect.value, 10);
  
  if (!propertyId) {
    alert('Please select a property first.');
    return;
  }
  
  fetchReportData(propertyId, days);
});
