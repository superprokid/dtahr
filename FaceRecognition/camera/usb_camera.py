# coding: utf-8
# Standard libraries
import sys

# External libraries
import cv2


class USBCamera(object):
    def __init__(self):
      self.taken = None

    def open(self,camera_id):    #
      """
      Open the camera that the user choose
      :param camera_id: id of the camera
      """
      self.taken = cv2.VideoCapture(camera_id)   

    def capture(self,camera_id): 
      """
      Open the camera that the user choose
      :param camera_id: id of the camera
      :return:
      """
      if(self.taken == None or self.taken.isOpened() == False):
        self.taken = cv2.VideoCapture(camera_id)
        ret, frame = self.taken.read()
        self.taken.release()
        image = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
        return image
      else:
        ret, frame = self.taken.read()
        image = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
        return image


    def close(self):
      """
      Close the camera
      """
      self.taken.release()