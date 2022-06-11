$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度不能超过6个字符";
        },
    });

    const layer = layui.layer;
    // 初始化用户信息
    const initUserInfo = () => {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: (res) => {
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        // layer.msg("获取用户信息成功！")
        console.log(res);
        form.val("formUserInfo", res.data)
        },
    });
    };

    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserInfo()
    })

    // 更新用户数据
    $(".layui-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新用户信息失败！");
                layer.msg("更新用户信息成功！");
                // 调用父页面渲染函数
                window.parent.getUserInfo();
            },
        });
    });


    initUserInfo();
})