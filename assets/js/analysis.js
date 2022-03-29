
patient_data =[];

function fetch_patients_data(){
     
    var xhr=new XMLHttpRequest();
     xhr.open("GET","http://127.0.0.1:5000/get/patientlist",true);
    // xhr.open("GET","./resources/crud.php",true);

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
        patientlist.setAttribute("id",patient_data[i].id) // 1003
        patientlist.setAttribute("onclick","change_patient_data(this.id)") // 1003
      


        let intial_P_name=document.createElement('p')
        intial_P_name.setAttribute("class","p2")
        intial_P_name.innerHTML=patient_data[i].patient_name.substring(0,1);

        let P_name=document.createElement('p')
        P_name.setAttribute("class","head")
        P_name.innerHTML=patient_data[i].patient_name;
        
        let list_break=document.createElement('br');

        let p_bed=document.createElement('span');
        p_bed.setAttribute("class","p_span")
        p_bed.innerHTML=patient_data[i].bed_id;

        P_name.appendChild(list_break);
        P_name.appendChild(p_bed);

        let p_options=document.createElement('i');
        p_options.setAttribute("class","fa fa-ellipsis-h dots")


        patientlist.appendChild(intial_P_name)
        patientlist.appendChild(P_name);
        patientlist.appendChild(p_options);

        parent.appendChild(patientlist);


    }

   change_patient_data(patient_data[0].id)

}


fetch_patients_data();



function change_patient_data(patient_id){

   
  let patients_data = patient_data.find(element => element.id == patient_id);
  console.log(patient_id)

  let patient_name=patients_data["patient_name"];
 
 patient_live_update(patient_id,patient_name);

}







// Area Graph start
function patient_live_update(id,name)
{
  let sleep_seconds=0;
  let sleep_min=0.0;
const el = document.getElementById('chart-area');
el.innerHTML="";
      const data = {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [
          {
            name: 'Pulse',
            data: [70, 90, 95, 85, 70, 90, 75, 70, 90, 80],
          },
          {
            name: 'Temperature',
           data: [10, 90, 50, 40, 70, 55, 33, 70, 90, 50],
          },

      
        ],
      };
      const options = {
        chart: { title:  'Live Update - '+name, width: 900, height: 250 },
        xAxis: { pointOnColumn: false, title: { text: 'X - Time' } },
        yAxis: { title: 'Y - Data' },
        series: { shift: true },
      };

      const chart = toastui.Chart.areaChart({ el, data, options });

    

      const intervalId = setInterval(() => {

        const temp_random = Math.round(get_random_numbers(36,50));
        const pulse_random = Math.round(get_random_numbers(70,95));
        const oxygen_random = Math.round(get_random_numbers(90,100));
    
       
        const date_time= new Date();
        let time=date_time.toLocaleTimeString();
        // let time= date_time.format("dd-MM-yyyy hh:mm:ss")
        var today = new Date();
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
        var localtime = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        let current_time=   date+" "+localtime

        
      

        if(pulse_random<=60 && pulse_random>=55)
        {
         
          sleep_seconds++;
          // console.log(sleep_hours);

          sleep_min=(sleep_seconds/60);
          console.log(sleep_min+" mins - "+current_time+" - "+sleep_seconds);
    
          post_patient_data={
            patient_id:id,
            pulse_rate: pulse_random,
            temp: temp_random,
            sleepmin:sleep_min,
            current_timestamp:current_time,
            oxygen:oxygen_random,
            footsteps:"0",
            movementicon:"sleeping"


          }
        }
        else
          {
            let footsteps=Math.round(get_random_numbers(4,10));
            let position=Math.round(get_random_numbers(0,2));
            let movementicon=["walking","running","sitting"]
            post_patient_data={
              patient_id:id,
              pulse_rate: pulse_random,
              temp: temp_random,
              sleepmin:null,
              current_timestamp:current_time,
              oxygen:oxygen_random,
              footsteps:footsteps,
              movementicon:movementicon[position]
  
  
          }
        }
        // console.log(post_patient_data)
          post_patients_data( post_patient_data);

        

   

        chart.addData([pulse_random,temp_random], time);
      }, 1000);






    } 
      // Area Graph End
      function get_random_numbers(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
      }


      // }
      
      function post_patients_data(data){
     
        var xhr=new XMLHttpRequest();
         xhr.open("POST","http://127.0.0.1:5000/patients/postdata",true);

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // xhr.send(JSON.stringify({"pulse_rate":pulse_random,"temp":temp_random}));
   
        xhr.send(JSON.stringify(data))
  }
    