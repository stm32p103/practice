import { Graphics, Application, Point, Polygon, Renderer, autoDetectRenderer } from 'pixi.js';
import { Picture, Drawable, PictureIdType, Screen } from './interface';

class PixiPicture implements Picture {
    readonly graphic: Graphics = new Graphics();
    constructor(readonly id: PictureIdType){}
    draw(drawable: Drawable) {
        drawable.draw(this);
    }
    rotate(angle: number) {
        this.graphic.rotation += angle;
    }

    position(x: number, y: number) {
        this.graphic.position.x = x;
        this.graphic.position.y = y;
    }
}

export function createScreen(element?: HTMLCanvasElement): Screen {
    return new PixiScreen(element);
}

export class CellDrawable implements Drawable {
    constructor() {}
    draw(picture: Picture) {
        if(picture instanceof PixiPicture) {
            picture.graphic.clear();
            picture.graphic.lineStyle(1, 0xFFFFFF, 1);
            picture.graphic.beginFill(0xAAAFFF, 1);
            picture.graphic.drawRect(10,10,100,30)
            picture.graphic.endFill();
        }
    }
}

class PixiScreen implements Screen {
    readonly pixi: Application;
    readonly view: HTMLCanvasElement;
    readonly renderer: Renderer;
    private map: {[id: string]: PixiPicture} = {};

    constructor(element?: HTMLCanvasElement) {
        this.pixi = new Application( { view: element } );
        this.view = this.pixi.view;
    }

    create(id: PictureIdType) {
        let picture: PixiPicture;
        if(!!id) {
            picture = new PixiPicture(id);
            this.map[id] = picture;
            this.pixi.stage.addChild(picture.graphic);
        }
        return picture;
    }

    add(picture: Picture) {
        const tmp = this.map[picture.id];
        if(!(picture instanceof PixiPicture)) {
            throw new Error('NG');
        }

        if(!tmp) {
            this.map[picture.id] = picture;
            this.pixi.stage.addChild(picture.graphic);
        }
    }

    remove(picture: Picture | PictureIdType) {
        let id: PictureIdType;
        if(picture instanceof PixiPicture) {
            id = picture.id;
        }
        if(typeof picture == 'string' ) {
            id = picture;
        }
        if(!!id) {
            const removed = this.map[id];
            delete this.map[id];
            this.pixi.stage.removeChild(removed.graphic);
        }
    }

    getById(id: PictureIdType) {
        return this.map[id];
    }

    onTick(handler: ()=>void) {
        this.pixi.ticker.add( handler );
    }

    resize(w: number ,h: number) {
        this.pixi.renderer.resize(w,h);
    }
}
