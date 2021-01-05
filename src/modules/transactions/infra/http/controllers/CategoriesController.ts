import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCategoriesService from '@modules/transactions/services/Category/services/ListCategoriesService';
import CreateCategoryService from '@modules/transactions/services/Category/services/CreateCategoryService';
import DeleteCategoryService from '@modules/transactions/services/Category/services/DeleteCategoryService';
import UpdateCategoryService from '@modules/transactions/services/Category/services/UpdateCategoryService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listCategories = container.resolve(ListCategoriesService);

      const categories = await listCategories.execute({ user_id });

      return response.json(categories);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name } = request.body;

      const createCategory = container.resolve(CreateCategoryService);

      const category = await createCategory.execute({ user_id, name });

      return response.json(category);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteCategory = container.resolve(DeleteCategoryService);

      await deleteCategory.execute({ user_id, id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name } = request.body;
      const { id } = request.params;

      const updateCategory = container.resolve(UpdateCategoryService);

      const category = await updateCategory.execute({
        user_id,
        id,
        name,
      });

      return response.json(category);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
