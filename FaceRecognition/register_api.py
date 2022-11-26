# Standard libraries
import os
import cv2
import numpy
from os import path
import os
from PIL import Image
import ssl
from threading import Thread
# External libraries
import cv2
from flask import Flask, request, jsonify
from flask_cors import cross_origin
# Internal libraries
from engine.engine import FaceRecognitionLib

# Constant
current_dir = path.dirname(path.abspath(__file__))
npz_dir = os.path.join(current_dir, "dataset", "npz")
image_dir = os.path.join(current_dir, "dataset", "imgs")
user_recognition_dir = os.path.join(current_dir, "dataset", "recognition_id")
app = Flask(
    __name__,
    instance_relative_config=True,
    static_folder="../client/dist/static",
    template_folder="../client/dist",
)

# For HTTPS Only
# context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
# context.load_cert_chain('cert.crt', 'server_secret_wo_pass.key')
# ssl._create_default_https_context = ssl._create_unverified_context

# Instance
face_engine = FaceRecognitionLib()


def register(name, image):
    #:param name:
    #:param face_encode:
    #:param image:
    face_position = face_engine.get_face_position(image)
    if face_position:
        image_path = os.path.join(image_dir, name + ".jpg")
        Image.fromarray(image).crop((face_position[3],face_position[0],face_position[1],face_position[2])).save(image_path)
        Thread(target=face_engine.update_new_face, args=(image_path,)).start()
        # npz_path = os.path.join(npz_dir, file_name)
        # numpy.savez_compressed(npz_path, face_encode)
        return True
    else:
        return False

@app.route("/user", methods=["POST"])
@cross_origin()
def add_staff():
    pic = request.files["file"]
    employeeId = request.form["employeeId"]
    image = numpy.array(Image.open(pic))
    check = register(employeeId, image)
    if check:
        return "Register Complete"
    else:
        return "Register Incomplete"

@app.route('/register', methods=['POST'])
@cross_origin()
def update_local_id_register():
    data = request.get_json()
    if "employeeId" not in data:
        return jsonify({"message": "Please provide employeeId"}), 400
    employeeId = data["employeeId"]
    if not os.path.exists(user_recognition_dir):
        os.makedirs(user_recognition_dir)
    elif len(os.listdir(user_recognition_dir)) != 0:
        for file in os.listdir(user_recognition_dir):
            os.remove(os.path.join(user_recognition_dir, file))
    with open(os.path.join(user_recognition_dir, f"{employeeId}.txt"), "w") as f:
        pass
    return jsonify({"message": "Update Local Register Complete"})

@app.route("/check", methods=["POST"])
@cross_origin()
def check_staff():
    pic = request.files["file"]
    image = numpy.array(Image.open(pic))
    id = face_engine.checkImage(image)
    return {
        "employeeId": id,
    }

if __name__ == "__main__":
    app.run(host="26.74.195.215")
    # app.run(debug=True, host="0.0.0.0", ssl_context=context)