export declare const oracleSchemaQuery = "\nSELECT\nc.table_name,\nc.column_name,\nc.data_type,\nc.data_default,\nc.char_col_decl_length AS character_maximum_length,\nc.nullable AS is_nullable,\nc.column_id,\ncc.constraint_name,\nac.constraint_type,\nar.owner AS r_table_owner,\nar.table_name AS r_primary_key_table,\nar.column_name AS r_primary_key_column\nFROM\nall_tab_columns c\nLEFT JOIN\nall_cons_columns cc ON c.owner = cc.owner AND c.table_name = cc.table_name AND c.column_name = cc.column_name\nLEFT JOIN\nall_constraints ac ON cc.owner = ac.owner AND cc.constraint_name = ac.constraint_name\nLEFT JOIN\nall_cons_columns ar ON ac.r_owner = ar.owner AND ac.r_constraint_name = ar.constraint_name\n  WHERE\n    c.owner = 'user'\n    AND c.table_name = 'tableName'\n";
//# sourceMappingURL=oracle.queries.d.ts.map