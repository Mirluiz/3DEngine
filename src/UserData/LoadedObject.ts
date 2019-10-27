import Sample from "../Classes/Objects/Sample";

export default class LoadedObject {

    objects: Array<Sample> = [];

    constructor(){
        this.objects.push(new Sample(0, 0, 0, 100, 200, 100));
        this.objects.push(new Sample(200, 0, 0, 100, 200, 100));
        this.objects.push(new Sample(400, 0, 0, 100, 200, 100));
    }
}