$(function() {
    const form = layui.form;
    initEditor()
    // 获取文章分类
    const initCate = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg("初始化文章分类失败！");
                // 调用模板引擎，渲染分类的下拉菜单
                const htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                // 一定要记得调用 form.render() 方法 否则看不到页面的变化
                form.render("select");
            },
        });
    };

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    $('#coverFile').change((e) => {
        const fileLen = e.target.files.length
        if (fileLen === 0) return
        const file = e.target.files[0]
        const imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    let art_state = '已发布' 
    $('#btnSave2').click(() => {
        art_state = '草稿'
    })

    $("#form-pub").submit(function(e) {
        e.preventDefault()
        const fd = new FormData($(this)[0])
        fd.append("state", art_state)

        $image
        .cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        })
            .toBlob(function(blob) {
            fd.append('cover_img', blob)
            publishArticle(fd)
        })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/article/art_list.html'
                window.parent.change()
            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    initCate();
})