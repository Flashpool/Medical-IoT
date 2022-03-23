bed_data=[];
doctors_data =[];
patient_data =[];

function fetch_doctors_data(){
     
    var xhr=new XMLHttpRequest();
    xhr.open("GET","http://127.0.0.1:5000/get/doctorList",true);

    xhr.onreadystatechange= function (){
        if (this.readyState==4 & this.status==200){
            doctors_data=JSON.parse(this.responseText);
            console.log(doctors_data);
            create_doctor_dropdown(doctors_data);
        }   
    }
xhr.send();
}


function fetch_patients_data(){
     
    var xhr=new XMLHttpRequest();
    xhr.open("GET","http://127.0.0.1:5000/get/patientlist",true);

    xhr.onreadystatechange= function (){
        if (this.readyState==4 & this.status==200){
            patient_data=JSON.parse(this.responseText);
            console.log(patient_data);
            create_patient_cards(patient_data);
        }   
    }
xhr.send();
}


function fetch_bed_data(){
     
    var xhr=new XMLHttpRequest();
    xhr.open("GET","http://127.0.0.1:5000/get/bedList",true);

    xhr.onreadystatechange= function (){
        if (this.readyState==4 & this.status==200){
            bed_data=JSON.parse(this.responseText);
            console.log(bed_data);
            create_bed_dropdown(bed_data);
        }   
    }
xhr.send();
}


function create_bed_dropdown(data)
{
parent=document.getElementById("bedno")

for(i=0;i<data.length;i++)
{
  let  bed_option=document.createElement('option')
  bed_option.setAttribute("value",data[i].id);
  bed_option.innerHTML=data[i].bed_no;

  parent.appendChild(bed_option);
}

}

function create_doctor_dropdown(data)
{
parent=document.getElementById("doctorname")

for(i=0;i<data.length;i++)
{
  let  doc_option=document.createElement('option')
  doc_option.setAttribute("value",data[i].id);
  doc_option.innerHTML=data[i].doctor_name;

  parent.appendChild(doc_option);
}

}
fetch_doctors_data();
fetch_patients_data();
fetch_bed_data();


function create_patient_cards(patients_data){

console.log("after "+patients_data[0].patient_name)

 parentcard=document.getElementById('parent_card')
 for(let i=0;i<patients_data.length;i++)
     {

        let card=document.createElement('div')
        card.setAttribute("class","col-xl-3 col-sm-6 mb-5")

        let card_shadow=document.createElement('div')
        card_shadow.setAttribute("class","bg-white rounded shadow py-3 px-4")

            let patient_img=document.createElement('img')
            patient_img.setAttribute("class","img-fluid rounded-circle mb-3 img-thumbnail shadow")
            patient_img.setAttribute("src",patients_data[i].profile_img)
            patient_img.setAttribute("width","130")
            // patient_img.setAttribute("height","250")
            
            card_shadow.appendChild(patient_img)

            let patient_name=document.createElement('h5')
            patient_name.setAttribute("class","mb-0")
            patient_name.innerHTML=patients_data[i].patient_name;

            card_shadow.appendChild(patient_name);

            let patient_disease=document.createElement('span')
            patient_disease.setAttribute("class","small text-uppercase text-muted")
            patient_disease.innerHTML=patients_data[i].patient_type;

            card_shadow.appendChild(patient_disease);

            let patient_status_ul=document.createElement('ul')
            patient_status_ul.setAttribute("class","parent-patient")

                let patient_temp_li=document.createElement('li')
                patient_temp_li.setAttribute("class","patient-item")

                    let patient_temp_value=document.createElement("span")
                    patient_temp_value.setAttribute("id","patient_temp_"+patients_data[i].id)
                    patient_temp_value.innerHTML="42"

                    let patient_temp_title=document.createElement("p")
                    patient_temp_title.innerHTML="Temp"

                patient_temp_li.appendChild(patient_temp_value)    
                patient_temp_li.appendChild(patient_temp_title)



                let patient_pulse_li=document.createElement('li')
                patient_pulse_li.setAttribute("class","patient-item")

                    let patient_pulse_value=document.createElement("span")
                    patient_pulse_value.setAttribute("id","patient_pulse_"+patients_data[i].id)
                    patient_pulse_value.innerHTML="72"

                    let patient_pulse_title=document.createElement("p")
                    patient_pulse_title.innerHTML="Pulse"

                patient_pulse_li.appendChild(patient_pulse_value)    
                patient_pulse_li.appendChild(patient_pulse_title)


                let patient_oxy_li=document.createElement('li')
                patient_oxy_li.setAttribute("class","patient-item")

                    let patient_oxy_value=document.createElement("span")
                    patient_oxy_value.setAttribute("id","patient_oxy_"+patients_data[i].id)
                    patient_oxy_value.innerHTML="99"

                    let patient_oxy_title=document.createElement("p")
                    patient_oxy_title.innerHTML="Oxygen"

                patient_oxy_li.appendChild(patient_oxy_value)    
                patient_oxy_li.appendChild(patient_oxy_title)




            
            patient_status_ul.appendChild(patient_temp_li)
            patient_status_ul.appendChild(patient_pulse_li)
            patient_status_ul.appendChild(patient_oxy_li)




            let patient_details_ul=document.createElement('ul')
            patient_details_ul.setAttribute("class","patient-details")

                let patient_bed_li=document.createElement('li')
        

                    let patient_bed_title=document.createElement("span")
                    patient_bed_title.innerHTML="Bed No :"

                    let patient_bed_value=document.createElement("p")
                    patient_bed_value.innerHTML=patients_data[i].bed_id

                patient_bed_li.appendChild(patient_bed_title)    
                patient_bed_li.appendChild(patient_bed_value)


                let patient_gender_li=document.createElement('li')
     

                    let patient_gender_title=document.createElement("span")
                    patient_gender_title.innerHTML="Sex : "
                    let patient_gender_value=document.createElement("p")
                    patient_gender_value.innerHTML=patients_data[i].gender

                patient_gender_li.appendChild(patient_gender_title)    
                patient_gender_li.appendChild(patient_gender_value)

                

                let patient_reg_date_li=document.createElement('li')
                    let patient_reg_date_title=document.createElement("span")
                    patient_reg_date_title.innerHTML="Add Date : "
                    let patient_reg_date_value=document.createElement("p")
                    patient_reg_date_value.innerHTML=patients_data[i].reg_date

                patient_reg_date_li.appendChild(patient_reg_date_title)    
                patient_reg_date_li.appendChild(patient_reg_date_value)


                
                let patient_age_li=document.createElement('li')
     

                    let patient_age_title=document.createElement("span")
                    patient_age_title.innerHTML="Age : "
                    let patient_age_value=document.createElement("p")
                    patient_age_value.innerHTML=patients_data[i].age

                patient_age_li.appendChild(patient_age_title)    
                patient_age_li.appendChild(patient_age_value)



               

            
            patient_details_ul.appendChild(patient_bed_li)
            patient_details_ul.appendChild(patient_gender_li)
            patient_details_ul.appendChild(patient_reg_date_li)
            patient_details_ul.appendChild(patient_age_li)


            card_shadow.appendChild(patient_status_ul)
            card_shadow.appendChild(patient_details_ul)





        card.appendChild(card_shadow);


        parentcard.appendChild(card);




     }

}

function generate_patient_status(){



const interval_status = setInterval(() => {

    temp_array=[];
    pulse_array=[];
    oxy_array=[];

    for(i=0;i<patient_data.length;i++)
    {
    // const temp_random = Math.round(Math.random() * 100);
    // const pulse_random = Math.round(Math.random() * 100);
    // const oxy_random = Math.round(Math.random() * 100);

    const temp_random = Math.round(get_random_numbers(30,36));
    const pulse_random = Math.round(get_random_numbers(70,75));
    const oxy_random = Math.round(get_random_numbers(90,100));


    temp_array.push(temp_random);
    pulse_array.push(pulse_random);
    oxy_array.push(oxy_random);

  
    }


    for(j=0;j<patient_data.length;j++)
    {
        patient_temperature=document.getElementById('patient_temp_'+patient_data[j].id)
        patient_pulse=document.getElementById('patient_pulse_'+patient_data[j].id)
        patient_oxygen=document.getElementById('patient_oxy_'+patient_data[j].id)

        patient_temperature.innerHTML=temp_array[j];
        patient_pulse.innerHTML=pulse_array[j];
        patient_oxygen.innerHTML=oxy_array[j];

    }


  
  },2000);




}

generate_patient_status();

function get_random_numbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }

