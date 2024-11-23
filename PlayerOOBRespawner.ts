/**
 * Simple script to register the spawner to the manager
 */
import { Events } from "Events";
import * as hz from 'horizon/core';

export class PlayerOOBRespawner extends hz.Component<typeof PlayerOOBRespawner> {
    start() {
        this.sendLocalBroadcastEvent(Events.onRegisterOOBRespawner, { caller: this.entity });
    }
}
hz.Component.register(PlayerOOBRespawner);
