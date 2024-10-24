import { CableEntity } from "../entities/cableEntity";

class CableService {
  transformResult(row: CableEntity) {
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
  async getAll(project: string): Promise<CableEntity[]> {
    const result = await fetch(`https://example.com/api/cables/${project}`);
    if (result.ok) {
      return ((await result.json()) as CableEntity[]).map((d) =>
        this.transformResult(d)
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
  async post(project: string, data: CableEntity) {
    console.log("service patch", project, data);

    return {} as CableEntity;
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
  async patch(project: string, data: CableEntity) {
    console.log("service patch", project, data);
  }
}

export const cableService = new CableService();
