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
var mountainClimbItemRenderer = (function (_super) {
    __extends(mountainClimbItemRenderer, _super);
    function mountainClimbItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "mountainClimbItemRenderSkin";
        return _this;
    }
    mountainClimbItemRenderer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    mountainClimbItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data % 2 == 0) {
        }
        else {
        }
    };
    mountainClimbItemRenderer.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    mountainClimbItemRenderer.prototype.onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
    };
    return mountainClimbItemRenderer;
}(eui.ItemRenderer));
__reflect(mountainClimbItemRenderer.prototype, "mountainClimbItemRenderer");
