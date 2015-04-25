// For the page that shows all records


$(document).on('pageinit', "#allEntry", function(event) {

    var $count=0;
    var $numPerPage=20;
    $("menu-list").listview("refresh");
    // get total count of rows
    $.ajax({
        type: "GET",
        url: 'http://skora.it354.com/restserver/api/email/users/count/1/format/json',
        dataType: 'jsonp',
        success: function(data){
            $count=parseInt(data);

            // if there are more than 20 records, pagination component will be shown
            if($count > $numPerPage){
                $num = $count / $numPerPage;
                if($count % $numPerPage > 0){
                    $num += 1;
                }
                $("#pages").pagination({
                  total_pages: $num,
                  current_page: 1,
                  callback: function(event, page) {
                    $.ajax({
                        type: "GET",
                        url: 'http://skora.it354.com/restserver/api/email/users/page/'+page+'/format/json',
                        dataType: 'jsonp',
                        success: function(data){
                            var $results = "";
                            $results +=
                            '<table data-role="table" class="ui-responsive table-stroke ui-table ui-table-reflow" id="myall-table">';
                            $.each(data, function(index, val) {
                                $results +=
                                '<tr><td bgcolor="#cfe694"><b class="ui-table-cell-label">ID: Name</b>'+ data[index].id + ": " + data[index].fname + ' ' + data[index].lname + "</td>"
                                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Email</b>'+ data[index].email + "</td>"
                                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Zipcode</b>'+ data[index].zip + "</td></tr>";
                            });

                            $("#results-all").html("");
                            $("#results-all").html($results + "</table>");


                        },
                        error: function(){
                          alert("function called but failed");
                        }
                    });
                  }
                });
                
            }
        },
        error: function(){
          alert("function called but failed");
        }
    });

    // set first 20 records to the page
    $.ajax({
        type: "GET",
        url: 'http://skora.it354.com/restserver/api/email/users/page/1/format/json',
        dataType: 'jsonp',
        success: function(data){
            var $results = "";
            $results +=
            '<table data-role="table" class="ui-responsive table-stroke ui-table ui-table-reflow" id="myall-table">';
            $.each(data, function(index, val) {
                $results +=
                '<tr><td bgcolor="#cfe694"><b class="ui-table-cell-label">ID: Name</b>'+ data[index].id + ": " + data[index].fname + ' ' + data[index].lname + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Email</b>'+ data[index].email + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Zipcode</b>'+ data[index].zip + "</td></tr>";
            });

            $("#results-all").html($results + "</table>");

        },
        error: function(){
          alert("function called but failed");
        }
    });



});


// Search by id if the search by id button is clicked
$("#search-id-btn").click(function(){
    $.ajax({
        type: "GET",
        url: 'http://skora.it354.com/restserver/api/email/users/id/'+ $("#search-userid").val() +'/format/json',
        dataType: 'jsonp',
        success: function(data){

            $("#results-id").html(
                '<h4>One user found:</h4>'
                + '<table data-role="table" class="ui-responsive table-stroke ui-table ui-table-reflow" id="my-table">'
                + '<tr><td bgcolor="#cfe694"><b class="ui-table-cell-label">ID: Name</b>'+ data[0].id + ": " + data[0].fname + ' ' + data[0].lname + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Email</b>'+ data[0].email + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Zipcode</b>'+ data[0].zip + "</td>"
                + "</tr></table>"
                );

        },
        error: function(){
          alert("function called but failed");
        }
    });
});
// if user sends an enter key at the search text box, click event of #search-id-btn button is handled
$("#searchId").submit(function() {
    $("#search-id-btn").click();
    return false;
});


// Search by keyword if the search by keyword button is clicked
$("#search-key-btn").click(function(){
    $.ajax({
        type: "GET",
        url: 'http://skora.it354.com/restserver/api/email/users/search/'+ $("#search-key").val() +'/format/json',
        dataType: 'jsonp',
        success: function(data){
            var $results = "";
            $results +=
                '<h4>Users found:</h4>'
                + '<table data-role="table" class="ui-responsive table-stroke ui-table ui-table-reflow" id="mykey-table">';

            
            $.each(data, function(index, val) {
                $results +=
                '<tr><td bgcolor="#cfe694"><b class="ui-table-cell-label">ID: Name</b>'+ data[index].id + ": " + data[index].fname + ' ' + data[index].lname + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Email</b>'+ data[index].email + "</td>"
                + '<td bgcolor="#ffffff"><b class="ui-table-cell-label">Zipcode</b>'+ data[index].zip + "</td></tr>";
            });

            $("#results-key").html($results + "</table>");

        },
        error: function(){
          alert("function called but failed");
        }
    });
});
// if user sends an enter key at the search text box, click event of #search-key-btn button is handled
$("#searchKey").submit(function() {
    $("#search-key-btn").click();
    return false;
});


$("#newRec").ready(function() {
    $.ajax({
        type: "GET",
        url: 'http://skora.it354.com/restserver/api/email/users/max/1/format/json',
        dataType: 'jsonp',
        success: function(data){

            $num = data[0].id;
            $num++;

            $("#newRec #id").val($num);

        },
        xhrFields: {
    withCredentials: true
  },
        error: function(){
          alert("function called but failed");
        }
    });
});

$("#form-new-record").submit(function(){
    if (confirm("The following data will be added:\nID:" + $("#id").val() + " Name:" + $("#fname").val() +" "+$("#lname").val()+"\nEmail: "+$("#email").val()+"\nZip: "+ $("#zip").val()))
    {
        $.ajax({
            type: "POST",
            url: 'http://skora.it354.com/restserver/api/email/user',
            crossDomain: true,
            data: { 
            'id': $("#id").val(), 
            'fname': $("#fname").val(),
            'lname': $("#lname").val(),
            'email': $("#email").val(),
            'zip': $("#zip").val()
            },
            success: function(data){
              
            },
            error: function(){
              
            }
        });
    }
    else
    {
        return false;
    }
    

});

