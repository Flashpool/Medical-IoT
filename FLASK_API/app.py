# from flask import 
from cmath import e
from sqlite3 import Cursor
from tkinter import E
from turtle import st
from flask import Flask, jsonify,request
import dbops
from flask_apscheduler import APScheduler
import pandas as pd
from flask_cors import CORS, cross_origin
import datetime
import random
import time



app = Flask(__name__)

cors = CORS(app, resources={r"/get/patientlist": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

cnx=dbops.getConnection()

@app.route("/rugved")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/patients/getData")
def hello_aniket():
    return "<p>Hello, World Aniket!</p>"

@app.route("/patients/data")
def hello_m():
    p=4
    a=7
    return "<p>Hello, Aniket!</p>"+str((p+a))


@app.route("/patients/postdata", methods =['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def patients_vitals_generate():
    # patient_id=random.randint(1,2)
    data=request.get_json()
    cnx = dbops.getConnection()
    cursor = cnx.cursor()
    print(data)
    # sleep_seconds=0
    # temp_random=random.randint(36,50)
    # pulse_random=random.randint(55,65)

    # time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    patient_id=str(data['patient_id'])
    pulse_rate=str(data['pulse_rate'])
    temp=str(data['temp'])
    sleepmin=str(data['sleepmin'])
    current_timestamp=str(data['current_timestamp'])


    # if(pulse_random<=60 and pulse_random>=55):
    #     sleep_seconds+=1
    #     sleep_min=str(sleep_seconds/60)
    #     print(str(pulse_random)+" : "+str(time)+" - "+str(temp_random)+" : "+sleep_min)
    try:
        
           query= pd.DataFrame([["",patient_id,sleepmin,pulse_rate,temp,current_timestamp]],columns=["id","patient_id","sleep_min","pulse_rate","temp","current_timestamp"])
           with dbops.engine.begin() as connection:
             query.to_sql('patient_analysis_data',con=connection, if_exists='append',index=False)
    except Exception as e:
            print(e)
    else:
            cursor.close()
            cnx.close()



    return "success"





@app.route('/get/patientlist', methods =['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def patientList():
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            # patient_query = ("SELECT * FROM `patient_data`")
            patient_query=("SELECT patient_data.id,patient_data.patient_name,patient_data.patient_age as age,patient_data.gender,patient_data.blood_group,patient_data.weight,patient_data.height,bed_data.bed_no as bed_id,bed_data.floor, bed_data.ward,patient_data.dob,patient_data.reg_date,disease_data.disease_name as patient_type,patient_data.profile_img,patient_data.address,patient_data.contact_no,patient_data.doctor_id,doctor_data.doctor_name, patient_data.prescription, patient_data.reports FROM patient_data INNER JOIN disease_data ON patient_data.disease_id =disease_data.id INNER JOIN bed_data ON patient_data.bed_id =bed_data.id  INNER JOIN doctor_data ON patient_data.doctor_id =doctor_data.id")
            cursor.execute(patient_query)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                print(cursor.column_names)   
                rows = [x for x in cursor]
                cols = [x[0] for x in cursor.description] 
                patients = []     
                for row in rows:                      
                    single_patient = {}
                    for prop, val in zip(cols, row):
                        single_patient[prop] = val
                    patients.append(single_patient)
                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    return jsonify(patients)



@app.route('/get/bedList', methods =['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def bedList():
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            bed_query = ("SELECT * FROM `bed_data` WHERE status='Available'")
            cursor.execute(bed_query)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                print(cursor.column_names)   
                rows = [x for x in cursor]
                cols = [x[0] for x in cursor.description] 
                beds = []     
                for row in rows:                      
                    single_bed_data = {}
                    for prop, val in zip(cols, row):
                        single_bed_data [prop] = val
                    beds.append(single_bed_data )
                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    return jsonify(beds)    


@app.route('/get/patient/vitals', methods =['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def vitals_status():
    # data=request.get_json()
    data=request.args

    id=str(data.get("id"))
    print(id)
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            bed_query = ("SELECT * FROM `patient_analysis_data`  where patient_id='"+id+"' ORDER BY id DESC LIMIT 0, 1 ")
            cursor.execute(bed_query)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                print(cursor.column_names)   
                rows = [x for x in cursor]
                cols = [x[0] for x in cursor.description] 
                beds = []     
                for row in rows:                      
                    single_bed_data = {}
                    for prop, val in zip(cols, row):
                        single_bed_data [prop] = val
                    beds.append(single_bed_data )
                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    return jsonify(beds)    

    


@app.route('/get/doctorList', methods =['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def doctorList():
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            doctor_query = ("SELECT * FROM `doctor_data`")
            cursor.execute(doctor_query)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                print(cursor.column_names)   
                rows = [x for x in cursor]
                cols = [x[0] for x in cursor.description] 
                doctors = []     
                for row in rows:                      
                    single_doctor_data = {}
                    for prop, val in zip(cols, row):
                        single_doctor_data [prop] = val
                    doctors.append(single_doctor_data )
                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    return jsonify(doctors)    




@app.route('/get/diseaseList', methods =['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def diseaseList():
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            disease_query = ("SELECT * FROM `disease_data`")
            cursor.execute(disease_query)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                print(cursor.column_names)   
                rows = [x for x in cursor]
                cols = [x[0] for x in cursor.description] 
                diseases = []     
                for row in rows:                      
                    single_disease_data = {}
                    for prop, val in zip(cols, row):
                        single_disease_data [prop] = val
                    diseases.append(single_disease_data )
                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    return jsonify(diseases)    



@app.route('/post/authentication', methods =['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def credential_submit():
    try:
        cnx = dbops.getConnection()
        cursor = cnx.cursor()
    except Exception as e:
        return "Connection not Available, Please check your Internet."
    else:
        try:    
            # bed_query = ("SELECT * FROM `bed_data` WHERE status='Available'")
            # cursor.execute(bed_query)
            data=request.get_json()
            print(data)
        except Exception as e:
            return "There is some Problem in fetching data."
        else:
            try:
                username=data['username']
                password=data['password']

                cred_query = ("SELECT user_type FROM `user_data` WHERE username='"+str(username)+"' and password='"+str(password)+"'")
                cursor.execute(cred_query)


                # print(cursor.fetchall())   
                # rows = [x for x in cursor]
                # cols = [x[0] for x in cursor.description] 
                cred = []     
                # for row in rows:                      
                #     single_bed_data = {}
                #     for prop, val in zip(cols, row):
                #         single_bed_data [prop] = val
                #     cred.append(single_bed_data )
                # auth={"user_type":str(cursor.description)}
                # cred.append(auth)
                # cred.

                # print(jsonify(cred))


                if(cred['user_type']=="doctor"):
                    page_html={"page":"dashboard.html"}
                    cred.append(page_html)
                    return jsonify(cred)

                elif(cred['user_type']=="admin"):
                    page_html={"page":"admin.html"}
                    cred.append(page_html)
                    return jsonify(cred)

                elif(cred['user_type']=="guardian"):
                    page_html={"page":"admin.html"}
                    cred.append(page_html)
                    return jsonify(cred)





                cursor.close()
                cnx.close()
            except Exception as e:
                return "There is some Problem in fetching data from Server."
    # return jsonify(beds)    
    # return "success"   



if __name__ == "__main__":
    # scheduler = APScheduler()
    # scheduler.add_job(func=patients_vitals_generate, args=[], trigger='interval', id='job', seconds=2)
    # scheduler.start()
    app.run(debug=True)