module.exports =  function (req, res) {
    res.json({
        'code': '0000',
        'message': 'success',
        'data': [
          {
            'id': 1,
            'title': 'Hey this is an item',
            'author': 'wkylin'
          },
          {
            'id': 2,
            'title': 'Hey this is another item',
            'author': 'jack'
          },
          {
            'id': 3,
            'title': 'Hey this is another item',
            'author': 'jack'
          },
          {
            'id': 4,
            'title': 'Hey this is another item',
            'author': 'jack'
          },
          {
            'id': 5,
            'title': 'Hey this is another item',
            'author': 'jack'
          },
          {
            'id': 6,
            'title': 'Hey this is another item',
            'author': 'jack'
          }
        ]
      });
}
