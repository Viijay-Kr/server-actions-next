import mysql, { ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
  user: "root",
  password: "root",
  database: "server_actions",
});

export async function query<TResponse extends ResultSetHeader>(query: string) {
  return new Promise<TResponse>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
          // @ts-expect-error
          pool.releaseConnection(connection);
        }
        resolve(result as TResponse);
        // @ts-expect-error
        pool.releaseConnection(connection);
      });
    });
  });
}
