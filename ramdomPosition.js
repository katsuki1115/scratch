var imageUrls = [
    'https://via.placeholder.com/100x100.png?text=1',
    'https://via.placeholder.com/100x100.png?text=2',
    'https://via.placeholder.com/100x100.png?text=3',
    'https://via.placeholder.com/100x100.png?text=4',
    'https://via.placeholder.com/100x100.png?text=5'
];

// var imageUrls = [
//     'img/image1.jpg',
//     'img/image2.jpg'
// ];

function getRandomPosition(index, gridRows, gridCols, container, totalImages) {
    var cellWidth = container.clientWidth / gridCols;
    var cellHeight = container.clientHeight / gridRows;

    var col = index % gridCols;
    var row = Math.floor(index / gridCols);

    var lastRowImages = totalImages % gridCols;
    var isLastRow = row === gridRows - 1 && lastRowImages !== 0;

    if (isLastRow) {
        cellWidth = container.clientWidth / lastRowImages; // 最後の行のセル幅を調整
        col = index % lastRowImages; // 最後の行の列インデックスを調整
    }

    var x = col * cellWidth + (Math.random() * (cellWidth - 100)); // 100 は画像の最大幅
    var y = row * cellHeight + (Math.random() * (cellHeight - 100)); // 100 は画像の最大高さ

    return { x: x, y: y };
}

function displayImages() {
    var container = document.getElementById('image-container');

    var gridCols = 3; // 列数は固定
    var gridRows = Math.ceil(imageUrls.length / gridCols); // 行数を動的に決定

    imageUrls.forEach(function(url, index) {
        var img = document.createElement('img');
        img.src = url;
        img.classList.add('random-image');
        img.onclick = function() { openModal(url); }; // クリックイベントを追加

        img.onload = function() {
            var position = getRandomPosition(index, gridRows, gridCols, container, imageUrls.length);
            console.log(position.x);
            img.style.left = position.x + 'px';
            img.style.top = position.y + 'px';
            container.appendChild(img);
        };
    });
}

window.onload = displayImages;