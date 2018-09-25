import uuidv1 from "uuid";
import typeOf from "type-of-data";
import { CreateEntityEvent, UpdateEntityEvent } from "./EntityEvents";

const entityName = "Task";

export class CreateTaskEntityEvent extends CreateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title } = payload;
        typeOf({ title, is: String });
        super(id, timestamp, entityName, entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static fromTitle(title) {
        typeOf({ title, is: String });

        return new CreateTaskEntityEvent(
            super.createId(),
            super.getCurrentTimestamp(),
            uuidv1(),
            { title: title }
        );
    }
}

export class UpdateTaskEntityEvent extends UpdateEntityEvent {
    constructor(id, timestamp, entityId, payload) {
        const { title, isImportant } = payload;
        typeOf([
            { title, is: String, optional: true },
            { isImportant, is: Boolean, optional: true },
        ]);
        super(id, timestamp, entityName, entityId, payload);
        Object.seal(this);
        Object.freeze(this);
    }

    static withNewTitle(id, title) {
        typeOf([
            { id, is: String },
            { title, is: String }
            ]);

        return new UpdateTaskEntityEvent(
            super.createId(),
            super.getCurrentTimestamp(),
            id,
            { title: title }
        );
    }
}