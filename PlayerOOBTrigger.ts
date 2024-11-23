/**
 * Extended class that informs the player’s local OOB controller to respawn it when OOB
 */
import * as hz from 'horizon/core';
import { Events } from "Events";
import { PlayerFireEventOnTriggerBase } from 'PlayerEventTriggerBase';

class PlayerOOBTrigger extends PlayerFireEventOnTriggerBase<typeof PlayerOOBTrigger> {
  protected onEntityEnterTrigger(_enteredBy: hz.Entity): void { }
  protected onEntityExitTrigger(_exitedBy: hz.Entity): void { }
  protected onPlayerExitTrigger(_exitedBy: hz.Player): void { }

  protected onPlayerEnterTrigger(enteredBy: hz.Player): void {
    this.sendNetworkEvent(enteredBy, Events.onPlayerOutOfBounds, {});
  }

}
hz.Component.register(PlayerOOBTrigger);