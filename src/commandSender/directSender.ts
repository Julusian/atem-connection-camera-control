import { Commands, type Atem } from 'atem-connection'
import { AtemCameraControlCommandGenerator } from './baseGenerator.js'

export class AtemCameraControlDirectCommandSender extends AtemCameraControlCommandGenerator<Promise<void>> {
	readonly #atem: Atem

	constructor(atem: Atem) {
		super()

		this.#atem = atem
	}

	protected override async addCommand(command: Commands.CameraControlCommand): Promise<void> {
		await this.#atem.sendCommand(command)
	}
}
