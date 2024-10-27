import { EquipmentEntity } from "../entities/EquipmentEntity";

class CableService<T> {
  transformResult(row: EquipmentEntity) {
    // for transforming/fixing

    return row.ID;
  }

  /**
   * fetch all/refresh
   * @param project
   * @returns
   */
  async getAll(project: string) {
    console.log("service getAll", project);

    return [] as T[];
  }

  /**
   * new
   * @param project
   * @param data
   */
  async post(project: string, data: EquipmentEntity) {
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
  async patch(project: string, data: EquipmentEntity) {
    console.log("service patch", project, data);
  }
}

export const cableService = new CableService<EquipmentEntity>();
