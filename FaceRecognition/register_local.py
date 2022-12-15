# Standard libraries
import os
from os import path
from PIL import Image

# External libraries
import cv2
import tkinter
from tkinter import messagebox
import numpy
# Internal libraries
from engine.engine_register import FaceRecognitionLib

current_dir = path.dirname(path.abspath(__file__))
image_dir = os.path.join(current_dir, "dataset", "imgs")
user_recognition_dir = os.path.join(current_dir, "dataset", "recognition_id")
# Load Camera
cap = cv2.VideoCapture(0)

# Encode faces from a folder
face_engine = FaceRecognitionLib()

register_complete = False

root = tkinter.Tk()
root.withdraw()

if len(os.listdir(user_recognition_dir)) == 0:
  messagebox.showwarning("Warning", "No registering Face")
  exit()
else:
  while register_complete == False:
      ret, frame = cap.read()
      cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
      cv2.imshow("Frame", frame)
      face_position = face_engine.get_face_position(frame)
      # Detect Faces
      if len(face_position) > 0:
        image_name = os.listdir(user_recognition_dir)[0].split(".")[0]
        image_path = os.path.join(image_dir, f"{image_name}.jpg")
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = Image.fromarray(frame).crop((face_position[3],face_position[0],face_position[1],face_position[2]))\
          .resize((800,800))
        if face_engine.make_face_encoding(numpy.array(frame)):
          frame.save(image_path)
          os.remove(os.path.join(user_recognition_dir, f"{image_name}.txt"))
          register_complete = True
          messagebox.showinfo("Info", "Register Complete")

      key = cv2.waitKey(1)
      if key == 27:
          break

  cap.release()
  cv2.destroyAllWindows()