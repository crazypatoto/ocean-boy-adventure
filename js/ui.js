//M.AutoInit();
var jobjson;
var currentjob;

$(document).ready(function () {
  $('select').formSelect();  //init selects


  $.getJSON("jsondata/jobs.json", function (jobs) {

    var jobSelect = $("#job-title-select");

    $.each(jobs, function(index, job) {
			jobSelect.append(`<option value=${job['id']}>${job['job_title']}</option>`);
		});    

    jobSelect.formSelect();  //init selects

    jobjson = jobs;
  });


});

$("#job-title-select").change( function () {

  var jobselect = $(this);
  var instance = M.FormSelect.getInstance(jobselect);

  $("#salary").text(jobjson[jobselect.val()-1]["salary"]);
  $("#blood").text(jobjson[jobselect.val()-1]["initial_health"]);
  $("#job_injury").text(jobjson[jobselect.val()-1]["injury"]);
  

});




