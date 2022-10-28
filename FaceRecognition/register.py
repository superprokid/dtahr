# Standard libraries
import os
import cv2
import numpy
from os import path
import os
from PIL import Image
import ssl

# External libraries
import cv2
from flask import Flask, request, jsonify
from flask_cors import cross_origin
# Internal libraries
from engine.engine import FaceRecognitionLib

# Constant
current_dir = path.dirname(path.abspath(__file__))
npz_dir = os.path.join(current_dir, "dataset", "npz")
image_dir = os.path.join(current_dir, "dataset", "img")
app = Flask(
    __name__,
    instance_relative_config=True,
    static_folder="../client/dist/static",
    template_folder="../client/dist",
)
context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain('cert.crt', 'server_secret_wo_pass.key')
ssl._create_default_https_context = ssl._create_unverified_context

# Instance
face_engine = FaceRecognitionLib()


def register(name, image):
    #:param name:
    #:param face_encode:
    #:param image:
    face_encode = face_engine.make_face_encoding(image)
    if not face_encode:
        return False
    try:
        staff_id = str(max(face_engine.id_list) + 1)
    except:
        staff_id = "1"

    file_name = name + "_" + staff_id

    npz_path = os.path.join(npz_dir, file_name)

    image_path = os.path.join(image_dir, name + ".jpg")

    cv2.imwrite(image_path, image)

    numpy.savez_compressed(npz_path, face_encode)
    return True

@app.route("/id", methods=["GET"])
@cross_origin()
def get_id():
    face_engine.update_id_list()
    try:
        staff_id = str(max(face_engine.id_list) + 1)
        return staff_id.zfill(3)
    except:
        staff_id = "1"
        return staff_id.zfill(3)


@app.route("/user", methods=["POST"])
@cross_origin()
def add_staff():
    pic = request.files["file"]
    name = request.form["name"]
    image = numpy.array(Image.open(pic))
    check = register(name, image)
    if check:
        return "Register Complete"
    else:
        return "Register Incomplete"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", ssl_context=context)