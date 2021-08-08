class LuckyTurntableUI extends eui.Component {

    private rewardList: eui.List;
    private pointer: eui.Image;
    private rotateBtn: eui.Button;
    private getResult: eui.Button;

    public constructor() {
        super();
        this.skinName = "LuckyTurntableUISkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        let dataSource: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
        this.rewardList.dataProvider = new eui.ArrayCollection(dataSource);
        this.rewardList.layout = new MyLayout();
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.rotateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotatePointer, this);
        this.getResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
    }

    private onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.rotateBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotatePointer, this);
        this.getResult.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        egret.Tween.removeTweens(this.pointer);
    }

    // 旋转转盘指针
    private rotatePointer(): void {
        this.rotateBtn.touchEnabled = false;
        let tw: egret.Tween = egret.Tween.get(this.pointer, { loop: true });
        let rotate: number = this.pointer.rotation + 360;
        tw.to({ rotation: rotate }, 400);
        this.getResult.touchEnabled = true;
    }

    // 旋转到指定位置
    private rotateToSpecifyPosition(): void {
        this.getResult.touchEnabled = false;
        egret.Tween.removeTweens(this.pointer);
        let rand: number = Math.floor(Math.random() * 8) + 1;
        console.log(rand);
        // 再转多两圈停下来
        let rotate: number = this.pointer.rotation + 360;
        let tw: egret.Tween = egret.Tween.get(this.pointer);
        tw.to({ rotation: rotate }, 2000);
        rotate += 360;
        tw.to({ rotation: rotate }, 2000);
        rotate = (360 / 8) * rand;
        tw.to({ rotation: rotate }, 2000, egret.Ease.circOut);
        tw.call(()=>{
            egret.Tween.removeTweens(this.pointer);
            this.rotateBtn.touchEnabled = true;
        }, this);
    }
}

// 自定义布局类
class MyLayout extends eui.LayoutBase {

    public constructor() {
        super();
    }

    public measure(): void {
        super.measure();
    }
    
    public updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
        super.updateDisplayList(unscaledWidth, unscaledHeight);
        if (this.target == null)
            return;
        let count: number = this.target.numElements;
        let hypotenuse: number = 200; // 斜边的长度
        for (var i: number = 0; i < count; i++) {
            var layoutElement: eui.UIComponent = <eui.UIComponent>(this.target.getVirtualElementAt(i));
            if (!egret.is(layoutElement, "eui.UIComponent") || !layoutElement.includeInLayout) {
                continue;
            }
            let degree: number = (360/count) * (i+4); // 度数
            let targetX: number = hypotenuse * (Math.cos(degree * Math.PI / 180)) - layoutElement.width/2;
            let targetY: number = hypotenuse * (Math.sin(degree * Math.PI / 180)) - layoutElement.height/2;
            if (i%2 != 0) {
                layoutElement.rotation = 45;
            }
            layoutElement.setLayoutBoundsPosition(targetX, targetY);
        }
    }
}