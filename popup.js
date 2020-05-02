// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails) {

    if (pageDetails.url.includes('detail/userstory')) {
        document.getElementById('ticketNo').innerHTML = pageDetails.ticketNo;
        document.getElementById('ticketName').innerHTML = pageDetails.ticketName;
        var safeTicketName = pageDetails.ticketName.replace(/ /g, "-").toLowerCase();
        document.getElementById('branchName').innerHTML = pageDetails.ticketNo + '-' + safeTicketName;

        document.getElementById('notSupportedMessage').style.display = "none";
        document.getElementById("frmCreateBranch").style.visibility = "visible";
    } else {
        document.getElementById('notSupportedMessage').style.display = "block";
    }
}

// Global reference to the status display SPAN
var statusDisplay = null;
var COMPANY_ADDRESS = 'YOUR_COMPANY_BITBUCKET_ADDRESS'; // i.e git.edgeetech.com

// POST the data to the server using XMLHttpRequest
function createBranch() {
    // Cancel the form submit
    event.preventDefault();
    var win = window.open('https://' + COMPANY_ADDRESS +'/plugins/servlet/create-branch?branchName='
        + document.getElementById('branchName').innerHTML
        + '&branchType=Feature', '_blank');
    win.focus();
}

// When the popup HTML has loaded
window.addEventListener('load', function (evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('btnCreateBranch')
        .addEventListener('click', createBranch);
    // Get the event page
    chrome.runtime.getBackgroundPage(function (eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This
        // injects content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});