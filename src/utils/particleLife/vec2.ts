class Vec2 {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public copy() {
        return new Vec2(this.x, this.y);
    }

    public mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    public normalize() {
        const length = this.mag();
        this.x /= length;
        this.y /= length;
    }

    public abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }

    public sub(v: Vec2) {
        this.x -= v.x;
        this.y -= v.y;
    }

    public add(v: Vec2) {
        this.x += v.x;
        this.y += v.y;
    }

    public mul(v: Vec2) {
        this.x *= v.x;
        this.y *= v.y;
    }

    public div(v: Vec2) {
        this.x /= v.x;
        this.y /= v.y;
    }

    public mod(v: Vec2) {
        this.x %= v.x;
        this.y %= v.y;
    }

    public static normalize(vec: Vec2) {
        const copy = vec.copy();
        copy.normalize();
        return copy;
    }

    public static abs(vec: Vec2) {
        const copy = vec.copy();
        copy.abs();
        return copy;
    }

    public static sub(v1: Vec2, v2: Vec2) {
        const copy = v1.copy();
        copy.sub(v2);
        return copy;
    }

    public static add(v1: Vec2, v2: Vec2) {
        const copy = v1.copy();
        copy.add(v2);
        return copy;
    }

    public static mul(v1: Vec2, v2: Vec2) {
        const copy = v1.copy();
        copy.mul(v2);
        return copy;
    }

    public static div(v1: Vec2, v2: Vec2) {
        const copy = v1.copy();
        copy.div(v2);
        return copy;
    }

    public static mod(v1: Vec2, v2: Vec2) {
        const copy = v1.copy();
        copy.mod(v2);
        return copy;
    }
}

export default Vec2;
