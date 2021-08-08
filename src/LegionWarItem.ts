class LegionWarItem extends eui.ItemRenderer {
    private chess: eui.Image;

    public constructor() {
        super();
        this.width = 80;
        this.height = 43;
        this.touchChildren = false;
    }

    protected createChildren(): void {
        super.createChildren();
        let rect: eui.Rect = new eui.Rect();
        this.addChild(rect);
        rect.percentWidth = rect.percentHeight = 100;
        rect.alpha = 0;

        this.chess = new eui.Image();
        this.addChild(this.chess);
        this.chess.percentWidth = this.percentHeight = 100;
    }

    protected dataChanged(): void {
        super.dataChanged();
        let data: string = this.data;
        this.chess.source = data == "empty" ? "" : (data == "white" ? "wxz_bg_img_04_png" : "wxz_bg_img_03_png");
        this.touchEnabled = data == "empty";
    }
}