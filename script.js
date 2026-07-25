function askAI() {

let question = document.getElementById("question").value;

if(question.trim()=="") return;

let chatBox = document.getElementById("chatBox");

chatBox.innerHTML += `
<div style="background:#dbeafe;padding:12px;margin:10px;border-radius:10px;text-align:right;">
<b>👤 आप:</b><br>${question}
</div>
`;

chatBox.innerHTML += `
<div style="background:#f3f4f6;padding:12px;margin:10px;border-radius:10px;text-align:left;">
<b>🤖 AI:</b><br>
मैं अभी डेमो मोड में हूँ।
</div>
`;

document.getElementById("question").value="";

chatBox.scrollTop=chatBox.scrollHeight;
localStorage.setItem("chatHistory", chatBox.innerHTML);
}
