const AI_BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbw08nYi2WnQkUDj66ni_JOEVW0fqMRjPAyAOBs8bJ0u1ApuQ6ixsj3LGg_rtKogpZvD/exec";


async function askAI() {

  const questionInput = document.getElementById("question");
  const chatBox = document.getElementById("chatBox");

  const question = questionInput.value.trim();

  if (question === "") {
    return;
  }

  chatBox.innerHTML += `
    <div style="
      background:#dbeafe;
      padding:12px;
      margin:10px 0;
      border-radius:10px;
      text-align:right;
    ">
      <b>आप:</b> ${escapeHTML(question)}
    </div>
  `;

  questionInput.value = "";

  chatBox.innerHTML += `
    <div id="aiTyping" style="
      background:#f3f4f6;
      padding:12px;
      margin:10px 0;
      border-radius:10px;
      text-align:left;
    ">
      <b>🤖 AI:</b> सोच रहा हूँ...
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch(AI_BACKEND_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        question: question
      })
    });

    const result = await response.json();

    const typingBox = document.getElementById("aiTyping");

    if (typingBox) {
      typingBox.remove();
    }

    if (result.success) {

      chatBox.innerHTML += `
        <div style="
          background:#f3f4f6;
          padding:12px;
          margin:10px 0;
          border-radius:10px;
          text-align:left;
        ">
          <b>🤖 AI:</b><br>
          ${formatAIResponse(result.answer)}
        </div>
      `;

    } else {

      chatBox.innerHTML += `
        <div style="
          background:#fee2e2;
          padding:12px;
          margin:10px 0;
          border-radius:10px;
          text-align:left;
        ">
          <b>❌ Error:</b><br>
          ${escapeHTML(result.error || "AI से जवाब नहीं मिला।")}
        </div>
      `;

    }

  } catch (error) {

    const typingBox = document.getElementById("aiTyping");

    if (typingBox) {
      typingBox.remove();
    }

    chatBox.innerHTML += `
      <div style="
        background:#fee2e2;
        padding:12px;
        margin:10px 0;
        border-radius:10px;
        text-align:left;
      ">
        <b>❌ Connection Error:</b><br>
        AI backend से connection नहीं हो पाया।
      </div>
    `;

    console.error(error);
  }

  localStorage.setItem("chatHistory", chatBox.innerHTML);

  chatBox.scrollTop = chatBox.scrollHeight;
}


function formatAIResponse(text) {

  return escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}


function escapeHTML(text) {

  const div = document.createElement("div");
  div.textContent = text;

  return div.innerHTML;
}


window.onload = function () {

  const chatBox = document.getElementById("chatBox");

  const savedChat = localStorage.getItem("chatHistory");

  if (savedChat && chatBox) {
    chatBox.innerHTML = savedChat;
  }

};
