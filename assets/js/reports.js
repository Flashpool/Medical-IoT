
patient_data = [];

function fetch_patients_data() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/get/patientlist", true);
    // xhr.open("GET","./resources/crud.php",true);

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

    console.log(patients_data + ": " + patient_id);
    let patient_name = document.getElementById('p_name');
    patient_name.innerHTML = patients_data["patient_name"];

    let patient_prescription = document.getElementById('prescription');
    patient_prescription.setAttribute("src", patients_data["prescription"])

    let patient_reports = document.getElementById('reports');
    patient_reports.setAttribute("src", patients_data["reports"])

    // let patient_blood=document.getElementById('p_blood');
    // patient_blood.innerHTML=patients_data["blood_group"];


    // let patient_birth=document.getElementById('p_birth');
    // patient_birth.innerHTML=patients_data["dob"];


    // let patient_gender=document.getElementById('p_gender');
    // patient_gender.innerHTML=patients_data["gender"];


    // let patient_age=document.getElementById('p_age');
    // patient_age.innerHTML=patients_data["age"];


    // let patient_weight=document.getElementById('p_weight');
    // patient_weight.innerHTML=patients_data["weight"];


    // let patient_type=document.getElementById('p_type');
    // patient_type.innerHTML=patients_data["patient_type"];


    // let patient_bed=document.getElementById('p_bed');
    // patient_bed.innerHTML=patients_data["bed_id"];


    // let patient_reg_date=document.getElementById('p_reg_date');
    // patient_reg_date.innerHTML=patients_data["reg_date"];


    // let patient_image=document.getElementById('p_img');
    // patient_image.setAttribute("src",patients_data["profile_img"]);



}

fetch_patients_data();

