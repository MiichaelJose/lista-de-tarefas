import { ApiError } from "../libs/apiError.ts";
import TagRepository from "../repositorys/tagRepository.ts";

class TagService {
    private tagRepository: TagRepository;

    constructor() {
        this.tagRepository = new TagRepository();
    }

    public async fetchOneTag(id: string) {
        const tag = await this.tagRepository.fetch(id);

        if (!tag) {
            throw new ApiError(404, 'Tag not found', 'Não foi possível encontrar esta tag', { id: id });
        }
        
        return tag;
    }

    public async fetchAllTags() {
        const tags = await this.tagRepository.fetchAll();

        if (!tags.length) {
            throw new ApiError(404, 'Tags not found', 'Não foi possível encontrar Tags', {});
        }

        return tags;
    }

    public async createTag(body: any) {
        return await this.tagRepository.create(body);
    }

    public async updateTag(id: string, body: any) {
        const tag = await this.tagRepository.update(id, body);

        if (!tag) {
            throw new ApiError(404, 'Tag not found', 'Não foi possível encontrar esta Tag', { id: id });
        }

        return tag;
    }

    public async deleteTag(id: string) {
        const tag = await this.tagRepository.delete(id);

        if (!tag) {
            throw new ApiError(404, 'Tag not found', 'Não foi possível encontrar esta Tag', { id: id });
        }

        return tag;
    }
}

export default TagService;
