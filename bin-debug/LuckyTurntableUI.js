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
var LuckyTurntableUI = (function (_super) {
    __extends(LuckyTurntableUI, _super);
    function LuckyTurntableUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "LuckyTurntableUISkin";
        return _this;
    }
    LuckyTurntableUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var dataSource = [1, 2, 3, 4, 5, 6, 7, 8];
        this.rewardList.dataProvider = new eui.ArrayCollection(dataSource);
        this.rewardList.layout = new MyLayout();
    };
    LuckyTurntableUI.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.rotateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotatePointer, this);
        this.getResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
    };
    LuckyTurntableUI.prototype.onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.rotateBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotatePointer, this);
        this.getResult.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rotateToSpecifyPosition, this);
        egret.Tween.removeTweens(this.pointer);
    };
    // 旋转转盘指针
    LuckyTurntableUI.prototype.rotatePointer = function () {
        this.rotateBtn.touchEnabled = false;
        var tw = egret.Tween.get(this.pointer, { loop: true });
        var rotate = this.pointer.rotation + 360;
        tw.to({ rotation: rotate }, 400);
        this.getResult.touchEnabled = true;
    };
    // 旋转到指定位置
    LuckyTurntableUI.prototype.rotateToSpecifyPosition = function () {
        var _this = this;
        this.getResult.touchEnabled = false;
        egret.Tween.removeTweens(this.pointer);
        var rand = Math.floor(Math.random() * 8) + 1;
        console.log(rand);
        // 再转多两圈停下来
        var rotate = this.pointer.rotation + 360;
        var tw = egret.Tween.get(this.pointer);
        tw.to({ rotation: rotate }, 2000);
        rotate += 360;
        tw.to({ rotation: rotate }, 2000);
        rotate = (360 / 8) * rand;
        tw.to({ rotation: rotate }, 2000, egret.Ease.circOut);
        tw.call(function () {
            egret.Tween.removeTweens(_this.pointer);
            _this.rotateBtn.touchEnabled = true;
        }, this);
    };
    return LuckyTurntableUI;
}(eui.Component));
__reflect(LuckyTurntableUI.prototype, "LuckyTurntableUI");
// 自定义布局类
var MyLayout = (function (_super) {
    __extends(MyLayout, _super);
    function MyLayout() {
        return _super.call(this) || this;
    }
    MyLayout.prototype.measure = function () {
        _super.prototype.measure.call(this);
    };
    MyLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
        _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
        if (this.target == null)
            return;
        var count = this.target.numElements;
        var hypotenuse = 200; // 斜边的长度
        for (var i = 0; i < count; i++) {
            var layoutElement = (this.target.getVirtualElementAt(i));
            if (!egret.is(layoutElement, "eui.UIComponent") || !layoutElement.includeInLayout) {
                continue;
            }
            var degree = (360 / count) * (i + 4); // 度数
            var targetX = hypotenuse * (Math.cos(degree * Math.PI / 180)) - layoutElement.width / 2;
            var targetY = hypotenuse * (Math.sin(degree * Math.PI / 180)) - layoutElement.height / 2;
            if (i % 2 != 0) {
                layoutElement.rotation = 45;
            }
            layoutElement.setLayoutBoundsPosition(targetX, targetY);
        }
    };
    return MyLayout;
}(eui.LayoutBase));
__reflect(MyLayout.prototype, "MyLayout");
