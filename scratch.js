let canvas = document.getElementById('cover');
let ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.width = 480;
canvas.height = 320;

// 初期のスクラッチレイヤーを描画
ctx.fillStyle = '#999'; // グレーのレイヤー
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 座標取得関数の更新
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function getTouchPos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
    return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function startDrawing(e) {
    isDrawing = true;
    var pos = getTouchPos(e);
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault(); // スクロールを防ぐ
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

//マウスイベントリスナー
canvas.addEventListener('mousemove', function(e) {
    if (!isDrawing) return;
    var pos = getMousePos(canvas, e);
    draw(pos);
});

//タッチイベントリスナー
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault(); // スクロールを防ぐ
    var pos = getTouchPos(canvas, e);
    draw(pos);
});

// スクラッチの進行度を追跡する変数
let scratchProgress = 0;
const scratchThreshold = 0.9; // 90%をしきい値とする

// スクラッチされた領域を計算する関数
function updateScratchProgress() {
    // ここにスクラッチされた領域の割合を計算するロジックを実装
    // 例: scratchProgress = calculateScratchProgress(ctx);

    // しきい値を超えたらモーダルを表示
    if (scratchProgress > scratchThreshold) {
        showModal();
    }
}

// モーダルを表示する関数
function showModal() {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = document.getElementById("selectedImage").src; // 選択された画像をモーダルに設定

    // モーダルを閉じる処理
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// 描画処理を行う関数
function draw(pos) {
    if (!isDrawing) return;
    var radius = 20; // 円の半径
    ctx.stroke();
    ctx.beginPath();

    // ctx.moveTo(pos.x, pos.y);
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out'; // 描画モードを変更
}

// イベントリスナーの追加（マウスイベント）
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', function(e) {
    if (!isDrawing) return;
    var pos = getMousePos(canvas, e);
    draw(pos);
});

// イベントリスナーの追加（タッチイベント）
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);
