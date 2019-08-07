A Davinci fork Web Application
```
 "lint-staged": {
    "*.js": [
      "npm run lint:eslint:fix",
      "git add --force"
    ],
    "*.json": [
      "prettier --write",
      "git add --force"
    ],
    "*.ts": "npm run lint:tslint",
    "*.tsx": "npm run lint:tslint"
 }
```