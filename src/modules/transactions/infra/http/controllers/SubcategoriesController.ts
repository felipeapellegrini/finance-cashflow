import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSubcategoriesService from '@modules/transactions/services/Subcategory/services/ListSubcategoriesService';
import CreateSubcategoryService from '@modules/transactions/services/Subcategory/services/CreateSubcategoryService';
import DeleteSubcategoryService from '@modules/transactions/services/Subcategory/services/DeleteSubcategoryService';
import UpdateSubcategoryService from '@modules/transactions/services/Subcategory/services/UpdateSubcategoryService';

export default class SubcategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listSubcategories = container.resolve(ListSubcategoriesService);

      const subcategories = await listSubcategories.execute({ user_id });

      return response.json(subcategories);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { subcategory_name, category_name } = request.body;

      const createSubcategory = container.resolve(CreateSubcategoryService);

      const subcategory = await createSubcategory.execute({
        user_id,
        subcategory_name,
        category_name,
      });

      return response.json(subcategory);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteSubcategory = container.resolve(DeleteSubcategoryService);
      await deleteSubcategory.execute({ user_id, id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { subcategory_name, category_name } = request.body;
      const { id } = request.params;

      const updateSubcategory = container.resolve(UpdateSubcategoryService);

      const subcategory = await updateSubcategory.execute({
        user_id,
        id,
        subcategory_name,
        category_name,
      });

      return response.json(subcategory);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
