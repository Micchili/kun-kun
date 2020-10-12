// getUserMedia が使えないとき
if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
    const err = new Error('getUserMedia()が使えないブラウザだよ');
    alert(`${err.name} ${err.message}`);
    throw err;
}

// 操作する画面エレメント変数定義
const $start = document.getElementById('start_btn');
const $video = document.getElementById('video_area');  // 映像表示エリア

// カメラ許可を得たら、getUserMedia を使って映像を「映像表示エリア」に表示
$start.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => $video.srcObject = stream)
        .catch(err => alert(`${err.name} ${err.message}`));
}, false);


// 「静止画取得」ボタンが押されたら「<canvas id="capture_image">」に映像のコマ画像を表示します。
const btn = document.getElementById('shutter_btn');

function copyFrame() {
    var canvas_capture_image = document.getElementById('capture_image');
    var cci = canvas_capture_image.getContext('2d');
    var va = document.getElementById('video_area');

    canvas_capture_image.width = va.videoWidth;
    canvas_capture_image.height = va.videoHeight;
    cci.drawImage(va, 0, 0);

    processImage();
}