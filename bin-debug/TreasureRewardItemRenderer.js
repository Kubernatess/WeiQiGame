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
var TreasureRewardItemRender = (function (_super) {
    __extends(TreasureRewardItemRender, _super);
    function TreasureRewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "TreasureRewardItemRenderSkin";
        return _this;
    }
    TreasureRewardItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TreasureRewardItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data == 1) {
            this.cloud.visible = true;
        }
        else {
            this.cloud.visible = false;
        }
    };
    TreasureRewardItemRender.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    TreasureRewardItemRender.prototype.onRemoveFromStage = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    TreasureRewardItemRender.prototype.onTouchTap = function () {
        var _this = this;
        //this.parent.touchChildren = false;
        setTimeout(function () {
            _this.parent.touchChildren = true;
        }, 3000);
    };
    return TreasureRewardItemRender;
}(eui.ItemRenderer));
__reflect(TreasureRewardItemRender.prototype, "TreasureRewardItemRender");
