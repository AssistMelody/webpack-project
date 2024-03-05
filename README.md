# Shopify Plugin for AMZ A Plus

## start

```bash
npm i

npm run dev [mock-data]
```

> mock-data 未指定使用默认数据源，src/data/default.json

## build

```bash
npm run build:dev/stg/prod
```

## SOP

- 编写的 aplus 模块文件`*.hbs`提供给后端开发人员（修改为后端模板引擎语法）
- build 后的 `mkt-aplus.css` 资源提供给后端开发人员（不需要修改，原样引入）
- jenkins 构建项目，将`mkt-aplus.js`、`midas.js` 上传至 s3

## add new module

运行命令：选择模块类型，输入模块名称。 mkt-aplus.js 会自动引入创建的模块。根据提示重启项目

```bash
npx aplus add
```
