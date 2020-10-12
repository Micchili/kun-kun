// getUserMedia が使えないときは、『getUserMedia()が使えないブラウザだよ』と言ってね。
if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
    const err = new Error('getUserMedia()が使えないブラウザだよ');
    alert(`${err.name} ${err.message}`);
    throw err;
}

// 操作する画面エレメント変数定義します。
const $start = document.getElementById('start_btn');   // スタートボタン
const $video = document.getElementById('video_area');  // 映像表示エリア

// 「スタートボタン」を押下で、getUserMedia を使って映像を「映像表示エリア」に表示するよ。
$start.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => $video.srcObject = stream)
    .catch(err => alert(`${err.name} ${err.message}`));
}, false);