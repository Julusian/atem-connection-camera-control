export enum AtemCameraControlCategory {
	Lens = 0,
	Video = 1,
	Audio = 2,
	Output = 3,
	Display = 4,
	Tally = 5,
	Reference = 6,
	Configuration = 7,
	ColorCorrection = 8,
	Media = 10,
	PTZControl = 11,
}

export enum AtemCameraControlLensParameter {
	Focus = 0,
	AutoFocus = 1,
	ApertureFStop = 2,
	ApertureNormalised = 3,
	ApertureOrdinal = 4,
	AutoAperture = 5,
	OpticalImageStabilisation = 6,
	SetAbsoluteZoomMM = 7,
	SetAbsoluteZoomNormalised = 8,
	SetContinuousZoomSpeed = 9,
}

export enum AtemCameraControlVideoParameter {
	VideoMode = 0,
	GainCamera4_9 = 1,
	ManualWhiteBalance = 2,
	SetAutoWhiteBalance = 3,
	RestoreAutoWhiteBalance = 4,
	ExposureUs = 5,
	ExposureOrdinal = 6,
	DynamicRangeMode = 7,
	VideoSharpeningLevel = 8,
	RecordingFormat = 9,
	SetAutoExpsureMode = 10,
	ShutterAngle = 11,
	ShutterSpeed = 12,
	Gain = 13,
	ISO = 14,
	DisplayLUT = 15,
	NDFilterStop = 16,
}

export enum AtemCameraControlAudioParameter {
	MicLevel = 0,
	HeadphoneLevel = 1,
	HeadphoneProgramMix = 2,
	SpeakerLevel = 3,
	InputType = 4,
	InputLevels = 5,
	PhantomPower = 6,
}

export enum AtemCameraControlOutputParameter {
	OverlayEnable = 0,
	FrameGuidesStyleCamera3_x = 1,
	FrameGuidesOpacityCamera3_x = 2,
	Overlays = 3,
}

export enum AtemCameraControlDisplayParameter {
	Brightness = 0,
	ExposureAndFocusTools = 1,
	ZebraLevel = 2,
	PeakingLevel = 3,
	ColorBarEnable = 4,
	FocusAssist = 5,
	ProgramReturnFeedEnable = 6,
	TimecodeSource = 7,
}

export enum AtemCameraControlTallyParameter {
	TallyBrightness = 0,
	FrontTallyBrightness = 1,
	RearTallyBrightness = 2,
}

export enum AtemCameraControlReferenceParameter {
	Source = 0,
	Offset = 1,
}

export enum AtemCameraControlConfigurationParameter {
	RealTimEClock = 0,
	SystemLanguage = 1,
	Timezone = 2,
	Location = 3,
}

export enum AtemCameraControlColorCorrectionParameter {
	LiftAdjust = 0,
	GammaAdjust = 1,
	GainAdjust = 2,
	OffsetAdjust = 3,
	ContrastAdjust = 4,
	LumaMix = 5,
	ColorAdjust = 6,
	ResetToDefaults = 7,
}

export enum AtemCameraControlMediaParameter {
	Codec = 0,
	TransportMode = 1,
	PlaybackControl = 2,
	Stream = 5,
	StreamInformation = 6,
	StreamDsiplay3DLUT = 7,
}

export enum AtemCameraControlPTZControlParameter {
	PanTiltVelocity = 0,
	MemoryPreset = 1,
}
