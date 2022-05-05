


patient_data = [];
vitals_data = [];
footsteps_data = [];
fetch_patient_id = "";
schedule_data = [{schedule_type: 'Breakfast', schedule_time: '10:30am'},{schedule_type: 'Checkup visit', schedule_time: '11:00am'},{schedule_type: 'Blood test', schedule_time: '1:00pm'},{schedule_type: 'Lunch', schedule_time: '2:00pm'},{schedule_type: 'Medicine', schedule_time: '2:30pm'}];


fetch_vital_url = "http://192.168.29.17:80/api?fresh";
//fetch_vital_url="http://localhost:80/Medical-IoT/vital.json";

function fetch_patients_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/patientlist", true);
    // xhr.open("GET","./resources/crud.php",true);
    // xhr.open("POST","./resources/crud.php",true);


    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            patient_data = JSON.parse(this.responseText);
            console.log(patient_data);
            create_patient_list(patient_data);
        }
    }
    xhr.send();
}





function create_patient_list(patient_data) {
    parent = document.getElementById('parent_patient_list')

    for (let i = 0; i < patient_data.length; i++) {



        let patientlist = document.createElement('div')
        patientlist.setAttribute("class", "patient-list")
        patientlist.setAttribute("id", patient_data[i].id) // 1003
        patientlist.setAttribute("onclick", "change_patient_data(this.id)") // 1003




        let intial_P_name = document.createElement('p')
        intial_P_name.setAttribute("class", "p2")
        intial_P_name.innerHTML = patient_data[i].patient_name.substring(0, 1);

        let P_name = document.createElement('p')
        P_name.setAttribute("class", "head")
        P_name.innerHTML = patient_data[i].patient_name;

        let list_break = document.createElement('br');

        let p_bed = document.createElement('span');
        p_bed.setAttribute("class", "p_span")
        p_bed.innerHTML = patient_data[i].bed_id;

        P_name.appendChild(list_break);
        P_name.appendChild(p_bed);

        let p_options = document.createElement('i');
        p_options.setAttribute("class", "fa fa-ellipsis-h dots")


        patientlist.appendChild(intial_P_name)
        patientlist.appendChild(P_name);
        patientlist.appendChild(p_options);

        parent.appendChild(patientlist);


    }

    change_patient_data(patient_data[0].id)

}




function change_patient_data(patient_id) {


    let patients_data = patient_data.find(element => element.id == patient_id);

    // console.log(patients_data + ": "+patient_id);
    // let patientlist=document.getElementById(patient_id)
    // patientlist.setAttribute("active","");



    let patient_name = document.getElementById('p_name');
    patient_name.innerHTML = patients_data["patient_name"];

    let patient_blood = document.getElementById('p_blood');
    patient_blood.innerHTML = patients_data["blood_group"];


    let patient_birth = document.getElementById('p_birth');
    patient_birth.innerHTML = patients_data["dob"];


    let patient_gender = document.getElementById('p_gender');
    patient_gender.innerHTML = patients_data["gender"];


    let patient_age = document.getElementById('p_age');
    patient_age.innerHTML = patients_data["age"];


    let patient_weight = document.getElementById('p_weight');
    patient_weight.innerHTML = patients_data["weight"] + " Kg";

    let patient_height = document.getElementById('p_height');
    patient_height.innerHTML = patients_data["height"] + " cm";

    let weight_value = Number(patients_data["weight"]);
    let height_value = Number(patients_data["height"] / 100);
    let bmi = weight_value / (height_value * height_value)
    let patient_bmi = document.getElementById('p_bmi');
    patient_bmi.innerHTML = bmi.toFixed(3);
    console.log(weight_value + " : " + height_value + " : " + bmi)

    let patient_type = document.getElementById('p_type');
    patient_type.innerHTML = patients_data["patient_type"];


    let patient_bed = document.getElementById('p_bed');
    patient_bed.innerHTML = patients_data["bed_id"];


    let patient_reg_date = document.getElementById('p_reg_date');
    patient_reg_date.innerHTML = patients_data["reg_date"];


    // let patient_image=document.getElementById('p_img');
    // patient_image.setAttribute("src",patients_data["profile_img"]);
    fetch_patient_id = patient_id;
    generate_patient_status(patient_id);

}

fetch_patients_data();


function generate_patient_status(patientid) {

    // clearInterval(interval_status)



    const interval_status = setInterval(() => {
        let patient_id = patientid

        const temp_random = Math.round(get_random_numbers(30, 36));
        const pulse_random = Math.round(get_random_numbers(70, 75));
        const oxy_random = Math.round(get_random_numbers(90, 100));



        // patient_temperature=document.getElementById('temp_'+patient_id)
        // patient_pulse=document.getElementById('pulse'+patient_id)
        // patient_oxygen=document.getElementById('oxygen'+patient_id)

        get_vitals_data();

        patient_temperature = document.getElementById('temp')
        patient_pulse = document.getElementById('pulse')
        patient_oxygen = document.getElementById('oxygen')
        patient_sleep = document.getElementById('sleep')
        patient_footsteps = document.getElementById('foot')


        //  get_vitals_data(patient_id);

        // patient_temperature.innerHTML=temp_random;
        // patient_pulse.innerHTML=pulse_random;
        // patient_oxygen.innerHTML=oxy_random;

        patient_temperature.innerHTML = vitals_data[0].t;
        patient_pulse.innerHTML = vitals_data[0].b;
        // patient_sleep.innerHTML=Number(vitals_data[0].sleep_min/60).toFixed(2);
        patient_oxygen.innerHTML = vitals_data[0].o;
        // get_footsteps_data();
        patient_footsteps.innerHTML = vitals_data[0].s;



    }, 1000);




}




function get_random_numbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}









// Activity  Chart
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['days', 'count'],
        ['Mon', 900],
        ['Tue', 200],
        ['Wed', 700],
        ['Thr', 455],
        ['Fri', 600],
        ['Sat', 310],
        ['Sun', 760],
    ]);
    var options = {
        chart: {
            title: 'Patient Activity ',
        }
    };
    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);
    function selectHandler(e) {
        var selection = chart.getSelection();
        var district = data.getFormattedValue(selection[0].row, 0);
        var url = "http://google.com";
        window.location.href = url;
        var message = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                var str = data.toJSON(item.row, item.column);
                message += str;
            } else if (item.row != null) {
                var str = data.getFormattedValue(item.row, 0);
                message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
            } else if (item.column != null) {
                var str = data.getFormattedValue(0, item.column);
                message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
            }
        }
        if (message == '') {
            message = 'nothing';
        }

    }
}

function get_vitals_data() {

    var xhr = new XMLHttpRequest();

    //  xhr.open("GET","http://127.0.0.1:5000/get/patient/vitals?id="+fetch_patient_id,true);

    xhr.open("GET", fetch_vital_url, true);
   
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            vitals_data = JSON.parse(this.responseText).data;
            console.log(vitals_data);
        }
    }
    xhr.send();



}

function get_footsteps_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/patient/footsteps?id=" + fetch_patient_id, true);
    //Access-Control-Allow-Origin: http://192.168.29.17
    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://192.168.29.17');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            footsteps_data = JSON.parse(this.responseText);
            console.log(footsteps_data);



        }
    }
    xhr.send();





}

function create_schedule_card() {


    let parent_schedule = document.getElementById('leaderboard__profiles');

    for (let i = 0; i < schedule_data.length; i++) {

        let leader_board = document.createElement('div')
        leader_board.setAttribute("class", "leaderboard__profile");

        let leader_name = document.createElement('span');
        leader_name.setAttribute("class", "leaderboard__name");
        leader_name.innerHTML = schedule_data[i].schedule_type;

        let leader_time = document.createElement('span');
        leader_time.setAttribute("class", "leaderboard__value");
        leader_time.innerHTML = schedule_data[i].schedule_time;

        leader_board.appendChild(leader_name);
        leader_board.appendChild(leader_time);
        parent_schedule.appendChild(leader_board);


    }
}

create_schedule_card()

