# Niwak

Static yet secure wedding invitation generator. You don't need any API server to serve data. Your recipient and invitation detail will be encrypted.

## Usage

Prepare a CSV file that follow the format bellow:

```
name,otherfield
Si Fulan,othervalue
```

Customize your payload data on `payload.js` then build it,

```
BASE_URL=https://yourdomain.wedding CSV=./example-recipients.csv REACT_APP_SECRET_KEY=foobar npm run build
```

The script will create the exact CSV file, `output.csv`, but with additional field.

```
name,otherfield,url
Si Fulan,othervalue,https://yourdomain.xyz/wedding/?recipient=E19C0A646267DFF5
```

The static invitation website will be ready in `docs` directory. You may customize the invitation design as you wish (see `payload.js`, `App.js` and `App.css`).

## License

MIT
