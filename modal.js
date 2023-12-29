function openModal(imageUrl) {
    var modal = document.getElementById('modal');
    var modalImage = document.getElementById('modal-image');
    modalImage.src = imageUrl;
    modalImage.classList.add('modal-bnr');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('modal');
    var modalImage = document.getElementById('modal-image');
    modalImage.classList.remove('modal-bnr');
    modal.style.display = 'none';
}

function imageClicked(event) {
    event.stopPropagation(); // 背景のクリックイベントの伝播を停止
    // 画像クリックイベント処理
    // これまでの画面を表示せず、新たにスクラッチ画面に遷移する
    // alert('画像がクリックされました！');
    document.getElementById("scratchScreen").style.display = "block";
}

document.getElementById("scratch").addEventListener("click", function() {
    document.getElementById("image-container").style.display = "none";
    // <img>タグを取得
    var imageElement = document.getElementById("randomImage");

    // 配列からランダムに画像を選択
    var randomImage = images[Math.floor(Math.random() * images.length)];

    // <img>タグのsrc属性を更新
    imageElement.src = randomImage;
    // スクラッチエリアを表示する
    scratchArea.style.display = "block";
    // 必要に応じてスクラッチの初期化処理をここに追加する
});

// 写真のファイル名を配列として定義
var images = [
    'img/image1.png'
    // 'image2.png',
    // 'image3.png',
    // 'image4.png',
    // 'image5.png'
];