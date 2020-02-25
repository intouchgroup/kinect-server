import KinectAzure from 'kinect-azure';

const kinect = new KinectAzure();

const initializeKinect = (dataCallback: (data: any) => void) => {
    if (kinect.open()) {
        kinect.startCameras({
            depth_mode: KinectAzure.K4A_DEPTH_MODE_NFOV_UNBINNED,
            color_resolution: KinectAzure.K4A_COLOR_RESOLUTION_1080P
        });

        kinect.createTracker();
        kinect.startListening(dataCallback);
    }
};