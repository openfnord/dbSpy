export declare const microsoftSchemaQuery = "\n        SELECT\n            c.TABLE_NAME,\n            c.COLUMN_NAME,\n            c.DATA_TYPE,\n            c.CHARACTER_MAXIMUM_LENGTH,\n            c.COLUMN_DEFAULT,\n            c.IS_NULLABLE,\n            COLUMNPROPERTY(OBJECT_ID(c.TABLE_SCHEMA + '.' + c.TABLE_NAME), c.COLUMN_NAME, 'IsIdentity') AS IS_IDENTITY,\n            CASE WHEN k.COLUMN_NAME IS NOT NULL THEN 'YES' ELSE 'NO' END AS IS_PRIMARY_KEY\n        FROM \n            INFORMATION_SCHEMA.COLUMNS c\n        INNER JOIN INFORMATION_SCHEMA.TABLES t ON c.TABLE_SCHEMA = t.TABLE_SCHEMA AND c.TABLE_NAME = t.TABLE_NAME\n        LEFT JOIN\n            INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON c.TABLE_NAME = k.TABLE_NAME AND c.COLUMN_NAME = k.COLUMN_NAME AND k.CONSTRAINT_NAME LIKE '%PK%'\n        WHERE \n            c.TABLE_NAME = 'tableName';\n            ";
export declare const microsoftForeignKeyQuery = "\n        SELECT\n            fk.name AS constraint_name,\n            OBJECT_NAME(fk.parent_object_id) AS table_name,\n            COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS column_name,\n            OBJECT_NAME(fk.referenced_object_id) AS referenced_table_name,\n            COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS referenced_column_name\n        FROM\n            sys.foreign_keys AS fk\n        INNER JOIN\n            sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id;\n            ";
//# sourceMappingURL=microsoft.queries.d.ts.map