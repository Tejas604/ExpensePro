import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://manager_owner:ekqQpULfI62t@ep-empty-field-a1orx6bt.ap-southeast-1.aws.neon.tech/Expense-tracker?sslmode=require');
export const db = drizzle(sql,{schema});