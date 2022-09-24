# coding: utf-8
"""
Abstract::
    -
History::
    - Ver.      Date            Author        History
    -
"""
# Standard libraries
import sys
import subprocess
import time
# External libraries
from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtWidgets import *
from PySide2 import QtCore
import cv2
import numpy as np
from imutils.video import FPS
# Internal Libraries
from engine.engine import FaceRecognitionLib
from camera.pi_camera import PiCam

# Instance
devices = PiCam(1600, 1216)
face_engine = FaceRecognitionLib()

class MainApp(QWidget):
    def __init__(self):
        QWidget.__init__(self)
        #Get display width and height in bytes format,
        #then convert to Integer format
        output = subprocess.Popen(
            'xrandr | grep "\*" | cut -d" " -f4', shell=True, 
            stdout=subprocess.PIPE
        ).communicate()[0]
        self.resolution = output.split()[0].split(b"x")
        self.video_size = QSize(
            int(self.resolution[0].decode("UTF-8")),
            int(self.resolution[1].decode("UTF-8")) - 100,
        )
        self.scale = 30
        self.setup_ui()
        self.timer = QTimer()
        self.stopped = True
        self.timer.timeout.connect(self.setup_camera)
        self.timer.start(1000)

    def setup_ui(self):
        """Initialize widgets."""
        self.image_label = QLabel()
        self.image_label.setFixedSize(self.video_size)

        self.quit_button = QPushButton("Close")
        self.quit_button.clicked.connect(self.close)

        self.main_layout = QVBoxLayout()
        self.main_layout.addWidget(self.image_label)
        self.main_layout.addWidget(self.quit_button)
        self.main_layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.main_layout)

    def setup_camera(self):
        """Initialize camera."""
        devices.start()
        #Let the camera warm up
        time.sleep(2)
        self.fps = FPS().start()
        while self.stopped:
            image = devices.read()
            resized_image = cv2.resize(image,(1280,720))
            rgb_image = cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB)
            self.display_video_stream(rgb_image)
            app.processEvents()
            self.fps.update()
            
    def display_video_stream(self, image):
        """Display video cam to GUI"""
        #Scale the 2nd image to small size to detect face
        #then draw bounding box on the display image
        width = int(image.shape[1] * self.scale/100)
        height = int(image.shape[0] * self.scale/100)
        frame = cv2.resize(image,dsize=(width,height))
        face_engine.run(frame, image, self.scale)
        image = QImage(
            image,
            image.shape[1],
            image.shape[0],
            image.strides[0],
            QImage.Format_RGB888,
        )
        self.image_label.setPixmap(QPixmap.fromImage(image))

    def keyPressEvent(self, event):
        """Add escape key event to close"""
        if event.key() == QtCore.Qt.Key_Escape:
            self.close()

    def closeEvent(self, event):
        """Close all devices and app"""
        devices.close()
        self.stopped = False
        self.fps.stop()
        print("[INFO] elasped time: {:.2f}".format(self.fps.elapsed()))
        print("[INFO] approx. FPS: {:.2f}".format(self.fps.fps()))
        event.accept()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainApp()
    win.show()
    sys.exit(app.exec_())








