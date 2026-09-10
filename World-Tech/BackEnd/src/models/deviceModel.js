const db = require("../config/db");

const Device = {

  // ==========================================
  // LISTAR DISPOSITIVOS
  // ==========================================
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT
        d.ID_Dispositivo,
        d.Nombre_Dispositivo,
        d.Referencia_Dispositivo,
        m.Nombre_Marca AS Marca_Dispositivo,
        d.Tipo_Dispositivo,
        d.Precio,
        d.Imagen,
        d.Fecha_Lanzamiento,
        d.Descripcion
      FROM dispositivo d
      INNER JOIN marca m
        ON d.ID_Marca = m.ID_Marca
      ORDER BY d.ID_Dispositivo
    `);

    return rows;
  },

  // ==========================================
  // DETALLE + ESPECIFICACIONES
  // ==========================================
  getById: async (id) => {

    const [deviceRows] = await db.execute(
      `
      SELECT
        d.ID_Dispositivo,
        d.ID_Marca,
        d.Nombre_Dispositivo,
        d.Referencia_Dispositivo,
        m.Nombre_Marca AS Marca_Dispositivo,
        d.Tipo_Dispositivo,
        d.Precio,
        d.Imagen,
        d.Fecha_Lanzamiento,
        d.Descripcion
      FROM dispositivo d
      INNER JOIN marca m
        ON d.ID_Marca = m.ID_Marca
      WHERE d.ID_Dispositivo = ?
      `,
      [id]
    );

    if (deviceRows.length === 0) return null;

    const device = deviceRows[0];

    let specs = {};

    if (
      device.Tipo_Dispositivo === "Celular" ||
      device.Tipo_Dispositivo === "Tablet"
    ) {

      const [rows] = await db.execute(
        `
        SELECT
          Pantalla_Cel_Tab       AS Pantalla,
          Procesador_Cel_Tab     AS Procesador,
          RAM_Cel_Tab            AS RAM,
          Almacenamiento_Cel_Tab AS Almacenamiento,
          Camaras_Cel_Tab        AS Camaras,
          Bateria_Cel_Tab        AS Bateria,
          Conectividad_Cel_Tab   AS Conectividad
        FROM especificaciones_celulares_tablets
        WHERE ID_Dispositivo = ?
        `,
        [id]
      );

      specs = rows[0] || {};
    }

    if (device.Tipo_Dispositivo === "Portatil") {

      const [rows] = await db.execute(
        `
        SELECT
          Pantalla_Portatil       AS Pantalla,
          Procesador_Portatil     AS Procesador,
          RAM_Portatil            AS RAM,
          Almacenamiento_Portatil AS Almacenamiento,
          Bateria_Portatil        AS Bateria,
          Conectividad_Portatil   AS Conectividad,
          Graficos_Portatil       AS Graficos
        FROM especificaciones_portatiles
        WHERE ID_Dispositivo = ?
        `,
        [id]
      );

      specs = rows[0] || {};
    }

    return {
      ...device,
      specs
    };
  },

  // ==========================================
  // CREAR
  // ==========================================
  create: async (data) => {

    const conn = await db.getConnection();

    try {

      await conn.beginTransaction();

      // Obtener ID_Marca
      const [marca] = await conn.execute(
        `SELECT ID_Marca FROM marca WHERE Nombre_Marca=?`,
        [data.marca]
      );

      const idMarca = marca[0].ID_Marca;

      const [result] = await conn.execute(
        `
        INSERT INTO dispositivo
        (
          ID_Marca,
          Nombre_Dispositivo,
          Referencia_Dispositivo,
          Tipo_Dispositivo,
          Precio,
          Imagen,
          Fecha_Lanzamiento,
          Descripcion
        )
        VALUES (?,?,?,?,?,?,?,?)
        `,
        [
          idMarca,
          data.nombre,
          data.referencia,
          data.tipo,
          data.precio,
          data.imagen,
          data.fecha || null,
          data.descripcion
        ]
      );

      const id = result.insertId;

      // CELULAR / TABLET
      if (
        data.tipo === "Celular" ||
        data.tipo === "Tablet"
      ) {

        await conn.execute(
          `
          INSERT INTO especificaciones_celulares_tablets
          (
            ID_Dispositivo,
            Pantalla_Cel_Tab,
            Procesador_Cel_Tab,
            RAM_Cel_Tab,
            Almacenamiento_Cel_Tab,
            Camaras_Cel_Tab,
            Bateria_Cel_Tab,
            Conectividad_Cel_Tab
          )
          VALUES (?,?,?,?,?,?,?,?)
          `,
          [
            id,
            data.pantalla,
            data.procesador,
            data.ram,
            data.almacenamiento,
            data.camaras,
            data.bateria,
            data.conectividad
          ]
        );
      }

      // PORTÁTIL
      if (data.tipo === "Portatil") {

        await conn.execute(
          `
          INSERT INTO especificaciones_portatiles
          (
            ID_Dispositivo,
            Pantalla_Portatil,
            Procesador_Portatil,
            RAM_Portatil,
            Almacenamiento_Portatil,
            Bateria_Portatil,
            Conectividad_Portatil,
            Graficos_Portatil
          )
          VALUES (?,?,?,?,?,?,?,?)
          `,
          [
            id,
            data.pantalla,
            data.procesador,
            data.ram,
            data.almacenamiento,
            data.bateria,
            data.conectividad,
            data.graficos
          ]
        );
      }

      await conn.commit();

      return id;

    } catch (err) {

      await conn.rollback();
      throw err;

    } finally {

      conn.release();

    }
  },

  // ==========================================
  // ACTUALIZAR
  // ==========================================
  update: async (id, data) => {

    const conn = await db.getConnection();

    try {

      await conn.beginTransaction();

      const [marca] = await conn.execute(
        `SELECT ID_Marca FROM marca WHERE Nombre_Marca=?`,
        [data.marca]
      );

      const idMarca = marca[0].ID_Marca;

      await conn.execute(
        `
        UPDATE dispositivo
        SET
          ID_Marca=?,
          Nombre_Dispositivo=?,
          Referencia_Dispositivo=?,
          Tipo_Dispositivo=?,
          Precio=?,
          Imagen=?,
          Fecha_Lanzamiento=?,
          Descripcion=?
        WHERE ID_Dispositivo=?
        `,
        [
          idMarca,
          data.nombre,
          data.referencia,
          data.tipo,
          data.precio,
          data.imagen,
          data.fecha || null,
          data.descripcion,
          id
        ]
      );

      // Borrar specs anteriores
      await conn.execute(
        `DELETE FROM especificaciones_celulares_tablets WHERE ID_Dispositivo=?`,
        [id]
      );

      await conn.execute(
        `DELETE FROM especificaciones_portatiles WHERE ID_Dispositivo=?`,
        [id]
      );

      // Insertar nuevamente
      if (
        data.tipo === "Celular" ||
        data.tipo === "Tablet"
      ) {

        await conn.execute(
          `
          INSERT INTO especificaciones_celulares_tablets
          (
            ID_Dispositivo,
            Pantalla_Cel_Tab,
            Procesador_Cel_Tab,
            RAM_Cel_Tab,
            Almacenamiento_Cel_Tab,
            Camaras_Cel_Tab,
            Bateria_Cel_Tab,
            Conectividad_Cel_Tab
          )
          VALUES (?,?,?,?,?,?,?,?)
          `,
          [
            id,
            data.pantalla,
            data.procesador,
            data.ram,
            data.almacenamiento,
            data.camaras,
            data.bateria,
            data.conectividad
          ]
        );
      }

      if (data.tipo === "Portatil") {

        await conn.execute(
          `
          INSERT INTO especificaciones_portatiles
          (
            ID_Dispositivo,
            Pantalla_Portatil,
            Procesador_Portatil,
            RAM_Portatil,
            Almacenamiento_Portatil,
            Bateria_Portatil,
            Conectividad_Portatil,
            Graficos_Portatil
          )
          VALUES (?,?,?,?,?,?,?,?)
          `,
          [
            id,
            data.pantalla,
            data.procesador,
            data.ram,
            data.almacenamiento,
            data.bateria,
            data.conectividad,
            data.graficos
          ]
        );
      }

      await conn.commit();

      return 1;

    } catch (err) {

      await conn.rollback();
      throw err;

    } finally {

      conn.release();

    }
  },

  // ==========================================
  // ELIMINAR
  // ==========================================
  delete: async (id) => {

    const [result] = await db.execute(
      `DELETE FROM dispositivo WHERE ID_Dispositivo=?`,
      [id]
    );

    return result.affectedRows;
  }

};

module.exports = Device;