// getUserMedia が使えないとき
if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
    const err = new Error('getUserMedia()が使えないブラウザだよ');
    alert(`${err.name} ${err.message}`);
    throw err;
}

// 操作する画面エレメント変数定義
const $video = document.getElementById('video_area');  // 映像表示エリア

// カメラ許可を得たら、getUserMedia を使って映像を「映像表示エリア」に表示
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => $video.srcObject = stream)
    .catch(err => alert(`${err.name} ${err.message}`));