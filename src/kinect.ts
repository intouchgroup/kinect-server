import KinectAzure from 'kinect-azure';
import Socket from 'socket.io';

const kinect = new KinectAzure();
let kinectStarted = false;

const depthMode = KinectAzure.K4A_DEPTH_MODE_NFOV_UNBINNED;
const colorResolution = KinectAzure.K4A_COLOR_RESOLUTION_1080P;

export const startKinect = (kinectIO: Socket.Namespace) => {
    if (!kinectStarted && kinect.open()) {
        kinect.startCameras({ depth_mode: depthMode, color_resolution: colorResolution });
        kinectStarted = true;
        kinect.createTracker();
        kinect.startListening(data => kinectIO.emit('kinectData', data.depthImageFrame));
        console.log('KINECT STARTED');
    }
};

export const stopKinect = async () => {
    await kinect.stopListening();
    kinect.destroyTracker();
    kinect.stopCameras();
    kinectStarted = false;
    console.log('KINECT STOPPED');
};

