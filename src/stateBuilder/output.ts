import { Commands } from 'atem-connection'
import { ChangesTracker, assertNever } from './changesTracker'
import { AtemCameraControlState } from '../state'
import { AtemCameraControlOutputParameter } from '../ids'

export function applyOutputCommand(
	changes: ChangesTracker,
	command: Commands.CameraControlUpdateCommand,
	state: AtemCameraControlState
): void {
	const parameter = command.parameter as AtemCameraControlOutputParameter
	switch (parameter) {
		case AtemCameraControlOutputParameter.OverlayEnable: {
			if (!changes.checkMessageParameters(command, Commands.CameraControlDataType.SINT16, 1)) return

			state.output.overlayEnable = command.properties.numberData[0] !== 0
			changes.addChange(command.source, 'output.overlayEnable')
			return
		}

		case AtemCameraControlOutputParameter.FrameGuidesStyleCamera3_x:
		case AtemCameraControlOutputParameter.FrameGuidesOpacityCamera3_x:
		case AtemCameraControlOutputParameter.Overlays:
			// Not implemented
			changes.addUnhandledMessage(command)
			return

		default:
			assertNever(parameter)
			changes.addUnhandledMessage(command)
			return
	}
}
