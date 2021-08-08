class TreasureHunt extends eui.Component {

    private gridList: eui.List;
    private hero: eui.Image;

    public constructor() {
        super();
        this.skinName = "TreasureHuntSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        let dataSource: Array<number> = [];
        for (let i = 0; i < 30; i++) {
            dataSource.push(1);
        }
        this.gridList.dataProvider = new eui.ArrayCollection(dataSource);

        // 玩家初始，处于随机的空格子上
        let rand: number = Math.floor((Math.random()*30));
        this.hero.x = this.getTargetX(rand);
        this.hero.y = this.getTargetY(rand);
        this.updateData(rand);
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

    private onTapItem(evt: eui.ItemTapEvent): void {
        let target: number = this.gridList.selectedIndex;
        // 点击有迷雾的格子,无反应
        let arr: eui.ArrayCollection = <eui.ArrayCollection>this.gridList.dataProvider;
        let item: number = arr.getItemAt(target);
        if (item == 1) {
            return;
        }

        // 如果点的是同一个格子
        if (this.curId == target) {
            return;
        }

        this.touchChildren = false;

        let tw: egret.Tween = this.moveToLocation(target);
        tw.call(()=>{
            this.updateData(target);
            this.touchChildren = true;
        }, this);
    }

    private curId: number = -1;

    private moveToLocation(target: number): egret.Tween {
        let nodeList: Array<number> = this.A_star_algorithm(this.curId, target);
        let tw: egret.Tween = egret.Tween.get(this.hero);
        for (let node of nodeList) {
            let targetX: number = this.getTargetX(node);
            let targetY: number = this.getTargetY(node);
            tw.call(()=>{
                this.hero.scaleX = this.hero.x < targetX ? 1 : -1;
            }, this);
            tw.to({ x: targetX, y: targetY }, 500);
        }
        return tw;
    }

    // A*寻路算法
    private A_star_algorithm(myPos:number, target:number): Array<number> {
        let openList: number[] = [];
        let closeList: number[] = [];
        let parentNodeList: any = {};
        openList.push(myPos);
        while (openList.length>0 && openList.indexOf(target)==-1) {
            openList.sort((pos1:number,pos2:number)=>{
                return this.calculate_F(myPos,pos1,target) - this.calculate_F(myPos,pos2,target);
            });
            let curPos: number = openList.shift();
            closeList.push(curPos);
            let neighbors: Array<number> = this.getAroundNodeList(curPos);
            for (let node of neighbors) {
                if (openList.indexOf(node)==-1 && closeList.indexOf(node)==-1) {
                    openList.push(node);
                    parentNodeList[node] = curPos;
                }
            }
        }
        let nodeList: Array<number> = [];
        let curNode: number = target;
        while (curNode != myPos) {
            nodeList.unshift(curNode);
            curNode = parentNodeList[curNode];
        }
        return nodeList;
    }

    // 权重值计算
    private calculate_F(myPos:number, temp:number, target:number): number {
        let myColumn: number = myPos % 5;
        let myRow: number = Math.floor(myPos / 5);
        let col: number = temp % 5;
        let row: number = Math.floor(temp/5);
        let targetColumn: number = target % 5;
        let targetRow: number = Math.floor(target/5);
        let G_value: number = Math.abs(myColumn - col) + Math.abs(myRow - row);
        let H_value: number = Math.abs(targetColumn - col) + Math.abs(targetRow - row);
        return G_value + H_value;
    }

    // 障碍物判断方法
    private isObstacle(pos: number): boolean {
        let myCollection: eui.ArrayCollection = <eui.ArrayCollection>this.gridList.dataProvider;
        let item: any = myCollection.getItemAt(pos);
        if (item == 1) {
            return true;
        }
        return false;
    }

    // 获得某一格子上下左右空白的位置
    private getAroundNodeList(target: number): Array<number> {
        let nodeList: Array<number> = [];
        let col: number = target % 5;
        let row: number = Math.floor(target / 5);
        if (col+1<=4 && !this.isObstacle(target+1)) {
            nodeList.push(target+1);
        }
        if (col-1>=0 && !this.isObstacle(target-1)) {
            nodeList.push(target-1);
        }
        if (row+1<=5 && !this.isObstacle(target+5)) {
            nodeList.push(target+5);
        }
        if (row-1>=0 && !this.isObstacle(target-5)) {
            nodeList.push(target-5);
        }
        return nodeList;
    }

    // 根据位置求出目标X
    private getTargetX(pos: number): number {
        let col: number = pos % 5;
        let targetX: number = col * 100 + 50;
        return targetX;
    }
    // 根据位置求出目标Y
    private getTargetY(pos: number): number {
        let row: number = Math.floor(pos / 5);
        let targetY: number = row * 100 + 50;
        return targetY;
    }


    private updateData(pos: number): void {
        let myCollection: eui.ArrayCollection = <eui.ArrayCollection>this.gridList.dataProvider;
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
    }
}