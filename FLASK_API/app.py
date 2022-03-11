from flask import Flask, jsonify
import dbops
import pandas as pd
from flask_cors import CORS, cross_origin

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
            patient_query=("SELECT patient_data.id as patientid,patient_data.patient_name,patient_data.age,patient_data.gender,patient_data.blood_group,patient_data.weight,patient_data.height,bed_data.bed_no as bed_id,bed_data.floor, bed_data.ward,patient_data.dob,patient_data.reg_date,disease_data.disease_name as patient_type,patient_data.profile_img,patient_data.bmi,patient_data.address,patient_data.contact_no,patient_data.doctor_id FROM patient_data INNER JOIN disease_data ON patient_data.patient_type =disease_data.id INNER JOIN bed_data ON patient_data.bed_id =bed_data.id")
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

    
if __name__ == "__main__":
    app.run(debug=True)