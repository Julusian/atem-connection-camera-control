import { Commands } from 'atem-connection'
import { ChangesTracker, assertNever } from './changesTracker'
import { AtemCameraControlState } from '../state'
import { AtemCameraControlDisplayParameter } from '../ids'

export function applyDisplayCommand(
	changes: ChangesTracker,
	command: Commands.CameraControlUpdateCommand,
	state: AtemCameraControlState
): void {
	const parameter = command.parameter as AtemCameraControlDisplayParameter
	switch (parameter) {
		case AtemCameraControlDisplayParameter.ColorBarEnable: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT8, 1)) return

			// TODO - should this be expressed in seconds shown?
			state.display.colorBarEnable = command.properties.numberData[0] > 1
			changes.addChange(command.source, 'lens.focus')
			return
		}

		case AtemCameraControlDisplayParameter.ExposureAndFocusTools: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT16, 1)) return

			const value = command.properties.numberData[0]
			state.display.exposureAndFocusTools = {
				zebra: (value & 1) !== 0,
				focusAssist: (value & 2) !== 0,
				falseColor: (value & 4) !== 0,
			}
			changes.addChange(command.source, 'display.exposureAndFocusTools')
			return
		}

		case AtemCameraControlDisplayParameter.Brightness:
		case AtemCameraControlDisplayParameter.ZebraLevel:
		case AtemCameraControlDisplayParameter.PeakingLevel:
		case AtemCameraControlDisplayParameter.FocusAssist:
		case AtemCameraControlDisplayParameter.ProgramReturnFeedEnable:
		case AtemCameraControlDisplayParameter.TimecodeSource:
			// Not implemented
			changes.addUnhandledMessage(command)
			return

		default:
			assertNever(parameter)
			changes.addUnhandledMessage(command)
			return
	}
}
