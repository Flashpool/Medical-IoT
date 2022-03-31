bed_data = [];
doctors_data = [];
patient_data = [];
disease_data = [];
vitals_data = [];
let fetch_patient_id = ""
function fetch_doctors_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/doctorList", true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            doctors_data = JSON.parse(this.responseText);
            console.log(doctors_data);
            create_doctor_dropdown(doctors_data);
        }
    }
    xhr.send();
}


function fetch_patients_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/patientlist", true);
    // xhr.open("GET","./resources/crud.php",true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            patient_data = JSON.parse(this.responseText);
            console.log(patient_data);
            // create_patient_cards(patient_data);
            create_vitals_card(patient_data)
            create_name_dropdown(patient_data);
        }
    }
    xhr.send();
}


function fetch_bed_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/bedList", true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            bed_data = JSON.parse(this.responseText);
            console.log(bed_data);
            create_bed_dropdown(bed_data);
        }
    }
    xhr.send();
}



function fetch_disease_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/diseaseList", true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 & this.status == 200) {
            disease_data = JSON.parse(this.responseText);
            console.log(disease_data);
            create_disease_dropdown(disease_data);
        }
    }
    xhr.send();
}


function create_bed_dropdown(data) {
    parent = document.getElementById("bedno")

    for (i = 0; i < data.length; i++) {
        let bed_option = document.createElement('option')
        bed_option.setAttribute("value", data[i].id);
        bed_option.innerHTML = data[i].bed_no;

        parent.appendChild(bed_option);
    }

}

function create_doctor_dropdown(data) {
    parent = document.getElementById("doctorname")

    for (i = 0; i < data.length; i++) {
        let doc_option = document.createElement('option')
        doc_option.setAttribute("value", data[i].id);
        doc_option.innerHTML = data[i].doctor_name;

        parent.appendChild(doc_option);
    }

}


function create_disease_dropdown(data) {
    parent = document.getElementById("patient_type")

    for (i = 0; i < data.length; i++) {
        let disease_option = document.createElement('option')
        disease_option.setAttribute("value", data[i].id);
        disease_option.innerHTML = data[i].disease_name;

        parent.appendChild(disease_option);
    }

}


function create_name_dropdown(data) {
    parent = document.getElementById("pname")

    for (i = 0; i < data.length; i++) {
        let name_option = document.createElement('option')
        name_option.setAttribute("value", data[i].id);
        name_option.innerHTML = data[i].patient_name;

        parent.appendChild(name_option);
    }

}


fetch_doctors_data();
fetch_patients_data();
fetch_bed_data();
fetch_disease_data();



function create_patient_cards(patients_data) {


    let parentcard = document.getElementById('parent_card');
    for (let i = 0; i < patients_data.length; i++) {

        let card = document.createElement('div');
        card.setAttribute("class", "col-xl-3 col-sm-6 mb-5");


        let card_shadow = document.createElement('div')
        card_shadow.setAttribute("class", "bg-white rounded shadow py-3 px-4")
        card_shadow.setAttribute("style", "padding:10px;")


        let patient_img = document.createElement('img')
        patient_img.setAttribute("class", "img-fluid rounded-circle mb-3 img-thumbnail shadow")
        patient_img.setAttribute("src", patients_data[i].profile_img)
        patient_img.setAttribute("width", "130")


        // card_shadow.appendChild(patient_img)

        let patient_name = document.createElement('h5')
        patient_name.setAttribute("class", "mb-0")
        patient_name.innerHTML = patients_data[i].patient_name;

        card_shadow.appendChild(patient_name);

        let patient_disease = document.createElement('span')
        patient_disease.setAttribute("class", "small text-uppercase text-muted")
        patient_disease.innerHTML = patients_data[i].patient_type;

        // card_shadow.appendChild(patient_disease);

        let patient_status_ul = document.createElement('ul')
        patient_status_ul.setAttribute("class", "parent-patient")

        let patient_temp_li = document.createElement('li')
        patient_temp_li.setAttribute("class", "patient-item")

        let patient_temp_value = document.createElement("span")
        patient_temp_value.setAttribute("id", "patient_temp_" + patients_data[i].id)
        patient_temp_value.innerHTML = "42"

        let patient_temp_title = document.createElement("p")
        patient_temp_title.innerHTML = "Temp"

        patient_temp_li.appendChild(patient_temp_value)
        patient_temp_li.appendChild(patient_temp_title)



        let patient_pulse_li = document.createElement('li')
        patient_pulse_li.setAttribute("class", "patient-item")

        let patient_pulse_value = document.createElement("span")
        patient_pulse_value.setAttribute("id", "patient_pulse_" + patients_data[i].id)
        patient_pulse_value.innerHTML = "72"

        let patient_pulse_title = document.createElement("p")
        patient_pulse_title.innerHTML = "Pulse"

        patient_pulse_li.appendChild(patient_pulse_value)
        patient_pulse_li.appendChild(patient_pulse_title)


        let patient_oxy_li = document.createElement('li')
        patient_oxy_li.setAttribute("class", "patient-item")

        let patient_oxy_value = document.createElement("span")
        patient_oxy_value.setAttribute("id", "patient_oxy_" + patients_data[i].id)
        patient_oxy_value.innerHTML = "99"

        let patient_oxy_title = document.createElement("p")
        patient_oxy_title.innerHTML = "Oxygen"

        patient_oxy_li.appendChild(patient_oxy_value)
        patient_oxy_li.appendChild(patient_oxy_title)





        patient_status_ul.appendChild(patient_temp_li)
        patient_status_ul.appendChild(patient_pulse_li)
        patient_status_ul.appendChild(patient_oxy_li)




        let patient_details_ul = document.createElement('ul')
        patient_details_ul.setAttribute("class", "patient-details")

        let patient_bed_li = document.createElement('li')


        let patient_bed_title = document.createElement("span")
        patient_bed_title.innerHTML = "Bed No :"

        let patient_bed_value = document.createElement("p")
        patient_bed_value.innerHTML = patients_data[i].bed_id

        patient_bed_li.appendChild(patient_bed_title)
        patient_bed_li.appendChild(patient_bed_value)


        let patient_gender_li = document.createElement('li')


        let patient_gender_title = document.createElement("span")
        patient_gender_title.innerHTML = "Sex : "
        let patient_gender_value = document.createElement("p")
        patient_gender_value.innerHTML = patients_data[i].gender

        patient_gender_li.appendChild(patient_gender_title)
        patient_gender_li.appendChild(patient_gender_value)



        let patient_reg_date_li = document.createElement('li')
        let patient_reg_date_title = document.createElement("span")
        patient_reg_date_title.innerHTML = "Add Date : "
        let patient_reg_date_value = document.createElement("p")
        patient_reg_date_value.innerHTML = patients_data[i].reg_date

        // patient_reg_date_li.appendChild(patient_reg_date_title)    
        // patient_reg_date_li.appendChild(patient_reg_date_value)



        let patient_age_li = document.createElement('li')


        let patient_age_title = document.createElement("span")
        patient_age_title.innerHTML = "Age : "
        let patient_age_value = document.createElement("p")
        patient_age_value.innerHTML = patients_data[i].age

        // patient_age_li.appendChild(patient_age_title)    
        // patient_age_li.appendChild(patient_age_value)

        let view_patient = document.createElement("a")
        view_patient.setAttribute("class", "view-btn")
        view_patient.setAttribute("href", "#demo-modal")
        view_patient.setAttribute("id", patient_data[i].id)
        // view_patient.setAttribute("onclick","change_patient_data(this.id)")
        view_patient.innerHTML = "Update"






        patient_details_ul.appendChild(patient_bed_li)
        patient_details_ul.appendChild(patient_gender_li)
        patient_details_ul.appendChild(patient_reg_date_li)
        patient_details_ul.appendChild(patient_age_li)
        patient_details_ul.appendChild(view_patient)

        card_shadow.appendChild(patient_status_ul)
        card_shadow.appendChild(patient_details_ul)





        card.appendChild(card_shadow);


        parentcard.appendChild(card);




    }
    //  change_patient_data(patient_data[0].id)
}

function change_patient_data(patient_id) {


    let patients_data = patient_data.find(element => element.id == patient_id);

    // console.log(patients_data + ": "+patient_id);
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
    patient_weight.innerHTML = patients_data["weight"];


    let patient_bmi = document.getElementById('p_bmi');
    patient_bmi.innerHTML = patients_data["bmi"];


    let patient_type = document.getElementById('p_type');
    patient_type.innerHTML = patients_data["patient_type"];


    let patient_bed = document.getElementById('p_bed');
    patient_bed.innerHTML = patients_data["bed_id"];


    let patient_reg_date = document.getElementById('p_reg_date');
    patient_reg_date.innerHTML = patients_data["reg_date"];

    let patient_address = document.getElementById('p_address');
    patient_address.innerHTML = patient_data["address"];

    let patient_contact = document.getElementById('p_contact');
    patient_contact.innerHTML = patient_data["contact_no"];

    // let patient_image=document.getElementById('p_img');
    // patient_image.setAttribute("src",patients_data["profile_img"]);

    // generate_patient_status(patient_id);

}

// fetch_patients_data();










function generate_patient_status() {



    const interval_status = setInterval(() => {

        temp_array = [];
        pulse_array = [];
        oxy_array = [];
        get_vitals_data(patient_data)
        for (i = 0; i < patient_data.length; i++) {
            // const temp_random = Math.round(Math.random() * 100);
            // const pulse_random = Math.round(Math.random() * 100);
            // const oxy_random = Math.round(Math.random() * 100);
            // fetch_patient_id=patient_data[i].id;
            // get_vitals_data()
            // const temp_random = Math.round(get_random_numbers(30, 36));
            // const pulse_random = Math.round(get_random_numbers(70, 75));
            // const oxy_random = Math.round(get_random_numbers(90, 100));
            patient_temperature = document.getElementById('patient_temp_' + patient_data[i].id)
            patient_pulse = document.getElementById('patient_pulse_' + patient_data[i].id)
            patient_oxygen = document.getElementById('patient_oxygen_' + patient_data[i].id)
            patient_action = document.getElementById('patient_action_' + patient_data[i].id)
            // temp_array.push(temp_random);
            // pulse_array.push(pulse_random);
            // oxy_array.push(oxy_random);
            // temp_array.push(vitals_data[0].temp);
            // pulse_array.push(vitals_data[0].pulse_rate);
            // oxy_array.push(vitals_data[0].oxygen);

            console.log(vitals_data)

            patient_temperature.innerHTML = vitals_data[i].temp;
            patient_pulse.innerHTML = vitals_data[i].pulse_rate;
            patient_oxygen.innerHTML = vitals_data[i].oxygen;
            patient_action.setAttribute("src", "./assets/img/" + vitals_data[i].movementicon + ".svg")

        }


        // for (j = 0; j < patient_data.length; j++) {
        //     patient_temperature = document.getElementById('patient_temp_' + patient_data[j].id)
        //     patient_pulse = document.getElementById('patient_pulse_' + patient_data[j].id)
        //     patient_oxygen = document.getElementById('patient_oxy_' + patient_data[j].id)

        //     patient_temperature.innerHTML = temp_array[j];
        //     patient_pulse.innerHTML = pulse_array[j];
        //     patient_oxygen.innerHTML = oxy_array[j];

        // }



    }, 1000);




}



function get_random_numbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



function generate_post_data() {
    console.log("Thujhe Post karna hai")

}

// // Get the modal
// var modal = document.getElementsByClassName("col-xl-3 col-sm-6 mb-5");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function create_vitals_card(data) {

    let card_parent = document.getElementById("parent_generate_card");

    for (i = 0; i < data.length; i++) {

        let p_card = document.createElement('div');
        p_card.setAttribute("class", "p_cards")

        let vitals_div = document.createElement('div')
        vitals_div.setAttribute("class", "vitals")


        let pulse_icon = document.createElement('i')
        pulse_icon.setAttribute("class", "fa fa-tint")
        pulse_icon.setAttribute("style", "color:#e94545;")

        let pulse_rate = document.createElement('span');
        pulse_rate.setAttribute("class", "vital_info");
        pulse_rate.setAttribute("id", "patient_pulse_" + data[i].id)
        pulse_rate.innerHTML = "--"


        let temp_icon = document.createElement('i')
        temp_icon.setAttribute("class", "fa fa-temperature-low")
        temp_icon.setAttribute("style", "color:#f1be32;")

        let temperature = document.createElement('span');
        temperature.setAttribute("class", "vital_info");
        temperature.setAttribute("id", "patient_temp_" + data[i].id)
        temperature.innerHTML = "--"

        let oxy_icon = document.createElement('i')
        oxy_icon.setAttribute("class", "fa fa-lungs")
        oxy_icon.setAttribute("style", "color:#329bf1;")

        let oxygen = document.createElement('span');
        oxygen.setAttribute("class", "vital_info");
        oxygen.setAttribute("id", "patient_oxygen_" + data[i].id)
        oxygen.innerHTML = "--"

        vitals_div.appendChild(pulse_icon);
        vitals_div.appendChild(pulse_rate);
        vitals_div.appendChild(temp_icon);
        vitals_div.appendChild(temperature);
        vitals_div.appendChild(oxy_icon);
        vitals_div.appendChild(oxygen);

        p_card.appendChild(vitals_div);

        let move_div = document.createElement('div')
        move_div.setAttribute("class", "movement")

        let movementicon = document.createElement('img')
        movementicon.setAttribute("class", "move");
        movementicon.setAttribute("id", "patient_action_" + data[i].id);
        movementicon.setAttribute("src", "./assets/img/walking.svg")

        move_div.appendChild(movementicon);

        p_card.appendChild(move_div);

        let clearfix = document.createElement('div')
        clearfix.setAttribute("class", "clearfix")

        p_card.appendChild(clearfix);

        let horizontal_line = document.createElement('hr')
        horizontal_line.setAttribute("class", "line")

        p_card.appendChild(horizontal_line);

        let card_content = document.createElement('div')
        card_content.setAttribute("class", "card_content")

        let name_patient = document.createElement('h3')
        name_patient.setAttribute("class", "name")
        name_patient.setAttribute("id", "name_patient" + data[i].id)
        name_patient.innerHTML = data[i].patient_name;

        let unique_id = document.createElement('h5')
        unique_id.setAttribute("class", "unique_id")
        unique_id.setAttribute("id", "")
        unique_id.innerHTML = data[i].id


        card_content.appendChild(name_patient);
        card_content.appendChild(unique_id);

        p_card.appendChild(card_content);

        // console.log(card_parent.innerHTML);

        card_parent.appendChild(p_card);


    }
    generate_patient_status();
}


// create_vitals_card();

function get_vitals_data(data) {
    vitals_data = [];
    let single_vitals_data = [];
    for (i = 0; i < data.length; i++) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/get/patient/vitals?id=" + data[i].id, true);

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 & this.status == 200) {
                single_vitals_data.push(this.responseText);

                // console.log(single_vitals_data)

            }
        }
        xhr.send();

    }
    vitals_data = JSON.parse(single_vitals_data)



}

function card_alert()
{
    
    if(pulse_random<=60 && pulse_random>=55)
    {
     
        let patient_alert=document.getElementsByClassName("p_cards")
        patient_alert.setAttribute("style","border-top: 1em solid red")


      }
      
}
card_alert()