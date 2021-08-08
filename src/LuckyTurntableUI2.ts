class LuckyTurntableUI2 extends eui.Component {

    private rewardList: eui.List;
    private pointer: eui.Image;
    private rotateBtn: eui.Button;
    private getResult: eui.Button;

    private timer: egret.Timer;

    public constructor() {
        super();
        this.skinName = "LuckyTurntableUISkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        let dataSource: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
        this.rewardList.dataProvider = new eui.ArrayCollection(dataSource);
        this.rewardList.layout = new MyLayout();

        this.timer = new egret.Timer(500, 0);
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.rotateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTick, this);
        this.getResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    }

    private onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.rotateBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTick, this);
        this.getResult.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    }

    // 开启转盘定时器
    private onStartTick(): void {
        this.rotateBtn.touchEnabled = false;
        this.degreee = 20;
        egret.startTick(this.rotatePointer, this); 
        this.getResult.touchEnabled = true;
    }

    private degreee: number;

    // 旋转转盘指针
    private rotatePointer(): boolean {
        this.pointer.rotation += this.degreee;
        let rotate: number = (360 / 8) * (this.rand+1+4);
        while(rotate>180) rotate -= 360;
        let endAngle: number = rotate;
        let startAngle: number = endAngle - 2 * this.degreee;
        if (!this.timer.running && this.degreee<=4 && this.pointer.rotation>=startAngle && this.pointer.rotation<=endAngle) {
            egret.stopTick(this.rotatePointer, this);
            this.pointer.rotation = rotate; // 进到范围内,指针自动靠过去
            this.rotateBtn.touchEnabled = true;
        }
        return false;
    }

    /**
     *  超过180°,开始显示负数
     *  
     */

    private rand: number;

    // 旋转到指定位置(后台给出数据)
    private rotateToSpecifyPosition(): void {
        this.getResult.touchEnabled = false;
        this.rand = Math.floor(Math.random() * 8) + 1;
        console.log(this.rand);
        // 开始减速
        this.timer.reset();
        this.timer.start();
    }

    private timerFunc(): void {
        this.degreee -= 2;
        // 当速度为2的时候可以停止减小degree
        if (this.degreee<=4) {
            this.timer.stop();
        }
    }
}