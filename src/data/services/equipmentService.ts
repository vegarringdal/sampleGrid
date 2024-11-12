import { EquipmentEntity } from "../entities/EquipmentEntity";

type DEFAULT_ENTITY = EquipmentEntity;

class EquipmentService<T> {
  transformResult(row: DEFAULT_ENTITY) {
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
  async getAll(project: string): Promise<DEFAULT_ENTITY[]> {
    const result = await fetch(`https://example.com/api/equipment/${project}`);
    console.log(result);
    if (result.ok) {
      return ((await result.json()) as DEFAULT_ENTITY[]).map((d) =>
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
  async post(project: string, data: DEFAULT_ENTITY) {
    console.log("service patch", project, data);

    return {} as T;
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
  async patch(project: string, data: DEFAULT_ENTITY) {
    console.log("service patch", project, data);
  }
}

export const equipmentService = new EquipmentService<EquipmentEntity>();
