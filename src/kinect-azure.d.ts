export = KinectAzure;
declare class KinectAzure {
    static K4A_DEPTH_MODE_OFF: number;
    static K4A_DEPTH_MODE_NFOV_2X2BINNED: number;
    static K4A_DEPTH_MODE_NFOV_UNBINNED: number;
    static K4A_DEPTH_MODE_WFOV_2X2BINNED: number;
    static K4A_DEPTH_MODE_WFOV_UNBINNED: number;
    static K4A_DEPTH_MODE_PASSIVE_IR: number;
    static K4A_COLOR_RESOLUTION_OFF: number;
    static K4A_COLOR_RESOLUTION_720P: number;
    static K4A_COLOR_RESOLUTION_1080P: number;
    static K4A_COLOR_RESOLUTION_1440P: number;
    static K4A_COLOR_RESOLUTION_1536P: number;
    static K4A_COLOR_RESOLUTION_2160P: number;
    static K4A_COLOR_RESOLUTION_3072P: number;
    static K4A_IMAGE_FORMAT_COLOR_MJPG: number;
    static K4A_IMAGE_FORMAT_COLOR_NV12: number;
    static K4A_IMAGE_FORMAT_COLOR_YUY2: number;
    static K4A_IMAGE_FORMAT_COLOR_BGRA32: number;
    static K4A_IMAGE_FORMAT_DEPTH16: number;
    static K4A_IMAGE_FORMAT_IR16: number;
    static K4A_IMAGE_FORMAT_CUSTOM8: number;
    static K4A_IMAGE_FORMAT_CUSTOM16: number;
    static K4A_IMAGE_FORMAT_CUSTOM: number;
    static K4A_FRAMES_PER_SECOND_5: number;
    static K4A_FRAMES_PER_SECOND_15: number;
    static K4A_FRAMES_PER_SECOND_30: number;
    static K4ABT_JOINT_PELVIS: number;
    static K4ABT_JOINT_SPINE_NAVEL: number;
    static K4ABT_JOINT_SPINE_CHEST: number;
    static K4ABT_JOINT_NECK: number;
    static K4ABT_JOINT_CLAVICLE_LEFT: number;
    static K4ABT_JOINT_SHOULDER_LEFT: number;
    static K4ABT_JOINT_ELBOW_LEFT: number;
    static K4ABT_JOINT_WRIST_LEFT: number;
    static K4ABT_JOINT_HAND_LEFT: number;
    static K4ABT_JOINT_HANDTIP_LEFT: number;
    static K4ABT_JOINT_THUMB_LEFT: number;
    static K4ABT_JOINT_CLAVICLE_RIGHT: number;
    static K4ABT_JOINT_SHOULDER_RIGHT: number;
    static K4ABT_JOINT_ELBOW_RIGHT: number;
    static K4ABT_JOINT_WRIST_RIGHT: number;
    static K4ABT_JOINT_HAND_RIGHT: number;
    static K4ABT_JOINT_HANDTIP_RIGHT: number;
    static K4ABT_JOINT_THUMB_RIGHT: number;
    static K4ABT_JOINT_HIP_LEFT: number;
    static K4ABT_JOINT_KNEE_LEFT: number;
    static K4ABT_JOINT_ANKLE_LEFT: number;
    static K4ABT_JOINT_FOOT_LEFT: number;
    static K4ABT_JOINT_HIP_RIGHT: number;
    static K4ABT_JOINT_KNEE_RIGHT: number;
    static K4ABT_JOINT_ANKLE_RIGHT: number;
    static K4ABT_JOINT_FOOT_RIGHT: number;
    static K4ABT_JOINT_HEAD: number;
    static K4ABT_JOINT_NOSE: number;
    static K4ABT_JOINT_EYE_LEFT: number;
    static K4ABT_JOINT_EAR_LEFT: number;
    static K4ABT_JOINT_EYE_RIGHT: number;
    static K4ABT_JOINT_EAR_RIGHT: number;
    static K4ABT_JOINT_COUNT: number;
    static K4ABT_SENSOR_ORIENTATION_DEFAULT: number;
    static K4ABT_SENSOR_ORIENTATION_CLOCKWISE90: number;
    static K4ABT_SENSOR_ORIENTATION_COUNTERCLOCKWISE90: number;
    static K4ABT_SENSOR_ORIENTATION_FLIP180: number;
    static K4ABT_TRACKER_PROCESSING_MODE_GPU: number;
    static K4ABT_TRACKER_PROCESSING_MODE_CPU: number;
    /**
     * open a playback mkv stream
     * @param {string} path The path to the mkv recording
     * @param {function} playback_handle callback
     */
    openPlayback(path: string, callback: (data: any) => void): any;
    /**
     * Starts the kinect cameras
     * @param {Object} options The configuration for the cameras
     * @param {number} options.camera_fps The number of frames per second, if not set will default to recording fps
     * @param {number} options.color_format The color format
     * @param {bool} options.include_depth_to_color generate depth to color image
     * @param {bool} options.include_color_to_depth generate color to depth image
     * @param {bool} options.flip_BGRA_to_RGBA flip blue and red channels
     * @param {bool} options.apply_depth_to_alpha apply the depth data to the alpha channel of the color image
     * min and max depth are used to normalize depth data
     * @param {number} options.min_depth min depth distance in mm
     * @param {number} options.max_depth max depth distance in mm
     */
    startPlayback(options?: {
        camera_fps?: number;
        color_format?: number;
        include_depth_to_color?: boolean;
        include_color_to_depth?: boolean;
        flip_BGRA_to_RGBA?: boolean;
        apply_depth_to_alpha?: boolean;
        min_depth?: number;
        max_depth?: number;
    }): any;
    stopPlayback(): any;
    resume(): any;
    pause(): any;
    seek(time: any): any;
    get time(): any;
    get duration(): any;
    open(): any;
    /**
     * Starts the kinect cameras
     * @param {Object} options The configuration for the cameras
     * @param {number} options.camera_fps The number of frames per second
     * @param {number} options.color_format The color format
     * @param {number} options.color_resolution The color resolution
     * @param {number} options.depth_mode The depth mode
     * @param {number} options.point_cloud_mode The point cloud mode
     * @param {bool} options.synchronized_images_only Only produce capture objects if they contain synchronized color and depth images
     * @param {bool} options.include_depth_to_color generate depth to color image
     * @param {bool} options.include_color_to_depth generate color to depth image
     * @param {bool} options.flip_BGRA_to_RGBA flip blue and red channels
     * @param {bool} options.apply_depth_to_alpha apply the depth data to the alpha channel of the color image
     * @param {bool} options.depth_to_greyscale converts depth_to_color 16bit image to RGBA 32bit greyscale image
     * @param {bool} options.depth_to_redblue converts depth_to_color 16bit image to RGBA 32bit color image
     * min and max depth are used to normalize depth data when converting within cpp
     * @param {number} options.min_depth min depth distance in mm
     * @param {number} options.max_depth max depth distance in mm
     */
    startCameras(options?: {
        camera_fps?: number;
        color_format?: number;
        color_resolution?: number;
        depth_mode?: number;
        point_cloud_mode?: number;
        synchronized_images_only?: boolean;
        include_depth_to_color?: boolean;
        include_color_to_depth?: boolean;
        flip_BGRA_to_RGBA?: boolean;
        apply_depth_to_alpha?: boolean;
        depth_to_greyscale?: boolean;
        depth_to_redblue?: boolean;
        min_depth?: number;
        max_depth?: number;
    }): any;
    /**
     * Creates a body tracker
     * @param {Object} options The configuration for the body tracker
     * @param {number} options.sensor_orientation (KinectAzure.K4ABT_SENSOR_ORIENTATION_DEFAULT, KinectAzure.K4ABT_SENSOR_ORIENTATION_CLOCKWISE90, KinectAzure.K4ABT_SENSOR_ORIENTATION_COUNTERCLOCKWISE90 or KinectAzure.K4ABT_SENSOR_ORIENTATION_FLIP180)
     * @param {number} options.processing_mode (KinectAzure.K4ABT_TRACKER_PROCESSING_MODE_GPU or KinectAzure.K4ABT_TRACKER_PROCESSING_MODE_CPU)
     * @param {number} options.gpu_device_id The id of the GPU to use
     */
    createTracker(options?: {
        sensor_orientation?: number;
        processing_mode?: number;
        gpu_device_id?: number;
    }): any;
    startListening(callback: (data: any) => void): any;
    stopListening(callback?: (data: any) => void): Promise<any>;
    destroyTracker(): any;
    stopCameras(): any;
    close(): any;
    getDepthModeRange(depthMode: number): {
        min: number;
        max: number;
    };
}
