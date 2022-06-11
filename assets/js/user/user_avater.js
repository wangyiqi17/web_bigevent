$(function () {
    var $image = $("#image")
    const options = {
        aspectRatio: 1,
        preview: ".img-preview",
    }
    $image.cropper(options)


    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })


    $("#file").change((e) => {
        console.log(e);
        const fileLen = e.target.files.length
        if (fileLen === 0) return

        const file = e.target.files[0]
        const imgUrl = URL.createObjectURL(file)
        $image
          .cropper("destroy")
          .attr("src", imgUrl)
          .cropper(options)
    })

    $("#btnUpload").click(() => {
        const dataURL = $image
        .cropper("getCroppedCanvas", {
            width:100,
            height:100,
        })
        .toDataURL("image/png")

        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("上传失败")
                layer.msg("上传成功")
                window.parent.getUserInfo()
            }
        })
    })
})