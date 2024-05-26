const express = require('express');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const { sequelize } = require('./models'); // Your Sequelize instance

const app = express();
const port = process.env.PORT || 3000;

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    databases: [sequelize],
    rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
