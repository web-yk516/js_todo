const taskList = document.getElementById('task-list');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const pendingCount = document.getElementById('pending-count');

function addTask() {
  // new-taskを取得
  const newTask = document.getElementById('new-task');
  // new-taskで入力された値を取得
  const task = newTask.value.trim();
  // taskが空ならreturn
  if (task === '') return;
  // createTaskElement関数を2つの引数とともに実行
  const taskItem = createTaskElement(task, false);
  // taskListにtaskItemを追加する
  taskList.appendChild(taskItem);
  // taskの入力欄を空にする
  newTask.value = '';
  // (タスク数を更新する)
  updateCounters();
}

function createTaskElement(text) {
  // タスクの表示されるclass名を作成
  const taskItem = document.createElement('div');
  taskItem.className = 'todo-item';

  // タスクの内容を表示
  const taskContent = document.createElement('div');
  taskContent.innerHTML = `<input type="checkbox" onclick="updateCounters()"> <span>${text}</span>`;
  // taskItemに追加
  taskItem.appendChild(taskContent);

  // タスクの編集、削除するclass名を作成
  const taskAction = document.createElement('div');
  taskAction.className = 'task-actions';

  // 編集ボタン作成
  const editButton = document.createElement('button');
  editButton.className = 'btn btn-secondary btn-sm';
  editButton.textContent = '編集';
  // 編集ボタンをクリックしたら編集できるようにする
  editButton.onclick = () => editTask(taskItem, editButton);
  taskAction.appendChild(editButton);

  // 削除ボタン作成
  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm';
  deleteButton.textContent = '削除';
  // 削除ボタンをクリックしたら削除する
  deleteButton.onclick = () => deleteTask(taskItem);
  taskAction.appendChild(deleteButton)

  // TaskItemにtaskActionを追加
  taskItem.appendChild(taskAction);
  // taskItemを返す
  return taskItem;
}

function editTask(taskItem, editButton) {
  // タスクのテキストを取得
  const currentText = taskItem.querySelector('span').textContent;
  // 編集フォームを表示
  taskItem.firstChild.innerHTML = `<input type="text" value="${currentText}"> <button class="btn btn-primary btn-sm" onclick="saveTask(this)">保存</button>`;
  // 編集ボタンをクリックできないようにする
  editButton.disabled = true;
}

function saveTask(saveButton) {
  // saveButtonの親要素を取得
  const taskContent = saveButton.parentElement;
  // 編集したテキストを取得
  const newText = taskContent.querySelector('input').value.trim();
  // 編集テキストが空ならreturnする
  if (newText === '') return;
  // HTML要素を作成
  taskContent.innerHTML = `<input type="checkbox" onclick="updateCounters()"> <span>${newText}</span>`;
  // 編集ボタンを押せるようにする
  taskContent.parentElement.querySelector('.task-actions button').disabled = false;
  // タスク数を更新する
  updateCounters();
}

function deleteTask(taskItem) {
  if (confirm('本当によろしいですか？')) {
    taskList.removeChild(taskItem);
    // タスク数を更新する
    updateCounters();
  }
}

function updateCounters() {
  // すべてのタスクを取得
  const tasks = document.querySelectorAll('.todo-item');
  // 完了済みタスクを取得
  const completedTasks = document.querySelectorAll('.todo-item input[type="checkbox"]:checked');
  // すべてのタスクをカウントする
  totalCount.textContent = tasks.length;
  // 完了済みタスクをカウントする
  completedCount.textContent = completedTasks.length;
  // 未完了のタスクをカウントする
  pendingCount.textContent = tasks.length - completedTasks.length;
}
