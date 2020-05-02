// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
	'url': window.location.href, 
	'ticketNo': document.getElementsByClassName("chr-QuickDetailFormattedId-panelTitle")[0].innerHTML,
	'ticketName': document.getElementsByClassName("smb-TextInput-renderedText")[0].innerHTML
});
