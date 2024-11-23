import * as hz from 'horizon/core';
import { GameState, Pool } from 'GameUtils';
import { Events } from "Events";

export class EnvironmentalSoundManager extends hz.Component<typeof EnvironmentalSoundManager> {
  static propsDefinition = {
    LobbyBGAudio: { type: hz.PropTypes.Entity },
    LobbyReadyUpBGAudio: { type: hz.PropTypes.Entity },
    RaceBGAudio: { type: hz.PropTypes.Entity },
    countdown10VO: { type: hz.PropTypes.Entity },
    countdown3VO: { type: hz.PropTypes.Entity },
    countdown2VO: { type: hz.PropTypes.Entity },
    countdown1VO: { type: hz.PropTypes.Entity },
    matchStartedVO: { type: hz.PropTypes.Entity },
    matchEndingVO: { type: hz.PropTypes.Entity },
    matchEndedVO: { type: hz.PropTypes.Entity },
  };

  private static s_instance: EnvironmentalSoundManager;
  public static getInstance(): EnvironmentalSoundManager {
    return EnvironmentalSoundManager.s_instance;
  }

  constructor() {
    super();
    if (EnvironmentalSoundManager.s_instance === undefined) {
      EnvironmentalSoundManager.s_instance = this;
    } else {
      console.error(`There are two ${this.constructor.name} in the world!`);
      return;
    }
  }

  private readonly BGMAudioOptions: hz.AudioOptions = { fade: 2 };
  private readonly VOAudioOptions: hz.AudioOptions = { fade: 0 };
  private audioMap = new Map<string, hz.AudioGizmo | null>();

  preStart() {
    this.initAudioEntities();

    this.manageBackgroundAudio(this.props.LobbyBGAudio);

    this.connectLocalBroadcastEvent(Events.onGameStateChanged, (data) => {
      this.handleGameStateChange(data.fromState, data.toState);
    });

    this.connectLocalBroadcastEvent(Events.onGameStartTimeLeft, (data) => {
      this.playCountdownAudio(data.timeLeftMS);
    });

    this.connectLocalBroadcastEvent(Events.onGameEndTimeLeft, (data) => {
      this.playCountdownAudio(data.timeLeftMS);
    });
  }

  start() {}

  private initAudioEntities() {
    // Store audio entities in a map to simplify access
    this.audioMap.set('LobbyBGAudio', this.props.LobbyBGAudio?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('LobbyReadyUpBGAudio', this.props.LobbyReadyUpBGAudio?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('RaceBGAudio', this.props.RaceBGAudio?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('countdown10VO', this.props.countdown10VO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('countdown3VO', this.props.countdown3VO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('countdown2VO', this.props.countdown2VO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('countdown1VO', this.props.countdown1VO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('matchStartedVO', this.props.matchStartedVO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('matchEndingVO', this.props.matchEndingVO?.as(hz.AudioGizmo) ?? null);
    this.audioMap.set('matchEndedVO', this.props.matchEndedVO?.as(hz.AudioGizmo) ?? null);
  }

  private handleGameStateChange(fromState: GameState, toState: GameState) {
    switch (toState) {
      case GameState.StartingMatch:
        this.manageBackgroundAudio(this.props.LobbyReadyUpBGAudio);
        this.playVoiceOver('matchStartedVO');
        break;
      case GameState.PlayingMatch:
        this.manageBackgroundAudio(this.props.RaceBGAudio);
        break;
      case GameState.ReadyForMatch:
        this.manageBackgroundAudio(this.props.LobbyBGAudio);
        break;
      case GameState.EndingMatch:
        this.playVoiceOver('matchEndingVO');
        break;
      case GameState.CompletedMatch:
        this.playVoiceOver('matchEndedVO');
        break;
    }
  }

  private playCountdownAudio(timeLeftMS: number) {
    if (timeLeftMS <= 3500 && timeLeftMS > 2500) {
      this.playVoiceOver('countdown3VO');
    } else if (timeLeftMS <= 2500 && timeLeftMS > 1500) {
      this.playVoiceOver('countdown2VO');
    } else if (timeLeftMS <= 1500) {
      this.playVoiceOver('countdown1VO');
    } else if (timeLeftMS <= 10500 && timeLeftMS > 9500) {
      this.playVoiceOver('countdown10VO');
    }
  }

  private manageBackgroundAudio(targetAudio: hz.Entity | undefined) {
    const audioEntities = ['LobbyBGAudio', 'LobbyReadyUpBGAudio', 'RaceBGAudio'];

    // Stop other background audios, play the target audio
    for (const audioKey of audioEntities) {
      const audioGizmo = this.audioMap.get(audioKey);
      if (audioGizmo && targetAudio?.as(hz.AudioGizmo) !== audioGizmo) {
        audioGizmo.stop(this.BGMAudioOptions);
      }
    }

    targetAudio?.as(hz.AudioGizmo)?.play(this.BGMAudioOptions);
  }

  private playVoiceOver(key: string) {
    this.audioMap.get(key)?.play(this.VOAudioOptions);
  }
}

hz.Component.register(EnvironmentalSoundManager);
