class Category {
    constructor(points = 0, assigned = false) {
        this.points = points;
        this.assigned = assigned;
    }

    get points() {
        return this.points;
    }

    set points(points) {
        this.points = points;
    }

    get assigned() {
        return this.assigned;
    }

    set assigned(assigned) {
        this.assigned = assigned;
    }
}

export default Category;
