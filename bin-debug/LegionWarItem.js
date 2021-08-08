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
var LegionWarItem = (function (_super) {
    __extends(LegionWarItem, _super);
    function LegionWarItem() {
        var _this = _super.call(this) || this;
        _this.width = 80;
        _this.height = 43;
        _this.touchChildren = false;
        return _this;
    }
    LegionWarItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var rect = new eui.Rect();
        this.addChild(rect);
        rect.percentWidth = rect.percentHeight = 100;
        rect.alpha = 0;
        this.chess = new eui.Image();
        this.addChild(this.chess);
        this.chess.percentWidth = this.percentHeight = 100;
    };
    LegionWarItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.chess.source = data == "empty" ? "" : (data == "white" ? "wxz_bg_img_04_png" : "wxz_bg_img_03_png");
        this.touchEnabled = data == "empty";
    };
    return LegionWarItem;
}(eui.ItemRenderer));
__reflect(LegionWarItem.prototype, "LegionWarItem");
