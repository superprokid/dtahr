# Internal libraries
import sched, time
import os
from os import path
from PIL import Image

# External libraries
import cv2
from apscheduler.schedulers.background import BackgroundScheduler
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import numpy
from threading import Thread
# Internal libraries
from engine.engine import FaceRecognitionLib

# Encode faces from a folder
engine = FaceRecognitionLib()
current_dir = path.dirname(path.abspath(__file__))
image_dir = os.path.join(current_dir, "dataset", "imgs")
user_recognition_dir = os.path.join(current_dir, "dataset", "recognition_id")

# Load Camera
cap = cv2.VideoCapture(0)

# Update encoded image every 5m
scheduler = BackgroundScheduler()
scheduler.add_job(engine.encode_all_face, 'interval', minutes=5)
scheduler.start()

# Register Mode
isRegister = False
registerPath = './dataset/recognition_id'

class MyHandler(PatternMatchingEventHandler):
    def __init__(self):
        super(MyHandler, self).__init__()
    
    def on_created(self, event):
        print("File created, start register mode")
        global isRegister
        time.sleep(5)
        isRegister = True

event_handler = MyHandler()
observer = Observer()
observer.schedule(event_handler, registerPath, recursive=True)
observer.start()

while True:
    ret, frame = cap.read()

    if(isRegister is False):
        # Detect Faces
        face_locations, face_names = engine.recognize(frame)
        if len(face_locations) > 0:
            y1, x2, y2, x1 = face_locations[0], face_locations[1], face_locations[2], face_locations[3]

            cv2.putText(frame, face_names,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)
        cv2.imshow("Frame", frame)

    else:
        try:
            cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            cv2.imshow("Frame", frame)
            face_position = engine.get_face_position(frame)
            # Detect Faces
            if len(face_position) > 0:
                image_name = os.listdir(user_recognition_dir)[0].split(".")[0]
                image_path = os.path.join(image_dir, f"{image_name}.jpg")
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame = Image.fromarray(frame).crop((face_position[3],face_position[0],face_position[1],face_position[2]))\
                .resize((800,800))
                if engine.make_face_encoding(numpy.array(frame)):
                    frame.save(image_path)
                    os.remove(os.path.join(user_recognition_dir, f"{image_name}.txt"))
                    Thread(target=engine.update_new_face, args=(image_path,)).start()
                    isRegister = False
        except Exception as e:
            print(e)
            isRegister = False

    key = cv2.waitKey(1)
    if key == 27:
        break

observer.stop()
observer.join()
cap.release()
cv2.destroyAllWindows()