// Global wordlist (populated by AJAX)
var words;

// List length option from query params
var len = 300;
let url = new URL(window.location);
let params = url.searchParams;
if (!isNaN(+params.get("len"))) {
	len = Math.max(1, +params.get("len"));
} else {
	// Set the query param if it doesn't already exist
	// so user knows it's an option / how to use it
	params.set("len", len);
	url = url.toString();
	// But don't reload page
	window.history.pushState({ path: url }, '', url);
}

// Copy function bound to copy button
document.getElementById("copy").onclick = function() {
	// Make wordlist the focus
	let out = document.getElementById("out");
	out.contentEditable = true;
	out.focus();
	// Select all and copy
	let ok = document.execCommand('selectAll', false, null) && document.execCommand("copy");
	// Deselect (multi-browser)
	let sel = (window.getSelection ? window.getSelection() : document.selection);
	sel.removeAllRanges && sel.removeAllRanges() || sel.empty && sel.empty();
	// Return wordlist to normal
	out.contentEditable = false;
	out.blur();
	// Status update
	let msg = document.getElementById("msg");
	let txt = ok ? (len + " words copied to clipboard") : "Copy Failed";
	if (msg.innerText === txt) {
		msg.style.fontWeight = (msg.style.fontWeight === "bold" ? "normal" : "bold");
	} else {
		msg.innerHTML = txt;
		msg.hidden = false;
	}
}

// Request for word list
const req = new XMLHttpRequest();
req.open("GET", "words.txt");
req.send();
req.onreadystatechange = () => {
	// Only process on done
	if (req.readyState !== 4) { return; }
	// Wordlist is newline separated
	words = req.responseText.trim().split("\n");
	// Pick `len` words from list
	let picked = [];
	len = Math.min(words.length, len);
	for (let i = 0; i < len; i++) {
		pick = Math.floor(Math.random() * words.length);
		picked.push(words[pick]);
		// Swap end to selected and then shrink array to prevent duplicates keep O(1)
		words[pick] = words[words.length - 1];
		words.pop();
	}
	// Display selected and enable copy
	document.getElementById("out").innerHTML = picked.join(",");
	document.getElementById("copy").hidden = false;
}