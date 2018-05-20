from flask import render_template, request, redirect, url_for, flash, current_app, send_file, send_from_directory
from flask import Flask
import pymysql.cursors
import json
import flask
#from flask_wtf.csrf import CSRFProtect
from werkzeug.utils import secure_filename
import os
from logging.config import dictConfig



UPLOAD_FOLDER = 'C:\\lakshay.tutlani\\PREP\\FLASK\\Updated\\search_engine\\engine\\upload'
ALLOWED_EXTENSIONS = set(['txt', 'py', 'pyc', 'sh', 'java', 'class'])



connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='iog_search',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
                             

#__name__ is a predefined python variable
app = Flask(__name__)
app.secret_key = 'my unobvious secret key'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

COMMON_WORDS_FOLDER = 'C:\\lakshay.tutlani\\PREP\\FLASK\\Updated\\search_engine\\engine\\static\\commonWords.txt'
f = open(COMMON_WORDS_FOLDER, 'r')
common_words_list = f.read().splitlines()

@app.route("/")
def index():
    return render_template('index.html')
    
@app.route("/view_insight")
def view_insight():
    return "iog_insight" 

@app.route("/iog_insight")
def iog_insight():
    cursor = connection.cursor() 
    sql = "SELECT script,visitPageCount from list"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for i in rows:
        print i
    connection.commit()
    return render_template('viewInsight.html',rows=rows)     


@app.route("/file_display/")    
def showFile(): 
    data = request.query_string
    data = data.replace("%22","")
    cursor = connection.cursor() 
    sql = "UPDATE list set visitPageCount = visitPageCount+1 where script = %s"
    cursor.execute(sql, (data))
    connection.commit()
    fileContent = readFile(data)
    list = [{
          "link": "display_data",
          "data": fileContent,
          "name": data
        }]
    return json.dumps(list)

    
@app.route("/display_data/")    
def displayData(): 
    return render_template("success.html")


@app.route("/submit",methods=['POST'])    
def selectedInfo():
    data = request.get_json()
    print "data"
    print data
    list=getList(data['value'])
    return flask.jsonify(list)

  
    
    

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS    
    

@app.route('/downloads/<path:filename>')
def download(filename):
    uploads = app.config['UPLOAD_FOLDER']
    return send_from_directory(directory=uploads, filename=filename, as_attachment=True)

@app.route('/upload_file', methods=['POST'])
def ask_for_dir():
    if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            tags = request.form.get('tag-name')
            app.logger.info('%s', tags)
            print(tags)
            file_name = request.form.get('file-name')
            if file_name.endswith(('txt', 'py', 'pyc', 'sh', 'java', 'class')):
                print(file_name)
                app.logger.info('%s', file_name)
                # if user does not select file, browser also
                # submit a empty part without filename
                if file.filename == '':
                    flash('No selected file')
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    insertData(file_name,tags)
                    filename = secure_filename(file_name)
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
                    #flash('File is uploaded successfully')
                    return render_template("index_success.html")
            else:
                flash('File name is incorrect')
                return render_template("index.html")
                
    #flash('File is not uploaded successfully')
    return render_template("index.html")
    
    
def insertData(filename, tags):   
    rows = []
    try:  
      # insert a single record
        tags_split = tags.split(' ')
        print tags_split
        print common_words_list
        tag_list = list(set(tags_split).difference(set(common_words_list)))
        tags = ' '.join(tag_list)
        permuted_list = wordngram(tag_list)
        permuted_values = ' '.join(permuted_list)
        print "permuted words"
        print permuted_values
        cursor = connection.cursor() 
        sql = "INSERT into list values (%s,%s,%s,%s)"
        cursor.execute(sql, (filename,tags,permuted_values,0))
        rows = cursor.fetchall()
        connection.commit()
        #connection.close()          
    except:
      raise 

def readFile(data):
    with open("upload/"+data, 'r') as content_file:
        content = content_file.read() 
    print "File Content"        
    print content
    return content
      
def getList(data):
    input_list = data.split(' ')
    combination_list = wordngram(input_list)
    print "combination list"
    print combination_list
    rows = []
    try:  
      # Read a single record
        cursor = connection.cursor() 
        sql = "SELECT script from list WHERE tag like %s"
        cursor.execute(sql, ("%"+data+"%"))
        rows = cursor.fetchall()
        connection.commit()
        #connection.close()          
    except:
      raise
    return rows    

def toString(List):
    return ''.join(List)

def permute(a, l, r, list):
    if l==r:
        list.append(toString(a))
    else:
        for i in xrange(l,r+1):
            a[l], a[i] = a[i], a[l]
            permute(a, l+1, r, list)
            a[l], a[i] = a[i], a[l]
    return list


def wordngram(input_str):
    wordngrams = []
    for name in input_str:
        wordngrams.append(name)
    for i in range(2, len(input_str)+1):
        for j in range(0, len(input_str)-i+1):
            ngram = input_str[j:(j+i)]
            permutate_list = permute(ngram, 0, len(ngram)-1, [])
            wordngrams.extend(permutate_list)
    return wordngrams
 
if __name__ == "__main__":
    app.run()