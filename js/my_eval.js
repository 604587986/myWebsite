$(function () {
    //异步加载我的第一页评论
    loadMyEval(1);
    //为分页条超链接绑定事件
    $('.mypager').on('click', 'a', function (e) {
        e.preventDefault();
        var pn = $(this).attr('href');
        loadMyEval(pn);
        $(window).scrollTop(0);
    });
    //封装加载评论函数
    function loadMyEval(pageNum) {
        $.ajax({
            type: 'get',
            url: 'data/my_eval.php',
            data:{pageNum:pageNum},
            error: function () {
                location.href = 'index.html'
            },
            success: function (result) {
                var html = '';
                for (var i = 0; i < result.data.length; i++) {
                    html += `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-user"></span>
                    <h4><span class="label label-warning">${result.data[i].cname}</span></h4>
                </div>
                <div class="panel-body"><p>${result.data[i].content}</p>
                </div>
                <div class="panel-footer">发表于 <i class="etime">${result.data[i].etime}</i>
                <a href="${result.data[i].eid}" id="delete-eval"><span class="label label-primary pull-right">删除</span></a></div>
            </div>`;
                }
                if(result.pageNum>result.pageCount){
                    html = `<h5>暂无更多评论</h5>`
                }
                $('#my-eval').html(html);
                $('body,html').animate({scrollTop:0},500);
                //转化时间格式
                var etime = document.getElementsByClassName('etime');
                for (var i = 0; i < etime.length; i++) {
                    var mytime = parseInt($(etime[i]).html());
                    var mydate = new Date(mytime);
                    var year = mydate.getFullYear();
                    var month = mydate.getMonth() + 1;
                    var date = mydate.getDate();
                    var hour = mydate.getHours();
                    var minute = mydate.getMinutes();
                    if (hour < 10) {
                        hour = '0' + hour
                    }
                    if (minute < 10) {
                        minute = '0' + minute
                    }
                    $(etime[i]).html(`${year}/${month}/${date}--${hour}:${minute}`);
                }
                //修改分页条
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


            }

        });
    };

    //删除评论
    $('#main').on('click','#delete-eval',function (e) {
        e.preventDefault();
        var eid = $(this).attr('href');
        var thisEval = $(this).parent().parent();
        console.log(thisEval);
        $.ajax({
            type:'post',
            url:'data/delete_evaluation.php',
            data:{eid:eid},
            success:function (result) {
                if(result.code==="1"){
                    thisEval.hide();
                }
            },
            error:function () {
                alert('error')
            }
        })
    })

});