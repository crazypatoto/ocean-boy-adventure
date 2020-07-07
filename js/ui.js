//M.AutoInit();

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems);
//   });

$(document).ready(function () {
  $('select').formSelect();  //init selects

  $.getJSON("jsondata/jobs.json", function (jobs) {

    var jobSelect = $("#job-title-select");

    $.each(jobs, function(index, job) {
			jobSelect.append(`<option value=${job['id']}>${job['job_title']}</option>`);
		});    

    jobSelect.formSelect();  //init selects
  });


});