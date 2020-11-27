[1mdiff --git a/.gitignore b/.gitignore[m
[1mdeleted file mode 100644[m
[1mindex b512c09..0000000[m
[1m--- a/.gitignore[m
[1m+++ /dev/null[m
[36m@@ -1 +0,0 @@[m
[31m-node_modules[m
\ No newline at end of file[m
[1mdiff --git a/.vscode/launch.json b/.vscode/launch.json[m
[1mdeleted file mode 100644[m
[1mindex f486d4c..0000000[m
[1m--- a/.vscode/launch.json[m
[1m+++ /dev/null[m
[36m@@ -1,17 +0,0 @@[m
[31m-{[m
[31m-    // Use IntelliSense to learn about possible attributes.[m
[31m-    // Hover to view descriptions of existing attributes.[m
[31m-    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387[m
[31m-    "version": "0.2.0",[m
[31m-    "configurations": [[m
[31m-        {[m
[31m-            "type": "node",[m
[31m-            "request": "launch",[m
[31m-            "name": "Launch Program",[m
[31m-            "skipFiles": [[m
[31m-                "<node_internals>/**"[m
[31m-            ],[m
[31m-            "program": "${workspaceFolder}\\app.js"[m
[31m-        }[m
[31m-    ][m
[31m-}[m
\ No newline at end of file[m
[1mdiff --git a/546final.code-workspace b/546final.code-workspace[m
[1mnew file mode 100644[m
[1mindex 0000000..876a149[m
[1m--- /dev/null[m
[1m+++ b/546final.code-workspace[m
[36m@@ -0,0 +1,8 @@[m
[32m+[m[32m{[m
[32m+[m	[32m"folders": [[m
[32m+[m		[32m{[m
[32m+[m			[32m"path": "."[m
[32m+[m		[32m}[m
[32m+[m	[32m],[m
[32m+[m	[32m"settings": {}[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/data/index.js b/data/index.js[m
[1mindex 3f94c3d..7395b37 100644[m
[1m--- a/data/index.js[m
[1m+++ b/data/index.js[m
[36m@@ -1,4 +1,5 @@[m
[32m+[m[32mconst companiesData = require('./companies');[m
[32m+[m
 module.exports = {[m
[31m-    companies: require('./companies'),[m
[31m-    traders: require('./traders'),[m
[31m-};[m
[32m+[m[32m  companies: companiesData[m
[32m+[m[32m};[m
\ No newline at end of file[m
[1mdiff --git a/routes/companies.js b/routes/companies.js[m
[1mindex 742c72e..976f4a4 100644[m
[1m--- a/routes/companies.js[m
[1m+++ b/routes/companies.js[m
[36m@@ -6,13 +6,10 @@[m [mconst companies = data.companies;[m
 router.get('/:ticker', async (req, res) => {[m
     try {[m
         const company = await companies.getCompany(req.params.ticker);[m
[31m-        res.render('companies/companyProfile', {[m
[31m-            title: 'Company Profile',[m
[31m-            company: company,[m
[31m-        });[m
[32m+[m[32m        res.render('companies/companyProfile', { title: "Company Profile", company: company});[m
     } catch (e) {[m
[31m-        res.status(404).json({ error: e });[m
[32m+[m[32m        res.status(404).json({error: e});[m
     }[m
 });[m
 [m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/routes/index.js b/routes/index.js[m
[1mindex 6c04005..c1b8b2a 100644[m
[1m--- a/routes/index.js[m
[1m+++ b/routes/index.js[m
[36m@@ -1,23 +1,24 @@[m
[31m-const usersRoutes = require('./users');[m
[31m-const stocksRoutes = require('./stocks');[m
[31m-const companiesRoutes = require('./companies');[m
[31m-const loginRoutes = require('./login');[m
[31m-const registerRoutes = require('./register');[m
[32m+[m[32mconst usersRoutes = require("./users");[m
[32m+[m[32mconst stocksRoutes = require("./stocks");[m
[32m+[m[32mconst companiesRoutes = require("./companies");[m
[32m+[m[32mconst loginRoutes = require("./login");[m
[32m+[m[32mconst registerRoutes = require("./register");[m
[32m+[m
 [m
 const constructorMethod = (app) => {[m
[31m-    app.get('/', (req, res) => {[m
[31m-        res.render('landing/landingpage', { title: 'Home' });[m
[31m-    });[m
[32m+[m[32m  app.get('/', (req, res) => {[m
[32m+[m[32m    res.render('landing/landingpage', {title: "Home"});[m
[32m+[m[32m  });[m
 [m
[31m-    app.use('/login', loginRoutes);[m
[31m-    app.use('/register', registerRoutes);[m
[31m-    app.use('/users', usersRoutes);[m
[31m-    app.use('/stocks', stocksRoutes);[m
[31m-    app.use('/companies', companiesRoutes);[m
[32m+[m[32m  app.use('/login', loginRoutes);[m
[32m+[m[32m  app.use('/register', registerRoutes);[m
[32m+[m[32m  app.use('/users', usersRoutes);[m
[32m+[m[32m  app.use('/stocks', stocksRoutes);[m
[32m+[m[32m  app.use('/companies', companiesRoutes);[m
 [m
[31m-    app.use('*', (req, res) => {[m
[31m-        res.status(404).json({ error: 'Provided route is not found' });[m
[31m-    });[m
[32m+[m[32m  app.use('*', (req, res) => {[m
[32m+[m[32m    res.status(404).json({ error: 'Provided route is not found' });[m
[32m+[m[32m  });[m
 };[m
 [m
[31m-module.exports = constructorMethod;[m
[32m+[m[32mmodule.exports = constructorMethod;[m
\ No newline at end of file[m
[1mdiff --git a/routes/login.js b/routes/login.js[m
[1mindex 1bbe0a0..26466c8 100644[m
[1m--- a/routes/login.js[m
[1m+++ b/routes/login.js[m
[36m@@ -2,7 +2,7 @@[m [mconst express = require('express');[m
 const router = express.Router();[m
 [m
 router.get('/', async (req, res) => {[m
[31m-    res.render('users/login', { title: 'Login' });[m
[32m+[m[32m    res.render('users/login', { title: "Login"});[m
 });[m
 [m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/routes/register.js b/routes/register.js[m
[1mindex 0fae337..7e90004 100644[m
[1m--- a/routes/register.js[m
[1m+++ b/routes/register.js[m
[36m@@ -2,7 +2,7 @@[m [mconst express = require('express');[m
 const router = express.Router();[m
 [m
 router.get('/', async (req, res) => {[m
[31m-    res.render('users/register', { title: 'Register' });[m
[32m+[m[32m    res.render('users/register', {title: "Register"});[m
 });[m
 [m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/routes/stocks.js b/routes/stocks.js[m
[1mindex 88dcadb..b38478b 100644[m
[1m--- a/routes/stocks.js[m
[1m+++ b/routes/stocks.js[m
[36m@@ -6,15 +6,11 @@[m [mconst companies = data.companies;[m
 router.get('/stocksList', async (req, res) => {[m
     try {[m
         const allCompanies = await companies.getAllCompanies();[m
[31m-        res.render('stocks/stocksList', {[m
[31m-            title: 'List of Stocks',[m
[31m-            allCompanies: allCompanies,[m
[31m-        });[m
[32m+[m[32m        res.render('stocks/stocksList', { title: "List of Stocks", allCompanies: allCompanies});[m
     } catch (e) {[m
[31m-        res.status(500).json({ error: e });[m
[32m+[m[32m        res.status(500).json({error: e});[m
     }[m
[32m+[m[41m    [m
 });[m
 [m
[31m-router.post('/');[m
[31m-[m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/routes/users.js b/routes/users.js[m
[1mindex 71e939b..05e2f74 100644[m
[1m--- a/routes/users.js[m
[1m+++ b/routes/users.js[m
[36m@@ -2,7 +2,7 @@[m [mconst express = require('express');[m
 const router = express.Router();[m
 [m
 router.get('/dashboard', async (req, res) => {[m
[31m-    res.render('users/dashboard', { title: 'Your Dashboard' });[m
[32m+[m[32m    res.render('users/dashboard', {title: "Your Dashboard"});[m
 });[m
 [m
[31m-module.exports = router;[m
[32m+[m[32mmodule.exports = router;[m
\ No newline at end of file[m
[1mdiff --git a/data/traders.js b/test.txt[m
[1msimilarity index 100%[m
[1mrename from data/traders.js[m
[1mrename to test.txt[m
[1mdiff --git a/views/stocks/stocksList.handlebars b/views/stocks/stocksList.handlebars[m
[1mindex 7f0fe20..309ce8b 100644[m
[1m--- a/views/stocks/stocksList.handlebars[m
[1m+++ b/views/stocks/stocksList.handlebars[m
[36m@@ -1,32 +1,16 @@[m
 <div>[m
     <h1>List of Stocks</h1>[m
 [m
[31m-    <form action="/">[m
[31m-        <div class="stockMod">[m
[31m-            <label for="sort">Sort By</label>[m
[31m-            <select id="sort" name="sort">[m
[31m-                <option value="name">name</option>[m
[31m-                <option value="price">price</option>[m
[31m-                <option value="rating">rating</option>[m
[31m-            </select>[m
[31m-            <input type="submit">[m
[31m-        </div>[m
[31m-    </form>[m
[31m-[m
     <div class="listLayout">[m
[31m-        {{#each allCompanies}}[m
[32m+[m[32m    {{#each allCompanies}}[m
         <div class="companyBox">[m
             <a href="../companies/{{this.ticker}}">[m
[31m-                {{this.name}} ({{this.ticker}})[m
[32m+[m[32m            {{this.name}} ({{this.ticker}})[m
             </a>[m
             <p>Price: {{this.price}}</p>[m
             <p>Rating: </p>[m
         </div>[m
[31m-[m
[31m-        <div>[m
[31m-            <button type="submit">Add</button>[m
[31m-        </div>[m
[31m-        {{/each}}[m
[32m+[m[32m    {{/each}}[m
     </div>[m
 [m
 </div>[m
\ No newline at end of file[m
