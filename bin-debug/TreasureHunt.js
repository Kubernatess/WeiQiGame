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
var TreasureHunt = (function (_super) {
    __extends(TreasureHunt, _super);
    function TreasureHunt() {
        var _this = _super.call(this) || this;
        _this.curId = -1;
        _this.skinName = "TreasureHuntSkin";
        return _this;
    }
    TreasureHunt.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var dataSource = [];
        for (var i = 0; i < 30; i++) {
            dataSource.push(1);
        }
        this.gridList.dataProvider = new eui.ArrayCollection(dataSource);
        // 玩家初始，处于随机的空格子上
        var rand = Math.floor((Math.random() * 30));
        this.hero.x = this.getTargetX(rand);
        this.hero.y = this.getTargetY(rand);
        this.updateData(rand);
    };
    TreasureHunt.prototype.$onAddToStage = function (stage, nest) {
        _super.prototype.$onAddToStage.call(this, stage, nest);
        this.gridList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    TreasureHunt.prototype.onRemoveFromStage = function () {
        this.gridList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        egret.Tween.removeAllTweens();
    };
    TreasureHunt.prototype.onTapItem = function (evt) {
        var _this = this;
        var target = this.gridList.selectedIndex;
        // 点击有迷雾的格子,无反应
        var arr = this.gridList.dataProvider;
        var item = arr.getItemAt(target);
        if (item == 1) {
            return;
        }
        // 如果点的是同一个格子
        if (this.curId == target) {
            return;
        }
        this.touchChildren = false;
        var tw = this.moveToLocation(target);
        tw.call(function () {
            _this.updateData(target);
            _this.touchChildren = true;
        }, this);
    };
    TreasureHunt.prototype.moveToLocation = function (target) {
        var _this = this;
        var nodeList = this.A_star_algorithm(this.curId, target);
        var tw = egret.Tween.get(this.hero);
        var _loop_1 = function (node) {
            var targetX = this_1.getTargetX(node);
            var targetY = this_1.getTargetY(node);
            tw.call(function () {
                _this.hero.scaleX = _this.hero.x < targetX ? 1 : -1;
            }, this_1);
            tw.to({ x: targetX, y: targetY }, 500);
        };
        var this_1 = this;
        for (var _i = 0, nodeList_1 = nodeList; _i < nodeList_1.length; _i++) {
            var node = nodeList_1[_i];
            _loop_1(node);
        }
        return tw;
    };
    // A*寻路算法
    TreasureHunt.prototype.A_star_algorithm = function (myPos, target) {
        var _this = this;
        var openList = [];
        var closeList = [];
        var parentNodeList = {};
        openList.push(myPos);
        while (openList.length > 0 && openList.indexOf(target) == -1) {
            openList.sort(function (pos1, pos2) {
                return _this.calculate_F(myPos, pos1, target) - _this.calculate_F(myPos, pos2, target);
            });
            var curPos = openList.shift();
            closeList.push(curPos);
            var neighbors = this.getAroundNodeList(curPos);
            for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                var node = neighbors_1[_i];
                if (openList.indexOf(node) == -1 && closeList.indexOf(node) == -1) {
                    openList.push(node);
                    parentNodeList[node] = curPos;
                }
            }
        }
        var nodeList = [];
        var curNode = target;
        while (curNode != myPos) {
            nodeList.unshift(curNode);
            curNode = parentNodeList[curNode];
        }
        return nodeList;
    };
    // 权重值计算
    TreasureHunt.prototype.calculate_F = function (myPos, temp, target) {
        var myColumn = myPos % 5;
        var myRow = Math.floor(myPos / 5);
        var col = temp % 5;
        var row = Math.floor(temp / 5);
        var targetColumn = target % 5;
        var targetRow = Math.floor(target / 5);
        var G_value = Math.abs(myColumn - col) + Math.abs(myRow - row);
        var H_value = Math.abs(targetColumn - col) + Math.abs(targetRow - row);
        return G_value + H_value;
    };
    // 障碍物判断方法
    TreasureHunt.prototype.isObstacle = function (pos) {
        var myCollection = this.gridList.dataProvider;
        var item = myCollection.getItemAt(pos);
        if (item == 1) {
            return true;
        }
        return false;
    };
    // 获得某一格子上下左右空白的位置
    TreasureHunt.prototype.getAroundNodeList = function (target) {
        var nodeList = [];
        var col = target % 5;
        var row = Math.floor(target / 5);
        if (col + 1 <= 4 && !this.isObstacle(target + 1)) {
            nodeList.push(target + 1);
        }
        if (col - 1 >= 0 && !this.isObstacle(target - 1)) {
            nodeList.push(target - 1);
        }
        if (row + 1 <= 5 && !this.isObstacle(target + 5)) {
            nodeList.push(target + 5);
        }
        if (row - 1 >= 0 && !this.isObstacle(target - 5)) {
            nodeList.push(target - 5);
        }
        return nodeList;
    };
    // 根据位置求出目标X
    TreasureHunt.prototype.getTargetX = function (pos) {
        var col = pos % 5;
        var targetX = col * 100 + 50;
        return targetX;
    };
    // 根据位置求出目标Y
    TreasureHunt.prototype.getTargetY = function (pos) {
        var row = Math.floor(pos / 5);
        var targetY = row * 100 + 50;
        return targetY;
    };
    TreasureHunt.prototype.updateData = function (pos) {
        var myCollection = this.gridList.dataProvider;
        myCollection.replaceItemAt(0, pos);
        if ((pos % 5) - 1 >= 0) {
            myCollection.replaceItemAt(0, pos - 1);
            myCollection.itemUpdated(myCollection.getItemAt(pos - 1));
        }
        if ((pos % 5) + 1 <= 4) {
            myCollection.replaceItemAt(0, pos + 1);
            myCollection.itemUpdated(myCollection.getItemAt(pos + 1));
        }
        if (Math.floor((pos / 5) - 1) >= 0) {
            myCollection.replaceItemAt(0, pos - 5);
            myCollection.itemUpdated(myCollection.getItemAt(pos - 5));
        }
        if (Math.floor((pos / 5) + 1) <= 5) {
            myCollection.replaceItemAt(0, pos + 5);
            myCollection.itemUpdated(myCollection.getItemAt(pos + 5));
        }
        //myCollection.replaceAll(myCollection.source);
        this.curId = pos;
    };
    return TreasureHunt;
}(eui.Component));
__reflect(TreasureHunt.prototype, "TreasureHunt");
