$(function () {

    //当页面加载完成后，异步加载课程列表
    loadcourse(1);
    //为分页条超链接绑定事件
    $('.mypager').on('click','a', function (e) {
        e.preventDefault();
        var pn = $(this).attr('href');
        loadcourse(pn);
    });
    //为每门课程绑定事件跳转到详情页
    $('#main').on('click', '.course-list', function (e) {
        e.preventDefault();
        var cid = $(this).attr('href');
        sessionStorage.cid = cid;
        location.href = 'course_detail.html'
    })

    //通过分页条加载课程（封装）
    function loadcourse(pageNum) {
        $.ajax({
            type: 'get',
            url: 'data/all_courses.php',
            data: {'pageNum':pageNum},
            success: function (result) {
                var html ='';
                for (var i = 0; i < result.data.length; i++) {
                    html += `<div class="col-xs-6 col-sm-3 col-md-2"><a href="${result.data[i].cid}"  class="course-list"><span>${result.data[i].cname}</span></a><div><span class="count">有${result.data[i].count}条评价</span></div></div>`;
                }
                if(result.pageNum>result.pageCount){
                    html = `<h3>没有更多啦！</h3>`
                }
                $('#all-courses').html(html);
                $('body,html').animate({scrollTop:0},500);
                //修改分页条
                var html ='';
                if(result.pageNum===1){
                    html += `
                     <li class="active"><a href="${result.pageNum}">${result.pageNum}</a></li>
                     <li><a href="${result.pageNum+1}">${result.pageNum+1}</a></li>
                     <li><a href="${result.pageNum+2}">${result.pageNum+2}</a></li>`;
                }else{
                    html += `
                     <li><a href="${result.pageNum-1}">${result.pageNum-1}</a></li>
                     <li class="active"><a href="${result.pageNum}">${result.pageNum}</a></li>
                     <li><a href="${result.pageNum+1}">${result.pageNum+1}</a></li>`;
                }

                $('.mypager').html(html);
            }
        })
    }
});