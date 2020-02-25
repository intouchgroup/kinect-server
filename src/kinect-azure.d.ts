export default class KinectAzure {
    constructor();

    static K4A_DEPTH_MODE_NFOV_UNBINNED: string;
    static K4A_COLOR_RESOLUTION_720P: string;
    static K4A_COLOR_RESOLUTION_1080P: string;
    
    open (): any;
    startCameras (options: { depth_mode: string, color_resolution: string }): void;
    createTracker (): void;
    startListening (callback: (data: any) => void): void;
}