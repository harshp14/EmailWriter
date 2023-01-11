document.getElementById("engage").addEventListener("click", sendToBackground);

async function getCurrentTab() {
    let queryOptions = { active: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async  function sendToBackground() {
    let tab = await getCurrentTab()
    chrome.scripting.executeScript({
        args : [document.getElementById("tone").value],
        target: { tabId: tab.id },
        function: sendToGPT
    });
}

function sendToGPT(tone) {
    var pointsV = document.getElementsByClassName("Am")[0].textContent
    var topicV = document.getElementById(":fa").value
    var toneV = tone

    var output = "http://127.0.0.1:8001/userprompt:Write me an email. Topic: " + topicV + ", Tone: " + toneV + ", Key Points: " + pointsV;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", output, true);
    xhr.responseType = 'text'
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                let response = xhr.responseText
                document.getElementsByClassName("Am")[0].innerHTML = response
            }
        }
    };
}
