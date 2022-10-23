IMAGE_NAME="hrm-ute"
CONTAINER_NAME="hrm-ute-run"
PORT="8989"

docker build -t $IMAGE_NAME .

docker run --publish $PORT:$PORT --env PORT=$PORT --name $CONTAINER_NAME $IMAGE_NAME
