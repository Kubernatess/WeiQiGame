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
var CustomLayoutDemo = (function (_super) {
    __extends(CustomLayoutDemo, _super);
    function CustomLayoutDemo() {
        return _super.call(this) || this;
    }
    CustomLayoutDemo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CustomLayoutDemo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var dataSource = [];
        for (var i = 0; i < 30; i++) {
            dataSource.push(i);
        }
        this.list.dataProvider = new eui.ArrayCollection(dataSource);
        this.list.layout = new MyLayout();
    };
    CustomLayoutDemo.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    CustomLayoutDemo.prototype.onRemoveFromStage = function () {
    };
    return CustomLayoutDemo;
}(eui.Component));
__reflect(CustomLayoutDemo.prototype, "CustomLayoutDemo", ["eui.UIComponent", "egret.DisplayObject"]);
