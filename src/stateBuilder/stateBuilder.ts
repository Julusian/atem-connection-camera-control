import type { Commands } from 'atem-connection'
import type { AtemCameraControlState } from '../state'
import { ChangesTracker, assertNever } from './changesTracker'
import { applyVideoCommand } from './video'
import { applyLensCommand } from './lens'
import { applyDisplayCommand } from './display'
import { applyColorCorrectionCommand } from './colorCorrection'
import { applyOutputCommand } from './output'
import { createEmptyState } from '../emptyState'
import { AtemCameraControlCategory } from '../ids'
import { AtemCameraControlChanges } from '../changes'

export class AtemCameraControlStateBuilder {
	readonly #states = new Map<number, AtemCameraControlState>()

	constructor(inputCount: number) {
		this.reset(inputCount)
	}

	reset(inputCount: number): void {
		this.#states.clear()

		for (let i = 1; i <= inputCount; i++) {
			this.#states.set(i, createEmptyState(i))
		}
	}

	get(cameraId: number): AtemCameraControlState | undefined {
		return this.#states.get(cameraId)
	}
	getAll(): AtemCameraControlState[] {
		return Array.from(this.#states.values())
	}

	#getOrCreateCamera(cameraId: number) {
		let state = this.#states.get(cameraId)
		if (!state) {
			state = createEmptyState(cameraId)
			this.#states.set(cameraId, state)
		}
		return state
	}

	applyCommands(commands: Commands.CameraControlUpdateCommand[]): AtemCameraControlChanges[] {
		if (commands.length === 0) return []

		const changes = new ChangesTracker()

		for (const command of commands) {
			const state = this.#getOrCreateCamera(command.source)

			const category = command.category as AtemCameraControlCategory
			switch (category) {
				case AtemCameraControlCategory.Lens:
					applyLensCommand(changes, command, state)
					break
				case AtemCameraControlCategory.Video:
					applyVideoCommand(changes, command, state)
					break
				case AtemCameraControlCategory.Display:
					applyDisplayCommand(changes, command, state)
					break
				case AtemCameraControlCategory.ColorCorrection:
					applyColorCorrectionCommand(changes, command, state)
					break
				case AtemCameraControlCategory.Output:
					applyOutputCommand(changes, command, state)
					break
				case AtemCameraControlCategory.Audio:
				case AtemCameraControlCategory.Tally:
				case AtemCameraControlCategory.Reference:
				case AtemCameraControlCategory.Configuration:
				case AtemCameraControlCategory.Media:
				case AtemCameraControlCategory.PTZControl:
					// Not implemented
					changes.addUnhandledMessage(command)
					break
				default:
					assertNever(category)
					changes.addUnhandledMessage(command)
					break
			}
		}

		return changes.getResult()
	}
}
