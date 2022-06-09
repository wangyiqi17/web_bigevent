$(function () {
    $("#link_reg").click(() => {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").click(() => {
        $(".login-box").show()
        $(".reg-box").hide()
    })


    // 先引入 form 来自 layui
    const form = layui.form
    // 自定义校验规则
    form.verify({
        // 数组方式
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 函数方式
        repwd:(value) => {
            // 先获取密码框的值
            const pwd = $(".reg-box [name=password]").val();
            // console.log(pwd, value);
            // 判断两次密码是否一致
            if(pwd !== value) return "两次密码不一致";
        },
    })

     // 获取 layui 弹窗
    const layer = layui.layer;
    // 设置请求根路径
    // const baseUrl = "http://www.liulongbin.top:3007";

    // 监听表单提交事件，发送注册请求
    $("#form_reg").submit((e) => {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url:  "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg("注册成功")
                $("#link_login").click()
            },
        });
    })

    // 监听登录表单，发送登录请求
    $("#form_login").submit(function(e)  {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:  "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("登录成功！");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            },
        });
    });
})