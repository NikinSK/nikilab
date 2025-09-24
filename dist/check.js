"use strict";
/**
 * A simple utility to check for internet connectivity.
 */
/**
 * Checks for a basic online status using the browser's built-in navigator property.
 * This method is fast but not always reliable, as it may report 'online' even if
 * the network connection is limited or has no access to the internet.
 * @returns {boolean} True if the browser reports as online, otherwise false.
 */
function isOnline() {
    return navigator.onLine;
}
/**
 * Performs a more robust check by attempting to fetch a small, reliable resource.
 * This is more accurate than `navigator.onLine` as it verifies an actual
 * connection to an external resource.
 * @param {string} url The URL of a small, reliable resource to fetch.
 * @param {number} timeout The maximum time in milliseconds to wait for the fetch to complete.
 * @returns {Promise<boolean>} A promise that resolves to true if the fetch is successful, otherwise false.
 */
function checkInternetConnectivity(url = 'https://www.google.com/favicon.ico', timeout = 5000) {
    return new Promise((resolve) => {
        const controller = new AbortController();
        const id = setTimeout(() => {
            controller.abort();
            resolve(false); // Resolve with false on timeout
        }, timeout);
        fetch(url, { signal: controller.signal })
            .then(() => {
            clearTimeout(id);
            resolve(true);
        })
            .catch((error) => {
            // Log the error for debugging purposes.
            console.error('Internet connectivity check failed:', error);
            clearTimeout(id);
            resolve(false);
        });
    });
}
// Example usage
function runCheck() {
    console.log("--- Running Internet Connectivity Checks ---");
    // Method 1: Quick check using navigator.onLine
    const onlineStatus = isOnline();
    console.log(`Quick check (navigator.onLine): ${onlineStatus}`);
    // Method 2: Robust check by fetching a resource
    console.log(`Performing robust connectivity check...`);
    checkInternetConnectivity().then(isConnected => {
        console.log(`Robust check (fetch): ${isConnected}`);
        if (isConnected) {
            console.log("Internet connection is working!");
        }
        else {
            console.log("Could not connect to the internet.");
        }
    });
}
// Execute the check when the script loads.
runCheck();
