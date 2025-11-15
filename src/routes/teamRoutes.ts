import { Router } from "express";
import { projectExists } from "../middleware/project";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();
router.param('projectId', projectExists);

router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('E-mail no válido'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
);

router.get('/:projectId/team',
    TeamMemberController.getProjecTeam
);

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    TeamMemberController.addMemberById
);

router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    TeamMemberController.removeMemberById
);

export default router;