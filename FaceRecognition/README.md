## Getting Started
- Clone the dlib library in some directory of the system
  - git clone https://github.com/davisking/dlib.git
- get into the cloned directory
  - cd dlib
- create build directory inside the cloned directory
  - mkdir build
- Switch to the created directory
  - cd build
- generate a Makefile in the current directory
  - cmake ..
- Build dlib !
- cmake --build .
- cd ..
- python3 setup.py install
- pip install Pillow
- pip install face_recognition

## Run
* For register: python register.py
- For RealTime Face Check: python recognition.py
  - Note: New Image gonna be updated every 5m
