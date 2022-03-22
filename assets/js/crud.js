
doctors_data =[];

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


function create_doctor_dropdown(data)
{
parent=document.getElementById("bloodgroup")

for(i=0;i<data.length;i++)
{
  let  doc_option=document.createElement('option')
  doc_option.setAttribute("value",data[i].id);
  doc_option.innerHTML=data[i].doctor_name;

  parent.appendChild(doc_option);
}

}
fetch_doctors_data();