<?php
include('db.php');

// extract($_POST);
// if(isset($_POST['readdata']))
// {
class Patients{
var $id;
var $patient_name;
var $age;
var $gender;
var $blood_group;
var $weight;
var $height;
var $bed_id;
var $floor;
var $ward;
var $dob;
var $reg_date;
var $patient_type;
var $profile_img;
var $bmi;
var $address;
var $contact_no;
var $doctor_id;
var $doctor_name;
var $prescription;
var $reports;

 }
 

$smt=$conn->prepare("SELECT patient_data.id,patient_data.patient_name,patient_data.patient_age as age,patient_data.gender,patient_data.blood_group,patient_data.weight,patient_data.height,bed_data.bed_no as bed_id,bed_data.floor, bed_data.ward,patient_data.dob,patient_data.reg_date,disease_data.disease_name as patient_type,patient_data.profile_img,patient_data.bmi,patient_data.address,patient_data.contact_no,patient_data.doctor_id,doctor_data.doctor_name, patient_doc.prescription, patient_doc.reports FROM patient_data INNER JOIN disease_data ON patient_data.disease_id =disease_data.id INNER JOIN bed_data ON patient_data.bed_id =bed_data.id INNER JOIN patient_doc ON patient_data.document_id =patient_doc.id INNER JOIN doctor_data ON patient_data.doctor_id =doctor_data.id");
$smt->bind_result($t1,$t2,$t3,$t4,$t5,$t6,$t7,$t8,$t9,$t10,$t11,$t12,$t13,$t14,$t15,$t16,$t17,$t18,$t19,$t20,$t21);
$smt->execute();
$ar=array(); 
$i=0;
while($smt->fetch()){
    $r= new Patients();
    $r->id= $t1;
    $r->patient_name= $t2;
    $r->age=$t3;
    $r->gender= $t4;
    $r->blood_group= $t5;
    $r->weight =$t6;
    $r->height=$t7;
    $r->bed_id=$t8;
    $r->floor=$t9;
    $r->ward=$t10;
    $r->dob=$t11;
    $r->reg_date=$t12;
    $r->patient_type=$t13;
    $r->profile_img=$t14;
    $r->bmi=$t15;
    $r->address=$t16;
    $r->contact_no=$t17;
    $r->doctor_id=$t18;
    $r->doctor_name=$t19;
    $r->prescription=$t20;
    $r->reports=$t21;

    $ar[$i]=$r;
    $i++;
}

echo json_encode($ar)
// }
?>