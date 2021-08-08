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
var GridRewardItem = (function (_super) {
    __extends(GridRewardItem, _super);
    function GridRewardItem() {
        return _super.call(this) || this;
    }
    GridRewardItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var reward = new eui.Image("heros04_png");
        this.addChild(reward);
    };
    GridRewardItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GridRewardItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data % 2 == 0) {
        }
        else {
        }
    };
    GridRewardItem.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GridRewardItem.prototype.onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
    };
    return GridRewardItem;
}(eui.ItemRenderer));
__reflect(GridRewardItem.prototype, "GridRewardItem");
