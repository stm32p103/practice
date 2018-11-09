import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { WindowSize, WindowSizeObserver } from '../../modules';

@Injectable()
export class WindowSizeService {
    private windowSize: WindowSizeObserver;

    constructor() {
        this.windowSize = new WindowSizeObserver();
        this.windowSize.attatch();
    }
    
    get size$(): Observable<WindowSize> {
        return this.windowSize.size$;
    }
    
    get size(): WindowSize {
        return this.windowSize.size;
    }
}
