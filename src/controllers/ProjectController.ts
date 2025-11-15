import type {Request, Response} from 'express'
import Project from '../models/Project'
import { PassThrough } from 'nodemailer/lib/xoauth2'
import { populate } from 'dotenv'

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        project.manager = req.user.id
        try {
            await project.save() 
            return res.status(201).json({message:'Project created successfully'});
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidationError') {
                // Error de validación de Mongoose
                const errors = Object.values(error.errors).map((el: any) => el.message);
                return res.status(400).json({
                    errorMessage: 'Validation failed',
                    errors: errors
                });
            }
            return res.status(500).json({
                errorMessage : 'Occurred an unexpected server error'
            });
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            })
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const {projectId } = req.params
        try {
            const project = await Project.findById(projectId)
                            .populate([{
                                path: 'tasks',
                                // Dentro de las tareas, queremos popular el array 'completedBy'
                                populate: {
                                    path: 'completedBy',
                                    // Dentro de cada objeto de 'completedBy', queremos popular la referencia 'user'
                                    populate: {
                                        path: 'user',
                                        // (Opcional) Puedes seleccionar los campos específicos que quieres del usuario
                                        select: 'email name _id' 
                                    }
                                }
                            },{
                                path: 'tasks',
                                populate: {
                                    path: 'notes',
                                    populate: {
                                        path: 'createdBy',
                                        select: 'name email _id'
                                    }
                                                              
                                }
                            }]);
            if(!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            if(project.manager.toString() !== req.user.id.toString() 
                && !project.team.includes(req.user.id)
            ) {
                const error = new Error('Acción no válida')
                return res.status(404).json({error: error.message})
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {            
            req.project.clientName = req.body.clientName
            req.project.projectName = req.body.projectName
            req.project.description = req.body.description

            await req.project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            await req.project.deleteOne()
            res.send('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}