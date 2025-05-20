# 如何使用Tampermonkey脚本自动化和ChatGPT进行交互

本指南将介绍如何使用提供的Tampermonkey脚本自动从一个JSON文件中读取问题，并将这些问题自动输入到OpenAI的ChatGPT页面，以便您可以实现自动化问题处理。

## 前提条件
1. 安装Tampermonkey插件。Tampermonkey可以在[Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)或[Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)的插件市场免费下载。
2. 直接安装：https://greasyfork.org/en/scripts/536583-chatgpt-file-batch-sender-v0-6
3. 或者创建一个名为`ChatGPT File-Batch Sender`的新用户脚本，并将`index.js`文件中的代码复制粘贴到新的用户脚本中。

## 使用说明

### 1. 导入JSON文件
首先，点击页面右上角的浮动面板中的文件输入框，选择你的JSON文件。该文件的格式应为一个包含问题的数组，每个问题为一个JSON对象，其中包含一个名为`title`的键，其值为要提交的问题。例如：
```json
[
 {
   "id": 1,
   "title": "10 Essential Tips for a Balanced Diet and Better Health"
 },
 {
   "id": 2,
   "title": "Mental Health in the Modern World: Understanding Its Importance"
 },
 {
   "id": 3,
   "title": "Exploring the Benefits of Yoga for Mental Well-being"
 }
]
```

### 2. 设定通用提示（可选）
在面板的"Prompt 前缀"输入框中，您可以设置一个通用提示。这个提示将被添加到每个问题的前面，作为输入发送到ChatGPT。例如，如果您设置通用提示为"Please tell me "，并且您的问题是"Who invented the internet?"，那么发送到ChatGPT的最终输入将会是"Please tell me who invented the internet?"。

### 3. 设置间隔时间（可选）
在"间隔(s)"输入框中，您可以设定每个问题之间的间隔时间，单位为秒。这个时间是每个问题发送后，脚本等待的时间。如果不设置，默认为100秒。

### 4. 设置休息选项（可选）
在面板上，您可以看到一个复选框，标签为"自动休息"。如果您勾选了这个选项，那么脚本将在发送指定数量的问题后暂停一段时间再继续发送问题。您可以设置：

- 连续发送多少条后休息（默认为25条）
- 每次休息时长（默认为3小时，可以填写小数）

### 5. 开始发送问题
在设置完毕后，点击"开始"按钮，脚本将开始自动从您的JSON文件中读取问题，并按照您设定的选项将问题逐个发送到ChatGPT。

### 6. 查看进度
在面板的下方，有一个进度条显示当前发送的问题数量和总问题数量。您可以通过这个进度条来查看任务的进度。

## 面板功能
- **可折叠**：点击面板右上角的箭头可以折叠/展开面板
- **可拖动**：通过拖动面板顶部可以移动面板位置
- **可调整大小**：拖动面板右下角可以调整面板大小
- **主题适配**：自动适应ChatGPT的明/暗主题

## 注意事项
- 在重新加载或关闭页面前，请确保所有的问题已经发送完成，否则未发送的问题将丢失。
- 请确保在开始发送问题前，已经正确地选择了JSON文件并设置了所有选项。
- 脚本会自动保存您的设置和文件，下次打开页面时会自动恢复。
- 如果ChatGPT界面发生变化，可能会导致脚本无法正常工作，请等待脚本更新。

现在，你应该已经知道如何使用这个脚本来自动

化和ChatGPT的交互了。如果你有任何问题或遇到任何困难，欢迎随时提问。
