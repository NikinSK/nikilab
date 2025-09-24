// A simple check using the built-in `navigator.onLine` property.
// This provides a quick but not always reliable indication of connectivity.
function isOnline(): boolean {
  return navigator.onLine;
}

// A more robust check that attempts to fetch a specific resource from the web.
// This is a more reliable way to determine if a working internet connection is available.
function checkInternetConnectivity(url: string = 'https://httpbin.org/get', timeout: number = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      console.error('Internet connectivity check failed: Timeout reached.');
      resolve(false);
    }, timeout);

    fetch(url, { mode: 'no-cors' })
      .then(() => {
        clearTimeout(timeoutId);
        resolve(true);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error('Internet connectivity check failed:', error);
        resolve(false);
      });
  });
}

// Function to run both checks and log the results to the console.
async function runCheck() {
  console.log('--- Running Internet Connectivity Checks ---');

  // Perform the quick check
  const quickResult = isOnline();
  console.log(`Quick check (navigator.onLine): ${quickResult}`);

  // Perform the robust check
  console.log('Performing robust connectivity check...');
  const robustResult = await checkInternetConnectivity();
  console.log(`Robust check (fetch): ${robustResult}`);

  // Final conclusion
  if (quickResult && robustResult) {
    console.log('Connection is working.');
  } else {
    console.log('Could not connect to the internet.');
  }
}

// Start the check when the page loads
window.addEventListener('load', runCheck);
