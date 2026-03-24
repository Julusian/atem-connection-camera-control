import { Commands } from 'atem-connection'
import { ChangesTracker, assertNever } from './changesTracker.js'
import { AtemCameraControlState } from '../state.js'
import { AtemCameraControlVideoParameter } from '../ids.js'
import { AtemCameraControlEvents } from '../changes.js'

export function applyVideoCommand(
	changes: ChangesTracker,
	command: Commands.CameraControlUpdateCommand,
	state: AtemCameraControlState
): void {
	const parameter = command.parameter as AtemCameraControlVideoParameter
	switch (parameter) {
		case AtemCameraControlVideoParameter.GainCamera4_9: {
			// Gain (up to Camera 4.9)
			return
		}
		case AtemCameraControlVideoParameter.ManualWhiteBalance: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT16, 2)) return

			state.video.whiteBalance = [command.properties.numberData[0], command.properties.numberData[1]]

			changes.addChange(command.source, 'video.whiteBalance')
			return
		}
		case AtemCameraControlVideoParameter.SetAutoWhiteBalance: {
			changes.addEvent(command.source, AtemCameraControlEvents.VideoAutoWhiteBalance)
			return
		}
		case AtemCameraControlVideoParameter.ExposureUs: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT32, 1)) return

			const shutterSpeedRaw = 1000000 / command.properties.numberData[0]
			const shutterSpeedRounded =
				shutterSpeedRaw > 1000 ? 10 * Math.round(shutterSpeedRaw / 10) : Math.round(shutterSpeedRaw)

			state.video.exposure = command.properties.numberData[0]
			state.video.shutterSpeed = shutterSpeedRounded

			changes.addChange(command.source, 'video.exposure')
			changes.addChange(command.source, 'video.shutterSpeed')
			return
		}
		case AtemCameraControlVideoParameter.VideoSharpeningLevel: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT8, 1)) return

			state.video.videoSharpeningLevel = command.properties.numberData[0]

			changes.addChange(command.source, 'video.videoSharpeningLevel')
			return
		}
		case AtemCameraControlVideoParameter.Gain: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT8, 1)) return

			state.video.gain = command.properties.numberData[0]

			changes.addChange(command.source, 'video.gain')
			return
		}
		case AtemCameraControlVideoParameter.NDFilterStop: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 1)) return

			state.video.ndFilterStop = command.properties.numberData[0]

			changes.addChange(command.source, 'video.ndFilterStop')
			return
		}

		case AtemCameraControlVideoParameter.VideoMode:
		case AtemCameraControlVideoParameter.RestoreAutoWhiteBalance:
		case AtemCameraControlVideoParameter.ExposureOrdinal:
		case AtemCameraControlVideoParameter.DynamicRangeMode:
		case AtemCameraControlVideoParameter.RecordingFormat:
		case AtemCameraControlVideoParameter.SetAutoExpsureMode:
		case AtemCameraControlVideoParameter.ShutterAngle:
		case AtemCameraControlVideoParameter.ShutterSpeed:
		case AtemCameraControlVideoParameter.ISO:
		case AtemCameraControlVideoParameter.DisplayLUT:
			// Not implemented
			changes.addUnhandledMessage(command)
			return

		default:
			assertNever(parameter)
			changes.addUnhandledMessage(command)
			return
	}
}
