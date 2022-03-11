import mysql.connector
from sqlalchemy import create_engine


# comment out password when to connect with local server
# sqlpwd = ''

# comment out password when to connect with local server (rugved user )
sqlpwd = 'rugved@1234'

def getConnection():

    # # comment out connection when to connect with local server
    # cnx = mysql.connector.connect(user='root', password=sqlpwd,host='localhost',database='miot')

    # comment out connection when to connect with local server
    cnx = mysql.connector.connect(user='rugved', password=sqlpwd,host='localhost',database='miot')

    return cnx


# comment out engine when to connect with local server
engine = create_engine('mysql+mysqlconnector://root:'+sqlpwd+'@localhost/miot')
