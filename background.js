chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status === 'complete' && tab.url.includes('watch')) {
        // if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
        }).then(() => {
            console.log("input injected");
        })
            .catch(err => console.log(err));
        // }
    }
});