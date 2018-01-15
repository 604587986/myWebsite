$(function () {

    //从内存中读取cid
    var cid = parseInt(sessionStorage.cid);
    //加载第一页评论
    loadEvalDetail(1);
    //为分页条超链接绑定事件
    $('.mypager').on('click','a', function (e) {
        e.preventDefault();
        var pn = $(this).attr('href');
        loadEvalDetail(pn);
    });
    //通过分页器加载课程(封装)
    function loadEvalDetail(pageNum) {
        $.ajax({
            type: 'post',
            url: 'data/eval_detail.php',
            data: {cid: cid,pageNum:pageNum},
            success: function (result) {
                var html = ``;
                for (var i = 0; i < result.data.length; i++) {
                    html += `<div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-user"></span>
                    <span>${result.data[i].uname}</span>
                </div>
                <div class="panel-body"><p>${result.data[i].content}</p>
                </div>
                <div class="panel-footer">发表于 <i class="etime">${result.data[i].etime}</i></div>
            </div>`;
                }

                if(result.pageNum>result.pageCount){
                    html = `<h3>没有更多啦！</h3>`
                }
                $('#course-detail').html(html);
                $('.course-title').html(result.cname);
                $('body,html').animate({scrollTop:0},500);

                //加载分页条
                var html = '';
                if (result.pageNum === 1) {
                    html += `
                     <li class="active"><a href="${result.pageNum}">${result.pageNum}</a></li>
                     <li><a href="${result.pageNum + 1}">${result.pageNum + 1}</a></li>
                     <li><a href="${result.pageNum + 2}">${result.pageNum + 2}</a></li>`;
                } else {
                    html += `
                     <li><a href="${result.pageNum - 1}">${result.pageNum - 1}</a></li>
                     <li class="active"><a href="${result.pageNum}">${result.pageNum}</a></li>
                     <li><a href="${result.pageNum + 1}">${result.pageNum + 1}</a></li>`;
                }

                $('.mypager').html(html);
                //修改时间格式
                var etime = document.getElementsByClassName('etime');
                for (var i = 0; i < etime.length; i++) {
                    var mytime = parseInt($(etime[i]).html());
                    var mydate = new Date(mytime);
                    var year = mydate.getFullYear();
                    var month = mydate.getMonth()+1;
                    var date = mydate.getDate();
                    var hour = mydate.getHours();
                    var minute = mydate.getMinutes();
                    if(hour<10){
                        hour = '0'+hour
                    }
                    if(minute<10){
                        minute = '0'+minute
                    }
                    $(etime[i]).html(`${year}/${month}/${date}--${hour}:${minute}`);
                }
            }
        });
    }


    //提交评论
    $('#evalBtn').click(function (e) {
        e.preventDefault();
        var data = $('#evaluate').val();
        if(data===''){
            $('.tip').html('内容不能为空').addClass('bg-warning');
        }else{$.ajax({
            type: 'post',
            url: 'data/add_evaluation.php',
            data: {content: data},
            error: function () {
                alert('发生了错误')
            },
            success: function (result) {
                if (result.code === "3") {
                    $('.tip').html(result.msg).addClass('bg-warning');
                } else if (result.code === "1") {
                    $('.tip').html(result.msg).addClass('bg-success');
                    location.reload();
                }
            }
        })}

    })
});