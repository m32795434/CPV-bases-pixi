import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox(): Rectangle;
}
export function checkCollision(objtA: IHitbox, objtB: IHitbox): boolean {
    const rA = objtA.getHitbox()
    const rB = objtB.getHitbox()

    const mostRighttLeft = rA.left < rB.left ? rB.left : rA.left
    const mostLeftRight = rA.right < rB.right ? rA.right : rB.right
    const mostBottomTop = rA.top < rB.top ? rB.top : rA.top
    const mostTopBottom = rA.bottom < rB.bottom ? rA.bottom : rB.bottom

    const makesSenseHori = mostRighttLeft < mostLeftRight
    const makesSenseVert = mostBottomTop < mostTopBottom
    if (makesSenseHori && makesSenseVert) return true
    else return false
}