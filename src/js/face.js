function processImage() {
    // 使うときは自分のものに書き換える
    var subscriptionKey = "Subscription Key";

    var uriBase =
        "https://<My Endpoint String>.com/face/v1.0/detect";

    // リクエストパラメーター
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // 画像表示
    var type = 'image/jpeg';
    var dataurl = capture_image.toDataURL(type);
    var bin = atob(dataurl.split(',')[1]);
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    var blob = new Blob([buffer.buffer], { type: type });

    // REST API呼び出し
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // ヘッダーリクエスト
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        processData: false,
        type: "POST",

        // ボディーリクエスト
        data: blob,
    })

        .done(function (data) {
            // フォーマットしたJSONを表示
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // エラーメッセージ
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
};