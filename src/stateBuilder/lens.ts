import { Commands } from 'atem-connection'
import { ChangesTracker, assertNever } from './changesTracker'
import { AtemCameraControlState } from '../state'
import { AtemCameraControlLensParameter } from '../ids'
import { AtemCameraControlEvents } from '../changes'

export function applyLensCommand(
	changes: ChangesTracker,
	command: Commands.CameraControlUpdateCommand,
	state: AtemCameraControlState
): void {
	const parameter = command.parameter as AtemCameraControlLensParameter
	switch (parameter) {
		case AtemCameraControlLensParameter.Focus: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 1)) return

			state.lens.focus = command.properties.numberData[0]
			changes.addChange(command.source, 'lens.focus')
			return
		}
		case AtemCameraControlLensParameter.AutoFocus: {
			changes.addEvent(command.source, AtemCameraControlEvents.LensAutoFocus)
			return
		}
		case AtemCameraControlLensParameter.ApertureFStop: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 1)) return

			// TODO - verify range
			state.lens.iris = command.properties.numberData[0]
			changes.addChange(command.source, 'lens.iris')
			return
		}
		case AtemCameraControlLensParameter.AutoAperture: {
			changes.addEvent(command.source, AtemCameraControlEvents.LensAutoIris)
			return
		}
		case AtemCameraControlLensParameter.OpticalImageStabilisation: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.BOOL, 1)) return

			state.lens.opticalImageStabilisation = command.properties.boolData[0]
			changes.addChange(command.source, 'lens.opticalImageStabilisation')
			return
		}
		case AtemCameraControlLensParameter.SetContinuousZoomSpeed: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.FLOAT, 1)) return

			state.lens.zoomSpeed = command.properties.numberData[0]
			changes.addChange(command.source, 'lens.zoomSpeed')
			return
		}

		case AtemCameraControlLensParameter.ApertureNormalised:
		case AtemCameraControlLensParameter.ApertureOrdinal:
		case AtemCameraControlLensParameter.SetAbsoluteZoomMM:
		case AtemCameraControlLensParameter.SetAbsoluteZoomNormalised:
			// Not implemented
			changes.addUnhandledMessage(command)
			return

		// case 8: {
		// 	//Zoom position
		// 	changed['zoomPosition'] = rawCommand.readUInt16BE(16) / 2048
		// 	changed['command'] = 'zoom'
		// 	break
		// }
		// case 9: {
		// 	//Zoom speed
		// 	changed['zoomSpeed'] = rawCommand.readInt16BE(16) / 2048
		// 	changed['command'] = 'zoom'
		// 	break
		// }
		default:
			assertNever(parameter)
			changes.addUnhandledMessage(command)
			return
	}
}
