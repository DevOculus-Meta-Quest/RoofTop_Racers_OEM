import * as hz from "horizon/core";
import { GameState } from "GameUtils";

export const Events = {
  // Game State Events
  onGameStateChanged: new hz.LocalEvent<{ fromState: GameState; toState: GameState; }>("onGameStateChanged"),
  onGameStartTimeLeft: new hz.LocalEvent<{ timeLeftMS: number }>("onGameStartTimeLeft"),
  onGameEndTimeLeft: new hz.LocalEvent<{ timeLeftMS: number }>("onGameEndTimeLeft"),
  onResetWorld: new hz.NetworkEvent("onResetWorld"),
  onResetLocalObjects: new hz.NetworkEvent("onResetLocalObjects"),

  // Player Match Events
  onRegisterPlayerForMatch: new hz.LocalEvent<{ player: hz.Player }>("onRegisterPlayerForMatch"),
  onDeregisterPlayerForMatch: new hz.LocalEvent<{ player: hz.Player }>("onDeregisterPlayerForMatch"),
  onPlayerJoinedStandby: new hz.LocalEvent<{ player: hz.Player }>("onPlayerJoinedStandby"),
  onPlayerLeftStandby: new hz.LocalEvent<{ player: hz.Player }>("onPlayerLeftStandby"),
  onPlayerLeftMatch: new hz.LocalEvent<{ player: hz.Player }>("onPlayerLeftMatch"),
  onPlayerReachedGoal: new hz.LocalEvent<{ player: hz.Player, matchTime: number }>("onPlayerReachedGoal"),

  // Player Controller Events
  onRegisterPlyrCtrl: new hz.LocalEvent<{ caller: hz.Entity }>("onRegisterPlyrCtrl"),
  onGetPlyrCtrlData: new hz.NetworkEvent<{ caller: hz.Player }>("onGetPlyrCtrlData"),
  onSetPlyrCtrlData: new hz.NetworkEvent<{ doubleJumpAmount: number; boostJumpAmount: number; boostJumpAngle: number; }>("onSetPlyrCtrlData"),

  // Player Boost and Double Jump Events
  onPlayerGotBoost: new hz.NetworkEvent("onPlayerGotBoost"),
  onPlayerUsedBoost: new hz.LocalEvent("onPlayerUsedBoost"),
  onPlayerUsedDoubleJump: new hz.LocalEvent("onPlayerUsedDoubleJump"),

  // Out of Bounds Events
  onRegisterOOBRespawner: new hz.LocalEvent<{ caller: hz.Entity }>("onRegisterOOBRespawner"),
  onGetOOBRespawnerData: new hz.NetworkEvent<{ caller: hz.Entity }>("onGetOOBRespawnerData"),
  onSetOOBRespawnerData: new hz.NetworkEvent<{ intervalMS: number; OOBWorldYHeight: number }>("onSetOOBRespawnerData"),
  onPlayerOutOfBounds: new hz.NetworkEvent("onPlayerOutOfBounds"),

  // Race HUD and Position Update Events
  onRegisterRaceHUD: new hz.LocalEvent<{ caller: hz.Entity }>("onRegisterRaceHUD"),
  onRacePosUpdate: new hz.NetworkEvent<{ playerPos: number; totalRacers: number; matchTime: number }>("onRacePosUpdate"),
  onStopRacePosUpdates: new hz.NetworkEvent("onStopRacePosUpdates"),

  // Leaderboard Event
  onUpdateLeaderboard: new hz.LocalEvent<{ player: hz.Player, matchTime: number }>("onUpdateLeaderboard")
};
