import Sample from "../Classes/Objects/Sample";

export default class LoadedObject {

    objects: Array<Sample> = [];

    constructor(){
        this.objects.push(new Sample(0, 0, 0, 100, 100, 100));
        this.objects.push(new Sample(0, 0, 0, 100, 100, 100));
        this.objects.push(new Sample(0, 0, 0, 100, 100, 100));
    }
}