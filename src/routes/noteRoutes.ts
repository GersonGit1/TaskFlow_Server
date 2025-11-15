import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { NoteController } from "../controllers/NoteController";
import { projectExists } from "../middleware/project";
import { taskExists } from "../middleware/task";

const router = Router();
router.param('projectId', projectExists);
router.param('taskId', taskExists)

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El Contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
);

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
);

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID No Válido'),
    handleInputErrors,
    NoteController.deleteNote
);

export default router;