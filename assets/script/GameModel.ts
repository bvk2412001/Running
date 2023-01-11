import { _decorator, Component, Node, Camera, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property(Camera)
    camera: Camera

    @property(Node)
    characterNode: Node

    @property(Prefab)
    road : Prefab

    @property(Node)
    gamePlay : Node

}


