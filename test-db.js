const { pool } = require('./src/config/database');
async function probarConexion() {
    try {
        // Intentamos obtener una conexión del poolconsole.log("Intentando conectar con el usuario:", process.env.DB_USER);
        console.log("¿La contraseña tiene valor?:", process.env.DB_PASSWORD ? "SÍ" : "NO");
        const connection = await pool.getConnection();
        console.log("✅ ¡Conexión exitosa a MySQL!");

        // Ejecutamos una consulta de prueba simple
        const [rows] = await connection.query('SELECT "Conexión Activa" as estado');
        console.log("📊 Resultado de prueba:", rows[0].estado);

        // Es vital liberar la conexión de vuelta al pool
        connection.release();
        process.exit(0); // Cerramos el script con éxito
    } catch (error) {
        console.error("❌ Error conectando a la base de datos:");
        console.error("Mensaje:", error.message);
        console.error("Código de error:", error.code);
        process.exit(1); // Cerramos con error
    }
}

probarConexion();