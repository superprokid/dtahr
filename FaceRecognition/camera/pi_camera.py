from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread
import cv2

class PiCam(object):
    def __init__(self,width,height):
        self.camera = PiCamera()
        self.camera.resolution = (width,height)
        self.camera.framerate = 20
        self.raw_capture = PiRGBArray(self.camera)
        self.stream = self.camera.capture_continuous(
            self.raw_capture,
            format="bgr",
            use_video_port=True
        )
        self.frame = None
        self.stopped = False
    def start(self):
        Thread(target=self.update,args=()).start()
        return self
    def update(self):
        for frame  in self.stream:
            self.frame = frame.array
            self.raw_capture.truncate(0)
            if self.stopped:
                self.stream.close()
                self.raw_capture.close()
                self.camera.close()
                return
    def read(self):
        return self.frame
    def close(self):
        self.stopped = True
                


