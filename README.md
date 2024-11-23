# ATEM connection camera control - @atem-connection/camera-control

[![Node CI](https://github.com/julusian/atem-connection-camera-control/actions/workflows/node.yaml/badge.svg)](https://github.com/julusian/atem-connection-camera-control/actions/workflows/node.yaml)
[![npm](https://img.shields.io/npm/v/@atem-connection/camera-control)](https://www.npmjs.com/package/@atem-connection/camera-control)

## Usage

This library can be used with atem-connection [NPM](https://www.npmjs.com/package/atem-connection) [Github](https://github.com/nrkno/sofie-atem-connection), to provide a friendly interface for camera control.

### Example:

```ts
import { Atem, Commands } from 'atem-connection'
import { AtemCameraControlDirectCommandSender, AtemCameraControlStateBuilder } from '@atem-connection/camera-control'

// Create the class which tracks the current state from the atem
const cameraControlState = new AtemCameraControlStateBuilder(4)

const atem = new Atem({})
atem.connect('10.0.0.1')

// Create the command sender. Alternatively `AtemCameraControlBatchCommandSender` can be used to be able to batch multiple commands to be sent once
const cameraControlSender = new AtemCameraControlDirectCommandSender(atem)

atem.on('connected', () => {
	console.log('connected')

	// Perform an autofocus of camera 1 after a short timeout
	setTimeout(() => {
		cameraControlSender.lensTriggerAutoFocus(1)
	}, 1000)
})
atem.on('disconnected', () => {
	cameraControlState.reset()
})

atem.on('receivedCommands', (commands) => {
	const cameraCommands = []
	for (const command of commands) {
		if (command instanceof Commands.CameraControlUpdateCommand) cameraCommands.push(command)
	}

	const changes = cameraControlState.applyCommands(cameraCommands)

	// Do something based on the reported changes
	console.log('camera changes', changes)
})
```

## Development

### Setting up

- Clone the repository
- Install a compatible version of nodejs and yarn
- Build the project with `yarn build`

### Modifying the code

You can run `yarn build:main --watch` to rebuild the typescript code, which will re-run upon saving a file.

There are some unit tests, which can be run with `yarn unit`. This command calls into jest, so any jest arguments can also be used
