import EventEmitter from "events";

export class InterfaceServices extends EventEmitter {
    dependences;
    injectionDependences(dependences) {
        this.dependences = dependences;
    }
}