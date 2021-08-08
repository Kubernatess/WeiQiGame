class LegionWar extends eui.Component {
    private grp: eui.Group;
    private gridList: eui.List;

    public constructor() {
        super();
        this.skinName = "LegionWarSkin";
    }

    private maxCol: number = 7;
    private maxRow: number = 10;

    protected childrenCreated(): void {
        super.childrenCreated();
        for (let i = 0; i < 54; i++) {
            let rect: eui.Rect = new eui.Rect(100, 100, 0x84C9FF);
            this.grp.addChild(rect);
            rect.strokeColor = 0x6F6F6F;
            rect.strokeWeight = 1;
        }

        let dataSource: Array<string> = [];
        for (let i = 0; i < this.maxCol * this.maxRow; i++)
            dataSource.push("empty");
        this.gridList.dataProvider = new eui.ArrayCollection(dataSource);
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.gridList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.gridList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
        egret.Tween.removeAllTweens();
    }

    private count: number = 0;

    private onTapItem(evt: eui.ItemTapEvent): void {
        let target: number = this.gridList.selectedIndex,
            arr: eui.ArrayCollection = <eui.ArrayCollection>this.gridList.dataProvider,
            fallColor: string = this.count % 2 == 0 ? "white" : "black";
        this.count++;
        arr.replaceItemAt(fallColor, target);
        // 往四个不同方向判断食子,最后判断自身是否也被食子
        let arounds: Array<number> = this.getAroundNodeList(target, false);
        arounds.push(target);
        for (let point of arounds) {
            let canEat: boolean = true,
                passedList: number[] = [],//记录遍历过的节点
                openList: number[] = [];//表示还能遍历的节点
            openList.push(point);
            while (openList.length > 0) {
                let curPos: number = openList.shift();
                if (arr.getItemAt(curPos) == "empty") {//找到空节点停止遍历,表示不能食子
                    canEat = false;
                    break;
                }
                passedList.push(curPos);
                let neighbors: Array<number> = this.getAroundNodeList(curPos, true);
                for (let node of neighbors)
                    if (openList.indexOf(node) == -1 && passedList.indexOf(node) == -1)
                        openList.push(node);
            }
            // 食子操作
            if (canEat) {
                let color: string = arr.getItemAt(point), reverse: string = color == "white" ? "black" : "white";
                passedList.forEach((node: number) => {
                    arr.replaceItemAt("empty", node);
                });
            }
        }
    }

    // 获得某一格子上下左右的格子,包括空节点
    private getAroundNodeList(target: number, isSame: boolean): Array<number> {
        let nodeList: Array<number> = [],
            col: number = target % this.maxCol, row: number = Math.floor(target / this.maxCol),
            arr: eui.ArrayCollection = <eui.ArrayCollection>this.gridList.dataProvider,
            color: string = arr.getItemAt(target), reverse: string = color == "white" ? "black" : "white";
        // 颜色选取
        color = isSame ? color : reverse;
        let rightItem: string = arr.getItemAt(target + 1);
        if (col + 1 < this.maxCol && rightItem && (rightItem == color || rightItem == "empty"))
            nodeList.push(target + 1);
        let leftItem: string = arr.getItemAt(target - 1);
        if (col - 1 >= 0 && leftItem && (leftItem == color || leftItem == "empty"))
            nodeList.push(target - 1);
        let nextItem: string = arr.getItemAt(target + this.maxCol);
        if (row + 1 < this.maxRow && nextItem && (nextItem == color || nextItem == "empty"))
            nodeList.push(target + this.maxCol);
        let lastItem: string = arr.getItemAt(target - this.maxCol);
        if (row - 1 >= 0 && lastItem && (lastItem == color || lastItem == "empty"))
            nodeList.push(target - this.maxCol);
        return nodeList;
    }
}