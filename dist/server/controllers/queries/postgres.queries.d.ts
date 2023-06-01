export declare const postgresForeignKeyQuery = "\n    SELECT \n        kcu.table_schema || '.' || kcu.table_name AS table_with_foreign_key, \n        kcu.column_name AS foreign_key_column, \n        rel_tco.table_schema || '.' || rel_tco.table_name AS primary_key_table, \n        rco.update_rule, \n        rco.delete_rule,\n        rel_kcu.column_name AS primary_key_column,\n        tco.constraint_name AS constraint_name\n    FROM \n        information_schema.table_constraints tco \n    JOIN \n        information_schema.key_column_usage kcu ON tco.constraint_name = \n        kcu.constraint_name \n    JOIN \n        information_schema.referential_constraints rco ON tco.constraint_name \n        = rco.constraint_name \n    JOIN \n        information_schema.table_constraints rel_tco ON \n        rco.unique_constraint_name = rel_tco.constraint_name \n    JOIN \n        information_schema.key_column_usage rel_kcu ON \n        rel_tco.constraint_name = rel_kcu.constraint_name\n    AND \n        kcu.ordinal_position = rel_kcu.ordinal_position\n    WHERE \n        tco.constraint_type = 'FOREIGN KEY';\n    ";
export declare const postgresSchemaQuery = "\nSELECT \n    c.column_name, \n    c.data_type, \n    c.character_maximum_length,\n    c.is_nullable,\n    c.column_default,\n    CASE \n        WHEN c.column_default LIKE 'nextval%' THEN 'sequence'\n        WHEN c.column_default LIKE '(%::text)::%' THEN 'expression'\n        WHEN c.column_default IS NOT NULL THEN 'constant'\n        WHEN ic.column_name IS NOT NULL THEN 'identity'\n        ELSE ''\n    END as default_type,\n    CASE WHEN \n        c.column_default IS NOT NULL THEN 'DEFAULT' ELSE '' END ||\n    CASE WHEN \n        c.is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END ||\n    CASE WHEN \n        tc.constraint_type = 'PRIMARY KEY' THEN ' PRIMARY KEY' ELSE '' END ||\n        CASE WHEN \n        tc.constraint_type = 'FOREIGN KEY' THEN ' FOREIGN KEY REFERENCES ' || ccu.table_name || '(' || ccu.column_name || ')' ELSE '' END as additional_constraints\nFROM \n    information_schema.columns c\nLEFT OUTER JOIN \n    information_schema.key_column_usage kcu\n    ON \n        c.table_catalog = kcu.table_catalog\n    AND \n        c.table_schema = kcu.table_schema\n    AND \n        c.table_name = kcu.table_name\n    AND \n        c.column_name = kcu.column_name\nLEFT OUTER JOIN \n    information_schema.table_constraints tc\n    ON \n        kcu.constraint_catalog = tc.constraint_catalog\n    AND \n        kcu.constraint_schema = tc.constraint_schema\n    AND \n        kcu.constraint_name = tc.constraint_name\nLEFT OUTER JOIN \n    information_schema.constraint_column_usage ccu\n    ON \n        tc.constraint_catalog = ccu.constraint_catalog\n    AND \n        tc.constraint_schema = ccu.constraint_schema\n    AND \n        tc.constraint_name = ccu.constraint_name\nLEFT OUTER JOIN\n    information_schema.columns ic\n    ON \n        c.table_catalog = ic.table_catalog\n    AND \n        c.table_schema = ic.table_schema\n    AND \n        c.table_name = ic.table_name\n    AND \n        c.column_name = ic.column_name\n    AND \n        ic.is_identity = 'YES'\nWHERE \n    c.table_name = 'tableName'\nORDER BY \n    c.ordinal_position;\n    ";
//# sourceMappingURL=postgres.queries.d.ts.map