function askAI(){

let question=document.getElementById("question").value;

document.getElementById("answer").innerHTML=
"<b>आपने पूछा:</b><br>"+question+
"<br><br>अभी AI नहीं जोड़ा गया है।";

}
function startListening(){

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang="hi-IN";

recognition.start();

recognition.onresult=function(event){

document.getElementById("question").value=event.results[0][0].transcript;

};

}
