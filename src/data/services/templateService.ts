import { TemplateEntity } from "../entities/TemplateEntity";

class TemplateService {
  transformResult(row: TemplateEntity) {
    // for transforming/fixing

    row.created = row.created ? new Date(row.created) : null;
    row.modified = row.modified ? new Date(row.modified) : null;

    return row;
  }

  /**
   * fetch all/refresh
   * @param project
   * @returns
   */
  async getAll(project: string): Promise<TemplateEntity[]> {
    const result = await fetch(`https://example.com/api/template/${project}`);
    if (result.ok) {
      return ((await result.json()) as TemplateEntity[]).map((d) =>
        this.transformResult(d),
      );
    } else {
      return [];
    }
  }

  /**
   * new
   * @param project
   * @param data
   */
  async post(project: string, data: TemplateEntity) {
    console.log("service patch", project, data);

    return {} as TemplateEntity;
  }

  /**
   * delete
   * @param project
   * @param data
   */
  async delete(project: string, id: string) {
    console.log("service delete", project, id);
  }

  /**
   * update
   * @param project
   * @param data
   */
  async patch(project: string, data: TemplateEntity) {
    console.log("service patch", project, data);
  }
}

export const templateService = new TemplateService();
