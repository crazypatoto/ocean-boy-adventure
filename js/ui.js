var $job_select = $("#job-title-select");
var $second_job_select = $("#second-job-title-select");

var jobjson;
var current_job_pri;
var current_job_sec = {
  id: 0,
  job_title: "",
  salary: 0,
  initial_health: 0,
  injury: -0,
  injury_trigger: 0
}

var month_count = 0;
var total_assets = 30000;
var current_health = 0;
var titles_salary = 0;
var sec_job_salary = 0;

$(document).ready(function () {
  $('select').formSelect();  //init selects

  $.getJSON("jsondata/jobs.json", function (jobs) {

    var jobSelect = $("#job-title-select");

    $.each(jobs, function (index, job) {
      jobSelect.append(`<option value=${job['id']}>${job['job_title']}</option>`);
    });

    jobSelect.formSelect();  //init selects

    jobjson = jobs;
  });


});

//https://css-tricks.com/dynamic-dropdowns/
$job_select.change(function () {

  current_job_pri = jobjson[$job_select.val() - 1];

  $("#salary").text(current_job_pri["salary"]);
  current_health = current_job_pri["initial_health"];
  $("#current_health").text(current_job_pri["initial_health"]);
  $("#job_injury").text(current_job_pri["injury"]);

  $second_job_select.empty();
  $second_job_select.append(`<option value=0>無</option>`);
  $.each(jobjson, function (index, job) {
    if (job['id'] != current_job_pri["id"]) {
      $second_job_select.append(`<option value=${job['id']}>${job['job_title']}</option>`);
    }
  });
  $second_job_select.formSelect();

});


$second_job_select.change(function () {

  current_job_sec = jobjson[$second_job_select.val() - 1];
  sec_job_salary = current_job_sec['salary'] / 2;
  UpdateUI(); 

});



$('#add_month_btn').click(function () {

  if ($("#job-title-select").val() != null) {
    month_count++;
    total_assets += current_job_pri['salary'] + titles_salary + sec_job_salary;
    current_health += current_job_pri['injury'];
    UpdateUI();
  } else {
    M.toast({ html: '請先選擇職業唷傻逼^^', classes: 'rounded' });
  }
});

$('.btn.add').click(function () {
  if (this.classList.contains("money")) {
    total_assets += parseInt($("#special_expenditure").val(), 10);
  }
  else if (this.classList.contains("health")) {
    current_health += parseInt($("#extra_health").val(), 10);
  }
  UpdateUI();
});

$('.btn.minus').click(function () {
  if (this.classList.contains("money")) {
    total_assets -= parseInt($("#special_expenditure").val(), 10);
  }
  else if (this.classList.contains("health")) {
    current_health -= parseInt($("#extra_health").val(), 10);
  }
  UpdateUI();
});

$("#title_count").bind('keyup mouseup', function () {
  titles_salary = 2000 * this.value / 5;
  UpdateUI();
});

function UpdateUI() {
  $('#months').text(month_count);
  $('#assets').text(total_assets);
  $('#current_health').text(current_health);

  $('#titles-salary').text(titles_salary);
  $('#sec-job-salary').text(sec_job_salary);
}

