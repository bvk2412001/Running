import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Vec3)
    offSetPos: Vec3 = new Vec3();

    @property(Vec3)
    lookAtOffSet: Vec3 = new Vec3();
    
    private smoothSpeed = 0.125;

    start() {
    }

    private v3_a = new Vec3();
    private v3_b = new Vec3();

    public lastUpdateCamera(characterNode: Node){
        characterNode.getWorldPosition(this.v3_a)
        Vec3.add(this.v3_b, this.v3_a, this.offSetPos);
        Vec3.lerp(this.v3_b, this.node.position, this.v3_b, this.smoothSpeed);
        this.node.setWorldPosition(this.v3_b);
        Vec3.add(this.v3_a, this.v3_a, this.lookAtOffSet)
        this.node.lookAt(this.v3_a)

        
    }
}


