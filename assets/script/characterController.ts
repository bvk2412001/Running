import { _decorator, Component, Node, SkeletalAnimation, SkeletalAnimationComponent, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('characterController')
export class characterController extends Component {

    setUp(){
        this.node.getComponent(SkeletalAnimation).play("run")
    }
    start() {
    }

    update(deltaTime: number) {
        if(this.node)
            this.node.translate(new Vec3(0, 0, 0.01))
    }
}


