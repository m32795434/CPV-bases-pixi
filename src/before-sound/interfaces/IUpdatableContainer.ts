import { Ticker } from "pixi.js";

export interface IUpdatableContainer {
    update(t: Ticker): void
}