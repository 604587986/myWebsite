$(function () {
    //加载搜索到的课程
    var course = sessionStorage.course;
    $.ajax({
        type: 'get',
        url: 'data/course_search.php',
        data: {course: course},
        success: function (result) {
            var html = ``;
            for (var i = 0; i < result.length; i++) {
                html += `<tr>
            <td>${result[i].cid}</td>
            <td>${result[i].cname}</td>
            <td>${result[i].count}</td>
        </tr>`;
            }
            $('#search-detail').html(html);
        }
    });

    //点击课程跳转
    $('#search-detail').on('click','tr',function () {
        var cid = $(this).children().first().html();
        sessionStorage.cid = cid;
        location.href = 'course_detail.html'
    })
});