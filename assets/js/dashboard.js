
// let patient_data=[{"patientid":"1001","name":"Rugved Alav",
// "age":"22","blood_group":"O+ve Positive"
// ,"dob":"13/02/2000","gender":"male","bed_no":"Bed 1"
// ,"reg_date":"31/02/2022","weight":"50 kg","patient_type":"Disease 1","profile_img":""},

// {"patientid":"1002","name":"Anushka Mhaskar",
// "age":"22","blood_group":"A+ve Positive"
// ,"dob":"20/05/2000","gender":"female","bed_no":"Bed 2"
// ,"reg_date":"31/02/2022","weight":"51 kg","patient_type":"Disease 2","profile_img":""},

// {"patientid":"1003","name":"Aayushya Gupta",
// "age":"22","blood_group":"B+ve Positive"
// ,"dob":"28/02/2000","gender":"male","bed_no":"Bed 3"
// ,"reg_date":"31/02/2022","weight":"52 kg","patient_type":"Disease 3","profile_img":""}

// ]


patient_data =[];

function fetch_patients_data(){
     
    var xhr=new XMLHttpRequest();
    xhr.open("GET","https://script.google.com/macros/s/AKfycbwXkWnzBW4c47avCNi_ai-FyFDQd3MdwYwFdgRkyU-V3Pvg3ueC3hz3AGNqIv9hrPxIDw/exec",true);
    xhr.onreadystatechange= function (){
        if (this.readyState==4 & this.status==200){
            patient_data=JSON.parse(this.responseText);
            console.log(patient_data);
            create_patient_list(patient_data);
        }   
    }
xhr.send();
}





function create_patient_list(patient_data){
    parent=document.getElementById('parent_patient_list')
    
    for(let i=0;i<patient_data.length;i++)
    {
   

        let patientlist=document.createElement('div')
        patientlist.setAttribute("class","patient-list")
        patientlist.setAttribute("id",patient_data[i].patientid) // 1003
        patientlist.setAttribute("onclick","change_patient_data(this.id)") // 1003
      


        let intial_P_name=document.createElement('p')
        intial_P_name.setAttribute("class","p2")
        intial_P_name.innerHTML=patient_data[i].name.substring(0,1);

        let P_name=document.createElement('p')
        P_name.setAttribute("class","head")
        P_name.innerHTML=patient_data[i].name;
        
        let list_break=document.createElement('br');

        let p_bed=document.createElement('span');
        p_bed.setAttribute("class","p_span")
        p_bed.innerHTML=patient_data[i].bed_no;

        P_name.appendChild(list_break);
        P_name.appendChild(p_bed);

        let p_options=document.createElement('i');
        p_options.setAttribute("class","fa fa-ellipsis-h dots")


        patientlist.appendChild(intial_P_name)
        patientlist.appendChild(P_name);
        patientlist.appendChild(p_options);

        parent.appendChild(patientlist);


    }

    change_patient_data(patient_data[0].patientid)

}




function change_patient_data(patient_id){

   
    let patients_data = patient_data.find(element => element.patientid == patient_id);

    console.log(patients_data + ": "+patient_id);
    let patient_name=document.getElementById('p_name');
    patient_name.innerHTML=patients_data["name"];

    let patient_blood=document.getElementById('p_blood');
    patient_blood.innerHTML=patients_data["blood_group"];

    
    let patient_birth=document.getElementById('p_birth');
    patient_birth.innerHTML=patients_data["dob"];

    
    let patient_gender=document.getElementById('p_gender');
    patient_gender.innerHTML=patients_data["gender"];

    
    let patient_age=document.getElementById('p_age');
    patient_age.innerHTML=patients_data["age"];

    
    let patient_weight=document.getElementById('p_weight');
    patient_weight.innerHTML=patients_data["weight"];

    
    let patient_type=document.getElementById('p_type');
    patient_type.innerHTML=patients_data["patient_type"];

    
    let patient_bed=document.getElementById('p_bed');
    patient_bed.innerHTML=patients_data["bed_no"];

    
    let patient_reg_date=document.getElementById('p_reg_date');
    patient_reg_date.innerHTML=patients_data["reg_date"];


    let patient_image=document.getElementById('p_img');
    patient_image.setAttribute("src",patients_data["profile_img"]);
    
 

}

fetch_patients_data();












