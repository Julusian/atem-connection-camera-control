import { Commands } from 'atem-connection'
import { ChangesTracker, assertNever } from './changesTracker.js'
import { AtemCameraControlState } from '../state.js'
import { AtemCameraControlColorCorrectionParameter } from '../ids.js'
import { AtemCameraControlEvents } from '../changes.js'

export function applyColorCorrectionCommand(
	changes: ChangesTracker,
	command: Commands.CameraControlUpdateCommand,
	state: AtemCameraControlState
): void {
	const parameter = command.parameter as AtemCameraControlColorCorrectionParameter
	switch (parameter) {
		case AtemCameraControlColorCorrectionParameter.LiftAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 4)) return

			state.colorCorrection.liftAdjust = {
				red: command.properties.numberData[0],
				green: command.properties.numberData[1],
				blue: command.properties.numberData[2],
				luma: command.properties.numberData[3],
			}
			changes.addChange(command.source, 'colorCorrection.liftAdjust')
			return
		}
		case AtemCameraControlColorCorrectionParameter.GammaAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 4)) return

			state.colorCorrection.gammaAdjust = {
				red: command.properties.numberData[0],
				green: command.properties.numberData[1],
				blue: command.properties.numberData[2],
				luma: command.properties.numberData[3],
			}
			changes.addChange(command.source, 'colorCorrection.gammaAdjust')
			return
		}
		case AtemCameraControlColorCorrectionParameter.GainAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 4)) return

			state.colorCorrection.gainAdjust = {
				red: command.properties.numberData[0],
				green: command.properties.numberData[1],
				blue: command.properties.numberData[2],
				luma: command.properties.numberData[3],
			}
			changes.addChange(command.source, 'colorCorrection.gainAdjust')
			return
		}
		case AtemCameraControlColorCorrectionParameter.OffsetAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 4)) return

			state.colorCorrection.offsetAdjust = {
				red: command.properties.numberData[0],
				green: command.properties.numberData[1],
				blue: command.properties.numberData[2],
				luma: command.properties.numberData[3],
			}
			changes.addChange(command.source, 'colorCorrection.offsetAdjust')
			return
		}
		case AtemCameraControlColorCorrectionParameter.ContrastAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 2)) return

			state.colorCorrection.contrastAdjust = {
				pivot: command.properties.numberData[0],
				adj: command.properties.numberData[1],
			}
			changes.addChange(command.source, 'colorCorrection.contrastAdjust')
			return
		}
		case AtemCameraControlColorCorrectionParameter.LumaMix: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 1)) return

			state.colorCorrection.lumaMix = command.properties.numberData[0]

			changes.addChange(command.source, 'colorCorrection.lumaMix')
			return
		}
		case AtemCameraControlColorCorrectionParameter.ColorAdjust: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 2)) return

			state.colorCorrection.colorAdjust = {
				hue: command.properties.numberData[0],
				saturation: command.properties.numberData[1],
			}

			changes.addChange(command.source, 'colorCorrection.colorAdjust')
			return
		}

		case AtemCameraControlColorCorrectionParameter.ResetToDefaults:
			changes.addEvent(command.source, AtemCameraControlEvents.ColorResetToDefault)
			return

		default:
			assertNever(parameter)
			changes.addUnhandledMessage(command)
			return
	}
}
