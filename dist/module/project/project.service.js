"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
// import { AppDataSource } from "../../data-source";
const data_source_1 = require("../../config/data-source");
const project_entity_1 = require("./entities/project.entity");
class ProjectService {
    constructor() {
        this.projectRepo = data_source_1.AppDataSource.getRepository(project_entity_1.ProjectEntity);
    }
    async create(data) {
        const newProject = this.projectRepo.create(data);
        return await this.projectRepo.save(newProject);
    }
    async findAll() {
        // return await this.projectRepo.find({
        //   // relations: ["images", "buttons", "languages", "content", "content.features", "content.dates", "content.collaborators", "content.technologies"],
        // });
        // sort desc by id
        const results = await this.projectRepo.find({
            order: {
                id: "DESC",
            },
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: 1,
            hasMore: false,
            results,
        };
    }
    async findOne(id) {
        return await this.projectRepo.findOne({
            where: { id },
            // relations: [
            //   "images",
            //   "buttons",
            //   "languages",
            //   "content",
            //   "content.features",
            //   "content.dates",
            //   "content.collaborators",
            //   "content.technologies",
            // ],
        });
    }
    async findOneBySlug(slug) {
        return await this.projectRepo.findOne({
            where: { slug },
            // relaciones si necesitas
            // relations: [...]
        });
    }
    async update(id, data) {
        const project = await this.projectRepo.findOneBy({ id });
        if (!project)
            return null;
        this.projectRepo.merge(project, data);
        return await this.projectRepo.save(project);
    }
    async remove(id) {
        const result = await this.projectRepo.delete(id);
        return result.affected ? true : false;
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map