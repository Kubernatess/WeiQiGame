class CustomLayoutDemo extends eui.Component implements eui.UIComponent {

	private list: eui.List;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		let dataSource: number[] = [];
		for (let i=0; i<30; i++) {
			dataSource.push(i);
		}
		
		this.list.dataProvider = new eui.ArrayCollection(dataSource);
		this.list.layout = new MyLayout();
	}

	$onAddToStage(stage, nest) {
		super.$onAddToStage(stage, nest);
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

	private onRemoveFromStage() {

	}
}