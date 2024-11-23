/**
 * Extended class that sends an event to the player’s local controller to allow boosting
 */
import * as hz from 'horizon/core';
import { Events } from "Events";
import { PlayerFireEventOnTriggerBase } from 'PlayerEventTriggerBase';

class PlayerBoostPowerUpTrigger extends PlayerFireEventOnTriggerBase<typeof PlayerBoostPowerUpTrigger> {
  protected onEntityEnterTrigger(_enteredBy: hz.Entity): void { }
  protected onEntityExitTrigger(_exitedBy: hz.Entity): void { }
  protected onPlayerExitTrigger(_exitedBy: hz.Player): void { }

  protected onPlayerEnterTrigger(enteredBy: hz.Player): void {
    this.sendNetworkEvent(enteredBy, Events.onPlayerGotBoost, {});
  }

}
hz.Component.register(PlayerBoostPowerUpTrigger);
