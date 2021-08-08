var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LuckyTurntableUI2 = (function (_super) {
    __extends(LuckyTurntableUI2, _super);
    function LuckyTurntableUI2() {
        var _this = _super.call(this) || this;
        _this.skinName = "LuckyTurntableUISkin";
        return _this;
    }
    LuckyTurntableUI2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var dataSource = [1, 2, 3, 4, 5, 6, 7, 8];
        this.rewardList.dataProvider = new eui.ArrayCollection(dataSource);
        this.rewardList.layout = new MyLayout();
        this.timer = new egret.Timer(500, 0);
    };
    LuckyTurntableUI2.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.rotateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTick, this);
        this.getResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    };
    LuckyTurntableUI2.prototype.onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.rotateBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartTick, this);
        this.getResult.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    };
    // 开启转盘定时器
    LuckyTurntableUI2.prototype.onStartTick = function () {
        this.rotateBtn.touchEnabled = false;
        this.degreee = 20;
        egret.startTick(this.rotatePointer, this);
        this.getResult.touchEnabled = true;
    };
    // 旋转转盘指针
    LuckyTurntableUI2.prototype.rotatePointer = function () {
        this.pointer.rotation += this.degreee;
        var rotate = (360 / 8) * (this.rand + 1 + 4);
        while (rotate > 180)
            rotate -= 360;
        var endAngle = rotate;
        var startAngle = endAngle - 2 * this.degreee;
        if (!this.timer.running && this.degreee <= 4 && this.pointer.rotation >= startAngle && this.pointer.rotation <= endAngle) {
            egret.stopTick(this.rotatePointer, this);
            this.pointer.rotation = rotate; // 进到范围内,指针自动靠过去
            this.rotateBtn.touchEnabled = true;
        }
        return false;
    };
    // 旋转到指定位置(后台给出数据)
    LuckyTurntableUI2.prototype.rotateToSpecifyPosition = function () {
        this.getResult.touchEnabled = false;
        this.rand = Math.floor(Math.random() * 8) + 1;
        console.log(this.rand);
        // 开始减速
        this.timer.reset();
        this.timer.start();
    };
    LuckyTurntableUI2.prototype.timerFunc = function () {
        this.degreee -= 2;
        // 当速度为2的时候可以停止减小degree
        if (this.degreee <= 4) {
            this.timer.stop();
        }
    };
    return LuckyTurntableUI2;
}(eui.Component));
__reflect(LuckyTurntableUI2.prototype, "LuckyTurntableUI2");
