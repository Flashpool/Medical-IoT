
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

  //  change_patient_data(patient_data[0].patientid)

}


fetch_patients_data();