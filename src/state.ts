// TODO - should this use mobx to make this 'reactive?'

export enum VideoSharpeningLevel {
	Off = 0,
	Low = 1,
	Medium = 2,
	High = 3,
}

export interface ColorAdjust {
	red: number
	green: number
	blue: number
	luma: number
}

export interface AtemCameraControlState {
	readonly cameraId: number

	lens: {
		/**
		 * Focus
		 * 0.0 = near
		 * 1.0 = far
		 */
		focus: number

		// autoFocused: boolean

		/**
		 * Aperture (normalised)
		 * In range 0.0 to 1.0
		 */
		iris: number

		// autoIris: boolean

		/** Optical image stabilisation */
		opticalImageStabilisation: boolean

		// /**
		//  * Absolute zoom position (normalised)
		//  * 0.0 = wide
		//  * 1.0 = tele
		//  */
		// zoomPosition: number

		// /**
		//  * Zoom at specified speed
		//  * -1.0 = zoom wider fast
		//  *  0.0 = stop
		//  * +1.0 = zoom tele fast
		//  */
		zoomSpeed: number
	}

	video: {
		// videomode: number

		/**
		 * Manual White Balance
		 * 0: Color temperature in Kelvin
		 * 1: Tint in range -50 to 50
		 */
		whiteBalance: [colorTemperature: number, tint: number]

		// setAutoWhite: boolean
		// restoreAutoWhite: boolean

		/**
		 * Exposure (time in us)
		 * In range 1 to 42000
		 */
		exposure: number

		// dynamicRangeMode: 0 | 1 | 2

		/** Video sharpening level */
		videoSharpeningLevel: VideoSharpeningLevel

		// recordingFormat: [number, number, number, number]
		// setAutoExpsureMode: number
		// shutterAngle: number

		/**
		 * Shutter speed value as a fraction of 1, so 50 for 1/50th of a second
		 * In range from current sensor framerate to 5000
		 */
		shutterSpeed: number

		/** Gain in decibel (dB) */
		gain: number

		// iso: number
		// displayLut: [number, boolean]

		/**
		 * ND Filter Stop
		 * In range 0.0 to 15.0
		 */
		ndFilterStop: number
	}

	display: {
		// brightness: number
		// exposureAndFocusTools: unknown
		// zebraLevel: number
		// peakingLevel: number

		colorBarEnable: boolean

		// focusAssist: unknown
		// programReturnFeedEnable: boolean
		// timecodeSource: unknown
	}

	colorCorrection: {
		/**
		 * Color lift adjustments
		 * In range -2.0 to 2.0
		 */
		liftAdjust: ColorAdjust

		/**
		 * Color gamma adjustments
		 * In range -4.0 to 4.0
		 */
		gammaAdjust: ColorAdjust

		/**
		 * Color gain adjustments
		 * In range 0.0 to 16.0
		 */
		gainAdjust: ColorAdjust

		/**
		 * Color offset adjustments
		 * In range -8.0 to 8.0
		 */
		offsetAdjust: ColorAdjust

		contrastAdjust: {
			/**
			 * Contrast Pivot
			 * In range 0.0 to 1.0
			 */
			pivot: number

			/**
			 * Contrast Adjustment
			 * In range 0.0 to 2.0
			 */
			adj: number
		}

		/**
		 * Luma mix
		 * In range 0.0 to 1.0
		 */
		lumaMix: number

		colorAdjust: {
			/**
			 * Hue adjust
			 * In range -1.0 to 1.0
			 */
			hue: number

			/**
			 * Saturation
			 * In range 0.0 to 2.0
			 */
			saturation: number
		}
	}
}
