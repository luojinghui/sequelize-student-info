var initTable = function(data) {
    $('#tab').empty();
    $(function() {
        [].forEach.call(data, function(val) {
            $("<tr><th>" + val.id + "<th>" + val.student_name + "<th class=del" + " "+ "data-id=" + val.id + ">" + "delete"  + "</tr></th>").appendTo("#tab");
        })
    })
}
var displayInfo = function() {
    $.get("/getStudentNams", {}, function(data) {
        if(data.status === 200) {
            initTable(data.data);
        }
    });
}

$(function() {
    displayInfo();

    $("#tab").on("click",".del", function() {
        // var id = event.target.id;
        var id = $(this).data("id");
        // console.log(id);

        if (confirm("你确信要删除此条数据吗？")) {

            $.ajax({
                url: '/deleteStudnetName/' + id,
                type: 'delete',
                success:function() {
                    displayInfo();
                }
            })
        }
    })

    $("#button").on("click", function(event) {
        var name = $("#studentName").prop("value");

        $.post("/addStudentName", {
            name: name
        }, function() {
            displayInfo();
        })
    })
})
