$(function () {

    //异步加载课程列表
    $.ajax({
        type: 'get',
        url: 'data/12courses.php',
        success: function (result) {
            var html = '';
            for (var i = 0; i < result.length; i++) {
                html += `<div class="col-xs-6 col-sm-3 col-md-2"><a class="course-list" href="${result[i].cid}"><span>${result[i].cname}</span></a></div>`;
            }
            $('#12courses').html(html);

        }
    });
    //异步加载最新的评论
    $.ajax({
        type: 'get',
        url: 'data/latest_eval.php',
        success: function (result) {
            var html = '';
            for (var i = 0; i < result.length; i++) {
                html += `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-user"></span>
                    <span>${result[i].uname}</span>
                    <h4><span class="label label-warning">${result[i].cname}</span></h4>
                </div>
                <div class="panel-body"><p>${result[i].content}</p>
                </div>
                <div class="panel-footer">发表于 <i class="etime">${result[i].etime}</i></div>
            </div>`;
            }
            $('#latest-eval').html(html);
            //转化时间格式
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

    //给课程链接绑定事件异步加载详情并设置本地存储cid
    $('#main').on('click', '.course-list', function (e) {
        e.preventDefault();
        var cid = $(this).attr('href');
        sessionStorage.cid = cid;
        location.href = 'course_detail.html'
    })


});