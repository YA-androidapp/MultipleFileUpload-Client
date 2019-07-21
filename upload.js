// Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

document.body.onload = function()
{
    if (!window.File) { // 対応状況チェック
        document.getElementById('uploader').style.display = "none";
    }

    document.getElementById('drop').ondragover = function()
    {
        event.preventDefault();
    };

    document.getElementById('drop').ondrop = function()
    {
        event.preventDefault();
        onDrop(event);
    };
};

function onDrop(event) {
    var files = event.dataTransfer.files;
    for (var i=0; i<files.length; i++) {
        upload(files[i]);
    }
}
function getExtention(fileName) {
    var defaultExt = 'mp3';

    if (!fileName)
        return defaultExt;

    var fileNameArr = fileName.split(".");
    var len = fileNameArr.length;
    if (len === 0)
        return defaultExt;
    else
        return fileNameArr[len - 1];
}

function upload(f) {
    var fileType = getExtention(f.name);

    var reader = new FileReader();
    reader.onerror = function (e) {
        console.log(e)
    }
    if (f.type.match('audio/mpeg') || fileType == "mp3") {
        reader.onload = function (evt) {
            var form = new FormData();
            form.append("files[]", f);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/MultipleFileUpload-Client");
            xhr.onload = function (evt) {
                console.log('Complete.')
            }
            xhr.upload.addEventListener("progress", function (oEvent) {
                if (oEvent.lengthComputable) {
                    var percentComplete = oEvent.loaded / oEvent.total * 100;
                    console.log(percentComplete.toString() + "%");
                }
            }, false);
            xhr.send(form);
        }

        reader.readAsArrayBuffer(f)
    }
    console.log(f)
}