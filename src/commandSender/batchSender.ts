import { Commands, type Atem } from 'atem-connection'
import { AtemCameraControlCommandGenerator } from './baseGenerator.js'

export class AtemCameraControlBatchCommandSender extends AtemCameraControlCommandGenerator<void> {
	readonly #atem: Atem
	readonly #pendingBatch: Commands.CameraControlCommand[] = []

	constructor(atem: Atem) {
		super()

		this.#atem = atem
	}

	get hasPendingCommands(): boolean {
		return this.#pendingBatch.length > 0
	}

	public discardBatch(): void {
		this.#pendingBatch.splice(0, this.#pendingBatch.length)
	}

	public async sendBatch(): Promise<void> {
		const commands = this.#pendingBatch.splice(0, this.#pendingBatch.length)
		return this.#atem.sendCommands(commands)
	}

	protected override addCommand(command: Commands.CameraControlCommand): void {
		this.#pendingBatch.push(command)
	}
}
