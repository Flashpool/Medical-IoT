<?php
include('db.php')

extract($_POST);
if(isset($_POST['readrecord']))
{
class Patients {
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
var $disease_id;
var $bed_id;
var $document_id;

 }
 

$smt=$conn->prepare("SELECT patient_data.id,patient_data.patient_name,patient_data.patient_age as age,patient_data.gender,patient_data.blood_group,patient_data.weight,patient_data.height,bed_data.bed_no as bed_id,bed_data.floor, bed_data.ward,patient_data.dob,patient_data.reg_date,disease_data.disease_name as patient_type,patient_data.profile_img,patient_data.bmi,patient_data.address,patient_data.contact_no,patient_data.doctor_id,doctor_data.doctor_name, patient_doc.prescription, patient_doc.reports FROM patient_data INNER JOIN disease_data ON patient_data.disease_id =disease_data.id INNER JOIN bed_data ON patient_data.bed_id =bed_data.id INNER JOIN patient_doc ON patient_data.document_id =patient_doc.id INNER JOIN doctor_data ON patient_data.doctor_id =doctor_data.id");
$smt->bind_result($t1,$t2,$t3,$t4,$t5,$t6,$t7,$t8,$t9,$t10,$t11,$t12,$t13,$t14,$t15,$t16,$t17,$t18,$t19,$t20,$t21,$t22,$t23,$t24);
$smt->execute();
$ar=array();
$i=0;
while($smt->fetch()){
    $r= new Recipe();
    $r->recipeid= $t1;
    $r->recipename= $t2;
    $r->chefname=$t3;
    $r->type= $t4;
    $r->rcategory= $t5;
    $r->ingredrients =$t6;
    $r->steps=$t7;
    $r->description=$t8;
    $r->rimg=$t9;
    $r->duration=$t10;
    $r->servings=$t11;
    $ar[$i]=$r;
    $i++;
}

echo json_encode($ar)
}





?>