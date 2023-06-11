// グローバル変数
var textarea = document.querySelector('#memoArea'); // '#memoArea'というIDを持つ要素を選択、変数textareaに格納
var saveButton = document.querySelector('#saveButton'); // '#saveButton'というIDを持つ要素を選択、変数saveButtonに格納
var savedMemos = document.querySelector('#savedMemos'); // '#savedMemos'というIDを持つ要素を選択、変数savedMemosに格納

// saveButtonクリックイベントの処理を行う関数saveButtonClickedの定義
function saveButtonClicked() {
    var memo = textarea.value; // textareaの値を取得、変数memoに格納
    if(memo) { // memoが空でない場合の処理
        addMemoToSavedMemos(memo); // memoをsavedMemosに追加
        saveMemo(memo); // memoをローカルストレージに保存
        textarea.value = ''; // textareaをクリア
    }
}

// ノートの表示・非表示を切り替える関数toggleNoteの定義
function toggleNote() {
    var note = document.getElementById('note'); // 'note'というIDを持つ要素を選択、変数noteに格納
    var clickMe = document.getElementById('clickMe'); // 'clickMe'というIDを持つ要素を選択、変数clickMeに格納
    if (note.classList.contains('note-hidden')) { // noteが'note-hidden'クラスを持っている場合の処理
        note.classList.remove('note-hidden'); // 'note-hidden'クラスを削除
        note.classList.add('note-visible'); // 'note-visible'クラスを追加
        clickMe.style.display = 'none'; // clickMeを非表示
        while (savedMemos.firstChild) { // savedMemos内の既存メモを全て削除
            savedMemos.removeChild(savedMemos.firstChild);
        }
        saveButton.addEventListener('click', saveButtonClicked); // saveButtonのクリックイベントリスナーを追加
        var memos = JSON.parse(localStorage.getItem('memos')); // noteが表示状態の時、ローカルストレージからメモを読み込む
        if(memos) { // memosが存在する場合の処理
            memos.forEach(function(memo) { // 各memoに対して、addMemoToSavedMemosを実行
                addMemoToSavedMemos(memo);
            });
        }
    } else {
        note.classList.remove('note-visible'); // 'note-visible'クラスを削除
        note.classList.add('note-hidden'); // 'note-hidden'クラスを追加
        clickMe.style.display = 'block'; // clickMeを表示
        saveButton.removeEventListener('click', saveButtonClicked); // saveButtonからクリックイベントリスナーを削除
    }
}

// メモをローカルストレージに保存する関数saveMemoの定義
function saveMemo(memo) {
    var memos = JSON.parse(localStorage.getItem('memos')) || []; // ローカルストレージからメモを取得、もしくは新たな空配列を作成
    memos.push(memo); // memos配列に新たなmemoを追加
    localStorage.setItem('memos', JSON.stringify(memos)); // 更新したmemos配列をローカルストレージに保存
}

// メモをsavedMemos divに追加する関数addMemoToSavedMemosの定義
function addMemoToSavedMemos(memo) {
    var p = document.createElement('p'); // 'p'要素を作成、変数pに格納
    p.textContent = memo; // p要素のテキストコンテンツにmemoを設定
    p.className = 'memo'; // p要素に'class'属性を追加し、その値を'memo'に設定
    savedMemos.appendChild(p); // p要素をsavedMemosの子要素として追加
}

function clearLocalStorage() {
    var res = confirm("全データを消去して宜しいですか？")

    if(res == true) {
        localStorage.clear();
        location.reload();
    }
    else {
        alert("LocalStorageの削除をキャンセルしました。")
    }
    
}
