import { Commands } from 'atem-connection'
import type { AtemCameraControlChanges, AtemCameraControlEvents } from '../changes.js'

export class ChangesTracker {
	readonly #changes = new Map<number, AtemCameraControlChanges>()

	getResult(): AtemCameraControlChanges[] {
		return Array.from(this.#changes.values())
	}

	#getEntry(cameraId: number): AtemCameraControlChanges {
		let entry = this.#changes.get(cameraId)
		if (!entry) {
			entry = {
				cameraId,
				changes: [],
				events: [],

				unhandledMessages: [],
				invalidMessages: [],
			}
			this.#changes.set(cameraId, entry)
		}
		return entry
	}

	addChange(cameraId: number, path: string): void {
		const entry = this.#getEntry(cameraId)
		if (!entry.changes.includes(path)) {
			entry.changes.push(path)
		}
	}
	addEvent(cameraId: number, event: AtemCameraControlEvents): void {
		const entry = this.#getEntry(cameraId)
		if (!entry.events.includes(event)) {
			entry.events.push(event)
		}
	}

	addUnhandledMessage(command: Commands.CameraControlUpdateCommand): void {
		const entry = this.#getEntry(command.source)
		entry.unhandledMessages.push({
			categoryId: command.category,
			parameterId: command.parameter,
		})
	}

	checkMessageParameters(
		command: Commands.CameraControlUpdateCommand,
		expectedType: Commands.CameraControlDataType,
		minCount: number
	): boolean {
		let isValid = command.properties.type === expectedType

		if (isValid) {
			switch (expectedType) {
				case Commands.CameraControlDataType.BOOL:
					isValid = command.properties.boolData.length >= minCount
					break
				case Commands.CameraControlDataType.SINT8:
				case Commands.CameraControlDataType.SINT16:
				case Commands.CameraControlDataType.SINT32:
				case Commands.CameraControlDataType.FLOAT:
					isValid = command.properties.numberData.length >= minCount
					break
				case Commands.CameraControlDataType.SINT64:
					isValid = command.properties.bigintData.length >= minCount
					break
				case Commands.CameraControlDataType.STRING:
					isValid = command.properties.stringData.length >= minCount
					break
				default:
					assertNever(expectedType)
					isValid = false
					break
			}
		}

		if (!isValid) {
			const entry = this.#getEntry(command.source)
			entry.invalidMessages.push({
				categoryId: command.category,
				parameterId: command.parameter,
			})
		}

		return isValid
	}
}

export function assertNever(_val: never): void {
	// Nothing to do
}
