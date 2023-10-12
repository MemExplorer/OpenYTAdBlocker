// checks for ads
function hasAd()
{
    const adLookup = [
        ".video-ads", ".ytp-ad-module", ".ytp-ad-overlay-close-button", ".ytp-ad-text", ".ytp-ad-message-container", ".ytd-companion-slot-renderer", ".ytp-ad-player-overlay"
    ];

    for(let s of adLookup)
    {
        let queryList = document.querySelector(s);
        if (queryList)
            return true;
    }
    
    return false;
}

function logmsg()
{
    console.log("removed ad");
}

function removeDisplays(elementList)
{
    logmsg();
    for(let item of elementList)
        item.style.display = "none";
}

function clickBtns(elementList)
{
    logmsg();
    for(let item of elementList)
        item.click();
}

function removeChildren(elementList)
{
    logmsg();
    for(let item of elementList)
        item.parentNode.removeChild(item);
}

function removeAds()
{
    // hideable ads
    let adsList = document.querySelectorAll(".video-ads, .ytp-ad-module");
    if (adsList)
        removeDisplays(adsList);

    let sideAds = document.querySelectorAll(".style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement, .style-scope.ytd-item-section-renderer.sparkles-light-cta");
    if (sideAds)
        removeDisplays(sideAds);

    // ad buttons
    let closeButtonsList = document.querySelectorAll(".ytp-ad-overlay-close-button"); //todo: add ".ytp-ad-skip-button-modern"?
    if (closeButtonsList)
        clickBtns(closeButtonsList);

    let skipBtns = document.querySelector(".ytp-ad-text.ytp-ad-skip-button-text");
    if (skipBtns)
        clickBtns([skipBtns]);

    //hideable ads
    let incomingAd = document.querySelector(".ytp-ad-message-container");
    if (incomingAd)
        removeChildren([incomingAd]);

    let companionSlot = document.querySelector(".style-scope.ytd-companion-slot-renderer");
    if (companionSlot)
        removeChildren([companionSlot]);

    let ytHomeAds = document.querySelectorAll(".ytd-in-feed-ad-layout-renderer");
    if (ytHomeAds)
        removeChildren(ytHomeAds);

    //unskippable ad
    let playerOverlay = document.querySelector(".ytp-ad-player-overlay");
    let videoPlayer = document.querySelectorAll(".video-stream.html5-main-video");
    if (playerOverlay && videoPlayer)
    {
        console.log("removed unskippable ad");
        playerOverlay.style.visibility = "hidden";
        for (let item of videoPlayer) {
            if (item && item.duration) {
                item.currentTime = item.duration;
            }
        }
    }
}

// Our content observer to observe changes in website
const observer = new MutationObserver(() => {
    if(hasAd())
        removeAds();
});

// Start observing changes in the website when a video is being played
observer.observe(document.documentElement, { childList: true, subtree: true });