
// let len = 300;
// let url = new URL(window.location);
// let params = url.searchParams;
// if (Number.isInteger(params.get("len"))) {
// 	len = Math.max(1, Math.min(words.length, +params.get("len")));
// } else {
// 	params.set("len", len);
// 	url = url.toString();
// 	window.history.pushState({ path: url }, '', url);
// }

// picked = [];
// for (let i = 0; i < len; i++) {
// 	pick = Math.floor(Math.random() * words.length);
// 	picked.push(words[pick]);
// 	words[pick] = words[words.length - 1];
// 	words.pop();
// }
// document.getElementById("out").innerHTML = picked.join(",");


// document.getElementById("copy").onclick = function() {
// 	let out = document.getElementById("out");
// 	out.contentEditable = true;
// 	out.focus();
// 	let ok = document.execCommand('selectAll', false, null);
// 	ok = ok && document.execCommand("copy");
// 	let sel = (window.getSelection ? window.getSelection() : document.selection);
// 	sel.removeAllRanges && sel.removeAllRanges() || sel.empty && sel.empty();
// 	out.contentEditable = false;
// 	out.blur();
// 	document.getElementById("msg").innerHTML = ok ? (len + " words copied to clipboard") : "Copy Failed";
// }

const req = new XMLHttpRequest();
req.open("GET", "list.txt");
req.send();
req.onreadystatechange = () => {
	let words = req.responseText.trim().split("\n");
}