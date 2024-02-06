import {Event} from "../types";
import registerCommands from "./registerCommands";
import buttonListner from "./buttonListner";
import modalListener from "./modalListen";
import ready from "./ready"

const events: Event<any>[] = [
    registerCommands,
    buttonListner,
    modalListener,
    ready
]

export default events;