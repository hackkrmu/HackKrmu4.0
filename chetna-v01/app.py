from flask import Flask, render_template, request, redirect, url_for, g, session,jsonify
import os
import mysql.connector
import tt
from PIL import Image
import cv2
import gun



app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ImageAttendance = 'static/ImagesAttendance'
if not os.path.exists(ImageAttendance):
    os.makedirs(ImageAttendance)
app.secret_key = "69583420385748392098"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['VIDEO'] = 'static/content/'

# Ensure the upload folder exists
if not os.path.exists(app.config['VIDEO']):
    os.makedirs(app.config['VIDEO'])




########################################################################################


# API TENTATIVE USAGE

# FACE AUTH  : -   https://faceauth.api.chetna.com/auth/CTNA5663344643F6/pkey?56563535F54tAAVBF/ref_name='AKM'/model='V1.2.0/fid?="bucket_4563545252.neighshop.com"'
#                           (Currently Localhost)
# Response :-    TRUE/ FALSE

########################################################################################

# CONTENT MODERATION AUTH  : -   https://cm.api.chetna.com/auth/CTNA5663344643F6/pkey?56563535F54tAAVBF/TARGET='FIREARMS'/model='V1.2.0/fid?="bucket_4563545252.neighshop.com"'
#                           (Currently Localhost)
# Response :-    TRUE/ FALSE
# TARGETS : ['FIREARMS', 'NUDITY', 'BLOOD OR VIOLANCE']

########################################################################################




   

# temproary api keys

apikey = "CTNA5663344643F6"
passkey = "56563535F54tAAVBF"

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            user='root',
            host='localhost',
            password='8307802643',
            database='chetna',
            charset="utf8",
            port="3306",
        )
    return g.db

@app.teardown_appcontext
def close_db(error):
    if 'db' in g:
        g.db.close()

def execute_query(query, data=None):
    db = get_db()
    with db.cursor() as cursor:
        cursor.execute(query, data)
        db.commit()


def fetch_data(query, data=None, one=False):
    db = get_db()
    with db.cursor() as cursor:
        cursor.execute(query, data)
        if one:
            return cursor.fetchone()
        return cursor.fetchall()


# Ensure the uploads directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Home route to serve the HTML page
@app.route('/')
def index():
    return render_template('dboard.html')

@app.route('/landing')
def landing():
    return render_template('landing.html')



@app.route('/verf',methods=['GET','POST'])
def verify():
    return render_template('dboard.html',name = session.get('name'))


@app.route('/fetchcon',methods=["POST","GET"])
def fetchcon():
    name  = tt.faceauth()
    uname = session.get('name')
    
    if uname == name:
        print("User Authenticated")
        # session.pop('name') ################s
        # return render_template('dboard.html',name = name)

        return '', 200
    else:
        print("ERROR")
        return '', 404
    # response = {
    #     'status': 'success',
    #     'received': name
    # }
   
    return jsonify(response) 
#    return name
   





@app.route('/login',methods=['POST','GET'])
def login():
    if request.method == "POST":
        name  = request.form['name']
        password = request.form['password']
        cmd = "select * from user" 
        data = fetch_data(cmd)
        uname = data[0][0]
        upass = data[0][1]
       
        print(uname,upass,name,password)

        return "ok"
    return render_template('login.html')




@app.route("/getcap",methods=['POST','GET'])
def getcapp():
    uname = request.form['uname']
    session['name'] = uname
    
    return render_template('trial.html')


@app.route("/getwep",methods=['POST','GET'])
def getwap():
    
    
    
    return render_template('cont.html')

@app.route('/face_auth/<apikey>/<passkey>/<uname>',methods=['POST','GET'])
def faceauth(apikey, passkey, uname):
    return "ok"
   



@app.route('/flogin',methods=['POST','GET'])
def flogin():
    session.clear()
    path = 'static/ImagesAttendance'
    images = []
    classNames = []
    myList = os.listdir(path)
    print(myList)
    for cl in myList:
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        classNames.append(os.path.splitext(cl)[0])
    print(classNames)

    tt.findEncodings(images)
  

       
    return render_template('f_login.html')

@app.route('/create',methods=['POST','GET'])
def create():
  

       
    return render_template('uploadc.html')



@app.route('/upload-video', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return "No video part in the request"
    
    video = request.files['video']
    
    if video.filename == '':
        return "No selected video"
    
    if video:
        video_path = os.path.join(app.config['VIDEO'], 'vid.mp4')
        video.save(video_path)
        return redirect(url_for('getwepint'))
        # return f"Video uploaded successfully: {video.filename}"


@app.route('/getwepint' , methods=['GET','POST'])
def getwepint():
    c = gun.checkwep()
  
    if c!=1:
        return "VIDEO DOESNT VIOLATE FIREARM GUIDELINES, NOT FOUND , CODE: 200"
    else:
        return "VIDEO VIOLATES FIREARM GUIDELINES   , CODE: WEP FOUND"

        



@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image file found", 400

    image_file = request.files['image']
    image_name = request.form['name']

    if image_file.filename == '':
        return "No selected image", 400

    if image_name:
        # Convert the image to .jpg format
        image = Image.open(image_file)
        image = image.convert('RGB')  # Ensure the image is in RGB mode

        # Save the image with the same name entered by the user as .jpg
        image_save_path = os.path.join(ImageAttendance, f"{image_name}.jpg")
        image.save(image_save_path, 'JPEG')
        

        return redirect(url_for('flogin'))
    else:
        return "Name is required", 400



# Endpoint to handle video upload
@app.route('/upload', methods=['POST'])
def upload():
    if 'video' not in request.files:
        return 'No video file uploaded', 400
    
    video = request.files['video']
    if video.filename == '':
        return 'No selected file', 400
    
    # Save the video file
    video.save(os.path.join(app.config['UPLOAD_FOLDER'], video.filename))
    return 'Video uploaded successfully', 200

if __name__ == '__main__':
    app.run(debug=True,port=7500)

