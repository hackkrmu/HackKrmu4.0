################## EVEN FACEBOOK UPLOAD FOR POST TAKES 30-60 SECONDS AND MANY TIME MORE IN VIDEO ##########

import flask
from flask import render_template,Flask,jsonify,request,session,g
import context
import json
import fetch_context

context.qa_pipeline("Warm up", max_length=10, num_return_sequences=1)

app = Flask(__name__)
app.secret_key = "5684923902374230948230948"

@app.route("/")
def home():
    

    return render_template('generate.html')




@app.route("/playground/api/<int:uid>/<int:model>/<int:parameter>")
def api(uid,model,parameter):
    if model == 1:
        return render_template("playground_content_context.html")
    elif model == 0:
        return render_template("playground_faceauth.html")
    else :
        "Model Not Found"

    

    return render_template('api.html')

# would be adding query type parameter in next version
@app.route("/context_api",methods=["POST","GET"])
def context_api():
    data = request.get_json() 
    img = data.get("data") 
    resp = fetch_context.get_context(imgurl=img,user_prompt=session['user_command'])
    print(resp)
    decode_resp = json.loads(resp.decode('utf-8'))
    return jsonify({"message": "JSON received", "data": decode_resp}), 200
    



@app.route('/context',methods=['POST','GET'])
def check_context():
    try:
        data = request.get_json() 
        msg = data.get("data") # Parse incoming JSON
        
        if not data:
            return jsonify({"error": "Invalid or missing JSON data"}), 400
        
        response = context.classify_intent(msg)
       

        if response == 1:
            session['user_command'] = msg  #would replace with this database ..currently just checking
            data  = {"uid":'655423423432',"model":'1',"parameter":'20250201'}
            return jsonify({"message": "JSON received", "data": data}), 200

        elif response == 0:
            data  = {"uid":'655423423432',"model":'0',"parameter":'0'}
            return jsonify({"message": "JSON received", "data": data}), 200
          



       

        # Process the JSON data (example: return received data)
        # return jsonify({"message": "JSON received", "data": response}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == "__main__":
    app.run(debug=True)
