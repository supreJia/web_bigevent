$(function () {
  let layer = layui.layer;
  // 工具方法
  // 1. 获取裁剪区
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };
  // 1.3 创建裁剪区域
  $image.cropper(options);

  //为上传按钮绑定点击事件

  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  //为文件选择框绑定change事件
  $("#file").on("change", function (e) {
    var filelist = e.target.files;
    if (filelist.length === 0) {
      return layer.msg("请选择照片");
    }
    // 1.3 有图片时，拿到fileList数组中的索引为0的那一张图片
    let file = filelist[0];
    // 如果说，面试问到如何优化签订的代码，提高代码执行效率
    // 1. 如果有多个地方都用到同一个对象下的某一个属性时，可以在公共作用域中将这个属性提取成一个变量，在这些都需要使用的地方都去访问这个变量即可

    // 1.4 图片文件转化为页面显示的路径呢？？？
    let imgUrl = URL.createObjectURL(file);
    // console.log(imgUrl);

    // 1.5 重新初始化裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //为确定按钮绑定点击事件
  $("#btnUpload").on('click', function () {
      //1：要拿到用户裁剪后的图片
      var dataURL = $image
      .cropper('getCroppedCanvas',{
      width: 100,
      height: 100
      })
      .toDataURL('image/png')

    //   2：调用接口，把头像上传到服务器
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data:{
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0 ) {
                return layer.msg('更换头像失败')
            }
            layer.msg('更换头像成功')
            window.parent.getUserInfo()
        }
    })
  })
});
