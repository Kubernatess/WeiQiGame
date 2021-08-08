class GridRewardItem extends eui.ItemRenderer {

    public constructor() {
        super();
    }

    protected createChildren(): void {
		super.createChildren();
        let reward: eui.Image = new eui.Image("heros04_png");
        this.addChild(reward);
    }

    protected childrenCreated(): void {
		super.childrenCreated();
		
    }
    
    protected dataChanged(): void {
        super.dataChanged();
        if (this.data%2 == 0) {

        }
        else {
            
        }
    }

	$onAddToStage(stage, nest) {
		super.$onAddToStage(stage, nest);
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

	private onRemoveFromStage() {
        super.$onRemoveFromStage();
	}

}