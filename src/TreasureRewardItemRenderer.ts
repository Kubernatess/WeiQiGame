class TreasureRewardItemRender extends eui.ItemRenderer {

    private cloud: eui.Image;   

    public constructor() {
        super();
        this.skinName = "TreasureRewardItemRenderSkin";
    }

    protected childrenCreated() {	
        super.childrenCreated();

    }

    protected dataChanged(): void {
        super.dataChanged();
        if(this.data == 1){
            this.cloud.visible = true;
        }
        else{
            this.cloud.visible = false;
        }
    }

    $onAddToStage(stage, nest) {
        super.$onAddToStage(stage, nest);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onRemoveFromStage() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private onTouchTap(): void {
        //this.parent.touchChildren = false;
        setTimeout(()=>{
            this.parent.touchChildren = true;
        }, 3000);
    }

}