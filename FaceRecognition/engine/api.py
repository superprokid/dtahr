import requests

url = "http://26.197.75.244:3000/api/face/checkin"

headers = {
  'api-key': 'face-recog-api-key',
  "Content-type": "application/json"
}

def checkin(employeeId):
  payload = {"employeeId": employeeId}
  response = requests.post(url, headers=headers, json=payload)
