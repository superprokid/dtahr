# Internal libraries
import sched, time

# External libraries
import cv2
from apscheduler.schedulers.background import BackgroundScheduler

# Internal libraries
from engine.engine import FaceRecognitionLib

# Encode faces from a folder
engine = FaceRecognitionLib()
# sfr.load_encoding_images("dataset/imgs/")

# Load Camera
cap = cv2.VideoCapture(0)

# Update encoded image every 5m
scheduler = BackgroundScheduler()
scheduler.add_job(engine.encode_all_face, 'interval', minutes=5)
scheduler.start()

while True:
    ret, frame = cap.read()

    # Detect Faces
    face_locations, face_names = engine.recognize(frame)
    if len(face_locations) > 0:
        y1, x2, y2, x1 = face_locations[0], face_locations[1], face_locations[2], face_locations[3]

        cv2.putText(frame, face_names,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

    cv2.imshow("Frame", frame)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()