// ==UserScript==
// @name         File Reader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Read a file and input its contents into an input field
// @author       You
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const panel = document.createElement("div");
  panel.style.position = "fixed";
  panel.style.top = "0";
  panel.style.right = "0";
  panel.style.backgroundColor = "white";
  panel.style.padding = "10px";
  panel.style.border = "1px solid black";
  panel.style.width = "100px"; // 控制面板的宽度
  panel.style.fontFamily = "'Arial', sans-serif"; // 设定字体
  document.body.appendChild(panel);

  // 在面板上添加文件输入元素
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.marginTop = "10px"; // 增加间距
  fileInput.style.width = "100%"; // 控制输入框的宽度
  panel.appendChild(fileInput);

  // 显示文件名的标签
  const fileNameLabel = document.createElement("span");
  fileNameLabel.style.display = "block"; // 使得每个元素占用一行
  fileNameLabel.style.marginTop = "10px"; // 增加间距
  panel.appendChild(fileNameLabel);

  // 在面板上添加输入元素以获取通用提示
  const promptLabel = document.createElement("span");
  promptLabel.textContent = "Prompt: ";
  promptLabel.style.display = "block"; // 使得每个元素占用一行
  panel.appendChild(promptLabel);
  const promptInput = document.createElement("input");
  promptInput.type = "text";
  promptInput.style.marginTop = "10px"; // 增加间距
  promptInput.style.width = "100%"; // 控制输入框的宽度
  panel.appendChild(promptInput);
  
  // 在面板上添加是否每25次发送后休息的复选框
  
  const restLabel = document.createElement("label");
  restLabel.textContent = "sleep after every 25 sends";
  restLabel.style.display = "block"; // 使得每个元素占用一行
  panel.appendChild(restLabel);

  const restCheckbox = document.createElement("input");
  restCheckbox.type = "checkbox";
  restCheckbox.style.marginTop = "10px"; // 增加间距
  panel.appendChild(restCheckbox);
  
  // 每次信息发送后，暂停时间输入
  const delayInput = document.createElement("input");
  delayInput.type = "number";
  delayInput.style.marginTop = "10px"; // 增加间距
  delayInput.style.width = "100%"; // 控制输入框的宽度
  delayInput.placeholder = "sleeptime(s)";
  panel.appendChild(delayInput);

  // 在面板上添加确认按钮
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "确认";
  confirmButton.style.marginTop = "10px"; // 增加间距
  confirmButton.style.width = "100%"; // 控制按钮的宽度
  panel.appendChild(confirmButton);

  // 在面板上添加任务完成进度的标签
  const progressBar = document.createElement("progress");
  progressBar.style.width = "100%"; // 控制进度条的宽度
  progressBar.style.marginTop = "10px"; // 增加间距
  progressBar.max = 1; // 最大值设为1（代表100%）
  panel.appendChild(progressBar);

  // 在面板上添加一个用于显示提示的 div 元素
  const alertDiv = document.createElement("div");
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.right = "10px";
  alertDiv.style.padding = "10px";
  alertDiv.style.backgroundColor = "red";
  alertDiv.style.color = "white";
  alertDiv.style.display = "none"; // 默认隐藏
  document.body.appendChild(alertDiv);

  // 创建一个函数用于显示提示
  function showAlert(message) {
    alertDiv.textContent = message;
    alertDiv.style.display = "block"; // 显示提示
    setTimeout(function () {
      alertDiv.style.display = "none"; // 3 秒后隐藏提示
    }, 3000);
  }

  // 当用户点击确认按钮时，开始执行操作
  confirmButton.addEventListener("click", function () {
    let fileContent;

    // 如果 localStorage 中存在文件
    if (localStorage.getItem("savedFile")) {
      // 从 localStorage 获取文件内容
      fileContent = localStorage.getItem("savedFile");
    } else {
      // 从文件输入框获取文件
      const file = fileInput.files[0];
      if (!file) {
        showAlert("请先选择文件");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        fileContent = e.target.result;
        handleFileContent(fileContent);
      };
      reader.readAsText(file);
      return;
    }

    handleFileContent(fileContent);
  });

  function handleFileContent(fileContent) {
    // 用 fileContent 进行后续操作...
    const jsonData = JSON.parse(fileContent);

    if (Array.isArray(jsonData)) {
      let messagesSent = 0;
      let messageCount = 0;

      // 在 handleFileContent 中，获取通用提示
      const prompt = promptInput.value || localStorage.getItem("prompt");
      localStorage.setItem("prompt", prompt);
      progressBar.max = jsonData.length; // 设置进度条的最大值

      function sendMessage() {
        if (messageCount >= jsonData.length) {
          //   taskProgressLabel.textContent = "Finish!"; // 更新任务进度标签的内容
          progressBar.value = jsonData.length; // 将进度条设为满值
          return;
        }

        const inputField = document.querySelector("#prompt-textarea");
        if (!inputField) {
          return;
        }
        const item = jsonData[messageCount++];
        //添加通用提示到消息的开头
        inputField.value = prompt  + item.title;
        // inputField.value = item.title;

        var inputEvent = new Event("input", { bubbles: true });
        inputField.dispatchEvent(inputEvent);

        setTimeout(function () {
          var submit_button = document.querySelector(
            "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > form > div > div.flex.flex-col.w-full.py-\\[10px\\].flex-grow.md\\:py-4.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50.dark\\:text-white.dark\\:bg-gray-700.rounded-xl.shadow-xs.dark\\:shadow-xs > button"
          );
          submit_button.click();
        }, 1000);

        var sleep_time = 100000 || delayInput.value * 1000;
        messagesSent++;

        // taskProgressLabel.textContent = `progress rate : ${messagesSent} / ${jsonData.length} `; // 更新任务进度标签的内容
        progressBar.value = messagesSent; // 更新进度条的值

        if (restCheckbox.checked && messagesSent >= 25) {
          // 如果用户选中了复选框，并且已经发送了25个消息，等待三小时再发送下一个
          setTimeout(sendMessage, 3 * 60 * 60 * 1000 - 25 * sleep_time);
          messagesSent = 0;
        } else {
          setTimeout(sendMessage, sleep_time);
        }
      }

      sendMessage();
    }
  }
  // 当文件改变时，更新标签中的文件名
  fileInput.addEventListener("change", function () {
    if (this.files && this.files.length) {
      fileNameLabel.textContent = this.files[0].name;
      // 将文件内容存储到 localStorage
      var reader = new FileReader();
      reader.onload = function (event) {
        localStorage.setItem("savedFile", event.target.result);
        localStorage.setItem("savedFileName", fileInput.files[0].name); // 存储文件名
      };
      reader.readAsText(this.files[0]);
    }
  });

  // 当页面加载时，尝试从 localStorage 恢复文件名
  window.addEventListener("load", function () {
    var savedFileName = localStorage.getItem("savedFileName");
    if (savedFileName) {
      fileNameLabel.textContent = savedFileName; // 更新标签中的文件名
    }
    var prompt = localStorage.getItem("prompt");
    if (prompt) {
        promptInput.value = prompt;
    }
  });
})();
