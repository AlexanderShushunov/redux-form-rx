This project shows how to Rx helps to work with redux-forms.

## How to start
```bash
$ yarn 
$ yarn start
```
or

```bash
$ npm i 
$ npm start
```

## Cases
- produce a side effect (dispatch action) if some field has been changed
- get some information asynchronously according to props
- a field has two meanings depending on a boolean field; we should restore "the other meaning" if the boolean field has been changed
- combo :)

All cases has two implementations: using react component lifecycle, using Rx.

I hope this repo shows that Rx version is clearer :)