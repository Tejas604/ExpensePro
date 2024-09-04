/** @type { import("drizzle-kit").Config } */
export default {
    schema:"./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://manager_owner:ekqQpULfI62t@ep-empty-field-a1orx6bt.ap-southeast-1.aws.neon.tech/Expense-tracker?sslmode=require',
    }
  };