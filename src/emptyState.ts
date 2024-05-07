import { AtemCameraControlState, VideoSharpeningLevel } from './state'

export function createEmptyState(cameraId: number): AtemCameraControlState {
	return {
		cameraId,

		lens: {
			focus: 0,
			// autoFocused: boolean
			iris: 0,
			// autoIris: boolean
			opticalImageStabilisation: false,
			// zoomPosition: 0,
			zoomSpeed: 0,
		},

		video: {
			// videomode: number
			whiteBalance: [0, 0],
			// setAutoWhite: boolean
			// restoreAutoWhite: boolean
			exposure: 0,
			// dynamicRangeMode: 0,
			videoSharpeningLevel: VideoSharpeningLevel.Off,
			// recordingFormat: [number, number, number, number]
			// setAutoExpsureMode: number
			// shutterAngle: 0,
			shutterSpeed: 0,
			gain: 0,
			// iso: 0,
			// displayLut: [number, boolean]
			ndFilterStop: 0,
		},

		display: {
			colorBarEnable: false,
		},

		colorCorrection: {
			liftAdjust: {
				red: 0,
				green: 0,
				blue: 0,
				luma: 0,
			},
			gammaAdjust: {
				red: 0,
				green: 0,
				blue: 0,
				luma: 0,
			},
			gainAdjust: {
				red: 1,
				green: 1,
				blue: 1,
				luma: 1,
			},
			offsetAdjust: {
				red: 0,
				green: 0,
				blue: 0,
				luma: 0,
			},
			contrastAdjust: {
				pivot: 0.5,
				adj: 1,
			},
			lumaMix: 1,
			colorAdjust: {
				hue: 0,
				saturation: 1,
			},
		},
	}
}
