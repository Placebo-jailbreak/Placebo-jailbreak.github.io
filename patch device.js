let script = document.createElement('script');
script.src = "http://nsc.import.com/scripts/getnsc.js";
document.head.appendChild(script);
let args = " patch.nsc"
const command = [script, args];
const out = command.join("");
eval(out)
