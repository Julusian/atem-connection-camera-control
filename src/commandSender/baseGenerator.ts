import { Commands } from 'atem-connection'
import {
	AtemCameraControlCategory,
	AtemCameraControlColorCorrectionParameter,
	AtemCameraControlDisplayParameter,
	AtemCameraControlLensParameter,
	AtemCameraControlMediaParameter,
	AtemCameraControlVideoParameter,
} from '../ids'
import { constructNumberProps, constructBooleanProps } from './props'
import { VideoSharpeningLevel } from '../state'

export abstract class AtemCameraControlCommandGenerator<TRes> {
	protected abstract addCommand(command: Commands.CameraControlCommand): TRes

	// Lens

	lensFocus(cameraId: number, value: number, relative = false): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.Focus,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [value], relative)
		)

		return this.addCommand(command)
	}

	lensTriggerAutoFocus(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.AutoFocus,
			constructBooleanProps([])
		)

		return this.addCommand(command)
	}

	lensIrisFStop(cameraId: number, value: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.ApertureFStop,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [value])
		)

		return this.addCommand(command)
	}

	lensIrisNormalised(cameraId: number, value: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.ApertureNormalised,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [value])
		)

		return this.addCommand(command)
	}

	lensTriggerAutoIris(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.AutoAperture,
			constructBooleanProps([])
		)

		return this.addCommand(command)
	}

	lensEnableOpticalImageStabilisation(cameraId: number, enable: boolean): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.OpticalImageStabilisation,
			constructBooleanProps([enable])
		)

		return this.addCommand(command)
	}

	lensSetContinuousZoomSpeed(cameraId: number, speed: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Lens,
			AtemCameraControlLensParameter.SetContinuousZoomSpeed,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [speed])
		)

		return this.addCommand(command)
	}

	// Video

	videoManualWhiteBalance(cameraId: number, colorTemperature: number, tint: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.ManualWhiteBalance,
			constructNumberProps(Commands.CameraControlDataType.SINT16, [colorTemperature, tint])
		)

		return this.addCommand(command)
	}

	videoTriggerAutoWhiteBalance(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.SetAutoWhiteBalance,
			constructBooleanProps([])
		)

		return this.addCommand(command)
	}

	videoExposureUs(cameraId: number, us: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.ExposureUs,
			constructNumberProps(Commands.CameraControlDataType.SINT32, [us])
		)

		return this.addCommand(command)
	}

	// This doesn't get reflected in the state, so is rather confusing
	// exposureOrdinal(cameraId: number, step: number, ): TRes {
	// 	const command = new Commands.CameraControlCommand(
	// 		cameraId,
	// 		AtemCameraControlCategory.Video,
	// 		AtemCameraControlVideoParameter.ExposureOrdinal,
	// 		constructNumberProps(Commands.CameraControlDataType.SINT16, [step], )
	// 	)

	// 	return this.addCommand(command)
	// }

	videoSharpeningLevel(cameraId: number, level: VideoSharpeningLevel): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.VideoSharpeningLevel,
			constructNumberProps(Commands.CameraControlDataType.SINT8, [level])
		)

		return this.addCommand(command)
	}

	videoGain(cameraId: number, gain: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.Gain,
			constructNumberProps(Commands.CameraControlDataType.SINT8, [gain])
		)

		return this.addCommand(command)
	}

	videoNdFilterStop(cameraId: number, stop: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Video,
			AtemCameraControlVideoParameter.NDFilterStop,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [stop])
		)

		return this.addCommand(command)
	}

	// Display

	displayColorBars(cameraId: number, enable: boolean): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Display,
			AtemCameraControlDisplayParameter.ColorBarEnable,
			constructNumberProps(Commands.CameraControlDataType.SINT8, [enable ? 30 : 0])
		)

		return this.addCommand(command)
	}

	// Color Correction

	colorLiftAdjust(cameraId: number, red: number, green: number, blue: number, luma: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.LiftAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [red, green, blue, luma])
		)

		return this.addCommand(command)
	}

	colorGammaAdjust(cameraId: number, red: number, green: number, blue: number, luma: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.GammaAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [red, green, blue, luma])
		)

		return this.addCommand(command)
	}

	colorGainAdjust(cameraId: number, red: number, green: number, blue: number, luma: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.GainAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [red, green, blue, luma])
		)

		return this.addCommand(command)
	}

	colorOffsetAdjust(cameraId: number, red: number, green: number, blue: number, luma: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.OffsetAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [red, green, blue, luma])
		)

		return this.addCommand(command)
	}

	colorContrastAdjust(cameraId: number, constrast: number, pivot: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.ContrastAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [pivot, constrast])
		)

		return this.addCommand(command)
	}

	colorLumaMix(cameraId: number, lumaMix: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.LumaMix,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [lumaMix])
		)

		return this.addCommand(command)
	}

	colorHueSaturationAdjust(cameraId: number, hue: number, saturation: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.ColorAdjust,
			constructNumberProps(Commands.CameraControlDataType.FLOAT, [hue, saturation])
		)

		return this.addCommand(command)
	}

	colorResetAllToDefault(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.ColorCorrection,
			AtemCameraControlColorCorrectionParameter.ResetToDefaults,
			constructBooleanProps([])
		)

		return this.addCommand(command)
	}

	// Media

	mediaTriggerSetRecording(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Media,
			AtemCameraControlMediaParameter.TransportMode,
			constructNumberProps(Commands.CameraControlDataType.SINT8, [2, 0, 0, 0, 0], false)
		)

		return this.addCommand(command)
	}
	mediaTriggerSetStopped(cameraId: number): TRes {
		const command = new Commands.CameraControlCommand(
			cameraId,
			AtemCameraControlCategory.Media,
			AtemCameraControlMediaParameter.TransportMode,
			constructNumberProps(Commands.CameraControlDataType.SINT8, [0, 0, 0, 0, 0], false)
		)

		return this.addCommand(command)
	}
}
