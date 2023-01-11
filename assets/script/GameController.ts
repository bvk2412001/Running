import { _decorator, Component, Node, Camera, input, Input, EventTouch, tween, Vec3, Vec2, SkeletalAnimation, math, instantiate } from 'cc';
import { CameraFollow } from './CameraFollow';
import { characterController } from './characterController';
import { GameModel } from './GameModel';
import { CharacterAction, CharacterAnimationName, Configs } from './Utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gameModel: Node

    gameModelController: GameModel
    characterNode: Node;

    private actionType = CharacterAction.RUN;
    private roadNode : Node
    start() {
        this.gameModelController = this.gameModel.getComponent(GameModel);
        this.playGame();
        this.createRoad();

    }

    playGame() {
        this.characterNode = this.gameModelController.characterNode;
        this.characterNode.getComponent(characterController).setUp();
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

    }

    createRoad(){
        let pos = 0;
        for(let i = 0; i < 10; i++){
            let road = instantiate(this.gameModelController.road);
            this.gameModelController.gamePlay.addChild(road)
            road.setWorldPosition(new Vec3(0,0, pos));
            pos+=15
        }
    }


    private posStart;

    private posEnd: Vec2
    onTouchStart(event: EventTouch) {
        this.posStart = event.getLocation();
    }



    onTouchEnd(event: EventTouch) {
        this.posEnd = event.getLocation();
        let kcY = this.posEnd.y - this.posStart.y;
        let kcX = this.posEnd.x - this.posStart.x;
        if (Math.abs(kcX) > Math.abs(kcY)) {
            if (kcX < 0) {
                this.characterAction(CharacterAction.LEFT)
            }
            else {
                this.characterAction(CharacterAction.RIGHT)
            }
        }
        else {
            if (kcY > 0) {
                this.characterAction(CharacterAction.UP);
            }
        }

    }

    private moveX;

    public characterAction(action) {
        switch (action) {
            case CharacterAction.LEFT:
                this.actionType = CharacterAction.LEFT;
                this.moveX = this.characterNode.getWorldPosition().x + Configs.NUMBER_TRANSLATE_LEFT;
                
                break;
            case CharacterAction.RIGHT:
                this.actionType = CharacterAction.RIGHT;
                this.moveX = this.characterNode.getWorldPosition().x - Configs.NUMBER_TRANSLATE_LEFT;
                break;
            case CharacterAction.UP:
                this.characterNode.getComponent(SkeletalAnimation).play("jump")
                setTimeout(() => {
                    this.characterNode.getComponent(SkeletalAnimation).play("run")
                }, 750)
                break;
        }
    }
    private v3_tam: Vec3 = new Vec3(0, 0, 0);
    update(deltaTime: number) {
        this.gameModelController.camera.getComponent(CameraFollow).lastUpdateCamera(this.characterNode);
        if (this.actionType === CharacterAction.LEFT) {
            if (this.characterNode.getWorldPosition().x == this.moveX) {
                this.actionType = CharacterAction.RUN;
            } else {
                let vec3_CharCurrent = this.characterNode.getWorldPosition()
                this.characterNode.setWorldPosition(new Vec3(Number((vec3_CharCurrent.x + 0.25).toFixed(2)), 0, vec3_CharCurrent.z))
                console.log(vec3_CharCurrent)
            }
        }
        if (this.actionType === CharacterAction.RIGHT) {
            if (this.characterNode.getWorldPosition().x == this.moveX) {
                this.actionType = CharacterAction.RUN;
            } else {
                let vec3_CharCurrent = this.characterNode.getWorldPosition()
                this.characterNode.setWorldPosition(new Vec3(Number((vec3_CharCurrent.x - 0.25).toFixed(2)), 0, vec3_CharCurrent.z))
                console.log(vec3_CharCurrent)
            }
        }
    }

}


