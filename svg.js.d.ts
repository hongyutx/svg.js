// Type definitions for svg.js
// Project: http://www.svgjs.com/
// Definitions by: Sean Hess <https://seanhess.github.io/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// Reference: http://documentup.com/wout/svg.js


// TODO sets
// TODO gradients
export = svgjs;
export as namespace svgjs;

declare var svgjs:svgjs.Library;

declare module svgjs {

    export interface LinkedHTMLElement extends HTMLElement {
        //instance: Element;
    }

    export interface Library {
        (selector: string): Doc;
        //Line(x0: number, y0: number, x1: number, y1: number): Line;
        (domElement:HTMLElement):Doc;
        create(name:string):any;
        //Element:ElementStatic;
        //supported:boolean;
        get(id:string):Element;
        extend(parent:Object, obj:Object):void;
        eid(typenaneL: string):string;
    }

    export interface Doc extends Container {
        pattern(w:number, h:number, add:(e:Element)=>void):Pattern;
        
        defs():Defs;

        mask():Mask;
        marker(w: number, h: number, block: Function): Marker;
        // TODO gradients
    }


    // https://github.com/wout/svg.filter.js
    export interface Filter {
        gaussianBlur(values:string):Filter;
        colorMatrix(name:string, value:number):Filter;
        colorMatrix(name:string, matrix:number[]):Filter;
        componentTransfer(components:{rgb?: FilterComponentTransfer; g?: FilterComponentTransfer;}):Filter;
        offset(x:number, y:number):Filter;
        blend():Filter;
        in(source:FilterSource):Filter;
        //sourceAlpha:FilterSource;
        //source:FilterSource;
    } 

    export interface FilterSource {

    }


    export interface FilterComponentTransfer {
        //type: string;
        //tableValues?: string;
        //slope?: number;
        //intercept: number;
        //amplitude: number;
        //exponent: number;
        //offset: number;
    }

    export interface CustomEventData {
        bubbles: boolean,
        cancelable: boolean,
        detail: {};
    }
    
    export interface Element {
        x1(): any;
        y1(): any;
        x2(): any;
        y2(): any;

        x(x: number): Element;
        y(y: number): Element;
        cx(x: number): Element;
        cy(y: number): Element;
        cx(): number;
        cy(): number;
        move(x: number, y: number): Element;
        center(x: number, y: number): Element;
        width(w: number): Element;
        height(h: number): Element;
        width(): number;
        height(): number;
        size(w: any, h: any): Element;
        
        clone(): Element;
        remove(): Element;
        replace(e: Element): Element;
        addTo(p: Parent): Parent;
        putIn(p: Parent): Parent;

        id(id: string): Element;
        inside(x: number, y: number): boolean;
        show(): Element;
        hide(): Element;
        visible(): boolean;
        toString(): string;
        //TODO classes():
        hasClass(name: string): boolean;
            removeClass(name: string): Element;
        toggleClass(name: string): Element;
        reference(attr: string): Element;

        container(): Container;
        parent(type: Object): Object;
        doc(): Doc;
        parents(type: Object): Object[];
        //matches
        native(): LinkedHTMLElement;
        svg(svg: string): Element;

        writeDataToDom(): Element;
        setData(o: Object): Element;

        point(x: number, y: number): Point;
        attr(n: string): Element;
        attr(n: string, v: number): Element;
        attr(n: string, v: string): Element;
        attr(n: string, v: Object): Element;
        attr(o: Object): Element;

        //attr(): Attribute;
        
        transform(): Transform;
        transform(n: string): number;
        transform(o: Object, relative: boolean): Element;

        node: SVGElement;

        nested():Doc;

        animate(duration?:number, ease?:string, delay?:number):Animation;
        animate(info:{ease?:string; duration?:number; delay?:number}):Animation;

        size(w:number, h:number, anchor?:boolean):Element;

        filter(adder:(filter:Filter)=>void):Element;        

        style(name:string, value:string):Element;
        style(obj:Object):Element;
        style(name:string):string;
        style():string;
        bbox():BBox;
        rbox():RBox;
        doc():Doc;
        data(name:string):any;
        data(name:string, value:any):Element;
        remember(name:string, value:any):Element;
        remember(name:string):any;
        remember(obj:Object):Element;
        forget(...keys:string[]):Element;

        fill(fill:{color?:string; opacity?:number}):Element;
        fill(color:string):Element;
        fill(pattern:Element):Element;
        stroke(data:{color?:string; opacity?:number; width?: number; dasharray?: string}):Element;
	    stroke(color:string):Element;
        opacity(o:number):Element;
        rotate(d:number, cx?:number, cy?:number):Element;
        skew(x:number, y:number):Element;
        scale(x:number, y:number):Element;
        translate(x:number, y:number):Element;
        translateFull(x:number, y:number, relative:boolean):Element;

        maskWith(element:Element):Element;
        //masker:Element;
        unmask():Element;

        clipWith(element:Element):Element;
        //clipper:Element;
        unclip():Element;

        front():Element;
        back():Element;
        forward():Element;
        backward():Element;

        siblings():Element[];
        position():number;
        next():Element;
        previous():Element;
        before(element:Element):Element;
        after(element:Element):Element;


        click(cb:Function):void;
        on(event:string, cb:Function):void;
        off(event:string, cb:Function):void;
        fire(event:string, data:any);
        
        //matrix(): svgjs.Matrix;
        screenCTM(): Matrix;
        ctm(): Matrix;
        point(x: Number, y: Number): Point;

        svg(): string;
        svg(str: string);
    }

    export interface Parent extends Element {
   	    children(): Array<SVGElement>;	
	    add(e: Element, i?: number): Parent;
	    put(e: Element, i?: number): Parent;
    	    has(e: Element): Boolean;
	    index(e: Element): number;
	    get(i: number): Element;
	    first(): Element;
	    last(): Element;
        //    each(iterator:(i?:number, children?:Element[])=>void, deep?:boolean): Parent;
	    removeElement(e: Element): Parent;
	    clear(): Parent;
	    defs(): Defs;

	    ungroup(parent: Parent, depth: number): Parent;
	    flatten(parent: Parent, depth: number): Parent;
	    element(e: Element, inherit: boolean): Parent;
	    symbol(): Parent;
	    font(o: Object): Parent;
	    select(query: string): Element;
        
	    rect(w:number, h:number):Rect;
        ellipse(w:number, h:number):Element;
        circle(diameter:any):Element;
        line(x1:any, y1:any, x2:any, y2:any): Line;
        polyline(data:string):Element;
        polyline(points:number[][]):Element;
        polygon(data:string):Element;
        polygon(points:number[][]):Element;
        path(data:string): Path;
        image(url:string, w?:number, h?:number): Element;
        text(text:string): Text;
        text(adder:(element:Element)=>void): Element;
        use(element:Element): Use;
        arc(x1: Number, y1: Number, r: Number, sweepFlag: Number, x2: Number, y2: Number): Arc;

        group():Group;
    }


    export interface Container extends Parent{
   	viewbox(x: any, y: any, w: any, h: any);
    viewbox(): ViewBox;	
    }
    
    export interface Pattern extends Container {
        
    }
    export interface Use extends Shape{
        
    }
    
    export interface Rect extends Shape {

    }

    export interface Group extends Container {
        gbox(): BBox;
    }

    export interface Marker extends Container {
    
    }
    
    export interface Point {
	x: number;
	y: number;
	
    /*
	morph(p: Point): Point;
	at(pos: number): Point;
	*/
    clone(): Point;
    transform(m: Matrix): Point;
    translate(x: number, y: number): Point;
    
    direction(pt: Point): string;
    distance(pt: Point): number;
    distanceToLine(pt1: Point, pt2: Point): number;
    withinLineRange(pt1: Point, pt2: Point): boolean;
    onArc(a: Arc): boolean;
    equals(p: Point): boolean;
    closeEnough(x: number, y: number): boolean;
    }

    export interface Shape extends Element {
        marker(pos: string, m: Marker);
        mid(): Point;
    }

    export interface Line extends Shape{
    	//array(): PointArray;
        plot(x1: number, y1: number, x2: number, y2: number): Line;
        marker(pos: string, m: Marker);
    }

    export interface Path extends Shape {
        marker(pos: string, m: Marker);
    }

    export interface Arc extends Path {
        plotRadius(x1: number, y1: number, r: number, largeArcFlag: number, sweepFlag: number, x2: number, y2: number): Arc;        
        plot(x1: number, y1: number, h: number, sweepFlag: number, x2: number, y2: number): Arc;    
        
        h(): number;
        angle(): number;
        flag(): number;
        sweep(f: number);
        sweep(): number;
        length(): number;
        ptOnArc(pt: Point): boolean;
    }
    
    export interface Circle extends Shape {
        radius(r: number);
    }
    
    export interface ViewBox {
    	x: number;
	y: number;
	width: number;
	height: number;
    }
    export interface Mask extends Element {
        add(element:Element):Mask;
    }

    export interface Tspan extends Shape  {
    	newLine(): Tspan;
	text(t?: string): Tspan;
	clear(): Tspan;
	length(): number;
    }

    export interface Text extends Shape{
	text(): string;
    text(s: string): Text;
	tspan(): Tspan;
	plain(s?: string): Text;
	size(s: number): Text;
	leading(v: number): Text;
	build(v: boolean): Text;
	rebuild(v: boolean): Text;
	clear(): Text;
	length(): number;
	lines(): Set;
    font(font:{family?:string; size?:number; anchor?:string; leading?:string}):Element;
    textPath(): TextPath;
    path(p: string): Text;
    plot(p: string): Text;
    track(): Path;
    }

    export interface TextPath extends Element {
	plot(d: string);
    path(p: string);
    
    }

    export interface ElementStatic extends Parent {
        new(node:any):Element;
    }

    export interface Set {
    }

    export interface Defs extends Container {}


    export interface Animation {
        stop():Animation;

        attr(name:string, value:any, namespace?:string):Animation;
        attr(obj:Object):Animation;
        attr(name:string):any;

        viewbox(x:number, y:number, w:number, h:number):Animation;

        move(x:number, y:number, anchor?:boolean):Animation;
        x(x:number, anchor?:boolean):Animation;
        y(y:number, anchor?:boolean):Animation;
        
        center(x:number, y:number, anchor?:boolean):Animation;
        cx(x:number, anchor?:boolean):Animation;
        cy(y:number, anchor?:boolean):Animation;

        size(w:number, h:number, anchor?:boolean):Animation;
        during(cb:(pos:number)=>void):Animation;
        to(value:number):Animation;
        after(cb:()=>void):Animation;

        // TODO style, etc, bbox... 
    }
    
    export interface Parent {
        put(element:Element, i?:number):Element;
        add(element:Element, i?:number):Element;
        children():Element[];

    }

    export interface Box {
        height:number;
        width:number;
        y:number;
        x:number;
        //cx:number;
        //cy:number;
        //merge(bbox:BBox):BBox;
    }

    export interface BBox extends Box {}

    export interface RBox extends BBox {}

    export interface Attributes {
        (name:string, value:any):void;
        (obj:Object):void;
        (name:string):any;
    }

    export interface Viewbox {
        //x: number;
        //y: number;
        //width: number;
        //height: number;
        //zoom?: number;
    }

    export interface Matrix {
        extract(): Object;
        clone(): Matrix;
        morph(s: string);
        at(n: number);
        multiply(m: Matrix): Matrix;
        inverse(): Matrix;
        translate(x: number, y: number): Matrix;
        scale(sx: number, sy: number, cx: number, cy: number): Matrix;
        rotate(degree: number, x: number, y: number): Matrix;
        flip(axis: string, v: number): Matrix;
        skew(degreeX: number, degreeY: number, cx: number, cy: number): Matrix;
        around(cx: number, cy: number, m: Matrix): Matrix;
        native(): SVGMatrix;
        toString(): string;   
        e: number;
        f: number; 
    }
    
    export interface Transform {
        //x?: number;
        //y?: number;
        //rotation?: number;
        //cx?: number;
        //cy?: number;
        //scaleX?: number;
        //scaleY?: number;
        //skewX?: number;
        //skewY?: number;
        //matrix?: string; // 1,0,0,1,0,0
        //a?: number; // direct digits of matrix
        //b?: number;
        //c?: number;
        //d?: number;
        //e?: number;
        //f?: number;
    }
}
