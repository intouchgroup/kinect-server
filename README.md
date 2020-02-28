## @intouchgroup/kinect-server

Only **Azure Kinect** is supported

### Installation

`git clone https://github.com/intouchgroup/kinect-server.git`

`cd kinect-server && npm i`

`npm run dev` or `npm run start`


**Note:** Make sure the required dll and onnx files were copied to the directory root. You can manually copy the files from `node_modules/kinect-azure` if necessary:

* cublas64_100.dll
* cudart64_100.dll
* cudnn64_7.dll
* dnn_model_2_0.onnx
* onnxruntime.dll
* vcomp140.dll


### Documentation

* [kinect-azure](https://github.com/wouterverweirder/kinect-azure)
* [socket.io](https://socket.io/docs/)
* [koa](https://koajs.com/)
* [Azure Kinect Sensor SDK](https://microsoft.github.io/Azure-Kinect-Sensor-SDK/master/index.html)