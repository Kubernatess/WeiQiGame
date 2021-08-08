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
var LegionWar = (function (_super) {
    __extends(LegionWar, _super);
    function LegionWar() {
        var _this = _super.call(this) || this;
        _this.maxCol = 7;
        _this.maxRow = 10;
        _this.count = 0;
        _this.skinName = "LegionWarSkin";
        return _this;
    }
    LegionWar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        for (var i = 0; i < 54; i++) {
            var rect = new eui.Rect(100, 100, 0x84C9FF);
            this.grp.addChild(rect);
            rect.strokeColor = 0x6F6F6F;
            rect.strokeWeight = 1;
        }
        var dataSource = [];
        for (var i = 0; i < this.maxCol * this.maxRow; i++)
            dataSource.push("empty");
        this.gridList.dataProvider = new eui.ArrayCollection(dataSource);
    };
    LegionWar.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.gridList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    LegionWar.prototype.onRemoveFromStage = function () {
        this.gridList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        egret.Tween.removeAllTweens();
    };
    LegionWar.prototype.onTapItem = function (evt) {
        var target = this.gridList.selectedIndex, arr = this.gridList.dataProvider, fallColor = this.count % 2 == 0 ? "white" : "black";
        this.count++;
        arr.replaceItemAt(fallColor, target);
        // 往四个不同方向判断食子,最后判断自身是否也被食子
        var arounds = this.getAroundNodeList(target, false);
        arounds.push(target);
        for (var _i = 0, arounds_1 = arounds; _i < arounds_1.length; _i++) {
            var point = arounds_1[_i];
            var canEat = true, passedList = [], //记录遍历过的节点
            openList = []; //表示还能遍历的节点
            openList.push(point);
            while (openList.length > 0) {
                var curPos = openList.shift();
                if (arr.getItemAt(curPos) == "empty") {
                    canEat = false;
                    break;
                }
                passedList.push(curPos);
                var neighbors = this.getAroundNodeList(curPos, true);
                for (var _a = 0, neighbors_1 = neighbors; _a < neighbors_1.length; _a++) {
                    var node = neighbors_1[_a];
                    if (openList.indexOf(node) == -1 && passedList.indexOf(node) == -1)
                        openList.push(node);
                }
            }
            // 食子操作
            if (canEat) {
                var color = arr.getItemAt(point), reverse = color == "white" ? "black" : "white";
                passedList.forEach(function (node) {
                    arr.replaceItemAt("empty", node);
                });
            }
        }
    };
    // 获得某一格子上下左右的格子,包括空节点
    LegionWar.prototype.getAroundNodeList = function (target, isSame) {
        var nodeList = [], col = target % this.maxCol, row = Math.floor(target / this.maxCol), arr = this.gridList.dataProvider, color = arr.getItemAt(target), reverse = color == "white" ? "black" : "white";
        // 颜色选取
        color = isSame ? color : reverse;
        var rightItem = arr.getItemAt(target + 1);
        if (col + 1 < this.maxCol && rightItem && (rightItem == color || rightItem == "empty"))
            nodeList.push(target + 1);
        var leftItem = arr.getItemAt(target - 1);
        if (col - 1 >= 0 && leftItem && (leftItem == color || leftItem == "empty"))
            nodeList.push(target - 1);
        var nextItem = arr.getItemAt(target + this.maxCol);
        if (row + 1 < this.maxRow && nextItem && (nextItem == color || nextItem == "empty"))
            nodeList.push(target + this.maxCol);
        var lastItem = arr.getItemAt(target - this.maxCol);
        if (row - 1 >= 0 && lastItem && (lastItem == color || lastItem == "empty"))
            nodeList.push(target - this.maxCol);
        return nodeList;
    };
    return LegionWar;
}(eui.Component));
__reflect(LegionWar.prototype, "LegionWar");
