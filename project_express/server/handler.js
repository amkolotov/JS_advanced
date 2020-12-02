const fs = require('fs');
const cart = require('./cart');

const actions = {
  add: cart.add,
  change: cart.change,
  delete: cart.del
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const newCart = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          addStats(req, action, newCart)
        }
      })
    }
  });
};

const addStats = (req, action, cart) => {
    const product = JSON.parse(cart).contents.find(el => el.id_product === +req.params.id);
    console.log({'action': action, 'product': product.product_name, 'time': Date()})
    fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let stat = null
            let newStat = {'action': action, 'product': product.product_name, 'time': Date()};
            if (data) {
                stat = JSON.parse(data);
                stat.push(newStat);
            } else {
                stat = [newStat];
            }
            fs.writeFile('./db/stats.json', JSON.stringify(stat), (err) => {
            });
        }
    });

};


module.exports = handler;
