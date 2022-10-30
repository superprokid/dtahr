# Standard libraries
from os import path
import os
import glob
import time
from threading import Thread

# External libraries
import face_recognition
import cv2
import imutils
import numpy
import dlib
import concurrent.futures
from PIL import Image

current_dir = path.dirname(path.abspath(__file__))
npz_dir = os.path.join(current_dir, "../dataset", "npz")
image_dir = os.path.join(current_dir, "../dataset", "imgs")
detector = dlib.get_frontal_face_detector()


class FaceRecognitionLib(object):
    """
    face_recognition library を利用した顔認証検証
    """

    # クラス変数設定
    __tolerance = 0.5  # Recognitionの距離threshold

    def __init__(self):
        file_name = [(sub_dir.split(".")[0]) for sub_dir in os.listdir(npz_dir)]
        self.number_of_staffs = len(file_name)
        self.__people = [(name.split("_")[0]) for name in file_name]
        self.__id = [(name.split("_")[1]) for name in file_name]
        self.id_list = [int(id_str) for id_str in self.__id]
        self.name = ""
        self.num = 0
        self.id = 0
        self.encoded_image = []
        self.encoded_image_name = []
        self.encode_all_face()

    @staticmethod
    def make_face_encoding(image):
        """
        Make face embedding from image
        :param img: target image
        :return:
        """
        encoding = []
        # TODO: Experiment with 200, 500
        image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)

        face_encodes = face_recognition.face_encodings(image)

        if len(face_encodes) == 1:
            encoding.append(face_encodes[0])

        return encoding

    def encode_all_face(self):
        """
        Encode all face in database
        :return:
        """
        print("Encoding all faces...")
        images_path = glob.glob(os.path.join(image_dir, "*.*"))

        print("{} encoding images found.".format(len(images_path)))

        # Store image encoding and names
        for img_path in images_path:
            img = numpy.array(Image.open(img_path))
            # Get the filename only from the initial file path.
            basename = os.path.basename(img_path)
            (filename, ext) = os.path.splitext(basename)
            # Get encoding
            
            img_encoding = face_recognition.face_encodings(img)[0]

            # Store file name and file encoding
            self.encoded_image.append(img_encoding)
            self.encoded_image_name.append(filename)
        print("Encoding all faces done!")

    @staticmethod
    def get_face_position(image):
        """
        Get face position
        :param image: target image
        :return:
        """
        face_locations = face_recognition.face_locations(image)
        return face_locations[0]
    def update_id_list(self):
        file_name = [(sub_dir.split(".")[0]) for sub_dir in os.listdir(npz_dir)]
        self.__id = [(name.split("_")[1]) for name in file_name]
        self.id_list = [int(id_str) for id_str in self.__id]

    @staticmethod
    def list_all_faces():
        """
        List all faces inside database
        :return:
        """
        face_encodings = []

        for file in os.listdir(npz_dir):
            file_path = os.path.join(npz_dir, file)
            data = numpy.load(file_path, allow_pickle=True)
            face_encodings.append(data["arr_0"][0])

        return numpy.array(face_encodings)

    def checkImage(self, image):
        """
        Check if image is valid
        :param image: target image
        :return:
        """
        try:
            image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
            face_location = face_recognition.face_locations(image)
            image_encoding = face_recognition.face_encodings(image, face_location)[0]
            results = face_recognition.compare_faces(self.encoded_image, image_encoding, tolerance=FaceRecognitionLib.__tolerance)
            if True in results:
                result_index = results.index(True)
                return self.encoded_image_name[result_index]
            return ""
        except Exception as e:
            print(e)
            return ""

    def recognize(self, image: numpy.array):
        """
        Recognize face from database
        :param image: target image
        :return:
        """
        face_encoding = self.make_face_encoding(image)
        name = "Unknown"
        staff_id = "0"

        if len(face_encoding) != 0:
            results = face_recognition.compare_faces(
                self.list_all_faces(),
                numpy.array(face_encoding),
                tolerance=FaceRecognitionLib.__tolerance,
            )

            for index, result in enumerate(results):
                if result:
                    name = self.__people[index]
                    staff_id = self.__id[index]
                    break
        self.name = name
        self.id = staff_id
        # return name, staff_id

    def run(self, frame, image, scale):
        """
        Get Name, ID and bounding box cordinate
        :param image: target image
        :return:
        """

        faces = detector(frame, 0)
        if faces:
            self.num = self.num + 1
            if self.num % 20 == 0:
                self.num = 0
                Thread(target=self.recognize, args=(frame,)).start()
        for face in faces:
            x1 = int(face.left() * 100 / scale)
            y1 = int(face.top() * 100 / scale)
            x2 = int(face.right() * 100 / scale)
            y2 = int(face.bottom() * 100 / scale)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 0, 255), 2)
            cv2.putText(image, self.name, (x1, y2 + 11), font, 0.5, (0, 0, 255), 1)
