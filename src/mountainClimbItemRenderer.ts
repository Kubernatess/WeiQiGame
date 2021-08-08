class mountainClimbItemRenderer extends eui.ItemRenderer {

    public constructor() {
        super();
        this.skinName = "mountainClimbItemRenderSkin";
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